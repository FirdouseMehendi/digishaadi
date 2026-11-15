// Visual identity of each invitation style (used by the live preview)
export const TRADITIONS = [
  { id: 'nikaah', icon: '🕌', top: 'بسم الله الرحمن الرحيم', topRtl: true, orn: '☪',
    bg: 'linear-gradient(165deg,#0f5132,#052e1c)', fg: '#f7ecd0', accent: '#e6c26a', sample: ['Aisha', 'Imran'] },
  { id: 'hindu', icon: '🪔', top: '॥ श्री गणेशाय नमः ॥', orn: '❁',
    bg: 'linear-gradient(165deg,#b3173f,#5a0a20)', fg: '#fff3d6', accent: '#ffcf5c', sample: ['Priya', 'Arjun'] },
  { id: 'christian', icon: '⛪', top: '✝', orn: '❦',
    bg: 'linear-gradient(165deg,#f7f1e6,#e3d6bd)', fg: '#3a2c1c', accent: '#a8802c', sample: ['Grace', 'Daniel'] },
  { id: 'sikh', icon: '🙏', top: 'ੴ', orn: '☬',
    bg: 'linear-gradient(165deg,#1d3a8a,#0c1c4d)', fg: '#fff2d1', accent: '#f4c542', sample: ['Simran', 'Harpreet'] },
  { id: 'engagement', icon: '💍', top: '💍', orn: '✦',
    bg: 'linear-gradient(165deg,#7a2a5e,#3a0f33)', fg: '#ffeef6', accent: '#f6c1d9', sample: ['Neha', 'Rahul'] },
  { id: 'birthday', icon: '🎂', top: '🎉', orn: '★',
    bg: 'linear-gradient(165deg,#ff7a59,#c2306b)', fg: '#fff9ef', accent: '#ffe27a', sample: ['Aarav', ''] },
]

export const byId = (id) => TRADITIONS.find((t) => t.id === id) || TRADITIONS[0]

export const inDays = (n) => {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}
