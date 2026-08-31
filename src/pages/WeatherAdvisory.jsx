import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudSun, 
  CloudRain, 
  Sun, 
  Wind, 
  Droplets, 
  Thermometer, 
  AlertTriangle, 
  MapPin, 
  Calendar,
  Layers,
  ChevronRight,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { DISTRICTS_DATA, WEATHER_FORECAST_DATA } from '../data/mockAgriData';
import { TRANSLATIONS } from '../data/translations';
import AppleSelect from '../components/AppleSelect';
import { fetchLiveDistrictWeather } from '../services/weatherService';

export default function WeatherAdvisory({ currentLang, currentUser }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS_DATA[0]); // Rourkela (Sundargarh, Odisha)
  const [forecastView, setForecastView] = useState('hourly'); // 'hourly' | '7day'
  const [liveWeather, setLiveWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync with user's selected district from Sign In / Registration
  useEffect(() => {
    if (currentUser?.district || currentUser?.taluk) {
      const userDistName = (currentUser.district || currentUser.taluk).toLowerCase();
      const match = DISTRICTS_DATA.find(d => 
        userDistName.includes(d.id.toLowerCase()) || 
        userDistName.includes(d.name.toLowerCase()) || 
        d.name.toLowerCase().includes(userDistName)
      );
      if (match) {
        setSelectedDistrict(match);
      }
    }
  }, [currentUser]);

  // Fetch Live Weather from Open-Meteo when district changes
  useEffect(() => {
    let isMounted = true;
    async function loadWeather() {
      setLoading(true);
      const data = await fetchLiveDistrictWeather(selectedDistrict.id, currentLang);
      if (isMounted) {
        if (data) {
          setLiveWeather(data);
        }
        setLoading(false);
      }
    }
    loadWeather();
    return () => { isMounted = false; };
  }, [selectedDistrict, currentLang]);

  const currentWeather = liveWeather || {
    currentTemp: '28°C',
    feelsLike: '31°C',
    condition: 'Partly Cloudy',
    conditionIcon: '⛅',
    humidity: '74%',
    windSpeed: '12 km/h',
    barometric: '1010 hPa',
    rainProbability: '45%',
    uvIndex: '4 (Moderate)',
    soilMoistureVal: '68%',
    soilMoistureStatus: 'Optimal',
    hourlyData: [],
    forecast7Days: WEATHER_FORECAST_DATA.forecast7Days,
    dynamicWatering: 'Optimal soil moisture. Favorable window for nutrient spraying.',
    dynamicPest: 'Moderate humidity levels. Fungal spore risk is low.',
    dynamicHarvest: 'Clear weather window available for harvesting.'
  };

  const hourlyList = liveWeather?.hourlyData?.length ? liveWeather.hourlyData : [
    { time: 'Now', temp: '28°C', rain: '20%', icon: '⛅', label: 'Clear' },
    { time: '04:00', temp: '24°C', rain: '15%', icon: '⛅', label: 'Clear' },
    { time: '08:00', temp: '29°C', rain: '40%', icon: '☀️', label: 'Sunny' },
    { time: '12:00', temp: '35°C', rain: '65%', icon: '⛅', label: 'Warm' },
    { time: '16:00', temp: '30°C', rain: '75%', icon: '🌧️', label: 'Rain' },
    { time: '20:00', temp: '27°C', rain: '25%', icon: '⛅', label: 'Clear' }
  ];

  const forecast7DaysList = liveWeather?.forecast7Days || WEATHER_FORECAST_DATA.forecast7Days;

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6 animate-apple-fade text-[#1d1d1f] overflow-x-hidden min-w-0 relative">
      
      {/* Apple Frosted Glass Activity Indicator (During Live Telemetry Sync) */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xl">
          <div className="p-7 rounded-[28px] liquid-glass/95 border border-white/80 shadow-2xl flex flex-col items-center space-y-4 max-w-sm text-center animate-apple-scale">
            <div className="w-12 h-12 rounded-full liquid-pill-btn text-white flex items-center justify-center shadow-md shadow-blue-500/30">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#1d1d1f] tracking-tight">Syncing Microclimate Telemetry</h3>
              <p className="text-xs text-[#86868b]">Connecting to Open-Meteo Live Satellite Feed for {selectedDistrict.name}...</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Header & Clean District Selector (Green header line removed) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-apple-in relative z-30">
        <div className="space-y-0.5">
          <h1 className="text-2xl sm:text-[34px] font-bold tracking-tight text-[#1d1d1f]">
            {t.weatherPageTitle || 'Hyperlocal Weather & Sowing Guidance'}
          </h1>
          <p className="text-xs sm:text-[15px] text-[#86868b] font-normal">
            {t.weatherPageSubtitle || 'Microclimate telemetry & soil moisture station'} • {selectedDistrict.name} ({selectedDistrict.state})
          </p>
        </div>

        {/* District Selector Capsule */}
        <div className="w-full sm:w-64 self-start sm:self-auto">
          <AppleSelect
            options={DISTRICTS_DATA.map((d) => ({
              value: d.id,
              label: d.name,
              subLabel: `(${d.state})`
            }))}
            value={selectedDistrict.id}
            onChange={(val) => {
              const found = DISTRICTS_DATA.find((d) => d.id === val);
              if (found) setSelectedDistrict(found);
            }}
            icon={MapPin}
          />
        </div>
      </div>

      {/* Main Weather Card (VisionOS Liquid Obsidian-Blue Glass Tile) */}
      <div className="p-6 sm:p-9 rounded-[30px] bg-gradient-to-br from-[#0066cc]/90 via-[#0071e3]/85 to-[#0052b3]/95 backdrop-blur-3xl text-white shadow-[0_20px_50px_rgba(0,113,227,0.28)] border border-white/30 space-y-6 overflow-hidden relative">
        
        {/* Ambient Light Reflection Orbs inside card */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-blue-300/15 blur-[60px] pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-blue-100 uppercase tracking-widest block opacity-90">
              {t.weatherConditions || 'CURRENT WEATHER CONDITIONS'} • {selectedDistrict.name}
            </span>
            <div className="flex items-baseline space-x-3 mt-1.5">
              <span className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white drop-shadow-sm">
                {currentWeather.currentTemp}
              </span>
              <span className="text-lg sm:text-2xl font-semibold text-blue-100 flex items-center gap-2">
                <span className="text-3xl animate-bounce">{currentWeather.conditionIcon}</span>
                <span>{currentWeather.condition}</span>
              </span>
            </div>
            <span className="text-xs text-blue-100/80 mt-1.5 block font-medium">
              {t.feelsLikeText || 'Feels like'} {currentWeather.feelsLike} • {t.liveStation || 'Live Station'}
            </span>
          </div>

          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/30 text-4xl shadow-inner self-start sm:self-auto">
            <span>{currentWeather.conditionIcon || '⛅'}</span>
          </div>
        </div>

        {/* 6 Key Weather Telemetry Liquid Metric Pods */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-white/20 text-xs">
          
          <div className="p-3.5 rounded-[18px] bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 transition-all text-center space-y-0.5">
            <span className="text-[10px] text-blue-200 uppercase font-bold tracking-wider block">{t.soilMoisture || 'SOIL MOISTURE'}</span>
            <span className="text-sm sm:text-base font-extrabold text-white block">
              {currentWeather.soilMoistureVal}
            </span>
            <span className="text-[10px] text-blue-100 font-medium block">
              ({currentWeather.soilMoistureStatus})
            </span>
          </div>

          <div className="p-3.5 rounded-[18px] bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 transition-all text-center space-y-0.5">
            <span className="text-[10px] text-blue-200 uppercase font-bold tracking-wider block">{t.rainChanceTomorrow || 'RAIN CHANCE'}</span>
            <span className="text-sm sm:text-base font-extrabold text-white block">
              {currentWeather.rainProbability}
            </span>
            <span className="text-[10px] text-blue-100 font-medium block">Next 24h</span>
          </div>

          <div className="p-3.5 rounded-[18px] bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 transition-all text-center space-y-0.5">
            <span className="text-[10px] text-blue-200 uppercase font-bold tracking-wider block">{t.windSpeedLabel || 'WIND SPEED'}</span>
            <span className="text-sm sm:text-base font-extrabold text-white block">
              {currentWeather.windSpeed}
            </span>
            <span className="text-[10px] text-blue-100 font-medium block">Surface Calm</span>
          </div>

          <div className="p-3.5 rounded-[18px] bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 transition-all text-center space-y-0.5">
            <span className="text-[10px] text-blue-200 uppercase font-bold tracking-wider block">{t.humidityLabel || 'HUMIDITY'}</span>
            <span className="text-sm sm:text-base font-extrabold text-white block">
              {currentWeather.humidity}
            </span>
            <span className="text-[10px] text-blue-100 font-medium block">Atmospheric</span>
          </div>

          <div className="p-3.5 rounded-[18px] bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 transition-all text-center space-y-0.5">
            <span className="text-[10px] text-blue-200 uppercase font-bold tracking-wider block">{t.barometricLabel || 'BAROMETRIC'}</span>
            <span className="text-sm sm:text-base font-extrabold text-white block">
              {currentWeather.barometric}
            </span>
            <span className="text-[10px] text-blue-100 font-medium block">Surface Press</span>
          </div>

          <div className="p-3.5 rounded-[18px] bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 transition-all text-center space-y-0.5">
            <span className="text-[10px] text-blue-200 uppercase font-bold tracking-wider block">{t.uvIndexLabel || 'UV INDEX'}</span>
            <span className="text-sm sm:text-base font-extrabold text-white block">
              {currentWeather.uvIndex}
            </span>
            <span className="text-[10px] text-blue-100 font-medium block">Solar Rad</span>
          </div>

        </div>

      </div>

      {/* Dynamic Farming Advisories Section (3 Apple Vision Liquid Glass Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. Watering Advisory */}
        <div className="p-6 rounded-[24px] liquid-glass border border-white/80 shadow-xs hover:shadow-lg transition-all space-y-3">
          <div className="flex items-center space-x-2.5 text-[#0071e3]">
            <div className="w-8 h-8 rounded-full bg-[#0071e3]/10 flex items-center justify-center">
              <Droplets size={18} />
            </div>
            <h3 className="font-bold text-sm text-[#1d1d1f]">{t.wateringAdvisory || 'Watering Advisory'}</h3>
          </div>
          <p className="text-xs text-[#1d1d1f]/80 leading-relaxed font-medium">
            {currentWeather.dynamicWatering}
          </p>
        </div>

        {/* 2. Pest & Fungal Alert */}
        <div className="p-6 rounded-[24px] liquid-glass border border-white/80 shadow-xs hover:shadow-lg transition-all space-y-3">
          <div className="flex items-center space-x-2.5 text-amber-600">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle size={18} />
            </div>
            <h3 className="font-bold text-sm text-[#1d1d1f]">{t.pestAlert || 'Pest & Fungal Alert'}</h3>
          </div>
          <p className="text-xs text-[#1d1d1f]/80 leading-relaxed font-medium">
            {currentWeather.dynamicPest}
          </p>
        </div>

        {/* 3. Harvesting Window */}
        <div className="p-6 rounded-[24px] liquid-glass border border-white/80 shadow-xs hover:shadow-lg transition-all space-y-3">
          <div className="flex items-center space-x-2.5 text-emerald-600">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <ShieldCheck size={18} />
            </div>
            <h3 className="font-bold text-sm text-[#1d1d1f]">{t.harvestingWindow || 'Harvesting Window'}</h3>
          </div>
          <p className="text-xs text-[#1d1d1f]/80 leading-relaxed font-medium">
            {currentWeather.dynamicHarvest}
          </p>
        </div>

      </div>

      {/* Forecast View Mode Toggle & Liquid Glass Timeline Canvas */}
      <div className="p-6 sm:p-8 rounded-[28px] liquid-glass border border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.03)] space-y-6 overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <h2 className="text-base sm:text-lg font-bold text-[#1d1d1f]">
              {forecastView === 'hourly' ? (t.hourlyForecast || '24-Hour Timeline') : (t.forecast5d || '5-Day Farming Forecast')}
            </h2>
            <p className="text-xs text-[#86868b]">
              {forecastView === 'hourly' ? 'Hourly precipitation and temperature curve' : 'Extended weekly agronomic weather window'}
            </p>
          </div>

          {/* Apple Segmented Toggle Pill */}
          <div className="flex p-1 rounded-full liquid-pill-light border border-white/90 text-xs font-semibold self-start sm:self-auto shadow-xs">
            <button
              onClick={() => setForecastView('hourly')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                forecastView === 'hourly' 
                  ? 'liquid-pill-btn text-white shadow-sm' 
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              {t.timeline24h || '24-Hour Timeline'}
            </button>
            <button
              onClick={() => setForecastView('7day')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                forecastView === '7day' 
                  ? 'liquid-pill-btn text-white shadow-sm' 
                  : 'text-[#86868b] hover:text-[#1d1d1f]'
              }`}
            >
              {t.forecast7d || '7-Day Forecast'}
            </button>
          </div>
        </div>

        {/* 1. 24-Hour Horizontal Liquid Glass Hourly Strip */}
        {forecastView === 'hourly' && (
          <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar pt-1">
            {hourlyList.map((hour, idx) => {
              const isNow = hour.time === 'Now' || hour.time === t.nowText;
              return (
                <div
                  key={idx}
                  className={`min-w-[95px] p-4 rounded-[22px] transition-all text-center space-y-2.5 shrink-0 shadow-xs border ${
                    isNow 
                      ? 'liquid-glass bg-blue-50/70 border-blue-300/80 scale-105 ring-2 ring-[#0071e3]/30' 
                      : 'liquid-glass hover:bg-white/95 border-white/90 hover:scale-105'
                  }`}
                >
                  <span className={`text-[11px] font-bold block ${isNow ? 'text-[#0071e3]' : 'text-[#86868b]'}`}>
                    {hour.time}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/80 text-xl mx-auto flex items-center justify-center shadow-2xs">
                    <span>{hour.icon || '⛅'}</span>
                  </div>
                  <span className="text-base font-extrabold text-[#1d1d1f] block tracking-tight">
                    {hour.temp}
                  </span>
                  <span className="text-[10.5px] font-bold text-blue-600 px-1.5 py-0.5 rounded-full bg-blue-100/60 block">
                    🌧️ {hour.rain}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. 7-Day Forecast Liquid Glass Grid */}
        {forecastView === '7day' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {forecast7DaysList.slice(0, 7).map((day, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[22px] liquid-glass border border-white/90 space-y-2 text-center shadow-xs hover:scale-105 transition-all flex flex-col justify-between"
              >
                <span className="text-xs font-bold text-[#1d1d1f] block uppercase tracking-wider">{day.day}</span>
                <span className="text-3xl block animate-pulse">{day.icon || '🌧️'}</span>
                <div className="flex justify-center space-x-1.5 text-xs sm:text-sm">
                  <span className="font-extrabold text-[#1d1d1f]">{day.tempMax}°C</span>
                  <span className="text-[#86868b] font-medium">{day.tempMin}°C</span>
                </div>
                <span className="text-[10.5px] font-bold text-blue-600 px-1.5 py-0.5 rounded-full bg-blue-100/60 inline-block">
                  Rain: {day.rainChance}%
                </span>
                <p className="text-[10px] text-[#86868b] block leading-tight font-medium pt-1 line-clamp-3">
                  {day.advisory}
                </p>
              </div>
            ))}
          </div>
        )}


      </div>

    </div>
  );
}
