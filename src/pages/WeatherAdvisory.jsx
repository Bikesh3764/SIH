import React, { useState, useEffect } from 'react';
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
    hyperlocalAdvisory: 'Optimal soil moisture. Favorable window for nutrient spraying.'
  };

  const hourlyList = liveWeather?.hourlyData?.length ? liveWeather.hourlyData : [
    { time: '00:00', temp: '26°C', rain: '20%', icon: '⛅', label: 'Clear' },
    { time: '04:00', temp: '24°C', rain: '15%', icon: '⛅', label: 'Clear' },
    { time: '08:00', temp: '29°C', rain: '40%', icon: '☀️', label: 'Sunny' },
    { time: '12:00', temp: '35°C', rain: '65%', icon: '⛅', label: 'Warm' },
    { time: '16:00', temp: '30°C', rain: '75%', icon: '🌧️', label: 'Rain' },
    { time: '20:00', temp: '27°C', rain: '25%', icon: '⛅', label: 'Clear' }
  ];

  const forecast7DaysList = liveWeather?.forecast7Days || WEATHER_FORECAST_DATA.forecast7Days;

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-6 animate-apple-fade text-[#1d1d1f] overflow-x-hidden min-w-0 relative">
      
      {/* Apple Frosted Glass Activity Indicator (During Live Telemetry Sync) */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xl">
          <div className="p-7 rounded-[26px] bg-white/95 border border-[#d2d2d7]/80 shadow-2xl flex flex-col items-center space-y-4 max-w-sm text-center animate-apple-scale">
            <div className="w-12 h-12 rounded-full bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center">
              <span className="w-6 h-6 border-3 border-[#0071e3] border-t-transparent rounded-full animate-spin"></span>
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#1d1d1f] tracking-tight">Syncing Microclimate Telemetry</h3>
              <p className="text-xs text-[#86868b]">Connecting to Open-Meteo Live Satellite Feed for {selectedDistrict.name}...</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Header & District Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-apple-in">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[12px] font-semibold uppercase tracking-[0.04em] text-emerald-600">
              Live Open-Meteo Microclimate Telemetry
            </span>
          </div>
          <h1 className="text-[24px] sm:text-[34px] font-semibold tracking-[-0.374px] text-[#1d1d1f] mt-0.5">
            {t.weatherPageTitle}
          </h1>
          <p className="text-[13px] sm:text-[16px] text-[#7a7a7a] font-normal">
            {t.weatherPageSubtitle} • {selectedDistrict.name} ({selectedDistrict.state})
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

      {/* Main Weather Card (Apple Dark Sky Blue Tile) */}
      <div className="p-5 sm:p-8 rounded-[18px] sm:rounded-[26px] bg-gradient-to-br from-[#0066cc] to-[#0077ed] text-white shadow-[0_12px_32px_rgba(0,102,204,0.22)] space-y-5 sm:space-y-6 overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-100 uppercase tracking-wider block">
              {t.currentWeatherConditions} • {selectedDistrict.name}
            </span>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className="text-4xl sm:text-6xl font-semibold tracking-tight text-white">
                {currentWeather.currentTemp}
              </span>
              <span className="text-lg sm:text-xl font-medium text-blue-100 flex items-center gap-1.5">
                <span>{currentWeather.conditionIcon}</span>
                <span>{currentWeather.condition}</span>
              </span>
            </div>
            <span className="text-xs text-blue-100 mt-1 block">
              {t.feelsLike} {currentWeather.feelsLike} • {t.liveStation || 'Live Station'}
            </span>
          </div>

          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 text-3xl self-start sm:self-auto">
            <span>{currentWeather.conditionIcon || '⛅'}</span>
          </div>
        </div>

        {/* 6 Key Weather Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 pt-3 border-t border-white/20 text-xs">
          <div className="p-2.5 sm:p-3 rounded-[12px] sm:rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-semibold block">{t.soilMoisture}</span>
            <span className="text-[13px] sm:text-base font-semibold text-white">
              {currentWeather.soilMoistureVal} ({currentWeather.soilMoistureStatus})
            </span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-[12px] sm:rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-semibold block">{t.rainProbability}</span>
            <span className="text-[13px] sm:text-base font-semibold text-white">
              {currentWeather.rainProbability}
            </span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-[12px] sm:rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-semibold block">{t.windSpeed}</span>
            <span className="text-[13px] sm:text-base font-semibold text-white">
              {currentWeather.windSpeed}
            </span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-[12px] sm:rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-semibold block">{t.humidity}</span>
            <span className="text-[13px] sm:text-base font-semibold text-white">
              {currentWeather.humidity}
            </span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-[12px] sm:rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-semibold block">{t.barometric}</span>
            <span className="text-[13px] sm:text-base font-semibold text-white">
              {currentWeather.barometric}
            </span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-[12px] sm:rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-semibold block">{t.uvIndex}</span>
            <span className="text-[13px] sm:text-base font-semibold text-white">
              {currentWeather.uvIndex}
            </span>
          </div>
        </div>

      </div>

      {/* Dynamic Farming Advisories Section (3 Apple Utility Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5">
        
        <div className="p-4 sm:p-5 rounded-[18px] bg-white border border-[#e0e0e0] shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-[#0066cc]">
            <Droplets size={18} />
            <h3 className="font-semibold text-sm text-[#1d1d1f]">{t.wateringAdvisory}</h3>
          </div>
          <p className="text-xs text-[#7a7a7a] leading-relaxed">
            {currentWeather.dynamicWatering || t.wateringAdvisoryDesc}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-[18px] bg-white border border-[#e0e0e0] shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-amber-600">
            <AlertTriangle size={18} />
            <h3 className="font-semibold text-sm text-[#1d1d1f]">{t.pestAlert}</h3>
          </div>
          <p className="text-xs text-[#7a7a7a] leading-relaxed">
            {currentWeather.dynamicPest || t.pestAlertDesc}
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-[18px] bg-white border border-[#e0e0e0] shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-emerald-600">
            <ShieldCheck size={18} />
            <h3 className="font-semibold text-sm text-[#1d1d1f]">{t.harvestingWindow}</h3>
          </div>
          <p className="text-xs text-[#7a7a7a] leading-relaxed">
            {currentWeather.dynamicHarvest || t.harvestingDesc}
          </p>
        </div>

      </div>

      {/* Forecast View Mode Toggle & Timeline Strip */}
      <div className="p-4 sm:p-7 rounded-[18px] sm:rounded-[24px] bg-white border border-[#e0e0e0] shadow-xs space-y-4 sm:space-y-5 overflow-hidden">
        
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-semibold text-[#1d1d1f]">
            {forecastView === 'hourly' ? t.hourlyForecast : t.sevenDayForecast}
          </h2>

          {/* Apple Segmented Toggle Pill */}
          <div className="flex p-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/70 text-xs font-semibold">
            <button
              onClick={() => setForecastView('hourly')}
              className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                forecastView === 'hourly' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              {t.forecast24h}
            </button>
            <button
              onClick={() => setForecastView('7day')}
              className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                forecastView === '7day' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              {t.forecast5d}
            </button>
          </div>
        </div>

        {/* 1. 24-Hour Horizontal Hourly Strip */}
        {forecastView === 'hourly' && (
          <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
            {hourlyList.map((hour, idx) => {
              return (
                <div
                  key={idx}
                  className="min-w-[85px] p-3.5 rounded-[16px] bg-[#f5f5f7] border border-[#d2d2d7]/50 text-center space-y-2 shrink-0 hover:border-[#0071e3]/40 transition-all"
                >
                  <span className="text-[11px] font-semibold text-[#86868b] block">{hour.time}</span>
                  <div className="w-8 h-8 rounded-full bg-white text-[#0071e3] text-lg mx-auto flex items-center justify-center shadow-xs">
                    <span>{hour.icon || '⛅'}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#1d1d1f] block">{hour.temp}</span>
                  <span className="text-[10px] font-semibold text-blue-600 block">🌧️ {hour.rain}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. 7-Day Forecast List */}
        {forecastView === '7day' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {forecast7DaysList.map((day, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[16px] bg-[#f5f5f7] border border-[#d2d2d7]/50 space-y-2 text-center"
              >
                <span className="text-xs font-semibold text-[#1d1d1f] block">{day.day}</span>
                <span className="text-2xl block">{day.icon || '🌧️'}</span>
                <div className="flex justify-center space-x-2 text-xs">
                  <span className="font-semibold text-[#1d1d1f]">{day.tempMax}°C</span>
                  <span className="text-[#86868b]">{day.tempMin}°C</span>
                </div>
                <span className="text-[10px] font-semibold text-blue-600 block">Rain: {day.rainChance}%</span>
                <span className="text-[10px] text-[#6e6e73] block leading-tight">{day.advisory}</span>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
