import { Link } from 'react-router-dom'
import Badge from './Badge.jsx'
import { RatingInline } from './RatingStars.jsx'
import { IconPin } from './icons.jsx'
import { money } from '../utils/format.js'
import { useI18n } from '../context/LanguageContext.jsx'

export default function ApartmentCard({ apt }) {
  const { t } = useI18n()
  return (
    <article className="card apt-card">
      <Link to={`/apartment/${apt.id}`} className="apt-media">
        <img src={apt.images[0]} alt={apt.name} loading="lazy" />
        <span className="type-tag"><Badge tone="navy">{apt.typeLabel || apt.type}</Badge></span>
        <span className="price-tag">{money(apt.pricePerNight)} <span style={{ fontWeight: 400, color: 'var(--muted)' }}>{t('common.night')}</span></span>
      </Link>
      <div className="apt-body">
        <div className="apt-title-row">
          <h3><Link to={`/apartment/${apt.id}`} style={{ color: 'inherit' }}>{apt.name}</Link></h3>
          <RatingInline value={apt.rating} />
        </div>
        <span className="apt-loc"><IconPin width={14} height={14} /> {apt.location}</span>
        <p className="apt-desc">{apt.shortDescription}</p>
        <div className="apt-foot">
          <span><strong>{money(apt.pricePerNight)}</strong> <span className="per-night">{t('common.perNight')}</span></span>
          <Link to={`/apartment/${apt.id}`} className="btn btn-outline">{t('common.viewDetails')}</Link>
        </div>
      </div>
    </article>
  )
}
