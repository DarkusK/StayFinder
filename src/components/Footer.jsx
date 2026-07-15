import { Link } from 'react-router-dom'
import { IconMail, IconPhone, IconPin } from './icons.jsx'
import { useI18n } from '../context/LanguageContext.jsx'
import { useLabels } from '../data/useLocalizedData.js'

export default function Footer() {
  const { t } = useI18n()
  const { city } = useLabels()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="brand">
              <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="StayFinder logo" style={{ height: 32 }} />
              <span>StayFinder</span>
            </Link>
            <p className="muted-light" style={{ marginTop: 14 }}>
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4>{t('footer.explore')}</h4>
            <ul>
              <li><Link to="/search">{t('footer.allStays')}</Link></li>
              <li><Link to="/search?destination=Barcelona">{city('Barcelona')}</Link></li>
              <li><Link to="/search?destination=Lisbon">{city('Lisbon')}</Link></li>
              <li><Link to="/search?destination=Bali">{city('Bali')}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{t('footer.company')}</h4>
            <ul>
              <li><a href="#about">{t('footer.about')}</a></li>
              <li><a href="#careers">{t('footer.careers')}</a></li>
              <li><a href="#press">{t('footer.press')}</a></li>
              <li><Link to="/admin">{t('footer.adminPanel')}</Link></li>
            </ul>
          </div>

          <div>
            <h4>{t('footer.contact')}</h4>
            <ul>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconPin width={16} height={16} /> 24 Marina Blvd, Lisbon
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconMail width={16} height={16} /> hello@stayfinder.com
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <IconPhone width={16} height={16} /> +1 (555) 018-2299
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t('footer.rights')}</span>
          <span style={{ display: 'flex', gap: 18 }}>
            <a href="#privacy">{t('footer.privacy')}</a>
            <a href="#terms">{t('footer.terms')}</a>
            <a href="#cookies">{t('footer.cookies')}</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
