import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import SearchForm from '../components/SearchForm.jsx'
import Filters from '../components/Filters.jsx'
import ApartmentCard from '../components/ApartmentCard.jsx'
import SkeletonCard from '../components/SkeletonCard.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { useLocalizedApartments, useLabels } from '../data/useLocalizedData.js'
import { useI18n } from '../context/LanguageContext.jsx'
import { IconSearch } from '../components/icons.jsx'

const MAX_PRICE = 400

const defaultFilters = {
  maxPrice: MAX_PRICE,
  guests: 0,
  minRating: 0,
  types: [],
}

export default function SearchResults() {
  const [params] = useSearchParams()
  const { t } = useI18n()
  const { city } = useLabels()
  const apartments = useLocalizedApartments()

  const destination = params.get('destination') || ''
  const guestsParam = Number(params.get('guests')) || 0
  const checkIn = params.get('checkIn') || ''
  const checkOut = params.get('checkOut') || ''

  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ ...defaultFilters, guests: guestsParam })
  const [sort, setSort] = useState('recommended')

  // Simulate a fetch whenever the search query changes.
  useEffect(() => {
    setLoading(true)
    setFilters((f) => ({ ...f, guests: guestsParam }))
    const timer = setTimeout(() => setLoading(false), 650)
    return () => clearTimeout(timer)
  }, [destination, guestsParam, checkIn, checkOut])

  const results = useMemo(() => {
    let list = apartments.filter((a) => {
      if (destination) {
        const q = destination.toLowerCase()
        if (!a.searchIndex.includes(q)) return false
      }
      if (a.pricePerNight > filters.maxPrice) return false
      if (filters.guests && a.maxGuests < filters.guests) return false
      if (filters.minRating && a.rating < filters.minRating) return false
      if (filters.types.length && !filters.types.includes(a.type)) return false
      return true
    })

    if (sort === 'price-asc') list = [...list].sort((a, b) => a.pricePerNight - b.pricePerNight)
    else if (sort === 'price-desc') list = [...list].sort((a, b) => b.pricePerNight - a.pricePerNight)
    else if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating)

    return list
  }, [apartments, destination, filters, sort])

  return (
    <div className="page">
      <div className="container">
        <div className="breadcrumbs">
          <Link to="/">{t('nav.home')}</Link> <span>/</span> <span>{t('results.breadcrumbSearch')}</span>
        </div>

        <div style={{ marginBottom: 28 }}>
          <SearchForm
            variant="page"
            initial={{ destination, checkIn, checkOut, guests: guestsParam || 2 }}
          />
        </div>

        <div className="results-layout">
          <Filters
            filters={filters}
            onChange={setFilters}
            maxPrice={MAX_PRICE}
            onReset={() => setFilters({ ...defaultFilters })}
          />

          <div>
            <div className="results-head">
              <div>
                <h2 style={{ marginBottom: 2 }}>
                  {destination ? t('results.titleIn', { dest: city(destination) }) : t('results.titleAll')}
                </h2>
                <span className="count">
                  {loading ? t('results.searching') : t('results.found', { n: results.length })}
                </span>
              </div>
              <div className="field" style={{ minWidth: 190 }}>
                <select className="input" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort by">
                  <option value="recommended">{t('results.sortRecommended')}</option>
                  <option value="price-asc">{t('results.sortPriceAsc')}</option>
                  <option value="price-desc">{t('results.sortPriceDesc')}</option>
                  <option value="rating">{t('results.sortRating')}</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="results-grid">
                {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : results.length === 0 ? (
              <EmptyState
                icon={<IconSearch width={28} height={28} />}
                title={t('results.emptyTitle')}
                message={t('results.emptyMsg')}
                action={
                  <button className="btn btn-primary" onClick={() => setFilters({ ...defaultFilters })}>
                    {t('results.clearFilters')}
                  </button>
                }
              />
            ) : (
              <div className="results-grid">
                {results.map((apt) => <ApartmentCard key={apt.id} apt={apt} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
