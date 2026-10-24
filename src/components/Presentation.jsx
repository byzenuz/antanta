import { useState, useEffect, useRef } from 'react'
import {
  Download,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  FileText,
  Quote,
  CheckCircle,
} from 'lucide-react'
import { siteConfig } from '../data/siteData'
import './Presentation.css'

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

export default function Presentation() {
  const { presentation } = siteConfig
  const ref = useRef(null)
  const inView = useInView(ref)

  const [slideIdx, setSlideIdx] = useState(0)

  const slides = presentation.slides || []
  const total = slides.length
  const currentSlide = slides[slideIdx] || {}

  const prevSlide = () => setSlideIdx(i => (i - 1 + total) % total)
  const nextSlide = () => setSlideIdx(i => (i + 1) % total)

  return (
    <section className="section pres" id="presentation" ref={ref}>
      <div className="container">
        <div className={`pres__header fade-up${inView ? ' visible' : ''}`}>
          <span className="section-label">
            <span>03</span>— ПРЕЗЕНТАЦИЯ
          </span>
          <h2 className="section-heading">{presentation.heading}</h2>
          <p className="section-sub">{presentation.description}</p>
        </div>

        <div className={`pres__card card fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.12s' }}>
          {/* Interactive Slide Viewer Area */}
          <div className="pres__viewport">
            {/* Background glowing accents */}
            <div className="pres__glow-1" />
            <div className="pres__glow-2" />

            {/* Slide Content */}
            <div className="pres__slide-content">
              <div className="pres__slide-top">
                <span className="pres__slide-tag">{currentSlide.tag || `СЛАЙД ${slideIdx + 1}`}</span>
                <span className="pres__slide-number">{slideIdx + 1} / {total}</span>
              </div>

              <h3 className="pres__slide-title">{currentSlide.title}</h3>
              {currentSlide.subtitle && (
                <p className="pres__slide-subtitle">{currentSlide.subtitle}</p>
              )}

              {/* Bullet points */}
              {currentSlide.points && (
                <ul className="pres__slide-points">
                  {currentSlide.points.map((pt, pIdx) => (
                    <li key={pIdx} className="pres__slide-point">
                      <CheckCircle size={18} className="pres__point-icon" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Quote block */}
              {currentSlide.quote && (
                <div className="pres__slide-quote">
                  <Quote size={20} className="pres__quote-icon" />
                  <div className="pres__quote-body">
                    <p className="pres__quote-text">{currentSlide.quote}</p>
                    {currentSlide.author && (
                      <span className="pres__quote-author">— {currentSlide.author}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Prev/Next buttons */}
            <button
              className="pres__slide-nav pres__slide-nav--prev"
              onClick={prevSlide}
              aria-label="Предыдущий слайд"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              className="pres__slide-nav pres__slide-nav--next"
              onClick={nextSlide}
              aria-label="Следующий слайд"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Card footer / Actions */}
          <div className="pres__body">
            <div className="pres__meta">
              <FileText size={18} />
              <span className="pres__meta-title">{presentation.title}</span>
              <span className="pres__slide-count">{total} слайдов</span>
            </div>

            {/* Slide Navigation Dots / Pills */}
            <div className="pres__pills">
              {slides.map((s, i) => (
                <button
                  key={i}
                  className={`pres__pill${i === slideIdx ? ' pres__pill--active' : ''}`}
                  onClick={() => setSlideIdx(i)}
                  aria-label={`Слайд ${i + 1}`}
                >
                  <span>{i + 1}</span>
                  <span className="pres__pill-label">{s.title ? s.title.slice(0, 18) + '...' : `Слайд ${i + 1}`}</span>
                </button>
              ))}
            </div>

            <div className="pres__actions">
              {/* Download */}
              <a
                href={presentation.pdfPath}
                download="Prezentatsiya-Rodina-Edina-10-Klass.pdf"
                className="btn btn-primary pres__btn"
              >
                <Download size={18} />
                Скачать презентацию (PDF)
              </a>

              {/* Open in new tab */}
              <a
                href={presentation.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline pres__btn"
              >
                <ExternalLink size={18} />
                Открыть PDF в новой вкладке
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
