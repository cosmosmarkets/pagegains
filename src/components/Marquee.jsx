import './Marquee.css'

// Full-width red ticker strip. The text is duplicated so the -50% keyframe loops
// seamlessly. Scroll-velocity coupling (Q8) is wired in Stage 3/9 off
// window.__lenis against the .marquee-track node — not needed for the atom.
const DEFAULT_TEXT =
  'YOUR PRICING PAGE IS BLEEDING SIGNUPS · $3.99 · 52 SECONDS · YOUR HOMEPAGE IS COSTING YOU DEMOS · 10–20 RANKED FIXES · NO SUBSCRIPTION · MONEY-BACK GUARANTEE · '

export default function Marquee({ text = DEFAULT_TEXT }) {
  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  )
}
