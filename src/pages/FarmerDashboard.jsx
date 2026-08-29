import React, { useState } from 'react';
import { 
  Scan, 
  MessageSquareText, 
  TrendingUp, 
  CloudSun, 
  AlertTriangle, 
  ChevronRight, 
  Leaf, 
  Building,
  Building2,
  Droplets,
  Calendar,
  Sparkles,
  Activity,
  ShieldCheck,
  ArrowRight,
  CreditCard,
  Edit3,
  X,
  CheckCircle2
} from 'lucide-react';
import { 
  CURRENT_FARMER_PROFILE, 
  CROPS_MARKET_DATA, 
  WEATHER_FORECAST_DATA 
} from '../data/mockAgriData';
import { TRANSLATIONS } from '../data/translations';
import AppleSelect from '../components/AppleSelect';

export default function FarmerDashboard({ onNavigate, currentLang, currentUser }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const farmer = currentUser || CURRENT_FARMER_PROFILE;
  const mandiSummary = CROPS_MARKET_DATA.Rice;

  const activeCropsList = farmer.activeCrops || CURRENT_FARMER_PROFILE.activeCrops;

  // --- Dynamic Loan Details State (Interactive User Input) ---
  const [loanDetails, setLoanDetails] = useState({
    hasLoan: true,
    loanType: 'Kisan Credit Card (KCC) Crop Loan',
    bankName: 'State Bank of India (Yavatmal Main)',
    amount: '1,50,000',
    dueDate: '2026-09-10' // 12 days from Aug 29
  });

  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [tempLoanDetails, setTempLoanDetails] = useState(loanDetails);

  // --- Dynamic Loan Metric Calculation ---
  const calculateLoanMetrics = () => {
    if (!loanDetails.hasLoan || loanDetails.loanType === 'None') {
      return {
        score: 0,
        label: 'No Active Loan (0%)',
        statusDesc: 'No active debt liability on farm',
        colorClass: 'text-emerald-400',
        barClass: 'bg-emerald-400',
        barWidth: '0%'
      };
    }

    const today = new Date('2026-08-29');
    const due = new Date(loanDetails.dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        score: 100,
        label: `Overdue by ${Math.abs(diffDays)} Days (High Distress)`,
        statusDesc: `Immediate DAO debt subvention alert triggered`,
        colorClass: 'text-rose-400',
        barClass: 'bg-rose-500',
        barWidth: '100%'
      };
    } else if (diffDays <= 7) {
      return {
        score: 85,
        label: `Due in ${diffDays} Days (Critical Alert)`,
        statusDesc: `Repayment deadline within 7 days`,
        colorClass: 'text-rose-400',
        barClass: 'bg-rose-400',
        barWidth: '85%'
      };
    } else if (diffDays <= 15) {
      return {
        score: 60,
        label: `Due in ${diffDays} Days (Approaching)`,
        statusDesc: `Repayment deadline approaching`,
        colorClass: 'text-amber-400',
        barClass: 'bg-amber-400',
        barWidth: '60%'
      };
    } else if (diffDays <= 30) {
      return {
        score: 30,
        label: `Due in ${diffDays} Days (Watch Stage)`,
        statusDesc: `Upcoming monthly repayment schedule`,
        colorClass: 'text-amber-300',
        barClass: 'bg-amber-300',
        barWidth: '30%'
      };
    } else {
      return {
        score: 10,
        label: `Due in ${diffDays} Days (Safe Window)`,
        statusDesc: `Adequate liquidity window available`,
        colorClass: 'text-emerald-400',
        barClass: 'bg-emerald-400',
        barWidth: '10%'
      };
    }
  };

  const loanMetrics = calculateLoanMetrics();

  // --- Predictive Distress-Risk Scorer (Dynamic 3-Signal Model) ---
  const rainDeviationScore = 35;
  const priceFallScore = 15;
  const loanProximityScore = loanMetrics.score;
  
  const computedDistressScore = Math.round(
    (0.40 * rainDeviationScore) + 
    (0.35 * priceFallScore) + 
    (0.25 * loanProximityScore)
  );

  const getRiskBadge = (score) => {
    if (score < 40) return { label: '🟢 Low Risk (Safe)', bg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' };
    if (score < 70) return { label: '🟡 Moderate Watch', bg: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    return { label: '🔴 High Distress Alert', bg: 'bg-rose-500/20 text-rose-400 border-rose-500/30' };
  };

  const riskBadge = getRiskBadge(computedDistressScore);

  const handleSaveLoanDetails = (e) => {
    e.preventDefault();
    setLoanDetails(tempLoanDetails);
    setIsLoanModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in text-[#1d1d1f]">
      
      {/* 1. Apple Style Welcome Card */}
      <div className="p-6 sm:p-7 rounded-[22px] bg-white border border-[#d2d2d7]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={farmer.avatar || CURRENT_FARMER_PROFILE.avatar}
            alt={farmer.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                {t.welcome}, {farmer.name?.split(' ')[0]}! 🌾
              </h2>
            </div>
            <p className="text-xs text-[#86868b] mt-0.5 font-normal">
              📍 {farmer.village || 'Ghatanji'}, {farmer.district || farmer.taluk || 'Yavatmal'}, {farmer.state || 'Maharashtra'} • {t.landHolding}: {farmer.landSize || '4.2 Acres'} • {t.soilType}: {farmer.soilType || 'Black Clay Loam'}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('schemes')}
          className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium tracking-tight active:scale-95 transition-all shadow-sm flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Building2 size={15} />
          <span>Govt Schemes Portal</span>
        </button>
      </div>

      {/* 2. Predictive Distress-Risk Scorer (Apple Dark Tile 1 with Dynamic Loan Input) */}
      <div className="p-6 sm:p-7 rounded-[22px] bg-[#1d1d1f] text-white shadow-[0_4px_20px_rgba(0,0,0,0.12)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 text-[#2997ff] flex items-center justify-center border border-white/15">
              <Activity size={18} />
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-white flex items-center gap-2">
                Predictive Farm Distress-Risk Telemetry
              </h3>
              <p className="text-[11px] text-[#86868b]">
                Automated multi-signal model combining rainfall anomaly, mandi spot prices, and dynamic loan due-date proximity
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${riskBadge.bg}`}>
              {riskBadge.label} ({computedDistressScore} / 100)
            </span>
          </div>
        </div>

        {/* 3 Weighted Signal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          {/* Signal 1: Rainfall Deviation */}
          <div className="p-3.5 rounded-[16px] bg-white/5 border border-white/10 space-y-1.5">
            <div className="flex justify-between text-[11px] text-[#86868b]">
              <span>🌧️ Rainfall Deviation (40%):</span>
              <span className="text-[#2997ff] font-semibold">-18% Normal</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#2997ff] h-full w-[35%]"></div>
            </div>
            <span className="text-[10px] text-[#86868b] block">Soil moisture adequate for vegetative growth</span>
          </div>

          {/* Signal 2: Mandi Price vs MSP */}
          <div className="p-3.5 rounded-[16px] bg-white/5 border border-white/10 space-y-1.5">
            <div className="flex justify-between text-[11px] text-[#86868b]">
              <span>📉 Mandi Price vs MSP (35%):</span>
              <span className="text-emerald-400 font-semibold">+₹270 Above MSP</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full w-[15%]"></div>
            </div>
            <span className="text-[10px] text-[#86868b] block">Healthy market realization across APMCs</span>
          </div>

          {/* Signal 3: Dynamic Loan Due Proximity (Interactive User Managed) */}
          <div 
            onClick={() => {
              setTempLoanDetails(loanDetails);
              setIsLoanModalOpen(true);
            }}
            className="p-3.5 rounded-[16px] bg-white/5 border border-white/10 hover:border-[#2997ff]/50 cursor-pointer transition-all space-y-1.5 group relative"
            title="Click to update loan due date & details"
          >
            <div className="flex justify-between text-[11px] text-[#86868b]">
              <span className="flex items-center gap-1">
                💳 Loan Proximity (25%):
              </span>
              <span className={`font-semibold ${loanMetrics.colorClass}`}>
                {loanMetrics.label}
              </span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div className={`${loanMetrics.barClass} h-full transition-all duration-500`} style={{ width: loanMetrics.barWidth }}></div>
            </div>
            <div className="flex justify-between items-center text-[10px]">
              <span className="text-[#86868b] truncate max-w-[170px]">{loanMetrics.statusDesc}</span>
              <span className="text-[#2997ff] font-medium underline flex items-center gap-0.5">
                <Edit3 size={10} /> Edit Loan
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Five Apple Utility Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        <div
          onClick={() => onNavigate('detect')}
          className="p-5 rounded-[20px] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3]/40 shadow-xs cursor-pointer active:scale-95 transition-all space-y-2.5 group apple-card-hover animate-apple-in delay-1"
        >
          <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] text-[#0071e3] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Scan size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{t.scanLeafTitle}</h3>
            <p className="text-[11px] text-[#6e6e73] leading-snug mt-0.5">{t.scanLeafDesc}</p>
          </div>
        </div>

        <div
          onClick={() => onNavigate('chat')}
          className="p-5 rounded-[20px] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3]/40 shadow-xs cursor-pointer active:scale-95 transition-all space-y-2.5 group apple-card-hover animate-apple-in delay-2"
        >
          <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] text-[#0071e3] flex items-center justify-center group-hover:scale-110 transition-transform">
            <MessageSquareText size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{t.askAiTitle}</h3>
            <p className="text-[11px] text-[#6e6e73] leading-snug mt-0.5">{t.askAiDesc}</p>
          </div>
        </div>

        <div
          onClick={() => onNavigate('market')}
          className="p-5 rounded-[20px] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3]/40 shadow-xs cursor-pointer active:scale-95 transition-all space-y-2.5 group apple-card-hover animate-apple-in delay-3"
        >
          <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] text-[#0071e3] flex items-center justify-center group-hover:scale-110 transition-transform">
            <TrendingUp size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{t.mandiRadarTitle}</h3>
            <p className="text-[11px] text-[#6e6e73] leading-snug mt-0.5">{t.mandiRadarDesc}</p>
          </div>
        </div>

        <div
          onClick={() => onNavigate('weather')}
          className="p-5 rounded-[20px] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3]/40 shadow-xs cursor-pointer active:scale-95 transition-all space-y-2.5 group apple-card-hover animate-apple-in delay-4"
        >
          <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] text-[#0071e3] flex items-center justify-center group-hover:scale-110 transition-transform">
            <CloudSun size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{t.weatherTitle}</h3>
            <p className="text-[11px] text-[#6e6e73] leading-snug mt-0.5">{t.weatherDesc}</p>
          </div>
        </div>

        <div
          onClick={() => onNavigate('schemes')}
          className="p-5 rounded-[20px] bg-white border border-[#d2d2d7]/60 hover:border-[#0071e3]/40 shadow-xs cursor-pointer active:scale-95 transition-all space-y-2.5 group apple-card-hover animate-apple-in delay-5"
        >
          <div className="w-10 h-10 rounded-xl bg-[#f5f5f7] text-[#0071e3] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Building2 size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{t.schemesTitle}</h3>
            <p className="text-[11px] text-[#6e6e73] leading-snug mt-0.5">{t.schemesDesc}</p>
          </div>
        </div>

      </div>

      {/* 4. Live Mandi & Hyperlocal Weather Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Col: Mandi Price Live Preview */}
        <div className="p-6 rounded-[22px] bg-white border border-[#d2d2d7]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-[#1d1d1f]">Live Mandi Snapshot ({farmer.district || 'Yavatmal'} APMC)</h3>
              <p className="text-xs text-[#86868b]">Daily spot pricing feed from data.gov.in AGMARKNET</p>
            </div>
            <button
              onClick={() => onNavigate('market')}
              className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Full Radar <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(CROPS_MARKET_DATA).slice(0, 3).map(([key, item]) => (
              <div key={key} className="p-3.5 rounded-[16px] bg-[#f5f5f7] border border-[#d2d2d7]/50 space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold text-[#1d1d1f]">{key}</span>
                  <span className="text-xs font-bold text-emerald-600">{item.change}</span>
                </div>
                <div className="text-base font-bold text-[#1d1d1f]">
                  ₹{item.currentPrice} <span className="text-[10px] text-[#86868b] font-normal">/ Qtl</span>
                </div>
                <div className="text-[10px] text-[#6e6e73]">
                  MSP: ₹{item.msp} • {item.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Weather Advisory */}
        <div className="p-6 rounded-[22px] bg-white border border-[#d2d2d7]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[#1d1d1f] flex items-center gap-2">
                <CloudSun size={18} className="text-amber-500" />
                {farmer.district || 'Yavatmal'} Weather
              </h3>
              <button
                onClick={() => onNavigate('weather')}
                className="text-xs font-semibold text-[#0071e3] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Hourly Strip <ChevronRight size={14} />
              </button>
            </div>

            <div className="p-4 rounded-[16px] bg-[#f5f5f7] flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-[#1d1d1f]">{WEATHER_FORECAST_DATA?.currentTemp || '28°C'}</span>
                <p className="text-xs text-[#6e6e73]">{WEATHER_FORECAST_DATA?.condition || 'Partly Cloudy'}</p>
              </div>
              <div className="text-right text-xs text-[#6e6e73] space-y-0.5">
                <p>💧 Humidity: {WEATHER_FORECAST_DATA?.humidity || '72%'}</p>
                <p>💨 Wind: {WEATHER_FORECAST_DATA?.windSpeed || '14 km/h'}</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-[14px] bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <span className="font-semibold block">🌾 Hyperlocal Advisory:</span>
            <p className="text-[11px] leading-snug">{WEATHER_FORECAST_DATA?.hyperlocalAdvisory || 'Optimal soil moisture for vegetative growth.'}</p>
          </div>
        </div>

      </div>

      {/* 5. Interactive Loan Details & Due Date Modal */}
      {isLoanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-[26px] p-6 sm:p-8 shadow-2xl space-y-4 border border-[#d2d2d7]/60">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
              <div className="flex items-center space-x-2">
                <CreditCard size={20} className="text-[#0071e3]" />
                <h3 className="text-base font-semibold text-[#1d1d1f]">
                  Manage Agri Loan & Due Date
                </h3>
              </div>
              <button
                onClick={() => setIsLoanModalOpen(false)}
                className="text-[#86868b] hover:text-[#1d1d1f] cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#6e6e73]">
              Update your crop loan details to keep the <strong>Predictive Distress-Risk Scorer</strong> accurate and enable automated subsidy routing from your local agriculture officer.
            </p>

            <form onSubmit={handleSaveLoanDetails} className="space-y-3.5 text-xs text-left">
              
              {/* Active Loan Toggle */}
              <div className="flex items-center justify-between p-3 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/60">
                <span className="font-semibold text-[#1d1d1f]">Do you have an active agricultural loan?</span>
                <button
                  type="button"
                  onClick={() => setTempLoanDetails(prev => ({ ...prev, hasLoan: !prev.hasLoan }))}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    tempLoanDetails.hasLoan ? 'bg-[#0071e3] text-white' : 'bg-[#e8e8ed] text-[#86868b]'
                  }`}
                >
                  {tempLoanDetails.hasLoan ? 'Yes (Active Loan)' : 'No (Debt Free)'}
                </button>
              </div>

              {tempLoanDetails.hasLoan && (
                <>
                  {/* Loan Type Selector */}
                  <div className="space-y-1">
                    <label className="font-semibold text-[#1d1d1f]">Loan Category / Type *</label>
                    <AppleSelect
                      options={[
                        'Kisan Credit Card (KCC) Crop Loan',
                        'Tractor / Farm Mechanization Loan',
                        'Solar Pump Subsidy Loan (PM-KUSUM)',
                        'Self-Help Group (SHG) Agri Loan',
                        'Land Development / Irrigation Loan'
                      ]}
                      value={tempLoanDetails.loanType}
                      onChange={(val) => setTempLoanDetails(prev => ({ ...prev, loanType: val }))}
                      icon={CreditCard}
                    />
                  </div>

                  {/* Lending Bank */}
                  <div className="space-y-1">
                    <label className="font-semibold text-[#1d1d1f]">Lending Bank / Cooperative Society *</label>
                    <input
                      type="text"
                      required
                      value={tempLoanDetails.bankName}
                      onChange={(e) => setTempLoanDetails(prev => ({ ...prev, bankName: e.target.value }))}
                      placeholder="e.g. State Bank of India, Gramin Bank, PACS Cooperative"
                      className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 font-medium focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none"
                    />
                  </div>

                  {/* Loan Amount & Repayment Due Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-[#1d1d1f]">Outstanding Amount (₹) *</label>
                      <input
                        type="text"
                        required
                        value={tempLoanDetails.amount}
                        onChange={(e) => setTempLoanDetails(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="e.g. 1,50,000"
                        className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 font-medium focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-[#1d1d1f]">Repayment Due Date *</label>
                      <input
                        type="date"
                        required
                        value={tempLoanDetails.dueDate}
                        onChange={(e) => setTempLoanDetails(prev => ({ ...prev, dueDate: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 font-medium focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#f0f0f0]">
                <button
                  type="button"
                  onClick={() => setIsLoanModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-[#f5f5f7] text-[#1d1d1f] font-medium hover:bg-[#e8e8ed] transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium transition-all shadow-sm flex items-center space-x-1 cursor-pointer"
                >
                  <CheckCircle2 size={14} />
                  <span>Save & Recalculate Risk</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
