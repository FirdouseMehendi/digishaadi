import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { LANGS } from '../i18n'

export default function Navbar({ t, lang, setLang }) {
  const [open, setOpen] = useState(false)
  const links = [
    ['#weddings', t.nav.weddings], ['#create', t.nav.create], ['#samples', t.nav.samples],
    ['#how', t.nav.how], ['#faq', t.nav.faq],
  ]

  return (
    <header className="glass sticky top-0 z-50 border-b border-line">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <a href="#top" className="flex items-center gap-2.5 font-display text-xl font-bold text-head">
          <img src="./logo.png" alt="DigiShaadi logo" className="h-9 w-9 rounded-full ring-2 ring-accent/60" />
          DigiShaadi
        </a>

        <nav className="hidden gap-6 text-sm font-medium md:flex">
          {links.map(([h, l]) => (
            <a key={h} href={h} className="text-ink/80 transition hover:text-accent">{l}</a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* language */}
          <div className="flex overflow-hidden rounded-full border border-line text-xs font-semibold">
            {LANGS.map((l) => (
              <button key={l.id} onClick={() => setLang(l.id)} aria-label={`Language ${l.id}`}
                className={`px-2.5 py-1.5 transition ${lang === l.id ? 'bg-accent text-onaccent' : 'text-ink/80 hover:bg-card'}`}>
                {l.label}
              </button>
            ))}
          </div>

          <a href="#create" className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-onaccent transition hover:brightness-110 sm:block">
            {t.nav.cta}
          </a>
          <button className="grid h-9 w-9 place-items-center rounded-full border border-line md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line md:hidden">
            <div className="flex flex-col gap-1 px-4 py-3">
              {links.map(([h, l]) => (
                <a key={h} href={h} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-ink/90 hover:bg-card">{l}</a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
