// Google Gemini AI Agronomy & Vision Service (Primary: Gemini 3.5 Flash Lite with 500 RPD quota)

export function getGeminiApiKey() {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (envKey && envKey.trim().length > 10) return envKey.trim();
  const localKey = typeof window !== 'undefined' ? localStorage.getItem('user_gemini_api_key') : null;
  if (localKey && localKey.trim().length > 10) return localKey.trim();
  try {
    return atob('QVEuQWI4Uk42TGMtdnplbGZUcmdBbTlveVpHN2hjd28xYUp5bFk2a2NRTWxsMmtsR2hKZ3c=');
  } catch (e) {
    return '';
  }
}


// Active production Google Gemini models in priority order (3.5 Flash Lite has 500 RPD limit)
const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite-preview',
  'gemini-3.5-flash',
  'gemini-2.5-flash'
];

const LANGUAGE_MAP = {
  hi: 'Hindi (हिन्दी) in Devanagari script',
  or: 'Odia (ଓଡ଼ିଆ) in Odia script',
  mr: 'Marathi (मराठी) in Devanagari script',
  pa: 'Punjabi (ਪੰਜਾਬੀ) in Gurmukhi script',
  ml: 'Malayalam (മലയാളം) in Malayalam script',
  en: 'English'
};

/**
 * Helper to extract response text cleanly from candidates with multiple parts or thoughts
 */
export function extractCandidateText(candidate) {
  if (!candidate?.content?.parts) return '';
  const textParts = candidate.content.parts
    .filter(p => p.text && !p.thought)
    .map(p => p.text);
  if (textParts.length > 0) return textParts.join('\n').trim();
  return candidate.content.parts.map(p => p.text || '').join('\n').trim();
}

/**
 * Helper to call Gemini API with automatic model fallback
 */
async function callGeminiApi(payload, modelIdx = 0) {
  const apiKey = getGeminiApiKey();
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
      if (modelIdx + 1 < MODELS.length) {
        return callGeminiApi(payload, modelIdx + 1);
      }
      throw new Error(`Gemini API error (${res.status}): ${errBody}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    if (modelIdx + 1 < MODELS.length) {
      return callGeminiApi(payload, modelIdx + 1);
    }
    throw err;
  }
}

/**
 * 1. Kisan Mitra Voice & Text Agronomy Chatbot (Gemini 3.5 Flash Lite)
 */
export async function askAgronomyChatbot({ prompt, history = [], language = 'en', district = 'Sundargarh, Odisha', crops = 'Paddy, Mustard, Tomato' }) {
  const targetLang = LANGUAGE_MAP[language] || 'Hindi (हिन्दी) in Devanagari script';

  const systemInstruction = `You are "Kisan Mitra AI", an empathetic, highly expert agricultural scientist (agronomist) and early-warning advisory companion for Indian farmers under Smart India Hackathon (SIH 2026).
Farmer Location: ${district}
Farmer Crops: ${crops}

STRICT LANGUAGE RULE:
You MUST write your entire answer in ${targetLang}. 
- If Hindi: Write 100% in natural Hindi using Devanagari script.
- If Odia: Write 100% in Odia using Odia script (ଓଡ଼ିଆ).
- If Marathi: Write 100% in Marathi using Devanagari script (मराठी).
- If Punjabi: Write 100% in Punjabi using Gurmukhi script (ਪੰਜਾਬੀ).
- If Malayalam: Write 100% in Malayalam using Malayalam script (മലയാളം).
- If English: Write in clear English.
Do NOT mix languages or default to English.

Provide actionable, practical farming advice with organic remedies and approved chemical dosages. Keep it concise with bullet points and friendly emojis.`;

  const contents = [];

  if (history && history.length > 0) {
    history.slice(-4).forEach(msg => {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    });
  }

  contents.push({
    role: 'user',
    parts: [{ text: `[System Command: ${systemInstruction}]\n\nFarmer Question: ${prompt}\n\n(Remember: Respond ONLY in ${targetLang})` }]
  });

  const payload = {
    contents,
    generationConfig: {
      temperature: 0.6,
      topP: 0.95,
      maxOutputTokens: 1000
    }
  };

  const response = await callGeminiApi(payload);
  const text = extractCandidateText(response?.candidates?.[0]) || 'Kisan Mitra AI was unable to generate an answer. Please try again.';
  return text;
}

/**
 * 2. Crop Disease Visual Diagnosis from Image (Gemini 3.5 Flash Lite Vision)
 */
export async function diagnoseCropDisease({ imageBase64, mimeType = 'image/jpeg', language = 'en', cropHint = '' }) {
  const targetLang = LANGUAGE_MAP[language] || 'Hindi (हिन्दी) in Devanagari script';

  let cleanBase64 = imageBase64;
  if (imageBase64.includes(',')) {
    const parts = imageBase64.split(',');
    cleanBase64 = parts[1];
    if (parts[0].includes('image/png')) mimeType = 'image/png';
    else if (parts[0].includes('image/webp')) mimeType = 'image/webp';
    else mimeType = 'image/jpeg';
  }

  const promptText = `You are an expert Agricultural Plant Pathologist for Indian farmers under Smart India Hackathon (SIH 2026).
Analyze this crop leaf image carefully.

CRITICAL REQUIREMENT:
All descriptive text values in the JSON output MUST be written 100% in ${targetLang}.
- diseaseName: In ${targetLang}
- crop: In ${targetLang}
- aiExplanation: Detailed explanation in ${targetLang}
- symptoms: Exact leaf symptoms in ${targetLang}
- organicTreatment: Organic & Zero-budget cure in ${targetLang}
- chemicalTreatment: Chemical fungicide/pesticide dosage in ${targetLang}
- prevention: Field prevention advice in ${targetLang}
- recommendations: Array of tips in ${targetLang}

Return ONLY valid JSON matching this schema:
{
  "isPlant": true,
  "crop": "Crop Name in ${targetLang}",
  "family": "Botanical Family",
  "diseaseName": "Disease Name in ${targetLang}",
  "confidence": 96.8,
  "severity": "High / Moderate / Low / Healthy",
  "healthScore": 35,
  "aiExplanation": "Comprehensive agronomic analysis in ${targetLang}",
  "symptoms": "Leaf visual symptoms in ${targetLang}",
  "organicTreatment": "Organic remedy in ${targetLang}",
  "chemicalTreatment": "Approved chemical treatment with dosage in ${targetLang}",
  "prevention": "Field prevention practices in ${targetLang}",
  "recommendations": [
    "Tip 1 in ${targetLang}",
    "Tip 2 in ${targetLang}"
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
  const rawText = extractCandidateText(response?.candidates?.[0]) || '{}';

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
