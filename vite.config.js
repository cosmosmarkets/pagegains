import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Single-page redesign. brand_assets/ and original/ are reference-only and are
// excluded from the build via .vercelignore / not being imported anywhere.
export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: false },
})
