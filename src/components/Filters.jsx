import { useState } from 'react'
import { APARTMENT_TYPES } from '../data/apartments.js'
import { IconChevron } from './icons.jsx'
import { money } from '../utils/format.js'
import { useI18n } from '../context/LanguageContext.jsx'
import { useLabels } from '../data/useLocalizedData.js'

// Controlled filter panel. `filters` + `onChange(next)` from the parent.
export default function Filters({ filters, onChange, maxPrice, onReset }) {
  const [collapsed, setCollapsed] = useState(true)
  const { t } = useI18n()
  const { type: typeLabel } = useLabels()

  const set = (patch) => onChange({ ...filters, ...patch })

  const toggleType = (type) => {
    const has = filters.types.includes(type)
    set({ types: has ? filters.types.filter((t) => t !== type) : [...filters.types, type] })
  }

  return (
    <aside className={`filters ${collapsed ? 'collapsed' : ''}`}>
      <h3>
        {t('filters.title')}
        <button
          className="btn btn-ghost filter-toggle"
          style={{ padding: '4px 8px' }}
          onClick={() => setCollapsed((c) => !c)}
        >
          {collapsed ? t('filters.show') : t('filters.hide')} <IconChevron width={16} height={16} style={{ transform: collapsed ? 'rotate(90deg)' : 'rotate(-90deg)' }} />
        </button>
      </h3>

      <div className="filter-body">
        <div className="filter-group">
          <label>{t('filters.maxPrice', { price: money(filters.maxPrice) })}</label>
          <input
            type="range"
            min={50}
            max={maxPrice}
            step={5}
            value={filters.maxPrice}
            onChange={(e) => set({ maxPrice: Number(e.target.value) })}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--muted)' }}>
            <span>{money(50)}</span>
            <span>{money(maxPrice)}</span>
          </div>
        </div>

        <div className="filter-group">
          <label htmlFor="f-guests">{t('filters.guests')}</label>
          <select
            id="f-guests"
            className="input"
            value={filters.guests}
            onChange={(e) => set({ guests: Number(e.target.value) })}
          >
            <option value={0}>{t('filters.anyNumber')}</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>{t('filters.guestsPlus', { n })}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>{t('filters.minRating')}</label>
          {[0, 4, 4.5, 4.8].map((r) => (
            <label key={r} className="check-row">
              <input
                type="radio"
                name="minRating"
                checked={filters.minRating === r}
                onChange={() => set({ minRating: r })}
              />
              {r === 0 ? t('filters.anyRating') : t('filters.starsPlus', { r })}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <label>{t('filters.propertyType')}</label>
          {APARTMENT_TYPES.map((type) => (
            <label key={type} className="check-row">
              <input
                type="checkbox"
                checked={filters.types.includes(type)}
                onChange={() => toggleType(type)}
              />
              {typeLabel(type)}
            </label>
          ))}
        </div>

        <button className="btn btn-ghost btn-block" onClick={onReset} style={{ marginTop: 6 }}>
          {t('filters.reset')}
        </button>
      </div>
    </aside>
  )
}
