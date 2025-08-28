export default function Page() {
  return (
    <div>
      <ArrowCircleWithDots />
      <DonutSegments />
    </div>
  )
}

export function ArrowCircleWithDots() {
  const cx = 200
  const cy = 200
  const r = 150 // 큰 원 반지름
  const SEG = 120 // 분할 각도
  const GAP = 5 // 화살표 간격(°) – 값 키우면 간격 넓어짐

  const point = (deg: number) => {
    const rad = (deg * Math.PI) / 180
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
  }

  // 3개의 세그먼트 각도 범위 계산
  const segments = [0, 1, 2].map((i) => {
    const start = -90 + i * SEG + GAP / 2
    const end = start + SEG - GAP
    return { start, end }
  })

  const colors = ['#60a5fa', '#34d399', '#fbbf24'] // 필요 없으면 한색만 써도 OK

  return (
    <svg width={400} height={400} viewBox="0 0 400 400">
      <defs>
        <marker
          id="arrow"
          viewBox="0 0 6 6"
          refX="3"
          refY="3"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L6 3 L0 6 Z" fill="black" />
        </marker>
      </defs>

      {segments.map(({ start, end }, idx) => {
        const [x1, y1] = point(start)
        const [x2, y2] = point(end)

        return (
          <g key={idx}>
            {/* ① 시작점에 작은 원 */}
            <circle cx={x1} cy={y1} r={6} fill={colors[idx]} />

            {/* ② 120°-GAP 원호 & 화살표 */}
            <path
              d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
              fill="none"
              stroke={colors[idx]}
              strokeWidth="2"
              markerEnd="url(#arrow)"
            />
          </g>
        )
      })}
    </svg>
  )
}

/**
 * 세 등분된 도넛(안이 뚫린 원) SVG 컴포넌트
 * - `outerRadius` : 바깥 반지름(px)
 * - `innerRadius` : 안쪽(뚫린) 반지름(px)
 * - `strokeColor`  : 테두리 색상
 * - `strokeWidth` : 선 두께(px)
 * - `segmentCount` : 조각 개수(기본 3)
 */
export function DonutSegments({
  outerRadius = 120,
  innerRadius = 60,
  strokeColor = '#000000',
  strokeWidth = 1.5,
  segmentCount = 3,
}: {
  outerRadius?: number
  innerRadius?: number
  strokeColor?: string
  strokeWidth?: number
  segmentCount?: number
}) {
  const cx = outerRadius + strokeWidth // viewBox padding 고려
  const cy = cx
  const size = cx * 2 // svg width/height

  // 각도 → 좌표 변환
  const point = (deg: number, r: number) => {
    const rad = (deg * Math.PI) / 180
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
  }

  const segAngle = 360 / segmentCount

  // 조각 경로 생성
  const makePath = (startDeg: number) => {
    const endDeg = startDeg + segAngle

    // 바깥 원호 시작/끝
    const [x1, y1] = point(startDeg, outerRadius)
    const [x2, y2] = point(endDeg, outerRadius)

    // 안쪽 원호 시작/끝 (끝→시작 역방향)
    const [x3, y3] = point(endDeg, innerRadius)
    const [x4, y4] = point(startDeg, innerRadius)

    // large-arc-flag : segAngle > 180 ? 1 : 0  (여기선 0)
    // sweep-flag     : 시계방향 1

    return `M ${x1} ${y1}
            A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2}
            L ${x3} ${y3}
            A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4}
            Z`
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-label="donut-segments"
    >
      {Array.from({ length: segmentCount }).map((_, i) => (
        <path
          key={i}
          d={makePath(-90 + i * segAngle)}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
        />
      ))}

      {/* 안쪽, 바깥쪽 원 테두리를 추가로 그려 선이 겹쳐도 선명하게 */}
      <circle
        cx={cx}
        cy={cy}
        r={innerRadius}
        fill="transparent"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
      <circle
        cx={cx}
        cy={cy}
        r={outerRadius}
        fill="transparent"
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />
    </svg>
  )
}
