import { siteConfig } from '../data/siteData'
import './Footer.css'

export default function Footer() {
  const { siteName, tagline, year, navLinks } = siteConfig

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container footer__inner">
        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__logo">
            <img
              src={siteConfig.logo || "/images/antanta-logo.png"}
              alt="Антанта"
              className="footer__logo-img"
            />
            <span className="footer__logo-text">{siteName}</span>
          </div>
          <p className="footer__tagline">{tagline}</p>
          <p className="footer__copy">© {year} Команда «Антанта» · 10 класс. Исследовательский проект.</p>
        </div>

        {/* Nav */}
        <nav className="footer__nav" aria-label="Нижняя навигация">
          <h4 className="footer__nav-heading">Навигация по разделам</h4>
          <ul className="footer__nav-list">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="footer__nav-link"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  )
}
