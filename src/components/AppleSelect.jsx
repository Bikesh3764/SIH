import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

export default function AppleSelect({ 
  options = [], 
  value, 
  onChange, 
  placeholder = 'Select an option',
  icon: Icon,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Normalize options
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'object' && opt !== null) {
      return {
        value: opt.value !== undefined ? opt.value : opt.id,
        label: opt.label || opt.name || String(opt.value),
        subLabel: opt.subLabel || (opt.state ? `(${opt.state})` : '')
      };
    }
    return {
      value: opt,
      label: String(opt),
      subLabel: ''
    };
  });

  const selectedOption = normalizedOptions.find((opt) => String(opt.value) === String(value)) || normalizedOptions[0];

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative w-full text-left ${isOpen ? 'z-[99999]' : 'z-20'} ${className}`} ref={selectRef}>
      {/* Apple Capsule Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2.5 px-3.5 rounded-[18px] liquid-pill-light hover:border-[#0071e3]/60 text-xs font-semibold text-[#1d1d1f] transition-all duration-200 flex items-center justify-between shadow-xs active:scale-[0.99] cursor-pointer"
      >
        <div className="flex items-center space-x-2 truncate pr-2">
          {Icon && <Icon size={14} className="text-[#0071e3] shrink-0" />}
          <span className="truncate font-semibold text-[#1d1d1f]">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.subLabel && (
            <span className="text-[10px] text-[#86868b] font-medium shrink-0">
              {selectedOption.subLabel}
            </span>
          )}
        </div>

        <ChevronDown
          size={14}
          className={`text-[#86868b] shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[#0071e3]' : ''
          }`}
        />
      </button>

      {/* Apple Framer Motion Popover Menu (Strictly Downward) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-full mt-2.5 rounded-[22px] bg-white/95 text-[#1d1d1f] border border-white/90 shadow-[0_24px_60px_rgba(0,0,0,0.22)] p-2 z-[99999] backdrop-blur-3xl max-h-64 overflow-y-auto"
          >
            <div className="space-y-0.5">
              {normalizedOptions.map((opt) => {
                const isSelected = String(opt.value) === String(value);

                return (
                  <button
                    key={String(opt.value)}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[14px] text-xs transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#0071e3]/12 text-[#0071e3] font-bold border border-[#0071e3]/20 shadow-2xs'
                        : 'hover:bg-black/5 text-[#1d1d1f] font-medium'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 truncate pr-2">
                      <span className="truncate">{opt.label}</span>
                      {opt.subLabel && (
                        <span className="text-[10.5px] text-[#86868b] font-normal">
                          {opt.subLabel}
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <Check size={14} className="text-[#0071e3] shrink-0" />
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
