// Google Gemini AI Agronomy & Vision Service

// Get API Key from localStorage (User configured in UI) or .env
export function getGeminiApiKey() {
  const customKey = typeof window !== 'undefined' ? localStorage.getItem('user_gemini_api_key') : null;
  if (customKey && customKey.trim().length > 10) {
    return customKey.trim();
  }
  return import.meta.env.VITE_GEMINI_API_KEY || '';
}

export function saveGeminiApiKey(key) {
  if (typeof window !== 'undefined') {
    if (key && key.trim().length > 10) {
      localStorage.setItem('user_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('user_gemini_api_key');
    }
  }
}

// Active standard Google Gemini Vision & Text models
const MODELS = [
  'gemini-1.5-flash',
  'gemini-2.0-flash-exp',
  'gemini-1.5-flash-8b',
  'gemini-1.5-pro'
];

/**
 * Helper to call Gemini API with automatic model fallback
 */
async function callGeminiApi(payload, modelIdx = 0) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('MISSING_API_KEY');
  }

  const model = MODELS[modelIdx] || MODELS[0];
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.warn(`Gemini model ${model} failed (${res.status}):`, errBody);
      if (res.status === 403 || res.status === 400) {
        throw new Error(`INVALID_API_KEY: ${errBody}`);
      }
      if (modelIdx + 1 < MODELS.length) {
        return callGeminiApi(payload, modelIdx + 1);
      }
      throw new Error(`Gemini API error (${res.status}): ${errBody}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    if (err.message.includes('MISSING_API_KEY') || err.message.includes('INVALID_API_KEY')) {
      throw err;
    }
    if (modelIdx + 1 < MODELS.length) {
      return callGeminiApi(payload, modelIdx + 1);
    }
    throw err;
  }
}

/**
 * 1. Kisan Mitra Voice & Text Agronomy Chatbot (Google Gemini Live AI)
 */
export async function askAgronomyChatbot({ prompt, history = [], language = 'en', district = 'Sundargarh, Odisha', crops = 'Paddy, Mustard, Tomato' }) {
  const languageNames = {
    en: 'English',
    hi: 'Hindi (हिन्दी)',
    or: 'Odia (ଓଡ଼ିଆ)',
    mr: 'Marathi (मराठी)',
    pa: 'Punjabi (ਪੰਜਾਬੀ)',
    te: 'Telugu (తెలుగు)',
    ta: 'Tamil (தமிழ்)',
    ml: 'Malayalam (മലയാളം)',
    bn: 'Bengali (বাংলা)'
  };

  const targetLang = languageNames[language] || 'Hindi';

  const systemInstruction = `You are "Kisan Mitra AI", an empathetic, highly expert agricultural scientist (agronomist) and early-warning advisory companion for Indian farmers under Smart India Hackathon (SIH 2026).
Current Context:
- Farmer District: ${district}
- Farmer Crops: ${crops}
- Target Response Language: ${targetLang}

Instructions:
1. Provide accurate, practical farming advice (crop diseases, pest management, bio-fertilizers, weather guidance, government schemes like PM-KISAN, PMFBY, KCC, and live mandi selling tips).
2. Balance Organic/Zero-Budget remedies (e.g. Jeevamrut, Neem oil, Trichoderma, Dashparni Ark) with approved Chemical treatments (accurate dosages per liter).
3. Keep the response concise, formatted with clean bullet points and emojis for easy readability on mobile.
4. MUST respond entirely in the target language (${targetLang}). If responding in Hindi/Odia/regional script, write naturally and clearly so farmers can understand easily.`;

  const contents = [];

  if (history && history.length > 0) {
    history.slice(-6).forEach(msg => {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    });
  }

  contents.push({
    role: 'user',
    parts: [{ text: `[Context: ${systemInstruction}]

Farmer Question: ${prompt}` }]
  });

  const payload = {
    contents,
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      maxOutputTokens: 1000
    }
  };

  const response = await callGeminiApi(payload);
  const text = response?.candidates?.[0]?.content?.parts?.[0]?.text || 'Kisan Mitra AI was unable to generate an answer. Please try again.';
  return text;
}

/**
 * 2. Crop Disease Visual Diagnosis from Image (Google Gemini 1.5 Multimodal Vision AI)
 */
export async function diagnoseCropDisease({ imageBase64, mimeType = 'image/jpeg', language = 'en', cropHint = '' }) {
  const languageNames = {
    en: 'English',
    hi: 'Hindi (हिन्दी)',
    or: 'Odia (ଓଡ଼ିଆ)',
    mr: 'Marathi (मराठी)',
    pa: 'Punjabi (ਪੰਜਾਬੀ)',
    te: 'Telugu (తెలుగు)',
    ta: 'Tamil (தமிழ்)',
    ml: 'Malayalam (മലയാളം)',
    bn: 'Bengali (বাংলা)'
  };

  const targetLang = languageNames[language] || 'English';

  let cleanBase64 = imageBase64;
  if (imageBase64.includes(',')) {
    const parts = imageBase64.split(',');
    cleanBase64 = parts[1];
    if (parts[0].includes('image/png')) mimeType = 'image/png';
    else if (parts[0].includes('image/webp')) mimeType = 'image/webp';
    else mimeType = 'image/jpeg';
  }

  const promptText = `You are an expert Agricultural Plant Pathologist and Computer Vision Specialist for Indian farmers under Smart India Hackathon (SIH 2026).
Analyze the provided leaf/crop image with extreme accuracy.
Target Language: ${targetLang}

STEP 1: INSPECT IMAGE
- Identify what crop plant species this is.
- Inspect the visual symptoms on the leaf (color changes, fungal lesions, necrotic spots, insect bite holes, powdery mildew, bacterial blight, rust pustules, viral mosaic, or nutrient deficiency).
- Determine the exact pathogen/disease name. If the leaf is completely healthy, indicate "Healthy Crop Foliage".

STEP 2: RETURN STRICT JSON
Return ONLY a valid JSON object matching this schema without markdown code blocks:
{
  "isPlant": true,
  "crop": "Exact Crop Name (e.g. Tomato / Paddy / Wheat / Cotton)",
  "family": "Botanical Family (e.g. Solanaceae / Poaceae)",
  "diseaseName": "Exact Disease Name (e.g. Early Blight / Cercospora Leaf Spot / Powdery Mildew)",
  "confidence": 97.5,
  "severity": "High / Moderate / Low / Healthy",
  "healthScore": 35,
  "aiExplanation": "Comprehensive agronomic analysis of the leaf visual symptoms in ${targetLang}.",
  "symptoms": "Detailed visual symptoms seen on this specific leaf (e.g. concentric dark brown rings with yellow halo) in ${targetLang}",
  "organicTreatment": "Zero-Budget / Organic remedy (e.g. 5% Neem Oil spray @ 5ml/L, Trichoderma viride, Dashparni Ark) in ${targetLang}",
  "chemicalTreatment": "Approved chemical fungicide/pesticide with exact dosage (e.g. Mancozeb 75% WP @ 2.5g/L or Azoxystrobin 23% SC @ 1ml/L) in ${targetLang}",
  "prevention": "Field sanitation, plant spacing, and irrigation advice in ${targetLang}",
  "recommendations": [
    "Tip 1 for plant recovery in ${targetLang}",
    "Tip 2 for soil and irrigation in ${targetLang}"
  ]
}`;

  const payload = {
    contents: [{
      parts: [
        { text: promptText },
        { inlineData: { mimeType, data: cleanBase64 } }
      ]
    }],
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json"
    }
  };

  const response = await callGeminiApi(payload);
  const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';

  try {
    const cleaned = rawText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (err) {
    const match = rawText.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error('Could not parse diagnosis from Gemini Vision AI.');
  }
}
