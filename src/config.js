// TODO: put your real WhatsApp number here (country code + number, no + or spaces)
export const WA_NUMBER = '91XXXXXXXXXX'
export const INSTAGRAM = 'digishaadi.in'

export const waLink = (text) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
