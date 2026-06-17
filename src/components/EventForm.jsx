import React, { useState, useEffect } from 'react';
import { Plus, Trash, Image, Video, Calendar, MapPin, Tag, FileText, Check } from 'lucide-react';

const PRESET_BANNERS = [
  { name: 'Stage Spotlight', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1000' },
  { name: 'Gala Ballroom', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1000' },
  { name: 'Bespoke Chateau', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000' },
  { name: 'Laser Beam Staging', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000' }
];

export default function EventForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'concert',
    date: '',
    location: '',
    description: '',
    fullDescription: '',
    banner: '',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    venueDetails: '',
    participationInfo: '',
    schedule: []
  });

  const [newScheduleItem, setNewScheduleItem] = useState({ time: '', title: '' });
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        schedule: initialData.schedule || []
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectPresetBanner = (url) => {
    setFormData(prev => ({ ...prev, banner: url }));
  };

  // Add schedule item to form state list
  const addScheduleItem = () => {
    if (!newScheduleItem.time || !newScheduleItem.title) {
      alert('Please enter both time and schedule title');
      return;
    }
    setFormData(prev => ({
      ...prev,
      schedule: [...prev.schedule, { ...newScheduleItem }]
    }));
    setNewScheduleItem({ time: '', title: '' });
  };

  // Remove schedule item from form state list
  const removeScheduleItem = (idx) => {
    setFormData(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== idx)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return setValidationError('Title is required');
    if (!formData.date) return setValidationError('Date is required');
    if (!formData.location.trim()) return setValidationError('Location is required');
    if (!formData.description.trim()) return setValidationError('Short description is required');
    if (!formData.fullDescription.trim()) return setValidationError('Full description is required');
    if (!formData.banner.trim()) return setValidationError('Banner image URL is required');

    setValidationError('');
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      {validationError && (
        <div className="bg-red-950 border border-red-800 text-red-400 p-4 rounded-xl text-xs font-semibold">
          Error: {validationError}
        </div>
      )}

      {/* Row 1: Title & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Event Title *</label>
          <input 
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g. Neon Horizon Concert"
            required
            className="w-full bg-bg-card border border-border-color text-sm text-white px-4 py-3 rounded-xl focus:border-accent-gold outline-none transition-all placeholder-gray-600"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Event Category *</label>
          <select 
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full bg-bg-card border border-border-color text-sm text-white px-4 py-3 rounded-xl focus:border-accent-gold outline-none transition-all cursor-pointer"
          >
            <option value="concert">Concert / Stage Show</option>
            <option value="gala">Corporate Gala / Red Carpet</option>
            <option value="private">Bespoke Private Milestone</option>
            <option value="showcase">Product Launch / Showcase</option>
          </select>
        </div>
      </div>

      {/* Row 2: Date & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Execution Date *</label>
          <div className="relative">
            <input 
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              className="w-full bg-bg-card border border-border-color text-sm text-white px-4 py-3 rounded-xl focus:border-accent-gold outline-none transition-all cursor-pointer"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Venue Location *</label>
          <input 
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g. Grand Exhibition Hall, NY"
            required
            className="w-full bg-bg-card border border-border-color text-sm text-white px-4 py-3 rounded-xl focus:border-accent-gold outline-none transition-all placeholder-gray-600"
          />
        </div>
      </div>

      {/* Banner Selection and Media URL */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Banner Image URL *</label>
          <input 
            type="url"
            name="banner"
            value={formData.banner}
            onChange={handleInputChange}
            placeholder="https://images.unsplash.com/..."
            required
            className="w-full bg-bg-card border border-border-color text-sm text-white px-4 py-3 rounded-xl focus:border-accent-gold outline-none transition-all placeholder-gray-600"
          />
        </div>

        {/* Preset Selectors */}
        <div>
          <span className="text-[10px] text-text-muted font-semibold block mb-2">Or select from premium presets:</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PRESET_BANNERS.map((banner, idx) => (
              <div 
                key={idx}
                onClick={() => selectPresetBanner(banner.url)}
                className={`cursor-pointer border rounded-xl overflow-hidden h-16 relative transition-all ${
                  formData.banner === banner.url ? 'border-accent-gold scale-[0.98]' : 'border-border-color hover:border-accent-primary/60'
                }`}
              >
                <img src={banner.url} alt={banner.name} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-1.5">
                  <span className="text-[9px] font-bold text-white text-center leading-tight">{banner.name}</span>
                </div>
                {formData.banner === banner.url && (
                  <div className="absolute top-1.5 right-1.5 bg-accent-gold text-bg-main rounded-full p-0.5">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Video URL */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Video Asset URL (mp4 / streaming link)</label>
          <input 
            type="url"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleInputChange}
            placeholder="https://www.w3schools.com/html/mov_bbb.mp4"
            className="w-full bg-bg-card border border-border-color text-sm text-white px-4 py-3 rounded-xl focus:border-accent-gold outline-none transition-all placeholder-gray-600"
          />
        </div>
      </div>

      {/* Descriptions */}
      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Short Catalog Tagline *</label>
          <input 
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Brief event pitch displayed on listing cards..."
            required
            maxLength={100}
            className="w-full bg-bg-card border border-border-color text-sm text-white px-4 py-3 rounded-xl focus:border-accent-gold outline-none transition-all placeholder-gray-600"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Detailed Event Overview *</label>
          <textarea 
            name="fullDescription"
            rows="4"
            value={formData.fullDescription}
            onChange={handleInputChange}
            placeholder="Full copywriting details regarding staging, specs, scheduling reasons..."
            required
            className="w-full bg-bg-card border border-border-color text-sm text-white px-4 py-3.5 rounded-xl focus:border-accent-gold outline-none transition-all placeholder-gray-600"
          ></textarea>
        </div>
      </div>

      {/* Venue and Participation Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Detailed Venue Guidelines</label>
          <textarea 
            name="venueDetails"
            rows="3"
            value={formData.venueDetails}
            onChange={handleInputChange}
            placeholder="e.g. Gate entries, parking guidelines, directions..."
            className="w-full bg-bg-card border border-border-color text-sm text-white px-4 py-3.5 rounded-xl focus:border-accent-gold outline-none transition-all placeholder-gray-600"
          ></textarea>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Participation / Dress Code Rules</label>
          <textarea 
            name="participationInfo"
            rows="3"
            value={formData.participationInfo}
            onChange={handleInputChange}
            placeholder="e.g. Black tie required, ages 18+, invite token IDs..."
            className="w-full bg-bg-card border border-border-color text-sm text-white px-4 py-3.5 rounded-xl focus:border-accent-gold outline-none transition-all placeholder-gray-600"
          ></textarea>
        </div>
      </div>

      {/* Dynamic Schedule List Builder */}
      <div className="border border-border-color/60 p-6 rounded-2xl bg-bg-card/30 space-y-4">
        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Configure Event Timeline</h4>
        <p className="text-[11px] text-text-muted">Build the schedule outline displayed on the detailed page.</p>

        {/* Input Add Grid */}
        <div className="grid grid-cols-3 gap-3">
          <input 
            type="text"
            value={newScheduleItem.time}
            onChange={(e) => setNewScheduleItem(prev => ({ ...prev, time: e.target.value }))}
            placeholder="Time (e.g. 19:30)"
            className="bg-bg-card border border-border-color text-xs text-white px-3 py-2 rounded-lg focus:border-accent-gold outline-none"
          />
          <input 
            type="text"
            value={newScheduleItem.title}
            onChange={(e) => setNewScheduleItem(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Activity (e.g. Opening VJ)"
            className="col-span-2 bg-bg-card border border-border-color text-xs text-white px-3 py-2 rounded-lg focus:border-accent-gold outline-none"
          />
        </div>
        <button
          type="button"
          onClick={addScheduleItem}
          className="w-full py-2 bg-bg-card border border-border-color hover:border-accent-gold hover:text-accent-gold text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Timeline Milestone
        </button>

        {/* Display Current Timeline List */}
        {formData.schedule.length > 0 && (
          <div className="space-y-2 mt-4 max-h-44 overflow-y-auto">
            {formData.schedule.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center bg-bg-main border border-border-color px-3 py-2 rounded-lg text-xs">
                <span className="text-accent-gold font-bold">{item.time}</span>
                <span className="text-white flex-grow ml-4 truncate text-left">{item.title}</span>
                <button
                  type="button"
                  onClick={() => removeScheduleItem(idx)}
                  className="text-red-500 hover:text-red-400 p-1 cursor-pointer"
                >
                  <Trash className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t border-border-color/60">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-border-color text-white hover:bg-bg-card font-bold rounded-xl text-xs uppercase tracking-wider cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-gradient-to-r from-accent-primary to-[#700016] text-white font-bold rounded-xl border border-accent-gold/20 hover:border-accent-gold shadow-lg shadow-accent-primary/25 cursor-pointer text-xs uppercase tracking-wider"
        >
          Save Event Details
        </button>
      </div>
    </form>
  );
}
