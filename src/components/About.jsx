import { useState, useEffect, useRef } from 'react'
import {
  Target,
  AlertCircle,
  Lightbulb,
  Compass,
  Landmark,
  BookOpen,
  Shield,
  Film,
  Sparkles,
} from 'lucide-react'
import { siteConfig } from '../data/siteData'
import './About.css'

const iconMap = {
  Target,
  AlertCircle,
  Lightbulb,
  Compass,
  Landmark,
  BookOpen,
  Shield,
  Film,
}

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

export default function About() {
  const { about } = siteConfig
  const ref = useRef(null)
  const inView = useInView(ref)
  const [imgErr, setImgErr] = useState(false)

  return (
    <section className="section about" id="about" ref={ref}>
      <div className="container">
        <div className={`about__header fade-up${inView ? ' visible' : ''}`}>
          <span className="section-label">
            <span>01</span>— О ПРОЕКТЕ
          </span>
          <h2 className="section-heading">{about.heading}</h2>
          <p className="section-sub">{about.description}</p>
        </div>

        {/* 3 Main Concept Cards */}
        <div className="about__grid">
          {about.cards.map((card, i) => {
            const Icon = iconMap[card.icon] || Lightbulb
            return (
              <div
                key={i}
                className={`about__card card fade-up${inView ? ' visible' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="about__card-icon">
                  <Icon size={22} />
                </div>
                <h3 className="about__card-title">{card.title}</h3>
                <p className="about__card-desc">{card.description}</p>
              </div>
            )
          })}
        </div>

        {/* Supporting Main Topic Photo */}
        <div className={`about__photo-wrap fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.25s' }}>
          {!imgErr ? (
            <div className="about__photo-container">
              <img
                src={about.photo}
                alt="Самарканд, площадь Регистан"
                className="about__photo"
                onError={() => setImgErr(true)}
              />
              <div className="about__photo-badge">
                <Sparkles size={16} />
                <span>Самарканд · Площадь Регистан · Гордость и величие Узбекистана</span>
              </div>
            </div>
          ) : (
            <div className="about__photo-fallback">
              <Landmark size={40} />
              <span>Историческое наследие Узбекистана</span>
            </div>
          )}
        </div>

        {/* 5 Project Rubrics from textbook assignment */}
        {about.rubrics && (
          <div className={`about__rubrics-section fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.35s' }}>
            <div className="about__rubrics-header">
              <h3 className="about__rubrics-title">{about.rubricsTitle}</h3>
              <p className="about__rubrics-desc">
                Практическое задание №4 со стр. 9 учебника «Воспитание»: исследование пяти ключевых граней величия Узбекистана.
              </p>
            </div>

            <div className="about__rubrics-grid">
              {about.rubrics.map((rubric) => {
                const Icon = iconMap[rubric.icon] || Compass
                return (
                  <div key={rubric.id} className="about__rubric-card card">
                    {rubric.image && (
                      <div className="about__rubric-media">
                        <img
                          src={rubric.image}
                          alt={rubric.title}
                          className="about__rubric-img"
                          loading="lazy"
                        />
                        <span className="about__rubric-tag">{rubric.tag}</span>
                      </div>
                    )}
                    <div className="about__rubric-body">
                      <div className="about__rubric-top">
                        <div className="about__rubric-icon">
                          <Icon size={18} />
                        </div>
                        <h4 className="about__rubric-name">{rubric.title}</h4>
                      </div>
                      <p className="about__rubric-text">{rubric.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
