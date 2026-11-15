import { MessageCircle } from 'lucide-react'
import { INSTAGRAM, waLink } from '../config'
import Reveal from './Reveal'

export default function Footer({ t }) {
  return (
    <>
      <section className="hero-bg py-16 text-center">
        <Reveal className="mx-auto max-w-2xl px-4">
          <h2 className="text-3xl font-bold sm:text-4xl">{t.cta.title}</h2>
          <a href="#create" className="mt-6 inline-block rounded-full bg-accent px-8 py-3.5 font-semibold text-onaccent shadow-lg shadow-black/20 transition hover:brightness-110">
            {t.cta.btn}
          </a>
        </Reveal>
      </section>

      <footer className="border-t border-line bg-alt py-8 text-center text-sm text-muted">
        <p className="font-display text-lg font-bold text-head">DigiShaadi</p>
        <p className="mt-1">
          Instagram: <a className="font-semibold text-accent" href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer">@{INSTAGRAM}</a>
        </p>
        <p className="mt-2 opacity-70">© {new Date().getFullYear()} DigiShaadi. {t.foot.rights}</p>
      </footer>

      <a href={waLink('Hi DigiShaadi, I want a video invitation.')} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-5 end-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/30 transition hover:scale-110">
        <MessageCircle size={26} />
      </a>
    </>
  )
}
