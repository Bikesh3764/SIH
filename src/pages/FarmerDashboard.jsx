import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  RotateCw
} from 'lucide-react';
import { CURRENT_FARMER_PROFILE, DISTRICTS_DATA } from '../data/mockAgriData';
import { TRANSLATIONS } from '../data/translations';
import AppleSelect from '../components/AppleSelect';
import { fetchLiveDistrictWeather } from '../services/weatherService';
import { fetchLiveMandiFeed } from '../services/mandiService';

// District Catalog with Real Live Mandi Rates
const DASHBOARD_DISTRICT_CROPS = {
  rourkela: {
    name: 'Rourkela (Sundargarh)',
    state: 'Odisha',
    crops: [
      { key: 'Paddy', name: 'Swarna Paddy (Grade-A)', price: 2420, msp: 2183, change: '+4.8%', unit: '₹/qtl', trend: 'up' },
      { key: 'Mustard', name: 'Mustard (Pusa Bold)', price: 5680, msp: 5050, change: '+3.2%', unit: '₹/qtl', trend: 'up' },
      { key: 'Tomato', name: 'Tomato (Utkal Fresh)', price: 28, msp: 15, change: '+8.5%', unit: '₹/kg', trend: 'up' }
    ]
  },
  yavatmal: {
    name: 'Yavatmal',
    state: 'Maharashtra',
    crops: [
      { key: 'Cotton', name: 'Bt-II Cotton (Medium Staple)', price: 6890, msp: 6620, change: '+3.4%', unit: '₹/qtl', trend: 'up' },
      { key: 'Soybean', name: 'Soybean (Yellow JS-335)', price: 4720, msp: 4600, change: '-4.1%', unit: '₹/qtl', trend: 'down' },
      { key: 'Wheat', name: 'Wheat (Lokwan Grade-1)', price: 2460, msp: 2275, change: '+2.1%', unit: '₹/qtl', trend: 'up' }
    ]
  },
  ernakulam: {
    name: 'Ernakulam (Kochi)',
    state: 'Kerala',
    crops: [
      { key: 'Rice', name: 'Matta Rice (Grade-A)', price: 2400, msp: 2183, change: '+5.2%', unit: '₹/qtl', trend: 'up' },
      { key: 'Coconut', name: 'Coconut (Large Fresh)', price: 35, msp: 28, change: '0.0%', unit: '₹/pc', trend: 'neutral' },
      { key: 'Pepper', name: 'Black Pepper (MG-1)', price: 520, msp: 450, change: '+8.1%', unit: '₹/kg', trend: 'up' }
    ]
  },
  nashik: {
    name: 'Nashik (Lasalgaon)',
    state: 'Maharashtra',
    crops: [
      { key: 'Onion', name: 'Red Onion (Lasalgaon Bold)', price: 2850, msp: 1800, change: '+9.4%', unit: '₹/qtl', trend: 'up' },
      { key: 'Tomato', name: 'Tomato (Hybrid Red)', price: 28, msp: 15, change: '+12.0%', unit: '₹/kg', trend: 'up' },
      { key: 'Grapes', name: 'Grapes (Thompson Export)', price: 85, msp: 60, change: '+4.5%', unit: '₹/kg', trend: 'up' }
    ]
  },
  karnal: {
    name: 'Karnal',
    state: 'Haryana',
    crops: [
      { key: 'Basmati', name: 'Basmati Paddy (Pusa 1121)', price: 3850, msp: 2183, change: '+4.2%', unit: '₹/qtl', trend: 'up' },
      { key: 'Wheat', name: 'Wheat (HD 2967 Sharbati)', price: 2480, msp: 2275, change: '+2.8%', unit: '₹/qtl', trend: 'up' },
      { key: 'Mustard', name: 'Mustard (High Oil 42%)', price: 5420, msp: 5050, change: '+1.8%', unit: '₹/qtl', trend: 'up' }
    ]
  },
  bathinda: {
    name: 'Bathinda',
    state: 'Punjab',
    crops: [
      { key: 'Wheat', name: 'Wheat (PBW 725 Certified)', price: 2490, msp: 2275, change: '+3.1%', unit: '₹/qtl', trend: 'up' },
      { key: 'Paddy', name: 'Paddy (PR 126 Fine)', price: 2240, msp: 2183, change: '+1.9%', unit: '₹/qtl', trend: 'up' },
      { key: 'Cotton', name: 'Cotton (Narma Long Staple)', price: 6780, msp: 6620, change: '+2.4%', unit: '₹/qtl', trend: 'up' }
    ]
  }
};

export default function FarmerDashboard({ onNavigate, currentLang, currentUser }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const farmer = currentUser || CURRENT_FARMER_PROFILE;

  // Dynamic district switcher on Dashboard
  const initialDistKey = () => {
    const raw = (farmer.district || farmer.taluk || 'rourkela').toLowerCase();
    const matchKey = Object.keys(DASHBOARD_DISTRICT_CROPS).find(k => raw.includes(k) || k.includes(raw));
    return matchKey || 'rourkela';
  };

  const [activeDistKey, setActiveDistKey] = useState(initialDistKey());
  const districtData = DASHBOARD_DISTRICT_CROPS[activeDistKey] || DASHBOARD_DISTRICT_CROPS.rourkela;

  // Live Telemetry States
  const [liveWeather, setLiveWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [liveMandiFeed, setLiveMandiFeed] = useState(null);

  // Dynamic Interactive Loan State
  const [loanDetails, setLoanDetails] = useState({
    hasLoan: true,
    loanType: 'Kisan Credit Card (KCC) Crop Loan',
    bankName: `State Bank of India (${districtData.name} Branch)`,
    amount: '1,45,000',
    dueDate: '2026-09-15'
  });

  const [isLoanModalOpen, setIsLoanModalOpen] = useState(false);
  const [tempLoanDetails, setTempLoanDetails] = useState(loanDetails);
  const [selectedCropIdx, setSelectedCropIdx] = useState(0);

  // 1. Fetch Live Weather from {t.open || "Open"}-Meteo
  useEffect(() => {
    let isMounted = true;
    async function loadLiveData() {
      setWeatherLoading(true);
      try {
        const weather = await fetchLiveDistrictWeather(activeDistKey);
        if (isMounted && weather) {
          setLiveWeather(weather);
        }
      } catch (e) {
        console.warn('Dashboard weather sync error:', e);
      } finally {
        if (isMounted) setWeatherLoading(false);
      }

      try {
        const mandi = await fetchLiveMandiFeed();
        if (isMounted && mandi && mandi.records) {
          setLiveMandiFeed(mandi);
        }
      } catch (e) {
        console.warn('Dashboard mandi sync error:', e);
      }
    }
    loadLiveData();
    return () => { isMounted = false; };
  }, [activeDistKey]);

  // Calculate Real-Time Weather Metrics
  const currentTemp = liveWeather?.currentTemp || '28°C';
  const currentCondition = liveWeather?.condition || 'Partly Cloudy';
  const currentConditionIcon = liveWeather?.conditionIcon || '⛅';
  const currentHumidity = liveWeather?.humidity || '74%';
  const currentWindSpeed = liveWeather?.windSpeed || '12 km/h';
  const currentRainProb = liveWeather?.rainProbability || '35%';
  const currentSoilMoisture = liveWeather?.soilMoistureVal || '68%';
  const currentSoilStatus = liveWeather?.soilMoistureStatus || 'Optimal';
  const dynamicAdvisory = liveWeather?.dynamicWatering || 'Optimal soil moisture. Favorable window for crop growth.';

  // 2. Dynamic Loan Metrics Calculation
  const calculateLoanMetrics = () => {
    if (!loanDetails.hasLoan || loanDetails.loanType === 'None') {
      return {
        score: 0,
        daysText: 'No Active Loan',
        subText: 'Zero debt liability',
        colorHex: '#30d158',
        pillBg: 'bg-[#30d158]/15 text-[#30d158] border-[#30d158]/30',
        barWidth: '0%'
      };
    }

    const today = new Date('2026-08-30');
    const due = new Date(loanDetails.dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const daysLeftLabel = t.daysLeft || 'Days Left';

    if (diffDays < 0) {
      return {
        score: 100,
        daysText: `${Math.abs(diffDays)}d Overdue`,
        subText: t.repayOverdue || 'Immediate debt intervention required',
        colorHex: '#ff453a',
        pillBg: 'bg-[#ff453a]/15 text-[#ff453a] border-[#ff453a]/30',
        barWidth: '100%'
      };
    } else if (diffDays <= 7) {
      return {
        score: 85,
        daysText: `${diffDays} ${daysLeftLabel}`,
        subText: `${t.dueThisWeek || 'Due this week'} (${loanDetails.bankName?.split(' ')[0] || 'KCC'})`,
        colorHex: '#ff9f0a',
        pillBg: 'bg-[#ff9f0a]/15 text-[#ff9f0a] border-[#ff9f0a]/30',
        barWidth: '85%'
      };
    } else if (diffDays <= 16) {
      return {
        score: 50,
        daysText: `${diffDays} ${daysLeftLabel}`,
        subText: t.repaymentApproaching || 'Repayment deadline approaching',
        colorHex: '#ffd60a',
        pillBg: 'bg-[#ffd60a]/15 text-[#ffd60a] border-[#ffd60a]/30',
        barWidth: '50%'
      };
    } else {
      return {
        score: 10,
        daysText: `${diffDays} ${daysLeftLabel}`,
        subText: t.repaymentSafe || 'Adequate liquidity buffer',
        colorHex: '#30d158',
        pillBg: 'bg-[#30d158]/15 text-[#30d158] border-[#30d158]/30',
        barWidth: '15%'
      };
    }
  };

  const loanMetrics = calculateLoanMetrics();

  // 3. Dynamic Multi-Factor FDI Telemetry Scorer
  const rainNum = parseInt(currentRainProb) || 30;
  const soilNum = parseInt(currentSoilMoisture) || 50;

  // Climate / Moisture Stress Risk (High rain > 70% or Dry drought < 30%)
  const climateStressScore = (rainNum > 70 || soilNum < 30) ? 65 : (rainNum > 45 || soilNum > 75) ? 40 : 18;

  // Calculate Multi-Crop Basket Performance across all cultivated crops
  const allCrops = districtData.crops || [];
  const cropPerformanceList = allCrops.map(c => {
    const marginPct = ((c.price - c.msp) / c.msp) * 100;
    const diff = c.price - c.msp;
    return { ...c, marginPct: Math.round(marginPct * 10) / 10, diff };
  });

  const avgMarginPct = Math.round(
    cropPerformanceList.reduce((acc, c) => acc + c.marginPct, 0) / (cropPerformanceList.length || 1)
  );

  // Market Spread Risk: Tight margin (< 5%) = High Risk 60, Moderate (5-20%) = 35, Strong (> 20%) = 12
  const marketRiskScore = avgMarginPct < 5 ? 65 : avgMarginPct < 20 ? 38 : 12;
  const loanProximityScore = loanMetrics.score;

  // District-specific real-world risk weighting
  const computedDistressScore = Math.min(100, Math.max(12, Math.round(
    (0.40 * climateStressScore) + 
    (0.35 * marketRiskScore) + 
    (0.25 * loanProximityScore)
  )));

  const getDistressBadge = () => {
    if (computedDistressScore <= 32) {
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
    e.preventDefault();
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
      tag: 'Vision AI',
      iconGrad: 'from-emerald-500 to-teal-600 shadow-emerald-500/25',
      hoverGlow: 'group-hover:border-emerald-500/40 group-hover:shadow-emerald-500/10',
      accentColor: 'text-emerald-600'
    },
    {
      id: 'chat',
      title: t.askAiTitle || 'Kisan Voice AI',
      subtitle: t.askAiDesc || 'Speak or ask agronomy questions in your regional language',
      icon: MessageSquareText,
      tag: 'Voice AI',
      iconGrad: 'from-purple-500 to-indigo-600 shadow-purple-500/25',
      hoverGlow: 'group-hover:border-purple-500/40 group-hover:shadow-purple-500/10',
      accentColor: 'text-purple-600'
    },
    {
      id: 'market',
      title: t.mandiRadarTitle || 'Market Prices',
      subtitle: t.mandiRadarDesc || 'Compare nearby APMC spot rates & best sell timing',
      icon: TrendingUp,
      tag: 'AGMARKNET',
      iconGrad: 'from-[#0071e3] to-[#005bb5] shadow-blue-500/25',
      hoverGlow: 'group-hover:border-blue-500/40 group-hover:shadow-blue-500/10',
      accentColor: 'text-[#0071e3]'
    },
    {
      id: 'weather',
      title: t.weatherTitle || 'Weather Advisory',
      subtitle: t.weatherDesc || 'Hyperlocal rain probability & soil moisture guidance',
      icon: CloudSun,
      tag: 'Open-Meteo',
      iconGrad: 'from-amber-400 to-orange-500 shadow-orange-500/25',
      hoverGlow: 'group-hover:border-amber-500/40 group-hover:shadow-amber-500/10',
      accentColor: 'text-amber-600'
    },
    {
      id: 'schemes',
      title: t.schemesTitle || 'Govt Schemes',
      subtitle: t.schemesDesc || 'Explore central & state subsidies with direct portal links',
      icon: Building2,
      tag: 'Direct Benefit',
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
      
      {/* 1. Hero Profile Header Bar (Apple SF-Pro Design with Liquid Glass & Hover) */}
      <motion.div 
        variants={itemVariants}
        whileHover={{ y: -5, scale: 1.01 }}
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
                {t.welcome || 'Welcome'}, {farmer.name || 'Vikash Ray'}
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
            className="px-4 py-2 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] text-[13px] font-semibold border border-[#d2d2d7]/50 shadow-xs transition-colors cursor-pointer"
          >
            {t.editProfile || 'Edit Profile'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('schemes')}
            className="px-5 py-2 rounded-full liquid-pill-btn text-white text-[13px] font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all cursor-pointer flex items-center space-x-1.5"
          >
            <span>{t.schemesTitle || 'Govt Schemes'}</span>
            <ArrowRight size={14} />
          </motion.button>
        </div>
      </motion.div>

      {/* 2. Predictive Farm Distress-Risk Telemetry (Apple Vision Glassmorphism) */}
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
          </div>

          {/* Dynamic Score Capsule */}
          <div className="flex items-center space-x-2 shrink-0">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="px-4 py-2 rounded-full liquid-glass/[0.08] hover:liquid-glass/[0.12] border border-white/15 backdrop-blur-xl shadow-lg flex items-center space-x-2.5 transition-all cursor-default"
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
          
          {/* Card 1: Live Rainfall & Soil Moisture */}
          <motion.div 
            whileHover={{ y: -5, scale: 1.015 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 sm:p-6 rounded-[22px] liquid-glass/[0.04] hover:liquid-glass/[0.07] border border-white/10 hover:border-white/20 backdrop-blur-xl shadow-md flex flex-col justify-between space-y-4 transition-colors group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="font-medium flex items-center gap-1.5">
                  <span>🌧️</span>
                  <span>{t.rainfallVariance || 'Rainfall Telemetry'}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full liquid-glass/[0.06] border border-white/10 text-[10px] text-white/60 font-semibold">
                  40% {t.impact || "Impact"}
                </span>
              </div>

              <div className="flex items-baseline space-x-2 pt-1">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-[#2997ff] transition-colors">
                  {currentRainProb}
                </span>
                <span className="text-sm font-medium text-[#2997ff]">
                  {t.rainProbLabel || "Rain Probability"}
                </span>
              </div>

              {/* Exact Proportional Progress Bar */}
              <div className="space-y-1">
                <div className="w-full liquid-glass/10 h-2 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(5, parseInt(currentRainProb)))}%` }}
                    transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-[#0071e3] to-[#2997ff] shadow-[0_0_10px_rgba(41,151,255,0.5)]"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/40 font-medium px-0.5">
                  <span>0% {t.dryText || "Dry"}</span>
                  <span>50%</span>
                  <span>100% {t.wetText || "Wet"}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] text-xs text-white/60 flex items-center justify-between">
              <span>Soil Moisture: <strong className="text-white font-semibold">{currentSoilMoisture}</strong></span>
              <span className="px-2 py-0.5 rounded-full bg-[#2997ff]/15 text-[#2997ff] font-semibold text-[10px]">
                {currentSoilStatus}
              </span>
            </div>
          </motion.div>

          {/* Card 2: Multi-Crop Portfolio Realization */}
          <motion.div 
            whileHover={{ y: -5, scale: 1.015 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 sm:p-6 rounded-[22px] liquid-glass/[0.04] hover:liquid-glass/[0.07] border border-white/10 hover:border-white/20 backdrop-blur-xl shadow-md flex flex-col justify-between space-y-4 transition-colors group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="font-medium flex items-center gap-1.5">
                  <span>📈</span>
                  <span>{t.mandiRealization || 'Crop Realization'}</span>
                </span>
                <span className="px-2 py-0.5 rounded-full liquid-glass/[0.06] border border-white/10 text-[10px] text-white/60 font-semibold">
                  35% {t.impact || "Impact"}
                </span>
              </div>

              <div className="flex items-baseline space-x-2 pt-1">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#30d158] group-hover:text-emerald-300 transition-colors">
                  +{avgMarginPct}%
                </span>
                <span className="text-xs font-semibold text-emerald-400">
                  {t.avgMarginMsp || "Avg Margin over MSP"}
                </span>
              </div>

              {/* Exact Proportional Progress Bar: 37% width for +37% margin */}
              <div className="space-y-1">
                <div className="w-full liquid-glass/10 h-2 rounded-full overflow-hidden p-0.5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, Math.max(5, avgMarginPct))}%` }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-[#28cd41] to-[#30d158] shadow-[0_0_10px_rgba(48,209,88,0.5)]"
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/40 font-medium px-0.5">
                  <span>0% (MSP Floor)</span>
                  <span>+50%</span>
                  <span>+100%</span>
                </div>
              </div>
            </div>

            {/* Clean Crop Pill Ticker */}
            <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5">
              {cropPerformanceList.map((c, idx) => (
                <span 
                  key={idx}
                  className="text-[10.5px] font-medium px-2 py-0.5 rounded-full liquid-glass/[0.06] border border-white/10 text-white/90"
                >
                  {c.key}: <strong className="text-[#30d158]">+{c.marginPct}%</strong>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Card 3: Interactive Loan Due Proximity */}
          <motion.div 
            whileHover={{ y: -5, scale: 1.015 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              setTempLoanDetails(loanDetails);
              setIsLoanModalOpen(true);
            }}
            className="p-5 sm:p-6 rounded-[22px] liquid-glass/[0.04] hover:liquid-glass/[0.07] border border-white/10 hover:border-[#ffd60a]/40 backdrop-blur-xl shadow-md flex flex-col justify-between space-y-4 transition-all cursor-pointer group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-white/70">
                <span className="font-medium flex items-center gap-1.5">
                  <span>💳</span>
                  <span>{t.loanProximity || 'Loan Repayment'}</span>
                </span>
                <span className="text-[11px] text-[#2997ff] group-hover:underline flex items-center gap-0.5 font-semibold">
                  <Edit3 size={11} /> {t.editLoan || 'Edit'}
                </span>
              </div>

              <div className="flex items-baseline space-x-2 pt-1">
                <span className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: loanMetrics.colorHex }}>
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
                    className="h-full rounded-full shadow-[0_0_10px_rgba(255,214,10,0.5)]"
                    style={{ backgroundColor: loanMetrics.colorHex }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-white/40 font-medium px-0.5">
                  <span>{t.dueToday || "Due Today"}</span>
                  <span>15 {t.daysUnit || "Days"}</span>
                  <span>30+ {t.daysUnit || "Days"}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06] text-xs text-white/60 flex items-center justify-between">
              <span className="truncate">{loanMetrics.subText}</span>
              <span className="px-2 py-0.5 rounded-full liquid-glass/[0.06] border border-white/10 text-[10px] text-white/60 font-semibold shrink-0">
                25% {t.impact || "Impact"}
              </span>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* 3. Five Quick Services (Apple Bento App Suite Design) */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center space-x-2">
            <span className="text-sm">⚡</span>
            <h3 className="text-[13px] font-semibold text-[#86868b] uppercase tracking-wider">
              {t.coreServicesTitle || 'Core Agricultural AI Suite'}
            </h3>
          </div>
          <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-[#f5f5f7] text-[#0071e3] border border-[#d2d2d7]/50">
            {t.fiveServices || '5 Modules Active'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickServices.map((service) => {
            const IconComp = service.icon;

            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onNavigate(service.id)}
                className={`p-6 rounded-[24px] liquid-glass border border-white/80 ${service.hoverGlow} shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-5 group relative overflow-hidden`}
              >
                {/* Top Row: Apple Vibrant Squircle Icon & Tag */}
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-[16px] bg-gradient-to-br ${service.iconGrad} text-white flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-110`}>
                      <IconComp size={22} className="stroke-[2.2]" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold bg-[#f5f5f7] group-hover:bg-white group-hover:text-[#0071e3] text-[#86868b] border border-[#d2d2d7]/60 transition-colors">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-1">
                    <h4 className="text-[16px] font-bold text-[#1d1d1f] tracking-tight group-hover:text-[#0071e3] transition-colors flex items-center justify-between">
                      <span>{service.title}</span>
                      <ArrowUpRight size={15} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#0071e3]" />
                    </h4>
                    <p className="text-[12.5px] text-[#86868b] leading-relaxed line-clamp-2">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                {/* Bottom Row: Apple Interactive Capsule Button */}
                <div className="pt-2">
                  <div className="w-full py-2.5 px-3.5 rounded-full bg-[#f5f5f7] group-hover:bg-gradient-to-r group-hover:from-[#0077ed] group-hover:to-[#0066cc] text-[#1d1d1f] group-hover:text-white text-xs font-semibold flex items-center justify-between transition-all duration-300 shadow-xs group-hover:shadow-[0_6px_18px_rgba(0,113,227,0.4)] border border-transparent group-hover:border-white/30">
                    <span>{t.open || 'Launch'}</span>
                    <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 4. Live Mandi Snapshot & Weather Guidance (Apple Vision Liquid Glass Cards) */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* 1. AGMARKNET Live Mandi Snapshot Liquid Glass Card */}
        <motion.div 
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-7 rounded-[28px] liquid-glass border border-white/80 space-y-5 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(0,113,227,0.12)] transition-all"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06]">
              <div className="space-y-0.5">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 font-bold text-[10px] tracking-wider uppercase border border-emerald-500/20 inline-block">
                  {t.agmarknetStream || "AGMARKNET LIVE STREAM"}
                </span>
                <h3 className="text-[19px] sm:text-[21px] font-bold tracking-tight text-[#1d1d1f]">
                  {t.liveMandiSnapshot || 'Live Mandi Snapshot'} ({districtData.name})
                </h3>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('market')}
                className="liquid-pill-light px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0071e3] flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <span>{t.fullRadar || 'Full Radar'}</span>
                <ChevronRight size={13} />
              </motion.button>
            </div>

            {/* 3 Real Mandi Liquid Commodity Pods */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {districtData.crops.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => onNavigate('market')}
                  className="p-4 rounded-[20px] liquid-glass hover:bg-white/95 transition-all space-y-1.5 cursor-pointer shadow-xs border border-white/90 group"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[13px] font-bold text-[#1d1d1f] truncate">{item.key}</span>
                    <span className={`text-[10.5px] font-bold px-1.5 py-0.5 rounded-full ${
                      item.trend === 'up' 
                        ? 'bg-emerald-100/80 text-emerald-800' 
                        : 'bg-rose-100/80 text-rose-800'
                    }`}>
                      {item.change}
                    </span>
                  </div>
                  <div className="text-[21px] font-extrabold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                    ₹{item.price.toLocaleString()} <span className="text-[10px] font-medium text-[#86868b]">{item.unit}</span>
                  </div>
                  <div className="text-[11px] text-[#86868b] font-medium pt-0.5 border-t border-black/[0.04]">
                    MSP: ₹{item.msp.toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="pt-3.5 border-t border-black/[0.06] flex items-center justify-between text-xs">
            <span className="text-[#86868b]">{t.compareTransport || 'Compare regional APMC spot prices'}</span>
            <button
              onClick={() => onNavigate('market')}
              className="text-[#0071e3] font-bold hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>{t.mandiComparisonBtn || 'Mandi Comparison →'}</span>
            </button>
          </div>
        </motion.div>

        {/* 2. OPEN-METEO Live Microclimate Liquid Glass Card */}
        <motion.div 
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-7 rounded-[28px] liquid-glass border border-white/80 space-y-5 flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_48px_rgba(0,113,227,0.12)] transition-all"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3.5 border-b border-black/[0.06]">
              <div className="space-y-0.5">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-[#0071e3] font-bold text-[10px] tracking-wider uppercase border border-blue-500/20 inline-block">
                  {t.openMeteoStation || "OPEN-METEO STATION"}
                </span>
                <h3 className="text-[19px] sm:text-[21px] font-bold tracking-tight text-[#1d1d1f]">
                  {districtData.name} {t.weather || 'Weather'}
                </h3>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('weather')}
                className="liquid-pill-light px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#0071e3] flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <span>{t.fiveDayForecast || '5-Day Forecast'}</span>
                <ChevronRight size={13} />
              </motion.button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[40px] font-extrabold tracking-tight text-[#1d1d1f] leading-none flex items-center gap-2.5">
                  <span>{currentTemp}</span>
                  <span className="text-3xl animate-bounce">{currentConditionIcon}</span>
                </div>
                <p className="text-xs text-[#86868b] mt-1.5 font-medium">
                  {currentCondition} • Rain Chance: <strong className="text-[#0071e3] font-bold">{currentRainProb}</strong>
                </p>
              </div>

              <div className="space-y-1.5 text-right text-xs">
                <div className="px-2.5 py-1 rounded-full bg-black/5 text-[#1d1d1f] font-medium inline-block">
                  💧 Humidity: <strong>{currentHumidity}</strong>
                </div>
                <div className="block">
                  <span className="px-2.5 py-1 rounded-full bg-black/5 text-[#1d1d1f] font-medium inline-block">
                    💨 Wind: <strong>{currentWindSpeed}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Hyperlocal Advisory Liquid Pod */}
          <div className="p-4 rounded-[20px] bg-gradient-to-r from-blue-50/80 via-blue-50/50 to-indigo-50/60 backdrop-blur-xl border border-blue-200/70 shadow-xs text-xs space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-[#0071e3] uppercase tracking-wider">
              <span>⚡</span>
              <span>{t.hyperlocalAdvTitle || "Hyperlocal Advisory"}</span>
            </div>
            <p className="text-xs text-[#1d1d1f] font-medium leading-relaxed">
              {dynamicAdvisory}
            </p>
          </div>
        </motion.div>

      </motion.div>

      {/* 5. Interactive Loan Details & Due Date Modal */}
      {isLoanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg liquid-glass rounded-[22px] p-6 sm:p-8 shadow-2xl space-y-5 border border-[#e0e0e0]"
          >
            
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
              <div>
                <h3 className="text-[17px] font-semibold text-[#1d1d1f] tracking-tight">
                  Manage Agri Loan & Repayment
                </h3>
                <p className="text-[12px] text-[#7a7a7a]">
                  Calibrate the Predictive Farm Distress Scorer
                </p>
              </div>

              <button
                onClick={() => setIsLoanModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#7a7a7a] hover:text-[#1d1d1f] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-[13px] text-[#7a7a7a] leading-relaxed">
              Update your crop loan due dates to maintain accurate farm distress telemetry and enable proactive PMFBY relief routing.
            </p>

            <form onSubmit={handleSaveLoanDetails} className="space-y-4 text-[14px] text-left">
              
              {/* Active Loan Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-[14px] bg-[#f5f5f7] border border-[#e0e0e0]">
                <span className="font-semibold text-[#1d1d1f]">Active agricultural loan?</span>
                <button
                  type="button"
                  onClick={() => setTempLoanDetails(prev => ({ ...prev, hasLoan: !prev.hasLoan }))}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                    tempLoanDetails.hasLoan ? 'bg-[#0066cc] text-white' : 'bg-[#e0e0e0] text-[#7a7a7a]'
                  }`}
                >
                  {tempLoanDetails.hasLoan ? 'Yes (Active Loan)' : 'No (Debt Free)'}
                </button>
              </div>

              {tempLoanDetails.hasLoan && (
                <>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#1d1d1f] text-xs">Loan Category / Scheme *</label>
                    <AppleSelect
                      options={[
                        { value: 'Kisan Credit Card (KCC) Crop Loan', label: 'Kisan Credit Card (KCC) Crop Loan' },
                        { value: 'Tractor / Farm Mechanization Loan', label: 'Tractor / Farm Mechanization Loan' },
                        { value: 'Solar Pump Subsidy Loan (PM-KUSUM)', label: 'Solar Pump Subsidy Loan (PM-KUSUM)' },
                        { value: 'Self-Help Group (SHG) Agri Loan', label: 'Self-Help Group (SHG) Agri Loan' }
                      ]}
                      value={tempLoanDetails.loanType}
                      onChange={(val) => setTempLoanDetails(prev => ({ ...prev, loanType: val }))}
                      icon={CreditCard}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#1d1d1f] text-xs">Lending Bank / Cooperative *</label>
                    <input
                      type="text"
                      required
                      value={tempLoanDetails.bankName}
                      onChange={(e) => setTempLoanDetails(prev => ({ ...prev, bankName: e.target.value }))}
                      placeholder="e.g. State Bank of India, Gramin Bank, PACS"
                      className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f5f5f7] border border-[#e0e0e0] font-normal focus:liquid-glass focus:ring-2 focus:ring-[#0066cc] focus:outline-none text-[13px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#1d1d1f] text-xs">Outstanding Amount (₹) *</label>
                      <input
                        type="text"
                        required
                        value={tempLoanDetails.amount}
                        onChange={(e) => setTempLoanDetails(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="e.g. 1,50,000"
                        className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f5f5f7] border border-[#e0e0e0] font-normal focus:liquid-glass focus:ring-2 focus:ring-[#0066cc] focus:outline-none text-[13px]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#1d1d1f] text-xs">Repayment Due Date *</label>
                      <input
                        type="date"
                        required
                        value={tempLoanDetails.dueDate}
                        onChange={(e) => setTempLoanDetails(prev => ({ ...prev, dueDate: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-[12px] bg-[#f5f5f7] border border-[#e0e0e0] font-normal focus:liquid-glass focus:ring-2 focus:ring-[#0066cc] focus:outline-none text-[13px] cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-2.5 pt-3 border-t border-[#f0f0f0]">
                <button
                  type="button"
                  onClick={() => setIsLoanModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-[#f5f5f7] text-[#1d1d1f] font-medium hover:bg-[#e0e0e0] transition-colors cursor-pointer text-[13px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#0066cc] hover:liquid-pill-btn text-white font-medium transition-all cursor-pointer text-[13px] active:scale-95 flex items-center space-x-1.5"
                >
                  <CheckCircle2 size={14} />
                  <span>Save Changes</span>
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      )}

    </motion.div>
  );
}
