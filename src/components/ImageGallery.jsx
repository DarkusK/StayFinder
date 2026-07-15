import { useState } from 'react'
import { IconClose } from './icons.jsx'

// Grid gallery + click-to-open lightbox.
export default function ImageGallery({ images, name }) {
  const [active, setActive] = useState(null)

  return (
    <>
      <div className="gallery">
        <div className="g-item g-main">
          <img src={images[0]} alt={`${name} — main`} onClick={() => setActive(0)} />
        </div>
        {images.slice(1, 5).map((src, i) => (
          <div className="g-item" key={i}>
            <img src={src} alt={`${name} — ${i + 2}`} loading="lazy" onClick={() => setActive(i + 1)} />
          </div>
        ))}
      </div>

      {active !== null && (
        <div
          onClick={() => setActive(null)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.88)', zIndex: 200,
            display: 'grid', placeItems: 'center', padding: 24,
          }}
        >
          <button
            className="btn btn-ghost"
            style={{ position: 'absolute', top: 20, right: 20, color: '#fff' }}
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            <IconClose />
          </button>
          <img
            src={images[active]}
            alt={`${name} — enlarged`}
            style={{ maxWidth: 'min(1000px, 92vw)', maxHeight: '86vh', borderRadius: 14, objectFit: 'contain' }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
