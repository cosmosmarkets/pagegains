import './CTAButton.css'

// Hard-offset-shadow CTA. `size`: 'default' | 'small'. `theme`: 'red' | 'ink'.
export default function CTAButton({
  label,
  href = '#',
  size = 'default',
  theme = 'red',
  className = '',
}) {
  return (
    <a
      href={href}
      className={`cta-btn cta-btn--${size} cta-btn--${theme} ${className}`.trim()}
    >
      {label}
    </a>
  )
}
