import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Share2, Volume2, VolumeX } from 'lucide-react'
import { COUPLE } from './couple'
import { Avatar, Heading, Lantern, Ornament, Reveal, Sparks, fmtDate } from './parts'
import SaveTheDate from './SaveTheDate'
import Countdown from './Countdown'
import Events from './Events'
import Rsvp from './Rsvp'

const { groom, bride } = COUPLE

/* ---------------- Loader + Gate ---------------- */
function Loader() {
  return (
    <motion.div className="bg-emerald-royal fixed inset-0 z-50 grid place-items-center" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <div className="text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="gold-text font-ar text-4xl font-bold">بسم الله الرحمن الرحيم</motion.p>
        <p className="mt-6 font-cin text-[10px] tracking-[0.5em] text-gold/80 uppercase">Loading blessed invitation</p>
        <div className="mx-auto mt-4 h-0.5 w-44 overflow-hidden rounded bg-gold/20">
          <motion.div className="h-full bg-gold" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, ease: 'easeInOut' }} />
        </div>
      </div>
    </motion.div>
  )
}

function Gate({ onOpen }) {
  const [opening, setOpening] = useState(false)
  const go = () => { setOpening(true); onOpen() }
  const half = 'bg-emerald-royal absolute top-0 h-full w-1/2 overflow-hidden'
  return (
    <motion.div className="fixed inset-0 z-50" exit={{ opacity: 0 }} transition={{ duration: 0.3, delay: 0.9 }}>
      <motion.div className={`${half} left-0`} animate={opening ? { x: '-100%' } : {}} transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1], delay: 0.35 }}>
        <div className="pattern absolute inset-0" />
      </motion.div>
      <motion.div className={`${half} right-0`} animate={opening ? { x: '100%' } : {}} transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1], delay: 0.35 }}>
        <div className="pattern absolute inset-0" />
      </motion.div>
      <div className="frame pointer-events-none absolute inset-3 rounded-md" />

      <motion.div className="absolute inset-0 grid place-items-center px-6 text-center" animate={opening ? { opacity: 0, scale: 1.12 } : {}} transition={{ duration: 0.45 }}>
        <div>
          <Lantern className="absolute left-6 top-0" /><Lantern className="absolute right-6 top-0" delay={1.2} />
          <p className="gold-text font-ar text-3xl font-bold">﷽</p>
          <p className="mt-5 font-cin text-[10px] tracking-[0.5em] text-gold uppercase">Nikah Invitation</p>
          <h1 className="gold-text mt-3 font-display text-5xl font-extrabold leading-tight">{groom.name}<br /><span className="font-display text-3xl italic font-medium">&amp;</span><br />{bride.name}</h1>
          <motion.button onClick={go} whileTap={{ scale: 0.92 }} aria-label="Open invitation"
            className="relative mx-auto mt-10 grid h-28 w-28 place-items-center rounded-full border-4 border-gold shadow-[0_0_40px_rgba(233,196,106,.45)]"
            style={{ background: 'radial-gradient(circle at 35% 30%,#ff7a7a,#b3122e 55%,#5e0618)' }}>
            <motion.span className="absolute inset-0 rounded-full border-2 border-gold" animate={{ scale: [1, 1.5], opacity: [0.7, 0] }} transition={{ duration: 1.8, repeat: Infinity }} />
            <span className="text-center"><span className="block text-3xl text-gold-hi">☪</span><span className="font-cin text-[11px] font-bold tracking-[0.3em] text-gold-hi">OPEN</span></span>
          </motion.button>
          <p className="mt-5 font-cin text-[10px] tracking-[0.45em] text-gold/80 uppercase">Tap to open</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------------- Sections ---------------- */
function Hero() {
  return (
    <section className="bg-emerald-royal relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pattern absolute inset-0" />
      <Lantern className="absolute left-5 top-0" /><Lantern className="absolute right-5 top-0" delay={1.4} />
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="frame relative mx-auto mb-16 mt-10 w-full max-w-sm rounded-t-[999px] bg-deep/30 px-5 pb-10 pt-24 backdrop-blur-[2px]">
        <p className="font-cin text-[11px] tracking-[0.5em] text-gold uppercase">With the blessings of Allah</p>
        <p className="gold-text mt-4 font-ar text-4xl font-bold">بسم الله الرحمن الرحيم</p>
        <p className="mt-6 text-sm text-cream/80">we joyfully invite you to the Nikah of</p>
        <h1 className="gold-text mt-3 font-display text-[4.2rem] font-extrabold leading-[1]">{groom.name}</h1>
        <p className="gold-text font-display text-4xl italic">&amp;</p>
        <h1 className="gold-text font-display text-[4.2rem] font-extrabold leading-[1]">{bride.name}</h1>
        <Ornament className="!mt-6" />
        <p className="mt-4 font-cin text-sm font-bold tracking-[0.3em] text-gold-hi uppercase">{fmtDate(COUPLE.events[2].date, { weekday: 'long' })}</p>
        <p className="font-display text-2xl text-gold-hi">{fmtDate(COUPLE.events[2].date, { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        <p className="mt-2 text-sm text-cream/75">{COUPLE.venue.name} · {COUPLE.venue.city}</p>
      </motion.div>
      <motion.div className="absolute bottom-6 text-gold" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
        <p className="font-cin text-[9px] tracking-[0.5em] uppercase">Scroll to invite</p>
        <ChevronDown className="mx-auto" />
      </motion.div>
    </section>
  )
}

function Verse() {
  return (
    <section className="px-6 py-16 text-center">
      <Reveal>
        <p className="gold-text font-ar text-[1.7rem] leading-[2.2]">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً</p>
        <Ornament />
        <p className="mx-auto mt-4 max-w-xs font-display text-lg italic leading-relaxed text-cream/90">
          “And among His signs is that He created for you mates from among yourselves, that you may find tranquillity in them; and He placed between you affection and mercy.”
        </p>
        <p className="mt-3 font-cin text-[10px] tracking-[0.4em] text-gold uppercase">Surah Ar-Rum · 30:21</p>
      </Reveal>
    </section>
  )
}

function Couple() {
  const Card = ({ p, role }) => (
    <Reveal className="frame mx-auto max-w-xs rounded-3xl bg-gradient-to-b from-emerald/80 to-deep p-7 text-center">
      <Avatar name={p.name} photo={p.photo} />
      <p className="mt-4 font-cin text-[10px] tracking-[0.5em] text-gold uppercase">{role}</p>
      <h3 className="gold-text font-display text-3xl font-bold">{p.full}</h3>
      <p className="mt-2 text-sm leading-relaxed text-cream/75">{p.parents}</p>
    </Reveal>
  )
  return (
    <section className="px-5 py-16">
      <Heading kicker="Introducing" title="The Groom & The Bride" />
      <Card p={groom} role="The Groom" />
      <Reveal className="my-4 text-center"><span className="gold-text font-display text-5xl italic">&amp;</span></Reveal>
      <Card p={bride} role="The Bride" />
    </section>
  )
}

function Gallery() {
  return (
    <section className="py-16">
      <Heading kicker="Moments" title="Photo Gallery" sub="Glimpses of our journey" />
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-[12vw] pb-3">
        {COUPLE.gallery.map((g, i) => (
          <Reveal key={i} className="frame aspect-[3/4] w-[70vw] max-w-[300px] shrink-0 snap-center overflow-hidden rounded-3xl">
            {g.src ? <img src={g.src} alt={g.caption} className="h-full w-full object-cover" /> : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-jade/40 via-emerald to-deep">
                <div className="text-center"><p className="gold-text font-display text-6xl font-bold">{groom.name[0]}&amp;{bride.name[0]}</p><p className="mt-2 font-cin text-[9px] tracking-[0.4em] text-gold/70 uppercase">Photo {i + 1}</p></div>
              </div>
            )}
            <p className="relative -mt-12 bg-gradient-to-t from-deep/90 to-transparent px-4 pb-3 pt-6 text-center font-display text-sm italic text-gold-hi">{g.caption}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Thanks({ onShare }) {
  return (
    <section className="bg-emerald-royal px-6 pb-24 pt-16 text-center">
      <Reveal>
        <p className="font-cin text-[10px] tracking-[0.5em] text-gold uppercase">With gratitude</p>
        <h2 className="gold-text mt-2 font-display text-5xl font-bold">Jazakallah Khair</h2>
        <Ornament />
        <p className="mx-auto mt-5 max-w-xs text-sm leading-relaxed text-cream/80">
          Your duas and presence will make our celebration complete. We look forward to welcoming you with love, In sha Allah.
        </p>
        <p className="mt-8 font-cin text-[10px] tracking-[0.5em] text-gold uppercase">Warmly welcomed by</p>
        <div className="mt-3 space-y-1 font-display text-xl text-gold-hi">{COUPLE.welcomeBy.map((w) => <p key={w}>{w}</p>)}</div>
        <p className="mt-8 font-cin text-[10px] tracking-[0.5em] text-gold uppercase">Our hashtag</p>
        <p className="gold-text mt-1 font-display text-2xl italic">{COUPLE.hashtag}</p>
        <button onClick={onShare} className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/60 px-5 py-2.5 text-sm text-gold-hi active:scale-95"><Share2 size={16} /> Share this invitation</button>
        <p className="mt-12 text-xs text-cream/50">Crafted with ♥ by <a href={COUPLE.brand.url} className="text-gold underline-offset-2 hover:underline">{COUPLE.brand.name}</a></p>
      </Reveal>
    </section>
  )
}

/* ---------------- Page ---------------- */
export default function Invite() {
  const [phase, setPhase] = useState('loading') // loading -> gate -> open
  const [muted, setMuted] = useState(false)
  const audio = useRef(null)

  useEffect(() => { const t = setTimeout(() => setPhase('gate'), 1700); return () => clearTimeout(t) }, [])
  useEffect(() => { document.body.classList.toggle('locked', phase !== 'open') }, [phase])

  const open = () => {
    audio.current?.play().catch(() => {})
    setTimeout(() => setPhase('open'), 1500)
  }
  const toggleMute = () => { setMuted(!muted); if (audio.current) audio.current.muted = !muted }
  const share = async () => {
    const data = { title: `${groom.name} & ${bride.name} | Nikah Invitation`, text: `You are invited to the Nikah of ${groom.name} & ${bride.name}`, url: location.href }
    try { navigator.share ? await navigator.share(data) : await navigator.clipboard.writeText(location.href) } catch { /* cancelled */ }
  }

  return (
    <div className="relative overflow-x-hidden bg-deep">
      <Sparks />
      {COUPLE.music && <audio ref={audio} src={COUPLE.music} loop preload="auto" />}
      <AnimatePresence>{phase === 'loading' && <Loader key="l" />}</AnimatePresence>
      <AnimatePresence>{phase !== 'loading' && phase !== 'open' && <Gate key="g" onOpen={open} />}</AnimatePresence>

      <main className="relative z-[2]">
        <Hero />
        <Verse />
        <SaveTheDate />
        <Countdown />
        <Couple />
        <Events />
        <Gallery />
        <Rsvp />
        <Thanks onShare={share} />
      </main>

      {COUPLE.music && phase === 'open' && (
        <button onClick={toggleMute} aria-label="Toggle music" className="fixed bottom-4 right-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-gold/60 bg-deep/80 text-gold backdrop-blur">
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}
    </div>
  )
}
