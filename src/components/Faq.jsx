import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import Reveal from './Reveal'

export default function Faq({ t }) {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="bg-page py-20">
      <div className="mx-auto max-w-3xl px-4">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.faq.title}</h2>
          <div className="mx-auto mt-4 h-0.5 w-16 rounded bg-accent" />
        </Reveal>
        <div className="grid gap-3">
          {t.faq.items.map(([q, a], i) => (
            <Reveal key={q} delay={i * 0.05}>
              <div className="overflow-hidden rounded-2xl border border-line bg-card">
                <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start font-semibold text-head">
                  {q}
                  <ChevronDown size={18} className={`shrink-0 text-accent transition-transform ${open === i ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}>
                      <p className="px-5 pb-5 text-sm text-muted">{a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
