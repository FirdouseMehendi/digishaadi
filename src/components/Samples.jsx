import { TRADITIONS, inDays } from '../data'
import InvitePreview from './InvitePreview'
import PhoneFrame from './PhoneFrame'
import Reveal from './Reveal'

const DATE = inDays(60)

export default function Samples({ t, locale }) {
  return (
    <section id="samples" className="bg-page py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.samples.title}</h2>
          <p className="mt-2 text-muted">{t.samples.sub}</p>
          <div className="mx-auto mt-4 h-0.5 w-16 rounded bg-accent" />
        </Reveal>
      </div>

      {/* horizontal scroll-snap carousel */}
      <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(1rem,calc((100vw-72rem)/2+1rem))] pb-6">
        {TRADITIONS.map((x) => (
          <div key={x.id} className="w-[240px] shrink-0 snap-center sm:w-[260px]">
            <PhoneFrame>
              <InvitePreview trad={x.id} n1={x.sample[0]} n2={x.sample[1]} date={DATE} city="" t={t} locale={locale} />
            </PhoneFrame>
            <p className="mt-3 text-center text-sm font-semibold text-head">
              {t.trad.items[x.id][0]} <span className="ms-1 rounded-full border border-line px-2 py-0.5 text-[10px] font-normal text-muted">{t.samples.demo}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
