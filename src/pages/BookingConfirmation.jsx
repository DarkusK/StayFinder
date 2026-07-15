import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useBookings } from '../context/BookingContext.jsx'
import { useLocalizedApartment } from '../data/useLocalizedData.js'
import { useI18n } from '../context/LanguageContext.jsx'
import EmptyState from '../components/EmptyState.jsx'
import Badge, { statusTone } from '../components/Badge.jsx'
import Toast from '../components/Toast.jsx'
import { IconCheckCircle, IconArrowRight } from '../components/icons.jsx'
import { money, formatDate } from '../utils/format.js'

export default function BookingConfirmation() {
  const { bookingId } = useParams()
  const { getBooking } = useBookings()
  const { t, lang } = useI18n()
  const booking = getBooking(bookingId)
  const [toast, setToast] = useState(booking ? t('confirm.toast') : '')
  const apt = useLocalizedApartment(booking?.apartmentId)

  if (!booking) {
    return (
      <div className="page">
        <div className="container">
          <EmptyState
            title={t('confirm.notFoundTitle')}
            message={t('confirm.notFoundMsg')}
            action={<Link to="/" className="btn btn-primary">{t('common.backHome')}</Link>}
          />
        </div>
      </div>
    )
  }

  // Prefer the localized apartment name/location; fall back to the stored name.
  const apartmentName = apt?.name || booking.apartmentName

  return (
    <div className="page">
      <Toast message={toast} onClose={() => setToast('')} />
      <div className="container">
        <div className="confirm-wrap">
          <div className="confirm-hero">
            <div className="confirm-check"><IconCheckCircle width={44} height={44} /></div>
            <h1 style={{ marginBottom: 6 }}>{t('confirm.title')}</h1>
            <p className="text-muted">
              {t('confirm.message', { name: booking.guestName.split(' ')[0], email: booking.guestEmail })}
            </p>
            <div className="confirm-number">{t('confirm.bookingNo', { id: booking.id })}</div>
          </div>

          <div className="confirm-card">
            <div className="cc-media">
              {apt && <img src={apt.images[0]} alt={apartmentName} />}
              <div>
                <h3 style={{ marginBottom: 6 }}>{apartmentName}</h3>
                {apt && <div className="text-muted" style={{ fontSize: '0.9rem' }}>{apt.location}</div>}
                <div style={{ marginTop: 8 }}>
                  <Badge tone={statusTone[booking.status] || 'gray'}>{t(`status.${booking.status}`)}</Badge>
                </div>
              </div>
            </div>

            <div className="confirm-rows">
              <div className="confirm-row">
                <span className="k">{t('confirm.guestName')}</span>
                <span className="v">{booking.guestName}</span>
              </div>
              <div className="confirm-row">
                <span className="k">{t('confirm.email')}</span>
                <span className="v">{booking.guestEmail}</span>
              </div>
              <div className="confirm-row">
                <span className="k">{t('confirm.checkIn')}</span>
                <span className="v">{formatDate(booking.checkIn, lang)}</span>
              </div>
              <div className="confirm-row">
                <span className="k">{t('confirm.checkOut')}</span>
                <span className="v">{formatDate(booking.checkOut, lang)}</span>
              </div>
              <div className="confirm-row">
                <span className="k">{t('confirm.guests')}</span>
                <span className="v">{t('common.guestsN', { n: booking.guests })}</span>
              </div>
              <div className="confirm-row">
                <span className="k">{t('confirm.nights')}</span>
                <span className="v">{booking.nights}</span>
              </div>
              <div className="confirm-row grand">
                <span className="k">{t('confirm.totalPaid')}</span>
                <span className="v">{money(booking.totalPrice)}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28, flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-outline">{t('common.backHome')}</Link>
            <Link to="/admin" className="btn btn-primary">
              {t('confirm.viewInAdmin')} <IconArrowRight width={16} height={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
