// ============================================================
//  Everything about THIS invitation lives here.
//  To make a new invitation: copy the invite folder, edit this file.
//  Names, parents and the gallery captions below are SAMPLE content.
// ============================================================
import { WA_NUMBER } from '../config'

export const COUPLE = {
  groom: { name: 'Zaid', full: 'Zaid Ahmed Khan', parents: 'Son of Mr. & Mrs. Imtiyaz Ahmed Khan', photo: '' },
  bride: { name: 'Aaliya', full: 'Aaliya Fatima Sheikh', parents: 'Daughter of Mr. & Mrs. Abdul Rahman Sheikh', photo: '' },
  hashtag: '#ZaidWedsAaliya',

  // Countdown target (start of the Nikah day, India time)
  nikahDate: '2026-12-05T00:00:00+05:30',

  venue: {
    name: 'Danah Palace', city: 'Tumkur, Karnataka', pin: '572101', mapQuery: 'Danah Palace Tumkur 572101',
    instagram: 'danahpalace', reel: 'https://www.instagram.com/danahpalace/reel/Cosl7KSr57S/',
  },

  // photo: './haldi.jpg' (file in public/invite/) shows a banner photo on that card. time: '' means "not shown"; add e.g. 'After Zuhr · 1:00 PM' when confirmed
  events: [
    { id: 'haldi', title: 'Haldi', ur: 'حلدی', date: '2026-12-03', photo: '', blurb: 'Turmeric, laughter and blessings' },
    { id: 'mehendi', title: 'Mehendi', ur: 'مہندی', date: '2026-12-04', photo: '', blurb: 'An evening of henna, music and joy' },
    { id: 'nikah', title: 'Nikah', ur: 'نکاح', date: '2026-12-05', photo: '', blurb: 'The sacred union, in the presence of family' },
  ],

  welcomeBy: ['Khan Family', 'Sheikh Family', 'All relatives and friends'],

  // Add photos by putting files in public/invite/ and listing them here, e.g. './1.jpg'
  gallery: [
    { src: '', caption: 'Where it began' },
    { src: '', caption: 'Our favourite moments' },
    { src: '', caption: 'The promise' },
    { src: '', caption: 'Forever begins' },
  ],

  // Background nasheed (optional). Put your own licensed file at public/invite/music.mp3
  // and set this to './music.mp3'. Left empty on purpose.
  music: '',

  rsvpNumber: WA_NUMBER,
  brand: { name: 'DigiShaadi', url: '../' },
}
