import { IconStar, IconStarHalf } from './icons.jsx'

// Renders 5 stars for a 0–5 rating (supports halves).
export default function RatingStars({ value = 0, size = 15 }) {
  const full = Math.floor(value)
  const half = value - full >= 0.5
  const stars = []
  for (let i = 0; i < 5; i++) {
    if (i < full) {
      stars.push(<IconStar key={i} width={size} height={size} />)
    } else if (i === full && half) {
      stars.push(<IconStarHalf key={i} width={size} height={size} />)
    } else {
      stars.push(<IconStar key={i} width={size} height={size} style={{ color: 'var(--gray-200)' }} />)
    }
  }
  return (
    <span className="stars" aria-label={`${value} out of 5 stars`}>
      {stars}
    </span>
  )
}

// Inline "★ 4.9 (214)" style summary.
export function RatingInline({ value, count }) {
  return (
    <span className="rating-inline">
      <IconStar width={15} height={15} style={{ color: 'var(--star)' }} />
      {value}
      {count != null && <span className="count">({count})</span>}
    </span>
  )
}
