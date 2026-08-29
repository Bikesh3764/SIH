import React, { useState } from 'react';
import { 
  SAMPLE_VOICE_QUERIES, 
  SAMPLE_CROP_DISEASES, 
  MANDI_PRICES_DATA, 
  WEATHER_FORECAST_DATA,
  UI_TRANSLATIONS 
} from '../data/mockAgriData';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Send, 
  Camera, 
  Check, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  CloudRain, 
  Sun, 
  CloudSun, 
  CloudLightning, 
  Droplets, 
  Sparkles, 
  Leaf, 
  ShieldAlert, 
  RefreshCw,
  Info,
  ChevronRight,
  WifiOff
} from 'lucide-react';

export default function FarmerPortal({ currentLang, isOfflineMode, triggerDistressAlert }) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  // Voice Assistant State
  const [isRecording, setIsRecording] = useState(false);
  const [customQuery, setCustomQuery] = useState('');
  const [activeVoiceResult, setActiveVoiceResult] = useState(SAMPLE_VOICE_QUERIES[0]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Crop Disease Scanner State
  const [selectedDisease, setSelectedDisease] = useState(SAMPLE_CROP_DISEASES[0]);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);

  // Mandi Radar State
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const currentMandi = MANDI_PRICES_DATA[selectedCropIndex];

  // Speech Synthesis Function
  const speakText = (text, langCode) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    // Best effort language matching
    if (langCode === 'hi' || currentLang === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (langCode === 'mr' || currentLang === 'mr') {
      utterance.lang = 'mr-IN';
    } else if (langCode === 'ta' || currentLang === 'ta') {
      utterance.lang = 'ta-IN';
    } else if (langCode === 'te' || currentLang === 'te') {
      utterance.lang = 'te-IN';
    } else {
      utterance.lang = 'en-US';
    }

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceSimulate = (queryObj) => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setActiveVoiceResult(queryObj);
      speakText(queryObj.audioResponse, queryObj.lang);
    }, 1000);
  };

  const handleDiseaseSelect = (disease) => {
    setIsAnalyzingImage(true);
    setTimeout(() => {
      setSelectedDisease(disease);
      setIsAnalyzingImage(false);
    }, 600);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Farmer Location & Context Bar */}
      <div className="p-4 sm:p-5 rounded-[18px] apple-card-glass shadow-apple-product flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-700 text-xl font-bold shadow-inner">
            👨‍🌾
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">
                Ramesh Patil (रुपये धारक किसान)
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                Verified Landholder
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              📍 Ghatanji Taluk, Yavatmal, Maharashtra • 4.2 Acres (Cotton & Soybean)
            </p>
          </div>
        </div>

        <div className="flex items-center flex-wrap gap-2 w-full md:w-auto">
          {isOfflineMode && (
            <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-medium animate-pulse">
              <WifiOff size={14} className="text-amber-600" />
              <span>{t.offlineStatus}</span>
            </div>
          )}

          {/* Emergency SOS Distress Button */}
          <button
            onClick={triggerDistressAlert}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-medium transition-all shadow-sm"
          >
            <ShieldAlert size={15} />
            <span>Report Crop Loss / Crisis</span>
          </button>
        </div>
      </div>

      {/* Grid: Voice Agronomist (Left) + Leaf Doctor (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Section 1: Voice & Multilingual Agronomist (Col 6) */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-[18px] apple-card-glass shadow-apple-product flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0066cc] flex items-center justify-center">
                  <Mic size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">{t.voiceAdvisor}</h3>
                  <p className="text-xs text-neutral-500">Instant spoken guidance in Hindi, Marathi & English</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-[#0066cc] border border-blue-200">
                AI Speech Engine
              </span>
            </div>

            {/* Microphone Central Action */}
            <div className="my-6 p-6 rounded-[16px] bg-[#f5f5f7] border border-black/[0.04] text-center flex flex-col items-center">
              <button
                onClick={() => handleVoiceSimulate(SAMPLE_VOICE_QUERIES[0])}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg active:scale-95 ${
                  isRecording 
                    ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-300' 
                    : 'bg-[#0066cc] text-white hover:bg-[#0071e3] hover:shadow-blue-400/40 ring-4 ring-blue-100'
                }`}
              >
                {isRecording ? <MicOff size={32} /> : <Mic size={32} />}
              </button>

              <p className="mt-4 text-sm font-medium text-[#1d1d1f]">
                {isRecording ? 'Listening in Marathi / Hindi / English...' : t.speakQuestion}
              </p>
              <p className="text-xs text-neutral-400 mt-1">Tap above or test the preset questions below</p>
            </div>

            {/* Preset Voice Questions */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                Common Farmer Inquiries (Click to Ask):
              </p>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {SAMPLE_VOICE_QUERIES.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleVoiceSimulate(q)}
                    className="w-full text-left p-2.5 rounded-[11px] bg-white hover:bg-blue-50/60 border border-black/[0.05] hover:border-blue-300 text-xs font-medium text-neutral-800 transition-all flex items-center justify-between group active:scale-98"
                  >
                    <span className="line-clamp-1">🎙️ {q.queryText}</span>
                    <ChevronRight size={14} className="text-neutral-400 group-hover:text-[#0066cc] shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active AI Response Card */}
          {activeVoiceResult && (
            <div className="p-4 rounded-[14px] bg-blue-50/80 border border-blue-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0066cc] flex items-center gap-1">
                  <Sparkles size={14} /> Kisan AI Response
                </span>
                <button
                  onClick={() => speakText(activeVoiceResult.audioResponse, activeVoiceResult.lang)}
                  className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white text-[#0066cc] text-xs font-semibold border border-blue-200 hover:bg-blue-50 active:scale-95 transition-all"
                >
                  {isPlayingAudio ? <VolumeX size={13} /> : <Volume2 size={13} />}
                  <span>{isPlayingAudio ? 'Stop Audio' : 'Listen Spoken'}</span>
                </button>
              </div>

              <p className="text-sm text-neutral-800 leading-relaxed">
                "{activeVoiceResult.audioResponse}"
              </p>

              <div className="p-2.5 rounded-[9px] bg-white border border-blue-200 flex items-start space-x-2">
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide shrink-0">
                  🎯 Action:
                </span>
                <span className="text-xs text-neutral-700 font-medium">
                  {activeVoiceResult.actionItem}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: AI Crop Disease Doctor (Col 6) */}
        <div className="lg:col-span-6 p-6 sm:p-7 rounded-[18px] apple-card-glass shadow-apple-product flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Leaf size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">{t.diseaseDoctor}</h3>
                  <p className="text-xs text-neutral-500">Computer Vision symptom detection & zero-budget remedies</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                MobileNet-V3 Vision
              </span>
            </div>

            {/* Disease Sample Selector Pills */}
            <div className="my-4">
              <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                {t.testPresets}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_CROP_DISEASES.map((dis) => (
                  <button
                    key={dis.id}
                    onClick={() => handleDiseaseSelect(dis)}
                    className={`p-2.5 rounded-[11px] text-xs font-medium text-left transition-all border flex items-center justify-between ${
                      selectedDisease.id === dis.id
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold shadow-sm'
                        : 'bg-[#f5f5f7] border-black/[0.05] text-neutral-700 hover:bg-neutral-200/60'
                    }`}
                  >
                    <span className="line-clamp-1">{dis.crop}: {dis.name.split('(')[0]}</span>
                    {selectedDisease.id === dis.id && <Check size={14} className="text-emerald-600 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Diagnostic Result Card */}
            {isAnalyzingImage ? (
              <div className="h-64 rounded-[16px] bg-[#f5f5f7] flex flex-col items-center justify-center text-neutral-500 space-y-3">
                <RefreshCw size={28} className="animate-spin text-emerald-600" />
                <span className="text-xs font-medium">Scanning leaf chlorophyll & pathogen patterns...</span>
              </div>
            ) : (
              <div className="p-4 rounded-[16px] bg-[#f5f5f7] border border-black/[0.04] space-y-4">
                <div className="flex gap-4 items-center">
                  <img
                    src={selectedDisease.image}
                    alt={selectedDisease.name}
                    className="w-20 h-20 rounded-[12px] object-cover border border-black/10 shadow-sm shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                        {selectedDisease.severity} Severity
                      </span>
                      <span className="text-xs font-medium text-emerald-700">
                        {selectedDisease.confidence}% Match
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-[#1d1d1f] tracking-tight">
                      {selectedDisease.name}
                    </h4>
                    <p className="text-xs text-neutral-600 line-clamp-2">
                      {selectedDisease.symptoms}
                    </p>
                  </div>
                </div>

                {/* Dual Treatment Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {/* Organic Treatment */}
                  <div className="p-3 rounded-[11px] bg-emerald-50/80 border border-emerald-200 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                      🌱 {t.organicRemedy}
                    </span>
                    <p className="text-xs text-neutral-800 leading-snug">
                      {selectedDisease.organicTreatment}
                    </p>
                  </div>

                  {/* Chemical Treatment */}
                  <div className="p-3 rounded-[11px] bg-amber-50/80 border border-amber-200 space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                      🧪 {t.chemicalRemedy}
                    </span>
                    <p className="text-xs text-neutral-800 leading-snug">
                      {selectedDisease.chemicalTreatment}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] text-neutral-500 flex items-center gap-1.5 pt-1">
                  <Info size={13} className="text-neutral-400 shrink-0" />
                  <span><b>Prevention:</b> {selectedDisease.prevention}</span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Grid: Mandi Price Radar & Sell Timing (Left) + Hyperlocal Weather (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Section 3: Mandi Radar (Col 7) */}
        <div className="lg:col-span-7 p-6 sm:p-7 rounded-[18px] apple-card-glass shadow-apple-product space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-black/[0.06] gap-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                <TrendingUp size={18} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">{t.mandiRadar}</h3>
                <p className="text-xs text-neutral-500">Real-time AGMARKNET comparison across nearby mandis</p>
              </div>
            </div>

            {/* Crop Selector Tabs */}
            <div className="flex items-center space-x-1.5 bg-[#f5f5f7] p-1 rounded-full border border-black/[0.04]">
              {MANDI_PRICES_DATA.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCropIndex(idx)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all active:scale-95 ${
                    selectedCropIndex === idx
                      ? 'bg-white text-[#1d1d1f] shadow-sm font-semibold'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {item.crop.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Mandi Recommendation Banner */}
          <div className={`p-4 rounded-[14px] border flex items-start justify-between gap-4 ${
            currentMandi.advisory === 'HOLD'
              ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
              : 'bg-amber-50/90 border-amber-200 text-amber-950'
          }`}>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                  currentMandi.advisory === 'HOLD' ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'
                }`}>
                  AI Mandi Decision: {currentMandi.advisory}
                </span>
                <span className="text-xs font-medium text-neutral-600">MSP: ₹{currentMandi.msp}/qtl</span>
              </div>
              <p className="text-xs font-medium leading-relaxed">
                {currentMandi.advisoryText}
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-xs text-neutral-500 block">Optimal Action</span>
              <span className="text-xs font-bold text-[#0066cc]">{currentMandi.action}</span>
            </div>
          </div>

          {/* 3 Mandi Price Comparison Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentMandi.mandis.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-[14px] border transition-all ${
                  idx === 0
                    ? 'bg-white border-blue-300 ring-2 ring-blue-100 shadow-sm'
                    : 'bg-[#f5f5f7] border-black/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-neutral-500">
                  <span>{m.distance} away</span>
                  <span className="font-semibold text-emerald-700">{m.status}</span>
                </div>
                <h5 className="font-bold text-sm text-[#1d1d1f] mt-1 line-clamp-1">{m.name}</h5>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl font-bold text-[#1d1d1f]">₹{m.price}</span>
                  <span className={`text-xs font-semibold ${m.trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {m.trend}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">per Quintal</span>
              </div>
            ))}
          </div>

          {/* 7-Day Trend Chart Mini-Bars */}
          <div className="p-4 rounded-[14px] bg-[#f5f5f7] border border-black/[0.04]">
            <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider block mb-3">
              7-Day APMC Price Trend & Predictive Horizon (₹/qtl)
            </span>
            <div className="flex items-end justify-between gap-2 h-24 pt-2">
              {currentMandi.trendDays.map((tDay, idx) => {
                const maxP = 7200;
                const minP = 2200;
                const heightPct = Math.min(100, Math.max(25, ((tDay.price - minP) / (maxP - minP)) * 100));
                const isPred = tDay.day.includes('Pred');

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                    <span className="text-[10px] font-bold text-neutral-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{tDay.price}
                    </span>
                    <div 
                      style={{ height: `${heightPct}%` }}
                      className={`w-full max-w-[28px] rounded-t-[6px] transition-all ${
                        isPred 
                          ? 'bg-blue-400/60 border border-dashed border-blue-600' 
                          : 'bg-[#0066cc] group-hover:bg-[#0071e3]'
                      }`}
                    ></div>
                    <span className="text-[10px] text-neutral-500 font-medium whitespace-nowrap">
                      {tDay.day.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 4: Hyperlocal Weather & Agronomy Advice (Col 5) */}
        <div className="lg:col-span-5 p-6 sm:p-7 rounded-[18px] apple-card-glass shadow-apple-product space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-[#0066cc] flex items-center justify-center">
                <CloudSun size={18} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1d1d1f] tracking-tight">{t.weatherEngine}</h3>
                <p className="text-xs text-neutral-500">Microclimate radar for Ghatanji Block</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-blue-50 text-[#0066cc] border border-blue-200">
              Open-Meteo Feed
            </span>
          </div>

          {/* Current Weather Card */}
          <div className="p-5 rounded-[16px] bg-gradient-to-br from-blue-900 to-indigo-950 text-white space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-200 uppercase tracking-wider">Live Soil Moisture & Temp</span>
                <div className="text-3xl font-bold tracking-tight mt-0.5">{WEATHER_FORECAST_DATA.currentTemp}</div>
                <div className="text-xs text-blue-200 mt-0.5">{WEATHER_FORECAST_DATA.condition}</div>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
                <CloudSun size={32} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/15 text-xs text-blue-100">
              <div>
                <span className="text-blue-300 text-[11px]">Soil Moisture:</span>
                <p className="font-semibold">{WEATHER_FORECAST_DATA.soilMoisture}</p>
              </div>
              <div>
                <span className="text-blue-300 text-[11px]">Rainfall Chance:</span>
                <p className="font-semibold text-amber-300">{WEATHER_FORECAST_DATA.precipitationChance}</p>
              </div>
            </div>
          </div>

          {/* Actionable Farming Weather Advisory */}
          <div className="p-4 rounded-[14px] bg-amber-50/90 border border-amber-200 text-neutral-800 space-y-1.5">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wide">
              <AlertTriangle size={14} className="text-amber-700" /> Agronomy Risk Alert:
            </span>
            <p className="text-xs leading-relaxed text-amber-950 font-medium">
              {WEATHER_FORECAST_DATA.hyperlocalAdvisory}
            </p>
          </div>

          {/* 5-Day Compact Forecast */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">5-Day Outlook:</span>
            <div className="divide-y divide-black/[0.04]">
              {WEATHER_FORECAST_DATA.days.map((d, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-800 w-20">{d.day}</span>
                  <span className="text-neutral-500">{d.desc}</span>
                  <span className="font-bold text-blue-700">{d.rain} rain</span>
                  <span className="text-neutral-700 font-medium">{d.temp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
