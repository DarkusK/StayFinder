import { Link, useNavigate } from 'react-router-dom'
import SearchForm from '../components/SearchForm.jsx'
import ApartmentCard from '../components/ApartmentCard.jsx'
import { useLocalizedApartments, useLocalizedDestinations } from '../data/useLocalizedData.js'
import { useI18n } from '../context/LanguageContext.jsx'
import {
  IconShield, IconTag, IconHeadset, IconKey, IconArrowRight, IconStar,
} from '../components/icons.jsx'

const featureIcons = [IconShield, IconTag, IconKey, IconHeadset]

export default function Home() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const apartments = useLocalizedApartments()
  const destinations = useLocalizedDestinations()
  const featured = apartments.slice(0, 6)
  const features = t('home.features')

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <p className="lead">{t('home.heroKicker')}</p>
          <h1>{t('home.heroTitle')}</h1>
          <p className="lead">{t('home.heroLead')}</p>
        </div>
      </section>

      <div className="container">
        <SearchForm variant="hero" />
      </div>

      {/* Destinations */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t('home.popularKicker')}</p>
              <h2>{t('home.popularTitle')}</h2>
              <p>{t('home.popularText')}</p>
            </div>
            <Link to="/search" className="btn btn-outline">{t('home.browseAll')} <IconArrowRight width={16} height={16} /></Link>
          </div>
          <div className="destinations">
            {destinations.map((d) => (
              <div
                key={d.canonicalCity}
                className="dest-card"
                onClick={() => navigate(`/search?destination=${encodeURIComponent(d.canonicalCity)}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?destination=${encodeURIComponent(d.canonicalCity)}`)}
              >
                <img src={d.image} alt={d.city} loading="lazy" />
                <div className="dest-body">
                  <h3>{d.city}</h3>
                  <span>{d.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured apartments */}
      <section className="section" style={{ background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t('home.featuredKicker')}</p>
              <h2>{t('home.featuredTitle')}</h2>
              <p>{t('home.featuredText')}</p>
            </div>
            <Link to="/search" className="btn btn-outline">{t('home.viewAll')} <IconArrowRight width={16} height={16} /></Link>
          </div>
          <div className="grid grid-3">
            {featured.map((apt) => (
              <ApartmentCard key={apt.id} apt={apt} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <p className="eyebrow">{t('home.whyKicker')}</p>
              <h2>{t('home.whyTitle')}</h2>
              <p>{t('home.whyText')}</p>
            </div>
          </div>
          <div className="features">
            {features.map((f, i) => {
              const Icon = featureIcons[i]
              return (
                <div className="feature" key={f.title}>
                  <div className="feature-icon"><Icon width={24} height={24} /></div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <div>
              <p className="eyebrow" style={{ color: '#bfdbfe' }}>
                <IconStar width={14} height={14} style={{ verticalAlign: -2 }} /> {t('home.ctaRated')}
              </p>
              <h2>{t('home.ctaTitle')}</h2>
              <p>{t('home.ctaText')}</p>
            </div>
            <Link to="/search" className="btn btn-lg" style={{ background: '#fff', color: 'var(--navy)' }}>
              {t('home.ctaBtn')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
