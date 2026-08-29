import React, { useState, useRef, useEffect } from 'react';
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

  // Normalize options (support both string arrays and { value, label, subLabel } objects)
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
    <div className={`relative w-full text-left ${className}`} ref={selectRef}>
      {/* Apple Pill Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-2.5 px-3.5 rounded-[14px] bg-[#f5f5f7] hover:bg-white border border-[#d2d2d7]/70 hover:border-[#0071e3]/50 text-xs font-semibold text-[#1d1d1f] transition-all duration-200 flex items-center justify-between shadow-xs active:scale-[0.99] cursor-pointer"
      >
        <div className="flex items-center space-x-2 truncate pr-2">
          {Icon && <Icon size={14} className="text-[#0071e3] shrink-0" />}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {selectedOption?.subLabel && (
            <span className="text-[10px] text-[#86868b] font-normal shrink-0">
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

      {/* Floating Frosted Glass Popover Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 rounded-[18px] bg-white/95 backdrop-blur-2xl border border-[#d2d2d7]/80 shadow-2xl p-1.5 z-50 animate-apple-scale max-h-60 overflow-y-auto">
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
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-[12px] text-xs transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[#0071e3]/10 text-[#0071e3] font-semibold'
                      : 'hover:bg-[#f5f5f7] text-[#1d1d1f] font-medium'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 truncate pr-2">
                    <span className="truncate">{opt.label}</span>
                    {opt.subLabel && (
                      <span className="text-[10px] text-[#86868b] font-normal">
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
        </div>
      )}
    </div>
  );
}
