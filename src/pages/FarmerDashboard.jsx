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
        daysText: 'No Active Loan',
        subText: 'Zero debt liability',
        colorHex: '#30d158', // Apple Green
        pillBg: 'bg-[#30d158]/15 text-[#30d158] border-[#30d158]/30',
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
        daysText: `Overdue ${Math.abs(diffDays)}d`,
        subText: `Immediate debt intervention required`,
        colorHex: '#ff453a', // Apple Red
        pillBg: 'bg-[#ff453a]/15 text-[#ff453a] border-[#ff453a]/30',
        barWidth: '100%'
      };
    } else if (diffDays <= 7) {
      return {
        score: 85,
        daysText: `${diffDays} Days Left`,
        subText: `Due this week (${loanDetails.bankName?.split(' ')[0] || 'KCC'})`,
        colorHex: '#ff9f0a', // Apple Orange
        pillBg: 'bg-[#ff9f0a]/15 text-[#ff9f0a] border-[#ff9f0a]/30',
        barWidth: '85%'
      };
    } else if (diffDays <= 15) {
      return {
        score: 60,
        daysText: `12 Days Left`,
        subText: `Repayment deadline approaching`,
        colorHex: '#ffd60a', // Apple Gold
        pillBg: 'bg-[#ffd60a]/15 text-[#ffd60a] border-[#ffd60a]/30',
        barWidth: '60%'
      };
    } else {
      return {
        score: 10,
        daysText: `${diffDays} Days Left`,
        subText: `Adequate liquidity buffer`,
        colorHex: '#30d158',
        pillBg: 'bg-[#30d158]/15 text-[#30d158] border-[#30d158]/30',
        barWidth: '15%'
      };
    }
  };

  const loanMetrics = calculateLoanMetrics();

  // --- Predictive Distress Scorer (DESIGN.md Spec) ---
  const rainDeviationScore = 35;
  const priceFallScore = 15;
  const loanProximityScore = loanMetrics.score;
  
  const computedDistressScore = Math.round(
    (0.40 * rainDeviationScore) + 
    (0.35 * priceFallScore) + 
    (0.25 * loanProximityScore)
  );

  const handleSaveLoanDetails = (e) => {
    e.preventDefault();
    setLoanDetails(tempLoanDetails);
    setIsLoanModalOpen(false);
  };

  // 5 Quick Services complying with DESIGN.md store-utility-card
  const quickServices = [
    {
      id: 'detect',
      title: t.scanLeafTitle,
      subtitle: t.scanLeafDesc,
      icon: Scan,
      tag: 'AI Diagnostic'
    },
    {
      id: 'chat',
      title: t.askAiTitle,
      subtitle: t.askAiDesc,
      icon: MessageSquareText,
      tag: 'Voice Assistant'
    },
    {
      id: 'market',
      title: t.mandiRadarTitle,
      subtitle: t.mandiRadarDesc,
      icon: TrendingUp,
      tag: 'Live Mandis'
    },
    {
      id: 'weather',
      title: t.weatherTitle,
      subtitle: t.weatherDesc,
      icon: CloudSun,
      tag: 'Microclimate'
    },
    {
      id: 'schemes',
      title: t.schemesTitle,
      subtitle: t.schemesDesc,
      icon: Building2,
      tag: 'Subsidies'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-[#1d1d1f]">
      
      {/* 1. Hero Profile Header Bar (DESIGN.md Product Tile Light / Store Spec) */}
      <div className="p-6 sm:p-7 rounded-[18px] bg-white border border-[#e0e0e0] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <img
            src={farmer.avatar || CURRENT_FARMER_PROFILE.avatar}
            alt={farmer.name}
            className="w-14 h-14 rounded-full object-cover border border-[#e0e0e0]"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.28px] text-[#1d1d1f]">
                {t.welcome}, {farmer.name?.split(' ')[0] || 'Farmer'}! 🌾
              </h1>
            </div>
            
            <p className="text-[14px] text-[#7a7a7a] tracking-[-0.224px] mt-0.5">
              {farmer.village || 'Ghatanji'}, {farmer.district || farmer.taluk || 'Yavatmal'}, {farmer.state || 'Maharashtra'} • {t.landHolding}: <strong className="text-[#1d1d1f] font-semibold">{farmer.landSize || '4.2 Acres'}</strong> • {t.soilType}: <strong className="text-[#1d1d1f] font-semibold">{farmer.soilType || 'Black Clay Loam'}</strong>
            </p>
          </div>
        </div>

        {/* Action Buttons (DESIGN.md Button Grammar: Pill Primary & Utility) */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('profile')}
            className="px-4 py-2 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] text-[#1d1d1f] text-[14px] font-medium transition-all active:scale-95 cursor-pointer"
          >
            {t.editProfile}
          </button>

          <button
            onClick={() => onNavigate('schemes')}
            className="px-5 py-2 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white text-[14px] font-medium transition-all active:scale-95 cursor-pointer flex items-center space-x-1.5"
          >
            <span>Govt Schemes</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 2. Predictive Farm Distress-Risk Telemetry (DESIGN.md product-tile-dark: #272729) */}
      <div className="p-6 sm:p-8 rounded-[18px] bg-[#272729] text-white space-y-6">
        
        {/* Telemetry Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[12px] font-medium uppercase tracking-[0.04em] text-[#2997ff]">
                Early-Warning Intelligence
              </span>
              <span className="text-[12px] text-[#7a7a7a]">•</span>
              <span className="text-[12px] text-[#cccccc]">Live FDI Telemetry</span>
            </div>
            <h2 className="text-[21px] font-semibold tracking-[-0.231px] text-white mt-0.5">
              Predictive Farm Distress-Risk Index
            </h2>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="px-3.5 py-1.5 rounded-full text-[14px] font-semibold bg-[#2997ff]/15 text-[#2997ff] border border-[#2997ff]/30 flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[#2997ff] animate-pulse"></span>
              <span>Low Risk (Safe) • {computedDistressScore} / 100</span>
            </span>
          </div>
        </div>

        {/* 3 Clear Spec Metric Tiles (DESIGN.md Tile 2 #2a2a2c) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Metric 1: Rainfall Variance */}
          <div className="p-5 rounded-[14px] bg-[#2a2a2c] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-[14px] text-[#cccccc]">
              <span>🌧️ Rainfall Variance</span>
              <span className="text-[12px] text-[#7a7a7a]">Weight 40%</span>
            </div>
            <div className="text-[28px] font-semibold tracking-[-0.28px] text-[#2997ff]">
              -18% <span className="text-[14px] font-normal text-[#cccccc]">Normal</span>
            </div>
            <p className="text-[14px] text-[#7a7a7a] leading-snug">
              Soil moisture is currently optimal for vegetative crop development.
            </p>
          </div>

          {/* Metric 2: Mandi Price vs MSP */}
          <div className="p-5 rounded-[14px] bg-[#2a2a2c] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-[14px] text-[#cccccc]">
              <span>📉 Mandi Realization</span>
              <span className="text-[12px] text-[#7a7a7a]">Weight 35%</span>
            </div>
            <div className="text-[28px] font-semibold tracking-[-0.28px] text-[#30d158]">
              +₹270 <span className="text-[14px] font-normal text-[#cccccc]">Above MSP</span>
            </div>
            <p className="text-[14px] text-[#7a7a7a] leading-snug">
              Spot rates trading above government minimum support price floor.
            </p>
          </div>

          {/* Metric 3: Interactive Crop Loan Due Proximity */}
          <div 
            onClick={() => {
              setTempLoanDetails(loanDetails);
              setIsLoanModalOpen(true);
            }}
            className="p-5 rounded-[14px] bg-[#2a2a2c] hover:bg-[#333336] border border-white/5 hover:border-[#2997ff]/40 transition-all space-y-2 cursor-pointer group"
          >
            <div className="flex items-center justify-between text-[14px] text-[#cccccc]">
              <span>💳 Loan Proximity</span>
              <span className="text-[12px] text-[#2997ff] group-hover:underline flex items-center gap-0.5">
                <Edit3 size={11} /> Edit
              </span>
            </div>
            <div className="text-[28px] font-semibold tracking-[-0.28px]" style={{ color: loanMetrics.colorHex }}>
              {loanMetrics.daysText}
            </div>
            <p className="text-[14px] text-[#7a7a7a] leading-snug">
              {loanMetrics.subText}
            </p>
          </div>

        </div>
      </div>

      {/* 3. Five Quick Services (DESIGN.md {component.store-utility-card}) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[14px] font-semibold text-[#7a7a7a] uppercase tracking-[0.04em]">
            Core Agricultural AI Services
          </h3>
          <span className="text-[14px] text-[#0066cc] font-medium">
            5 Services
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickServices.map((service) => {
            const IconComp = service.icon;

            return (
              <div
                key={service.id}
                onClick={() => onNavigate(service.id)}
                className="p-6 rounded-[18px] bg-white border border-[#e0e0e0] hover:border-[#0066cc]/40 transition-all duration-150 cursor-pointer active:scale-[0.97] flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-[11px] bg-[#f5f5f7] text-[#0066cc] flex items-center justify-center group-hover:bg-[#0066cc] group-hover:text-white transition-colors">
                      <IconComp size={22} />
                    </div>
                    <span className="text-[12px] font-medium text-[#7a7a7a]">
                      {service.tag}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.374px] group-hover:text-[#0066cc] transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-[14px] text-[#7a7a7a] leading-[1.43] tracking-[-0.224px] mt-1 line-clamp-2">
                      {service.subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#f0f0f0] flex items-center justify-between text-[14px] font-medium text-[#0066cc]">
                  <span>Open</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Live Mandi Snapshot & Weather Advisory (DESIGN.md 2-Column Utility Cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Mandi Price Snapshot Card */}
        <div className="p-6 sm:p-7 rounded-[18px] bg-white border border-[#e0e0e0] space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
              <div>
                <span className="text-[12px] font-medium uppercase tracking-[0.04em] text-[#7a7a7a] block">
                  APMC Market Radar
                </span>
                <h3 className="text-[21px] font-semibold tracking-[-0.231px] text-[#1d1d1f]">
                  Live Mandi Snapshot ({farmer.district || 'Yavatmal'})
                </h3>
              </div>
              <button
                onClick={() => onNavigate('market')}
                className="text-[14px] font-medium text-[#0066cc] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Full Radar</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* 3 Commodity Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(CROPS_MARKET_DATA).slice(0, 3).map(([key, item]) => (
                <div 
                  key={key} 
                  onClick={() => onNavigate('market')}
                  className="p-4 rounded-[14px] bg-[#f5f5f7] hover:bg-[#ebebee] transition-colors space-y-1.5 cursor-pointer"
                >
                  <div className="flex justify-between items-baseline">
                    <span className="text-[14px] font-semibold text-[#1d1d1f]">{key}</span>
                    <span className="text-[12px] font-semibold text-[#30d158]">{item.change}</span>
                  </div>
                  <div className="text-[21px] font-semibold tracking-[-0.231px] text-[#1d1d1f]">
                    ₹{item.currentPrice.toLocaleString()}
                  </div>
                  <div className="text-[12px] text-[#7a7a7a]">
                    MSP: ₹{item.msp} / qtl
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#f0f0f0] flex items-center justify-between text-[14px]">
            <span className="text-[#7a7a7a]">Compare transport & spot rates</span>
            <button
              onClick={() => onNavigate('market')}
              className="text-[#0066cc] font-medium hover:underline cursor-pointer"
            >
              Mandi Comparison →
            </button>
          </div>
        </div>

        {/* Weather Advisory Card */}
        <div className="p-6 sm:p-7 rounded-[18px] bg-white border border-[#e0e0e0] space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
              <div>
                <span className="text-[12px] font-medium uppercase tracking-[0.04em] text-[#7a7a7a] block">
                  Hyperlocal Sowing Guidance
                </span>
                <h3 className="text-[21px] font-semibold tracking-[-0.231px] text-[#1d1d1f]">
                  {farmer.district || 'Yavatmal'} Weather
                </h3>
              </div>
              <button
                onClick={() => onNavigate('weather')}
                className="text-[14px] font-medium text-[#0066cc] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>5-Day Forecast</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[40px] font-semibold tracking-[-0.28px] text-[#1d1d1f] leading-none">
                  {WEATHER_FORECAST_DATA?.currentTemp || '28°C'}
                </div>
                <p className="text-[14px] text-[#7a7a7a] mt-1">
                  {WEATHER_FORECAST_DATA?.condition || 'Partly Cloudy'}
                </p>
              </div>

              <div className="space-y-1 text-right text-[14px] text-[#7a7a7a]">
                <p>Humidity: <strong className="text-[#1d1d1f] font-semibold">{WEATHER_FORECAST_DATA?.humidity || '72%'}</strong></p>
                <p>Wind: <strong className="text-[#1d1d1f] font-semibold">{WEATHER_FORECAST_DATA?.windSpeed || '14 km/h'}</strong></p>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-[12px] bg-[#f5f5f7] border border-[#e0e0e0] text-[14px] text-[#1d1d1f] space-y-0.5">
            <span className="font-semibold text-[#0066cc] block">⚡ Advisory:</span>
            <p className="text-[13px] text-[#7a7a7a] leading-relaxed">
              {WEATHER_FORECAST_DATA?.hyperlocalAdvisory || 'Optimal soil moisture for vegetative growth.'}
            </p>
          </div>
        </div>

      </div>

      {/* 5. Interactive Loan Details & Due Date Modal (DESIGN.md Spec) */}
      {isLoanModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white rounded-[18px] p-6 sm:p-8 shadow-2xl space-y-5 border border-[#e0e0e0]">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
              <div>
                <h3 className="text-[17px] font-semibold text-[#1d1d1f] tracking-[-0.374px]">
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

            <p className="text-[14px] text-[#7a7a7a] leading-relaxed">
              Update your crop loan due dates to maintain accurate farm distress telemetry and enable proactive PMFBY relief routing.
            </p>

            <form onSubmit={handleSaveLoanDetails} className="space-y-4 text-[14px] text-left">
              
              {/* Active Loan Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-[12px] bg-[#f5f5f7] border border-[#e0e0e0]">
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
                    <label className="font-semibold text-[#1d1d1f]">Lending Bank / Cooperative *</label>
                    <input
                      type="text"
                      required
                      value={tempLoanDetails.bankName}
                      onChange={(e) => setTempLoanDetails(prev => ({ ...prev, bankName: e.target.value }))}
                      placeholder="e.g. State Bank of India, Gramin Bank, PACS"
                      className="w-full px-3.5 py-2.5 rounded-[11px] bg-[#f5f5f7] border border-[#e0e0e0] font-normal focus:bg-white focus:ring-2 focus:ring-[#0066cc] focus:outline-none text-[14px]"
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
                        className="w-full px-3.5 py-2.5 rounded-[11px] bg-[#f5f5f7] border border-[#e0e0e0] font-normal focus:bg-white focus:ring-2 focus:ring-[#0066cc] focus:outline-none text-[14px]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-[#1d1d1f]">Repayment Due Date *</label>
                      <input
                        type="date"
                        required
                        value={tempLoanDetails.dueDate}
                        onChange={(e) => setTempLoanDetails(prev => ({ ...prev, dueDate: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-[11px] bg-[#f5f5f7] border border-[#e0e0e0] font-normal focus:bg-white focus:ring-2 focus:ring-[#0066cc] focus:outline-none text-[14px] cursor-pointer"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-2.5 pt-3 border-t border-[#f0f0f0]">
                <button
                  type="button"
                  onClick={() => setIsLoanModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-[#f5f5f7] text-[#1d1d1f] font-medium hover:bg-[#e0e0e0] transition-colors cursor-pointer text-[14px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white font-medium transition-all cursor-pointer text-[14px] active:scale-95 flex items-center space-x-1.5"
                >
                  <CheckCircle2 size={14} />
                  <span>Save Changes</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
