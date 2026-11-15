// TODO: put your real WhatsApp number here (country code + number, no + or spaces)
export const WA_NUMBER = '91XXXXXXXXXX'
export const INSTAGRAM = 'digishaadi.in'

export const waLink = (text) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`

// Each theme only changes CSS variables (see index.css)
export const THEMES = [
  { id: 'purple', label: 'Royal Purple', swatch: ['#24103f', '#e6b95c'] },
  { id: 'burgundy', label: 'Burgundy', swatch: ['#5a0a20', '#e0a21b'] },
  { id: 'emerald', label: 'Emerald', swatch: ['#0b3d2a', '#d4a017'] },
  { id: 'ivory', label: 'Ivory', swatch: ['#fffbf0', '#b8892b'] },
]
