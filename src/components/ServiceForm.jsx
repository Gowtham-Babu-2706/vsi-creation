import React, { useState, useEffect } from 'react';
import { Image, ShieldAlert, Sparkles } from 'lucide-react';

const COMMON_ICONS = [
  { value: 'Briefcase', label: 'Briefcase (Event Management)' },
  { value: 'GraduationCap', label: 'Graduation Cap (College/Educational)' },
  { value: 'Music', label: 'Music (Cultural/Art Programs)' },
  { value: 'Heart', label: 'Heart (Wedding Planning)' },
  { value: 'Cake', label: 'Cake (Birthdays/Private)' },
  { value: 'Truck', label: 'Truck (Logistics/Operations)' },
  { value: 'Video', label: 'Video (Media/Film Production)' },
  { value: 'Palette', label: 'Palette (Creative/Design Services)' },
  { value: 'Megaphone', label: 'Megaphone (Digital Marketing)' },
  { value: 'Layers', label: 'Layers (Event Stage Production)' },
  { value: 'Users', label: 'Users (Talent/Entertainment)' },
  { value: 'Wrench', label: 'Wrench (Equipment Rentals)' },
  { value: 'Sparkles', label: 'Sparkles (Special/Custom)' },
  { value: 'HelpCircle', label: 'Help Circle (Default)' }
];

export default function ServiceForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    num: '',
    title: '',
    tagline: '',
    description: '',
    icon: 'Briefcase',
    banner: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id || '',
        num: initialData.num || '',
        title: initialData.title || '',
        tagline: initialData.tagline || '',
        description: initialData.description || '',
        icon: initialData.icon || 'Briefcase',
        banner: initialData.banner || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB limit. Please upload a smaller image.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          banner: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please fill out the Service Title.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-sm text-text-main">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Service Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Laser Projection Show Staging"
            required
            className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
          />
        </div>

        {/* Index Number */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Service Index Number (e.g. 13)</label>
          <input
            type="text"
            name="num"
            value={formData.num}
            onChange={handleChange}
            placeholder="e.g. 13"
            className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
          />
        </div>

        {/* Slug ID */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">URL Slug ID (Optional)</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="e.g. laser-projection (auto-generated if empty)"
            disabled={!!initialData}
            className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {!initialData && (
            <p className="text-[10px] text-text-muted">Leaving this blank will auto-generate a URL slug from the title.</p>
          )}
        </div>

        {/* Icon Picker */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Lucide Icon Identifier</label>
          <select
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all appearance-none cursor-pointer"
          >
            {COMMON_ICONS.map((icon) => (
              <option key={icon.value} value={icon.value} className="bg-bg-surface text-white">
                {icon.label}
              </option>
            ))}
          </select>
        </div>

        {/* Tagline */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Tagline *</label>
          <input
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleChange}
            placeholder="e.g. Immersive 3D laser mapping installations for arenas and stadiums."
            required
            className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
          />
        </div>

        {/* Banner Image URL & Upload */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Banner Image (URL or Upload File)</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Image className="absolute left-4 top-3.5 w-4 h-4 text-text-muted" />
              <input
                type="text"
                name="banner"
                value={formData.banner && formData.banner.startsWith('data:') ? '' : formData.banner}
                onChange={handleChange}
                placeholder="Paste external image URL here..."
                className="w-full bg-bg-card/40 border border-border-color pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
              />
            </div>
            <div className="flex items-center gap-3">
              <label className="flex-grow flex items-center justify-center gap-2 bg-bg-card/60 hover:bg-bg-card border border-border-color p-3.5 rounded-xl text-white text-xs font-bold uppercase cursor-pointer select-none transition-all hover:border-accent-gold">
                <span>Upload Local File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
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
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Service Description</label>
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed service overview, team coordinates, and technical configurations..."
          className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
        />
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
          {initialData ? 'Update Service' : 'Publish Service'}
        </button>
      </div>
    </form>
  );
}
