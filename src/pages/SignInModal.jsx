import React, { useState } from 'react';
import { 
  X, 
  Smartphone, 
  Lock, 
  ArrowRight, 
  User, 
  MapPin, 
  Globe, 
  UserPlus, 
  LogIn
} from 'lucide-react';
import { DISTRICTS_DATA, CURRENT_FARMER_PROFILE, LANGUAGES } from '../data/mockAgriData';
import { TRANSLATIONS } from '../data/translations';
import AppleLanguageDropdown from '../components/AppleLanguageDropdown';
import AppleSelect from '../components/AppleSelect';

export default function SignInModal({ isOpen, onClose, onLoginSuccess, currentLang, setLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'

  // Farmer Registration Form State
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedState, setSelectedState] = useState('Maharashtra');
  const [selectedDistrict, setSelectedDistrict] = useState('Yavatmal');
  const [villageName, setVillageName] = useState('');
  const [landHolding, setLandHolding] = useState('3.5 Acres');
  const [primaryCrop, setPrimaryCrop] = useState('Cotton & Soybean');
  const [soilType, setSoilType] = useState('Medium Black Clay Loam');

  // Existing Login Form State
  const [loginPhone, setLoginPhone] = useState('');
  const [loginOtp, setLoginOtp] = useState('');

  if (!isOpen) return null;

  const handleFarmerRegister = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim()) {
      alert('Please fill in your Name and Mobile Number.');
      return;
    }

    const newFarmerUser = {
      role: 'farmer',
      name: fullName,
      email: `${fullName.toLowerCase().replace(/\s+/g, '')}@agrishield.in`,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      id: `MH-${selectedDistrict.substring(0, 3).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      village: villageName || 'Main Village',
      taluk: selectedDistrict,
      district: selectedDistrict,
      state: selectedState,
      phone: mobileNumber,
      landSize: landHolding,
      soilType: soilType,
      experience: '8',
      numFarms: '2',
      activeCrops: [
        { name: primaryCrop.split('&')[0]?.trim() || 'Primary Crop', area: '2.0 Acres', sowingDate: '15 June 2024', stage: 'Vegetative Growth', health: 'Healthy' },
        { name: primaryCrop.split('&')[1]?.trim() || 'Secondary Crop', area: '1.5 Acres', sowingDate: '20 June 2024', stage: 'Pod Filling', health: 'Healthy' }
      ]
    };

    onLoginSuccess(newFarmerUser);
    onClose();
  };

  const handleFarmerLogin = (e) => {
    e.preventDefault();
    const existingFarmer = {
      role: 'farmer',
      name: loginPhone === '9823471234' ? CURRENT_FARMER_PROFILE.name : `Farmer (${loginPhone || 'Verified'})`,
      email: 'rameshwar.patil@agrishield.in',
      avatar: CURRENT_FARMER_PROFILE.avatar,
      id: CURRENT_FARMER_PROFILE.farmerId,
      village: CURRENT_FARMER_PROFILE.village,
      taluk: CURRENT_FARMER_PROFILE.taluk,
      district: 'Yavatmal',
      state: CURRENT_FARMER_PROFILE.state,
      phone: loginPhone || CURRENT_FARMER_PROFILE.phone,
      landSize: CURRENT_FARMER_PROFILE.landSize,
      soilType: CURRENT_FARMER_PROFILE.soilType,
      experience: '12',
      numFarms: '2',
      activeCrops: CURRENT_FARMER_PROFILE.activeCrops
    };

    onLoginSuccess(existingFarmer);
    onClose();
  };

  const handleQuickEvaluation = () => {
    onLoginSuccess({
      role: 'farmer',
      name: CURRENT_FARMER_PROFILE.name,
      email: 'rameshwar.patil@agrishield.in',
      avatar: CURRENT_FARMER_PROFILE.avatar,
      id: CURRENT_FARMER_PROFILE.farmerId,
      village: CURRENT_FARMER_PROFILE.village,
      taluk: CURRENT_FARMER_PROFILE.taluk,
      district: 'Yavatmal',
      state: CURRENT_FARMER_PROFILE.state,
      phone: CURRENT_FARMER_PROFILE.phone,
      landSize: CURRENT_FARMER_PROFILE.landSize,
      soilType: CURRENT_FARMER_PROFILE.soilType,
      experience: '12',
      numFarms: '2',
      activeCrops: CURRENT_FARMER_PROFILE.activeCrops
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white text-[#1d1d1f] rounded-[26px] shadow-2xl overflow-hidden p-6 sm:p-8 space-y-5 border border-[#d2d2d7]/60 my-8">
        
        {/* Top Header: Apple Language Popover + Close Button */}
        <div className="flex items-center justify-between pb-1">
          <AppleLanguageDropdown currentLang={currentLang} setLang={setLang} variant="light" />

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#86868b] hover:text-[#1d1d1f] flex items-center justify-center transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Branding Icon & Title */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-full bg-[#1d1d1f] text-white mx-auto flex items-center justify-center text-xl shadow-xs font-bold">
            🌾
          </div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
            {authMode === 'signin' ? t.signIn : t.signUp}
          </h2>
          <p className="text-xs text-[#86868b]">
            {t.tagline}
          </p>
        </div>

        {/* Mode Toggle (Apple Segmented Pill) */}
        <div className="grid grid-cols-2 p-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/70 text-xs font-semibold">
          <button
            onClick={() => setAuthMode('signin')}
            className={`py-2 rounded-full transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              authMode === 'signin' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <LogIn size={14} />
            <span>{t.signIn}</span>
          </button>

          <button
            onClick={() => setAuthMode('signup')}
            className={`py-2 rounded-full transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              authMode === 'signup' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
            }`}
          >
            <UserPlus size={14} />
            <span>{t.signUp}</span>
          </button>
        </div>

        {/* MODE 1: Sign In (Mobile + OTP) */}
        {authMode === 'signin' && (
          <form onSubmit={handleFarmerLogin} className="space-y-3.5 text-xs text-left">
            <div className="space-y-1">
              <label className="font-semibold text-[#1d1d1f]">{t.phone}</label>
              <div className="relative">
                <Smartphone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]" />
                <input
                  type="tel"
                  required
                  value={loginPhone}
                  onChange={(e) => setLoginPhone(e.target.value)}
                  placeholder={t.mobilePlaceholder}
                  className="w-full pl-10 pr-3 py-2.5 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#1d1d1f]">OTP</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#86868b]" />
                <input
                  type="password"
                  value={loginOtp}
                  onChange={(e) => setLoginOtp(e.target.value)}
                  placeholder={t.otpPlaceholder}
                  className="w-full pl-10 pr-3 py-2.5 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white text-xs font-medium tracking-tight shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{t.proceed}</span>
              <ArrowRight size={15} />
            </button>
          </form>
        )}

        {/* MODE 2: New Registration Form */}
        {authMode === 'signup' && (
          <form onSubmit={handleFarmerRegister} className="space-y-3 text-xs text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#1d1d1f]">{t.fullName} *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rameshwar Patil"
                  className="w-full px-3 py-2 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1d1d1f]">{t.phone} *</label>
                <input
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="10-digit mobile"
                  className="w-full px-3 py-2 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#1d1d1f]">{t.district} *</label>
                <AppleSelect
                  options={DISTRICTS_DATA.map((d) => ({
                    value: d.name,
                    label: d.name,
                    subLabel: `(${d.state})`
                  }))}
                  value={selectedDistrict}
                  onChange={setSelectedDistrict}
                  icon={MapPin}
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1d1d1f]">{t.village}</label>
                <input
                  type="text"
                  value={villageName}
                  onChange={(e) => setVillageName(e.target.value)}
                  placeholder="e.g. Ghatanji"
                  className="w-full px-3 py-2 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-semibold text-[#1d1d1f]">{t.landSize}</label>
                <input
                  type="text"
                  value={landHolding}
                  onChange={(e) => setLandHolding(e.target.value)}
                  placeholder="e.g. 4.2 Acres"
                  className="w-full px-3 py-2 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1d1d1f]">{t.cropsSown}</label>
                <input
                  type="text"
                  value={primaryCrop}
                  onChange={(e) => setPrimaryCrop(e.target.value)}
                  placeholder="e.g. Cotton & Soybean / Rice"
                  className="w-full px-3 py-2 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:scale-95 text-white text-xs font-medium tracking-tight shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>{t.registerProceed}</span>
              <ArrowRight size={15} />
            </button>
          </form>
        )}

        {/* 1-Click Fast Demo */}
        <div className="pt-2 border-t border-[#f0f0f0]">
          <button
            onClick={handleQuickEvaluation}
            className="w-full py-2.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] border border-[#d2d2d7]/70 text-xs font-medium text-[#0071e3] text-center active:scale-95 transition-all cursor-pointer shadow-xs"
          >
            ⚡ Quick 1-Click Demo (Rameshwar Patil)
          </button>
        </div>

      </div>
    </div>
  );
}
