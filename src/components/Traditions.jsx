import { motion } from 'motion/react'
import { TRADITIONS } from '../data'
import Reveal from './Reveal'

export default function Traditions({ t, trad, setTrad }) {
  return (
    <section id="weddings" className="bg-page py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.trad.title}</h2>
          <p className="mt-2 text-muted">{t.trad.sub}</p>
          <div className="mx-auto mt-4 h-0.5 w-16 rounded bg-accent" />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRADITIONS.map((x, i) => {
            const [name, desc] = t.trad.items[x.id]
            const active = trad === x.id
            return (
              <Reveal key={x.id} delay={i * 0.06}>
                <motion.a href="#create" onClick={() => setTrad(x.id)} whileHover={{ y: -6 }} whileTap={{ scale: 0.98 }}
                  className={`group block h-full rounded-3xl border bg-card p-6 text-center transition-colors ${active ? 'border-accent' : 'border-line hover:border-accent/70'}`}>
                  <div className="mx-auto mb-3 grid h-16 w-16 place-items-center rounded-2xl text-4xl" style={{ background: x.bg }}>{x.icon}</div>
                  <h3 className="text-xl font-bold">{name}</h3>
                  <p className="mt-2 text-sm text-muted">{desc}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-accent">{t.trad.pick} →</span>
                </motion.a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
