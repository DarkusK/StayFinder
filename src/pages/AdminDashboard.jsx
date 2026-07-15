import { useState, useMemo } from 'react'
import { useBookings } from '../context/BookingContext.jsx'
import { useI18n } from '../context/LanguageContext.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { apartmentUk } from '../data/apartments.uk.js'
import {
  IconSearch, IconInbox, IconCalendarCheck, IconDollar, IconClock, IconUsers,
} from '../components/icons.jsx'
import { money, formatDate } from '../utils/format.js'

const STATUSES = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled']
const EDITABLE_STATUSES = ['Confirmed', 'Pending', 'Completed', 'Cancelled']

export default function AdminDashboard() {
  const { bookings, updateBookingStatus } = useBookings()
  const { t, lang } = useI18n()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')

  // Localize a stored (English) apartment name by its id.
  const aptName = (b) =>
    lang === 'uk' ? apartmentUk[b.apartmentId]?.name || b.apartmentName : b.apartmentName

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return bookings.filter((b) => {
      if (status !== 'All' && b.status !== status) return false
      if (q) {
        const ukName = apartmentUk[b.apartmentId]?.name || ''
        const hay = `${b.guestName} ${b.apartmentName} ${ukName} ${b.id}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [bookings, query, status])

  const stats = useMemo(() => {
    const active = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'Pending')
    const revenue = bookings
      .filter((b) => b.status !== 'Cancelled')
      .reduce((sum, b) => sum + b.totalPrice, 0)
    const pending = bookings.filter((b) => b.status === 'Pending').length
    return { total: bookings.length, active: active.length, revenue, pending }
  }, [bookings])

  const statCards = [
    { label: t('admin.statTotal'), value: stats.total, icon: IconInbox },
    { label: t('admin.statActive'), value: stats.active, icon: IconCalendarCheck },
    { label: t('admin.statPending'), value: stats.pending, icon: IconClock },
    { label: t('admin.statRevenue'), value: money(stats.revenue), icon: IconDollar },
  ]

  return (
    <div className="page">
      <div className="container">
        <div className="section-head" style={{ marginBottom: 24 }}>
          <div>
            <p className="eyebrow">{t('admin.kicker')}</p>
            <h1 style={{ fontSize: '2rem', margin: 0 }}>{t('admin.title')}</h1>
            <p className="text-muted" style={{ margin: '6px 0 0' }}>{t('admin.subtitle')}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          {statCards.map((s) => {
            const Icon = s.icon
            return (
              <div className="stat-card" key={s.label}>
                <span className="s-ic"><Icon width={20} height={20} /></span>
                <div className="s-label">{s.label}</div>
                <div className="s-value">{s.value}</div>
              </div>
            )
          })}
        </div>

        {/* Toolbar */}
        <div className="admin-toolbar">
          <div className="search-input">
            <IconSearch width={18} height={18} />
            <input
              className="input"
              placeholder={t('admin.searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="field" style={{ minWidth: 190 }}>
            <select className="input" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s === 'All' ? t('admin.allStatuses') : t(`status.${s}`)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<IconInbox width={28} height={28} />}
            title={t('admin.emptyTitle')}
            message={bookings.length === 0 ? t('admin.emptyNone') : t('admin.emptyFiltered')}
            action={
              (query || status !== 'All') && (
                <button className="btn btn-primary" onClick={() => { setQuery(''); setStatus('All') }}>
                  {t('admin.clearAll')}
                </button>
              )
            }
          />
        ) : (
          <div className="table-wrap">
            <div className="table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>{t('admin.thBooking')}</th>
                    <th>{t('admin.thApartment')}</th>
                    <th>{t('admin.thGuest')}</th>
                    <th>{t('admin.thCheckIn')}</th>
                    <th>{t('admin.thCheckOut')}</th>
                    <th>{t('admin.thGuests')}</th>
                    <th>{t('admin.thTotal')}</th>
                    <th>{t('admin.thStatus')}</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b) => (
                    <tr key={b.id}>
                      <td className="mono">{b.id}</td>
                      <td>{aptName(b)}</td>
                      <td>{b.guestName}</td>
                      <td>{formatDate(b.checkIn, lang)}</td>
                      <td>{formatDate(b.checkOut, lang)}</td>
                      <td>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                          <IconUsers width={14} height={14} /> {b.guests}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{money(b.totalPrice)}</td>
                      <td>
                        <select
                          className="input"
                          value={b.status}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value)}
                          style={{ padding: '4px 8px', width: 'auto', fontSize: '0.82rem' }}
                          aria-label={`Status for ${b.id}`}
                        >
                          {EDITABLE_STATUSES.map((s) => (
                            <option key={s} value={s}>{t(`status.${s}`)}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filtered.length > 0 && (
          <p className="text-muted" style={{ marginTop: 14, fontSize: '0.88rem' }}>
            {t('admin.showing', { shown: filtered.length, total: bookings.length })}
          </p>
        )}
      </div>
    </div>
  )
}
