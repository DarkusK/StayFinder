import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IconPin, IconCalendar, IconUsers, IconSearch } from './icons.jsx'
import { todayISO, nightsBetween } from '../utils/format.js'
import { useI18n } from '../context/LanguageContext.jsx'

// Hero / page search form. On submit, navigates to /search with query params.
export default function SearchForm({ variant = 'hero', initial = {} }) {
  const navigate = useNavigate()
  const { t } = useI18n()
  const [destination, setDestination] = useState(initial.destination || '')
  const [checkIn, setCheckIn] = useState(initial.checkIn || '')
  const [checkOut, setCheckOut] = useState(initial.checkOut || '')
  const [guests, setGuests] = useState(initial.guests || 2)
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!destination.trim()) e.destination = t('search.errDestination')
    if (checkIn && checkOut && nightsBetween(checkIn, checkOut) === 0)
      e.checkOut = t('search.errCheckout')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    const params = new URLSearchParams()
    if (destination.trim()) params.set('destination', destination.trim())
    if (checkIn) params.set('checkIn', checkIn)
    if (checkOut) params.set('checkOut', checkOut)
    params.set('guests', String(guests))
    navigate(`/search?${params.toString()}`)
  }

  return (
    <form className={`search-form ${variant === 'hero' ? 'hero-search' : ''}`} onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="sf-dest"><IconPin width={14} height={14} /> {t('search.destination')}</label>
        <input
          id="sf-dest"
          className={`input ${errors.destination ? 'error' : ''}`}
          placeholder={t('search.destinationPlaceholder')}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        {errors.destination && <span className="field-error">{errors.destination}</span>}
      </div>

      <div className="field">
        <label htmlFor="sf-in"><IconCalendar width={14} height={14} /> {t('search.checkIn')}</label>
        <input
          id="sf-in"
          type="date"
          className="input"
          min={todayISO()}
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="sf-out"><IconCalendar width={14} height={14} /> {t('search.checkOut')}</label>
        <input
          id="sf-out"
          type="date"
          className={`input ${errors.checkOut ? 'error' : ''}`}
          min={checkIn || todayISO()}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        {errors.checkOut && <span className="field-error">{errors.checkOut}</span>}
      </div>

      <div className="field">
        <label htmlFor="sf-guests"><IconUsers width={14} height={14} /> {t('search.guests')}</label>
        <select
          id="sf-guests"
          className="input"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>{t('common.guestsN', { n })}</option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-accent btn-lg">
        <IconSearch width={18} height={18} /> {t('search.searchBtn')}
      </button>
    </form>
  )
}
