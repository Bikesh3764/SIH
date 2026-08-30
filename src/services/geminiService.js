// Google Gemini AI Agronomy & Vision Service (Gemini 3.5 Flash Lite)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyBlBjq_dryGV5WOgHLn37LnvbmmgipFoDw';

// Primary high-performance & efficient models with automatic fallback
const MODELS = [
  'gemini-3.5-flash-lite',
  'gemini-3.5-flash',
  'gemini-2.5-flash',
  'gemini-flash-latest'
];

/**
 * Helper to call Gemini API with automatic model fallback
 */
async function callGeminiApi(payload, modelIdx = 0) {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API Key is missing. Please set VITE_GEMINI_API_KEY in .env');
  }

  const model = MODELS[modelIdx] || MODELS[0];
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

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

  // Format conversational contents
  const contents = [];

  // Add past conversation context
  if (history && history.length > 0) {
    history.slice(-6).forEach(msg => {
      contents.push({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    });
  }

  // Add current query with context
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
 * 2. Crop Disease Visual Diagnosis from Image (Gemini 3.5 Flash Lite Multimodal)
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

  const targetLang = languageNames[language] || 'Hindi';

  // Clean base64 data
  let cleanBase64 = imageBase64;
  if (imageBase64.includes(',')) {
    const parts = imageBase64.split(',');
    cleanBase64 = parts[1];
    if (parts[0].includes('image/png')) mimeType = 'image/png';
    else if (parts[0].includes('image/webp')) mimeType = 'image/webp';
    else mimeType = 'image/jpeg';
  }

  const promptText = `You are an expert Agricultural Plant Pathologist and Computer Vision Specialist for Indian farmers under Smart India Hackathon (SIH 2026).
Analyze the provided image carefully.
Crop context/hint: ${cropHint || 'Field crop'}
Target Language for text explanations: ${targetLang}

STEP 1: VALIDATE IMAGE CONTENT
- Check if the image contains a genuine agricultural plant leaf, stem, fruit, crop, or tree foliage.
- If the image contains a HUMAN (face, portrait, selfie), animal, car, room, electronic device, random object, blank screen, or non-plant item, you MUST set "isPlant": false.

STEP 2: RETURN STRICT JSON
If "isPlant": false (Non-plant image like human portrait/object):
{
  "isPlant": false,
  "detectedObject": "Human portrait / Non-crop object (e.g. Person, room, animal)",
  "aiExplanation": "The uploaded photo shows a human portrait / non-agricultural object rather than a plant leaf or crop stem. Please upload a clear close-up photograph of an agricultural crop leaf for pathology assessment in ${targetLang}.",
  "crop": "Non-Crop Image",
  "diseaseName": "Invalid Image (Non-Plant Detected)",
  "severity": "Invalid Image",
  "confidence": 99.0,
  "symptoms": "No plant foliage, chlorophyll reflectance, or botanical tissue detected.",
  "organicTreatment": "Please upload a clear photograph of a crop leaf or stem.",
  "chemicalTreatment": "N/A",
  "prevention": "Hold camera 15-20cm from the affected leaf in good daytime light."
}

If "isPlant": true (Valid agricultural plant / leaf):
{
  "isPlant": true,
  "crop": "Exact Crop Name in ${targetLang} (with English in brackets)",
  "scientificName": "Botanical Latin Name",
  "family": "Botanical Family",
  "diseaseName": "Exact Disease / Pathogen Name in ${targetLang} (or Healthy Crop if no disease)",
  "confidence": 96.5,
  "severity": "High / Moderate / Low / Healthy",
  "aiExplanation": "Detailed, professional yet easy-to-understand agronomy assessment in ${targetLang}. Explain what visual damage (chlorosis, rust pustules, fungal necrosis, insect holes) is seen on the leaf and how it impacts photosynthesis and yield.",
  "symptoms": "Exact visual symptoms seen on leaf margins, veins, and surface in ${targetLang}",
  "organicTreatment": "Detailed Zero-Budget / Organic remedy (e.g. 5% Neem oil emulsion @ 5ml/L, Trichoderma harzianum, Jeevamrut, Sour buttermilk spray) in ${targetLang}",
  "chemicalTreatment": "Standard approved chemical fungicide/pesticide with exact dosage (e.g. Mancozeb 75% WP @ 2.5g/L, Azoxystrobin @ 1ml/L) in ${targetLang}",
  "prevention": "Best cultural practices, crop rotation, seed treatment, and field drainage in ${targetLang}",
  "recommendations": [
    "Tip 1 for plant care in ${targetLang}",
    "Tip 2 for soil and water in ${targetLang}",
    "Tip 3 for preventive protection in ${targetLang}"
  ]
}

Return ONLY valid clean JSON with no markdown fences.`;

  const payload = {
    contents: [{
      parts: [
        { text: promptText },
        { inlineData: { mimeType, data: cleanBase64 } }
      ]
    }],
    generationConfig: {
      temperature: 0.2
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
