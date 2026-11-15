import { Palette, FileText, Film } from 'lucide-react'
import Reveal from './Reveal'

const ICONS = [Palette, FileText, Film]

export default function How({ t }) {
  return (
    <section id="how" className="bg-alt py-20">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal className="mb-12 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.how.title}</h2>
          <p className="mt-2 text-muted">{t.how.sub}</p>
          <div className="mx-auto mt-4 h-0.5 w-16 rounded bg-accent" />
        </Reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {t.how.steps.map(([h, p], i) => {
            const Icon = ICONS[i]
            return (
              <Reveal key={h} delay={i * 0.12} className="relative rounded-3xl border border-line bg-card p-7 text-center">
                <span className="absolute -top-4 start-1/2 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full bg-accent text-sm font-bold text-onaccent">{i + 1}</span>
                <Icon className="mx-auto mb-3 text-accent" size={30} />
                <h3 className="text-xl font-bold">{h}</h3>
                <p className="mt-2 text-sm text-muted">{p}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
