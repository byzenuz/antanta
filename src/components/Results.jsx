import { useRef, useState, useEffect } from 'react'
import { CheckCircle, Quote } from 'lucide-react'
import { siteConfig } from '../data/siteData'
import './Results.css'

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

export default function Results() {
  const { results } = siteConfig
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section className="section results" id="results" ref={ref}>
      <div className="container">
        <div className={`results__header fade-up${inView ? ' visible' : ''}`}>
          <span className="section-label section-label--light">
            <span>05</span>— ИТОГИ И ВЫВОДЫ
          </span>
          <h2 className="results__heading">{results.heading}</h2>
          <p className="results__sub">
            В ходе работы над проектом мы глубоко изучили исторические истоки патриотизма, роль семьи и значение династий для процветания Узбекистана.
          </p>
        </div>

        {/* Achievements / Key Conclusions */}
        {results.achievements && results.achievements.length > 0 && (
          <div className={`results__achievements fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
            <h3 className="results__sub-heading">Ключевые выводы нашей работы</h3>
            <ul className="results__achievement-list">
              {results.achievements.map((a, i) => (
                <li key={i} className="results__achievement-item">
                  <CheckCircle size={18} className="results__check" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Quotes from textbook and President */}
        <div className="results__quotes-grid">
          {results.quote1 && (
            <div className={`results__quote-card fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.28s' }}>
              <div className="results__quote-header">
                <Quote size={24} className="results__quote-icon" />
                <span className="results__quote-badge">Сокровищница мудрости</span>
              </div>
              <p className="results__quote-text">{results.quote1.text}</p>
              <cite className="results__quote-cite">— {results.quote1.author}</cite>
            </div>
          )}

          {results.quote2 && (
            <div className={`results__quote-card fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.36s' }}>
              <div className="results__quote-header">
                <Quote size={24} className="results__quote-icon results__quote-icon--gold" />
                <span className="results__quote-badge">Слово Президента</span>
              </div>
              <p className="results__quote-text">{results.quote2.text}</p>
              <cite className="results__quote-cite">— {results.quote2.author}</cite>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
