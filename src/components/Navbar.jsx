import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '../data/siteData'
import './Navbar.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#hero')
  const menuRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Intersection observer to highlight active section
  useEffect(() => {
    const sections = siteConfig.navLinks.map(l => document.querySelector(l.href))
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive('#' + e.target.id) })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => s && obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    setActive(href)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`} ref={menuRef}>
      <div className="container navbar__inner">
        {/* Logo */}
        <a
          className="navbar__logo"
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleNav('#hero') }}
          aria-label="На главную"
        >
          <img
            src={siteConfig.logo}
            alt="Антанта логотип"
            className="navbar__logo-img"
          />
          <span className="navbar__logo-text">{siteConfig.siteName}</span>
        </a>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Основная навигация">
          {siteConfig.navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__link${active === link.href ? ' navbar__link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <a
          href="#presentation"
          className="btn btn-primary navbar__cta"
          onClick={(e) => { e.preventDefault(); handleNav('#presentation') }}
        >
          Презентация
        </a>

        {/* Hamburger */}
        <button
          className="navbar__burger"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer${open ? ' navbar__drawer--open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Мобильная навигация">
          {siteConfig.navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`navbar__drawer-link${active === link.href ? ' navbar__drawer-link--active' : ''}`}
              onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
              tabIndex={open ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#presentation"
            className="btn btn-primary navbar__drawer-btn"
            onClick={(e) => { e.preventDefault(); handleNav('#presentation') }}
            tabIndex={open ? 0 : -1}
          >
            Смотреть презентацию
          </a>
        </nav>
      </div>
      {open && <div className="navbar__overlay" onClick={() => setOpen(false)} />}
    </header>
  )
}
