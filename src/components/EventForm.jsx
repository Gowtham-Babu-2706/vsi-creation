import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, MapPin, Tag, Image, Film, FileText, Info, DollarSign, Clock } from 'lucide-react';

export default function EventForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    date: '',
    location: '',
    price: 0,
    banner: '',
    description: '',
    fullDescription: '',
    videoUrl: '',
    videoThumbnail: '',
    venueDetails: '',
    participationInfo: '',
    schedule: []
  });

  const [scheduleItem, setScheduleItem] = useState({ time: '', title: '' });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        title: initialData.title || '',
        category: initialData.category || '',
        date: initialData.date || '',
        location: initialData.location || '',
        price: initialData.price || 0,
        banner: initialData.banner || '',
        description: initialData.description || '',
        fullDescription: initialData.fullDescription || '',
        videoUrl: initialData.videoUrl || '',
        videoThumbnail: initialData.videoThumbnail || '',
        venueDetails: initialData.venueDetails || '',
        participationInfo: initialData.participationInfo || '',
        schedule: initialData.schedule || []
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value
    }));
  };

  const handleAddScheduleItem = () => {
    if (!scheduleItem.time.trim() || !scheduleItem.title.trim()) return;
    setFormData((prev) => ({
      ...prev,
      schedule: [...prev.schedule, { ...scheduleItem }]
    }));
    setScheduleItem({ time: '', title: '' });
  };

  const handleRemoveScheduleItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.date.trim() || !formData.location.trim()) {
      alert('Please fill out the required fields: Title, Date, and Location.');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-sm text-text-main">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Event Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Neon Light Music Concert"
            required
            className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
          />
        </div>

        {/* Category */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Category *</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Music Festival, Tech Summit"
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
              placeholder="e.g. November 28, 2026"
              required
              className="w-full bg-bg-card/40 border border-border-color pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
            />
          </div>
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
              placeholder="e.g. BKC Ground, Mumbai"
              required
              className="w-full bg-bg-card/40 border border-border-color pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
            />
          </div>
        </div>

        {/* Price */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Ticket Price (₹) *</label>
          <div className="relative">
            <DollarSign className="absolute left-4 top-3.5 w-4 h-4 text-text-muted" />
            <input
              type="number"
              name="price"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="0 for Free Event"
              required
              className="w-full bg-bg-card/40 border border-border-color pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
            />
          </div>
        </div>

        {/* Banner Image URL */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Banner Image URL</label>
          <div className="relative">
            <Image className="absolute left-4 top-3.5 w-4 h-4 text-text-muted" />
            <input
              type="url"
              name="banner"
              value={formData.banner}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-bg-card/40 border border-border-color pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
            />
          </div>
        </div>

        {/* Video URL */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Production Reel (Video URL)</label>
          <div className="relative">
            <Film className="absolute left-4 top-3.5 w-4 h-4 text-text-muted" />
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              placeholder="https://assets.mixkit.co/..."
              className="w-full bg-bg-card/40 border border-border-color pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
            />
          </div>
        </div>

        {/* Video Thumbnail URL */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Video Thumbnail Image URL</label>
          <div className="relative">
            <Image className="absolute left-4 top-3.5 w-4 h-4 text-text-muted" />
            <input
              type="url"
              name="videoThumbnail"
              value={formData.videoThumbnail}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-bg-card/40 border border-border-color pl-12 pr-4 py-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
            />
          </div>
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
          placeholder="Brief description for the catalog card..."
          className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
        />
      </div>

      {/* Full Description */}
      <div className="space-y-1.5">
        <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Full Overview Description</label>
        <textarea
          name="fullDescription"
          rows="4"
          value={formData.fullDescription}
          onChange={handleChange}
          placeholder="Comprehensive event details displayed on the detail page..."
          className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Venue Details */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Specific Venue Details</label>
          <textarea
            name="venueDetails"
            rows="2"
            value={formData.venueDetails}
            onChange={handleChange}
            placeholder="Seating details, parking availability, entry guidelines..."
            className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
          />
        </div>

        {/* Participation Info */}
        <div className="space-y-1.5">
          <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">Participation / Dress Code Info</label>
          <textarea
            name="participationInfo"
            rows="2"
            value={formData.participationInfo}
            onChange={handleChange}
            placeholder="Age limits, dress code instructions, required documents..."
            className="w-full bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all"
          />
        </div>
      </div>

      {/* Schedule Planner Section */}
      <div className="bg-bg-card/20 border border-border-color rounded-2xl p-5 space-y-4">
        <h3 className="text-xs text-accent-gold uppercase font-bold tracking-wider flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-accent-primary" /> Event Schedule Timeline
        </h3>

        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Time (e.g., 06:00 PM)"
            value={scheduleItem.time}
            onChange={(e) => setScheduleItem((prev) => ({ ...prev, time: e.target.value }))}
            className="flex-1 bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all text-xs"
          />
          <input
            type="text"
            placeholder="Activity Title (e.g., Opening Act)"
            value={scheduleItem.title}
            onChange={(e) => setScheduleItem((prev) => ({ ...prev, title: e.target.value }))}
            className="flex-2 bg-bg-card/40 border border-border-color p-3.5 rounded-xl text-white outline-none focus:border-accent-gold transition-all text-xs"
          />
          <button
            type="button"
            onClick={handleAddScheduleItem}
            className="px-5 py-3.5 bg-accent-primary hover:bg-accent-secondary text-white font-bold rounded-xl transition-all text-xs cursor-pointer select-none"
          >
            Add Step
          </button>
        </div>

        {/* Schedule List */}
        {formData.schedule.length > 0 && (
          <div className="border border-border-color/60 rounded-xl divide-y divide-border-color/40 overflow-hidden text-xs bg-bg-main/30">
            {formData.schedule.map((item, index) => (
              <div key={index} className="flex justify-between items-center px-4 py-3 hover:bg-bg-card/25 transition-all">
                <div>
                  <span className="text-accent-gold font-bold mr-3">{item.time}</span>
                  <span className="text-white font-semibold">{item.title}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveScheduleItem(index)}
                  className="p-1.5 hover:bg-red-500/10 text-red-400 rounded-lg transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
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
          {initialData ? 'Update Staging' : 'Publish Live'}
        </button>
      </div>
    </form>
  );
}
