import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// Output goes to /docs so the same build works for Cloudflare (assets dir)
// and GitHub Pages (Deploy from branch -> /docs).
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    rollupOptions: { input: { main: resolve(import.meta.dirname, 'index.html'), invite: resolve(import.meta.dirname, 'invite/index.html') } },
  },
})

