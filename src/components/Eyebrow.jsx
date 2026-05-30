import './Eyebrow.css'

// Mono uppercase label used as a section eyebrow.
// Accepts plain `text`, or `children` when the eyebrow needs inline markup
// (e.g. the Hero's live indicator dot). Auto-adapts in dark sections via
// var(--pg-mute) — no dark override needed (Q11).
export default function Eyebrow({ text, children, className = '' }) {
  return (
    <span className={`eyebrow ${className}`.trim()}>{children ?? text}</span>
  )
}
