import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, Play } from 'lucide-react'
import { TRADITIONS, inDays } from '../data'
import InvitePreview from './InvitePreview'
import PhoneFrame from './PhoneFrame'

const SAMPLE_DATE = inDays(45)

export default function Hero({ t, locale }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TRADITIONS.length), 3800)
    return () => clearInterval(id)
  }, [])
  const cur = TRADITIONS[i]

  return (
    <section id="top" className="hero-bg relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-center md:text-start">
          <span className="inline-block rounded-full border border-accent/50 bg-black/10 px-4 py-1.5 text-xs font-medium text-accent backdrop-blur">
            {t.hero.badge}
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.15] sm:text-5xl lg:text-6xl">
            {t.hero.h1a}
            <span className="block bg-gradient-to-r from-accent to-head bg-clip-text text-transparent">{t.hero.h1b}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-ink/85 md:mx-0">{t.hero.sub}</p>

          <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
            <a href="#create" className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-semibold text-onaccent shadow-lg shadow-black/20 transition hover:brightness-110">
              {t.hero.cta1} <ArrowRight size={18} className="rtl-flip transition group-hover:translate-x-1" />
            </a>
            <a href="#samples" className="inline-flex items-center gap-2 rounded-full border border-accent/60 px-6 py-3 font-semibold text-accent transition hover:bg-accent hover:text-onaccent">
              <Play size={16} /> {t.hero.cta2}
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-ink/85 md:justify-start">
            {t.hero.trust.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
          <div className="pointer-events-none absolute inset-0 -z-0 mx-auto h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
            <PhoneFrame>
              <AnimatePresence mode="wait">
                <motion.div key={cur.id} className="h-full" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
                  <InvitePreview trad={cur.id} n1={cur.sample[0]} n2={cur.sample[1]} date={SAMPLE_DATE} city="" t={t} locale={locale} />
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
          </motion.div>
          <div className="mt-5 flex justify-center gap-2">
            {TRADITIONS.map((x, k) => (
              <button key={x.id} aria-label={x.id} onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all ${k === i ? 'w-7 bg-accent' : 'w-2 bg-ink/30'}`} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
