import { useMemo } from 'react'
import { useI18n } from '../context/LanguageContext.jsx'
import { apartments, destinations, getApartmentById } from './apartments.js'
import {
  apartmentUk, typeUk, amenityUk, cityUk, countryUk,
} from './apartments.uk.js'

// Language-agnostic search haystack: English fields + Ukrainian equivalents,
// so a query in either language matches regardless of the active UI language.
function buildSearchIndex(apt) {
  const o = apartmentUk[apt.id]
  return [
    apt.city, apt.location, apt.name,
    cityUk[apt.city], o?.location, o?.name,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

// Merge an English apartment record with its Ukrainian overrides.
function localizeApartment(apt, lang) {
  const searchIndex = buildSearchIndex(apt)
  if (lang !== 'uk') return { ...apt, typeLabel: apt.type, searchIndex }
  const o = apartmentUk[apt.id]
  if (!o) return { ...apt, typeLabel: apt.type, searchIndex }
  return {
    ...apt,
    name: o.name ?? apt.name,
    location: o.location ?? apt.location,
    city: cityUk[apt.city] ?? apt.city,
    typeLabel: typeUk[apt.type] ?? apt.type,
    shortDescription: o.shortDescription ?? apt.shortDescription,
    description: o.description ?? apt.description,
    amenitiesLabels: apt.amenities.map((a) => amenityUk[a] ?? a),
    reviews: apt.reviews.map((r, i) => ({
      ...r,
      date: o.reviews?.[i]?.date ?? r.date,
      text: o.reviews?.[i]?.text ?? r.text,
    })),
    searchIndex,
  }
}

// Full catalog localized for the current language.
export function useLocalizedApartments() {
  const { lang } = useI18n()
  return useMemo(() => apartments.map((a) => localizeApartment(a, lang)), [lang])
}

// Single apartment localized for the current language.
export function useLocalizedApartment(id) {
  const { lang } = useI18n()
  return useMemo(() => {
    const base = getApartmentById(id)
    return base ? localizeApartment(base, lang) : undefined
  }, [id, lang])
}

// Destinations localized for the current language.
export function useLocalizedDestinations() {
  const { lang } = useI18n()
  return useMemo(
    () =>
      destinations.map((d) => ({
        ...d,
        canonicalCity: d.city, // English city kept for search params/matching
        city: lang === 'uk' ? cityUk[d.city] ?? d.city : d.city,
        country: lang === 'uk' ? countryUk[d.country] ?? d.country : d.country,
      })),
    [lang]
  )
}

// Localize a type / amenity / city label on demand.
export function useLabels() {
  const { lang } = useI18n()
  return {
    type: (t) => (lang === 'uk' ? typeUk[t] ?? t : t),
    amenity: (a) => (lang === 'uk' ? amenityUk[a] ?? a : a),
    city: (c) => (lang === 'uk' ? cityUk[c] ?? c : c),
    status: (s) => s, // status handled via translations dict
  }
}
