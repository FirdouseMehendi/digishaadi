import { motion } from 'motion/react'
import { byId } from '../data'

function daysLeft(date) {
  if (!date) return null
  const start = new Date(); start.setHours(0, 0, 0, 0)
  const end = new Date(date + 'T00:00:00')
  return Math.round((end - start) / 86400000)
}

// Renders one "video invitation" frame. Pure UI, driven by props.
export default function InvitePreview({ trad, n1, n2, date, city, t, locale, delay = 0 }) {
  const s = byId(trad)
  const left = daysLeft(date)
  const pretty = date
    ? new Date(date + 'T00:00:00').toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    : t.prev.tbd
  const fade = (i) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: delay + i * 0.12, duration: 0.5, ease: 'easeOut' },
  })

  return (
    <div className="relative h-full w-full overflow-hidden text-center" style={{ background: s.bg, color: s.fg }}>
      {/* ambient sparkles */}
      {[...Array(7)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{ width: 4 + (i % 3) * 2, height: 4 + (i % 3) * 2, background: s.accent, left: `${(i * 15 + 8) % 92}%`, top: `${(i * 23 + 6) % 90}%`, opacity: 0.5 }}
          animate={{ opacity: [0.15, 0.8, 0.15], scale: [0.8, 1.4, 0.8] }}
          transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.4 }}
        />
      ))}
      <div className="absolute inset-3 rounded-[1.6rem] border" style={{ borderColor: s.accent, opacity: 0.55 }} />
      <div className="absolute inset-5 rounded-[1.3rem] border" style={{ borderColor: s.accent, opacity: 0.25 }} />

      <div className="relative flex h-full flex-col items-center justify-center gap-3 px-7 py-10">
        <motion.div {...fade(0)} className="text-[15px] leading-snug" dir={s.topRtl ? 'rtl' : 'ltr'}
          style={{ color: s.accent, fontFamily: 'var(--font-display)', fontSize: s.top.length <= 2 ? 34 : 15 }}>
          {s.top}
        </motion.div>
        <motion.div {...fade(1)} className="text-[11px] tracking-wide opacity-80" style={{ fontFamily: 'var(--font-body)' }}>
          {t.prev.invite}
        </motion.div>

        <motion.div {...fade(2)} className="my-1" style={{ fontFamily: 'var(--font-display)' }}>
          <div className="text-[26px] font-bold leading-tight break-words">{n1 || t.build.ph1}</div>
          {(n2 !== '' || trad !== 'birthday') && (
            <>
              <div className="text-xl" style={{ color: s.accent }}>{t.prev.and}</div>
              <div className="text-[26px] font-bold leading-tight break-words">{n2 || t.build.ph2}</div>
            </>
          )}
        </motion.div>

        <motion.div {...fade(3)} className="text-lg" style={{ color: s.accent }}>{s.orn}</motion.div>
        <motion.div {...fade(4)} className="text-[13px] font-semibold uppercase tracking-[0.18em]" style={{ color: s.accent }}>
          {t.events[trad]}
        </motion.div>
        <motion.div {...fade(5)} className="text-[13px]" style={{ fontFamily: 'var(--font-body)' }}>
          <div>{pretty}</div>
          {city && <div className="opacity-80">{city}</div>}
        </motion.div>

        {left !== null && (
          <motion.div {...fade(6)} className="mt-1 rounded-full border px-4 py-1 text-[11px]" style={{ borderColor: s.accent, color: s.accent }}>
            {left > 0 ? `${left} ${t.prev.days}` : left === 0 ? t.prev.today : t.prev.tbd}
          </motion.div>
        )}
      </div>
    </div>
  )
}
