import { useEffect, useState } from 'react'
import { COUPLE } from './couple'
import { Heading } from './parts'

const parts = (ms) => ({
  Days: Math.floor(ms / 864e5), Hours: Math.floor(ms / 36e5) % 24, Minutes: Math.floor(ms / 6e4) % 60, Seconds: Math.floor(ms / 1e3) % 60,
})

export default function Countdown() {
  const target = new Date(COUPLE.nikahDate).getTime()
  const [left, setLeft] = useState(() => target - Date.now())
  useEffect(() => { const id = setInterval(() => setLeft(target - Date.now()), 1000); return () => clearInterval(id) }, [target])

  return (
    <section className="px-5 py-16">
      <Heading kicker="The blessed day approaches" title="Counting Down" />
      {left > 0 ? (
        <div className="mx-auto grid max-w-sm grid-cols-4 gap-2.5">
          {Object.entries(parts(left)).map(([k, v]) => (
            <div key={k} className="frame rounded-2xl bg-emerald/60 py-4 text-center backdrop-blur">
              <div className="gold-text font-display text-3xl font-bold tabular-nums">{String(v).padStart(2, '0')}</div>
              <div className="mt-1 font-cin text-[9px] tracking-[0.25em] text-cream/75 uppercase">{k}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className="gold-text text-center font-display text-3xl">Alhamdulillah, today is the day!</p>
      )}
    </section>
  )
}
