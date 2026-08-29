import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Edit3, 
  CheckCircle2, 
  Save, 
  X,
  Sparkles,
  Layers,
  Sprout
} from 'lucide-react';
import { CURRENT_FARMER_PROFILE, DISTRICTS_DATA } from '../data/mockAgriData';
import { TRANSLATIONS } from '../data/translations';
import AppleSelect from '../components/AppleSelect';

export default function FarmerProfile({ currentLang, currentUser, onUpdateUser }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const farmer = currentUser || CURRENT_FARMER_PROFILE;

  const [isEditing, setIsEditing] = useState(false);
  
  // Edit Form State
  const [editName, setEditName] = useState(farmer.name);
  const [editPhone, setEditPhone] = useState(farmer.phone || '9823471234');
  const [editEmail, setEditEmail] = useState(farmer.email || 'rameshwar.patil@agrishield.in');
  const [editVillage, setEditVillage] = useState(farmer.village || 'Ghatanji');
  const [editDistrict, setEditDistrict] = useState(farmer.district || farmer.taluk || 'Yavatmal');
  const [editState, setEditState] = useState(farmer.state || 'Maharashtra');
  const [editLandSize, setEditLandSize] = useState(farmer.landSize || '3.5 Acres');
  const [editNumPlots, setEditNumPlots] = useState(farmer.numFarms || '2');
  const [editSoilType, setEditSoilType] = useState(farmer.soilType || 'Medium Black Clay Loam');
  const [editExperience, setEditExperience] = useState(farmer.experience || '8');
  const [editCrops, setEditCrops] = useState(
    farmer.activeCrops?.map(c => c.name).join(', ') || 'Cotton, Soybean'
  );

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const updated = {
      ...farmer,
      name: editName,
      phone: editPhone,
      email: editEmail,
      village: editVillage,
      district: editDistrict,
      taluk: editDistrict,
      state: editState,
      landSize: editLandSize,
      numFarms: editNumPlots,
      soilType: editSoilType,
      experience: editExperience
    };

    if (onUpdateUser) {
      onUpdateUser(updated);
    }
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-apple-fade text-[#1d1d1f]">
      
      {/* 1. Profile Header (Apple Banner Card) */}
      <div className="p-7 sm:p-9 rounded-[26px] bg-[#1d1d1f] text-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-apple-in">
        <div className="flex items-center space-x-4">
          <img
            src={farmer.avatar || CURRENT_FARMER_PROFILE.avatar}
            alt={farmer.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-white">
                {farmer.name}
              </h1>
            </div>
            <p className="text-xs text-[#86868b] mt-0.5">
              ID: {farmer.id || farmer.farmerId || 'MH-YAV-2026-2509'} • Registered Farmer
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium tracking-tight shadow-sm active:scale-95 transition-all flex items-center space-x-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Edit3 size={14} />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* 2. Unified Clean Personal & Landholding Information Card */}
      <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-[#d2d2d7]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
        <div className="pb-3 border-b border-[#f0f0f0]">
          <h2 className="text-base font-semibold text-[#1d1d1f] flex items-center gap-2">
            <User size={18} className="text-[#0071e3]" />
            {t.personalInfo} & Land Records
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
          
          <div className="p-3.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/50 flex justify-between items-center">
            <span className="text-[#86868b]">{t.fullName}:</span>
            <span className="font-semibold text-[#1d1d1f] text-sm">{farmer.name}</span>
          </div>

          <div className="p-3.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/50 flex justify-between items-center">
            <span className="text-[#86868b]">{t.phone}:</span>
            <span className="font-semibold text-[#1d1d1f]">{farmer.phone || '+91 98234 71234'}</span>
          </div>

          <div className="p-3.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/50 flex justify-between items-center">
            <span className="text-[#86868b]">{t.email}:</span>
            <span className="font-semibold text-[#1d1d1f]">{farmer.email || 'rameshwar.patil@agrishield.in'}</span>
          </div>

          <div className="p-3.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/50 flex justify-between items-center">
            <span className="text-[#86868b]">Location:</span>
            <span className="font-semibold text-[#1d1d1f]">{farmer.village || 'Ghatanji'}, {farmer.district || farmer.taluk || 'Yavatmal'}, {farmer.state || 'Maharashtra'}</span>
          </div>

          <div className="p-3.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/50 flex justify-between items-center">
            <span className="text-[#86868b]">{t.landSize}:</span>
            <span className="font-semibold text-[#0071e3] text-sm">{farmer.landSize || '3.5 Acres'}</span>
          </div>

          <div className="p-3.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/50 flex justify-between items-center">
            <span className="text-[#86868b]">Number of Plots:</span>
            <span className="font-semibold text-[#1d1d1f]">{farmer.numFarms || '2'} Plots</span>
          </div>

          <div className="p-3.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/50 flex justify-between items-center">
            <span className="text-[#86868b]">{t.soilType}:</span>
            <span className="font-semibold text-[#1d1d1f]">{farmer.soilType || 'Medium Black Clay Loam'}</span>
          </div>

          <div className="p-3.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/50 flex justify-between items-center">
            <span className="text-[#86868b]">{t.experience}:</span>
            <span className="font-semibold text-[#1d1d1f]">{farmer.experience || '8'} Years</span>
          </div>

          <div className="sm:col-span-2 p-3.5 rounded-[14px] bg-[#f5f5f7] border border-[#d2d2d7]/50 flex justify-between items-center">
            <span className="text-[#86868b]">Primary Crops Cultivated:</span>
            <span className="font-semibold text-emerald-700 text-sm">
              {farmer.activeCrops?.map(c => c.name).join(', ') || 'Cotton, Soybean'}
            </span>
          </div>

        </div>
      </div>

      {/* Edit Profile Modal (Apple Glass) */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-[26px] p-6 sm:p-8 shadow-2xl space-y-4 border border-[#d2d2d7]/60 my-8">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#f0f0f0]">
              <h3 className="text-lg font-semibold text-[#1d1d1f]">
                {t.editProfile}
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-[#86868b] hover:text-[#1d1d1f] cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#1d1d1f]">{t.fullName} *</label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#1d1d1f]">{t.phone} *</label>
                  <input
                    type="tel"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#1d1d1f]">{t.email}</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#1d1d1f]">{t.village}</label>
                  <input
                    type="text"
                    value={editVillage}
                    onChange={(e) => setEditVillage(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#1d1d1f]">{t.district}</label>
                  <AppleSelect
                    options={DISTRICTS_DATA.map((d) => ({
                      value: d.name,
                      label: d.name,
                      subLabel: `(${d.state})`
                    }))}
                    value={editDistrict}
                    onChange={setEditDistrict}
                    icon={MapPin}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#1d1d1f]">Total Land Size (Acres) *</label>
                  <input
                    type="text"
                    required
                    value={editLandSize}
                    onChange={(e) => setEditLandSize(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#1d1d1f]">Number of Plots / Parcels</label>
                  <input
                    type="number"
                    value={editNumPlots}
                    onChange={(e) => setEditNumPlots(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-[#1d1d1f]">{t.soilType}</label>
                  <input
                    type="text"
                    value={editSoilType}
                    onChange={(e) => setEditSoilType(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#1d1d1f]">{t.experience} (Years)</label>
                  <input
                    type="number"
                    value={editExperience}
                    onChange={(e) => setEditExperience(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-[12px] bg-[#f5f5f7] border border-[#d2d2d7]/70 focus:bg-white focus:ring-2 focus:ring-[#0071e3] focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-[#f0f0f0]">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-full bg-[#f5f5f7] text-[#1d1d1f] font-medium hover:bg-[#e8e8ed] transition-all cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium transition-all shadow-sm flex items-center space-x-1 cursor-pointer"
                >
                  <Save size={14} />
                  <span>{t.saveChanges}</span>
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
