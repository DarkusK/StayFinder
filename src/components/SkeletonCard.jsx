// Placeholder shown while apartment cards "load".
export default function SkeletonCard() {
  return (
    <div className="skel-card">
      <div className="skeleton skel-img" />
      <div className="skel-body">
        <div className="skeleton" style={{ height: 18, width: '70%' }} />
        <div className="skeleton" style={{ height: 12, width: '45%' }} />
        <div className="skeleton" style={{ height: 12, width: '90%' }} />
        <div className="skeleton" style={{ height: 12, width: '60%' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
          <div className="skeleton" style={{ height: 20, width: 80 }} />
          <div className="skeleton" style={{ height: 20, width: 60 }} />
        </div>
      </div>
    </div>
  )
}
