import { useEffect, useRef } from 'react'
import CTAButton from '../components/CTAButton'
import './Nav.css'

const LINKS = [
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

const NAV_HEIGHT = 64

export default function Nav() {
  const navRef = useRef(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    // Lenis drives native scroll, so the window scroll event fires in both
    // smooth and reduced-motion modes. Toggle the scrolled background past 20px.
    const onScroll = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 20)
    }
    onScroll() // set initial state (e.g. on reload mid-page)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Route in-page anchors through Lenis so the jump is smooth and clears the
  // fixed bar. Falls back to native anchor behaviour if Lenis isn't running.
  const onAnchorClick = (e, href) => {
    const lenis = window.__lenis
    const target = document.querySelector(href)
    if (!lenis || !target) return
    e.preventDefault()
    lenis.scrollTo(target, { offset: -NAV_HEIGHT })
  }

  return (
    <header className="nav" ref={navRef}>
      <div className="nav__inner">
        <a className="nav__logo" href="#hero" aria-label="PageGains home">
          <img src="/pagegains-logo-new.png" height="28" alt="PageGains" />
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => onAnchorClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__cta">
          <CTAButton label="Audit my page →" size="small" href="#hero-url-bar" />
        </div>
      </div>
    </header>
  )
}
