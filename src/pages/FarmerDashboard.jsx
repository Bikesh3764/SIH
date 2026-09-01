import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  ExternalLink,
  RotateCw,
  AlertCircle,
  ChevronDown,
  Check
} from 'lucide-react';
import { CURRENT_FARMER_PROFILE, DISTRICTS_DATA } from '../data/mockAgriData';
import { TRANSLATIONS } from '../data/translations';
import { fetchLiveDistrictWeather } from '../services/weatherService';
import { fetchLiveDistrictMandiFeed } from '../services/mandiService';

export const DASHBOARD_DISTRICT_CROPS = {
  rourkela: { key: 'rourkela', name: 'Rourkela (Sundargarh)', state: 'Odisha' },
  yavatmal: { key: 'yavatmal', name: 'Yavatmal (Vidarbha)', state: 'Maharashtra' },
  nashik: { key: 'nashik', name: 'Nashik (Lasalgaon)', state: 'Maharashtra' },
  bathinda: { key: 'bathinda', name: 'Bathinda (Malwa Belt)', state: 'Punjab' },
  karnal: { key: 'karnal', name: 'Karnal (GT Road Belt)', state: 'Haryana' },
  ernakulam: { key: 'ernakulam', name: 'Ernakulam (Kochi)', state: 'Kerala' },
  pune: { key: 'pune', name: 'Pune (Gultekdi)', state: 'Maharashtra' },
  latur: { key: 'latur', name: 'Latur (Marathwada)', state: 'Maharashtra' },
  indore: { key: 'indore', name: 'Indore (Malwa)', state: 'Madhya Pradesh' }
};

export const LOAN_SCHEMES = [
  { id: 'kcc', name: 'Kisan Credit Card (KCC) Short-Term Crop Loan', rate: '4% (with 3% Govt Subvention)' },
  { id: 'pmkmy', name: 'PM-Kisan Maan-Dhan / Agri Infrastructure Fund Loan', rate: '5.5% Concessional' },
  { id: 'coop', name: 'State Cooperative Bank / PACS Crop Credit', rate: '0% - 3% State Subvention' },
  { id: 'nabard', name: 'NABARD Refinanced Dairy & Farm Mechanization Loan', rate: '6.8% Priority Sector' },
  { id: 'mfi', name: 'MFI / Commercial Agrarian Credit', rate: '8.5% Standard Bank Rate' }
];

export default function FarmerDashboard({ onNavigate, currentLang, currentUser }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const farmer = currentUser || CURRENT_FARMER_PROFILE;

  // Determine active district key from farmer profile
  const activeDistKey = useMemo(() => {
    const raw = (farmer.district || farmer.taluk || 'rourkela').toLowerCase();
    const matchKey = Object.keys(DASHBOARD_DISTRICT_CROPS).find(k => raw.includes(k) || k.includes(raw));
    return matchKey || 'rourkela';
  }, [farmer]);

  const districtData = DASHBOARD_DISTRICT_CROPS[activeDistKey] || DASHBOARD_DISTRICT_CROPS.rourkela;

  // Live Telemetry States
  const [liveWeather, setLiveWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [liveMandiFeed, setLiveMandiFeed] = useState(null);
  const [mandiLoading, setMandiLoading] = useState(true);

  // Dynamic Interactive Loan State (Default OFF as per requirement)
  const [loanDetails, setLoanDetails] = useState({
    hasLoan: false,
    schemeType: 'Kisan Credit Card (KCC) Short-Term Crop Loan',
    bankName: `State Bank of India (${districtData.name} Branch)`,
    amount: '1,45,000',
    dueDate: '2026-09-15'
  });

  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [tempLoanDetails, setTempLoanDetails] = useState(loanDetails);
  const [isSchemeDropdownOpen, setIsSchemeDropdownOpen] = useState(false);
  const schemeDropdownRef = useRef(null);
  const [lastTelemetrySyncTime, setLastTelemetrySyncTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
  const [isTelemetrySyncing, setIsTelemetrySyncing] = useState(false);

  // Close scheme popover on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (schemeDropdownRef.current && !schemeDropdownRef.current.contains(event.target)) {
        setIsSchemeDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 1. Fetch Live Weather (14-Day Window: Past 7d + Next 7d) & Mandi Feed with Auto Background Polling
  const syncTelemetry = useCallback(async (showLoading = false) => {
    if (showLoading) setIsTelemetrySyncing(true);
    try {
      const [weather, mandi] = await Promise.all([
        fetchLiveDistrictWeather(activeDistKey, currentLang),
        fetchLiveDistrictMandiFeed(activeDistKey)
      ]);
      if (weather) setLiveWeather(weather);
      if (mandi) setLiveMandiFeed(mandi);
      setLastTelemetrySyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.warn('Dashboard telemetry sync error:', e);
    } finally {
      setIsTelemetrySyncing(false);
      setWeatherLoading(false);
      setMandiLoading(false);
    }
  }, [activeDistKey, currentLang]);

  useEffect(() => {
    syncTelemetry(true);
    // Background live telemetry polling every 45 seconds
    const timer = setInterval(() => {
      syncTelemetry(false);
    }, 45000);
    return () => clearInterval(timer);
  }, [syncTelemetry]);

  // Real-Time Weather & 14-Day Cumulative Climate Metrics
  const currentTemp = liveWeather?.currentTemp || '28°C';
  const currentSoilMoisture = liveWeather?.soilMoistureVal || '68%';
  const currentSoilStatus = liveWeather?.soilMoistureStatus || 'Optimal';
  const pastRainSum = liveWeather?.pastRainSum ?? 154;
  const nextRainSum = liveWeather?.nextRainSum ?? 55;
  const pastDryDays = liveWeather?.pastDryDays ?? 0;
  const nextHighRainDays = liveWeather?.nextHighRainDays ?? 4;
  const cumulative14dRain = liveWeather?.cumulative14DayRain ?? (pastRainSum + nextRainSum);

  // 2. Dynamic Loan Metrics Calculation (Real-time Date Diff)
  const calculateLoanMetrics = () => {
    if (!loanDetails.hasLoan) {
      return {
        score: 0,
        daysText: t.noActiveDebt || 'No Active Debt',
        subText: t.zeroDebtLiability || 'Zero debt liability (Off)',
        colorHex: '#30d158',
        pillBg: 'bg-[#30d158]/15 text-[#30d158] border-[#30d158]/30',
        barWidth: '0%',
        isActive: false
      };
    }

    const today = new Date();
    const due = new Date(loanDetails.dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const daysLeftLabel = t.daysLeft || 'Days Left';

    if (diffDays < 0) {
      return {
        score: 90,
        daysText: `${Math.abs(diffDays)}d Overdue`,
        subText: t.repayOverdue || 'Immediate debt intervention required',
        colorHex: '#ff453a',
        pillBg: 'bg-[#ff453a]/15 text-[#ff453a] border-[#ff453a]/30',
        barWidth: '100%',
        isActive: true
      };
    } else if (diffDays <= 7) {
      return {
        score: 75,
        daysText: `${diffDays} ${daysLeftLabel}`,
        subText: `${t.dueThisWeek || 'Due this week'} (${loanDetails.bankName?.split(' ')[0] || 'KCC'})`,
        colorHex: '#ff9f0a',
        pillBg: 'bg-[#ff9f0a]/15 text-[#ff9f0a] border-[#ff9f0a]/30',
        barWidth: '85%',
        isActive: true
      };
    } else if (diffDays <= 20) {
      return {
        score: 45,
        daysText: `${diffDays} ${daysLeftLabel}`,
        subText: t.repaymentApproaching || 'Repayment deadline approaching',
        colorHex: '#ffd60a',
        pillBg: 'bg-[#ffd60a]/15 text-[#ffd60a] border-[#ffd60a]/30',
        barWidth: '50%',
        isActive: true
      };
    } else {
      return {
        score: 15,
        daysText: `${diffDays} ${daysLeftLabel}`,
        subText: t.repaymentSafe || 'Adequate liquidity buffer',
        colorHex: '#30d158',
        pillBg: 'bg-[#30d158]/15 text-[#30d158] border-[#30d158]/30',
        barWidth: '15%',
        isActive: true
      };
    }
  };

  const loanMetrics = calculateLoanMetrics();

  // 3. Whole-District Mandi Realization & Price Crash Analytics
  // Aggregates across all active commodities currently traded in the district's AGMARKNET feed
  const mandiAnalytics = useMemo(() => {
    if (liveMandiFeed?.crops && Object.keys(liveMandiFeed.crops).length > 0) {
      const allLiveCrops = Object.values(liveMandiFeed.crops);
      let totalMarginSum = 0;
      let crashedCount = 0;

      allLiveCrops.forEach(c => {
        const price = Number(c.basePrice) || 2400;
        const benchmark = Number(c.msp) || Math.round(price * 0.85);
        const marginPct = ((price - benchmark) / benchmark) * 100;
        totalMarginSum += marginPct;
        if (marginPct < 0) crashedCount++;
      });

      const avgMargin = Math.round((totalMarginSum / allLiveCrops.length) * 10) / 10;
      const totalCount = allLiveCrops.length;

      return {
        avgMarginPct: avgMargin,
        totalCommodities: totalCount,
        crashedCount,
        hasCrashAlert: crashedCount > 0
      };
    }

    // Default district fallback
    return {
      avgMarginPct: 24.5,
      totalCommodities: 8,
      crashedCount: 0,
      hasCrashAlert: false
    };
  }, [liveMandiFeed]);

  // 4. 14-Day Cumulative Climate Stress Model (Continuous Agronomic Telemetry)
  // Combines: Past 7 Days Rainfall + Next 7 Days Forecast + Soil Root-Zone Moisture
  const soilNum = parseInt(currentSoilMoisture) || 50;

  const climateTelemetry = useMemo(() => {
    const r14 = pastRainSum + nextRainSum;

    // Scenario A: Excessive Rain & Waterlogging Threat (Over 80mm or Saturated Soil > 60%)
    if (r14 > 80 || soilNum > 60) {
      const rainExcess = Math.max(0, r14 - 80);
      const soilExcess = Math.max(0, soilNum - 60);
      const dynScore = Math.min(100, Math.max(20, Math.round(20 + (rainExcess * 0.28) + (soilExcess * 0.75))));
      return {
        score: dynScore,
        label: t.waterloggingRisk || 'Waterlogging & Root Rot Risk',
        statusColor: dynScore > 65 ? '#ff453a' : '#ff9f0a',
        barGrad: 'from-[#0071e3] to-[#2997ff]'
      };
    }

    // Scenario B: Moisture Deficit & Drought Threat (Under 40mm and Dry Soil < 40%)
    if (r14 < 40 && soilNum < 40) {
      const rainDeficit = Math.max(0, 40 - r14);
      const soilDeficit = Math.max(0, 40 - soilNum);
      const dynScore = Math.min(100, Math.max(20, Math.round(20 + (rainDeficit * 1.25) + (soilDeficit * 1.0))));
      return {
        score: dynScore,
        label: t.droughtRisk || 'Drought Moisture Deficit',
        statusColor: '#ff453a',
        barGrad: 'from-amber-500 to-red-500'
      };
    }

    // Scenario C: Optimal Moisture & Balanced Weather Window (40mm - 80mm, Soil 40% - 60%)
    const deviationScore = Math.round(15 + Math.abs(r14 - 60) * 0.15 + Math.abs(soilNum - 50) * 0.20);
    return {
      score: deviationScore,
      label: deviationScore > 25 ? (t.moderateRainRisk || 'Moderate Rain Window') : (t.optimalMoistureBalance || 'Optimal Moisture Balance'),
      statusColor: deviationScore > 25 ? '#ffd60a' : '#30d158',
      barGrad: 'from-emerald-400 to-teal-500'
    };
  }, [pastRainSum, nextRainSum, soilNum, t]);

  // Pillar 2: Mandi Market Health & Price Crash Risk (35% Weight)
  // Continuous Econometric Risk Function: Directly maps actual % margin over/below MSP to 0-100 distress
  // When margin is +40% (high profit) -> Risk = 0
  // When margin is 0% (exact MSP floor) -> Risk = 50
  // When margin is -20% (price crash) -> Risk = 75
  // When margin is -40% (severe crash) -> Risk = 100
  const marketRiskScore = useMemo(() => {
    const { avgMarginPct, crashedCount } = mandiAnalytics;
    // Formula: 50 - (avgMarginPct * 1.25)
    let score = Math.round(50 - (avgMarginPct * 1.25));
    if (crashedCount > 0) {
      score = Math.max(score, 60 + (crashedCount * 5));
    }
    return Math.min(100, Math.max(5, score));
  }, [mandiAnalytics]);

  // Pillar 3: Debt & Credit Proximity Risk (25% Weight if ON, 0% contribution if OFF)
  const loanProximityScore = loanMetrics.score;

  // Composite FDI (0-100 Scale):
  // When loan is OFF (No Debt) -> debt contribution score is 0:
  // (0.40 * Climate) + (0.35 * Mandi) + (0.25 * 0)
  // When loan is ON -> (0.40 * Climate) + (0.35 * Mandi) + (0.25 * Loan proximity score)
  const computedDistressScore = useMemo(() => {
    let total;
    if (loanDetails.hasLoan) {
      total = Math.round(
        (0.40 * climateTelemetry.score) + 
        (0.35 * marketRiskScore) + 
        (0.25 * loanProximityScore)
      );
    } else {
      total = Math.round(
        (0.40 * climateTelemetry.score) + 
        (0.35 * marketRiskScore) + 
        (0.25 * 0)
      );
    }
    return Math.min(100, Math.max(10, total));
  }, [climateTelemetry, marketRiskScore, loanProximityScore, loanDetails.hasLoan]);

  const getDistressBadge = () => {
    if (computedDistressScore <= 35) {
      return { 
        text: `${t.lowRiskSafe || 'Low Risk (Safe)'} • ${computedDistressScore}/100`, 
        color: '#2997ff', 
        bg: 'bg-[#2997ff]/15 text-[#2997ff] border-[#2997ff]/30' 
      };
    } else if (computedDistressScore <= 55) {
      return { 
        text: `${t.modRiskCaution || 'Moderate Risk (Caution)'} • ${computedDistressScore}/100`, 
        color: '#ffd60a', 
        bg: 'bg-[#ffd60a]/15 text-[#ffd60a] border-[#ffd60a]/30' 
      };
    } else {
      return { 
        text: `${t.highRiskAlert || 'Elevated Risk (Action Needed)'} • ${computedDistressScore}/100`, 
        color: '#ff453a', 
        bg: 'bg-[#ff453a]/15 text-[#ff453a] border-[#ff453a]/30' 
      };
    }
  };

  const distressBadge = getDistressBadge();

  const handleSaveLoanDetails = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    setLoanDetails(tempLoanDetails);
    setIsLoanModalOpen(false);
  };

  // 5 Quick Services (Apple Bento Grid Specification)
  const quickServices = [
    {
      id: 'detect',
      title: t.scanLeafTitle || 'Crop Disease AI',
      subtitle: t.scanLeafDesc || 'Multimodal leaf scan with organic & chemical pathology',
      icon: Scan,
      tag: t.visionAiTag || 'Vision AI',
      iconGrad: 'from-emerald-500 to-teal-600 shadow-emerald-500/25',
      hoverGlow: 'group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10',
      accentColor: 'text-emerald-600'
    },
    {
      id: 'chat',
      title: t.askAiTitle || 'Kisan Voice AI',
      subtitle: t.askAiDesc || 'Speak or ask agronomy questions in your regional language',
      icon: MessageSquareText,
      tag: t.voiceAiTag || 'Voice AI',
      iconGrad: 'from-purple-500 to-indigo-600 shadow-purple-500/25',
      hoverGlow: 'group-hover:border-purple-500/40 group-hover:shadow-purple-500/10',
      accentColor: 'text-purple-600'
    },
    {
      id: 'market',
      title: t.mandiRadarTitle || 'Market Prices',
      subtitle: t.mandiRadarDesc || 'Compare nearby APMC spot rates & best sell timing',
      icon: TrendingUp,
      tag: t.agmarknetTag || 'AGMARKNET',
      iconGrad: 'from-[#0071e3] to-[#005bb5] shadow-blue-500/25',
      hoverGlow: 'group-hover:border-blue-500/40 group-hover:shadow-blue-500/10',
      accentColor: 'text-[#0071e3]'
    },
    {
      id: 'weather',
      title: t.weatherTitle || 'Weather Advisory',
      subtitle: t.weatherDesc || 'Hyperlocal rain probability & soil moisture guidance',
      icon: CloudSun,
      tag: t.openMeteoTag || 'Open-Meteo',
      iconGrad: 'from-amber-400 to-orange-500 shadow-orange-500/25',
      hoverGlow: 'group-hover:border-amber-500/40 group-hover:shadow-amber-500/10',
      accentColor: 'text-amber-600'
    },
    {
      id: 'schemes',
      title: t.schemesTitle || 'Govt Schemes',
      subtitle: t.schemesDesc || 'Explore central & state subsidies with direct portal links',
      icon: Building2,
      tag: t.directBenefitTag || 'Direct Benefit',
      iconGrad: 'from-teal-400 to-emerald-600 shadow-teal-500/25',
      hoverGlow: 'group-hover:border-teal-500/40 group-hover:shadow-teal-500/10',
      accentColor: 'text-teal-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16, scale: 0.99 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-[#1d1d1f]"
    >
      
      {/* 1. Hero Profile Header Bar (Clean Apple SF-Pro Layout) */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -3, scale: 1.005 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="p-6 sm:p-7 rounded-[28px] liquid-glass border border-white/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[0_8px_28px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(0,113,227,0.12)] cursor-default transition-all"
      >
        <div className="flex items-center space-x-4">
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#0071e3] to-[#005bb5] text-white flex items-center justify-center text-xl font-bold shadow-md shadow-blue-500/20 shrink-0">
            {farmer.name?.charAt(0) || 'V'}
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-[#1d1d1f]">
                {t.welcome || 'Welcome back'}, {farmer.name || 'Vikash Ray'}
              </h1>
            </div>
            <p className="text-[13px] sm:text-[14px] text-[#86868b] font-normal">
              {farmer.village ? `${farmer.village}, ` : ''}{districtData.name} ({districtData.state}) • {t.landHolding || 'Landholding'}: <strong className="text-[#1d1d1f] font-semibold">{farmer.landSize || '3.5 Acres'}</strong>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('profile')}
            className="px-4 py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-[13px] font-semibold border border-[#d2d2d7]/50 shadow-xs transition-colors cursor-pointer"
          >
            {t.editProfile || 'Edit Profile'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('schemes')}
            className="px-5 py-2.5 rounded-full liquid-pill-btn text-white text-[13px] font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <span>{t.schemesTitle || 'Govt Schemes'}</span>
            <ArrowRight size={14} />
          </motion.button>
        </div>
      </motion.div>

      {/* 2. Predictive Farm Distress-Risk Telemetry (Clean 3-Card Glassmorphism) */}
      <motion.div 
        variants={itemVariants}
        className="p-6 sm:p-8 rounded-[26px] liquid-glass-dark text-white space-y-6 relative overflow-hidden"
      >
        {/* Ambient Apple Glow Orbs */}
        <div className="absolute -top-24 -right-24 w-80 h-80 liquid-pill-btn/15 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#30d158]/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Telemetry Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
          <div className="space-y-0.5">
            <h2 className="text-[22px] sm:text-[24px] font-bold tracking-tight text-white">
              {t.fdiTitle || 'Predictive Farm Distress-Risk Index'}
            </h2>
            <p className="text-xs text-white/60">
              {t.fdiSubtitle || 'Multi-factor agronomic telemetry: 14-day cumulative climate trend, whole APMC market realization, and debt proximity'}
            </p>
          </div>

          {/* Dynamic Score Capsule & Live Sync */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Live Ticker Indicator */}
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/15 text-[11px] font-medium text-emerald-400 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live • {lastTelemetrySyncTime}</span>
            </div>

            {/* Quick Refresh Button */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => syncTelemetry(true)}
              disabled={isTelemetrySyncing}
              className="px-3 py-1.5 rounded-full liquid-glass/[0.08] hover:liquid-glass/[0.15] border border-white/15 text-[11px] font-semibold text-white/90 hover:text-white flex items-center space-x-1.5 cursor-pointer active:scale-95 transition-all disabled:opacity-60"
              title="Query live Open-Meteo & data.gov.in AGMARKNET APIs now"
            >
              <RotateCw size={12} className={isTelemetrySyncing ? 'animate-spin text-[#2997ff]' : ''} />
              <span>{isTelemetrySyncing ? 'Syncing...' : (t.refresh || 'Sync Data')}</span>
            </motion.button>

            {/* Total FDI Badge */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full liquid-glass/[0.08] border border-white/15 backdrop-blur-xl shadow-lg flex items-center space-x-2.5 transition-all cursor-default"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#2997ff] animate-ping" />
              <span className="text-sm font-semibold tracking-tight text-white">
                {distressBadge.text}
              </span>
            </motion.div>
          </div>
        </div>

        {/* 3 Balanced Apple Telemetry Glass Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: 14-Day Cumulative Climate Stress & Telemetry */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 sm:p-6 rounded-[22px] liquid-glass/[0.04] hover:liquid-glass/[0.07] border border-white/10 hover:border-white/20 backdrop-blur-xl shadow-md flex flex-col justify-between space-y-4 transition-colors group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="font-medium flex items-center gap-1.5">
                  <span>🌧️</span>
                  <span>{t.climateRiskTitle || '14-Day Climate Risk'}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full liquid-glass/[0.06] border border-white/10 text-[10px] text-white/60 font-semibold">
                  40% {t.impact || "Impact"}
                </span>
              </div>

              <div className="flex items-baseline space-x-2 pt-1">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white transition-colors" style={{ color: climateTelemetry.statusColor }}>
                  {climateTelemetry.score}/100
                </span>
                <span className="text-xs font-semibold text-white/80 truncate">
                  {climateTelemetry.label}
                </span>
              </div>

              {/* Exact Proportional Progress Bar */}
              <div className="space-y-1">
                <div className="w-full liquid-glass/10 h-2 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(5, climateTelemetry.score))}%` }}
                    transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full bg-gradient-to-r ${climateTelemetry.barGrad} shadow-[0_0_10px_rgba(41,151,255,0.4)]`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/40 font-medium px-0.5">
                  <span>{t.safeBufferScale || '0 (Safe Buffer)'}</span>
                  <span>{t.moderateScale || '50 (Moderate)'}</span>
                  <span>{t.highDistressScale || '100 (High Distress)'}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] text-xs text-white/60 flex items-center justify-between">
              <span>{t.rain14dLabel || '14d Rain'}: <strong className="text-white font-semibold">{cumulative14dRain}mm</strong> ({pastRainSum}mm {t.past || 'past'} / {nextRainSum}mm {t.next || 'next'})</span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/15 text-white/80 font-medium text-[11px] shrink-0 ml-1">
                {t.soilMoistureLabel || 'Soil'}: {currentSoilMoisture}
              </span>
            </div>
          </motion.div>

          {/* Card 2: Whole-Mandi Realization & Price Crash Radar */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 sm:p-6 rounded-[22px] liquid-glass/[0.04] hover:liquid-glass/[0.07] border border-white/10 hover:border-white/20 backdrop-blur-xl shadow-md flex flex-col justify-between space-y-4 transition-colors group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="font-medium flex items-center gap-1.5">
                  <span>📈</span>
                  <span>{t.mandiRealizationTitle || 'Mandi Realization & Crash Radar'}</span>
                </span>
                <div className="flex items-center space-x-1.5">
                  <span className="px-2 py-0.5 rounded-full liquid-glass/[0.06] border border-white/10 text-[10px] text-white/70 font-semibold">
                    {marketRiskScore}/100 {t.risk || 'Risk'}
                  </span>
                  <span className="px-2 py-0.5 rounded-full liquid-glass/[0.06] border border-white/10 text-[10px] text-white/60 font-semibold">
                    35% {t.impact || "Impact"}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline space-x-2 pt-1">
                <span className={`text-3xl sm:text-4xl font-bold tracking-tight ${mandiAnalytics.avgMarginPct >= 0 ? 'text-[#30d158] group-hover:text-emerald-300' : 'text-[#ff453a] group-hover:text-red-300'} transition-colors`}>
                  {mandiAnalytics.avgMarginPct >= 0 ? `+${mandiAnalytics.avgMarginPct}%` : `${mandiAnalytics.avgMarginPct}%`}
                </span>
                <span className="text-xs font-semibold text-white/70">
                  {mandiAnalytics.avgMarginPct >= 0 ? (t.avgMarginMsp || "Avg Margin over MSP") : (t.avgBelowMsp || "Avg Below MSP")}
                </span>
              </div>

              {/* Exact Proportional Progress Bar */}
              <div className="space-y-1">
                <div className="w-full liquid-glass/10 h-2 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(5, Math.abs(mandiAnalytics.avgMarginPct)))}%` }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full rounded-full ${mandiAnalytics.avgMarginPct >= 0 ? 'bg-gradient-to-r from-[#28cd41] to-[#30d158] shadow-[0_0_10px_rgba(48,209,88,0.5)]' : 'bg-gradient-to-r from-[#ff453a] to-[#ff6961] shadow-[0_0_10px_rgba(255,69,58,0.5)]'}`}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/40 font-medium px-0.5">
                  <span>{t.mspFloorZero || '0% (MSP Floor)'}</span>
                  <span>+50%</span>
                  <span>+100%</span>
                </div>
              </div>
            </div>

            {/* Clean Overall APMC Market Health Status (Subtle Apple Capsule) */}
            <div className="pt-2 border-t border-white/[0.06] text-xs text-white/60 flex items-center justify-between">
              <span>{mandiAnalytics.totalCommodities} {t.activeMandiCommodities || 'Active Mandi Commodities'}</span>
              {mandiAnalytics.hasCrashAlert ? (
                <span className="px-2.5 py-0.5 rounded-full bg-[#ff453a]/15 text-[#ff453a] border border-[#ff453a]/30 font-medium text-[11px] flex items-center space-x-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff453a]" />
                  <span>{mandiAnalytics.crashedCount} {t.belowMspAlert || 'Below MSP Alert'}</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/15 text-white/80 font-medium text-[11px] flex items-center space-x-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
                  <span>{t.zeroPriceCrashes || "Zero Price Crashes"}</span>
                </span>
              )}
            </div>
          </motion.div>

          {/* Card 3: Interactive Loan Due Proximity */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 sm:p-6 rounded-[22px] liquid-glass/[0.04] hover:liquid-glass/[0.07] border border-white/10 hover:border-white/20 backdrop-blur-xl shadow-md flex flex-col justify-between space-y-4 transition-colors group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="font-medium flex items-center gap-1.5">
                  <span>💳</span>
                  <span>{t.loanProximity || 'Loan Proximity'}</span>
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLoanDetails(prev => ({ ...prev, hasLoan: !prev.hasLoan }));
                    }}
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                      loanDetails.hasLoan 
                        ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40' 
                        : 'bg-white/10 hover:bg-white/20 text-white/70 border-white/20'
                    }`}
                    title="Click to quickly toggle Loan tracking ON/OFF"
                  >
                    {loanDetails.hasLoan ? 'ON' : 'OFF'}
                  </button>
                  <button
                    onClick={() => {
                      setTempLoanDetails(loanDetails);
                      setIsLoanModalOpen(true);
                    }}
                    className="text-[11px] font-semibold text-[#2997ff] hover:text-[#5ac8fa] flex items-center space-x-1 cursor-pointer"
                  >
                    <Edit3 size={11} />
                    <span>{loanDetails.hasLoan ? (t.edit || "Edit") : (t.setup || "Configure")}</span>
                  </button>
                </div>
              </div>

              <div className="flex items-baseline space-x-2 pt-1">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-[#ffd60a] transition-colors" style={{ color: loanMetrics.colorHex }}>
                  {loanMetrics.daysText}
                </span>
              </div>

              {/* Exact Proportional Progress Bar */}
              <div className="space-y-1">
                <div className="w-full liquid-glass/10 h-2 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: loanMetrics.barWidth }}
                    transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ 
                      backgroundColor: loanMetrics.colorHex,
                      boxShadow: `0 0 10px ${loanMetrics.colorHex}66`
                    }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/40 font-medium px-0.5">
                  {loanDetails.hasLoan ? (
                    <>
                      <span>{t.dueToday || "Due Today"}</span>
                      <span>15 {t.daysText || "Days"}</span>
                      <span>30+ {t.daysText || "Days"}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.zeroDebtLiability || "No Debt Liability"}</span>
                      <span>0% {t.impact || "Impact"}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] text-xs text-white/60 flex items-center justify-between">
              <span className="truncate pr-2">
                {loanDetails.hasLoan ? loanMetrics.subText : (t.enableLoanPrompt || "Turn ON to track KCC / Crop Loan")}
              </span>
              <span className="px-2 py-0.5 rounded-full liquid-glass/[0.06] border border-white/10 text-[10px] text-white/60 font-semibold shrink-0">
                {loanDetails.hasLoan ? `25% ${t.impact || "Impact"}` : `0% ${t.impact || "Impact"}`}
              </span>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* 3. Five Apple Bento Grid Action Services */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] sm:text-[22px] font-bold tracking-tight text-[#1d1d1f]">
            {t.quickServicesTitle || 'Agricultural Intelligence Modules'}
          </h2>
          <span className="text-xs text-[#86868b] font-medium">{t.aiSystemsActive || '5 AI Systems Active'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {quickServices.map((srv) => {
            const Icon = srv.icon;
            return (
              <motion.div
                key={srv.id}
                whileHover={{ y: -6, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onNavigate(srv.id)}
                className="p-6 rounded-[24px] liquid-glass border border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,113,227,0.1)] transition-all cursor-pointer flex flex-col justify-between space-y-4 group relative overflow-hidden"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-[18px] bg-gradient-to-br ${srv.iconGrad} text-white flex items-center justify-center shadow-md`}>
                    <Icon size={22} />
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/50 text-[#86868b] group-hover:text-[#0071e3] transition-colors">
                    {srv.tag}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-[17px] font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-[13px] text-[#86868b] leading-relaxed">
                    {srv.subtitle}
                  </p>
                </div>

                <div className="pt-2 flex items-center space-x-1 text-xs font-semibold text-[#0071e3] group-hover:translate-x-1 transition-transform">
                  <span>{t.openTool || "Open Tool"}</span>
                  <ChevronRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 4. Loan Details Edit & Configuration Modal */}
      <AnimatePresence>
        {isLoanModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-[28px] max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl text-[#1d1d1f]"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#d2d2d7]/50">
                <div>
                  <h3 className="text-lg font-bold">{t.editLoanDetails || 'Crop Loan & Credit Configuration'}</h3>
                  <p className="text-xs text-[#86868b]">Set up your active agricultural credit for predictive FDI distress tracking</p>
                </div>
                <button
                  onClick={() => setIsLoanModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] flex items-center justify-center text-[#86868b] transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Master ON / OFF Toggle Switch */}
              <div 
                onClick={() => setTempLoanDetails(prev => ({ ...prev, hasLoan: !prev.hasLoan }))}
                className="p-4 rounded-[18px] bg-[#f5f5f7] hover:bg-[#ebebee] border border-[#d2d2d7]/60 flex items-center justify-between cursor-pointer transition-colors select-none"
              >
                <div className="space-y-0.5 pr-3">
                  <span className="text-sm font-bold text-[#1d1d1f] flex items-center gap-2">
                    <span>{t.enableLoanTracking || 'Track Active Crop Loan / KCC'}</span>
                    <span className={`px-2 py-0.2 rounded-full text-[10px] font-bold ${tempLoanDetails.hasLoan ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-600'}`}>
                      {tempLoanDetails.hasLoan ? 'ACTIVE' : 'OFF'}
                    </span>
                  </span>
                  <span className="text-xs text-[#86868b] block">
                    {tempLoanDetails.hasLoan ? 'Loan metrics active in FDI distress model (25% weight)' : 'No debt liability. Loan contribution score is 0.'}
                  </span>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors relative shrink-0 p-0.5 ${
                    tempLoanDetails.hasLoan ? 'bg-[#30d158]' : 'bg-[#d2d2d7]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                      tempLoanDetails.hasLoan ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              {/* Loan Details Form - Active Only When Toggle is ON */}
              {tempLoanDetails.hasLoan ? (
                <form onSubmit={handleSaveLoanDetails} className="space-y-4">
                  {/* Apple VisionOS Loan Scheme Selector Popover */}
                  <div className="space-y-1 relative" ref={schemeDropdownRef}>
                    <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-1">
                      {t.loanScheme || 'Loan Scheme'}
                    </label>
                    
                    {/* Apple Capsule Trigger Button */}
                    <button
                      type="button"
                      onClick={() => setIsSchemeDropdownOpen(!isSchemeDropdownOpen)}
                      className="w-full px-4 py-2.5 rounded-[14px] bg-[#f5f5f7] hover:bg-[#ebebee] border border-[#d2d2d7]/60 flex items-center justify-between text-xs font-semibold text-[#1d1d1f] shadow-xs active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5 truncate pr-2">
                        <CreditCard size={15} className="text-[#0071e3] shrink-0" />
                        <span className="truncate font-semibold text-[#1d1d1f]">{tempLoanDetails.schemeType || LOAN_SCHEMES[0].name}</span>
                      </div>
                      <ChevronDown size={14} className={`text-[#86868b] shrink-0 transition-transform duration-300 ${isSchemeDropdownOpen ? 'rotate-180 text-[#0071e3]' : ''}`} />
                    </button>

                    {/* Apple Framer Motion Glass Popover */}
                    <AnimatePresence>
                      {isSchemeDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 4, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 3, scale: 0.96 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-0 right-0 top-full mt-1.5 rounded-[18px] bg-white/95 text-[#1d1d1f] border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.22)] p-1.5 z-[99999] backdrop-blur-3xl max-h-60 overflow-y-auto"
                        >
                          <div className="space-y-0.5">
                            {LOAN_SCHEMES.map((s) => {
                              const isSelected = (tempLoanDetails.schemeType || LOAN_SCHEMES[0].name) === s.name;
                              return (
                                <button
                                  key={s.id}
                                  type="button"
                                  onClick={() => {
                                    setTempLoanDetails(prev => ({ ...prev, schemeType: s.name }));
                                    setIsSchemeDropdownOpen(false);
                                  }}
                                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[12px] text-xs transition-all duration-150 cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#0071e3]/10 text-[#0071e3] font-bold border border-[#0071e3]/20 shadow-2xs'
                                      : 'hover:bg-black/5 text-[#1d1d1f] font-medium'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2 truncate pr-2 text-left">
                                    <span className="truncate">{s.name}</span>
                                  </div>
                                  {isSelected && (
                                    <Check size={14} className="text-[#0071e3] shrink-0 ml-2" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-1.5">
                      {t.lendingInstitution || 'Lending Institution / Bank Branch'}
                    </label>
                    <input
                      type="text"
                      value={tempLoanDetails.bankName}
                      onChange={(e) => setTempLoanDetails({ ...tempLoanDetails, bankName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/60 text-xs font-medium text-[#1d1d1f] focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none transition-all shadow-2xs"
                      placeholder="e.g. State Bank of India (Rourkela Main Branch)"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-1.5">
                        {t.loanAmountLabel || 'Loan Amount (₹)'}
                      </label>
                      <input
                        type="text"
                        value={tempLoanDetails.amount}
                        onChange={(e) => setTempLoanDetails({ ...tempLoanDetails, amount: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/60 text-xs font-medium text-[#1d1d1f] focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none transition-all shadow-2xs"
                        placeholder="1,45,000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#86868b] uppercase tracking-wider mb-1.5">
                        {t.repaymentDueDate || 'Repayment Due Date'}
                      </label>
                      <input
                        type="date"
                        value={tempLoanDetails.dueDate}
                        onChange={(e) => setTempLoanDetails({ ...tempLoanDetails, dueDate: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/60 text-xs font-medium text-[#1d1d1f] focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsLoanModalOpen(false)}
                      className="px-4 py-2 rounded-full text-xs font-semibold text-[#86868b] hover:bg-[#f5f5f7] transition-colors cursor-pointer"
                    >
                      {t.cancel || 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-full liquid-pill-btn text-white text-xs font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
                    >
                      {t.saveRecomputeFdi || 'Save & Compute FDI'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsLoanModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs font-semibold text-[#86868b] hover:bg-[#f5f5f7] transition-colors cursor-pointer"
                  >
                    {t.cancel || 'Cancel'}
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveLoanDetails}
                    className="px-5 py-2 rounded-full bg-[#1d1d1f] hover:bg-black text-white text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    {t.confirmZeroDebt || 'Confirm Zero Debt (Score = 0)'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
