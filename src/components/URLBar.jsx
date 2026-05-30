import './URLBar.css'

// Primary conversion element — styled as a terminal prompt.
// Prototype only: no real submission. Renders identically in light (Hero) and
// dark (FinalCTA) sections thanks to the dark override in URLBar.css (Q4).
export default function URLBar({ id }) {
  // Visual-only: stop the prototype "form" from navigating/reloading.
  const onSubmit = (e) => e.preventDefault()

  return (
    <form className="url-bar" id={id} onSubmit={onSubmit}>
      <div className="url-bar__prefix">https://</div>
      <input
        className="url-bar__input"
        type="text"
        placeholder="yoursite.com/pricing"
        aria-label="Enter your page URL"
      />
      <button className="url-bar__btn" type="submit">
        Audit my page →
      </button>
    </form>
  )
}
