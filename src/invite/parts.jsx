import { motion } from 'motion/react'

export const fmtDate = (iso, opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', opts)

export function Reveal({ children, delay = 0, y = 30, className = '' }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.7, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

// Section heading with ornament
export function Heading({ kicker, title, sub }) {
  return (
    <Reveal className="mb-8 text-center">
      {kicker && <p className="font-cin text-[11px] tracking-[0.5em] text-gold uppercase">{kicker}</p>}
      <h2 className="gold-text mt-2 font-display text-4xl font-bold leading-tight">{title}</h2>
      <Ornament />
      {sub && <p className="mx-auto mt-3 max-w-xs text-sm text-cream/75">{sub}</p>}
    </Reveal>
  )
}

export function Ornament({ className = '' }) {
  return (
    <svg className={`mx-auto mt-3 ${className}`} width="190" height="18" viewBox="0 0 190 18" fill="none" stroke="#e9c46a" strokeWidth="1.6">
      <path d="M0 9H78" /><path d="M112 9H190" /><path d="M95 1L103 9L95 17L87 9Z" fill="#e9c46a" />
    </svg>
  )
}

export function Lantern({ className = '', delay = 0 }) {
  return (
    <motion.svg className={className} width="56" height="160" viewBox="0 0 120 340" style={{ transformOrigin: '50% 0' }}
      animate={{ rotate: [-5, 5, -5] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay }}>
      <line x1="60" y1="0" x2="60" y2="130" stroke="#f3d98b" strokeWidth="3" />
      <path d="M40 150 h40 l-6 -22 h-28 z" fill="#d9a93b" />
      <path d="M34 150 h52 l16 62 c8 40 -10 70 -42 90 c-32 -20 -50 -50 -42 -90 z" fill="rgba(255,214,120,.22)" stroke="#f3d98b" strokeWidth="4" />
      <circle cx="60" cy="226" r="60" fill="url(#lgl)" />
      <path d="M42 302 h36 l-6 20 h-24 z" fill="#d9a93b" />
      <defs><radialGradient id="lgl"><stop offset="0" stopColor="#fff3b0" stopOpacity=".95" /><stop offset=".5" stopColor="#ffd25e" stopOpacity=".4" /><stop offset="1" stopColor="#ffd25e" stopOpacity="0" /></radialGradient></defs>
    </motion.svg>
  )
}

// Monogram avatar (used until a real photo is supplied)
export function Avatar({ name, photo, Art, size = 150 }) {
  return (
    <div className="relative mx-auto grid place-items-center rounded-full p-1.5" style={{ width: size, height: size, background: 'conic-gradient(#fff4c2,#b98a2b,#e9c46a,#fff4c2)' }}>
      {photo ? (
        <img src={photo} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : Art ? (
        <div className="h-full w-full overflow-hidden rounded-full"><Art /></div>
      ) : (
        <div className="grid h-full w-full place-items-center rounded-full bg-gradient-to-br from-emerald to-deep">
          <span className="gold-text font-display text-6xl font-bold">{name[0]}</span>
        </div>
      )}
    </div>
  )
}

export const Sparks = () => (
  <>
    {Array.from({ length: 16 }, (_, i) => (
      <i key={i} className="spark" style={{
        left: `${(i * 37 + 7) % 100}%`, width: 5 + (i % 4) * 3, height: 5 + (i % 4) * 3,
        animationDuration: `${12 + (i % 5) * 4}s`, animationDelay: `${-(i * 2.3)}s`, opacity: 0.55,
      }} />
    ))}
  </>
)
