'use client'

import React, { useMemo, useRef, useState } from 'react'

// ===== 규칙 (요청 사양 반영) =====
// 0) 야근은 30분(=0.5h) 단위 절사. 48분 → 30분.
// 1) 평일 기준: 8시간 근로 + 1시간 휴게 + 추가 30분 휴식 이후부터 야근
//    → 출근~퇴근 체류시간이 9.5시간(=570분)을 초과한 분부터 야근으로 계산
// 2) 평일 8시간 근무는 야근 아님
// 3) 주말근무(휴무일, 주휴일)는 30분 버퍼 없이 실제 체류시간을 30분 단위로 청구
// 4) 업로드 헤더(엑셀/CSV):
//    "근무일 오름차순내림차순, 출근시간, 퇴근시간, 근로시간, 휴게시간, 휴가시간, 총 시간, 시간외근무, 출퇴근 요청, 최종 수정일시"
//    이 중 계산에 쓰는 컬럼 = "근무일 오름차순내림차순" / "출근시간" / "퇴근시간" / "근로시간"
// 5) 값 예시:
//    - 날짜: "2025-08-29(금)" (요일 괄호 포함 가능)
//    - 출근/퇴근: "미등록" 또는 "8:01:15"(또는 HH:mm) 또는 공백
//    - 근로시간: "근무일" 또는 "주휴일" 또는 "휴무일" 또는 "08:30 ~ 17:07" (문구가 없어도 기본은 평일 근무로 간주)

// ===== 유틸 =====
const MIN_PER_BLOCK = 30 // 30분 단위 절사
const WEEKDAY_THRESHOLD_MIN = 9.5 * 60 // 570분

type DayType = '근무일' | '주휴일' | '휴무일' | '휴가' | '기타'

function normalizeDateLabel(label: string): { date: string; weekday?: string } {
  // 예: "2025-08-29(금)" → { date: "2025-08-29", weekday: "금" }
  if (!label) return { date: '', weekday: undefined }
  const m = label.match(/^(\d{4}-\d{2}-\d{2})(?:\((.+?)\))?/)
  if (m) return { date: m[1], weekday: m[2] }
  return { date: label.trim(), weekday: undefined }
}

function parseClock(s?: string | null): number | null {
  if (!s) return null
  const t = s.trim()
  if (!t || t === '미등록') return null
  const parts = t.split(':').map((x) => parseInt(x, 10))
  if (parts.some((n) => Number.isNaN(n))) return null
  const [hh = 0, mm = 0, ss = 0] =
    parts.length === 2 ? [parts[0], parts[1], 0] : parts
  if (hh < 0 || mm < 0 || ss < 0) return null
  return hh * 3600 + mm * 60 + ss
}

function minutesFloorTo30(min: number): number {
  if (min <= 0) return 0
  return Math.floor(min / MIN_PER_BLOCK) * MIN_PER_BLOCK
}

function classifyType(raw: string | undefined): DayType {
  if (!raw) return '근무일'
  const s = raw.trim()
  if (s.includes('휴가')) return '휴가'
  if (s.includes('주휴일')) return '주휴일'
  if (s.includes('휴무일')) return '휴무일'
  if (s.includes('근무일')) return '근무일'
  // 근로시간에 "08:30 ~ 17:07" 같이 시간대가 올 수도 있음 → 평일로 간주
  if (/\d{1,2}:\d{2}\s*~\s*\d{1,2}:\d{2}/.test(s)) return '근무일'
  return '기타' // 기타는 0 처리(추후 공휴일 규칙 필요 시 확장)
}

function diffMinutesByClocks(
  dateStr: string,
  start?: string,
  end?: string,
): number | null {
  const s = parseClock(start)
  const e = parseClock(end)
  if (s == null || e == null) return null
  const minutes = Math.max(0, Math.floor((e - s) / 60))
  return minutes
}

export type InputRow = {
  날짜라벨: string // "2025-08-29(금)"
  출근시간?: string // "미등록" | "08:01" | "08:01:15" | ""
  퇴근시간?: string // 같은 형식
  근로시간?: string // "근무일" | "주휴일" | "휴무일" | "08:30 ~ 17:07" | "휴가" 등
}

export type ViewRow = {
  날짜: string
  요일?: string
  구분: DayType
  출근?: string
  퇴근?: string
  presenceMin: number | null
  otMin: number // 청구 가능 분
}

function isWeekendLike(t: DayType) {
  return t === '주휴일' || t === '휴무일'
}

function calcRow(r: InputRow): ViewRow {
  const { date, weekday } = normalizeDateLabel(r.날짜라벨)
  const presenceMin = diffMinutesByClocks(date, r.출근시간, r.퇴근시간)
  const type = classifyType(r.근로시간)

  if (presenceMin == null) {
    return {
      날짜: date,
      요일: weekday,
      구분: type,
      출근: r.출근시간,
      퇴근: r.퇴근시간,
      presenceMin,
      otMin: 0,
    }
  }

  if (type === '휴가') {
    return {
      날짜: date,
      요일: weekday,
      구분: type,
      출근: r.출근시간,
      퇴근: r.퇴근시간,
      presenceMin,
      otMin: 0,
    }
  }

  if (type === '근무일') {
    const extra = presenceMin - WEEKDAY_THRESHOLD_MIN // 9.5h 초과분
    const otMin = extra > 0 ? minutesFloorTo30(extra) : 0
    return {
      날짜: date,
      요일: weekday,
      구분: type,
      출근: r.출근시간,
      퇴근: r.퇴근시간,
      presenceMin,
      otMin,
    }
  }

  if (isWeekendLike(type)) {
    const otMin = minutesFloorTo30(presenceMin) // 버퍼 없이 체류시간 전체를 30분 단위로 청구
    return {
      날짜: date,
      요일: weekday,
      구분: type,
      출근: r.출근시간,
      퇴근: r.퇴근시간,
      presenceMin,
      otMin,
    }
  }

  // 기타(예: 공휴일 문자열 등) → 필요시 주말 규칙으로 확장 가능
  return {
    날짜: date,
    요일: weekday,
    구분: type,
    출근: r.출근시간,
    퇴근: r.퇴근시간,
    presenceMin,
    otMin: 0,
  }
}

function formatHM(min: number) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h}시간 ${m}분`
}

function parseUploaded(text: string): InputRow[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length === 0) return []
  const sep = lines[0].includes('\t') ? '\t' : ','
  const header = lines[0].split(sep).map((s) => s.trim())

  const idxDate = header.findIndex(
    (h) => h.includes('근무일') || h.includes('오름차순내림차순'),
  )
  const idxIn = header.findIndex((h) => h === '출근시간')
  const idxOut = header.findIndex((h) => h === '퇴근시간')
  const idxType = header.findIndex((h) => h === '근로시간')

  const out: InputRow[] = []
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(sep).map((s) => s.trim())
    if (idxDate < 0 || !cols[idxDate]) continue
    out.push({
      날짜라벨: cols[idxDate],
      출근시간: idxIn >= 0 ? cols[idxIn] : undefined,
      퇴근시간: idxOut >= 0 ? cols[idxOut] : undefined,
      근로시간: idxType >= 0 ? cols[idxType] : undefined,
    })
  }
  return out
}

const SAMPLE_ROWS: InputRow[] = [
  {
    날짜라벨: '2025-08-29(금)',
    출근시간: '미등록',
    퇴근시간: '미등록',
    근로시간: '근무일',
  },
  {
    날짜라벨: '2025-08-28(목)',
    출근시간: '08:01:15',
    퇴근시간: '17:07:15',
    근로시간: '08:30 ~ 17:07',
  },
  {
    날짜라벨: '2025-08-24(일)',
    출근시간: '13:13:00',
    퇴근시간: '16:41:05',
    근로시간: '주휴일',
  },
  {
    날짜라벨: '2025-08-09(토)',
    출근시간: '21:20:12',
    퇴근시간: '22:09:51',
    근로시간: '휴무일',
  },
  {
    날짜라벨: '2025-08-21(목)',
    출근시간: '08:01:23',
    퇴근시간: '18:10:18',
    근로시간: '근무일',
  },
]

export default function OvertimeCalculatorExcelSpec() {
  const [rows, setRows] = useState<InputRow[]>(SAMPLE_ROWS)
  const fileRef = useRef<HTMLInputElement>(null)

  const calc = useMemo(() => {
    const enriched: ViewRow[] = rows.map(calcRow)
    const weekday = enriched
      .filter((r) => r.구분 === '근무일')
      .reduce((a, b) => a + b.otMin, 0)
    const weekend = enriched
      .filter((r) => r.구분 === '주휴일' || r.구분 === '휴무일')
      .reduce((a, b) => a + b.otMin, 0)
    const total = weekday + weekend
    return { enriched, weekday, weekend, total }
  }, [rows])

  function downloadTemplate() {
    // 헤더를 지정된 사양에 맞춤. 다른 열도 포함하지만 계산은 4개만 사용.
    const csv = [
      '근무일 오름차순내림차순,출근시간,퇴근시간,근로시간,휴게시간,휴가시간,총 시간,시간외근무,출퇴근 요청,최종 수정일시',
      ...rows.map((r) =>
        [
          r.날짜라벨,
          r.출근시간 ?? '',
          r.퇴근시간 ?? '',
          r.근로시간 ?? '',
          '',
          '',
          '',
          '',
          '',
          '',
        ].join(','),
      ),
    ].join('\n')
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'overtime_template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  async function onUpload(file: File) {
    const text = await file.text()
    const parsed = parseUploaded(text)
    if (parsed.length) setRows(parsed)
  }

  function addEmpty() {
    setRows((prev) => [
      ...prev,
      {
        날짜라벨: '2025-08-30(토)',
        출근시간: '',
        퇴근시간: '',
        근로시간: '휴무일',
      },
    ])
  }

  function update(idx: number, key: keyof InputRow, value: string) {
    setRows((prev) =>
      prev.map((r, i) => (i === idx ? { ...r, [key]: value } : r)),
    )
  }

  function formatHM2(min: number) {
    const h = Math.floor(min / 60)
    const m = min % 60
    return `${h}시간 ${m}분`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">야근 계산기 (엑셀 양식 대응)</h1>
            <p className="mt-1 text-sm text-gray-600">
              사용 컬럼:{' '}
              <b>근무일 오름차순내림차순 / 출근시간 / 퇴근시간 / 근로시간</b> —
              나머지 컬럼은 무시됩니다.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="rounded-xl bg-white px-3 py-2 shadow hover:shadow-md"
              onClick={downloadTemplate}
            >
              현재 데이터로 CSV
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-4 shadow">
            <h2 className="mb-2 font-semibold">엑셀/CSV 업로드</h2>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,text/csv"
              className="block w-full text-sm"
              onChange={(e) => {
                const f = e.currentTarget.files?.[0]
                if (f) onUpload(f)
              }}
            />
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-gray-500">
              <li>
                헤더는 반드시 다음과 같이 포함되어야 합니다:{' '}
                <em>근무일 오름차순내림차순, 출근시간, 퇴근시간, 근로시간</em>
              </li>
              <li>
                출근/퇴근은 <em>미등록</em> 또는 <em>HH:mm</em>/
                <em>HH:mm:ss</em> 또는 공백
              </li>
              <li>
                근로시간은 <em>근무일/주휴일/휴무일/휴가</em> 또는{' '}
                <em>08:30 ~ 17:07</em> 같은 시간대
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow">
            <h2 className="mb-2 font-semibold">행 추가</h2>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <input
                className="rounded-lg border px-2 py-1"
                placeholder="2025-08-29(금)"
                onChange={(e) =>
                  update(rows.length - 1, '날짜라벨', e.target.value)
                }
              />
              <input
                className="rounded-lg border px-2 py-1"
                placeholder="08:00 또는 미등록"
                onChange={(e) =>
                  update(rows.length - 1, '출근시간', e.target.value)
                }
              />
              <input
                className="rounded-lg border px-2 py-1"
                placeholder="17:30"
                onChange={(e) =>
                  update(rows.length - 1, '퇴근시간', e.target.value)
                }
              />
              <input
                className="rounded-lg border px-2 py-1"
                placeholder="근무일/주휴일/휴무일 또는 08:30 ~ 17:07"
                onChange={(e) =>
                  update(rows.length - 1, '근로시간', e.target.value)
                }
              />
            </div>
            <button
              className="mt-3 rounded-xl bg-indigo-600 px-3 py-2 text-white shadow hover:shadow-lg"
              onClick={addEmpty}
            >
              빈 행 추가
            </button>
          </div>
        </section>

        <section className="overflow-auto rounded-2xl bg-white p-4 shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-600">
                <th className="py-2 pr-2">#</th>
                <th className="py-2 pr-2">근무일 오름차순내림차순</th>
                <th className="py-2 pr-2">출근시간</th>
                <th className="py-2 pr-2">퇴근시간</th>
                <th className="py-2 pr-2">근로시간</th>
                <th className="py-2 pr-2 text-right">실체류(분)</th>
                <th className="py-2 pr-2 text-right">야근(분)</th>
                <th className="py-2 pr-2 text-right">야근(시간)</th>
              </tr>
            </thead>
            <tbody>
              {calc.enriched.map((r, idx) => (
                <tr key={idx} className="border-b last:border-0">
                  <td className="py-2 pr-2 text-gray-500">{idx + 1}</td>
                  <td className="py-2 pr-2">
                    {r.날짜}
                    {r.요일 ? `(${r.요일})` : ''}
                  </td>
                  <td className="py-2 pr-2">{r.출근 ?? ''}</td>
                  <td className="py-2 pr-2">{r.퇴근 ?? ''}</td>
                  <td className="py-2 pr-2">{r.구분}</td>
                  <td className="py-2 pr-2 text-right tabular-nums">
                    {r.presenceMin ?? ''}
                  </td>
                  <td className="py-2 pr-2 text-right font-medium tabular-nums">
                    {r.otMin}
                  </td>
                  <td className="py-2 pr-2 text-right tabular-nums">
                    {r.otMin ? formatHM2(r.otMin) : '0분'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 shadow">
            <div className="text-sm text-gray-500">평일 야근 합계</div>
            <div className="mt-1 text-2xl font-semibold">
              {formatHM2(calc.weekday)}
            </div>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow">
            <div className="text-sm text-gray-500">
              주말 근무 합계(휴무일/주휴일)
            </div>
            <div className="mt-1 text-2xl font-semibold">
              {formatHM2(calc.weekend)}
            </div>
          </div>
          <div className="rounded-2xl bg-indigo-600 p-4 text-white shadow">
            <div className="text-sm text-indigo-100">총 청구 가능 시간</div>
            <div className="mt-1 text-2xl font-semibold">
              {formatHM2(calc.total)}
            </div>
          </div>
        </section>

        <footer className="text-xs text-gray-500">
          <p>
            ※ 평일 임계치(9.5시간 = 8h 근로 + 1h 휴게 + 0.5h 추가휴식)
            초과분부터 30분 단위로 산정됩니다.
          </p>
          <p>
            ※ 주말(휴무일, 주휴일)은 체류시간 전체를 30분 단위로 산정합니다.
          </p>
          <p>
            ※ 근로시간이 시간대(예: 08:30 ~ 17:07)로 들어온 경우 평일로
            간주합니다. 공휴일 규칙이 필요하면 알려주세요.
          </p>
        </footer>
      </div>
    </div>
  )
}
