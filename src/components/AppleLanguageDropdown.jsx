import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { LANGUAGES } from '../data/mockAgriData';

export default function AppleLanguageDropdown({ currentLang, setLang, variant = 'light' }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedLanguage = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isDark = variant === 'dark';

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      {/* Apple Capsule Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3.5 py-2 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
          isDark
            ? 'bg-black/40 hover:bg-black/60 text-white border border-white/25 backdrop-blur-xl shadow-lg shadow-black/20'
            : 'liquid-pill-light text-[#1d1d1f]'
        }`}
      >
        <Globe size={13} className={isDark ? 'text-white/80' : 'text-[#0071e3]'} />
        <span>{selectedLanguage.name}</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[#0071e3]' : isDark ? 'text-white/70' : 'text-[#86868b]'
          }`}
        />
      </button>

      {/* Apple Framer Motion Popover Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute right-0 top-full mt-2 w-56 max-w-[calc(100vw-32px)] rounded-[22px] p-2 shadow-[0_28px_64px_rgba(0,0,0,0.5)] z-[99999] border backdrop-blur-3xl max-h-80 overflow-y-auto ${
              isDark
                ? 'bg-[#18181b]/95 text-white border-white/20'
                : 'bg-white/95 text-[#1d1d1f] border-white/90 shadow-2xl'
            }`}
          >
            <div className="space-y-1">
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLang;

                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLang(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[14px] text-xs transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? isDark
                          ? 'bg-[#0071e3]/30 text-white font-bold border border-[#0071e3]/50 shadow-xs'
                          : 'bg-[#0071e3]/12 text-[#0071e3] font-bold border border-[#0071e3]/20 shadow-2xs'
                        : isDark
                        ? 'hover:bg-white/10 text-white/90'
                        : 'hover:bg-black/5 text-[#1d1d1f]'
                    }`}
                  >
                    <span className="font-semibold text-left">{lang.name}</span>
                    {isSelected && (
                      <Check size={14} className={isDark ? 'text-[#2997ff]' : 'text-[#0071e3]'} />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
