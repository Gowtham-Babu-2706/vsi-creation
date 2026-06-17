import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldAlert, ArrowRight } from 'lucide-react';
import { api } from '../utils/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Both email and password are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.login(email, password);
      // Force trigger state reload or navigate
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please verify your entries.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-bg-main text-text-main min-h-screen pt-24 pb-16 flex items-center justify-center relative px-6">
      {/* Ambient backgrounds */}
      <div className="absolute top-[15vh] left-[25%] w-96 h-96 bg-accent-primary/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[15vh] right-[25%] w-[350px] h-[350px] bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="w-full max-w-md bg-bg-surface border border-border-color rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden animate-scale-up">
        {/* Gold trim line */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent-primary via-accent-gold to-accent-primary"></div>

        {/* Logo and Titles */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex p-3.5 bg-accent-primary/15 border border-accent-primary/30 rounded-2xl text-accent-gold mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-wider">
            Portal Access
          </h1>
          <p className="text-xs text-text-muted">
            Provide credentials to enter the VSI Creations Control Center
          </p>
        </div>

        {/* Error message boundary */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl flex items-start gap-3 text-xs mb-6 animate-fade-in">
            <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Input parameters form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@vsicreations.com"
                className="w-full bg-bg-card/60 border border-border-color text-sm text-white pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-gold focus:bg-bg-main transition-all"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1.5">
            <label className="text-[10px] text-text-muted uppercase font-bold tracking-wider block">
              Security Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-bg-card/60 border border-border-color text-sm text-white pl-12 pr-4 py-3.5 rounded-xl outline-none focus:border-accent-gold focus:bg-bg-main transition-all"
              />
            </div>
          </div>

          {/* Submission trigger */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-accent-primary to-[#700016] text-white font-bold rounded-xl border border-accent-gold/20 hover:border-accent-gold shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/45 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest cursor-pointer mt-8"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                Authenticate <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
