import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this repo from /portfolio/ until a custom domain is
  // attached (at which point this can drop back to '/'). Only the GH Pages
  // CI build sets this env var, so local dev and other hosts are unaffected.
  base: process.env.GH_PAGES ? '/portfolio/' : '/',
  plugins: [react()],
})
