import { useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import './Lightbox.css'

export default function Lightbox({ images, index, onClose, onPrev, onNext }) {
  const item = images[index]

  // Keyboard support
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (!item) return null

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Просмотр изображения">
      {/* Backdrop */}
      <div className="lightbox__backdrop" onClick={onClose} />

      {/* Image */}
      <div className="lightbox__content">
        <img src={item.src} alt={item.title} className="lightbox__img" />
        {item.title && <p className="lightbox__caption">{item.title}</p>}
      </div>

      {/* Counter */}
      <div className="lightbox__counter">{index + 1} / {images.length}</div>

      {/* Close */}
      <button className="lightbox__btn lightbox__btn--close" onClick={onClose} aria-label="Закрыть">
        <X size={20} />
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button className="lightbox__btn lightbox__btn--prev" onClick={onPrev} aria-label="Предыдущее изображение">
          <ChevronLeft size={24} />
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button className="lightbox__btn lightbox__btn--next" onClick={onNext} aria-label="Следующее изображение">
          <ChevronRight size={24} />
        </button>
      )}
    </div>
  )
}
