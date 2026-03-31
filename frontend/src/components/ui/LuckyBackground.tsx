interface FloatingItem {
  type: string
  top?: string
  left?: string
  right?: string
  bottom?: string
  size: number
  delay: string
  duration: string
  anim: string
}

interface StarItem {
  top?: string
  left?: string
  right?: string
  bottom?: string
  size: number
  color: string
  delay: string
  duration: string
  spin: boolean
}

interface DiamondItem {
  top?: string
  bottom?: string
  left?: string
  right?: string
  size: number
  color: string
  delay: string
  duration: string
}

export default function LuckyBackground() {
  const items: FloatingItem[] = [
    { type: "clover", top: "8px",    left: "10px",  size: 32, delay: "0s",   duration: "7s",  anim: "float1" },
    { type: "clover", top: "12px",   right: "18px", size: 28, delay: "1s",   duration: "9s",  anim: "float2" },
    { type: "clover", top: "85px",   left: "42%",   size: 26, delay: "2s",   duration: "11s", anim: "float3" },
    { type: "clover", top: "160px",  left: "22%",   size: 30, delay: "0.5s", duration: "8s",  anim: "float4" },
    { type: "clover", top: "200px",  right: "10%",  size: 24, delay: "3s",   duration: "10s", anim: "float1" },
    { type: "clover", bottom: "30px",left: "15px",  size: 32, delay: "1.5s", duration: "9s",  anim: "float2" },
    { type: "clover", bottom: "15px",right: "14px", size: 28, delay: "0.8s", duration: "8s",  anim: "float3" },
    { type: "clover", bottom: "90px",left: "48%",   size: 22, delay: "2.5s", duration: "12s", anim: "float1" },
    { type: "clover", top: "45%",    left: "5px",   size: 20, delay: "4s",   duration: "11s", anim: "float5" },
    { type: "clover", top: "55%",    right: "5px",  size: 24, delay: "1.8s", duration: "9s",  anim: "float2" },
    { type: "horse",  top: "55px",   left: "6px",   size: 28, delay: "0.5s", duration: "8s",  anim: "float4" },
    { type: "horse",  top: "45px",   right: "50px", size: 26, delay: "1.5s", duration: "10s", anim: "float5" },
    { type: "horse",  top: "115px",  right: "12px", size: 24, delay: "1.2s", duration: "7s",  anim: "float4" },
    { type: "horse",  bottom: "50px",left: "50%",   size: 26, delay: "2.5s", duration: "12s", anim: "float3" },
    { type: "horse",  top: "35%",    left: "20%",   size: 22, delay: "3.5s", duration: "9s",  anim: "float1" },
    { type: "horse",  bottom: "120px",right: "25%", size: 24, delay: "0.3s", duration: "11s", anim: "float2" },
    { type: "horse",  top: "70%",    left: "60%",   size: 20, delay: "2s",   duration: "8s",  anim: "float5" },
  ]

  const stars: StarItem[] = [
    { top: "25%",    left: "25%",   size: 22, color: "#4A7C40", delay: "0.3s", duration: "11s", spin: false },
    { top: "55%",    right: "15%",  size: 18, color: "#C89020", delay: "2s",   duration: "9s",  spin: false },
    { bottom: "20%", left: "52%",   size: 26, color: "#4A7C40", delay: "1s",   duration: "25s", spin: true  },
    { top: "38%",    left: "72%",   size: 16, color: "#2E6828", delay: "1.8s", duration: "8s",  spin: false },
    { top: "15%",    left: "55%",   size: 14, color: "#C89020", delay: "3s",   duration: "10s", spin: false },
    { bottom: "40%", left: "8%",    size: 20, color: "#4A7C40", delay: "0.7s", duration: "13s", spin: true  },
    { top: "80%",    left: "35%",   size: 16, color: "#2E6828", delay: "2.5s", duration: "9s",  spin: false },
    { top: "65%",    right: "40%",  size: 12, color: "#C89020", delay: "4s",   duration: "7s",  spin: false },
  ]

  const diamonds: DiamondItem[] = [
    { bottom: "28px", left: "65%",  size: 18, color: "#2E6828", delay: "2.2s", duration: "10s" },
    { top: "135px",   left: "72%",  size: 14, color: "#C89020", delay: "0.7s", duration: "12s" },
    { top: "32px",    left: "78%",  size: 16, color: "#4A7C40", delay: "3.2s", duration: "9s"  },
    { top: "45%",     left: "38%",  size: 12, color: "#2E6828", delay: "1.4s", duration: "11s" },
    { bottom: "35%",  right: "8%",  size: 16, color: "#C89020", delay: "2.8s", duration: "8s"  },
    { top: "72%",     left: "15%",  size: 14, color: "#4A7C40", delay: "0.4s", duration: "10s" },
    { bottom: "15%",  left: "30%",  size: 18, color: "#2E6828", delay: "3.8s", duration: "7s"  },
  ]

  return (
    <>
      <style>{`
        @keyframes float1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(14deg)} }
        @keyframes float2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-7px) rotate(-10deg)} }
        @keyframes float3 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(8deg)} }
        @keyframes float4 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(-16deg)} }
        @keyframes float5 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-9px) rotate(12deg)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">

        {items.map((item, i) => (
          <div
            key={i}
            className="absolute select-none"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              fontSize: item.size,
              opacity: item.type === "clover" ? 0.35 : 0.28,
              animation: `${item.anim} ${item.duration} ease-in-out infinite ${item.delay}`,
              filter: "saturate(0.8)",
            }}
          >
            {item.type === "clover" ? "🍀" : "🍀"}
          </div>
        ))}

        {items.map((item, i) => (
          item.type === "horse" ? (
            <div
              key={`horse-${i}`}
              className="absolute select-none"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
                fontSize: item.size,
                opacity: 0.28,
                animation: `${item.anim} ${item.duration} ease-in-out infinite ${item.delay}`,
              }}
            >
              🧲
            </div>
          ) : null
        ))}

        {stars.map((s, i) => (
          <svg
            key={`star-${i}`}
            className="absolute"
            width={s.size}
            height={s.size}
            viewBox="0 0 20 20"
            style={{
              top: s.top,
              right: s.right,
              bottom: s.bottom,
              left: s.left,
              opacity: 0.30,
              animation: s.spin
                ? `spin-slow ${s.duration} linear infinite`
                : `float3 ${s.duration} ease-in-out infinite ${s.delay}`,
            }}
          >
            <path d="M10 1l2.5 6H19l-5.3 3.9 2 6.1L10 13.5l-5.7 3.5 2-6.1L1 7h6.5z" fill={s.color} />
          </svg>
        ))}

        {diamonds.map((d, i) => (
          <svg
            key={`diamond-${i}`}
            className="absolute"
            width={d.size}
            height={d.size}
            viewBox="0 0 20 20"
            style={{
              top: d.top,
              bottom: d.bottom,
              left: d.left,
              right: d.right,
              opacity: 0.28,
              animation: `float2 ${d.duration} ease-in-out infinite ${d.delay}`,
            }}
          >
            <polygon points="10,1 19,10 10,19 1,10" fill={d.color} />
          </svg>
        ))}

      </div>
    </>
  )
}