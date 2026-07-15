import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBookings } from '../context/BookingContext.jsx'
import { IconCheck } from './icons.jsx'
import {
  money, nightsBetween, todayISO, SERVICE_FEE_RATE, CLEANING_FEE,
} from '../utils/format.js'
import { getApartmentById } from '../data/apartments.js'
import { useI18n } from '../context/LanguageContext.jsx'

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function BookingForm({ apt, prefill = {}, onBooked }) {
  const navigate = useNavigate()
  const { addBooking } = useBookings()
  const { t } = useI18n()

  const [form, setForm] = useState({
    checkIn: prefill.checkIn || '',
    checkOut: prefill.checkOut || '',
    guests: prefill.guests || 1,
    guestName: '',
    guestEmail: '',
    guestPhone: '',
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const set = (patch) => setForm((f) => ({ ...f, ...patch }))

  const nights = nightsBetween(form.checkIn, form.checkOut)
  const priceCalc = useMemo(() => {
    const base = nights * apt.pricePerNight
    const serviceFee = Math.round(base * SERVICE_FEE_RATE)
    const cleaning = nights > 0 ? CLEANING_FEE : 0
    return { base, serviceFee, cleaning, total: base + serviceFee + cleaning }
  }, [nights, apt.pricePerNight])

  function validate() {
    const e = {}
    if (!form.checkIn) e.checkIn = t('booking.errCheckIn')
    if (!form.checkOut) e.checkOut = t('booking.errCheckOut')
    if (form.checkIn && form.checkOut && nights === 0) e.checkOut = t('booking.errCheckoutAfter')
    if (form.guests < 1) e.guests = t('booking.errGuestsMin')
    if (form.guests > apt.maxGuests) e.guests = t('booking.errGuestsMax', { n: apt.maxGuests })
    if (!form.guestName.trim()) e.guestName = t('booking.errName')
    if (!form.guestEmail.trim()) e.guestEmail = t('booking.errEmail')
    else if (!emailRe.test(form.guestEmail)) e.guestEmail = t('booking.errEmailValid')
    if (!form.guestPhone.trim()) e.guestPhone = t('booking.errPhone')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    // Simulate a short network request before confirming.
    setTimeout(() => {
      const booking = addBooking({
        apartmentId: apt.id,
        apartmentName: getApartmentById(apt.id)?.name || apt.name,
        guestName: form.guestName.trim(),
        guestEmail: form.guestEmail.trim(),
        guestPhone: form.guestPhone.trim(),
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: form.guests,
        nights,
        totalPrice: priceCalc.total,
      })
      if (onBooked) onBooked(booking)
      navigate(`/confirmation/${booking.id}`)
    }, 700)
  }

  return (
    <form className="booking-box" onSubmit={handleSubmit} noValidate>
      <div className="price-row">
        <span className="amount">{money(apt.pricePerNight)}</span>
        <span className="per">{t('common.perNight')}</span>
        <span style={{ marginLeft: 'auto' }} className="rating-inline">
          ★ {apt.rating}
        </span>
      </div>

      <div className="booking-grid-2">
        <div className="field">
          <label htmlFor="b-in">{t('booking.checkIn')}</label>
          <input
            id="b-in" type="date" className={`input ${errors.checkIn ? 'error' : ''}`}
            min={todayISO()} value={form.checkIn}
            onChange={(e) => set({ checkIn: e.target.value })}
          />
          {errors.checkIn && <span className="field-error">{errors.checkIn}</span>}
        </div>
        <div className="field">
          <label htmlFor="b-out">{t('booking.checkOut')}</label>
          <input
            id="b-out" type="date" className={`input ${errors.checkOut ? 'error' : ''}`}
            min={form.checkIn || todayISO()} value={form.checkOut}
            onChange={(e) => set({ checkOut: e.target.value })}
          />
          {errors.checkOut && <span className="field-error">{errors.checkOut}</span>}
        </div>
      </div>

      <div className="field" style={{ marginTop: 12 }}>
        <label htmlFor="b-guests">{t('booking.guests')}</label>
        <select
          id="b-guests" className={`input ${errors.guests ? 'error' : ''}`}
          value={form.guests} onChange={(e) => set({ guests: Number(e.target.value) })}
        >
          {Array.from({ length: apt.maxGuests }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>{t('common.guestsN', { n })}</option>
          ))}
        </select>
        {errors.guests && <span className="field-error">{errors.guests}</span>}
      </div>

      <div className="field" style={{ marginTop: 12 }}>
        <label htmlFor="b-name">{t('booking.fullName')}</label>
        <input
          id="b-name" className={`input ${errors.guestName ? 'error' : ''}`}
          placeholder={t('booking.namePlaceholder')} value={form.guestName}
          onChange={(e) => set({ guestName: e.target.value })}
        />
        {errors.guestName && <span className="field-error">{errors.guestName}</span>}
      </div>

      <div className="booking-grid-2" style={{ marginTop: 12 }}>
        <div className="field">
          <label htmlFor="b-email">{t('booking.email')}</label>
          <input
            id="b-email" type="email" className={`input ${errors.guestEmail ? 'error' : ''}`}
            placeholder="you@email.com" value={form.guestEmail}
            onChange={(e) => set({ guestEmail: e.target.value })}
          />
          {errors.guestEmail && <span className="field-error">{errors.guestEmail}</span>}
        </div>
        <div className="field">
          <label htmlFor="b-phone">{t('booking.phone')}</label>
          <input
            id="b-phone" className={`input ${errors.guestPhone ? 'error' : ''}`}
            placeholder="+1 555 000 0000" value={form.guestPhone}
            onChange={(e) => set({ guestPhone: e.target.value })}
          />
          {errors.guestPhone && <span className="field-error">{errors.guestPhone}</span>}
        </div>
      </div>

      {nights > 0 && (
        <div className="price-breakdown">
          <div className="price-line">
            <span>{t('booking.priceTimes', { price: money(apt.pricePerNight), n: nights })}</span>
            <span>{money(priceCalc.base)}</span>
          </div>
          <div className="price-line">
            <span>{t('booking.cleaning')}</span>
            <span>{money(priceCalc.cleaning)}</span>
          </div>
          <div className="price-line">
            <span>{t('booking.service')}</span>
            <span>{money(priceCalc.serviceFee)}</span>
          </div>
          <div className="price-line total">
            <span>{t('booking.total')}</span>
            <span>{money(priceCalc.total)}</span>
          </div>
        </div>
      )}

      <button type="submit" className="btn btn-accent btn-block btn-lg" style={{ marginTop: 18 }} disabled={submitting}>
        {submitting ? t('booking.confirming') : t('booking.reserve')}
      </button>
      <p className="availability-note"><IconCheck width={15} height={15} /> {t('booking.freeCancel')}</p>
    </form>
  )
}
