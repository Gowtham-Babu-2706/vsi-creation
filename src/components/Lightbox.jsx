import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

/**
 * Lightbox — full-screen image viewer with prev/next navigation.
 * Props:
 *   images   : string[]   — array of image URLs
 *   index    : number     — currently open image index (null = closed)
 *   onClose  : () => void
 *   onChange : (i) => void — called when user navigates
 */
export default function Lightbox({ images = [], index, onClose, onChange }) {
  const isOpen = index !== null && index !== undefined;
  const total = images.length;

  const prev = useCallback(() => onChange((index - 1 + total) % total), [index, total, onChange]);
  const next = useCallback(() => onChange((index + 1) % total), [index, total, onChange]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, prev, next, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[20000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2.5 bg-bg-card/80 border border-border-color hover:bg-accent-primary hover:border-accent-primary text-white rounded-full transition-all cursor-pointer shadow-lg"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-xs text-accent-gold font-bold uppercase tracking-widest bg-bg-card/80 border border-border-color px-4 py-2 rounded-full backdrop-blur-md">
        {index + 1} / {total}
      </div>

      {/* Prev */}
      {total > 1 && (
        <button
          onClick={prev}
          className="absolute left-4 md:left-8 z-50 p-3 bg-bg-card/70 border border-border-color hover:bg-accent-primary hover:border-accent-primary text-white rounded-full transition-all cursor-pointer shadow-lg hover:scale-105"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Image */}
      <div className="max-w-5xl max-h-[85vh] w-full flex items-center justify-center relative select-none">
        <img
          key={index}
          src={images[index]}
          alt={`Gallery image ${index + 1}`}
          className="max-h-[85vh] max-w-full object-contain rounded-2xl shadow-2xl border border-border-color/30"
          style={{ animation: 'fadeIn 0.25s ease-out' }}
        />
      </div>

      {/* Next */}
      {total > 1 && (
        <button
          onClick={next}
          className="absolute right-4 md:right-8 z-50 p-3 bg-bg-card/70 border border-border-color hover:bg-accent-primary hover:border-accent-primary text-white rounded-full transition-all cursor-pointer shadow-lg hover:scale-105"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Thumbnails strip */}
      {total > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-xs md:max-w-2xl px-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => onChange(i)}
              className={`shrink-0 w-12 h-9 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                i === index ? 'border-accent-gold scale-110 shadow-lg shadow-accent-gold/20' : 'border-border-color opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }`}</style>
    </div>
  );
}
