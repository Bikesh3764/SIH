import React from 'react';
import { UI_TRANSLATIONS } from '../data/mockAgriData';
import { 
  Sprout, 
  ShieldAlert, 
  Mic, 
  Camera, 
  TrendingUp, 
  CloudSun, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Activity
} from 'lucide-react';

export default function HeroLanding({ currentLang, setActiveTab, openPitchModal }) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  return (
    <div className="relative w-full overflow-hidden bg-[#1d1d1f] text-white">
      {/* Background Video / Cinematic Golden Hour Agriculture Ambience */}
      <div className="absolute inset-0 z-0 opacity-40 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-90 saturate-125"
          poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-wind-blowing-in-a-wheat-field-41525-large.mp4" 
            type="video/mp4" 
          />
          {/* Fallback image */}
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80" 
            alt="Fasal Crop Field" 
            className="w-full h-full object-cover"
          />
        </video>
        {/* Apple Atmospheric Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1f] via-[#1d1d1f]/60 to-[#000000]/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1d1d1f]/90 via-transparent to-[#1d1d1f]/90"></div>
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32 flex flex-col items-center text-center">
        
        {/* Apple Style Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-[13px] font-medium mb-6 shadow-inner animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-emerald-300 font-semibold uppercase text-[11px] tracking-wider">Smart India Hackathon 2026</span>
          <span className="text-white/40">•</span>
          <span>Theme: Agriculture & Rural Development</span>
        </div>

        {/* Hero Title with Apple Tight Typography */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.035em] text-white leading-[1.06] max-w-4xl mx-auto">
          {t.heroTitle}
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-lg sm:text-xl md:text-2xl text-neutral-300 font-light leading-relaxed max-w-2xl mx-auto tracking-[-0.01em]">
          {t.heroSubtitle}
        </p>

        {/* Dual Mode Entry Call-to-Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
          {/* Farmer Mode CTA */}
          <button
            onClick={() => setActiveTab('farmer')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[16px] font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 transition-all flex items-center justify-center space-x-2 group"
          >
            <Sprout size={18} className="group-hover:rotate-12 transition-transform" />
            <span>{t.farmerMode}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Officer Command CTA */}
          <button
            onClick={() => setActiveTab('officer')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 text-[16px] font-medium active:scale-95 transition-all flex items-center justify-center space-x-2 group"
          >
            <ShieldAlert size={18} className="text-rose-400 group-hover:scale-110 transition-transform" />
            <span>{t.officerMode}</span>
            <span className="px-1.5 py-0.2 text-[10px] bg-rose-500/30 text-rose-300 rounded font-semibold border border-rose-500/40">Live FDI</span>
          </button>
        </div>

        {/* 4 Core Pillars Cards Grid (Apple Tile Aesthetic) */}
        <div className="mt-16 sm:mt-24 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          
          {/* Pillar 1: Voice & Multilingual */}
          <div 
            onClick={() => setActiveTab('farmer')}
            className="p-6 rounded-[18px] bg-neutral-900/80 backdrop-blur-md border border-neutral-800 hover:border-blue-500/50 hover:bg-neutral-900 transition-all cursor-pointer group shadow-apple-product"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <Mic size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight flex items-center justify-between">
              <span>Voice Agronomist</span>
              <ArrowRight size={14} className="text-neutral-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
            </h3>
            <p className="mt-2 text-sm text-neutral-400 leading-normal">
              Zero-literacy barrier. Farmers ask questions in Hindi, Marathi, Telugu & Punjabi via voice and receive spoken advice.
            </p>
          </div>

          {/* Pillar 2: Leaf Disease AI */}
          <div 
            onClick={() => setActiveTab('farmer')}
            className="p-6 rounded-[18px] bg-neutral-900/80 backdrop-blur-md border border-neutral-800 hover:border-emerald-500/50 hover:bg-neutral-900 transition-all cursor-pointer group shadow-apple-product"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Camera size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight flex items-center justify-between">
              <span>Crop Disease AI</span>
              <ArrowRight size={14} className="text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
            </h3>
            <p className="mt-2 text-sm text-neutral-400 leading-normal">
              Instant visual diagnosis from leaf photos with dual remedies: organic zero-budget treatments and chemical solutions.
            </p>
          </div>

          {/* Pillar 3: Mandi Radar */}
          <div 
            onClick={() => setActiveTab('farmer')}
            className="p-6 rounded-[18px] bg-neutral-900/80 backdrop-blur-md border border-neutral-800 hover:border-amber-500/50 hover:bg-neutral-900 transition-all cursor-pointer group shadow-apple-product"
          >
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight flex items-center justify-between">
              <span>Mandi Price Radar</span>
              <ArrowRight size={14} className="text-neutral-500 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
            </h3>
            <p className="mt-2 text-sm text-neutral-400 leading-normal">
              AGMARKNET 3-mandi price comparator with AI price forecasts and clear <b>HOLD</b> vs <b>SELL</b> selling signals.
            </p>
          </div>

          {/* Pillar 4: Farmer Distress Early Warning */}
          <div 
            onClick={() => setActiveTab('officer')}
            className="p-6 rounded-[18px] bg-neutral-900/80 backdrop-blur-md border border-rose-900/60 hover:border-rose-500 hover:bg-neutral-900 transition-all cursor-pointer group shadow-apple-product relative overflow-hidden"
          >
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-rose-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
              <Activity size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white tracking-tight flex items-center justify-between">
              <span>Predictive Distress Index</span>
              <ArrowRight size={14} className="text-neutral-500 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all" />
            </h3>
            <p className="mt-2 text-sm text-neutral-400 leading-normal">
              Mathematical scoring of weather anomalies, price drops & loan stress. Routes red-flags to Agri Officers for PMFBY claims.
            </p>
          </div>

        </div>

        {/* Problem Statement 02 Live Proof Metric Strip */}
        <div className="mt-16 w-full max-w-4xl p-5 rounded-[18px] bg-white/[0.04] backdrop-blur-md border border-white/10 flex flex-wrap items-center justify-around gap-6 text-neutral-300 text-sm">
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <span><b>Multilingual Voice:</b> 7 Regional Languages</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 size={18} className="text-blue-400 shrink-0" />
            <span><b>FDI Model:</b> 4-Signal Weighted Algorithm</span>
          </div>
          <div className="flex items-center space-x-2.5">
            <CheckCircle2 size={18} className="text-amber-400 shrink-0" />
            <span><b>Low Bandwidth:</b> 2G / Offline PWA Ready</span>
          </div>
        </div>

      </div>
    </div>
  );
}
