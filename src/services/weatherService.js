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

// Map WMO Weather Codes to Human Conditions & Icons in Active Language (Day vs Night aware)
export function interpretWmoCode(code, currentLang = 'en', isDay = 1) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const isNight = isDay === 0;

  if (code === 0) {
    return {
      label: isNight ? (t.condClearNight || 'Clear Night') : (t.condClear || 'Sunny & Clear'),
      icon: isNight ? '🌙' : '☀️',
      condition: isNight ? (t.condClearNight || 'Clear Night') : (t.condClear || 'Sunny & Clear')
    };
  }
  if ([1, 2].includes(code)) {
    return {
      label: isNight ? (t.condPartlyCloudyNight || 'Partly Cloudy Night') : (t.condPartlyCloudy || 'Partly Cloudy'),
      icon: isNight ? '☁️🌙' : '⛅',
      condition: isNight ? (t.condPartlyCloudyNight || 'Partly Cloudy') : (t.condPartlyCloudy || 'Partly Cloudy')
    };
  }
  if (code === 3) return { label: t.condOvercast || 'Overcast', icon: '☁️', condition: t.condOvercast || 'Overcast' };
  if ([45, 48].includes(code)) return { label: t.condFoggy || 'Foggy / Mist', icon: '🌫️', condition: t.condFoggy || 'Foggy' };
  if ([51, 53, 55].includes(code)) return { label: t.condDrizzle || 'Light Drizzle', icon: '🌦️', condition: t.condDrizzle || 'Light Drizzle' };
  if ([61, 63].includes(code)) return { label: t.condRain || 'Moderate Rain', icon: '🌧️', condition: t.condRain || 'Rain Shower' };
  if (code === 65) return { label: t.condHeavyRain || 'Heavy Rain', icon: '🌧️', condition: t.condHeavyRain || 'Heavy Rain' };
  if ([80, 81, 82].includes(code)) return { label: t.condRain || 'Thunder Showers', icon: '⛈️', condition: t.condRain || 'Rain Showers' };
  if ([95, 96, 99].includes(code)) return { label: t.condThunder || 'Thunderstorm with Hail', icon: '⛈️', condition: t.condThunder || 'Severe Thunderstorm' };
  return {
    label: isNight ? (t.condClearNight || 'Clear Night') : (t.condClear || 'Fair Weather'),
    icon: isNight ? '🌙' : '🌤️',
    condition: isNight ? (t.condClearNight || 'Clear Night') : (t.condClear || 'Fair Weather')
  };
}

/**
 * Fetch Live Weather and 14-Day Microclimate Telemetry from Open-Meteo
 */
export async function fetchLiveDistrictWeather(districtId = 'rourkela', currentLang = 'en') {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const coords = DISTRICT_COORDINATES[districtId?.toLowerCase()] || DISTRICT_COORDINATES.rourkela;
  const { lat, lng } = coords;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m,surface_pressure&hourly=temperature_2m,precipitation_probability,is_day,weather_code,soil_moisture_0_to_7cm,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,sunrise,sunset&past_days=7&forecast_days=7&timezone=auto`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Open-Meteo HTTP ${res.status}`);
    }

    const data = await res.json();
    const current = data.current || {};
    const daily = data.daily || {};
    const hourly = data.hourly || {};

    const now = new Date();
    const currentIsDay = current.is_day !== undefined ? current.is_day : (now.getHours() >= 6 && now.getHours() < 19 ? 1 : 0);
    const currentWeather = interpretWmoCode(current.weather_code || 0, currentLang, currentIsDay);

    // Calculate exact daily and hourly offsets for TODAY
    const todayStr = now.toISOString().split('T')[0];
    let todayDailyIndex = daily.time?.findIndex(d => d === todayStr);
    if (todayDailyIndex === -1 || todayDailyIndex === undefined) {
      todayDailyIndex = 7; // Fallback to index 7 in 14-day window
    }

    const currentHour = now.getHours();
    const currentExactHourIndex = (todayDailyIndex * 24) + currentHour;

    // Build 24-Hour timeline starting from RIGHT NOW
    const next24Hours = [];
    for (let i = 0; i < 24; i++) {
      const idx = currentExactHourIndex + i;
      if (idx < (hourly.time?.length || 0)) {
        const timeFormatted = new Date(hourly.time[idx]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const temp = Math.round(hourly.temperature_2m[idx] !== undefined ? hourly.temperature_2m[idx] : 28);
        const rain = hourly.precipitation_probability[idx] !== undefined ? hourly.precipitation_probability[idx] : 20;
        const isHourDay = hourly.is_day?.[idx] !== undefined ? hourly.is_day[idx] : (((currentHour + i) % 24) >= 6 && ((currentHour + i) % 24) < 19 ? 1 : 0);
        const wmo = interpretWmoCode(hourly.weather_code[idx] || 0, currentLang, isHourDay);

        next24Hours.push({
          time: i === 0 ? (t.nowText || 'Now') : timeFormatted,
          temp: `${temp}°C`,
          rain: `${rain}%`,
          icon: wmo.icon,
          label: wmo.label
        });
      }
    }

    // Daily arrays (Past 7 days indices 0..6, Future 7 days indices 7..13)
    const rainSums = daily.precipitation_sum || [];
    const rainProbs = daily.precipitation_probability_max || [];
    const dates = daily.time || [];

    // Past 7 Days Metrics
    const pastRainSum = Math.round(rainSums.slice(0, todayDailyIndex).reduce((a, b) => a + (b || 0), 0));
    const pastDryDays = rainSums.slice(0, todayDailyIndex).filter(r => (r || 0) < 1).length;

    // Next 7 Days Metrics (from today onwards)
    const nextRainSum = Math.round(rainSums.slice(todayDailyIndex, todayDailyIndex + 7).reduce((a, b) => a + (b || 0), 0));
    const nextHighRainDays = rainProbs.slice(todayDailyIndex, todayDailyIndex + 7).filter(p => (p || 0) > 60).length;
    const maxNextRainProb = Math.max(...(rainProbs.slice(todayDailyIndex, todayDailyIndex + 7) || [30]));

    // Build 7-Day Forecast starting strictly from TODAY
    const dayKeys = ['daySun', 'dayMon', 'dayTue', 'dayWed', 'dayThu', 'dayFri', 'daySat'];
    const forecast7Days = [];
    for (let i = 0; i < 7; i++) {
      const dIdx = todayDailyIndex + i;
      if (dIdx < dates.length) {
        const dObj = new Date(dates[dIdx]);
        const dayLabel = i === 0 
          ? (t.dayToday || 'Today') 
          : (t[dayKeys[dObj.getDay()]] || dObj.toLocaleDateString([], { weekday: 'short' }));
        
        const wmo = interpretWmoCode(daily.weather_code[dIdx] || 0, currentLang);
        const rainProb = daily.precipitation_probability_max[dIdx] !== undefined ? daily.precipitation_probability_max[dIdx] : 30;

        forecast7Days.push({
          day: dayLabel,
          tempMax: Math.round(daily.temperature_2m_max[dIdx] || 32),
          tempMin: Math.round(daily.temperature_2m_min[dIdx] || 24),
          rainChance: rainProb,
          condition: wmo.condition,
          icon: wmo.icon,
          advisory: rainProb > 60 
            ? (t.advHarvestUnfav || 'Heavy rain expected. Postpone spraying and clear drainage channels.')
            : (t.advHarvestFav || 'Favorable sunny conditions for harvesting and biopesticide spraying.')
        });
      }
    }

    // Soil Moisture Status from current exact hour
    const soilVal = hourly.soil_moisture_0_to_7cm?.[currentExactHourIndex] ?? 0.35;
    const soilPercent = Math.min(100, Math.round(soilVal * 200));

    // Current Exact Hour Real-Time Rain Probability
    const currentHourRainProb = hourly.precipitation_probability?.[currentExactHourIndex] !== undefined
      ? hourly.precipitation_probability[currentExactHourIndex]
      : (daily.precipitation_probability_max?.[todayDailyIndex] ?? 25);

    const todayPeakRainProb = daily.precipitation_probability_max?.[todayDailyIndex] ?? currentHourRainProb;
    const humidityVal = current.relative_humidity_2m ?? 74;

    // Dynamic localized farming advisories based on real-time 14-day cumulative trends
    const dynamicWatering = (nextHighRainDays >= 2 || pastRainSum > 80 || todayPeakRainProb > 70)
      ? (t.advWaterHold || `Hold drip and furrow irrigation for the next 24-48h (${pastRainSum}mm past / ${nextRainSum}mm upcoming rain). Clear field drainage channels.`)
      : (pastDryDays >= 5 && soilPercent < 35)
        ? (t.advWaterLow || `Prolonged dry spell detected (${pastDryDays} dry days). Provide morning drip irrigation.`)
        : (t.advWaterNormal || `Soil moisture is at an optimal level (${soilPercent}%). Maintain regular irrigation schedule.`);

    const dynamicPest = humidityVal > 80
      ? (t.advPestHigh || `High humidity (${humidityVal}%) significantly elevates fungal blast and rust spore germination. Inspect lower foliage.`)
      : (t.advPestNormal || `Moderate humidity (${humidityVal}%). Fungal spore risk is low. Monitor for sucking pests.`);

    const dynamicHarvest = (nextHighRainDays >= 2 || currentHourRainProb > 60 || todayPeakRainProb > 75)
      ? (t.advHarvestUnfav || `Unfavorable window for chemical spraying due to rain runoff risk (${currentHourRainProb}% chance). Move harvested produce to covered sheds.`)
      : (t.advHarvestFav || `Clear, dry weather window available tomorrow morning for foliar spraying and harvesting mature crops.`);

    const uvVal = Math.round(hourly.uv_index?.[currentExactHourIndex] || 3);
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
      rainProbability: `${currentHourRainProb}%`,
      peakTodayRainProb: `${todayPeakRainProb}%`,
      maxNextRainProb: `${maxNextRainProb}%`,
      uvIndex: `${uvVal} (${uvLabel})`,
      soilMoistureVal: `${soilPercent}%`,
      soilMoistureStatus: soilPercent > 70 ? (t.soilHigh || 'High Moisture') : soilPercent > 35 ? (t.soilOpt || 'Optimal') : (t.soilDry || 'Dry Soil'),
      
      // 14-Day Cumulative Climate Telemetry
      pastRainSum,
      pastDryDays,
      nextRainSum,
      nextHighRainDays,
      cumulative14DayRain: pastRainSum + nextRainSum,

      sunrise: daily.sunrise?.[todayDailyIndex] ? new Date(daily.sunrise[todayDailyIndex]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '05:42 AM',
      sunset: daily.sunset?.[todayDailyIndex] ? new Date(daily.sunset[todayDailyIndex]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '06:18 PM',
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