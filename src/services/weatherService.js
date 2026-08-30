// Live Hyperlocal Open-Meteo Weather Service (100% Free, Real-time & Multilingual)
import { TRANSLATIONS } from '../data/translations';

export const DISTRICT_COORDINATES = {
  rourkela: { lat: 22.2604, lng: 84.8536, name: 'Rourkela (Sundargarh)', state: 'Odisha' },
  yavatmal: { lat: 20.3888, lng: 78.1204, name: 'Yavatmal', state: 'Maharashtra' },
  ernakulam: { lat: 9.9816, lng: 76.2999, name: 'Ernakulam', state: 'Kerala' },
  karnal: { lat: 29.6857, lng: 76.9905, name: 'Karnal', state: 'Haryana' },
  bathinda: { lat: 30.2110, lng: 74.9455, name: 'Bathinda', state: 'Punjab' },
  nashik: { lat: 19.9975, lng: 73.7898, name: 'Nashik', state: 'Maharashtra' },
  pune: { lat: 18.5204, lng: 73.8567, name: 'Pune', state: 'Maharashtra' },
  latur: { lat: 18.4088, lng: 76.5604, name: 'Latur', state: 'Maharashtra' },
  indore: { lat: 22.7196, lng: 75.8577, name: 'Indore', state: 'Madhya Pradesh' }
};

// Map WMO Weather Codes to Human Conditions & Icons in Active Language
export function interpretWmoCode(code, currentLang = 'en') {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  if (code === 0) return { label: t.condClear || 'Clear Sky', icon: '☀️', condition: t.condClear || 'Sunny & Clear' };
  if ([1, 2].includes(code)) return { label: t.condPartlyCloudy || 'Partly Cloudy', icon: '⛅', condition: t.condPartlyCloudy || 'Partly Cloudy' };
  if (code === 3) return { label: t.condOvercast || 'Overcast', icon: '☁️', condition: t.condOvercast || 'Overcast' };
  if ([45, 48].includes(code)) return { label: t.condFoggy || 'Foggy / Mist', icon: '🌫️', condition: t.condFoggy || 'Foggy' };
  if ([51, 53, 55].includes(code)) return { label: t.condDrizzle || 'Light Drizzle', icon: '🌦️', condition: t.condDrizzle || 'Light Drizzle' };
  if ([61, 63].includes(code)) return { label: t.condRain || 'Moderate Rain', icon: '🌧️', condition: t.condRain || 'Rain Shower' };
  if (code === 65) return { label: t.condHeavyRain || 'Heavy Rain', icon: '🌧️', condition: t.condHeavyRain || 'Heavy Rain' };
  if ([80, 81, 82].includes(code)) return { label: t.condRain || 'Thunder Showers', icon: '⛈️', condition: t.condRain || 'Rain Showers' };
  if ([95, 96, 99].includes(code)) return { label: t.condThunder || 'Thunderstorm with Hail', icon: '⛈️', condition: t.condThunder || 'Severe Thunderstorm' };
  return { label: t.condClear || 'Normal Weather', icon: '🌤️', condition: t.condClear || 'Fair Weather' };
}

/**
 * Fetch Live Weather and Microclimate Telemetry from Open-Meteo
 */
export async function fetchLiveDistrictWeather(districtId = 'rourkela', currentLang = 'en') {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const coords = DISTRICT_COORDINATES[districtId?.toLowerCase()] || DISTRICT_COORDINATES.rourkela;
  const { lat, lng } = coords;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,precipitation_probability,weather_code,soil_moisture_0_to_7cm,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=auto`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Open-Meteo HTTP ${res.status}`);
    }

    const data = await res.json();
    const current = data.current || {};
    const daily = data.daily || {};
    const hourly = data.hourly || {};

    const currentWeather = interpretWmoCode(current.weather_code || 0, currentLang);

    // Build 24-Hour timeline from current hour onwards
    const currentHourIndex = new Date().getHours();
    const next24Hours = [];
    for (let i = 0; i < 24; i++) {
      const idx = (currentHourIndex + i) % (hourly.time?.length || 24);
      const timeStr = hourly.time?.[idx] 
        ? new Date(hourly.time[idx]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        : `${(currentHourIndex + i) % 24}:00`;
      
      const currentInstantTemp = Math.round(current.temperature_2m !== undefined ? current.temperature_2m : 28);
      const tempVal = i === 0 
        ? currentInstantTemp 
        : (hourly.temperature_2m?.[idx] !== undefined ? Math.round(hourly.temperature_2m[idx]) : 28);
      
      const rainVal = hourly.precipitation_probability?.[idx] !== undefined ? hourly.precipitation_probability[idx] : 20;
      const wmo = i === 0 ? currentWeather : interpretWmoCode(hourly.weather_code?.[idx] || 0, currentLang);

      next24Hours.push({
        time: i === 0 ? (t.nowText || 'Now') : timeStr,
        temp: `${tempVal}°C`,
        rain: `${rainVal}%`,
        icon: wmo.icon,
        label: wmo.label
      });
    }

    // Build 7-Day Forecast with Localized Day Names
    const dayKeys = ['daySun', 'dayMon', 'dayTue', 'dayWed', 'dayThu', 'dayFri', 'daySat'];
    const forecast7Days = (daily.time || []).slice(0, 7).map((dStr, i) => {
      const d = new Date(dStr);
      const dayName = i === 0 
        ? (t.dayToday || 'Today') 
        : (t[dayKeys[d.getDay()]] || d.toLocaleDateString([], { weekday: 'short' }));
      
      const wmo = interpretWmoCode(daily.weather_code?.[i] || 0, currentLang);
      const rainProb = daily.precipitation_probability_max?.[i] || 30;

      return {
        day: dayName,
        tempMax: Math.round(daily.temperature_2m_max?.[i] || 32),
        tempMin: Math.round(daily.temperature_2m_min?.[i] || 24),
        rainChance: rainProb,
        condition: wmo.condition,
        icon: wmo.icon,
        advisory: rainProb > 60 
          ? (t.advHarvestUnfav || 'Heavy rain expected. Postpone spraying and clear drainage channels.')
          : (t.advHarvestFav || 'Favorable sunny conditions for harvesting and biopesticide spraying.')
      };
    });

    // Soil Moisture Status
    const soilVal = hourly.soil_moisture_0_to_7cm?.[currentHourIndex] || 0.38;
    const soilPercent = Math.min(100, Math.round(soilVal * 200));

    const rainProbNow = daily.precipitation_probability_max?.[0] || 45;
    const humidityVal = current.relative_humidity_2m || 74;

    // Dynamic localized farming advisories
    const dynamicWatering = rainProbNow > 50 
      ? (t.advWaterHold || `Hold drip and furrow irrigation for the next 24-48h (${rainProbNow}% rain chance). Ensure field drainage channels are clear.`)
      : soilPercent < 35 
        ? (t.advWaterLow || `Soil moisture is low (${soilPercent}%). Provide light morning drip irrigation.`)
        : (t.advWaterNormal || `Soil moisture is at an optimal level (${soilPercent}%). Maintain regular irrigation schedule.`);

    const dynamicPest = humidityVal > 80
      ? (t.advPestHigh || `High humidity (${humidityVal}%) significantly elevates fungal blast and rust spore germination. Inspect lower foliage.`)
      : (t.advPestNormal || `Moderate humidity (${humidityVal}%). Fungal spore risk is low. Monitor for sucking pests.`);

    const dynamicHarvest = rainProbNow > 50
      ? (t.advHarvestUnfav || `Unfavorable window for chemical spraying due to impending rain runoff (${rainProbNow}% chance). Move harvested produce to covered warehouses.`)
      : (t.advHarvestFav || `Clear, dry weather window available tomorrow morning for foliar spraying and harvesting mature crops.`);

    const uvVal = Math.round(hourly.uv_index?.[currentHourIndex] || 3);
    const uvLabel = uvVal >= 6 ? (t.uvHigh || 'High') : uvVal >= 3 ? (t.uvModerate || 'Moderate') : (t.uvLow || 'Low');

    return {
      districtName: coords.name,
      stateName: coords.state,
      currentTemp: `${Math.round(current.temperature_2m || 28)}°C`,
      feelsLike: `${Math.round((current.temperature_2m || 28) + 2)}°C`,
      condition: currentWeather.condition,
      conditionIcon: currentWeather.icon,
      humidity: `${humidityVal}%`,
      windSpeed: `${Math.round(current.wind_speed_10m || 12)} km/h`,
      barometric: `${Math.round(current.surface_pressure || 1010)} hPa`,
      rainProbability: `${rainProbNow}%`,
      uvIndex: `${uvVal} (${uvLabel})`,
      soilMoistureVal: `${soilPercent}%`,
      soilMoistureStatus: soilPercent > 70 ? (t.soilHigh || 'High Moisture') : soilPercent > 35 ? (t.soilOpt || 'Optimal') : (t.soilDry || 'Dry Soil'),
      sunrise: daily.sunrise?.[0] ? new Date(daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '05:42 AM',
      sunset: daily.sunset?.[0] ? new Date(daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '06:18 PM',
      hourlyData: next24Hours,
      forecast7Days,
      dynamicWatering,
      dynamicPest,
      dynamicHarvest
    };
  } catch (err) {
    console.warn('Open-Meteo live API fallback to calibrated data:', err.message);
    return null;
  }
}
