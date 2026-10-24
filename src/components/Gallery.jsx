import { useState, useEffect, useRef } from 'react'
import {
  Image,
  FileText,
  LayoutGrid,
  FolderOpen,
  Landmark,
  Compass,
  Heart,
  Shield,
  Film,
} from 'lucide-react'
import { siteConfig } from '../data/siteData'
import Lightbox from './Lightbox'
import './Gallery.css'

function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.08 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

const FILTERS = [
  { key: 'all', label: 'Все материалы', icon: LayoutGrid },
  { key: 'cities', label: 'Древние города', icon: Landmark },
  { key: 'nature', label: 'Природа Узбекистана', icon: Compass },
  { key: 'family', label: 'Семья и традиции', icon: Heart },
  { key: 'heroes', label: 'Герои и спорт', icon: Shield },
  { key: 'culture', label: 'Культура и кино', icon: Film },
  { key: 'files', label: 'Документы (PDF)', icon: FileText },
]

export default function Gallery() {
  const { gallery } = siteConfig
  const ref = useRef(null)
  const inView = useInView(ref)
  const [filter, setFilter] = useState('all')
  const [lightboxIdx, setLightboxIdx] = useState(null)

  const items = gallery.items || []
  const filtered = filter === 'all' ? items : items.filter(it => it.category === filter)
  const imageItems = filtered.filter(it => it.type === 'image')

  const openLightbox = (item) => {
    const idx = imageItems.findIndex(i => i.id === item.id)
    if (idx !== -1) setLightboxIdx(idx)
  }
  const closeLightbox = () => setLightboxIdx(null)
  const prevLb = () => setLightboxIdx(i => (i - 1 + imageItems.length) % imageItems.length)
  const nextLb = () => setLightboxIdx(i => (i + 1) % imageItems.length)

  return (
    <section className="section gallery" id="gallery" ref={ref}>
      <div className="container">
        <div className={`gallery__header fade-up${inView ? ' visible' : ''}`}>
          <span className="section-label">
            <span>04</span>— МАТЕРИАЛЫ
          </span>
          <h2 className="section-heading">{gallery.heading}</h2>
          <p className="section-sub">
            {gallery.subtitle || 'Фотографии древних городов, природы, культурного наследия и командной работы.'}
          </p>
        </div>

        {/* Filters */}
        <div className={`gallery__filters fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.08s' }}>
          {FILTERS.map(f => {
            const Icon = f.icon
            const count = f.key === 'all' ? items.length : items.filter(i => i.category === f.key).length
            return (
              <button
                key={f.key}
                className={`gallery__filter-btn${filter === f.key ? ' gallery__filter-btn--active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                <Icon size={14} />
                {f.label}
                {count > 0 && <span className="gallery__filter-count">{count}</span>}
              </button>
            )
          })}
        </div>

        {/* Grid or empty state */}
        {filtered.length === 0 ? (
          <div className={`gallery__empty fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.16s' }}>
            <FolderOpen size={48} />
            <p>В этой категории пока нет материалов.</p>
            <span>Выберите фильтр «Все материалы» для просмотра галереи.</span>
          </div>
        ) : (
          <div className={`gallery__grid fade-up${inView ? ' visible' : ''}`} style={{ transitionDelay: '0.16s' }}>
            {filtered.map(item => (
              <GalleryItem key={item.id} item={item} onOpen={() => item.type === 'image' && openLightbox(item)} />
            ))}
          </div>
        )}
      </div>

      {lightboxIdx !== null && (
        <Lightbox
          images={imageItems}
          index={lightboxIdx}
          onClose={closeLightbox}
          onPrev={prevLb}
          onNext={nextLb}
        />
      )}
    </section>
  )
}

function GalleryItem({ item, onOpen }) {
  const [imgErr, setImgErr] = useState(false)

  if (item.type === 'file') {
    return (
      <a
        href={item.src}
        target="_blank"
        rel="noopener noreferrer"
        className="gallery__item gallery__item--file"
        download
      >
        <FileText size={36} />
        <div>
          <span className="gallery__item-file-title">{item.title}</span>
          {item.desc && <p className="gallery__item-file-desc">{item.desc}</p>}
        </div>
      </a>
    )
  }

  return (
    <div
      className="gallery__item"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen()}
      aria-label={`${item.title} — увеличить изображение`}
    >
      {!imgErr ? (
        <img
          src={item.thumb || item.src}
          alt={item.title}
          className="gallery__item-img"
          onError={() => setImgErr(true)}
          loading="lazy"
        />
      ) : (
        <div className="gallery__item-fallback">
          <Image size={28} />
          <span>{item.title}</span>
        </div>
      )}
      <div className="gallery__item-info">
        <span className="gallery__item-label">{item.title}</span>
        {item.desc && <span className="gallery__item-sub">{item.desc}</span>}
      </div>
    </div>
  )
}
