import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Smartphone } from 'lucide-react'
import { Heading, Reveal } from './parts'

// One scratch-off foil. Reveals itself when ~55% is cleared (or when `revealed` is forced).
function Scratch({ label, value, sub, revealed, onDone }) {
  const ref = useRef(null)
  const drawing = useRef(false)
  const done = useRef(false)

  useEffect(() => {
    const c = ref.current, ctx = c.getContext('2d')
    const g = ctx.createLinearGradient(0, 0, c.width, c.height)
    g.addColorStop(0, '#fff1b0'); g.addColorStop(0.5, '#d9a93b'); g.addColorStop(1, '#9a6d17')
    ctx.fillStyle = g; ctx.fillRect(0, 0, c.width, c.height)
    ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.font = '26px serif'; ctx.textAlign = 'center'
    for (let y = 30; y < c.height; y += 46) for (let x = 24; x < c.width; x += 46) ctx.fillText('✦', x, y)
    ctx.fillStyle = '#5a3d06'; ctx.font = '600 15px Cinzel, serif'
    ctx.fillText('SCRATCH', c.width / 2, c.height / 2 + 5)
  }, [])

  const scratch = useCallback((e) => {
    if (!drawing.current || done.current) return
    const c = ref.current, r = c.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * c.width, y = ((e.clientY - r.top) / r.height) * c.height
    const ctx = c.getContext('2d')
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath(); ctx.arc(x, y, 26, 0, Math.PI * 2); ctx.fill()
    // estimate cleared area
    const d = ctx.getImageData(0, 0, c.width, c.height).data
    let clear = 0, n = 0
    for (let i = 3; i < d.length; i += 4 * 24) { n++; if (d[i] === 0) clear++ }
    if (clear / n > 0.55) { done.current = true; onDone() }
  }, [onDone])

  return (
    <div className="select-none text-center">
      <p className="mb-2 font-cin text-[11px] tracking-[0.26em] text-gold uppercase">{label}</p>
      <div className="relative mx-auto h-28 w-24 overflow-hidden rounded-2xl border border-gold/60 bg-gradient-to-b from-emerald to-deep shadow-lg shadow-black/40">
        <div className="absolute inset-0 grid place-items-center">
          <div>
            <div className="gold-text font-display text-4xl font-extrabold leading-none">{value}</div>
            {sub && <div className="mt-1 font-cin text-[11px] tracking-[0.3em] text-cream/90 uppercase">{sub}</div>}
          </div>
        </div>
        <canvas ref={ref} width={96} height={112}
          className="absolute inset-0 h-full w-full touch-none transition-opacity duration-700"
          style={{ opacity: revealed ? 0 : 1, pointerEvents: revealed ? 'none' : 'auto' }}
          onPointerDown={(e) => { drawing.current = true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e) }}
          onPointerMove={scratch} onPointerUp={() => (drawing.current = false)} onPointerCancel={() => (drawing.current = false)} />
      </div>
    </div>
  )
}

const COLORS = ['#e9c46a', '#fff4c2', '#14805a', '#e84a7a', '#f4a000', '#ffffff', '#7ed6a8']

// Full-screen confetti burst (runs once, then removes itself)
function Confetti() {
  const [on, setOn] = useState(true)
  const bits = useRef(Array.from({ length: 90 }, (_, i) => {
    const a = Math.random() * Math.PI * 2, v = 140 + Math.random() * 260
    return { dx: Math.cos(a) * v, up: -(120 + Math.random() * 320), fall: 260 + Math.random() * 380, r: (Math.random() - 0.5) * 900,
      w: 6 + Math.random() * 8, h: 8 + Math.random() * 12, c: COLORS[i % COLORS.length], round: i % 3 === 0, d: 2.6 + Math.random() * 1.6 }
  }))
  useEffect(() => { const t = setTimeout(() => setOn(false), 4500); return () => clearTimeout(t) }, [])
  if (!on) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden="true">
      {bits.current.map((b, i) => (
        <motion.i key={i} className="absolute block" style={{ left: '50%', top: '52%', width: b.w, height: b.round ? b.w : b.h, background: b.c, borderRadius: b.round ? '50%' : 2 }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: b.dx, y: [0, b.up, b.up + b.fall], opacity: [1, 1, 0], rotate: b.r }}
          transition={{ duration: b.d, ease: 'easeOut', times: [0, 0.35, 1] }} />
      ))}
    </div>
  )
}

// Shown once all three seals are revealed: confetti, the full date, the events, then glide to the ceremonies
function Celebration() {
  useEffect(() => {
    let touched = false
    const stop = () => { touched = true }
    const evts = ['wheel', 'touchstart', 'keydown', 'pointerdown']
    evts.forEach((e) => window.addEventListener(e, stop, { once: true, passive: true }))
    const t = setTimeout(() => { if (!touched) document.getElementById('ceremonies')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }, 5200)
    return () => { clearTimeout(t); evts.forEach((e) => window.removeEventListener(e, stop)) }
  }, [])

  const chips = [['Haldi', '3 Dec'], ['Mehendi', '4 Dec'], ['Nikah', '5 Dec']]
  return (
    <>
      <Confetti />
      <motion.div className="mt-9 text-center" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
        <p className="gold-text font-ar text-3xl">الحمد لله</p>
        <h3 className="gold-text mt-2 font-display text-[1.7rem] font-bold leading-tight">Saturday, 5 December 2026</h3>
        <p className="mx-auto mt-2 max-w-[17rem] font-display text-lg italic text-cream">The celebrations begin, In sha Allah</p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {chips.map(([n, d], i) => (
            <motion.span key={n} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + i * 0.2 }}
              className="rounded-full border border-gold/70 bg-emerald/70 px-4 py-1.5 text-xs font-medium text-gold-hi">{n} · {d}</motion.span>
          ))}
        </div>
        <motion.a href="#ceremonies" animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-deep active:scale-95">
          See the celebrations ↓
        </motion.a>
      </motion.div>
    </>
  )
}

export default function SaveTheDate() {
  const [rev, setRev] = useState([false, false, false])
  const all = rev.every(Boolean)
  const mark = (i) => () => setRev((r) => r.map((v, k) => (k === i ? true : v)))
  const revealAll = useCallback(() => setRev([true, true, true]), [])
  const [armed, setArmed] = useState(false)

  // Shake-to-reveal (iOS needs a permission tap, so it is armed by the button)
  useEffect(() => {
    if (!armed || all) return
    let last = null, hits = 0
    // No real motion data within 1.5s (desktop / sensor blocked) -> just reveal
    const noSensor = setTimeout(revealAll, 1500)
    const onMotion = (e) => {
      const a = e.accelerationIncludingGravity; if (!a || (a.x == null && a.y == null && a.z == null)) return
      clearTimeout(noSensor)
      const cur = { x: a.x || 0, y: a.y || 0, z: a.z || 0 }
      if (last) {
        const delta = Math.abs(cur.x - last.x) + Math.abs(cur.y - last.y) + Math.abs(cur.z - last.z)
        if (delta > 24 && ++hits >= 3) revealAll()
      }
      last = cur
    }
    window.addEventListener('devicemotion', onMotion)
    return () => { clearTimeout(noSensor); window.removeEventListener('devicemotion', onMotion) }
  }, [armed, all, revealAll])

  const arm = async () => {
    try {
      if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        const res = await DeviceMotionEvent.requestPermission()
        if (res !== 'granted') return revealAll()
      }
      setArmed(true)
    } catch { revealAll() }
  }

  return (
    <section className="relative px-5 py-20">
      <Heading kicker="Mark your calendar" title="Save the Date" sub="Scratch the golden seals, or shake your phone, to reveal the day" />
      <div className="mx-auto flex max-w-sm justify-center gap-4">
        <Scratch label="Date" value="05" sub="Saturday" revealed={rev[0]} onDone={mark(0)} />
        <Scratch label="Month" value="DEC" sub="December" revealed={rev[1]} onDone={mark(1)} />
        <Scratch label="Year" value="2026" sub="Year" revealed={rev[2]} onDone={mark(2)} />
      </div>

      {!all ? (
        <Reveal className="mt-7 text-center">
          <button onClick={arm} className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-5 py-2.5 text-sm font-medium text-gold-hi transition active:scale-95">
            <motion.span animate={armed ? { rotate: [-18, 18, -18] } : {}} transition={{ repeat: Infinity, duration: 0.4 }}><Smartphone size={18} /></motion.span>
            {armed ? 'Now shake your phone…' : 'Shake to reveal'}
          </button>
        </Reveal>
      ) : (
        <Celebration />
      )}
    </section>
  )
}
