import { useRef, useState } from 'react'
import { CalendarPlus, MapPin } from 'lucide-react'
import { COUPLE } from './couple'
import { Heading, Reveal, fmtDate } from './parts'

function downloadIcs(ev) {
  const d = ev.date.replaceAll('-', '')
  const next = new Date(ev.date + 'T00:00:00'); next.setDate(next.getDate() + 1)
  const e = next.toISOString().slice(0, 10).replaceAll('-', '')
  const { venue, groom, bride } = COUPLE
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//DigiShaadi//Invite//EN', 'BEGIN:VEVENT',
    `UID:${ev.id}-${d}@digishaadi`, `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d+/g, '')}`,
    `DTSTART;VALUE=DATE:${d}`, `DTEND;VALUE=DATE:${e}`,
    `SUMMARY:${ev.title} · ${groom.name} & ${bride.name}`,
    `LOCATION:${venue.name}\\, ${venue.city} ${venue.pin}`, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }))
  a.download = `${ev.id}.ics`; a.click(); URL.revokeObjectURL(a.href)
}

export default function Events() {
  const { events, venue } = COUPLE
  const [i, setI] = useState(0)
  const ref = useRef(null)
  const onScroll = () => { const el = ref.current; setI(Math.round(el.scrollLeft / (el.firstChild.offsetWidth + 16))) }
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.mapQuery)}`

  return (
    <section className="py-16">
      <Heading kicker="The celebrations" title="Wedding Ceremonies" sub="Swipe to see each celebration" />
      <div ref={ref} onScroll={onScroll} className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[10vw] pb-4">
        {events.map((ev) => (
          <div key={ev.id} className="frame w-[80vw] max-w-[340px] shrink-0 snap-center rounded-3xl bg-gradient-to-b from-emerald to-deep p-6 text-center">
            <p className="font-cin text-[10px] tracking-[0.5em] text-gold uppercase">{fmtDate(ev.date, { weekday: 'long' })}</p>
            <h3 className="gold-text mt-3 font-display text-5xl font-extrabold">{ev.title}</h3>
            <p className="gold-text mt-1 font-ur text-3xl leading-[1.8]">{ev.ur}</p>
            <p className="mt-2 font-display text-xl italic text-cream">{fmtDate(ev.date, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            {ev.time && <p className="mt-1 text-sm text-gold-hi">{ev.time}</p>}
            <p className="mx-auto mt-3 max-w-[220px] text-sm text-cream/75">{ev.blurb}</p>
            <div className="mx-auto my-4 h-px w-24 bg-gold/50" />
            <p className="font-display text-lg font-semibold text-gold-hi">{venue.name}</p>
            <p className="text-sm text-cream/75">{venue.city} · {venue.pin}</p>
            <div className="mt-5 flex justify-center gap-2.5">
              <a href={maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-deep active:scale-95"><MapPin size={14} /> Directions</a>
              <button onClick={() => downloadIcs(ev)} className="inline-flex items-center gap-1.5 rounded-full border border-gold/60 px-4 py-2 text-xs font-semibold text-gold-hi active:scale-95"><CalendarPlus size={14} /> Add to calendar</button>
            </div>
          </div>
        ))}
      </div>
      <Reveal className="mt-2 flex justify-center gap-2">
        {events.map((e, k) => <span key={e.id} className={`h-2 rounded-full transition-all ${k === i ? 'w-6 bg-gold' : 'w-2 bg-gold/35'}`} />)}
      </Reveal>
    </section>
  )
}
