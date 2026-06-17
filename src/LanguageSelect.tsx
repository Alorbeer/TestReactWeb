import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ReactCountryFlag from 'react-country-flag'
import './LanguageSelect.css'

const LANGUAGES = [
  { code: 'en', country: 'GB', label: 'English' },
  { code: 'de', country: 'DE', label: 'Deutsch' },
  { code: 'fr', country: 'FR', label: 'Français' },
  { code: 'zh', country: 'CN', label: '中文' },
]

export function LanguageSelect() {
  const { i18n } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const currentLang = i18n.language.split('-')[0]
  const current = LANGUAGES.find((l) => l.code === currentLang) ?? LANGUAGES[0]

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="lang-dropdown" ref={ref}>
      <button
        type="button"
        className="lang-dropdown-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
      >
        <ReactCountryFlag countryCode={current.country} svg style={{ width: '1.4em', height: '1.4em' }} />
        <span>{current.label}</span>
        <span className="lang-dropdown-arrow">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <ul className="lang-dropdown-list" role="listbox">
          {LANGUAGES.map((lang) => (
            <li
              key={lang.code}
              role="option"
              aria-selected={lang.code === currentLang}
              className={lang.code === currentLang ? 'active' : ''}
              onClick={() => {
                i18n.changeLanguage(lang.code)
                setOpen(false)
              }}
            >
              <ReactCountryFlag countryCode={lang.country} svg style={{ width: '1.4em', height: '1.4em' }} />
              <span>{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
