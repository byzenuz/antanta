import { useState, useEffect } from 'react'
import { Users, Target, Lightbulb, ChevronDown, Play } from 'lucide-react'
import { siteConfig } from '../data/siteData'
import './Hero.css'

const iconMap = { Users, Target, Lightbulb }

function ImgWithFallback({ src, alt, className, fallbackText }) {
  const [errored, setErrored] = useState(false)
  return errored ? (
    <div className={`img-fallback ${className}`} aria-label={alt}>
      <span>{fallbackText || alt}</span>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  )
}

export default function Hero() {
  const { hero } = siteConfig
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="hero" aria-label="Главная страница">
      {/* Background photo */}
      <div className="hero__bg">
        <ImgWithFallback
          src={hero.teamPhoto}
          alt="Тематическая иллюстрация проекта"
          className="hero__bg-img"
          fallbackText="Родина начинается с порога"
        />
        <div className="hero__overlay" />
        <div className="hero__overlay-gradient" />
      </div>

      <div className={`container hero__content${visible ? ' hero__content--visible' : ''}`}>
        {/* Badge */}
        <div className="hero__badge">
          {siteConfig.logo && (
            <img
              src={siteConfig.logo}
              alt="Антанта"
              className="hero__badge-logo"
            />
          )}
          <span className="hero__badge-dot" />
          <span>{hero.badge}</span>
        </div>

        {/* Topic label from textbook */}
        {hero.topicLabel && (
          <div className="hero__topic-label">
            {hero.topicLabel}
          </div>
        )}

        {/* Headline */}
        <h1 className="hero__headline">
          {hero.headline.split('\n').map((line, i) => (
            <span key={i} className={`hero__line${i === 2 ? ' hero__line--accent' : ''}`}>
              {line}
            </span>
          ))}
        </h1>

        {/* Description */}
        <p className="hero__desc">{hero.description}</p>

        {/* CTAs */}
        <div className="hero__actions">
          <button
            className="btn btn-primary hero__btn-primary"
            onClick={() => scrollTo('#presentation')}
          >
            <Play size={16} fill="currentColor" />
            {hero.primaryBtn}
          </button>
          <button
            className="btn hero__btn-secondary"
            onClick={() => scrollTo('#about')}
          >
            {hero.secondaryBtn}
            <span className="hero__btn-arrow">→</span>
          </button>
        </div>

        {/* Stats row */}
        <div className="hero__stats">
          {hero.stats.map((stat, i) => {
            const Icon = iconMap[stat.icon] || Target
            return (
              <div key={i} className="hero__stat">
                {Icon && <Icon size={15} className="hero__stat-icon" />}
                <span>{stat.label}</span>
              </div>
            )
          })}
        </div>

        {/* Scroll cue */}
        <button
          className="hero__scroll-cue"
          onClick={() => scrollTo('#about')}
          aria-label="Прокрутить вниз"
        >
          <ChevronDown size={20} />
        </button>
      </div>
    </section>
  )
}
