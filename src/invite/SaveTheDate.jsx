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
      <p className="mb-2 font-cin text-[10px] tracking-[0.4em] text-gold/80 uppercase">{label}</p>
      <div className="relative mx-auto h-28 w-24 overflow-hidden rounded-2xl border border-gold/60 bg-gradient-to-b from-emerald to-deep shadow-lg shadow-black/40">
        <div className="absolute inset-0 grid place-items-center">
          <div>
            <div className="gold-text font-display text-4xl font-extrabold leading-none">{value}</div>
            {sub && <div className="mt-1 font-cin text-[9px] tracking-[0.3em] text-cream/80 uppercase">{sub}</div>}
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
        <Scratch label="Month" value="DEC" sub="Month" revealed={rev[1]} onDone={mark(1)} />
        <Scratch label="Year" value="2026" sub="Year" revealed={rev[2]} onDone={mark(2)} />
      </div>

      <Reveal className="mt-7 text-center">
        {!all ? (
          <button onClick={arm} className="inline-flex items-center gap-2 rounded-full border border-gold/60 px-5 py-2.5 text-sm font-medium text-gold-hi transition active:scale-95">
            <motion.span animate={armed ? { rotate: [-18, 18, -18] } : {}} transition={{ repeat: Infinity, duration: 0.4 }}><Smartphone size={18} /></motion.span>
            {armed ? 'Now shake your phone…' : 'Shake to reveal'}
          </button>
        ) : (
          <motion.p initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="font-ar text-2xl text-gold-hi">
            الحمد لله · See you on the 5th ✨
          </motion.p>
        )}
      </Reveal>
    </section>
  )
}
