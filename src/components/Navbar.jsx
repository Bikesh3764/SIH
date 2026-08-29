import React from 'react';
import { LANGUAGES, UI_TRANSLATIONS } from '../data/mockAgriData';
import { 
  Sprout, 
  ShieldAlert, 
  Award, 
  Wifi, 
  WifiOff, 
  Globe, 
  HelpCircle,
  BarChart3,
  PhoneCall,
  UserCheck
} from 'lucide-react';

export default function Navbar({ 
  currentLang, 
  setLang, 
  activeTab, 
  setActiveTab, 
  isOfflineMode, 
  setIsOfflineMode,
  openPitchModal
}) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-50 w-full select-none">
      {/* Apple Global Nav Bar (44px) - Surface Black */}
      <div className="bg-[#000000] text-white h-[44px] px-4 md:px-8 flex items-center justify-between text-[12px] font-normal tracking-[-0.01em] border-b border-neutral-800">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 font-medium tracking-tight text-white/90">
            <span className="text-base">🌾</span>
            <span className="text-[13px] font-semibold text-white">AgriShield AI</span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
              SIH 2026 PS-02
            </span>
          </div>

          <div className="hidden lg:flex items-center space-x-4 pl-4 border-l border-neutral-800 text-neutral-400">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.activeFarmers}
            </span>
            <span>•</span>
            <span className="text-emerald-400 font-medium">{t.distressPrevented}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Low Bandwidth / Offline Simulator Toggle */}
          <button 
            onClick={() => setIsOfflineMode(!isOfflineMode)}
            title="Toggle rural low-bandwidth simulation mode"
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${
              isOfflineMode 
                ? 'bg-amber-950/80 text-amber-300 border border-amber-700/80 animate-pulse' 
                : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
            }`}
          >
            {isOfflineMode ? <WifiOff size={13} className="text-amber-400" /> : <Wifi size={13} className="text-emerald-400" />}
            <span className="hidden md:inline">{isOfflineMode ? '2G / Offline (SMS Sync)' : 'Online High-Speed'}</span>
          </button>

          {/* Multilingual Selector */}
          <div className="relative flex items-center bg-neutral-900 border border-neutral-800 rounded-full px-2.5 py-0.5 text-neutral-300 hover:border-neutral-700">
            <Globe size={13} className="text-neutral-400 mr-1.5" />
            <select
              value={currentLang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-white text-[12px] font-medium focus:outline-none cursor-pointer pr-1"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="bg-neutral-900 text-white">
                  {l.flag} {l.name} ({l.native})
                </option>
              ))}
            </select>
          </div>

          {/* SIH Pitch & Jury Sheet Button */}
          <button
            onClick={openPitchModal}
            className="flex items-center space-x-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-medium hover:brightness-110 active:scale-95 transition-all shadow-sm"
          >
            <Award size={13} />
            <span className="hidden xs:inline">{t.pitchMode}</span>
          </button>
        </div>
      </div>

      {/* Apple Sub-Nav Frosted Glass (52px) */}
      <nav className="h-[52px] px-4 md:px-8 apple-glass border-b border-black/[0.08] flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap active:scale-95 ${
              activeTab === 'hero'
                ? 'bg-neutral-900 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('farmer')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap active:scale-95 ${
              activeTab === 'farmer'
                ? 'bg-[#0066cc] text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            <Sprout size={15} />
            <span>{t.farmerMode}</span>
          </button>

          <button
            onClick={() => setActiveTab('officer')}
            className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap active:scale-95 ${
              activeTab === 'officer'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
            }`}
          >
            <ShieldAlert size={15} />
            <span>{t.officerMode}</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          </button>
        </div>

        <div className="hidden sm:flex items-center space-x-3">
          <div className="flex items-center gap-1.5 text-[12px] text-neutral-500 font-medium bg-neutral-200/60 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>AGMARKNET Mandi Live Feed</span>
          </div>

          <button
            onClick={() => setActiveTab(activeTab === 'officer' ? 'farmer' : 'officer')}
            className="px-4 py-1.5 rounded-full text-[13px] font-medium bg-[#0066cc] text-white hover:bg-[#0071e3] active:scale-95 transition-all shadow-sm flex items-center space-x-1.5"
          >
            <UserCheck size={14} />
            <span>Switch to {activeTab === 'officer' ? 'Farmer Mode' : 'Officer Command'}</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
