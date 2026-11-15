import { MessageCircle } from 'lucide-react'
import { TRADITIONS } from '../data'
import { INVITE_LANGS } from '../i18n'
import { waLink } from '../config'
import InvitePreview from './InvitePreview'
import PhoneFrame from './PhoneFrame'
import Reveal from './Reveal'

const field = 'w-full rounded-xl border border-line bg-page px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-muted/60 focus:border-accent focus:ring-2 focus:ring-accent/30'

export default function Builder({ t, locale, trad, setTrad, form, setForm }) {
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const send = (e) => {
    e.preventDefault()
    const names = form.n2 ? `${form.n1} & ${form.n2}` : form.n1
    const text =
      `Hi DigiShaadi! I'd like a video invitation.\n` +
      `Type: ${t.trad.items[trad][0]}\nName(s): ${names}\n` +
      `Date: ${form.date || 'TBD'}\nCity/Venue: ${form.city || '-'}\n` +
      `Language: ${form.lang}` + (form.msg ? `\nNotes: ${form.msg}` : '')
    window.open(waLink(text), '_blank', 'noopener')
  }

  return (
    <section id="create" className="bg-alt py-20">
      <div className="mx-auto max-w-6xl px-4">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.build.title}</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted">{t.build.sub}</p>
          <div className="mx-auto mt-4 h-0.5 w-16 rounded bg-accent" />
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-[1fr_320px]">
          <Reveal>
            <form onSubmit={send} className="grid gap-4 rounded-3xl border border-line bg-card p-5 sm:p-7">
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-head">{t.build.type}</label>
                <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                  {TRADITIONS.map((x) => (
                    <button type="button" key={x.id} onClick={() => setTrad(x.id)}
                      className={`shrink-0 rounded-full border px-3.5 py-2 text-sm transition ${trad === x.id ? 'border-accent bg-accent font-semibold text-onaccent' : 'border-line text-ink hover:border-accent/70'}`}>
                      {x.icon} {t.trad.items[x.id][0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div><label htmlFor="n1" className="mb-1.5 block text-xs font-semibold text-head">{t.build.n1}</label>
                  <input id="n1" required value={form.n1} onChange={set('n1')} placeholder={t.build.ph1} className={field} /></div>
                <div><label htmlFor="n2" className="mb-1.5 block text-xs font-semibold text-head">{t.build.n2}</label>
                  <input id="n2" value={form.n2} onChange={set('n2')} placeholder={t.build.ph2} className={field} /></div>
                <div><label htmlFor="date" className="mb-1.5 block text-xs font-semibold text-head">{t.build.date}</label>
                  <input id="date" type="date" value={form.date} onChange={set('date')} className={field} /></div>
                <div><label htmlFor="city" className="mb-1.5 block text-xs font-semibold text-head">{t.build.city}</label>
                  <input id="city" value={form.city} onChange={set('city')} placeholder={t.build.phCity} className={field} /></div>
              </div>

              <div><label htmlFor="lang" className="mb-1.5 block text-xs font-semibold text-head">{t.build.lang}</label>
                <select id="lang" value={form.lang} onChange={set('lang')} className={field}>
                  {INVITE_LANGS.map((l) => <option key={l}>{l}</option>)}
                </select></div>

              <div><label htmlFor="msg" className="mb-1.5 block text-xs font-semibold text-head">{t.build.msg}</label>
                <textarea id="msg" rows={3} value={form.msg} onChange={set('msg')} placeholder={t.build.msgPh} className={field} /></div>

              <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 font-semibold text-white shadow-lg shadow-black/20 transition hover:brightness-110 active:scale-[0.98]">
                <MessageCircle size={20} /> {t.build.send}
              </button>
              <p className="text-center text-xs text-muted">{t.build.note}</p>
            </form>
          </Reveal>

          <Reveal delay={0.1} className="lg:sticky lg:top-24">
            <PhoneFrame>
              <InvitePreview key={trad}trad={trad} n1={form.n1} n2={form.n2} date={form.date} city={form.city} t={t} locale={locale} />
            </PhoneFrame>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
