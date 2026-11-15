import { useState } from 'react'
import { Send } from 'lucide-react'
import { COUPLE } from './couple'
import { waLink } from '../config'
import { Heading, Reveal } from './parts'

const input = 'w-full rounded-xl border border-gold/30 bg-deep/70 px-4 py-3 text-sm text-cream outline-none placeholder:text-cream/40 focus:border-gold'

export default function Rsvp() {
  const [f, setF] = useState({ name: '', guests: '1', coming: 'yes', note: '' })
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })
  const submit = (e) => {
    e.preventDefault()
    const { groom, bride } = COUPLE
    const text = `RSVP · ${groom.name} & ${bride.name}\nName: ${f.name}\nAttending: ${f.coming === 'yes' ? 'Yes, In sha Allah' : 'Unable to attend'}` +
      (f.coming === 'yes' ? `\nGuests: ${f.guests}` : '') + (f.note ? `\nMessage: ${f.note}` : '')
    window.open(waLink(text), '_blank', 'noopener')
  }
  return (
    <section className="px-5 py-16">
      <Heading kicker="Kindly respond" title="RSVP" sub="Let the family know you are coming" />
      <Reveal>
        <form onSubmit={submit} className="frame mx-auto grid max-w-sm gap-3 rounded-3xl bg-emerald/50 p-5 backdrop-blur">
          <input required placeholder="Your name" value={f.name} onChange={set('name')} className={input} aria-label="Your name" />
          <div className="grid grid-cols-2 gap-2">
            {[['yes', 'Joyfully accept'], ['no', 'Regretfully decline']].map(([v, l]) => (
              <button type="button" key={v} onClick={() => setF({ ...f, coming: v })}
                className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition ${f.coming === v ? 'border-gold bg-gold text-deep' : 'border-gold/30 text-cream/80'}`}>{l}</button>
            ))}
          </div>
          {f.coming === 'yes' && (
            <select value={f.guests} onChange={set('guests')} className={input} aria-label="Number of guests">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
            </select>
          )}
          <textarea rows={2} placeholder="A message for the couple (optional)" value={f.note} onChange={set('note')} className={input} aria-label="Message" />
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white active:scale-95"><Send size={16} /> Send RSVP on WhatsApp</button>
        </form>
      </Reveal>
    </section>
  )
}
