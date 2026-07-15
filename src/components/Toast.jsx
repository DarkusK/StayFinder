import { useEffect } from 'react'
import { IconCheckCircle } from './icons.jsx'

// Auto-dismissing toast. Renders nothing when `message` is empty.
export default function Toast({ message, onClose, duration = 3200 }) {
  useEffect(() => {
    if (!message) return
    const t = setTimeout(onClose, duration)
    return () => clearTimeout(t)
  }, [message, duration, onClose])

  if (!message) return null

  return (
    <div className="toast-wrap">
      <div className="toast success" role="status">
        <span className="t-ic"><IconCheckCircle width={18} height={18} /></span>
        {message}
      </div>
    </div>
  )
}
