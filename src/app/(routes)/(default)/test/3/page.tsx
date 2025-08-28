import React from 'react'

/** degree → rad */
const toRad = (deg: number) => (deg * Math.PI) / 180

/* =============================================================
   ArrowCircleWithDots (외곽 화살표)
   =============================================================*/
export function ArrowCircleWithDots({
  size = 400,
  radius = 150,
  gap = 5, // ° 간격
  className = '',
}: {
  size?: number
  radius?: number
  gap?: number
  className?: string
}) {
  const cx = size / 2
  const cy = cx
  const SEG = 120 // 3-way split
  const point = (deg: number) => [
    cx + radius * Math.cos(toRad(deg)),
    cy + radius * Math.sin(toRad(deg)),
  ]

  const segments = [0, 1, 2].map((i) => {
    const start = -90 + i * SEG + gap / 2
    const end = start + SEG - gap
    return { start, end }
  })

  const colors = ['#60a5fa', '#34d399', '#fbbf24']

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
    >
      <defs>
        <marker
          id="arrowMarker"
          viewBox="0 0 6 6"
          refX="3"
          refY="3"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L6 3 L0 6 Z" fill="currentColor" />
        </marker>
      </defs>

      {segments.map(({ start, end }, idx) => {
        const [x1, y1] = point(start)
        const [x2, y2] = point(end)
        const clr = colors[idx]
        return (
          <g key={idx} stroke={clr} fill={clr}>
            {/* start dot */}
            <circle cx={x1} cy={y1} r={6} />
            {/* arc */}
            <path
              d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
              fill="none"
              strokeWidth={2}
              markerEnd="url(#arrowMarker)"
            />
          </g>
        )
      })}
    </svg>
  )
}

/* =============================================================
   DonutSegments (내부 도넛)
   =============================================================*/
export function DonutSegments({
  size = 400, // 동일한 viewBox 크기 → 자동 정중앙 align
  outerRadius = 100,
  innerRadius = 50,
  strokeColor = '#000',
  strokeWidth = 1.5,
  segmentCount = 3,
  className = '',
}: {
  size?: number
  outerRadius?: number
  innerRadius?: number
  strokeColor?: string
  strokeWidth?: number
  segmentCount?: number
  className?: string
}) {
  const cx = size / 2
  const cy = cx
  const segAngle = 360 / segmentCount
  const point = (deg: number, r: number) => [
    cx + r * Math.cos(toRad(deg)),
    cy + r * Math.sin(toRad(deg)),
  ]

  const makePath = (startDeg: number) => {
    const endDeg = startDeg + segAngle
    const [x1, y1] = point(startDeg, outerRadius)
    const [x2, y2] = point(endDeg, outerRadius)
    const [x3, y3] = point(endDeg, innerRadius)
    const [x4, y4] = point(startDeg, innerRadius)
    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 0 0 ${x4} ${y4} Z`
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
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

/* =============================================================
   Page (overlay two separate components, perfectly centered)
   =============================================================*/
export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      {/* relative wrapper for overlay */}
      <div className="relative h-[400px] w-[400px]">
        {/* bottom layer: arrow circle */}
        <ArrowCircleWithDots className="absolute inset-0" />
        {/* top layer: donut */}
        <DonutSegments
          className="absolute inset-0"
          outerRadius={100}
          innerRadius={50}
        />
      </div>
    </div>
  )
}
