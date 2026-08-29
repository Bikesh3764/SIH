import React, { useState } from 'react';
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

export default function WeatherAdvisory({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [selectedDistrict, setSelectedDistrict] = useState(DISTRICTS_DATA[1]); // Yavatmal
  const [forecastView, setForecastView] = useState('hourly'); // 'hourly' | '7day'

  const hourlyData = [
    { time: '00:00', temp: '26°C', rain: '20%', icon: CloudSun, condition: 'Clear' },
    { time: '01:00', temp: '25°C', rain: '15%', icon: CloudSun, condition: 'Clear' },
    { time: '02:00', temp: '25°C', rain: '10%', icon: CloudSun, condition: 'Clear' },
    { time: '03:00', temp: '24°C', rain: '10%', icon: CloudSun, condition: 'Clear' },
    { time: '04:00', temp: '24°C', rain: '15%', icon: CloudSun, condition: 'Clear' },
    { time: '05:00', temp: '24°C', rain: '20%', icon: CloudSun, condition: 'Partly Cloudy' },
    { time: '06:00', temp: '25°C', rain: '30%', icon: Sun, condition: 'Sunrise' },
    { time: '07:00', temp: '27°C', rain: '35%', icon: Sun, condition: 'Sunny' },
    { time: '08:00', temp: '29°C', rain: '40%', icon: Sun, condition: 'Sunny' },
    { time: '09:00', temp: '31°C', rain: '45%', icon: CloudSun, condition: 'Warm' },
    { time: '10:00', temp: '33°C', rain: '50%', icon: CloudSun, condition: 'Warm' },
    { time: '11:00', temp: '34°C', rain: '60%', icon: CloudSun, condition: 'Humidity Rising' },
    { time: '12:00', temp: '35°C', rain: '65%', icon: CloudSun, condition: 'Hot' },
    { time: '13:00', temp: '35°C', rain: '70%', icon: CloudRain, condition: 'Overcast' },
    { time: '14:00', temp: '33°C', rain: '85%', icon: CloudRain, condition: 'Rain Showers' },
    { time: '15:00', temp: '31°C', rain: '80%', icon: CloudRain, condition: 'Heavy Rain' },
    { time: '16:00', temp: '30°C', rain: '75%', icon: CloudRain, condition: 'Rain' },
    { time: '17:00', temp: '29°C', rain: '60%', icon: CloudSun, condition: 'Scattered Clouds' },
    { time: '18:00', temp: '28°C', rain: '45%', icon: Sun, condition: 'Sunset' },
    { time: '19:00', temp: '28°C', rain: '35%', icon: CloudSun, condition: 'Dusk' },
    { time: '20:00', temp: '27°C', rain: '25%', icon: CloudSun, condition: 'Clear' },
    { time: '21:00', temp: '27°C', rain: '20%', icon: CloudSun, condition: 'Clear' },
    { time: '22:00', temp: '26°C', rain: '15%', icon: CloudSun, condition: 'Clear' },
    { time: '23:00', temp: '26°C', rain: '10%', icon: CloudSun, condition: 'Clear' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-apple-fade text-[#1d1d1f]">
      
      {/* Header & District Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-apple-in">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">
            {t.weatherPageTitle}
          </h1>
          <p className="text-sm text-[#86868b] font-normal">
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
      <div className="p-7 sm:p-9 rounded-[26px] bg-gradient-to-br from-[#0066cc] to-[#0077ed] text-white shadow-[0_12px_32px_rgba(0,102,204,0.22)] space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-blue-100 uppercase tracking-wider block">
              Current Weather Conditions
            </span>
            <div className="flex items-baseline space-x-3 mt-1">
              <span className="text-5xl sm:text-6xl font-semibold tracking-tight text-white">32°C</span>
              <span className="text-xl font-medium text-blue-100">Overcast</span>
            </div>
            <span className="text-xs text-blue-100 mt-1 block">
              Feels like 36°C • Updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20">
            <CloudSun size={38} className="text-white" />
          </div>
        </div>

        {/* 6 Key Weather Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-3 border-t border-white/20 text-xs">
          <div className="p-3 rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-semibold block">Soil Moisture</span>
            <span className="text-base font-semibold text-white">68% Optimal</span>
          </div>
          <div className="p-3 rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-semibold block">Rain Chance</span>
            <span className="text-base font-semibold text-white">74% High</span>
          </div>
          <div className="p-3 rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-semibold block">Wind Speed</span>
            <span className="text-base font-semibold text-white">14 km/h WNW</span>
          </div>
          <div className="p-3 rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-semibold block">Air Humidity</span>
            <span className="text-base font-semibold text-white">78%</span>
          </div>
          <div className="p-3 rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-semibold block">Barometric</span>
            <span className="text-base font-semibold text-white">1008 hPa</span>
          </div>
          <div className="p-3 rounded-[14px] bg-white/10 backdrop-blur-md border border-white/15">
            <span className="text-[10px] text-blue-200 uppercase font-semibold block">UV Index</span>
            <span className="text-base font-semibold text-white">4 (Moderate)</span>
          </div>
        </div>

      </div>

      {/* Farming Advisories Section (3 Apple Utility Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        
        <div className="p-5 rounded-[20px] bg-white border border-[#d2d2d7]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-2">
          <div className="flex items-center space-x-2 text-[#0071e3]">
            <Droplets size={18} />
            <h3 className="font-semibold text-sm text-[#1d1d1f]">Watering Advisory</h3>
          </div>
          <p className="text-xs text-[#6e6e73] leading-relaxed">
            Heavy afternoon rain expected (14:00 - 16:00). <b>Hold drip irrigation</b> for the next 24 hours to prevent root waterlogging.
          </p>
        </div>

        <div className="p-5 rounded-[20px] bg-white border border-[#d2d2d7]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-2">
          <div className="flex items-center space-x-2 text-amber-600">
            <AlertTriangle size={18} />
            <h3 className="font-semibold text-sm text-[#1d1d1f]">Pest & Fungal Alert</h3>
          </div>
          <p className="text-xs text-[#6e6e73] leading-relaxed">
            High humidity (78%) and warm temperature promote <b>early fungal spore germination</b>. Inspect lower crop foliage regularly.
          </p>
        </div>

        <div className="p-5 rounded-[20px] bg-white border border-[#d2d2d7]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-2">
          <div className="flex items-center space-x-2 text-emerald-600">
            <ShieldCheck size={18} />
            <h3 className="font-semibold text-sm text-[#1d1d1f]">Harvesting Window</h3>
          </div>
          <p className="text-xs text-[#6e6e73] leading-relaxed">
            Dry clear window available between <b>07:00 - 11:00 AM</b> tomorrow for spraying organic biopesticides and harvesting leafy produce.
          </p>
        </div>

      </div>

      {/* Forecast View Mode Toggle & Timeline Strip */}
      <div className="p-6 sm:p-7 rounded-[24px] bg-white border border-[#d2d2d7]/60 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
        
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#1d1d1f]">
            {forecastView === 'hourly' ? '24-Hour Hourly Forecast' : '7-Day Agronomy Forecast'}
          </h2>

          {/* Apple Segmented Toggle Pill */}
          <div className="flex p-1 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/70 text-xs font-semibold">
            <button
              onClick={() => setForecastView('hourly')}
              className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                forecastView === 'hourly' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              Hourly Forecast
            </button>
            <button
              onClick={() => setForecastView('7day')}
              className={`px-3.5 py-1 rounded-full transition-all cursor-pointer ${
                forecastView === '7day' ? 'bg-[#0071e3] text-white shadow-xs' : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}
            >
              7-Day Forecast
            </button>
          </div>
        </div>

        {/* 1. 24-Hour Horizontal Hourly Strip */}
        {forecastView === 'hourly' && (
          <div className="flex space-x-3 overflow-x-auto pb-2 no-scrollbar">
            {hourlyData.map((hour, idx) => {
              const Icon = hour.icon;

              return (
                <div
                  key={idx}
                  className="min-w-[85px] p-3.5 rounded-[16px] bg-[#f5f5f7] border border-[#d2d2d7]/50 text-center space-y-2 shrink-0 hover:border-[#0071e3]/40 transition-all"
                >
                  <span className="text-[11px] font-semibold text-[#86868b] block">{hour.time}</span>
                  <div className="w-8 h-8 rounded-full bg-white text-[#0071e3] mx-auto flex items-center justify-center shadow-xs">
                    <Icon size={16} />
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
            {WEATHER_FORECAST_DATA.forecast7Days.map((day, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[16px] bg-[#f5f5f7] border border-[#d2d2d7]/50 space-y-2 text-center"
              >
                <span className="text-xs font-semibold text-[#1d1d1f] block">{day.day}</span>
                <span className="text-2xl block">🌧️</span>
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
