import React from 'react';
import { motion } from 'framer-motion';
import { 
  Sprout, 
  Scan, 
  MessageSquareText, 
  TrendingUp, 
  Building2, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Award
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
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] // Apple Spring Curve
      }
    }
  };

  const featureCards = [
    {
      title: t.scanLeafTitle,
      desc: t.scanLeafDesc,
      icon: Scan,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20 border-emerald-500/30',
      tag: t.tagAiVision || 'AI Vision'
    },
    {
      title: t.askAiTitle,
      desc: t.askAiDesc,
      icon: MessageSquareText,
      color: 'text-blue-400',
      bg: 'bg-blue-500/20 border-blue-500/30',
      tag: t.tagVoiceNlp || 'Voice NLP'
    },
    {
      title: t.mandiRadarTitle,
      desc: t.mandiRadarDesc,
      icon: TrendingUp,
      color: 'text-amber-400',
      bg: 'bg-amber-500/20 border-amber-500/30',
      tag: t.tagLiveMandis || 'Live Mandis'
    },
    {
      title: t.schemesTitle,
      desc: t.schemesDesc,
      icon: Building2,
      color: 'text-purple-400',
      bg: 'bg-purple-500/20 border-purple-500/30',
      tag: t.tagSubsidies || 'Subsidies'
    }
  ];

  return (
    <div className="relative w-full min-h-screen text-white flex flex-col justify-between overflow-x-hidden">
      {/* Background Farm Video Loop */}
      <VideoBackground overlayOpacity="opacity-50" />

      {/* Top Floating Navigation Bar */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <motion.span 
            animate={{ y: [0, -5, 0], rotate: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-3xl inline-block"
          >
            🌾
          </motion.span>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold tracking-tight text-white">
              {t.appName}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Apple Popover Language Dropdown */}
          <AppleLanguageDropdown currentLang={currentLang} setLang={setLang} variant="dark" />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => onOpenSignIn('farmer')}
            className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold shadow-lg shadow-emerald-900/40 transition-colors cursor-pointer"
          >
            {t.signIn}
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.main 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center space-y-7"
      >

        {/* Main Hero Headline */}
        <motion.h2 
          variants={itemVariants}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]"
        >
          {t.heroTitle1} <br />
          <span className="bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
            {t.heroTitle2}
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p 
          variants={itemVariants}
          className="text-base sm:text-xl text-neutral-200 font-normal max-w-2xl mx-auto leading-relaxed"
        >
          {t.heroSubtitle}
        </motion.p>

        {/* Primary Farmer Entry Button */}
        <motion.div variants={itemVariants} className="pt-2 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOpenSignIn('farmer')}
            className="px-9 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-base font-bold shadow-2xl shadow-emerald-900/60 transition-all flex items-center justify-center space-x-3 group cursor-pointer animate-apple-glow"
          >
            <Sprout size={22} className="group-hover:rotate-12 transition-transform" />
            <span>{t.getStarted} / {t.signIn}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </motion.button>
        </motion.div>

        {/* 4 Feature Cards (Dark Frosted Glass with Spring Hover Physics) */}
        <motion.div 
          variants={itemVariants}
          className="pt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left"
        >
          {featureCards.map((card, idx) => {
            const IconComp = card.icon;

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenSignIn('farmer')}
                className="p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/15 text-white shadow-2xl hover:bg-black/75 hover:border-emerald-400/50 cursor-pointer transition-colors space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-xl ${card.bg} ${card.color} flex items-center justify-center font-bold group-hover:scale-110 transition-transform`}>
                    <IconComp size={22} />
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/10 text-white/80 border border-white/10">
                    {card.tag}
                  </span>
                </div>
                <div>
                  <h3 className={`font-bold text-base text-white group-hover:${card.color} transition-colors flex items-center justify-between`}>
                    <span>{card.title}</span>
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                  <p className="text-xs text-neutral-300 leading-snug mt-1">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </motion.main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-neutral-300">
        <p>© 2026 {t.appName} • Built with ❤️ by Vikesh Ray</p>
      </footer>
    </div>
  );
}
