// Colored pill. `tone` maps to a badge-* class.
export default function Badge({ tone = 'gray', children }) {
  return <span className={`badge badge-${tone}`}>{children}</span>
}

// Maps a booking status to a badge tone.
export const statusTone = {
  Confirmed: 'green',
  Pending: 'amber',
  Completed: 'navy',
  Cancelled: 'red',
}
