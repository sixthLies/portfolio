const PARTICLES = [
  { x: 101, y: 16, r: 1.6, delay: "0s", scale: 1 },
  { x: 126, y: 21, r: 1.1, delay: "-0.8s", scale: 0.72 },
  { x: 148, y: 34, r: 1.5, delay: "-1.9s", scale: 0.94 },
  { x: 165, y: 55, r: 0.9, delay: "-0.3s", scale: 0.62 },
  { x: 181, y: 77, r: 1.2, delay: "-1.4s", scale: 0.84 },
  { x: 185, y: 103, r: 1.8, delay: "-2.2s", scale: 1.06 },
  { x: 176, y: 131, r: 1, delay: "-0.6s", scale: 0.7 },
  { x: 162, y: 154, r: 1.4, delay: "-1.1s", scale: 0.88 },
  { x: 139, y: 174, r: 1.1, delay: "-2.6s", scale: 0.76 },
  { x: 111, y: 184, r: 1.7, delay: "-1.7s", scale: 1 },
  { x: 83, y: 182, r: 1, delay: "-0.9s", scale: 0.72 },
  { x: 56, y: 170, r: 1.5, delay: "-2.1s", scale: 0.96 },
  { x: 35, y: 149, r: 1, delay: "-0.2s", scale: 0.68 },
  { x: 20, y: 124, r: 1.3, delay: "-1.6s", scale: 0.86 },
  { x: 16, y: 96, r: 1.9, delay: "-2.4s", scale: 1.08 },
  { x: 23, y: 69, r: 0.9, delay: "-0.7s", scale: 0.64 },
  { x: 39, y: 44, r: 1.4, delay: "-1.2s", scale: 0.9 },
  { x: 64, y: 27, r: 1.1, delay: "-2.8s", scale: 0.78 },
  { x: 92, y: 33, r: 0.9, delay: "-0.4s", scale: 0.66 },
  { x: 122, y: 43, r: 1.3, delay: "-1.5s", scale: 0.84 },
  { x: 149, y: 75, r: 1, delay: "-2.3s", scale: 0.72 },
  { x: 151, y: 115, r: 1.4, delay: "-0.1s", scale: 0.94 },
  { x: 129, y: 145, r: 0.9, delay: "-1.8s", scale: 0.62 },
  { x: 94, y: 154, r: 1.5, delay: "-2.5s", scale: 0.98 },
  { x: 61, y: 137, r: 1, delay: "-0.5s", scale: 0.7 },
  { x: 49, y: 101, r: 1.4, delay: "-1.3s", scale: 0.9 },
  { x: 60, y: 65, r: 0.9, delay: "-2s", scale: 0.64 },
  { x: 82, y: 48, r: 1.2, delay: "-0.9s", scale: 0.82 },
]

export const OrbitLoader = () => {
  return (
    <div className="intro-loader__orbit orbit-loader" aria-hidden="true">
      <svg
        className="orbit-loader__svg"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
      >
        <defs>
          <radialGradient id="orbit-loader-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.68)" />
            <stop offset="46%" stopColor="rgba(168, 85, 247, 0.22)" />
            <stop offset="100%" stopColor="rgba(8, 9, 10, 0)" />
          </radialGradient>
          <linearGradient id="orbit-loader-arc" x1="30%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.92)" />
            <stop offset="45%" stopColor="rgba(139, 92, 246, 0.95)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.9)" />
          </linearGradient>
          <filter id="orbit-loader-soft-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle className="orbit-loader__glow" cx="100" cy="100" r="78" />
        <g className="orbit-loader__particles">
          {PARTICLES.map((particle) => (
            <circle
              key={`${particle.x}-${particle.y}`}
              className="orbit-loader__particle"
              cx={particle.x}
              cy={particle.y}
              r={particle.r}
              style={{
                "--particle-delay": particle.delay,
                "--particle-scale": particle.scale,
              }}
            />
          ))}
        </g>

        <g className="orbit-loader__system">
          <circle className="orbit-loader__ring" cx="100" cy="100" r="67" />
          <circle className="orbit-loader__arc" cx="100" cy="100" r="67" />
          <g className="orbit-loader__ship-track">
            <g className="orbit-loader__ship" transform="translate(167 100) rotate(90)">
              <path
                className="orbit-loader__ship-flame"
                d="M-8 3 C-17 0 -17 -5 -8 -8 C-10 -4 -10 -1 -8 3Z"
              />
              <path
                className="orbit-loader__ship-body"
                d="M-7 -8 L11 0 L-7 8 C-4 3 -4 -3 -7 -8Z"
              />
              <circle className="orbit-loader__ship-core" cx="-1" cy="0" r="2.6" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  )
}
