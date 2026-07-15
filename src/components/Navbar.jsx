import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IconMenu, IconClose } from './icons.jsx'
import { useI18n } from '../context/LanguageContext.jsx'
import { LANGUAGES } from '../i18n/translations.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { t, lang, setLang } = useI18n()

  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="brand" onClick={close}>
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="StayFinder logo" />
          <span>StayFinder</span>
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          <NavLink to="/" end onClick={close}>{t('nav.home')}</NavLink>
          <NavLink to="/search" onClick={close}>{t('nav.explore')}</NavLink>
          <NavLink to="/admin" onClick={close}>{t('nav.admin')}</NavLink>
          <Link to="/search" className="btn btn-accent nav-cta" onClick={close}>
            {t('nav.findStay')}
          </Link>
          <div className="lang-switch" role="group" aria-label="Language">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                className={lang === l.code ? 'active' : ''}
                onClick={() => setLang(l.code)}
                aria-pressed={lang === l.code}
                title={l.name}
              >
                {l.label}
              </button>
            ))}
          </div>
        </nav>

        <button
          className="hamburger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </header>
  )
}
