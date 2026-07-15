import { useState, useEffect } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import ImageGallery from '../components/ImageGallery.jsx'
import BookingForm from '../components/BookingForm.jsx'
import Spinner from '../components/Spinner.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Badge from '../components/Badge.jsx'
import RatingStars, { RatingInline } from '../components/RatingStars.jsx'
import { useLocalizedApartment } from '../data/useLocalizedData.js'
import { useI18n } from '../context/LanguageContext.jsx'
import { amenityIcon, IconPin, IconCheck, IconUsers, IconCalendarCheck } from '../components/icons.jsx'

export default function ApartmentDetails() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const { t } = useI18n()
  const [loading, setLoading] = useState(true)
  const apt = useLocalizedApartment(id)

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="page">
        <div className="container">
          <Spinner label={t('details.loading')} />
        </div>
      </div>
    )
  }

  if (!apt) {
    return (
      <div className="page">
        <div className="container">
          <EmptyState
            title={t('details.notFoundTitle')}
            message={t('details.notFoundMsg')}
            action={<Link to="/search" className="btn btn-primary">{t('details.browseOther')}</Link>}
          />
        </div>
      </div>
    )
  }

  const prefill = {
    checkIn: params.get('checkIn') || '',
    checkOut: params.get('checkOut') || '',
    guests: Number(params.get('guests')) || 1,
  }

  return (
    <div className="page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">{t('nav.home')}</Link> <span>/</span>
          <Link to="/search">{t('results.breadcrumbSearch')}</Link> <span>/</span>
          <span>{apt.name}</span>
        </div>

        <div className="detail-head">
          <h1>{apt.name}</h1>
          <div className="detail-meta">
            <RatingInline value={apt.rating} count={apt.reviewsCount} />
            <span className="dot">•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <IconPin width={15} height={15} /> {apt.location}
            </span>
            <span className="dot">•</span>
            <Badge tone="navy">{apt.typeLabel}</Badge>
          </div>
        </div>

        <ImageGallery images={apt.images} name={apt.name} />

        <div className="detail-layout">
          <div>
            <div className="detail-section">
              <h2>{t('details.about')}</h2>
              <div className="detail-meta" style={{ marginBottom: 14 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <IconUsers width={16} height={16} /> {t('details.upToGuests', { n: apt.maxGuests })}
                </span>
              </div>
              <p style={{ color: 'var(--slate)' }}>{apt.description}</p>
            </div>

            <div className="detail-section">
              <h2>{t('details.offers')}</h2>
              <div className="amenities-grid">
                {apt.amenities.map((a, i) => {
                  const Icon = amenityIcon[a] || IconCheck
                  const label = apt.amenitiesLabels ? apt.amenitiesLabels[i] : a
                  return (
                    <div className="amenity" key={a}>
                      <span className="a-ic"><Icon width={20} height={20} /></span> {label}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="detail-section">
              <h2>{t('details.reviews')}</h2>
              <div className="reviews-summary">
                <span className="big-score">{apt.rating}</span>
                <div>
                  <RatingStars value={apt.rating} size={18} />
                  <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                    {t('details.basedOn', { n: apt.reviewsCount })}
                  </div>
                </div>
              </div>
              <div>
                {apt.reviews.map((r, i) => (
                  <div className="review" key={i}>
                    <div className="review-head">
                      <div className="avatar">{r.author.charAt(0)}</div>
                      <div>
                        <div className="r-name">{r.author}</div>
                        <div className="r-date">{r.date}</div>
                      </div>
                      <div style={{ marginLeft: 'auto' }}>
                        <RatingStars value={r.rating} />
                      </div>
                    </div>
                    <p>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h2>{t('details.availability')}</h2>
              <p className="availability-note" style={{ fontSize: '0.95rem' }}>
                <IconCalendarCheck width={18} height={18} /> {t('details.availableNow')}
              </p>
              <p className="text-muted">{t('details.selectDates')}</p>
            </div>
          </div>

          <div>
            <BookingForm apt={apt} prefill={prefill} />
          </div>
        </div>
      </div>
    </div>
  )
}
