import { IconInbox } from './icons.jsx'

export default function EmptyState({
  icon,
  title = 'Nothing here yet',
  message = 'Try adjusting your search or filters.',
  action,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon || <IconInbox width={28} height={28} />}</div>
      <h3>{title}</h3>
      <p>{message}</p>
      {action}
    </div>
  )
}
