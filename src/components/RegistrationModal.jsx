import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, User, Mail, Phone, MapPin, Sparkles, CreditCard, Lock, Ticket } from 'lucide-react';
import { api } from '../utils/api';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

/* ─── Inner form ─── */
function RegistrationForm({ onClose, eventName, eventId, eventPrice }) {
  const [step, setStep]         = useState('details'); // 'details' | 'payment' | 'success'
  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', city: '', age: '', participants: 1, notes: ''
  });
  const [errors,     setErrors]     = useState({});
  const [processing, setProcessing] = useState(false);
  const [txId,       setTxId]       = useState('');
  const [isMock,     setIsMock]     = useState(false);

  const pricePerSeat  = typeof eventPrice === 'number' ? eventPrice : 0;
  const totalAmount   = pricePerSeat * Number(formData.participants || 1);
  const amountInPaise = Math.round(totalAmount * 100); // Razorpay uses smallest currency unit (paise)

  const validate = () => {
    const errs  = {};
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRe = /^[+]?[0-9]{10,14}$/;
    if (!formData.fullName.trim())       errs.fullName = 'Full Name is required';
    if (!formData.email.trim())          errs.email = 'Email Address is required';
    else if (!emailRe.test(formData.email)) errs.email = 'Invalid email address format';
    if (!formData.phone.trim())          errs.phone = 'Mobile Number is required';
    else if (!phoneRe.test(formData.phone.replace(/[\s-]/g, ''))) errs.phone = 'Must be 10–14 digits';
    if (!formData.city.trim())           errs.city = 'City is required';
    if (!formData.age)                   errs.age = 'Age is required';
    else if (Number(formData.age) < 13 || Number(formData.age) > 120) errs.age = 'Valid age required (13+)';
    if (Number(formData.participants) < 1) errs.participants = 'Minimum 1 participant required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  /* Step 1 → Step 2 */
  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (validate()) {
      if (pricePerSeat === 0) {
        // Direct free registration bypasses payment screen
        handleFreeSubmit();
      } else {
        setStep('payment');
      }
    }
  };

  const handleFreeSubmit = async () => {
    setProcessing(true);
    setErrors({});
    try {
      const transactionId = 'FREE_' + Date.now();
      await api.createBooking({
        ...formData,
        age:          Number(formData.age),
        participants: Number(formData.participants),
        eventId,
        eventName,
        transactionId,
        paymentStatus: 'FREE',
        submittedAt:  new Date().toISOString(),
      });
      setTxId(transactionId);
      setIsMock(false);
      setStep('success');
    } catch (err) {
      setErrors({ submit: err.message || 'Registration failed. Please try again.' });
    } finally {
      setProcessing(false);
    }
  };

  /* Step 2 → Confirm payment */
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setErrors({});

    try {
      // Request a Razorpay Order from our backend
      const intentData = await api.createPaymentIntent(amountInPaise, 'inr');

      if (intentData.isMock) {
        // Mock mode — Razorpay keys not configured
        const transactionId = intentData.paymentIntentId;
        
        await api.createBooking({
          ...formData,
          age:          Number(formData.age),
          participants: Number(formData.participants),
          eventId,
          eventName,
          transactionId,
          paymentStatus: 'MOCK_PAID',
          submittedAt:  new Date().toISOString(),
        });

        setTxId(transactionId);
        setIsMock(true);
        setStep('success');
      } else {
        // Real Razorpay integration
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          throw new Error('Razorpay SDK failed to load. Please verify your internet connection.');
        }

        const options = {
          key: intentData.keyId,
          amount: intentData.amount,
          currency: intentData.currency,
          name: 'VSI Creation',
          description: `Pass for ${eventName}`,
          order_id: intentData.orderId,
          prefill: {
            name: formData.fullName,
            email: formData.email,
            contact: formData.phone,
          },
          theme: {
            color: '#d97706', // Gold accent color
          },
          handler: async function (response) {
            try {
              setProcessing(true);
              await api.createBooking({
                ...formData,
                age:          Number(formData.age),
                participants: Number(formData.participants),
                eventId,
                eventName,
                transactionId: response.razorpay_payment_id,
                paymentStatus: 'PAID',
                submittedAt:  new Date().toISOString(),
              });

              setTxId(response.razorpay_payment_id);
              setIsMock(false);
              setStep('success');
            } catch (err) {
              setErrors({ submit: err.message || 'Failed to complete booking registration.' });
            } finally {
              setProcessing(false);
            }
          },
          modal: {
            ondismiss: function () {
              setProcessing(false);
            }
          }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (err) {
      setErrors({ submit: err.message || 'Payment processing error. Please try again.' });
      setProcessing(false);
    }
  };

  const handleReset = () => {
    setFormData({ fullName: '', email: '', phone: '', city: '', age: '', participants: 1, notes: '' });
    setErrors({});
    setStep('details');
    onClose();
  };

  /* ── Render ── */
  return (
    <div className="p-6 overflow-y-auto max-h-[82vh]">

      {/* ── Success Screen ── */}
      {step === 'success' && (
        <div className="text-center py-8 space-y-6">
          <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-400/40 rounded-full flex items-center justify-center mx-auto animate-bounce">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black text-black">Booking Confirmed!</h3>
            <p className="text-sm text-text-muted max-w-md mx-auto">
              Your pass for <span className="text-accent-gold font-bold">{eventName}</span> is secured.
              A confirmation will be sent to <span className="text-accent-gold font-bold">{formData.email}</span>.
            </p>
          </div>

            {/* Transaction details */}
          <div className="bg-bg-card/60 backdrop-blur-md border border-border-color/85 rounded-2xl p-5 text-left space-y-3.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-text-muted font-medium">Transaction ID</span>
              <span className="font-mono text-accent-gold font-bold select-all break-all text-right max-w-[65%]">{txId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted font-medium">Amount Paid</span>
              <span className="text-emerald-400 font-extrabold text-sm">
                {pricePerSeat === 0 ? 'Free Entry' : `₹${totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted font-medium">Payment Status</span>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md ${isMock ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                {isMock ? 'Mock (Test Mode)' : 'Successful'}
              </span>
            </div>
          </div>

          <button onClick={handleReset}
            className="w-full py-4 bg-gradient-to-r from-accent-primary to-accent-rose hover:from-accent-rose hover:to-accent-secondary text-black font-bold rounded-xl shadow-lg shadow-accent-primary/20 hover:shadow-accent-secondary/35 btn-glow cursor-pointer text-xs uppercase tracking-widest transition-all">
            Return to Event Page
          </button>
        </div>
      )}

      {/* ── Step 1: Personal Details ── */}
      {step === 'details' && (
        <form onSubmit={handleNextToPayment} className="space-y-5">
          {/* Event badge */}
          <div className="bg-bg-card/60 border border-border-color/60 p-4 rounded-xl flex items-center justify-between text-xs">
            <span className="text-text-muted uppercase tracking-wider font-extrabold">Selected Event</span>
            <span className="text-accent-gold font-extrabold uppercase tracking-wide">{eventName}</span>
          </div>

          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />{errors.submit}
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-text-muted uppercase font-extrabold tracking-wider block">Full Name *</label>
            <div className="relative">
              <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                placeholder="e.g. John Doe"
                className={`w-full bg-bg-card/45 border text-sm text-black pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-primary transition-all placeholder:text-slate-600 ${errors.fullName ? 'border-red-500' : 'border-border-color/80'}`} />
            </div>
            {errors.fullName && <p className="text-[10px] text-red-400 font-semibold">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-text-muted uppercase font-extrabold tracking-wider block">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                placeholder="e.g. john@example.com"
                className={`w-full bg-bg-card/45 border text-sm text-black pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-primary transition-all placeholder:text-slate-600 ${errors.email ? 'border-red-500' : 'border-border-color/80'}`} />
            </div>
            {errors.email && <p className="text-[10px] text-red-400 font-semibold">{errors.email}</p>}
          </div>

          {/* Phone + City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-text-muted uppercase font-extrabold tracking-wider block">Mobile Number *</label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className={`w-full bg-bg-card/45 border text-sm text-black pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-primary transition-all placeholder:text-slate-600 ${errors.phone ? 'border-red-500' : 'border-border-color/80'}`} />
              </div>
              {errors.phone && <p className="text-[10px] text-red-400 font-semibold">{errors.phone}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-text-muted uppercase font-extrabold tracking-wider block">City *</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                <input type="text" name="city" value={formData.city} onChange={handleInputChange}
                  placeholder="e.g. Mumbai"
                  className={`w-full bg-bg-card/45 border text-sm text-black pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-primary transition-all placeholder:text-slate-600 ${errors.city ? 'border-red-500' : 'border-border-color/80'}`} />
              </div>
              {errors.city && <p className="text-[10px] text-red-500 font-semibold">{errors.city}</p>}
            </div>
          </div>

          {/* Age + Participants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] text-text-muted uppercase font-extrabold tracking-wider block">Age *</label>
              <input type="number" name="age" value={formData.age} onChange={handleInputChange}
                placeholder="Min 13"
                className={`w-full bg-bg-card/45 border text-sm text-black px-4 py-3.5 rounded-xl outline-none focus:border-accent-primary transition-all placeholder:text-slate-600 ${errors.age ? 'border-red-500' : 'border-border-color/80'}`} />
              {errors.age && <p className="text-[10px] text-red-500 font-semibold">{errors.age}</p>}
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] text-text-muted uppercase font-extrabold tracking-wider block">Attendees Count *</label>
              <input type="number" name="participants" min="1" max="10" value={formData.participants} onChange={handleInputChange}
                className={`w-full bg-bg-card/45 border text-sm text-black px-4 py-3.5 rounded-xl outline-none focus:border-accent-primary transition-all ${errors.participants ? 'border-red-500' : 'border-border-color/80'}`} />
              {errors.participants && <p className="text-[10px] text-red-500 font-semibold">{errors.participants}</p>}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-text-muted uppercase font-extrabold tracking-wider block">Additional Specifications</label>
            <textarea name="notes" rows="2" value={formData.notes} onChange={handleInputChange}
              placeholder="Acoustic assistance, access cards, visual clearances..."
              className="w-full bg-bg-card/45 border border-border-color/80 text-sm text-black px-4 py-3.5 rounded-xl outline-none focus:border-accent-primary transition-all placeholder:text-slate-650 resize-none" />
          </div>

          {/* Price summary */}
          {pricePerSeat > 0 && (
            <div className="bg-accent-gold/5 border border-accent-gold/20 rounded-xl px-4 py-3.5 flex items-center justify-between text-sm">
              <span className="text-text-muted font-medium flex items-center gap-1.5">
                <Ticket className="w-4 h-4 text-accent-gold" />
                {formData.participants || 1} × ₹{pricePerSeat.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-accent-gold font-black text-base">₹{(pricePerSeat * Number(formData.participants || 1)).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          )}
          {pricePerSeat === 0 && (
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3.5 text-xs text-emerald-450 font-bold text-center">
              🎟 Free Admission — No billing coordinates required
            </div>
          )}

          <button type="submit"
            className="w-full py-4 bg-gradient-to-r from-accent-primary to-accent-rose hover:from-accent-rose hover:to-accent-secondary text-black font-bold rounded-xl shadow-lg shadow-accent-primary/20 hover:shadow-accent-secondary/35 btn-glow cursor-pointer text-xs uppercase tracking-widest transition-all">
            {pricePerSeat > 0 ? 'Continue to Payment →' : 'Confirm Registration'}
          </button>
        </form>
      )}

      {/* ── Step 2: Payment Summary ── */}
      {step === 'payment' && (
        <form onSubmit={handlePaymentSubmit} className="space-y-5">
          {/* Summary */}
          <div className="bg-bg-card border border-border-color/85 rounded-xl p-5 space-y-3.5 text-sm">
            <div className="flex justify-between text-text-muted">
              <span>Selected Pass</span>
              <span className="text-black font-bold">{eventName}</span>
            </div>
            <div className="flex justify-between text-text-muted">
              <span>Attendees Count</span>
              <span className="text-black font-bold">{formData.participants}</span>
            </div>
            <div className="border-t border-border-color/30 pt-3 flex justify-between">
              <span className="text-text-muted font-semibold">Total Amount Due</span>
              <span className="text-accent-gold font-black text-base">₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          {errors.submit && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />{errors.submit}
            </div>
          )}

          {/* Secure Payment Info */}
          <div className="bg-bg-card/45 border border-border-color/80 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-3.5 text-xs text-text-muted">
              <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="font-bold text-black">Secured via Razorpay Network</p>
                <p className="text-[10px] font-light mt-0.5">Fully encrypted transaction channel supporting card, UPI, wallet configurations.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="button" onClick={() => setStep('details')}
              className="flex-1 py-3.5 bg-bg-card/60 border border-border-color/80 text-text-muted hover:text-black hover:border-accent-primary/45 font-bold rounded-xl transition-all text-xs uppercase tracking-widest cursor-pointer">
              ← Back
            </button>
            <button type="submit" disabled={processing}
              className="flex-[2] py-3.5 bg-gradient-to-r from-accent-primary to-accent-rose hover:from-accent-rose hover:to-accent-secondary text-black font-bold rounded-xl border border-white/10 shadow-lg shadow-accent-primary/20 hover:shadow-accent-secondary/35 btn-glow transition-all text-xs uppercase tracking-widest cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {processing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Staging Gateway…
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" /> Pay ₹{totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/* ─── Outer wrapper ─── */
export default function RegistrationModal({ isOpen, onClose, eventName, eventId, eventPrice }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-bg-surface border border-border-color/80 rounded-3xl w-full max-w-xl overflow-hidden relative shadow-2xl animate-fade-in">
        {/* Glow corners */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-primary/8 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-gold/4 rounded-full blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="border-b border-border-color/40 px-6 py-5 flex justify-between items-center relative z-10">
          <div>
            <h2 className="text-xl font-extrabold text-black flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent-gold" /> Secure Your Pass
            </h2>
            <p className="text-xs text-text-muted mt-0.5">Register for <span className="text-accent-secondary font-semibold">{eventName}</span></p>
          </div>
          <button onClick={onClose}
            className="p-2 hover:bg-bg-card border border-border-color/60 text-text-muted hover:text-black rounded-xl transition-all cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step indicator */}
        <div className="px-6 pt-5 flex items-center gap-3">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
            <span className="w-5 h-5 bg-accent-primary text-black rounded-full flex items-center justify-center text-[10px] font-extrabold">1</span>
            <span className="text-text-main font-extrabold">Details</span>
          </div>
          <div className="flex-1 h-px bg-border-color/30" />
          {eventPrice > 0 && (
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
              <span className="w-5 h-5 bg-bg-card border border-border-color/85 text-text-muted rounded-full flex items-center justify-center text-[10px] font-extrabold">2</span>
              <span className="text-text-muted font-extrabold">Payment</span>
            </div>
          )}
        </div>

        <RegistrationForm
          onClose={onClose}
          eventName={eventName}
          eventId={eventId}
          eventPrice={eventPrice}
        />
      </div>
    </div>
  );
}
