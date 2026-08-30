import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sprout, 
  Scan, 
  MessageSquareText, 
  TrendingUp, 
  CloudSun,
  Building2, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Award,
  ArrowUpRight
} from 'lucide-react';
import VideoBackground from '../components/VideoBackground';
import AppleLanguageDropdown from '../components/AppleLanguageDropdown';
import { TRANSLATIONS } from '../data/translations';

export default function LandingPage({ onOpenSignIn, currentLang, setLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1] // Apple Spring Curve
      }
    }
  };

  // 5 Feature Cards (Apple Glassmorphism Specification)
  const featureCards = [
    {
      title: t.scanLeafTitle || 'Crop Disease AI',
      desc: t.scanLeafDesc || 'Multimodal leaf scan with organic & chemical cure',
      icon: Scan,
      tag: 'Vision AI',
      iconGrad: 'from-emerald-400 to-teal-500 shadow-emerald-500/30',
      borderHover: 'hover:border-emerald-400/50 hover:shadow-emerald-500/15'
    },
    {
      title: t.askAiTitle || 'Kisan Voice AI',
      desc: t.askAiDesc || 'Speak or ask agronomy queries in regional languages',
      icon: MessageSquareText,
      tag: 'Voice AI',
      iconGrad: 'from-purple-400 to-indigo-500 shadow-purple-500/30',
      borderHover: 'hover:border-purple-400/50 hover:shadow-purple-500/15'
    },
    {
      title: t.mandiRadarTitle || 'Market Prices',
      desc: t.mandiRadarDesc || 'Compare nearby APMC spot rates & best sell timing',
      icon: TrendingUp,
      tag: 'AGMARKNET',
      iconGrad: 'from-[#2997ff] to-[#0071e3] shadow-blue-500/30',
      borderHover: 'hover:border-blue-400/50 hover:shadow-blue-500/15'
    },
    {
      title: t.weatherTitle || 'Weather Advisory',
      desc: t.weatherDesc || 'Hyperlocal rainfall telemetry & microclimate guidance',
      icon: CloudSun,
      tag: 'Open-Meteo',
      iconGrad: 'from-amber-400 to-orange-500 shadow-orange-500/30',
      borderHover: 'hover:border-amber-400/50 hover:shadow-amber-500/15'
    },
    {
      title: t.schemesTitle || 'Govt Schemes',
      desc: t.schemesDesc || 'Explore central & state subsidies with official links',
      icon: Building2,
      tag: 'Subsidies',
      iconGrad: 'from-teal-400 to-emerald-500 shadow-teal-500/30',
      borderHover: 'hover:border-teal-400/50 hover:shadow-teal-500/15'
    }
  ];

  return (
    <div className="relative w-full min-h-screen text-white flex flex-col justify-between overflow-x-hidden">
      {/* Background Farm Video Loop */}
      <VideoBackground overlayOpacity="opacity-55" />

      {/* Top Floating Navigation Bar (Apple Frosted Header) */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <motion.span 
            animate={{ y: [0, -4, 0], rotate: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-3xl inline-block"
          >
            🌾
          </motion.span>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-white drop-shadow-md">
              {t.appName || 'AgriShield AI'}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Apple Popover Language Dropdown */}
          <AppleLanguageDropdown currentLang={currentLang} setLang={setLang} variant="dark" />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenSignIn('farmer')}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold backdrop-blur-md transition-all shadow-md cursor-pointer"
          >
            {t.signIn || 'Sign In'}
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 text-center space-y-8"
      >



        {/* Main Hero Headline (Apple SF Pro Typography) */}
        <motion.h2 
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-lg"
        >
          {t.heroTitle1} <br />
          <span className="bg-gradient-to-r from-blue-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
            {t.heroTitle2}
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-lg text-white/80 font-normal max-w-2xl mx-auto leading-relaxed drop-shadow-sm"
        >
          {t.heroSubtitle}
        </motion.p>

        {/* Primary Farmer Entry Button (Apple Blue Glow Pill) */}
        <motion.div variants={itemVariants} className="pt-2 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenSignIn('farmer')}
            className="px-9 py-4 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-base font-semibold shadow-[0_10px_35px_rgba(0,113,227,0.45)] transition-all flex items-center justify-center space-x-3 group cursor-pointer"
          >
            <Sprout size={20} className="group-hover:rotate-12 transition-transform" />
            <span>{t.getStarted || 'Get Started'} / {t.signIn || 'Sign In'}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        </motion.div>

        {/* 5 Feature Cards (Apple Vision Frosted Glass Bento Grid) */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 text-left"
        >
          {featureCards.map((card, idx) => {
            const IconComp = card.icon;

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => onOpenSignIn('farmer')}
                className={`p-5 rounded-[22px] bg-white/[0.07] hover:bg-white/[0.13] backdrop-blur-2xl border border-white/15 ${card.borderHover} text-white shadow-[0_16px_36px_rgba(0,0,0,0.25)] hover:shadow-2xl cursor-pointer transition-all duration-300 flex flex-col justify-between space-y-4 group`}
              >
                {/* Top Row: Squircle Icon & Capsule Tag */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-11 h-11 rounded-[14px] bg-gradient-to-br ${card.iconGrad} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <IconComp size={20} className="stroke-[2.2]" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 group-hover:bg-white/20 text-white/90 border border-white/15 transition-colors">
                      {card.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-bold text-[15px] text-white group-hover:text-[#2997ff] transition-colors flex items-center justify-between">
                      <span>{card.title}</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#2997ff]" />
                    </h3>
                    <p className="text-[12px] text-white/70 leading-relaxed mt-1 line-clamp-2">
                      {card.desc}
                    </p>
                  </div>
                </div>

                {/* Micro Action Indicator */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11.5px] font-medium text-white/70 group-hover:text-white transition-colors">
                  <span>Explore</span>
                  <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform text-[#2997ff]" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </motion.main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-white/60">
        <p>© 2026 {t.appName || 'AgriShield AI'} • Built with ❤️ by Vikesh Ray</p>
      </footer>
    </div>
  );
}
