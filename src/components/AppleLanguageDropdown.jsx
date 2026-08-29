import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Apple Capsule Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-200 cursor-pointer shadow-xs active:scale-95 ${
          isDark
            ? 'bg-black/50 hover:bg-black/70 text-white border border-white/20 backdrop-blur-md'
            : 'bg-white hover:bg-[#f5f5f7] text-[#1d1d1f] border border-[#d2d2d7]/80'
        }`}
      >
        <span>{selectedLanguage.name}</span>
        <ChevronDown
          size={13}
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[#0071e3]' : isDark ? 'text-white/70' : 'text-[#86868b]'
          }`}
        />
      </button>

      {/* Apple Floating Glass Popover Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-48 rounded-[18px] p-1.5 shadow-2xl z-50 border backdrop-blur-2xl animate-apple-scale ${
            isDark
              ? 'bg-[#1d1d1f]/95 border-white/15 text-white'
              : 'bg-white/95 border-[#d2d2d7]/80 text-[#1d1d1f]'
          }`}
        >
          <div className="space-y-0.5">
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
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-[12px] text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-[#2997ff]/20 text-[#2997ff] font-semibold'
                        : 'bg-[#0071e3]/10 text-[#0071e3] font-semibold'
                      : isDark
                      ? 'hover:bg-white/10 text-white/90'
                      : 'hover:bg-[#f5f5f7] text-[#1d1d1f]'
                  }`}
                >
                  <span>{lang.name}</span>
                  {isSelected && (
                    <Check size={14} className={isDark ? 'text-[#2997ff]' : 'text-[#0071e3]'} />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
