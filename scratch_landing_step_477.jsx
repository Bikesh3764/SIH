import React from 'react';
import { 
  Scan, 
  MessageSquareText, 
  TrendingUp, 
  CloudSun, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  CheckCircle2,
  ChevronRight,
  Leaf
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import { LANGUAGES } from '../data/mockAgriData';

export default function LandingPage({ onOpenSignIn, currentLang, setLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <div className="min-h-screen bg-[#f4fbf7] text-[#1d1d1f] font-sans selection:bg-emerald-500/20 selection:text-emerald-900">
      
      {/* 1. Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-emerald-100 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-xl shadow-sm">
            🌾
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#1d1d1f] tracking-tight flex items-center gap-1.5">
              {t.appName}
            </h1>
            <span className="text-[10px] font-semibold text-emerald-800 tracking-wider uppercase block">
              {t.sihTag}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Clean Language Selector (No Emoji/Icons) */}
          <div className="flex items-center bg-white border border-emerald-200 rounded-full px-3 py-1 text-xs text-[#1d1d1f] shadow-sm">
            <select
              value={currentLang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-[#1d1d1f] text-xs font-semibold focus:outline-none cursor-pointer pr-1"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="text-[#1d1d1f]">
                  {l.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => onOpenSignIn('farmer')}
            className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <span>{t.signIn}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        {/* SIH Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-sm">
          <Sparkles size={14} className="text-emerald-700" />
          <span>Smart Farming Assistant & Early-Warning AI (SIH 2026 PS-02)</span>
        </div>

        {/* Main Hero Headline */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#1d1d1f] leading-[1.15]">
            Empowering Farmers with <br />
            <span className="text-emerald-600">AI Agronomy & Market Intelligence</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Instant crop disease diagnosis, 24-hour hyperlocal weather telemetry, live mandi market radar, and 1-click access to government welfare schemes.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onOpenSignIn('farmer')}
            className="px-8 py-3.5 rounded-full bg-[#16a34a] hover:bg-[#15803d] active:scale-95 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <span>{t.getStarted} / {t.signIn}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* 4 Feature Highlights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 text-left">
          
          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <Scan size={24} />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Crop Disease AI</h3>
            <p className="text-xs text-neutral-600 font-normal leading-relaxed">
              Upload a leaf photo to get instant diagnostic chlorophyll scanning, organic treatments, and standard ICAR chemical dosages.
            </p>
            <div className="flex items-center space-x-1 text-xs font-bold text-emerald-700 pt-1">
              <span>Explore Disease Lab</span>
              <ChevronRight size={14} />
            </div>
          </div>

          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <MessageSquareText size={24} />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Kisan Mitra Voice AI</h3>
            <p className="text-xs text-neutral-600 font-normal leading-relaxed">
              Talk or type in your regional language. Receive instant speech-synthesized advice on fertilizers, pests, and irrigation.
            </p>
            <div className="flex items-center space-x-1 text-xs font-bold text-blue-700 pt-1">
              <span>Start Voice Assistant</span>
              <ChevronRight size={14} />
            </div>
          </div>

          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Mandi Price Radar</h3>
            <p className="text-xs text-neutral-600 font-normal leading-relaxed">
              Live spot rates from data.gov.in AGMARKNET. Compare APMCs and get automated Hold/Sell price forecasts.
            </p>
            <div className="flex items-center space-x-1 text-xs font-bold text-amber-700 pt-1">
              <span>Check Live Rates</span>
              <ChevronRight size={14} />
            </div>
          </div>

          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
              <Building2 size={24} />
            </div>
            <h3 className="text-base font-bold text-[#1d1d1f]">Govt Schemes Portal</h3>
            <p className="text-xs text-neutral-600 font-normal leading-relaxed">
              PM-KISAN, Solar Pumps (PM-KUSUM), and Tractor subsidies with eligibility checker and direct 1-click apply.
            </p>
            <div className="flex items-center space-x-1 text-xs font-bold text-purple-700 pt-1">
              <span>Browse 8 Schemes</span>
              <ChevronRight size={14} />
            </div>
          </div>

        </div>

      </section>

      {/* 3. Footer */}
      <footer className="py-8 border-t border-emerald-100 text-center text-xs text-neutral-500">
        <p>© 2026 {t.appName} — Smart India Hackathon PS-02 Prototype • Designed for Indian Agriculture</p>
      </footer>

    </div>
  );
}
