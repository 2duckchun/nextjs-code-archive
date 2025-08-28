export default function TestPage() {
  const radius = 297
  const center = 600 // SVG 크기 기준 중심 좌표
  const circumference = 2 * Math.PI * radius
  const segmentLength = circumference / 3

  return (
    <div className="relative h-screen w-screen bg-white">
      {/* 동심원 배경 */}
      <svg
        className="pointer-events-none fixed left-1/2 top-1/2 z-0 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2"
        viewBox="0 0 1200 1200"
      >
        {/* 이 아래부터는 그냥 원 */}
        <circle
          cx={center}
          cy={center}
          r={297 + 157}
          stroke="#e0f2fe"
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={297 + 157 + 170}
          stroke="#e0f2fe"
          strokeWidth="1"
          fill="none"
        />
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius}
            stroke={['#60a5fa', '#34d399', '#fbbf24'][i]}
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${segmentLength} ${
              circumference - segmentLength
            }`}
            strokeDashoffset={-segmentLength * i}
            transform={`rotate(-90 ${center} ${center})`}
          />
        ))}
      </svg>

      {/* 중앙 원 */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-[132px] w-[132px] items-center justify-center rounded-full bg-blue-500 text-3xl text-white shadow-md">
          A
        </div>
      </div>
    </div>
  )
}

// export default function TestPage() {
//   const radius = 297
//   const center = 300 // SVG 크기 가정
//   const circumference = 2 * Math.PI * radius
//   const segmentLength = circumference / 3

//   return (
//     <div>
//       {/* 동심원 배경 */}
//       <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full">
//         <circle
//           cx="50%"
//           cy="50%"
//           r={297 + 157 + 170}
//           stroke="#e0f2fe"
//           strokeWidth="1"
//           fill="none"
//         />
//         <circle
//           cx="50%"
//           cy="50%"
//           r={297 + 157}
//           stroke="#e0f2fe"
//           strokeWidth="1"
//           fill="none"
//         />
//         {[0, 1, 2].map((i) => (
//           <circle
//             key={i}
//             cx={center}
//             cy={center}
//             r={radius}
//             stroke={['#60a5fa', '#34d399', '#fbbf24'][i]} // 예시 색
//             strokeWidth="4"
//             fill="none"
//             strokeDasharray={`${segmentLength} ${
//               circumference - segmentLength
//             }`}
//             strokeDashoffset={-segmentLength * i}
//             transform={`rotate(-90 ${center} ${center})`}
//           />
//         ))}
//       </svg>

//       {/* 중앙 원 */}
//       <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
//         <div className="flex h-[132px] w-[132px] items-center justify-center rounded-full bg-blue-500 text-3xl text-white shadow-md">
//           A
//         </div>
//       </div>
//     </div>
//   )
// }
