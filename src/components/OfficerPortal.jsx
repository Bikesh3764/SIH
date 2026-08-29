import React, { useState } from 'react';
import { 
  DISTRESS_TALUKS, 
  DISTRESSED_FARMERS_QUEUE, 
  GOVT_SCHEMES, 
  UI_TRANSLATIONS 
} from '../data/mockAgriData';
import { 
  ShieldAlert, 
  Activity, 
  AlertOctagon, 
  FileCheck, 
  Send, 
  PhoneCall, 
  MapPin, 
  Users, 
  TrendingDown, 
  Sliders, 
  CheckCircle, 
  HelpCircle, 
  ExternalLink,
  Zap,
  Building,
  UserX
} from 'lucide-react';

export default function OfficerPortal({ currentLang, triggerActionNotification }) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  // FDI Interactive Simulation Sliders
  const [sliderRainfall, setSliderRainfall] = useState(54); // 54% deficit
  const [sliderPriceDrop, setSliderPriceDrop] = useState(30); // 30% price drop
  const [sliderLoanPressure, setSliderLoanPressure] = useState(80); // 80% loan pressure
  const [sliderCropDamage, setSliderCropDamage] = useState(60); // 60% crop damage

  // Selected Taluk for Map View
  const [selectedTaluk, setSelectedTaluk] = useState(DISTRESS_TALUKS[0]);

  // Dynamic FDI Calculation Formula: (0.35*W) + (0.30*P) + (0.20*D) + (0.15*C)
  const computedFdi = Math.round(
    (0.35 * sliderRainfall) + 
    (0.30 * sliderPriceDrop) + 
    (0.20 * sliderLoanPressure) + 
    (0.15 * sliderCropDamage)
  );

  const getFdiBadge = (score) => {
    if (score >= 70) {
      return {
        label: '🚨 CRITICAL RED ALERT (>70)',
        bg: 'bg-rose-100 text-rose-800 border-rose-300',
        action: 'Mandatory District Collector & PMFBY Intervention'
      };
    } else if (score >= 40) {
      return {
        label: '🟡 MODERATE RISK (40-70)',
        bg: 'bg-amber-100 text-amber-800 border-amber-300',
        action: 'Proactive Extension Advisory & Price Support'
      };
    } else {
      return {
        label: '🟢 STABLE (<40)',
        bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        action: 'Normal Routine Monitoring'
      };
    }
  };

  const currentBadge = getFdiBadge(computedFdi);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Officer Command Header */}
      <div className="p-6 rounded-[18px] bg-gradient-to-r from-neutral-900 via-neutral-900 to-[#1d1d1f] text-white shadow-apple-product flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-full bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-400 text-2xl shadow-inner">
            🏛️
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold tracking-tight text-white">
                {t.officerDashboard}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                Official Admin Portal
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Jurisdiction: Yavatmal District & Marathwada Agri Zone • Connected to State Agri Disaster Registry
            </p>
          </div>
        </div>

        {/* Live Metrics Ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto">
          <div className="p-3 rounded-[12px] bg-white/5 border border-white/10 text-center">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Monitored</span>
            <span className="text-base font-bold text-white">14,280</span>
          </div>
          <div className="p-3 rounded-[12px] bg-rose-950/60 border border-rose-700/50 text-center">
            <span className="text-[10px] text-rose-300 uppercase tracking-wider block">Critical (FDI&gt;70)</span>
            <span className="text-base font-bold text-rose-400">979</span>
          </div>
          <div className="p-3 rounded-[12px] bg-emerald-950/60 border border-emerald-700/50 text-center">
            <span className="text-[10px] text-emerald-300 uppercase tracking-wider block">Resolved</span>
            <span className="text-base font-bold text-emerald-400">94.2%</span>
          </div>
          <div className="p-3 rounded-[12px] bg-blue-950/60 border border-blue-700/50 text-center">
            <span className="text-[10px] text-blue-300 uppercase tracking-wider block">PMFBY Claims</span>
            <span className="text-base font-bold text-blue-400">₹4.8 Cr</span>
          </div>
        </div>
      </div>

      {/* Grid: FDI Interactive Mathematical Simulator (Left) + Geo-Map Heatmap (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Section 1: Dynamic FDI Formula Simulator (Col 6) */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-[18px] apple-card-glass shadow-apple-product space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
                <Sliders size={18} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">
                  Dynamic FDI Risk Simulator (Mathematical Model)
                </h3>
                <p className="text-xs text-neutral-500">Live multi-signal predictive stress algorithm</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
              SIH Core Innovation
            </span>
          </div>

          {/* Mathematical Formula Display */}
          <div className="p-3.5 rounded-[12px] bg-[#f5f5f7] border border-black/[0.05] text-xs text-neutral-700 font-mono space-y-1">
            <div className="font-bold text-neutral-900">
              FDI = (0.35 × W_anomaly) + (0.30 × P_crash) + (0.20 × D_debt) + (0.15 × C_damage)
            </div>
            <p className="text-[11px] text-neutral-500 font-sans">
              Weighted composite index evaluating rainfall deficit, APMC price fall, KCC debt deadlines & crop damage.
            </p>
          </div>

          {/* Sliders for the 4 Signals */}
          <div className="space-y-4 pt-1">
            
            {/* Signal 1: Weather Anomaly */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-neutral-700">1. Rainfall Deficit / Drought Severity (Weight: 35%)</span>
                <span className="text-[#0066cc] font-bold">{sliderRainfall}% Deficit</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderRainfall}
                onChange={(e) => setSliderRainfall(Number(e.target.value))}
                className="w-full accent-[#0066cc] cursor-pointer h-2 bg-neutral-200 rounded-lg"
              />
            </div>

            {/* Signal 2: Mandi Price Crash */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-neutral-700">2. Mandi Price Crash below MSP (Weight: 30%)</span>
                <span className="text-amber-700 font-bold">{sliderPriceDrop}% Drop</span>
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

            {/* Signal 3: Debt / KCC Due Date Proximity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-neutral-700">3. KCC Loan Deadline & Debt Stress (Weight: 20%)</span>
                <span className="text-purple-700 font-bold">{sliderLoanPressure}% Pressure</span>
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

            {/* Signal 4: Crop Damage & Pest Spread */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-neutral-700">4. Crop Pest / Disease Damage Ratio (Weight: 15%)</span>
                <span className="text-rose-700 font-bold">{sliderCropDamage}% Infestation</span>
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

          {/* Computed FDI Score Output */}
          <div className="p-4 rounded-[16px] bg-gradient-to-br from-neutral-900 to-neutral-950 text-white space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-neutral-400 uppercase tracking-wider">Simulated FDI Score</span>
                <div className="text-4xl font-bold tracking-tight text-rose-400 mt-0.5">
                  {computedFdi} <span className="text-lg text-neutral-400 font-normal">/ 100</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentBadge.bg}`}>
                {currentBadge.label}
              </span>
            </div>

            <div className="pt-2 border-t border-white/10 text-xs text-neutral-300 flex items-center justify-between">
              <span><b>Auto-Trigger:</b> {currentBadge.action}</span>
              <button
                onClick={() => triggerActionNotification(`Simulation Triggered: Distress Score ${computedFdi} escalated to District Collectorate!`)}
                className="px-3 py-1 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold active:scale-95 transition-all"
              >
                Dispatch Test Batch
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Regional Taluk Heatmap (Col 6) */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-[18px] apple-card-glass shadow-apple-product space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0066cc] flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">
                  District Taluk Risk Heatmap
                </h3>
                <p className="text-xs text-neutral-500">Live monitoring of high-vulnerability rural clusters</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-100 text-neutral-700 border border-neutral-300">
              4 Taluks Online
            </span>
          </div>

          {/* Interactive Taluk Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DISTRESS_TALUKS.map((taluk) => {
              const isSelected = selectedTaluk.id === taluk.id;
              const isRed = taluk.status === 'RED_CRITICAL';
              const isAmber = taluk.status === 'AMBER_MODERATE';

              return (
                <div
                  key={taluk.id}
                  onClick={() => setSelectedTaluk(taluk)}
                  className={`p-4 rounded-[14px] border cursor-pointer transition-all ${
                    isSelected
                      ? 'ring-2 ring-[#0066cc] bg-white shadow-sm'
                      : 'bg-[#f5f5f7] border-black/[0.05] hover:bg-neutral-200/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#1d1d1f] line-clamp-1">{taluk.name}</span>
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      isRed ? 'bg-rose-500 animate-ping' : isAmber ? 'bg-amber-400' : 'bg-emerald-500'
                    }`}></span>
                  </div>

                  <div className="text-[11px] text-neutral-500 space-y-1">
                    <div className="flex justify-between">
                      <span>Distress Score (FDI):</span>
                      <span className={`font-bold ${isRed ? 'text-rose-600' : isAmber ? 'text-amber-700' : 'text-emerald-700'}`}>
                        {taluk.fdiScore}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Flagged Farmers:</span>
                      <span className="font-semibold text-neutral-800">{taluk.flaggedFarmersCount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Taluk Detailed Inspection */}
          <div className="p-4 rounded-[16px] bg-[#f5f5f7] border border-black/[0.05] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#1d1d1f]">{selectedTaluk.name} ({selectedTaluk.state})</h4>
                <p className="text-xs text-neutral-500">Officer In-Charge: {selectedTaluk.officerInCharge}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                selectedTaluk.status === 'RED_CRITICAL' 
                  ? 'bg-rose-100 text-rose-800 border border-rose-300' 
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                FDI: {selectedTaluk.fdiScore}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2 rounded bg-white border border-black/[0.04]">
                <span className="text-neutral-500 text-[10px] uppercase">Rainfall Anomaly</span>
                <p className="font-bold text-rose-600">{selectedTaluk.rainfallDeficit}% Deficit</p>
              </div>
              <div className="p-2 rounded bg-white border border-black/[0.04]">
                <span className="text-neutral-500 text-[10px] uppercase">Mandi Price Fall</span>
                <p className="font-bold text-amber-600">{selectedTaluk.mandiPriceCrash}% Drop</p>
              </div>
            </div>

            <div className="p-2.5 rounded-[10px] bg-rose-50 border border-rose-200 text-xs text-rose-900 font-medium">
              🚨 <b>Mandated Action:</b> {selectedTaluk.recommendedIntervention}
            </div>
          </div>
        </div>

      </div>

      {/* Section 3: Live Red-Flagged Farmers Queue & 1-Click Administrative Escalations */}
      <div className="p-6 sm:p-7 rounded-[18px] apple-card-glass shadow-apple-product space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/[0.06] gap-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">
                High-Distress Farmer Queue & 1-Click Administrative Actions
              </h3>
              <p className="text-xs text-neutral-500">Proactive relief dispatch prior to debt default</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            3 Urgent Cases Pending DAO Approval
          </span>
        </div>

        {/* Farmer Cards Queue */}
        <div className="space-y-4">
          {DISTRESSED_FARMERS_QUEUE.map((farmer) => (
            <div
              key={farmer.id}
              className="p-5 rounded-[16px] bg-[#f5f5f7] border border-black/[0.05] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 hover:bg-white transition-all"
            >
              {/* Farmer Info */}
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center space-x-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-mono font-bold bg-neutral-200 text-neutral-800">
                    {farmer.id}
                  </span>
                  <h4 className="text-base font-bold text-[#1d1d1f]">{farmer.name}</h4>
                  <span className="text-xs text-neutral-500">📍 {farmer.village}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700 font-medium">
                  <div>🌾 <b>Crop:</b> {farmer.crop}</div>
                  <div>🏦 <b>Debt Stress:</b> {farmer.kccLoanDue}</div>
                  <div>🌦️ <b>Weather:</b> {farmer.rainfallDeficit}</div>
                  <div>📉 <b>Market:</b> {farmer.priceDrop}</div>
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <span className="text-[11px] text-neutral-500 font-semibold">Matched Schemes:</span>
                  {farmer.matchedSchemes.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* FDI Score & 1-Click Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-end gap-3 shrink-0 w-full lg:w-auto">
                <div className="text-right">
                  <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Distress Index</span>
                  <span className="text-2xl font-bold text-rose-600">{farmer.fdiScore} / 100</span>
                </div>

                <div className="flex flex-wrap gap-2 w-full justify-end">
                  <button
                    onClick={() => triggerActionNotification(`⚡ PMFBY Claim Fast-Tracked for ${farmer.name} (Claim ID: #PMFBY-2026-9021)`)}
                    className="px-3 py-1.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold active:scale-95 transition-all shadow-sm flex items-center space-x-1"
                  >
                    <Zap size={13} />
                    <span>{t.triggerPmfby}</span>
                  </button>

                  <button
                    onClick={() => triggerActionNotification(`🏦 KCC Loan Moratorium order issued for ${farmer.name} to SBI Ghatanji!`)}
                    className="px-3 py-1.5 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold active:scale-95 transition-all shadow-sm flex items-center space-x-1"
                  >
                    <Building size={13} />
                    <span>{t.kccMoratorium}</span>
                  </button>

                  <button
                    onClick={() => triggerActionNotification(`🚜 KVK Extension Worker dispatched to ${farmer.village} for on-site assessment!`)}
                    className="px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold active:scale-95 transition-all shadow-sm flex items-center space-x-1"
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

      {/* Section 4: Government Welfare Scheme Directory */}
      <div className="p-6 sm:p-7 rounded-[18px] apple-card-glass shadow-apple-product space-y-6">
        <div className="flex items-center space-x-2.5 pb-4 border-b border-black/[0.06]">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <FileCheck size={18} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">
              {t.matchedSchemes}
            </h3>
            <p className="text-xs text-neutral-500">Official welfare integration & direct benefit transfer routing</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {GOVT_SCHEMES.map((scheme) => (
            <div key={scheme.id} className="p-4 rounded-[14px] bg-[#f5f5f7] border border-black/[0.05] space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-[#0066cc]">
                  {scheme.tag}
                </span>
                <span className="text-xs font-mono text-neutral-500">{scheme.directLink}</span>
              </div>
              <h4 className="font-bold text-sm text-[#1d1d1f]">{scheme.name}</h4>
              <p className="text-xs text-neutral-600 leading-snug">{scheme.benefit}</p>
              <div className="p-2 rounded bg-white border border-black/[0.04] text-xs">
                <span className="text-neutral-500 text-[10px] block uppercase">Direct Entitlement:</span>
                <span className="font-semibold text-emerald-700">{scheme.coverageAmount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
