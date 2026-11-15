import { useEffect, useState } from 'react'
import { LANGS, T } from './i18n'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Traditions from './components/Traditions'
import Builder from './components/Builder'
import Samples from './components/Samples'
import How from './components/How'
import Faq from './components/Faq'
import Footer from './components/Footer'

// tiny persisted-state hook
function usePersisted(key, initial) {
  const [v, setV] = useState(() => localStorage.getItem(key) || initial)
  useEffect(() => { localStorage.setItem(key, v) }, [key, v])
  return [v, setV]
}

export default function App() {
  const [lang, setLang] = usePersisted('ds-lang', 'en')
  const [trad, setTrad] = useState('nikaah')
  const [form, setForm] = useState({ n1: '', n2: '', date: '', city: '', lang: 'English', msg: '' })

  const L = LANGS.find((l) => l.id === lang) || LANGS[0]
  const t = T[L.id]

  useEffect(() => {
    document.documentElement.lang = L.id
    document.documentElement.dir = L.dir
  }, [L])

  return (
    <>
      <div className="scroll-progress" />
      <Navbar t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} locale={L.locale} />
        <Traditions t={t} trad={trad} setTrad={setTrad} />
        <Builder t={t} locale={L.locale} trad={trad} setTrad={setTrad} form={form} setForm={setForm} />
        <Samples t={t} locale={L.locale} />
        <How t={t} />
        <Faq t={t} />
      </main>
      <Footer t={t} />
    </>
  )
}
