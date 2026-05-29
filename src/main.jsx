import React from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import App from './App'
import 'lenis/dist/lenis.css'
import './tokens.css'
import './global.css'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)',
).matches

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.8,
  touchMultiplier: 1.5,
})

// Official GSAP + Lenis wiring (lenis v1.x, GSAP 3.12+).
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)

// Expose for marquee velocity coupling (Stage 3) without re-instantiating Lenis.
window.__lenis = lenis

// Fonts shift line-heights and thus element positions — recalc ScrollTrigger
// once webfonts (and then everything) have loaded so animations fire at the
// correct scroll depth.
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh())
}
window.addEventListener('load', () => ScrollTrigger.refresh())

// Respect reduced-motion at the global level: stop Lenis smoothing so the page
// scrolls natively. Per-component GSAP effects also guard on this flag.
if (prefersReducedMotion) {
  lenis.destroy()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
