import React from 'react';
import { 
  Sprout, 
  ShieldAlert, 
  Scan, 
  MessageSquareText, 
  TrendingUp, 
  CloudSun, 
  ArrowRight, 
  CheckCircle2,
  Globe
} from 'lucide-react';
import VideoBackground from '../components/VideoBackground';
import { TRANSLATIONS } from '../data/translations';
import { LANGUAGES } from '../data/mockAgriData';

export default function LandingPage({ onOpenSignIn, currentLang, setLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <div className="relative w-full min-h-screen text-white flex flex-col justify-between">
      {/* Background Farm Video Loop */}
      <VideoBackground overlayOpacity="opacity-50" />

      {/* Top Floating Transparent Navigation Bar */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">🌾</span>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span>{t.appName}</span>
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-emerald-500 text-white shadow-sm">
                SIH 2026
              </span>
            </h1>
            <p className="text-xs text-emerald-200">{t.tagline}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Language Selector */}
          <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/20 rounded-full px-3 py-1.5 text-xs text-white">
            <Globe size={14} className="text-emerald-300 mr-1.5" />
            <select
              value={currentLang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer pr-1"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="text-neutral-900">
                  {l.flag} {l.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => onOpenSignIn('farmer')}
            className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-bold shadow-lg transition-all"
          >
            {t.signIn}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-6">
        
        {/* Clean SIH Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-950/70 backdrop-blur-md border border-emerald-500/40 text-emerald-200 text-xs font-semibold shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{t.sihTag}</span>
        </div>

        {/* Hero Title */}
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
          {t.appName}: {t.tagline}
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-neutral-200 font-normal max-w-2xl mx-auto leading-relaxed">
          An AI-powered agricultural intelligence companion helping farmers diagnose crop diseases, track live Mandi prices, and receive spoken regional advisories.
        </p>

        {/* Dual Role Entry Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={() => onOpenSignIn('farmer')}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-base font-bold shadow-xl shadow-emerald-900/40 transition-all flex items-center justify-center space-x-2 group"
          >
            <Sprout size={20} className="group-hover:rotate-12 transition-transform" />
            <span>{t.farmerLogin}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onOpenSignIn('officer')}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-black/40 hover:bg-black/60 active:scale-95 text-white backdrop-blur-md border border-white/20 text-base font-semibold transition-all flex items-center justify-center space-x-2"
          >
            <ShieldAlert size={20} className="text-rose-400" />
            <span>{t.officerLogin}</span>
          </button>
        </div>

        {/* 4 Feature Cards (Simple & Clean like Ammachi AI) */}
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          
          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-6 rounded-2xl bg-white/90 text-neutral-800 backdrop-blur-md border border-white/40 shadow-lg hover:bg-white cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Scan size={20} />
            </div>
            <h3 className="font-bold text-base text-neutral-900 group-hover:text-emerald-700 transition-colors">
              {t.scanLeafTitle}
            </h3>
            <p className="text-xs text-neutral-600 leading-snug">
              {t.scanLeafDesc}
            </p>
          </div>

          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-6 rounded-2xl bg-white/90 text-neutral-800 backdrop-blur-md border border-white/40 shadow-lg hover:bg-white cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              <MessageSquareText size={20} />
            </div>
            <h3 className="font-bold text-base text-neutral-900 group-hover:text-blue-700 transition-colors">
              {t.askAiTitle}
            </h3>
            <p className="text-xs text-neutral-600 leading-snug">
              {t.askAiDesc}
            </p>
          </div>

          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-6 rounded-2xl bg-white/90 text-neutral-800 backdrop-blur-md border border-white/40 shadow-lg hover:bg-white cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-bold text-base text-neutral-900 group-hover:text-amber-700 transition-colors">
              {t.mandiRadarTitle}
            </h3>
            <p className="text-xs text-neutral-600 leading-snug">
              {t.mandiRadarDesc}
            </p>
          </div>

          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-6 rounded-2xl bg-white/90 text-neutral-800 backdrop-blur-md border border-white/40 shadow-lg hover:bg-white cursor-pointer transition-all space-y-2 group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
              <CloudSun size={20} />
            </div>
            <h3 className="font-bold text-base text-neutral-900 group-hover:text-teal-700 transition-colors">
              {t.weatherTitle}
            </h3>
            <p className="text-xs text-neutral-600 leading-snug">
              {t.weatherDesc}
            </p>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-neutral-300">
        <p>© 2026 {t.appName} • Smart India Hackathon PS-02 Prototype</p>
      </footer>
    </div>
  );
}
