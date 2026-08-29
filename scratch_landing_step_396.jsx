import React, { useState } from 'react';
import { 
  Scan, 
  MessageSquareText, 
  TrendingUp, 
  CloudSun, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Globe,
  CheckCircle2,
  ChevronRight,
  Play,
  Leaf
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';
import { LANGUAGES } from '../data/mockAgriData';

export default function LandingPage({ onOpenSignIn, currentLang, setLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      
      {/* 1. Apple Global Nav (Ultra-thin Frosted Header) */}
      <header className="sticky top-0 z-50 bg-[#f5f5f7]/80 backdrop-blur-xl border-b border-[#d2d2d7]/60 px-4 sm:px-8 py-3 flex items-center justify-between transition-all">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-[#1d1d1f] flex items-center justify-center text-white text-base shadow-sm">
            🌾
          </div>
          <div>
            <h1 className="text-[15px] font-semibold tracking-tight text-[#1d1d1f]">
              {t.appName}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Language Selector Capsule */}
          <div className="flex items-center bg-white/80 border border-[#d2d2d7] rounded-full px-3 py-1 text-xs text-[#1d1d1f] shadow-xs">
            <Globe size={13} className="text-[#0071e3] mr-1.5" />
            <select
              value={currentLang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-[#1d1d1f] text-xs font-medium focus:outline-none cursor-pointer pr-1"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="text-[#1d1d1f]">
                  {l.flag} {l.name}
                </option>
              ))}
            </select>
          </div>

          {/* Apple Action Blue Button */}
          <button
            onClick={() => onOpenSignIn('farmer')}
            className="px-4 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium tracking-tight active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            {t.signIn}
          </button>
        </div>
      </header>

      {/* 2. Hero Section with Cinematic Background & Glass Overlay */}
      <section className="relative min-h-[640px] flex items-center justify-center text-center px-4 sm:px-8 py-20 overflow-hidden">
        
        {/* Cinematic Agricultural Video/Photo Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=85"
            alt="Lush Agricultural Field at Golden Hour"
            className="w-full h-full object-cover scale-105 filter brightness-95"
          />
          {/* Frosted Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f7]/60 via-transparent to-[#f5f5f7]" />
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content Card in Apple Glass */}
        <div className="relative z-10 max-w-3xl mx-auto p-8 sm:p-12 rounded-[28px] bg-white/85 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(0,0,0,0.12)] space-y-6">
          
          {/* Eyebrow Chip */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#f5f5f7] text-[#1d1d1f] border border-[#d2d2d7]/70 text-xs font-semibold tracking-tight shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-pulse"></span>
            <span>SIH 2026 PS-02 • Smart India Hackathon</span>
          </div>

          {/* Apple Tight Typography Headline */}
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.03em] text-[#1d1d1f] leading-[1.12]">
              Intelligence for every farm. <br />
              <span className="text-[#0071e3]">Prosperity for every farmer.</span>
            </h2>
            <p className="text-[16px] sm:text-[18px] text-[#6e6e73] max-w-xl mx-auto font-normal leading-relaxed tracking-tight">
              AI crop disease diagnosis, 24-hour hyperlocal weather telemetry, live mandi market radar, and 1-click access to government welfare schemes.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenSignIn('farmer')}
              className="px-7 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-sm font-medium tracking-tight active:scale-95 transition-all shadow-md flex items-center space-x-2 cursor-pointer"
            >
              <span>{t.getStarted} / {t.signIn}</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={() => onOpenSignIn('farmer')}
              className="px-6 py-3 rounded-full bg-white hover:bg-[#f5f5f7] text-[#0071e3] border border-[#d2d2d7] text-sm font-medium tracking-tight active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <span>New Farmer Registration</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. Product Tiles Section (Edge-to-Edge Museum Grid in Apple Aesthetics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-12">
        
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
            Four core capabilities. <br />One unified assistant.
          </h3>
          <p className="text-sm text-[#6e6e73] font-normal">
            Engineered with low-bandwidth offline sync and multilingual voice guidance for rural India.
          </p>
        </div>

        {/* 4 Feature Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Tile 1: Disease AI */}
          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-8 sm:p-10 rounded-[24px] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3]/40 shadow-xs hover:shadow-lg transition-all cursor-pointer space-y-4 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] text-[#0071e3] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Scan size={24} />
              </div>
              <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block">Computer Vision</span>
              <h4 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
                AI Leaf Disease Detection
              </h4>
              <p className="text-sm text-[#6e6e73] leading-relaxed">
                Upload or capture any crop leaf. Our chlorophyll and necrosis scanner identifies fungal pathogens and prescribes zero-budget organic & ICAR chemical cures.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-semibold text-[#0071e3] pt-2">
              <span>Explore Disease Lab</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Tile 2: Voice Chatbot */}
          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-8 sm:p-10 rounded-[24px] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3]/40 shadow-xs hover:shadow-lg transition-all cursor-pointer space-y-4 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] text-[#0071e3] flex items-center justify-center group-hover:scale-105 transition-transform">
                <MessageSquareText size={24} />
              </div>
              <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block">Voice & Agronomy</span>
              <h4 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
                Kisan Mitra Voice AI
              </h4>
              <p className="text-sm text-[#6e6e73] leading-relaxed">
                Speak or type in your native regional language. Get instant voice-synthesized agronomic advice on irrigation timing, fertilizers, and pest mitigation.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-semibold text-[#0071e3] pt-2">
              <span>Start Voice Assistant</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Tile 3: Market Prices */}
          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-8 sm:p-10 rounded-[24px] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3]/40 shadow-xs hover:shadow-lg transition-all cursor-pointer space-y-4 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] text-[#0071e3] flex items-center justify-center group-hover:scale-105 transition-transform">
                <TrendingUp size={24} />
              </div>
              <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block">Market Intelligence</span>
              <h4 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
                Mandi Price Radar
              </h4>
              <p className="text-sm text-[#6e6e73] leading-relaxed">
                Real-time spot rates from data.gov.in AGMARKNET. Compare APMCs across districts, view 7-day price charts, and receive data-driven Hold/Sell signals.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-semibold text-[#0071e3] pt-2">
              <span>Check Mandi Rates</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Tile 4: Govt Schemes */}
          <div 
            onClick={() => onOpenSignIn('farmer')}
            className="p-8 sm:p-10 rounded-[24px] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3]/40 shadow-xs hover:shadow-lg transition-all cursor-pointer space-y-4 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#f5f5f7] text-[#0071e3] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Building2 size={24} />
              </div>
              <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider block">Welfare & Subsidies</span>
              <h4 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
                Government Schemes Portal
              </h4>
              <p className="text-sm text-[#6e6e73] leading-relaxed">
                Discover PM-KISAN, PM-KUSUM Solar Pumps, Tractor Subsidies (SMAM), and KCC loans with verified eligibility criteria and direct 1-click apply.
              </p>
            </div>
            <div className="flex items-center space-x-1 text-xs font-semibold text-[#0071e3] pt-2">
              <span>Browse 8 Schemes</span>
              <ChevronRight size={14} />
            </div>
          </div>

        </div>

      </section>

      {/* 4. Apple Dense Footer */}
      <footer className="bg-[#f5f5f7] border-t border-[#d2d2d7]/70 py-12 px-4 sm:px-8 text-xs text-[#86868b]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p>© 2026 {t.appName} • Smart India Hackathon PS-02 Prototype • Designed with Apple UI Precision</p>
          <div className="flex items-center space-x-4">
            <span className="text-[#6e6e73]">Low Bandwidth Synced</span>
            <span className="text-[#6e6e73]">Offline First</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
