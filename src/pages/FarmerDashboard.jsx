import React, { useState } from 'react';
import { 
  Scan, 
  MessageSquareText, 
  TrendingUp, 
  CloudSun, 
  AlertTriangle, 
  ChevronRight, 
  Leaf, 
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
  CheckCircle2,
  Wind,
  Compass,
  ArrowUpRight,
  TrendingDown,
  Clock,
  MapPin,
  ExternalLink
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
        label: 'No Active Debt (0%)',
        statusDesc: 'No active repayment liability on farm',
        colorClass: 'text-emerald-400',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        barClass: 'from-emerald-400 to-teal-400',
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
        label: `Overdue by ${Math.abs(diffDays)} Days`,
        statusDesc: `Immediate DAO debt subvention alert triggered`,
        colorClass: 'text-rose-400',
        badgeBg: 'bg-rose-500/25 text-rose-300 border-rose-500/40',
        barClass: 'from-rose-500 to-red-600',
        barWidth: '100%'
      };
    } else if (diffDays <= 7) {
      return {
        score: 85,
        label: `Due in ${diffDays} Days`,
        statusDesc: `Repayment deadline within 7 days`,
        colorClass: 'text-rose-400',
        badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        barClass: 'from-rose-500 to-amber-500',
        barWidth: '85%'
      };
    } else if (diffDays <= 15) {
      return {
        score: 60,
        label: `Due in ${diffDays} Days`,
        statusDesc: `Repayment deadline approaching`,
        colorClass: 'text-amber-400',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        barClass: 'from-amber-400 to-yellow-500',
        barWidth: '60%'
      };
    } else if (diffDays <= 30) {
      return {
        score: 30,
        label: `Due in ${diffDays} Days`,
        statusDesc: `Upcoming monthly repayment cycle`,
        colorClass: 'text-amber-300',
        badgeBg: 'bg-amber-500/15 text-amber-200 border-amber-500/25',
        barClass: 'from-emerald-400 to-amber-400',
        barWidth: '30%'
      };
    } else {
      return {
        score: 10,
        label: `Due in ${diffDays} Days`,
        statusDesc: `Adequate liquidity buffer available`,
        colorClass: 'text-emerald-400',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        barClass: 'from-emerald-400 to-teal-400',
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
    if (score < 40) return { label: 'Low Risk (Safe)', bg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', ring: 'border-emerald-500', dot: 'bg-emerald-400' };
    if (score < 70) return { label: 'Moderate Watch', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/30', ring: 'border-amber-500', dot: 'bg-amber-400' };
    return { label: 'Critical Distress', bg: 'bg-rose-500/20 text-rose-300 border-rose-500/30', ring: 'border-rose-500', dot: 'bg-rose-400' };
  };

  const riskBadge = getRiskBadge(computedDistressScore);

  const handleSaveLoanDetails = (e) => {
    e.preventDefault();
    setLoanDetails(tempLoanDetails);
    setIsLoanModalOpen(false);
  };

  // Quick Services Catalog (Apple Control Center Style)
  const quickServices = [
    {
      id: 'detect',
      title: t.scanLeafTitle,
      subtitle: t.scanLeafDesc,
      icon: Scan,
      gradient: 'from-emerald-500 to-teal-600',
      shadowColor: 'shadow-emerald-500/20',
      badge: 'AI Vision'
    },
    {
      id: 'chat',
      title: t.askAiTitle,
      subtitle: t.askAiDesc,
      icon: MessageSquareText,
      gradient: 'from-indigo-500 to-purple-600',
      shadowColor: 'shadow-indigo-500/20',
      badge: 'Voice NLP'
    },
    {
      id: 'market',
      title: t.mandiRadarTitle,
      subtitle: t.mandiRadarDesc,
      icon: TrendingUp,
      gradient: 'from-[#0071e3] to-[#0051a8]',
      shadowColor: 'shadow-blue-500/20',
      badge: 'Live APMC'
    },
    {
      id: 'weather',
      title: t.weatherTitle,
      subtitle: t.weatherDesc,
      icon: CloudSun,
      gradient: 'from-amber-500 to-orange-600',
      shadowColor: 'shadow-amber-500/20',
      badge: 'Hyperlocal'
    },
    {
      id: 'schemes',
      title: t.schemesTitle,
      subtitle: t.schemesDesc,
      icon: Building2,
      gradient: 'from-cyan-600 to-blue-700',
      shadowColor: 'shadow-cyan-500/20',
      badge: 'Subsidies'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7 animate-apple-fade text-[#1d1d1f]">
      
      {/* 1. Apple Hero Welcome Bar (Frosted Glass with Personal Intelligence Vibe) */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-[28px] bg-white/90 backdrop-blur-xl border border-[#d2d2d7]/70 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-apple-in">
        
        {/* Soft Ambient Background Glow */}
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#0071e3]/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

        <div className="flex items-center space-x-4 sm:space-x-5 relative z-10">
          <div className="relative">
            <img
              src={farmer.avatar || CURRENT_FARMER_PROFILE.avatar}
              alt={farmer.name}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-[22px] object-cover border-2 border-white shadow-md ring-2 ring-[#0071e3]/20"
            />
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold shadow-xs">
              ✓
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">
                {t.welcome}, {farmer.name?.split(' ')[0] || 'Farmer'}! 🌾
              </h1>
            </div>
            
            {/* Metadata Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#6e6e73]">
              <span className="px-2.5 py-0.5 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/60 font-medium text-[#1d1d1f] flex items-center gap-1">
                <MapPin size={11} className="text-[#0071e3]" />
                {farmer.village || 'Ghatanji'}, {farmer.district || farmer.taluk || 'Yavatmal'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/60 font-medium">
                🚜 {t.landHolding}: <strong className="text-[#1d1d1f]">{farmer.landSize || '4.2 Acres'}</strong>
              </span>
              <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/60 font-medium">
                🌱 {farmer.soilType || 'Black Clay Loam'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2.5 self-start sm:self-auto relative z-10 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('profile')}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-xs font-semibold border border-[#d2d2d7]/70 transition-all cursor-pointer text-center"
          >
            {t.editProfile}
          </button>

          <button
            onClick={() => onNavigate('schemes')}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white text-xs font-semibold shadow-xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <Building2 size={14} />
            <span>Govt Schemes Portal</span>
          </button>
        </div>
      </div>

      {/* 2. Predictive Farm Distress-Risk Telemetry (Apple Deep Midnight Titanium Pod) */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-[30px] bg-gradient-to-br from-[#1c1c1e] via-[#242426] to-[#161618] text-white shadow-[0_16px_40px_rgba(0,0,0,0.25)] border border-white/10 space-y-6 animate-apple-in">
        
        {/* Glow Spheres */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#0071e3]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Telemetry Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-start sm:items-center space-x-3">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#0071e3] to-[#0051a8] text-white flex items-center justify-center shadow-lg shadow-blue-500/30 shrink-0 border border-white/20">
              <Activity size={20} className="animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-semibold tracking-tight text-white">
                  Predictive Farm Distress-Risk Telemetry
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white/80 border border-white/10 uppercase tracking-wider">
                  Live FDI Model
                </span>
              </div>
              <p className="text-xs text-[#86868b] mt-0.5">
                Multi-signal algorithm synthesizing rainfall deficit, APMC mandi spot prices, and crop loan due proximity
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto shrink-0">
            <div className={`px-3.5 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md flex items-center space-x-2 ${riskBadge.bg}`}>
              <span className={`w-2 h-2 rounded-full ${riskBadge.dot} animate-pulse`} />
              <span>{riskBadge.label} ({computedDistressScore}/100)</span>
            </div>
          </div>
        </div>

        {/* 3 Telemetry Signal Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Signal 1: Rainfall Deviation */}
          <div className="p-4 sm:p-5 rounded-[22px] bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 backdrop-blur-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white/80 flex items-center gap-1.5">
                🌧️ Rainfall Variance
              </span>
              <span className="text-[11px] font-bold text-[#2997ff] px-2 py-0.5 rounded-md bg-[#2997ff]/15 border border-[#2997ff]/20">
                -18% Normal
              </span>
            </div>
            
            <div className="space-y-1.5">
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden p-0.5">
                <div className="bg-gradient-to-r from-[#2997ff] to-[#0071e3] h-full rounded-full w-[35%]" />
              </div>
              <div className="flex justify-between text-[10px] text-[#86868b]">
                <span>Weight: 40%</span>
                <span className="text-white/70">Optimal moisture</span>
              </div>
            </div>

            <p className="text-[11px] text-[#86868b] leading-relaxed">
              Soil moisture is adequate for current vegetative growth cycle.
            </p>
          </div>

          {/* Signal 2: Mandi Realization vs MSP */}
          <div className="p-4 sm:p-5 rounded-[22px] bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 backdrop-blur-md transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white/80 flex items-center gap-1.5">
                📉 Mandi vs MSP Floor
              </span>
              <span className="text-[11px] font-bold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/20">
                +₹270 Premium
              </span>
            </div>
            
            <div className="space-y-1.5">
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden p-0.5">
                <div className="bg-gradient-to-r from-emerald-400 to-teal-400 h-full rounded-full w-[15%]" />
              </div>
              <div className="flex justify-between text-[10px] text-[#86868b]">
                <span>Weight: 35%</span>
                <span className="text-emerald-400">Above MSP</span>
              </div>
            </div>

            <p className="text-[11px] text-[#86868b] leading-relaxed">
              Healthy market spot price realization across regional APMC yards.
            </p>
          </div>

          {/* Signal 3: Dynamic Loan Due Proximity (Interactive Card) */}
          <div 
            onClick={() => {
              setTempLoanDetails(loanDetails);
              setIsLoanModalOpen(true);
            }}
            className="p-4 sm:p-5 rounded-[22px] bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-[#2997ff]/50 backdrop-blur-md transition-all space-y-3 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white/80 flex items-center gap-1.5">
                💳 Crop Loan Timeline
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${loanMetrics.badgeBg}`}>
                {loanMetrics.label}
              </span>
            </div>
            
            <div className="space-y-1.5">
              <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden p-0.5">
                <div className={`bg-gradient-to-r ${loanMetrics.barClass} h-full rounded-full transition-all duration-500`} style={{ width: loanMetrics.barWidth }} />
              </div>
              <div className="flex justify-between text-[10px] text-[#86868b]">
                <span>Weight: 25%</span>
                <span className={loanMetrics.colorClass}>{loanDetails.bankName?.split(' ')[0] || 'KCC Loan'}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] pt-0.5">
              <span className="text-[#86868b] truncate max-w-[150px]">{loanMetrics.statusDesc}</span>
              <span className="text-[#2997ff] font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                <Edit3 size={11} /> Update
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Five Quick Action Service Cards (Apple iOS Control Center Squircles) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
            {t.quickActions}
          </span>
          <span className="text-xs text-[#0071e3] font-medium">
            5 AI Services Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {quickServices.map((service, idx) => {
            const IconComp = service.icon;

            return (
              <div
                key={service.id}
                onClick={() => onNavigate(service.id)}
                className={`p-5 rounded-[24px] bg-white border border-[#d2d2d7]/70 hover:border-[#0071e3]/40 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-lg cursor-pointer active:scale-95 transition-all duration-200 space-y-3.5 group apple-card-hover animate-apple-in delay-${idx + 1} flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-[16px] bg-gradient-to-br ${service.gradient} text-white flex items-center justify-center shadow-md ${service.shadowColor} group-hover:scale-105 transition-transform`}>
                      <IconComp size={22} />
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#f5f5f7] text-[#6e6e73] group-hover:bg-[#0071e3]/10 group-hover:text-[#0071e3] transition-colors">
                      {service.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[15px] text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors flex items-center justify-between">
                      <span>{service.title}</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#0071e3]" />
                    </h3>
                    <p className="text-xs text-[#86868b] leading-relaxed mt-1 line-clamp-2">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#f5f5f7] flex items-center justify-between text-xs text-[#0071e3] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Open Service</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Live Mandi & Hyperlocal Weather Grid (Apple Stocks & Weather Tile Duo) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Col: Apple Stocks Style Live Mandi Snapshot */}
        <div className="p-6 sm:p-7 rounded-[26px] bg-white border border-[#d2d2d7]/70 shadow-[0_4px_16px_rgba(0,0,0,0.03)] space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
              <div>
                <span className="text-[10px] font-semibold uppercase text-[#86868b] tracking-wider block">
                  APMC Spot Radar
                </span>
                <h3 className="text-lg font-semibold text-[#1d1d1f]">
                  Live Mandi Snapshot ({farmer.district || 'Yavatmal'} APMC)
                </h3>
              </div>
              <button
                onClick={() => onNavigate('market')}
                className="px-3.5 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#0071e3] text-[#0071e3] hover:text-white text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Full Radar</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {/* 3 Commodity Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(CROPS_MARKET_DATA).slice(0, 3).map(([key, item]) => {
                const isPositive = item.change.startsWith('+');

                return (
                  <div 
                    key={key} 
                    onClick={() => onNavigate('market')}
                    className="p-4 rounded-[18px] bg-[#f5f5f7]/70 hover:bg-[#f5f5f7] border border-[#d2d2d7]/50 transition-all space-y-2 cursor-pointer group"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">{key}</span>
                      <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                        isPositive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {item.change}
                      </span>
                    </div>

                    <div>
                      <div className="text-lg font-bold text-[#1d1d1f]">
                        ₹{item.currentPrice.toLocaleString()}
                        <span className="text-[10px] text-[#86868b] font-normal ml-0.5">/ Qtl</span>
                      </div>
                      <div className="text-[10px] text-[#86868b] mt-0.5">
                        MSP: ₹{item.msp}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3.5 rounded-[16px] bg-[#f5f5f7] border border-[#d2d2d7]/50 flex items-center justify-between text-xs">
            <span className="text-[#6e6e73] font-medium">💡 Compare nearby mandis with transport costs</span>
            <button
              onClick={() => onNavigate('market')}
              className="text-[#0071e3] font-semibold hover:underline cursor-pointer"
            >
              View Comparison →
            </button>
          </div>
        </div>

        {/* Right Col: Apple Weather Tile with Sky Glow */}
        <div className="p-6 sm:p-7 rounded-[26px] bg-gradient-to-br from-[#0071e3] via-[#0062c4] to-[#004f9f] text-white shadow-[0_12px_32px_rgba(0,113,227,0.22)] space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/15">
              <div>
                <span className="text-[10px] font-semibold uppercase text-white/70 tracking-wider block">
                  Hyperlocal Station
                </span>
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <CloudSun size={20} className="text-amber-300" />
                  {farmer.district || 'Yavatmal'} Weather
                </h3>
              </div>

              <button
                onClick={() => onNavigate('weather')}
                className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>5-Day Forecast</span>
                <ChevronRight size={13} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
                  {WEATHER_FORECAST_DATA?.currentTemp || '28°C'}
                </div>
                <p className="text-sm text-white/80 font-medium mt-1">
                  {WEATHER_FORECAST_DATA?.condition || 'Partly Cloudy with Humidity Spike'}
                </p>
              </div>

              <div className="space-y-1.5 text-right text-xs text-white/80">
                <div className="flex items-center justify-end space-x-1.5">
                  <Droplets size={13} className="text-sky-300" />
                  <span>Humidity: <strong>{WEATHER_FORECAST_DATA?.humidity || '72%'}</strong></span>
                </div>
                <div className="flex items-center justify-end space-x-1.5">
                  <Wind size={13} className="text-sky-200" />
                  <span>Wind: <strong>{WEATHER_FORECAST_DATA?.windSpeed || '14 km/h SW'}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* Frosted Advisory Capsule */}
          <div className="p-4 rounded-[18px] bg-white/15 backdrop-blur-xl border border-white/20 text-xs text-white space-y-1">
            <span className="font-semibold flex items-center gap-1 text-amber-200">
              ⚡ Agronomy Action Advisory:
            </span>
            <p className="text-[11px] text-white/90 leading-relaxed">
              {WEATHER_FORECAST_DATA?.hyperlocalAdvisory || 'Significant rain expected within 24h. Postpone foliar spraying & ensure soil drainage.'}
            </p>
          </div>
        </div>

      </div>

      {/* 5. Interactive Loan Details & Due Date Modal (Apple Glass Sheet) */}
      {isLoanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-apple-fade">
          <div className="relative w-full max-w-lg bg-white rounded-[28px] p-6 sm:p-8 shadow-2xl space-y-5 border border-[#d2d2d7]/70 animate-apple-scale">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-[14px] bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#1d1d1f]">
                    Manage Crop Loan & Due Date
                  </h3>
                  <p className="text-[11px] text-[#86868b]">
                    Calibrate the Predictive Farm Distress Scorer
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsLoanModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#86868b] hover:text-[#1d1d1f] flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-[#6e6e73] leading-relaxed">
              Keep your crop loan due dates updated so the AI can track debt stress accurately and trigger priority PMFBY crop insurance claims if weather disasters occur.
            </p>

            <form onSubmit={handleSaveLoanDetails} className="space-y-4 text-xs text-left">
              
              {/* Active Loan Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-[16px] bg-[#f5f5f7] border border-[#d2d2d7]/60">
                <span className="font-semibold text-[#1d1d1f]">Do you have an active agricultural loan?</span>
                <button
                  type="button"
                  onClick={() => setTempLoanDetails(prev => ({ ...prev, hasLoan: !prev.hasLoan }))}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    tempLoanDetails.hasLoan ? 'bg-[#0071e3] text-white shadow-xs' : 'bg-[#e8e8ed] text-[#86868b]'
                  }`}
                >
                  {tempLoanDetails.hasLoan ? 'Yes (Active Loan)' : 'No (Debt Free)'}
                </button>
              </div>

              {tempLoanDetails.hasLoan && (
                <>
                  {/* Loan Type Selector with AppleSelect */}
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#1d1d1f]">Loan Category / Scheme *</label>
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
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#1d1d1f]">Lending Bank / Cooperative Society *</label>
                    <input
                      type="text"
                      required
                      value={tempLoanDetails.bankName}
                      onChange={(e) => setTempLoanDetails(prev => ({ ...prev, bankName: e.target.value }))}
                      placeholder="e.g. State Bank of India, Gramin Bank, PACS"
                      className="w-full px-3.5 py-2.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/70 font-medium focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none text-xs"
                    />
                  </div>

                  {/* Loan Amount & Repayment Due Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#1d1d1f]">Outstanding Amount (₹) *</label>
                      <input
                        type="text"
                        required
                        value={tempLoanDetails.amount}
                        onChange={(e) => setTempLoanDetails(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="e.g. 1,50,000"
                        className="w-full px-3.5 py-2.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/70 font-medium focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none text-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#1d1d1f]">Repayment Due Date *</label>
                      <input
                        type="date"
                        required
                        value={tempLoanDetails.dueDate}
                        onChange={(e) => setTempLoanDetails(prev => ({ ...prev, dueDate: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/70 font-medium focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none text-xs cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-2.5 pt-3 border-t border-[#f0f0f0]">
                <button
                  type="button"
                  onClick={() => setIsLoanModalOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-[#f5f5f7] text-[#1d1d1f] font-semibold hover:bg-[#e8e8ed] transition-all cursor-pointer text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-semibold transition-all shadow-xs flex items-center space-x-1.5 cursor-pointer text-xs active:scale-95"
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
