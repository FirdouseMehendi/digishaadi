// Stylised, faceless vector illustrations used until real photos are supplied.
const SKIN = '#d9a77a', GOLD = '#e9c46a', GOLD_HI = '#fff4c2'

const Bg = ({ id }) => (
  <defs>
    <radialGradient id={id} cx=".5" cy=".35" r=".8"><stop offset="0" stopColor="#14805a" /><stop offset="1" stopColor="#04241a" /></radialGradient>
  </defs>
)

export function GroomArt() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="Groom illustration">
      <Bg id="gb" /><rect width="200" height="200" fill="url(#gb)" />
      {/* sherwani */}
      <path d="M18 200 C18 152 58 136 100 136 C142 136 182 152 182 200 Z" fill="#f7ecd0" />
      <path d="M40 168 C58 154 76 152 88 158 M160 168 C142 154 124 152 112 158" stroke={GOLD} strokeWidth="2.5" fill="none" />
      <path d="M78 138 L100 170 L122 138 Z" fill={GOLD} />
      <path d="M100 170 V200" stroke={GOLD} strokeWidth="2" />
      {[178, 188, 198].map((y) => <circle key={y} cx="100" cy={y} r="3" fill={GOLD} />)}
      {/* neck + head */}
      <rect x="89" y="116" width="22" height="26" rx="6" fill="#c8946a" />
      <ellipse cx="72" cy="94" rx="5" ry="9" fill="#c8946a" /><ellipse cx="128" cy="94" rx="5" ry="9" fill="#c8946a" />
      <ellipse cx="100" cy="92" rx="28" ry="32" fill={SKIN} />
      {/* beard */}
      <path d="M73 98 C75 128 125 128 127 98 C119 114 81 114 73 98 Z" fill="#2b1a12" />
      {/* cap */}
      <path d="M71 76 C71 50 129 50 129 76 Z" fill="#fffaf0" />
      <path d="M71 76 H129" stroke={GOLD} strokeWidth="6" />
      <path d="M80 66 L100 56 L120 66" stroke={GOLD} strokeWidth="1.5" fill="none" opacity=".7" />
    </svg>
  )
}

export function BrideArt() {
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label="Bride illustration">
      <Bg id="bb" /><rect width="200" height="200" fill="url(#bb)" />
      {/* dupatta */}
      <path d="M100 26 C52 26 38 80 38 132 C38 170 28 188 16 200 H184 C172 188 162 170 162 132 C162 80 148 26 100 26 Z" fill="#a3153d" stroke={GOLD} strokeWidth="4" />
      <path d="M50 150 C50 110 56 70 100 40 C144 70 150 110 150 150" stroke={GOLD} strokeWidth="1.6" fill="none" opacity=".6" strokeDasharray="3 5" />
      {/* outfit */}
      <path d="M42 200 C48 166 78 152 100 154 C122 152 152 166 158 200 Z" fill="#7a0f2e" stroke={GOLD} strokeWidth="2" />
      {/* neck + face */}
      <rect x="89" y="128" width="22" height="26" rx="6" fill="#c8946a" />
      <ellipse cx="100" cy="98" rx="30" ry="38" fill={SKIN} />
      {/* hair line under dupatta */}
      <path d="M70 84 C78 56 122 56 130 84 C118 70 82 70 70 84 Z" fill="#2b1a12" />
      <path d="M70 84 C78 56 122 56 130 84" stroke={GOLD} strokeWidth="3" fill="none" />
      {/* maang tikka */}
      <path d="M100 58 V80" stroke={GOLD} strokeWidth="2" /><circle cx="100" cy="84" r="5" fill={GOLD} /><path d="M100 90 l-3 8 h6 z" fill={GOLD} />
      {/* earrings */}
      <circle cx="68" cy="114" r="4" fill={GOLD} /><path d="M68 118 v8" stroke={GOLD} strokeWidth="2" /><circle cx="68" cy="129" r="3.5" fill={GOLD_HI} />
      <circle cx="132" cy="114" r="4" fill={GOLD} /><path d="M132 118 v8" stroke={GOLD} strokeWidth="2" /><circle cx="132" cy="129" r="3.5" fill={GOLD_HI} />
      {/* necklace */}
      <path d="M72 154 C84 176 116 176 128 154" stroke={GOLD} strokeWidth="4" fill="none" />
      <circle cx="100" cy="172" r="5" fill={GOLD_HI} stroke={GOLD} strokeWidth="2" />
    </svg>
  )
}

const Marigold = ({ x, y, r = 30, c1 = '#ffb300', c2 = '#ff8f00' }) => (
  <g transform={`translate(${x} ${y})`}>
    {Array.from({ length: 14 }, (_, i) => (
      <ellipse key={i} cx="0" cy={-r * 0.62} rx={r * 0.26} ry={r * 0.5} fill={i % 2 ? c1 : c2} transform={`rotate(${i * (360 / 14)})`} />
    ))}
    <circle r={r * 0.28} fill="#b45f06" />
  </g>
)

export function HaldiArt() {
  const petals = [[60, 40], [330, 60], [90, 250], [310, 240], [200, 30], [40, 150], [360, 160]]
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Haldi illustration" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffe680" /><stop offset="1" stopColor="#f2a900" /></linearGradient></defs>
      <rect width="400" height="300" fill="url(#hg)" />
      {petals.map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="9" ry="5" fill={i % 2 ? '#ff9f1a' : '#ffd23f'} transform={`rotate(${i * 40} ${x} ${y})`} opacity=".9" />)}
      {/* leaves */}
      <path d="M70 230 C100 200 140 205 160 225 C130 245 95 248 70 230Z" fill="#2e7d32" /><path d="M330 230 C300 200 260 205 240 225 C270 245 305 248 330 230Z" fill="#2e7d32" />
      {/* brass bowl */}
      <path d="M110 170 C112 245 288 245 290 170 Z" fill="#d9a93b" stroke="#8a6414" strokeWidth="3" />
      <path d="M130 190 C150 230 250 230 270 190" stroke="#fff1b8" strokeWidth="3" fill="none" opacity=".6" />
      <ellipse cx="200" cy="170" rx="90" ry="20" fill="#b98a2b" stroke="#8a6414" strokeWidth="3" />
      <ellipse cx="200" cy="168" rx="76" ry="14" fill="#ffb800" />
      <ellipse cx="180" cy="165" rx="24" ry="5" fill="#ffd966" opacity=".8" />
      {/* flowers */}
      <Marigold x={120} y={152} r={30} /><Marigold x={285} y={150} r={32} c1="#ffc107" c2="#ff9800" /><Marigold x={200} y={134} r={34} c1="#ffca28" c2="#fb8c00" />
      <Marigold x={52} y={90} r={22} /><Marigold x={348} y={96} r={24} c1="#ffd54f" c2="#ff8f00" />
    </svg>
  )
}

const Hand = () => {
  const ink = '#6b230d'
  return (
    <g>
      <rect x="55" y="205" width="70" height="52" rx="10" fill="#e3b48c" />
      <rect x="40" y="62" width="21" height="80" rx="10.5" fill="#e3b48c" />
      <rect x="63" y="38" width="22" height="100" rx="11" fill="#e3b48c" />
      <rect x="87" y="28" width="22" height="110" rx="11" fill="#e3b48c" />
      <rect x="111" y="44" width="22" height="94" rx="11" fill="#e3b48c" />
      <rect x="0" y="130" width="28" height="74" rx="14" fill="#e3b48c" transform="rotate(-30 14 167)" />
      <rect x="36" y="108" width="104" height="108" rx="40" fill="#e3b48c" />
      {/* mandala */}
      <g transform="translate(88 164)" stroke={ink} fill="none" strokeWidth="1.8">
        <circle r="7" fill={ink} /><circle r="15" /><circle r="25" strokeDasharray="2 3" />
        {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="0" cy="-20" rx="4.5" ry="9" transform={`rotate(${i * 45})`} />)}
        {Array.from({ length: 16 }, (_, i) => <circle key={i} r="1.4" cx="0" cy="-33" transform={`rotate(${i * 22.5})`} fill={ink} />)}
      </g>
      {/* finger vines */}
      {[[50, 76], [74, 54], [98, 44], [122, 60]].map(([x, y], i) => (
        <g key={i} stroke={ink} fill={ink} strokeWidth="1.6">
          <path d={`M${x} ${y} v70`} fill="none" strokeDasharray="1 5" />
          {[0, 1, 2, 3].map((k) => <ellipse key={k} cx={x} cy={y + 8 + k * 17} rx="3.4" ry="5" />)}
        </g>
      ))}
      {/* bangles */}
      <rect x="50" y="224" width="80" height="9" rx="4.5" fill="#e9c46a" stroke="#b98a2b" /><rect x="50" y="238" width="80" height="9" rx="4.5" fill="#e9c46a" stroke="#b98a2b" />
    </g>
  )
}

export function MehendiArt() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Mehendi illustration" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f7e2c0" /><stop offset="1" stopColor="#c98a5a" /></linearGradient></defs>
      <rect width="400" height="300" fill="url(#mg)" />
      <g stroke="#6b230d" fill="none" strokeWidth="1.6" opacity=".35">
        {[[30, 40], [370, 40], [30, 260], [370, 260]].map(([x, y]) => (
          <g key={x + '-' + y} transform={`translate(${x} ${y})`}><circle r="10" /><circle r="18" strokeDasharray="2 3" />{Array.from({ length: 8 }, (_, i) => <ellipse key={i} cy="-14" rx="3" ry="6" transform={`rotate(${i * 45})`} />)}</g>
        ))}
      </g>
      <g transform="translate(24 14) scale(.98)"><Hand /></g>
      <g transform="translate(376 14) scale(-.98 .98)"><Hand /></g>
    </svg>
  )
}

export function NikahArt() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Nikah illustration" preserveAspectRatio="xMidYMid slice">
      <defs><radialGradient id="ng" cx=".5" cy=".3" r=".9"><stop offset="0" stopColor="#14805a" /><stop offset="1" stopColor="#04241a" /></radialGradient></defs>
      <rect width="400" height="300" fill="url(#ng)" />
      <path d="M80 300 V150 C80 95 140 70 200 18 C260 70 320 95 320 150 V300" stroke={GOLD} strokeWidth="4" fill="rgba(255,244,194,.06)" />
      <path d="M100 300 V155 C100 108 150 88 200 44 C250 88 300 108 300 155 V300" stroke={GOLD} strokeWidth="1.6" fill="none" opacity=".6" />
      <circle cx="200" cy="140" r="38" fill={GOLD} /><circle cx="216" cy="132" r="34" fill="#0a4a33" />
      <path d="M232 124 l4 10 10 1 -8 7 3 10 -9 -6 -9 6 3 -10 -8 -7 10 -1z" fill={GOLD_HI} transform="translate(-6 8) scale(.8)" />
      {[[40, 60], [360, 60], [60, 220], [340, 220], [130, 40], [270, 40]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 2 ? 3 : 4.5} fill={GOLD} opacity=".7" />)}
      {[48, 352].map((x) => (
        <g key={x} transform={`translate(${x} 20)`}><path d="M0 0 V50" stroke={GOLD} /><path d="M-10 50 h20 l6 28 c4 20 -8 32 -16 40 c-8 -8 -20 -20 -16 -40 z" fill="rgba(255,214,120,.3)" stroke={GOLD} strokeWidth="2" /><circle cy="84" r="16" fill="#ffd25e" opacity=".5" /></g>
      ))}
    </svg>
  )
}

export const EVENT_ART = { haldi: HaldiArt, mehendi: MehendiArt, nikah: NikahArt }
