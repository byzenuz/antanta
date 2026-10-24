import { useState, useEffect, useRef } from 'react'
import { User } from 'lucide-react'
import { siteConfig } from '../data/siteData'
import './Team.css'

function useInView(ref, threshold = 0.1) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

function MemberCard({ member, delay }) {
  const [imgErr, setImgErr] = useState(false)
  return (
    <div
      className={`team__card card${member.pending ? ' team__card--pending' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="team__card-photo-wrap">
        {!imgErr ? (
          <img
            src={member.photo}
            alt={member.name}
            className="team__card-photo"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="team__card-photo-fallback">
            <User size={32} />
          </div>
        )}
      </div>
      <div className="team__card-body">
        <div className="team__card-role">{member.role}</div>
        <h3 className="team__card-name">{member.name}</h3>
        <p className="team__card-desc">{member.description}</p>
      </div>
    </div>
  )
}

export default function Team() {
  const { team } = siteConfig
  const ref = useRef(null)
  const inView = useInView(ref)

  return (
    <section className="section team" id="team" ref={ref}>
      <div className="container">
        <div className={`team__header fade-up${inView ? ' visible' : ''}`}>
          <span className="section-label">
            <span>02</span>— НАША ГРУППА
          </span>
          <h2 className="section-heading">{team.heading}</h2>
          <p className="section-sub">{team.subheading || "Четыре единомышленника, одна общая цель."}</p>
        </div>

        <div className={`team__grid${inView ? ' team__grid--visible' : ''}`}>
          {team.members.map((member, i) => (
            <MemberCard key={i} member={member} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
