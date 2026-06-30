import React, { useState } from 'react';
import { Play, ExternalLink } from 'lucide-react';

/**
 * VideoPlayer — detects source type and renders the correct player.
 * videoType: 'mp4' | 'youtube' | 'instagram'
 */
export default function VideoPlayer({ videoUrl, videoType = 'mp4', thumbnail, title = 'Video' }) {
  const [active, setActive] = useState(false);

  if (!videoUrl) return null;

  const thumb = thumbnail || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800';

  /* ── MP4 ─────────────────────────────────────── */
  if (videoType === 'mp4') {
    return (
      <div className="w-full aspect-video rounded-3xl overflow-hidden border border-border-color/60 bg-black relative group shadow-2xl">
        {!active ? (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer select-none"
            onClick={() => setActive(true)}
          >
            <img
              src={thumb}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
            <div className="relative z-10 bg-gradient-to-r from-accent-primary to-accent-rose hover:from-accent-rose hover:to-accent-secondary p-5.5 rounded-full shadow-2xl shadow-accent-primary/45 group-hover:scale-110 active:scale-95 transition-all">
              <Play className="w-8 h-8 fill-white text-white ml-0.5" />
            </div>
            <span className="relative z-10 mt-5 text-[10px] text-accent-gold uppercase tracking-[4px] font-extrabold drop-shadow">
              Play Production Reel
            </span>
          </div>
        ) : (
          <video src={videoUrl} controls autoPlay className="w-full h-full object-cover" />
        )}
      </div>
    );
  }

  /* ── YouTube ─────────────────────────────────── */
  if (videoType === 'youtube') {
    // Accept both full URLs and embed URLs
    let embedSrc = videoUrl;
    if (videoUrl.includes('watch?v=')) {
      const id = videoUrl.split('watch?v=')[1].split('&')[0];
      embedSrc = `https://www.youtube.com/embed/${id}`;
    }
    return (
      <div className="w-full aspect-video rounded-3xl overflow-hidden border border-border-color/60 bg-black shadow-2xl">
        <iframe
          src={`${embedSrc}?rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          loading="lazy"
        />
      </div>
    );
  }

  /* ── Instagram ───────────────────────────────── */
  if (videoType === 'instagram') {
    // Convert post URL → embed URL
    const embedSrc = videoUrl.replace(/\/$/, '') + '/embed';
    return (
      <div className="w-full rounded-3xl overflow-hidden border border-border-color/60 bg-black shadow-2xl flex flex-col items-center">
        <iframe
          src={embedSrc}
          className="w-full min-h-[540px]"
          frameBorder="0"
          scrolling="no"
          allowTransparency
          allowFullScreen
          title={title}
          loading="lazy"
        />
        <a
          href={videoUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 mb-5 inline-flex items-center gap-2 text-xs text-accent-gold font-bold uppercase tracking-widest hover:text-white transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" /> View on Instagram
        </a>
      </div>
    );
  }

  return null;
}
