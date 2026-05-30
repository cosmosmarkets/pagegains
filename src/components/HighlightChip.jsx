import './HighlightChip.css'

// Skewed red keyword chip. Use on 1–2 words per headline maximum.
export default function HighlightChip({ children }) {
  return <mark className="highlight-chip">{children}</mark>
}
