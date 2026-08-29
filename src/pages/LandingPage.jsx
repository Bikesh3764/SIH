import React from 'react';
import { 
  Sprout, 
  Scan, 
  MessageSquareText, 
  TrendingUp, 
  Building2, 
  ArrowRight 
} from 'lucide-react';
import VideoBackground from '../components/VideoBackground';
import AppleLanguageDropdown from '../components/AppleLanguageDropdown';
import { TRANSLATIONS } from '../data/translations';

export default function LandingPage({ onOpenSignIn, currentLang, setLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <div className="relative w-full min-h-screen text-white flex flex-col justify-between overflow-x-hidden animate-apple-fade">
      {/* Background Farm Video Loop */}
      <VideoBackground overlayOpacity="opacity-50" />

      {/* Top Floating Transparent Navigation Bar */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between animate-apple-in">
        <div className="flex items-center space-x-3">
          <span className="text-3xl animate-apple-float">🌾</span>
          <h1 className="text-xl font-bold tracking-tight text-white">
            {t.appName}
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          {/* Apple Popover Language Dropdown */}
          <AppleLanguageDropdown currentLang={currentLang} setLang={setLang} variant="dark" />

          <button
            onClick={() => onOpenSignIn('farmer')}
            className="px-5 py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-xs font-bold shadow-lg shadow-emerald-900/40 transition-all cursor-pointer"
          >
            {t.signIn}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center space-y-6 animate-apple-in delay-1">
        
        {/* Main Hero Headline */}
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
          Empowering Farmers with <br />
          <span className="text-emerald-400">AI Agronomy & Market Intelligence</span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-neutral-200 font-normal max-w-2xl mx-auto leading-relaxed">
          An AI-powered agricultural intelligence companion helping farmers diagnose crop diseases, track live Mandi prices, and receive spoken regional advisories.
        </p>

        {/* Primary Farmer Entry Button */}
        <div className="pt-4 flex items-center justify-center">
          <button
            onClick={() => onOpenSignIn('farmer')}
            className="px-9 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white text-base font-bold shadow-2xl shadow-emerald-900/50 transition-all flex items-center justify-center space-x-2.5 group cursor-pointer animate-apple-glow"
          >
            <Sprout size={20} className="group-hover:rotate-12 transition-transform" />
            <span>{t.getStarted} / {t.signIn}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Feature Cards (Dark Frosted Glass with Apple Hover Physics) */}
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          
          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-white shadow-2xl hover:bg-black/75 hover:border-emerald-400/50 cursor-pointer transition-all space-y-2.5 group active:scale-98 apple-card-hover animate-apple-in delay-2"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Scan size={20} />
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors">
              {t.scanLeafTitle}
            </h3>
            <p className="text-xs text-neutral-300 leading-snug">
              {t.scanLeafDesc}
            </p>
          </div>

          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-white shadow-2xl hover:bg-black/75 hover:border-blue-400/50 cursor-pointer transition-all space-y-2.5 group active:scale-98 apple-card-hover animate-apple-in delay-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <MessageSquareText size={20} />
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors">
              {t.askAiTitle}
            </h3>
            <p className="text-xs text-neutral-300 leading-snug">
              {t.askAiDesc}
            </p>
          </div>

          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-white shadow-2xl hover:bg-black/75 hover:border-amber-400/50 cursor-pointer transition-all space-y-2.5 group active:scale-98 apple-card-hover animate-apple-in delay-4"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <TrendingUp size={20} />
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
              {t.mandiRadarTitle}
            </h3>
            <p className="text-xs text-neutral-300 leading-snug">
              {t.mandiRadarDesc}
            </p>
          </div>

          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-white shadow-2xl hover:bg-black/75 hover:border-purple-400/50 cursor-pointer transition-all space-y-2.5 group active:scale-98 apple-card-hover animate-apple-in delay-5"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Building2 size={20} />
            </div>
            <h3 className="font-bold text-base text-white group-hover:text-purple-400 transition-colors">
              {t.schemesTitle}
            </h3>
            <p className="text-xs text-neutral-300 leading-snug">
              {t.schemesDesc}
            </p>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-neutral-300">
        <p>© 2026 {t.appName} • Built with ❤️ by Vikesh Ray</p>
      </footer>
    </div>
  );
}
