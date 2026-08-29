import React from 'react';
import { 
  Scan, 
  MessageSquareText, 
  TrendingUp, 
  CloudSun, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Activity, 
  Building2, 
  Lock, 
  Smartphone, 
  Globe,
  Leaf,
  CheckCircle2
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import { LANGUAGES } from '../data/mockAgriData';

export default function LandingPage({ onOpenSignIn, currentLang, setLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <div className="min-h-screen bg-[#f4fbf7] text-neutral-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-900">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white text-xl shadow-sm">
            🌾
          </div>
          <div>
            <h1 className="text-lg font-bold text-neutral-900 tracking-tight flex items-center gap-1.5">
              {t.appName}
            </h1>
            <span className="text-[10px] font-semibold text-emerald-800 tracking-wider uppercase block">
              {t.sihTag}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Language Selector */}
          <div className="flex items-center bg-emerald-50/80 border border-emerald-200 rounded-full px-3 py-1 text-xs text-neutral-800">
            <Globe size={13} className="text-emerald-700 mr-1.5" />
            <select
              value={currentLang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-emerald-950 text-xs font-bold focus:outline-none cursor-pointer pr-1"
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
            className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <span>{t.signIn}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-100/90 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-sm">
          <Sparkles size={14} className="text-emerald-700" />
          <span>Smart Farming Assistant & Early-Warning AI (PS-02)</span>
        </div>

        {/* Main Heading */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 leading-[1.15]">
            Empowering Farmers with <br />
            <span className="text-emerald-600">AI Agronomy & Market Intelligence</span>
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Instant crop disease diagnosis, hyperlocal weather alerts, live mandi market radar, and 1-click access to all government subsidies.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onOpenSignIn('farmer')}
            className="px-8 py-3.5 rounded-full bg-[#16a34a] hover:bg-[#15803d] active:scale-95 text-white text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <span>{t.getStarted} / {t.signIn}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* 4 Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 text-left">
          
          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Scan size={24} />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Crop Disease AI</h3>
            <p className="text-xs text-neutral-600 font-normal leading-relaxed">
              Upload a leaf photo to get instant diagnostic chlorophyll scanning, organic treatments, and standard ICAR chemical dosages.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <MessageSquareText size={24} />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Kisan Mitra Voice AI</h3>
            <p className="text-xs text-neutral-600 font-normal leading-relaxed">
              Talk or type in your regional language. Receive instant speech-synthesized advice on fertilizers, pests, and irrigation.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Mandi Price Radar</h3>
            <p className="text-xs text-neutral-600 font-normal leading-relaxed">
              Live spot rates from data.gov.in AGMARKNET. Compare APMCs and get automated Hold/Sell price forecasts.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-3 hover:shadow-md transition-all">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <Building2 size={24} />
            </div>
            <h3 className="text-base font-bold text-neutral-900">Govt Schemes Portal</h3>
            <p className="text-xs text-neutral-600 font-normal leading-relaxed">
              PM-KISAN, Solar Pumps (PM-KUSUM), and Tractor subsidies with eligibility checker and direct 1-click apply.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-emerald-100 text-center text-xs text-neutral-500">
        <p>© 2026 {t.appName} — Smart India Hackathon PS-02 Prototype • Designed for Indian Agriculture</p>
      </footer>

    </div>
  );
}
