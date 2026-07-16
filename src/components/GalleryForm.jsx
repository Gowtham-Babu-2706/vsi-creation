import React, { useState, useEffect } from 'react';
import { Image, Film, Calendar, MapPin, Tag, Plus, Trash2 } from 'lucide-react';

const CATEGORY_OPTIONS = [
  { value: 'weddings', label: '💍 Weddings' },
  { value: 'corporate-events', label: '🏢 Corporate Events' },
  { value: 'music-shows', label: '🎵 Music Shows' },
  { value: 'dj-nights', label: '🎧 DJ Nights' },
  { value: 'birthday-celebrations', label: '🎂 Birthday Celebrations' },
  { value: 'college-events', label: '🎓 College Events' },
  { value: 'cultural-events', label: '🎭 Cultural Events' }
];

export default function GalleryForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    date: '',
    category: 'weddings',
    categoryLabel: 'Weddings',
    location: '',
    description: '',
    fullDescription: '',
    banner: '',
    videoUrl: '',
    videoType: 'mp4',
    highlightsStr: ''
  });

  const [photos, setPhotos] = useState([]);
  const [btsPhotos, setBtsPhotos] = useState([]);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newBtsPhotoUrl, setNewBtsPhotoUrl] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        name: initialData.name || '',
        date: initialData.date || '',
        category: initialData.category || 'weddings',
        categoryLabel: initialData.categoryLabel || 'Weddings',
        location: initialData.location || '',
        description: initialData.description || '',
        fullDescription: initialData.fullDescription || '',
        banner: initialData.banner || '',
        videoUrl: initialData.videoUrl || '',
        videoType: initialData.videoType || 'mp4',
        highlightsStr: initialData.highlights ? initialData.highlights.join('\n') : ''
      });
      setPhotos(initialData.photos || []);
      setBtsPhotos(initialData.btsPhotos || []);
    } else {
      setFormData({
        id: '',
        name: '',
        date: '',
        category: 'weddings',
        categoryLabel: 'Weddings',
        location: '',
        description: '',
        fullDescription: '',
        banner: '',
        videoUrl: '',
        videoType: 'mp4',
        highlightsStr: ''
      });
      setPhotos([]);
      setBtsPhotos([]);
      setNewPhotoUrl('');
      setNewBtsPhotoUrl('');
    }
  }, [initialData]);

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit. Please upload a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, banner: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotosUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.size > 2 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 2MB limit and was skipped.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleBtsPhotosUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.size > 2 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 2MB limit and was skipped.`);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setBtsPhotos(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const addPhotoUrl = () => {
    if (newPhotoUrl.trim()) {
      setPhotos(prev => [...prev, newPhotoUrl.trim()]);
      setNewPhotoUrl('');
    }
  };

  const addBtsPhotoUrl = () => {
    if (newBtsPhotoUrl.trim()) {
      setBtsPhotos(prev => [...prev, newBtsPhotoUrl.trim()]);
      setNewBtsPhotoUrl('');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      // Auto-set category label if category changes
      if (name === 'category') {
        const option = CATEGORY_OPTIONS.find(opt => opt.value === value);
        if (option) {
          // Remove emoji from label if needed, or keep it
          updated.categoryLabel = option.label.replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF]/g, '').trim();
        }
      }
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.date.trim() || !formData.location.trim()) {
      alert('Please fill out Name, Date, and Location.');
      return;
    }

    // Process lists split by newlines
    const highlights = formData.highlightsStr
      .split('\n')
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const payload = {
      id: formData.id,
      name: formData.name,
      date: formData.date,
      category: formData.category,
      categoryLabel: formData.categoryLabel,
      location: formData.location,
      description: formData.description,
      fullDescription: formData.fullDescription,
      banner: formData.banner,
      videoUrl: formData.videoUrl,
      videoType: formData.videoType,
      highlights,
      photos,
      btsPhotos
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-sm text-text-main">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Event Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Royal Crimson Wedding Staging"
            required
            className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
          />
        </div>

        {/* Date */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Event Date *</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-text-muted" />
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="e.g. 2026-06-25"
              required
              className="w-full bg-bg-card/40 border border-border-color pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all appearance-none cursor-pointer"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-bg-surface text-white">
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category Label */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Category Display Label</label>
          <input
            type="text"
            name="categoryLabel"
            value={formData.categoryLabel}
            onChange={handleChange}
            placeholder="e.g. Weddings"
            className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
          />
        </div>

        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Location / Venue *</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-text-muted" />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Umaid Bhawan Palace, Jodhpur"
              required
              className="w-full bg-bg-card/40 border border-border-color pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
            />
          </div>
        </div>

        {/* Slug ID */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Slug ID (Optional)</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="e.g. royal-crimson (auto-generated if empty)"
            disabled={!!initialData}
            className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>

        {/* Banner Image URL & Upload */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Showcase Banner Image (URL or Upload File) *</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Image className="absolute left-4 top-3.5 w-4 h-4 text-text-muted" />
              <input
                type="text"
                name="banner"
                value={formData.banner && formData.banner.startsWith('data:') ? '' : formData.banner}
                onChange={handleChange}
                placeholder="Paste external image URL here..."
                required={!formData.banner}
                className="w-full bg-bg-card/40 border border-border-color pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex-grow flex items-center justify-center gap-2 bg-bg-card/60 hover:bg-bg-card border border-border-color p-3.5 rounded-xl text-white text-xs font-bold uppercase cursor-pointer select-none transition-all hover:border-accent-gold">
                <span>Upload Local File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerChange}
                  className="hidden"
                />
              </label>
              {formData.banner && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, banner: '' }))}
                  className="px-4 py-3.5 bg-red-950/40 border border-red-500/20 hover:border-red-500 text-red-500 hover:text-white rounded-xl text-xs font-bold uppercase transition-all cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
          {formData.banner && (
            <div className="mt-2 p-2 bg-bg-card/20 border border-border-color/40 rounded-xl max-w-xs relative overflow-hidden">
              <img
                src={formData.banner}
                alt="Banner Preview"
                className="w-full h-24 object-cover rounded-lg border border-border-color/60"
              />
              <span className="absolute top-3 left-3 bg-bg-main/80 text-[8px] text-accent-gold font-bold px-2 py-0.5 rounded border border-border-color uppercase tracking-wider">
                Preview
              </span>
            </div>
          )}
        </div>

        {/* Video URL */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Showcase Video URL</label>
          <div className="relative">
            <Film className="absolute left-4 top-3.5 w-4 h-4 text-text-muted" />
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="https://www.w3schools.com/html/mov_bbb.mp4"
              className="w-full bg-bg-card/40 border border-border-color pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
            />
          </div>
        </div>

        {/* Video Type */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Video Type</label>
          <select
            name="videoType"
            value={formData.videoType}
            onChange={handleChange}
            className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all appearance-none cursor-pointer"
          >
            <option value="mp4" className="bg-bg-surface text-white">Direct MP4 URL</option>
            <option value="youtube" className="bg-bg-surface text-white">YouTube Embed Link</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Short Catalog Description</label>
        <textarea
          name="description"
          rows="2"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief summary card description..."
          className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
        />
      </div>

      {/* Full Description */}
      <div className="space-y-1.5">
        <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Full Showcase Description</label>
        <textarea
          name="fullDescription"
          rows="4"
          value={formData.fullDescription}
          onChange={handleChange}
          placeholder="Complete details of production blueprints, logistics staging, and creative direction..."
          className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
        />
      </div>

      {/* Highlights List */}
      <div className="space-y-1.5">
        <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Production Highlights (one item per line)</label>
        <textarea
          name="highlightsStr"
          rows="3"
          value={formData.highlightsStr}
          onChange={handleChange}
          placeholder="e.g. Rigged suspended floral design weighing 1.2 metric tons.&#10;3D facade projection mapping detailing heritage story."
          className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all font-mono text-xs"
        />
      </div>

      {/* Showcase Photos Section */}
      <div className="space-y-3 bg-bg-card/20 p-5 rounded-2xl border border-border-color/60">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Showcase Photos ({photos.length})</h3>
            <p className="text-[10px] text-text-muted">Upload high-res event photography for the slider/grid.</p>
          </div>
          <label className="bg-bg-card hover:bg-bg-card border border-border-color px-4 py-2 rounded-xl text-white text-xs font-bold uppercase cursor-pointer select-none transition-all hover:border-accent-gold flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Upload Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotosUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Add via URL input group */}
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Or enter external photo URL..."
            value={newPhotoUrl}
            onChange={(e) => setNewPhotoUrl(e.target.value)}
            className="flex-grow bg-bg-card/40 border border-border-color px-3.5 py-2 rounded-xl text-xs text-white outline-none focus:border-accent-gold transition-all"
          />
          <button
            type="button"
            onClick={addPhotoUrl}
            className="px-4 bg-bg-card border border-border-color hover:border-accent-gold text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Add URL
          </button>
        </div>

        {/* Previews Grid */}
        {photos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative group rounded-xl overflow-hidden border border-border-color aspect-video bg-bg-card/40 flex items-center justify-center">
                <img src={photo} alt={`Showcase ${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setPhotos(prev => prev.filter((_, i) => i !== index));
                  }}
                  className="absolute inset-0 bg-red-950/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer duration-200"
                  title="Remove Image"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[10px] text-text-muted italic pt-2">No showcase photos added yet.</p>
        )}
      </div>

      {/* BTS Photos Section */}
      <div className="space-y-3 bg-bg-card/20 p-5 rounded-2xl border border-border-color/60">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Behind-The-Scenes (BTS) Photos ({btsPhotos.length})</h3>
            <p className="text-[10px] text-text-muted">Add production phase, setup, or technical crew crew photos.</p>
          </div>
          <label className="bg-bg-card hover:bg-bg-card border border-border-color px-4 py-2 rounded-xl text-white text-xs font-bold uppercase cursor-pointer select-none transition-all hover:border-accent-gold flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> Upload BTS Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleBtsPhotosUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Add via URL input group */}
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Or enter external BTS photo URL..."
            value={newBtsPhotoUrl}
            onChange={(e) => setNewBtsPhotoUrl(e.target.value)}
            className="flex-grow bg-bg-card/40 border border-border-color px-3.5 py-2 rounded-xl text-xs text-white outline-none focus:border-accent-gold transition-all"
          />
          <button
            type="button"
            onClick={addBtsPhotoUrl}
            className="px-4 bg-bg-card border border-border-color hover:border-accent-gold text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            Add URL
          </button>
        </div>

        {/* Previews Grid */}
        {btsPhotos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
            {btsPhotos.map((photo, index) => (
              <div key={index} className="relative group rounded-xl overflow-hidden border border-border-color aspect-video bg-bg-card/40 flex items-center justify-center">
                <img src={photo} alt={`BTS Showcase ${index}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setBtsPhotos(prev => prev.filter((_, i) => i !== index));
                  }}
                  className="absolute inset-0 bg-red-950/80 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity cursor-pointer duration-200"
                  title="Remove Image"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[10px] text-text-muted italic pt-2">No BTS photos added yet.</p>
        )}
      </div>

      {/* Action Triggers */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border-color/60">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-bg-card border border-border-color hover:border-accent-primary text-text-muted hover:text-white font-bold rounded-xl transition-all cursor-pointer text-xs uppercase tracking-wider"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-bold rounded-xl border border-white/10 hover:shadow-lg hover:shadow-accent-primary/30 transition-all cursor-pointer text-xs uppercase tracking-wider"
        >
          {initialData ? 'Update Showcase' : 'Publish Showcase'}
        </button>
      </div>
    </form>
  );
}
