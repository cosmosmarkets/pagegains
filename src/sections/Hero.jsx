import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Eyebrow from '../components/Eyebrow'
import HighlightChip from '../components/HighlightChip'
import URLBar from '../components/URLBar'
import './Hero.css'

// Rotating page-type words for the headline. CSS @keyframes cycle these — no JS
// text libraries. The single-cell grid stack (Hero.css) auto-sizes to the widest
// word so the headline never reflows as words swap (Q6).
const ROTATING = ['pricing page', 'landing page', 'homepage', 'signup flow']

// Stats row — emphasis token in ink, the rest muted. Real data only.
const STATS = [
  { strong: 'Median 52s', label: '' },
  { strong: 'Avg 17', label: 'issues' },
  { strong: 'Money-back', label: 'guarantee' },
]

export default function Hero() {
  const scopeRef = useRef(null)
  const eyebrowRef = useRef(null)
  const h1Ref = useRef(null)
  const sublineRef = useRef(null)
  const urlBarRef = useRef(null)
  const screenshotRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) return

    // onMount entrance — not scroll-triggered. Scoped + reverted for StrictMode.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.8, ease: 'power3.out' },
      })
      tl.from(eyebrowRef.current, { opacity: 0, y: 16 }, 0.1)
        .from(h1Ref.current, { opacity: 0, y: 24 }, 0.2)
        .from(screenshotRef.current, { opacity: 0, x: 30 }, 0.25)
        .from(sublineRef.current, { opacity: 0, y: 16 }, 0.35)
        .from(urlBarRef.current, { opacity: 0, y: 12, scale: 0.98 }, 0.45)
        .from(
          gsap.utils.toArray('.hero-stat'),
          { opacity: 0, y: 8, stagger: 0.08 },
          0.55,
        )
    }, scopeRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" className="hero-grid" ref={scopeRef} aria-label="Hero">
      <div className="hero-left">
        <Eyebrow>
          <span ref={eyebrowRef} className="hero-eyebrow">
            CONVERSION AUDIT · v1.2 ·<span className="live-dot" />
            LIVE · BUILT FOR SAAS
          </span>
        </Eyebrow>

        <h1 className="hero-h1" ref={h1Ref}>
          Your{' '}
          <span className="rotating-word" aria-label="pricing page">
            {ROTATING.map((word) => (
              <span key={word} aria-hidden="true">
                {word}
              </span>
            ))}
          </span>{' '}
          is <HighlightChip>losing</HighlightChip> conversions right now.
        </h1>

        <p className="hero-subline" ref={sublineRef}>
          10–20 ranked fixes. ~60 seconds. $3.99.
        </p>

        <div className="hero-urlbar" ref={urlBarRef}>
          <URLBar id="hero-url-bar" />
        </div>

        <ul className="hero-stats">
          {STATS.map((stat) => (
            <li key={stat.strong} className="hero-stat">
              <span className="hero-stat__strong">{stat.strong}</span>
              {stat.label && (
                <span className="hero-stat__label"> {stat.label}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="hero-right">
        <img
          ref={screenshotRef}
          className="hero-screenshot"
          src="/audit-result-screenshot.webp"
          alt="PageGains audit result — ranked list of conversion fixes with predicted lift"
          loading="eager"
        />
      </div>
    </section>
  )
}
