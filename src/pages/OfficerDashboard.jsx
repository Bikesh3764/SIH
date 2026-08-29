import React, { useState } from 'react';
import { ShieldAlert, Sliders, MapPin, Zap, Building, Users } from 'lucide-react';
import { DISTRESS_TALUKS, DISTRESSED_FARMERS_QUEUE } from '../data/mockAgriData';
import { TRANSLATIONS } from '../data/translations';

export default function OfficerDashboard({ triggerActionNotification, currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const [sliderRainfall, setSliderRainfall] = useState(54);
  const [sliderPriceDrop, setSliderPriceDrop] = useState(30);
  const [sliderLoanPressure, setSliderLoanPressure] = useState(80);
  const [sliderCropDamage, setSliderCropDamage] = useState(60);
  const [selectedTaluk, setSelectedTaluk] = useState(DISTRESS_TALUKS[0]);

  const computedFdi = Math.round(
    (0.35 * sliderRainfall) + 
    (0.30 * sliderPriceDrop) + 
    (0.20 * sliderLoanPressure) + 
    (0.15 * sliderCropDamage)
  );

  const getFdiBadge = (score) => {
    if (score >= 70) return { label: t.criticalAlert, bg: 'bg-rose-100 text-rose-800 border-rose-300' };
    if (score >= 40) return { label: t.moderateRisk, bg: 'bg-amber-100 text-amber-800 border-amber-300' };
    return { label: t.stableStatus, bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
  };

  const currentBadge = getFdiBadge(computedFdi);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      
      {/* Officer Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-[#1d1d1f] text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 text-2xl">
            🏛️
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">{t.officerTitle}</h2>
            <p className="text-xs text-neutral-400 mt-0.5">{t.officerSubtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] text-neutral-400 block font-medium">Monitored</span>
            <span className="text-base font-bold text-white">14,280</span>
          </div>
          <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-700/50 text-center">
            <span className="text-[10px] text-rose-300 block font-medium">Critical</span>
            <span className="text-base font-bold text-rose-400">979</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-700/50 text-center">
            <span className="text-[10px] text-emerald-300 block font-medium">Resolved</span>
            <span className="text-base font-bold text-emerald-400">94.2%</span>
          </div>
          <div className="p-3 rounded-2xl bg-blue-950/60 border border-blue-700/50 text-center">
            <span className="text-[10px] text-blue-300 block font-medium">PMFBY Claims</span>
            <span className="text-base font-bold text-blue-400">₹4.8 Cr</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* FDI Formula Simulator */}
        <div className="lg:col-span-6 p-7 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center space-x-2.5">
              <Sliders size={20} className="text-rose-600" />
              <div>
                <h3 className="text-lg font-bold text-neutral-900">{t.fdiSimulator}</h3>
                <p className="text-xs text-neutral-500">Live multi-signal predictive stress algorithm</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
              SIH Core
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 font-mono">
            <b>{t.fdiFormula}</b>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span>1. {t.rainfallDeficit} (35%)</span>
                <span className="text-emerald-700">{sliderRainfall}% Deficit</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderRainfall}
                onChange={(e) => setSliderRainfall(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-neutral-200 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span>2. {t.mandiCrash} (30%)</span>
                <span className="text-amber-700">{sliderPriceDrop}% Drop</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPriceDrop}
                onChange={(e) => setSliderPriceDrop(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer h-2 bg-neutral-200 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span>3. {t.loanStress} (20%)</span>
                <span className="text-purple-700">{sliderLoanPressure}% Pressure</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderLoanPressure}
                onChange={(e) => setSliderLoanPressure(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer h-2 bg-neutral-200 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span>4. {t.cropDamage} (15%)</span>
                <span className="text-rose-700">{sliderCropDamage}% Infestation</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderCropDamage}
                onChange={(e) => setSliderCropDamage(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer h-2 bg-neutral-200 rounded-lg"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-wider">{t.computedFdi}</span>
                <div className="text-4xl font-bold tracking-tight text-rose-400 mt-0.5">
                  {computedFdi} <span className="text-base text-neutral-400 font-normal">/ 100</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentBadge.bg}`}>
                {currentBadge.label}
              </span>
            </div>

            <div className="pt-2 border-t border-white/10 text-xs text-neutral-300 flex items-center justify-between">
              <span><b>Auto-Trigger:</b> PMFBY Fast-Track Claim & Moratorium</span>
              <button
                onClick={() => triggerActionNotification(`Distress Score ${computedFdi} escalated to District Collectorate!`)}
                className="px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold active:scale-95 transition-all shadow-sm"
              >
                Dispatch Test
              </button>
            </div>
          </div>
        </div>

        {/* Regional Taluk Heatmap */}
        <div className="lg:col-span-6 p-7 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center space-x-2.5">
              <MapPin size={20} className="text-emerald-600" />
              <div>
                <h3 className="text-lg font-bold text-neutral-900">{t.talukHeatmap}</h3>
                <p className="text-xs text-neutral-500">Live monitoring of high-vulnerability rural clusters</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-100 text-neutral-700 border border-neutral-200">
              4 Taluks Online
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DISTRESS_TALUKS.map((taluk) => {
              const isSelected = selectedTaluk.id === taluk.id;
              const isRed = taluk.status === 'RED_CRITICAL';
              const isAmber = taluk.status === 'AMBER_MODERATE';

              return (
                <div
                  key={taluk.id}
                  onClick={() => setSelectedTaluk(taluk)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-emerald-600 bg-white shadow-md' : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-neutral-900">{taluk.name}</span>
                    <span className={`w-2.5 h-2.5 rounded-full ${isRed ? 'bg-rose-500 animate-ping' : isAmber ? 'bg-amber-400' : 'bg-emerald-500'}`}></span>
                  </div>

                  <div className="text-[11px] text-neutral-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Distress (FDI):</span>
                      <span className={`font-bold ${isRed ? 'text-rose-600' : isAmber ? 'text-amber-700' : 'text-emerald-700'}`}>
                        {taluk.fdiScore}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flagged Farmers:</span>
                      <span className="font-bold text-neutral-800">{taluk.flaggedFarmersCount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">{selectedTaluk.name} ({selectedTaluk.state})</h4>
                <p className="text-xs text-neutral-500">Officer: {selectedTaluk.officerInCharge}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
                FDI: {selectedTaluk.fdiScore}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 font-medium">
              🚨 <b>Mandated Action:</b> {selectedTaluk.recommendedIntervention}
            </div>
          </div>
        </div>

      </div>

      {/* Red Flagged Farmers Action Queue */}
      <div className="p-7 rounded-3xl bg-white border border-emerald-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center space-x-2.5">
            <ShieldAlert size={20} className="text-rose-600" />
            <div>
              <h3 className="text-lg font-bold text-neutral-900">{t.actionQueue}</h3>
              <p className="text-xs text-neutral-500">Proactive relief dispatch prior to debt default</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            3 Cases Pending Approval
          </span>
        </div>

        <div className="space-y-4">
          {DISTRESSED_FARMERS_QUEUE.map((farmer) => (
            <div
              key={farmer.id}
              className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 hover:bg-white transition-all shadow-sm"
            >
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center space-x-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-neutral-200 text-neutral-800">
                    {farmer.id}
                  </span>
                  <h4 className="text-base font-bold text-neutral-900">{farmer.name}</h4>
                  <span className="text-xs text-neutral-500">📍 {farmer.village}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 font-medium">
                  <div>🌾 <b>Crop:</b> {farmer.crop}</div>
                  <div>🏦 <b>Debt Stress:</b> {farmer.kccLoanDue}</div>
                  <div>🌦️ <b>Weather:</b> {farmer.rainfallDeficit}</div>
                  <div>📉 <b>Market:</b> {farmer.priceDrop}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-3 shrink-0 w-full lg:w-auto">
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-bold">Distress Index</span>
                  <span className="text-2xl font-bold text-rose-600">{farmer.fdiScore} / 100</span>
                </div>

                <div className="flex flex-wrap gap-2 w-full justify-end">
                  <button
                    onClick={() => triggerActionNotification(`⚡ PMFBY Claim Fast-Tracked for ${farmer.name} (Claim ID: #PMFBY-2026-9021)`)}
                    className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold active:scale-95 transition-all shadow-sm flex items-center space-x-1"
                  >
                    <Zap size={13} />
                    <span>{t.fastTrackPmfby}</span>
                  </button>

                  <button
                    onClick={() => triggerActionNotification(`🏦 KCC Loan Moratorium order issued for ${farmer.name} to SBI Ghatanji!`)}
                    className="px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold active:scale-95 transition-all shadow-sm flex items-center space-x-1"
                  >
                    <Building size={13} />
                    <span>{t.kccMoratorium}</span>
                  </button>

                  <button
                    onClick={() => triggerActionNotification(`🚜 KVK Extension Worker dispatched to ${farmer.village} for on-site assessment!`)}
                    className="px-3.5 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold active:scale-95 transition-all shadow-sm flex items-center space-x-1"
                  >
                    <Users size={13} />
                    <span>{t.dispatchKvk}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
