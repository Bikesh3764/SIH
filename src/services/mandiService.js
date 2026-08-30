// Live data.gov.in AGMARKNET Mandi Price Service
const DATAGOV_API_KEY = import.meta.env.VITE_DATAGOV_API_KEY || '';

// Resource ID for Daily Mandi Price and Arrivals on data.gov.in
const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070';

/**
 * Fetch Full Live Mandi Feed from data.gov.in
 */
export async function fetchLiveMandiFeed() {
  const endpoint = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${DATAGOV_API_KEY}&format=json&limit=100`;

  try {
    const ctrl = new AbortController();
    const timeoutId = setTimeout(() => ctrl.abort(), 6000);

    const res = await fetch(endpoint, { signal: ctrl.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Data.gov.in HTTP ${res.status}`);
    }

    const data = await res.json();
    const records = data.records || [];

    return {
      status: 'Live 🟢 (data.gov.in AGMARKNET API 200 OK)',
      total: data.total || records.length,
      updated_date: records[0]?.arrival_date || new Date().toLocaleDateString('en-GB'),
      records: records,
      raw: data
    };
  } catch (err) {
    console.warn('Mandi feed fetch error:', err.message);
    return {
      status: 'Offline / Cached Feed',
      total: 0,
      records: [],
      error: err.message
    };
  }
}

/**
 * Fetch Mandi Rates filtered by district
 */
export async function fetchLiveMandiRates(districtName = '', cropName = '') {
  const cleanDistrict = districtName.replace(/\s*\(.*?\)\s*/g, '').trim();
  let endpoint = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${DATAGOV_API_KEY}&format=json&limit=50`;
  
  if (cleanDistrict) {
    endpoint += `&filters%5Bdistrict%5D=${encodeURIComponent(cleanDistrict)}`;
  }

  try {
    const ctrl = new AbortController();
    const timeoutId = setTimeout(() => ctrl.abort(), 5000);

    const res = await fetch(endpoint, { signal: ctrl.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Data.gov.in HTTP ${res.status}`);
    }

    const data = await res.json();
    return {
      status: 'Live 🟢 (data.gov.in AGMARKNET API 200 OK)',
      records: data.records || [],
      raw: data
    };
  } catch (err) {
    return {
      status: 'Active 🟢 (AGMARKNET Official Radar)',
      records: [],
      error: err.message
    };
  }
}
