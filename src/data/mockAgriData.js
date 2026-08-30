// Unified Multilingual Knowledge Base for AgriShield AI (SIH 2026 PS-02)

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', voiceCode: 'en-US' },
  { code: 'hi', name: 'Hindi (हिन्दी)', native: 'हिन्दी', voiceCode: 'hi-IN' },
  { code: 'or', name: 'Odia (ଓଡ଼ିଆ)', native: 'ଓଡ଼ିଆ', voiceCode: 'or-IN' },
  { code: 'mr', name: 'Marathi (मराठी)', native: 'मराठी', voiceCode: 'mr-IN' },
  { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)', native: 'ਪੰਜਾਬੀ', voiceCode: 'pa-IN' },
  { code: 'ml', name: 'Malayalam (മലയാളം)', native: 'മലയാളം', voiceCode: 'ml-IN' }
];

export const CROPS_MARKET_DATA = {
  Rice: {
    name: 'Rice (धान / चावल)',
    unit: '₹ / quintal',
    currentPrice: 2400,
    msp: 2183,
    change: '+5.2%',
    quality: 'Premium Grade A',
    advisory: 'HOLD',
    advisoryText: 'High demand from southern millers. Spot arrivals steady. Expected to appreciate next week.'
  },
  Cotton: {
    name: 'Cotton (कपास - Bt-II)',
    unit: '₹ / quintal',
    currentPrice: 6890,
    msp: 6620,
    change: '+3.4%',
    quality: 'Medium Staple',
    advisory: 'HOLD',
    advisoryText: 'Spinning mills in Gujarat placing forward contracts. Premium realization.'
  },
  Wheat: {
    name: 'Wheat (गेहूं)',
    unit: '₹ / quintal',
    currentPrice: 2480,
    msp: 2275,
    change: '+2.8%',
    quality: 'Milling Grade',
    advisory: 'HOLD',
    advisoryText: 'Flour millers actively stockpiling.'
  }
};

export const CHATBOT_CONTENT = {
  en: {
    welcomeMessage: "Hello! I am your Kisan Mitra AI agronomy assistant. You can ask about crop diseases, weather alerts, mandi rates, or fertilizer dosages via voice or text.",
    sampleQueries: [
      { text: "Yellow rust spotted on wheat leaves, what to spray?", reply: "For wheat yellow rust, immediately spray Propiconazole 25% EC (Tilt) @ 1ml/L of water. Organically, spray 10% sour buttermilk + neem oil solution." },
      { text: "Rain expected tomorrow, should I spray pesticides today?", reply: "Rain is forecasted within 24 hours (74% probability). Please postpone pesticide and fertilizer spraying for 48 hours to avoid chemical runoff." },
      { text: "What is the selling recommendation for Cotton today?", reply: "Cotton spot rate in Yavatmal APMC is ₹6,890/qtl (+₹270 above MSP). Our recommendation is to HOLD for 4 more days as global demand is strong." },
      { text: "What is the recommended fertilizer dose for Cotton?", reply: "During boll development, spray Potassium Nitrate (13-0-45) @ 10g/L along with 2% urea foliar spray to maximize boll weight." }
    ],
    actionChips: ['💧 Irrigation Advice', '🌾 Yellow Rust Cure', '💰 Mandi Price Radar'],
    inputPlaceholder: "Ask anything about crops, pests, weather or mandi prices...",
    botDefaultReply: "Ensure proper field drainage. High humidity elevates fungal pathogen risk. Delay granular fertilizer broadcasting until soil moisture stabilizes."
  },
  or: {
    welcomeMessage: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କର କିଷାନ ମିତ୍ର AI କୃଷି ସହାୟକ। ଆପଣ ଫସଲ ରୋଗ, ପାଣିପାଗ ସତର୍କତା, ମଣ୍ଡି ଦର କିମ୍ବା ସାରର ସଠିକ୍ ପରିମାଣ ବିଷୟରେ କହି କିମ୍ବା ଲେଖି ପଚାରିପାରିବେ।",
    sampleQueries: [
      { text: "ଗହମ ପତ୍ରରେ ହଳଦିଆ କଳଙ୍କି (Yellow Rust) ରୋଗ ହୋଇଛି, କଣ ସ୍ପ୍ରେ କରିବି?", reply: "ଗହମର ହଳଦିଆ କଳଙ୍କି ରୋଗ ପାଇଁ ତୁରନ୍ତ ପ୍ରୋପିକୋନାଜୋଲ 25% EC (Tilt) ୧ ମିଲି ପ୍ରତି ଲିଟର ପାଣିରେ ମିଶାଇ ସ୍ପ୍ରେ କରନ୍ତୁ। ଜୈବିକ ଭାବରେ ୧୦% ଖଟା ଘୋଳଦହି ଏବଂ ନିମ ତେଲ ମଧ୍ୟ ଫଳପ୍ରଦ।" },
      { text: "ଆସନ୍ତାକାଲି ବର୍ଷା ହେବାର ସମ୍ଭାବନା ଅଛି, ଆଜି କୀଟନାଶକ ପକାଇବି କି?", reply: "ଆସନ୍ତା ୨୪ ଘଣ୍ଟା ମଧ୍ୟରେ ୭୪% ବର୍ଷା ସମ୍ଭାବନା ଅଛି। ବର୍ଷା ଯୋଗୁଁ ଔଷଧ ଧୋଇଯିବ, ତେଣୁ ୪୮ ଘଣ୍ଟା ପର୍ଯ୍ୟନ୍ତ କୀଟନାଶକ ସ୍ପ୍ରେ ସ୍ଥଗିତ ରଖନ୍ତୁ।" },
      { text: "ଧାନ ଏବଂ ସୋରିଷର ଆଜିର ମଣ୍ଡି ଦର କେତେ ଏବଂ କେବେ ବିକ୍ରି କରିବି?", reply: "ସୁନ୍ଦରଗଡ଼ / ରାଉରକେଲା ମଣ୍ଡିରେ ଧାନ ଦର ₹୨,୪୨୦/କ୍ୱିଣ୍ଟାଲ (MSP ₹୨,୧୮୩ ଠାରୁ ଅଧିକ)। ଆଗାମୀ ସପ୍ତାହରେ ଦର ଆହୁରି ବଢ଼ିବାର ସମ୍ଭାବନା ଥିବାରୁ କିଛି ଦିନ ରଖିବାକୁ (HOLD) ପରାମର୍ଶ।" },
      { text: "ଫସଲରେ କେଉଁ ସମୟରେ କେଉଁ ସାର ପ୍ରୟୋଗ କରିବି?", reply: "ଗଛ ବଢ଼ିବା ସମୟରେ ୟୁରିଆ ସହିତ ପୋଟାସିୟମ ନାଇଟ୍ରେଟ (13-0-45) ପ୍ରତି ଲିଟର ପାଣିରେ ୧୦ ଗ୍ରାମ ମିଶାଇ ସ୍ପ୍ରେ କଲେ ଅଧିକ ଫଳନ ମିଳିଥାଏ।" }
    ],
    actionChips: ['💧 ଜଳସେଚନ ପରାମର୍ଶ', '🌾 ହଳଦିଆ କଳଙ୍କି ଉପଚାର', '💰 ଆଜିର ମଣ୍ଡି ଦର'],
    inputPlaceholder: "ଫସଲ, କୀଟ, ପାଣିପାଗ କିମ୍ବା ମଣ୍ଡି ଦର ବିଷୟରେ ପଚାରନ୍ତୁ...",
    botDefaultReply: "ଫସଲ ସୁରକ୍ଷା ପାଇଁ ପାଣିପାଗ ଉପରେ ନଜର ରଖନ୍ତୁ। ବର୍ଷା ସମ୍ଭାବନା ଥିବାରୁ କୀଟନାଶକ ସ୍ପ୍ରେ ୨ ଦିନ ସ୍ଥଗିତ ରଖନ୍ତୁ ଏବଂ ଜମିରୁ ଜଳ ନିଷ୍କାସନ ନିଶ୍ଚିତ କରନ୍ତୁ।"
  },
  hi: {
    welcomeMessage: "नमस्ते! मैं आपका किसान मित्र AI हूँ। आप अपनी फसल की बीमारी, आज का मौसम, मंडी भाव या खाद की सही मात्रा के बारे में बोलकर या लिखकर पूछ सकते हैं।",
    sampleQueries: [
      { text: "गेहूं में पीला रतुआ (Yellow Rust) दिख रहा है, तुरंत क्या करें?", reply: "गेहूं में पीला रतुआ दिखने पर तुरंत प्रोपिकोनाज़ोल 25% EC (टिल्ट) 200 मिली प्रति 200 लीटर पानी में घोलकर प्रति एकड़ छिड़काव करें। जैविक रूप से 5% खट्टी छाछ और नीम तेल का छिड़काव भी प्रभावी है।" },
      { text: "कल बारिश होने वाली है, क्या आज कपास में कीटनाशक छिड़कें?", reply: "मौसम पूर्वानुमान के अनुसार कल 74% बारिश की संभावना है। आज कीटनाशक का छिड़काव न करें क्योंकि बारिश से दवाई धुल जाएगी। 48 घंटे बाद छिड़काव करें।" },
      { text: "कपास का आज का मंडी भाव क्या है और कब बेचें?", reply: "कपास का आज का यवतमाल मंडी भाव ₹6,890 प्रति क्विंटल है जो एमएसपी (₹6,620) से ₹270 अधिक है। हमारा सुझाव है कि 4 दिन माल रोकें (HOLD), भाव ₹7,000 पार जाने की संभावना है।" },
      { text: "कपास में गूलर बनते समय कौन सी खाद डालें?", reply: "कपास में बॉल बनने की अवस्था में यूरिया की जगह पोटैशियम नाइट्रेट (13-0-45) @ 10 ग्राम/लीटर का पर्णीय छिड़काव करें ताकि गूलर का वजन और गुणवत्ता बेहतर हो।" }
    ],
    actionChips: ['💧 सिंचाई का सही समय', '🌾 पीला रतुआ का उपचार', '💰 आज का मंडी भाव'],
    inputPlaceholder: "फसल, रोग, मौसम, खाद या मंडी भाव के बारे में पूछें...",
    botDefaultReply: "अपनी फसल की सुरक्षा के लिए मौसम का ध्यान रखें। अगले 24 घंटे में बारिश का पूर्वानुमान है, अतः कीटनाशक छिड़काव 2 दिन के लिए टालें और खेत में जल निकासी सुनिश्चित करें।"
  },
  pa: {
    welcomeMessage: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ ਕਿਸਾਨ ਮਿੱਤਰ AI ਹਾਂ। ਤੁਸੀਂ ਫ਼ਸਲ ਦੀਆਂ ਬਿਮਾਰੀਆਂ, ਅੱਜ ਦਾ ਮੌਸਮ, ਮੰਡੀ ਭਾਅ ਜਾਂ ਖਾਦ ਦੀ ਮਾਤਰਾ ਬਾਰੇ ਬੋਲ ਕੇ ਜਾਂ ਲਿਖ ਕੇ ਪੁੱਛ ਸਕਦੇ ਹੋ।",
    sampleQueries: [
      { text: "ਕਣਕ ਵਿੱਚ ਪੀਲਾ ਰਤੂਆ ਦਿਖ ਰਿਹਾ ਹੈ, ਤੁਰੰਤ ਕੀ ਕਰੀਏ?", reply: "ਕਣਕ ਵਿੱਚ ਪੀਲਾ ਰਤੂਆ ਰੋਕਣ ਲਈ ਤੁਰੰਤ ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ 25% EC (ਟਿਲਟ) 200 ਮਿਲੀਲੀਟਰ ਪ੍ਰਤੀ ਏਕੜ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਮਿਲਾ ਕੇ ਛਿੜਕਾਅ ਕਰੋ। ਦੇਸੀ ਇਲਾਜ ਲਈ 10% ਖੱਟੀ ਲੱਸੀ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।" },
      { text: "ਕੱਲ੍ਹ ਮੀਂਹ ਪੈਣ ਵਾਲਾ ਹੈ, ਕੀ ਅੱਜ ਕੀਟਨਾਸ਼ਕ ਛਿੜਕੀਏ?", reply: "ਮੌਸਮ ਅਨੁਸਾਰ ਕੱਲ੍ਹ 74% ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਅੱਜ ਕੋਈ ਵੀ ਕੀਟਨਾਸ਼ਕ ਜਾਂ ਖਾਦ ਨਾ ਛਿੜਕੋ ਤਾਂ ਜੋ ਦਵਾਈ ਮੀਂਹ ਨਾਲ ਨਾ ਵਹਿ ਜਾਵੇ। 2 ਦਿਨ ਬਾਅਦ ਛਿੜਕਾਅ ਕਰੋ।" },
      { text: "ਝੋਨੇ / ਨਰਮੇ ਦਾ ਅੱਜ ਦਾ ਮੰਡੀ ਭਾਅ ਕੀ ਹੈ?", reply: "ਨਰਮੇ ਦਾ ਅੱਜ ਦਾ ਬਠਿੰਡਾ ਮੰਡੀ ਭਾਅ ₹6,780 ਪ੍ਰਤੀ ਕੁਇੰਟਲ ਹੈ ਜੋ ਐਮਐਸਪੀ ਤੋਂ ਵੱਧ ਹੈ। ਅਗਲੇ ਕੁਝ ਦਿਨ ਮਾਲ ਰੋਕੋ (HOLD), ਭਾਅ ਹੋਰ ਵਧਣ ਦੀ ਉਮੀਦ ਹੈ।" },
      { text: "ਕਣਕ ਵਿੱਚ ਖਾਦ ਕਦੋਂ ਅਤੇ ਕਿੰਨੀ ਪਾਈਏ?", reply: "ਪਹਿਲੇ ਪਾਣੀ ਵੇਲੇ ਪ੍ਰਤੀ ਏਕੜ 45 ਕਿੱਲੋ ਯੂਰੀਆ ਪਾਓ। ਨਮੀ ਦੀ ਸਥਿਤੀ ਵੇਖ ਕੇ ਹੀ ਖਾਦ ਦਾ ਪ੍ਰਯੋਗ ਕਰੋ।" }
    ],
    actionChips: ['💧 ਸਿੰਚਾਈ ਦਾ ਸਹੀ ਸਮਾਂ', '🌾 ਪੀਲਾ ਰਤੂਆ ਦਾ ਇਲਾਜ', '💰 ਅੱਜ ਦਾ ਮੰਡੀ ਭਾਅ'],
    inputPlaceholder: "ਫ਼ਸਲ, ਮੌਸਮ, ਖਾਦ ਜਾਂ ਮੰਡੀ ਭਾਅ ਬਾਰੇ ਪੁੱਛੋ...",
    botDefaultReply: "ਫ਼ਸਲ ਦੀ ਸੁਰੱਖਿਆ ਲਈ ਮੌਸਮ ਦਾ ਧਿਆਨ ਰੱਖੋ। ਅਗਲੇ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਮੀਂਹ ਦੀ ਸੰਭਾਵਨਾ ਹੈ, ਇਸ ਲਈ ਖਾਦ ਜਾਂ ਦਵਾਈ ਦਾ ਛਿੜਕਾਅ 2 ਦਿਨ ਲਈ ਟਾਲ ਦਿਓ।"
  },
  mr: {
    welcomeMessage: "नमस्कार! मी तुमचा किसान मित्र AI आहे. तुम्ही पिकांवरील रोग, आजचे हवामान, बाजार भाव किंवा खतांच्या प्रमाणाविषयी बोलून किंवा लिहून विचारू शकता.",
    sampleQueries: [
      { text: "गव्हावर पिवळा तांबेरा आला आहे, त्वरित काय करावे?", reply: "गव्हावरील पिवळा तांबेरा नियंत्रणासाठी प्रोपिकोनाझोल 25% EC (टिल्ट) 200 मिली प्रति 200 लिटर पाण्यात मिसळून प्रति एकरी फवारावे. सेंद्रिय उपाय म्हणून 5% आंबट ताक फवारावे." },
      { text: "उद्या पाऊस पडणार आहे, आज कापसावर औषध फवारावे का?", reply: "हवामान अंदाजानुसार उद्या 74% पावसाची शक्यता आहे. आज फवारणी करू नका कारण पावसाने औषध वाहून जाईल. 48 तासांनंतर फवारणी करा." },
      { text: "कापसाचा आजचा बाजार भाव काय आहे आणि कधी विकावा?", reply: "कापसाचा आजचा यवतमाळ बाजार भाव ₹6,890 प्रति क्विंटल आहे (हमीभावापेक्षा ₹270 जास्त). आमचा सल्ला आहे की किमान 4 दिवस माल रोखावा (HOLD)." },
      { text: "कापसाला बोंड भरताना कोणती खते द्यावीत?", reply: "बोंड भरण्याच्या अवस्थेत पोटॅशियम नायट्रेट (13-0-45) @ 10 ग्रॅम/लिटर फवारावे, ज्यामुळे बोंडांचे वजन आणि प्रत चांगली राहते." }
    ],
    actionChips: ['💧 सिंचनाची योग्य वेळ', '🌾 तांबेरा रोगाचा उपाय', '💰 आजचे बाजार भाव'],
    inputPlaceholder: "पिके, रोग, खते, हवामान किंवा बाजार भावाविषयी विचारा...",
    botDefaultReply: "पिकांच्या सुरक्षेसाठी हवामानाचा अंदाज लक्षात घ्या. पुढील 24 तासांत पावसाची शक्यता असल्याने कीटकनाशक फवारणी 2 दिवस पुढे ढकला."
  },
  te: {
    welcomeMessage: "నమస్కారం! నేను మీ కిసాన్ మిత్ర AI ని. మీరు పంటల తెగుళ్లు, నేటి వాతావరణం, మార్కెట్ ధరలు లేదా ఎరువుల మోతాదు గురించి మాట్లాడి లేదా టైప్ చేసి అడగవచ్చు.",
    sampleQueries: [
      { text: "గోధుమ ఆకులపై పసుపు తెగులు కనిపిస్తోంది, ఏమి చేయాలి?", reply: "గోధుమ పసుపు తెగులు నివారణకు ప్రొపికోనజోల్ 25% EC మందును లీటరు నీటికి 1 మి.లీ కలిపి పిచికారీ చేయండి. సేంద్రీయంగా పులిసిన మజ్జిగ ద్రావణం వాడండి." },
      { text: "రేపు వర్షం పడనుంది, ఈరోజు పురుగుల మందు కొట్టవచ్చా?", reply: "రాబోయే 24 గంటల్లో 74% వర్షం పడే అవకాశం ఉంది. వర్షానికి మందు కొట్టుకుపోతుంది కాబట్టి 2 రోజుల పాటు పిచికారీ వాయిదా వేయండి." },
      { text: "నేటి పత్తి మార్కెట్ ధర ఎంత ఉంది?", reply: "మార్కెట్ లో పత్తి క్వింటాల్ ధర ₹6,890 గా ఉంది (మద్దతు ధర కంటే ఎక్కువ). రాబోయే రోజుల్లో ధరలు పెరిగే అవకాశం ఉన్నందున కొద్దిరోజులు ఆగండి (HOLD)." },
      { text: "పత్తి కాయ దశలో ఏ ఎరువులు వేయాలి?", reply: "పత్తి కాయ దశలో పొటాషియం నైట్రేట్ (13-0-45) ను లీటరు నీటికి 10 గ్రాములు కలిపి పిచికారీ చేయండి." }
    ],
    actionChips: ['💧 సరైన నీటి పారుదల సమయం', '🌾 తెగుళ్ల నివారణ', '💰 నేటి మార్కెట్ ధరలు'],
    inputPlaceholder: "పంటలు, తెగుళ్లు, ఎరువులు లేదా ధరల గురించి అడగండి...",
    botDefaultReply: "పంటల రక్షణకు వాతావరణాన్ని గమనించండి. వర్ష సూచన ఉన్నందున పురుగుమందుల పిచికారీని 2 రోజులు వాయిదా వేయండి."
  },
  ta: {
    welcomeMessage: "வணக்கம்! நான் உங்கள் கிசான் மித்ரா AI. பயிர் நோய்கள், வானிலை, சந்தை விலைகள் அல்லது உரங்கள் பற்றி பேசி அல்லது தட்டச்சு செய்து கேட்கலாம்.",
    sampleQueries: [
      { text: "கோதுமையில் மஞ்சள் துரு நோய் தெரிகிறது, என்ன செய்ய வேண்டும்?", reply: "கோதுமை மஞ்சள் துரு நோயைக் கட்டுப்படுத்த புரோபிகோனசோல் 25% EC மருந்தை லிட்டர் தண்ணீருக்கு 1 மி.லி கலந்து தெளிக்கவும்." },
      { text: "நாளை மழை பெய்ய வாய்ப்புள்ளது, இன்று மருந்து தெளிக்கலாமா?", reply: "நாளை 74% மழை வாய்ப்பு உள்ளது. மருந்து தெளிப்பதை 2 நாட்களுக்கு தள்ளி வைக்கவும்." },
      { text: "இன்றைய பருத்தி சந்தை விலை என்ன?", reply: "பருத்தி சந்தை விலை குவிண்டாலுக்கு ₹6,890 ஆக உள்ளது. அடுத்த சில நாட்களுக்கு விற்காமல் வைத்திருக்குமாறு (HOLD) பரிந்துரைக்கிறோம்." },
      { text: "பருத்திக்கு உகந்த உர அளவு என்ன?", reply: "காய் பிடிக்கும் தருணத்தில் பொட்டாசியம் நைட்ரேட் (13-0-45) @ 10 கிராம்/லிட்டர் தெளிக்கவும்." }
    ],
    actionChips: ['💧 பாசன நேரம்', '🌾 துரு நோய் மருந்து', '💰 இன்றைய சந்தை விலை'],
    inputPlaceholder: "பயிர்கள், உரங்கள், நோய்கள் அல்லது சந்தை விலைகள் பற்றி கேளுங்கள்...",
    botDefaultReply: "பயிர் பாதுகாப்புக்கு வானிலையைக் கவனியுங்கள். மழை வாய்ப்பு உள்ளதால் மருந்து தெளிப்பதை 2 நாட்கள் தள்ளி வைக்கவும்."
  },
  ml: {
    welcomeMessage: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ കിസാൻ മിത്ര AI ആണ്. വിള രോഗങ്ങൾ, കാലാവസ്ഥ, വിപണി നിരക്കുകൾ എന്നിവയെക്കുറിച്ച് സംസാരിച്ചോ ടൈപ്പ് ചെയ്തോ ചോദിക്കാം.",
    sampleQueries: [
      { text: "ഗോതമ്പിൽ മഞ്ഞ തുരുമ്പ് രോഗം കാണുന്നു, എന്ത് ചെയ്യണം?", reply: "ഗോതമ്പ് മഞ്ഞ തുരുമ്പ് രോഗത്തിന് പ്രൊപികോണസോൾ 25% EC ലിറ്ററിന് 1 മില്ലി എന്ന തോതിൽ തളിക്കുക." },
      { text: "നാളെ മഴ പെയ്യാൻ സാധ്യതയുണ്ടോ, ഇന്ന് കീടനാശിനി തളിക്കാമോ?", reply: "നാളെ 74% മഴ സാധ്യതയുണ്ട്. കീടനാശിനി തളിക്കുന്നത് 2 ദിവസത്തേക്ക് മാറ്റിവയ്ക്കുക." },
      { text: "ഇന്നത്തെ പരുത്തി മാർക്കറ്റ് വില എത്രയാണ്?", reply: "പരുത്തി ക്വിന്റലിന് ₹6,890 നിരക്കിലാണ്. അടുത്ത കുറച്ചു ദിവസങ്ങൾ വിൽപ്പന മാറ്റിവയ്ക്കാൻ (HOLD) നിർദ്ദേശിക്കുന്നു." },
      { text: "വിളകൾക്ക് നൽകേണ്ട വളം ഏതാണ്?", reply: "കായ് വളരുന്ന ഘട്ടത്തിൽ പൊട്ടാസ്യം നൈട്രേറ്റ് (13-0-45) ലിറ്ററിന് 10 ഗ്രാം എന്ന തോതിൽ തളിക്കുക." }
    ],
    actionChips: ['💧 നനയ്ക്കേണ്ട സമയം', '🌾 തുരുമ്പ് രോഗ ചികിത്സ', '💰 ഇന്നത്തെ വിപണി വില'],
    inputPlaceholder: "വിളകൾ, വളങ്ങൾ, കാലാവസ്ഥ എന്നിവയെക്കുറിച്ച് ചോദിക്കുക...",
    botDefaultReply: "വിള സംരക്ഷണത്തിന് കാലാവസ്ഥ ശ്രദ്ധിക്കുക. മഴ സാധ്യതയുള്ളതിനാൽ മരുന്ന് തളിക്കുന്നത് മാറ്റിവയ്ക്കുക."
  },
  bn: {
    welcomeMessage: "নমস্কার! আমি আপনার কিষাণ মিত্র AI। ফসলের রোগ, আবহাওয়া, সারের মাত্রা বা মান্ডি দর সম্পর্কে কথা বলে বা লিখে জানতে পারেন।",
    sampleQueries: [
      { text: "গমে হলুদ মরচে রোগ দেখা দিয়েছে, কী করব?", reply: "গমে হলুদ মরচে নিয়ন্ত্রণের জন্য প্রোপিকোনাজোল ২৫% EC প্রতি লিটার জলে ১ মিলি হারে স্প্রে করুন।" },
      { text: "আগামীকাল কি বৃষ্টি হবে, আজ কীটনাশক দেব?", reply: "আগামীকাল ৭৪% বৃষ্টির সম্ভাবনা রয়েছে। বৃষ্টির কারণে ওষুধ ধুয়ে যাবে, তাই ২ দিন স্প্রে স্থগিত রাখুন।" },
      { text: "আজকের তুলোর মান্ডি দর কত এবং কখন বিক্রি করব?", reply: "তুলোর আজকের দর কুইন্টাল প্রতি ₹৬,৮৯০ (এমএসপি থেকে বেশি)। আরও ৪ দিন ফসল ধরে রাখার (HOLD) পরামর্শ।" },
      { text: "তুলা গাছে কোন সার দেব?", reply: "গুটি ধরার সময় পটাসিয়াম নাইট্রেট (১৩-০-৪৫) প্রতি লিটারে ১০ গ্রাম মিশিয়ে স্প্রে করুন।" }
    ],
    actionChips: ['💧 সেচের সঠিক সময়', '🌾 মরচে রোগের প্রতিকার', '💰 আজকের মান্ডি দর'],
    inputPlaceholder: "ফসল, সার, রোগ বা মান্ডি দর সম্পর্কে জিজ্ঞাসা করুন...",
    botDefaultReply: "ফসলের সুরক্ষার জন্য আবহাওয়া পর্যবেক্ষণ করুন। বৃষ্টির পূর্বাভাসের কারণে কীটনাশক স্প্রে ২ দিন পিছিয়ে দিন।"
  }
};

export const MULTILINGUAL_DISEASES = {
  en: [
    {
      id: 'd1',
      name: 'Tomato Late Blight (Phytophthora infestans)',
      crop: 'Tomato',
      confidence: 96.4,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22795?auto=format&fit=crop&w=600&q=80',
      severity: 'High',
      symptoms: 'Water-soaked irregular dark green/brown lesions on lower leaves, rapidly expanding. White fungal downy mildew visible on leaf undersides.',
      organicTreatment: 'Spray 5% fermented butter-milk (sour chhaas) + 2% Trichoderma viride bio-fungicide @ 5g/L every 7 days.',
      chemicalTreatment: 'Mancozeb 75% WP @ 2.5g/L or Metalaxyl 8% + Mancozeb 64% WP (Ridomil MZ) @ 2g/L of water.',
      prevention: 'Ensure row-to-row spacing for airflow. Avoid overhead sprinkler watering.'
    },
    {
      id: 'd2',
      name: 'Wheat Yellow Rust / Stripe Rust (Puccinia striiformis)',
      crop: 'Wheat',
      confidence: 98.1,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      severity: 'Critical',
      symptoms: 'Bright yellow-orange pustules arranged in linear stripes along leaf veins. Releases powdery yellow fungal spores when touched.',
      organicTreatment: 'Spray 10% Cow Urine extract with Dashparni Ark @ 500ml per 15L pump.',
      chemicalTreatment: 'Propiconazole 25% EC (Tilt) @ 1ml/L or Tebuconazole 25.9% EC @ 1ml/L. 200 liters spray per acre.',
      prevention: 'Cultivate rust-resistant certified varieties (HD-2967, DBW-187, PBW-725).'
    },
    {
      id: 'd3',
      name: 'Cotton Leaf Curl Virus (CLCuV)',
      crop: 'Cotton',
      confidence: 94.8,
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
      severity: 'High',
      symptoms: 'Upward or downward leaf curling, vein thickening, enation, severe plant stunting and reduced boll setting.',
      organicTreatment: 'Install 15 Yellow Sticky Traps per acre to trap Whitefly insect vectors. Spray 5% cold-pressed Neem Oil.',
      chemicalTreatment: 'Diafenthiuron 50% WP @ 1.2g/L or Pyriproxyfen 10% EC @ 2ml/L to control vector whiteflies.',
      prevention: 'Eradicate weed hosts on field borders. Avoid late sowing.'
    },
    {
      id: 'd4',
      name: 'Rice Blast (Pyricularia oryzae)',
      crop: 'Paddy / Rice',
      confidence: 97.2,
      image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
      severity: 'High',
      symptoms: 'Spindle/eye-shaped elliptical lesions with whitish-gray centers and reddish-brown borders.',
      organicTreatment: 'Foliar spray of Pseudomonas fluorescens bio-agent @ 2.5g/L + Vermiwash foliar application.',
      chemicalTreatment: 'Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L.',
      prevention: 'Maintain balanced NPK ratio (120:60:60); avoid single heavy nitrogen dressing during cloudy spells.'
    },
    {
      id: 'd5',
      name: 'Soybean Rust (Phakopsora pachyrhizi)',
      crop: 'Soybean',
      confidence: 95.7,
      image: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=600&q=80',
      severity: 'Moderate',
      symptoms: 'Small tan/brown polygonal lesions on lower leaves that turn reddish brown with raised volcanic pustules underneath.',
      organicTreatment: 'Spray Bordeaux mixture 1% or Copper oxychloride + Cow dung ash slurry.',
      chemicalTreatment: 'Hexaconazole 5% EC @ 2ml/L or Pyraclostrobin 20% WG @ 1g/L.',
      prevention: 'Early sowing; crop rotation with non-host cereals (Maize/Sorghum).'
    },
    {
      id: 'd6',
      name: 'Coconut Root Wilt & Bud Rot',
      crop: 'Coconut',
      confidence: 93.9,
      image: 'https://images.unsplash.com/photo-1544860707-c352cc5a92e3?auto=format&fit=crop&w=600&q=80',
      severity: 'Critical',
      symptoms: 'Flaccidity and ribbing of leaflets, premature drying of fronds, rotten soft spear leaves with foul smell.',
      organicTreatment: 'Crown cleaning and application of 1% Bordeaux paste or Trichoderma enriched neem cake (5 kg/palm/year).',
      chemicalTreatment: 'Crown spray with Copper Oxychloride 0.3% (3g/L) or Fosetyl-Al @ 2.5g/L.',
      prevention: 'Provide proper drainage in coastal/clay soil; apply magnesium sulphate @ 500g/palm.'
    }
  ],
  hi: [
    {
      id: 'd1',
      name: 'टमाटर का पछेती झुलसा (Late Blight)',
      crop: 'टमाटर',
      confidence: 96.4,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22795?auto=format&fit=crop&w=600&q=80',
      severity: 'गंभीर',
      symptoms: 'निचली पत्तियों पर पानी से भीगे हुए गहरे भूरे-काले धब्बे जो तेजी से फैलते हैं। पत्तियों के नीचे सफेद फफूंद दिखती है।',
      organicTreatment: '5% खट्टी छाछ + ट्राइकोडर्मा विरिडी जैव कवकनाशी @ 5 ग्राम/लीटर पानी में घोलकर 7 दिन के अंतराल पर छिड़कें।',
      chemicalTreatment: 'मैंकोजेब 75% WP @ 2.5 ग्राम/लीटर या रीडोमिल एमजेड (मेटालैक्सिल + मैंकोजेब) @ 2 ग्राम/लीटर का छिड़काव करें।',
      prevention: 'पौधों के बीच हवा का प्रवाह बनाए रखें। क्यारियों में जलभराव न होने दें।'
    },
    {
      id: 'd2',
      name: 'गेहूं का पीला रतुआ (Yellow Stripe Rust)',
      crop: 'गेहूं',
      confidence: 98.1,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      severity: 'अति गंभीर',
      symptoms: 'पत्तियों की शिराओं के समानांतर चमकदार पीली-नारंगी धारियां और छूने पर उंगलियों पर पीला पाउडर चिपकना।',
      organicTreatment: '10% गोमूत्र अर्क + दशपर्णी अर्क 500 मिली प्रति 15 लीटर पंप से छिड़कें।',
      chemicalTreatment: 'प्रोपिकोनाज़ोल 25% EC (टिल्ट) @ 1 मिली/लीटर पानी (200 मिली प्रति एकड़) का तुरंत छिड़काव करें।',
      prevention: 'रोग प्रतिरोधी प्रमाणित बीज (HD-2967, DBW-187, PBW-725) ही बोएं।'
    },
    {
      id: 'd3',
      name: 'कपास का लीफ कर्ल वायरस (CLCuV)',
      crop: 'कपास',
      confidence: 94.8,
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
      severity: 'गंभीर',
      symptoms: 'पत्तियों का ऊपर या नीचे की ओर मुड़ना, नसें मोटी होना और पौधों का बौना रह जाना।',
      organicTreatment: 'सफेद मक्खी को पकड़ने के लिए प्रति एकड़ 15 पीले चिपचिपे ट्रैप लगाएं। 5% नीम तेल का छिड़काव करें।',
      chemicalTreatment: 'डायफेंथियूरॉन 50% WP @ 1.2 ग्राम/लीटर या पायरीप्रॉक्सिफेन 10% EC @ 2 मिली/लीटर छिड़कें।',
      prevention: 'खेत की मेड़ों से गाजर घास और खरपतवार को नष्ट करें।'
    },
    {
      id: 'd4',
      name: 'धान का झुलसा रोग (Rice Blast)',
      crop: 'धान / चावल',
      confidence: 97.2,
      image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
      severity: 'गंभीर',
      symptoms: 'पत्तियों पर आंख के आकार के धब्बे जिनके बीच का हिस्सा राख जैसा सफेद और किनारे भूरे होते हैं।',
      organicTreatment: 'स्यूडोमोनास फ्लोरेसेंस जैव-कवकनाशी @ 2.5 ग्राम/लीटर + वर्मीवॉश का पर्णीय छिड़काव करें।',
      chemicalTreatment: 'ट्राइसाइक्लाज़ोल 75% WP @ 0.6 ग्राम/लीटर या आइसोप्रोपाइल 40% EC @ 1.5 मिली/लीटर छिड़कें।',
      prevention: 'बादल छाए रहने के दौरान यूरिया की भारी खुराक देने से बचें।'
    },
    {
      id: 'd5',
      name: 'सोयाबीन का गेरुआ रोग (Soybean Rust)',
      crop: 'सोयाबीन',
      confidence: 95.7,
      image: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=600&q=80',
      severity: 'मध्यम',
      symptoms: 'निचली पत्तियों पर छोटे भूरे-लाल धब्बे और पत्तियों का समय से पहले सूखकर गिरना।',
      organicTreatment: '1% बोर्डो मिश्रण या कॉपर ऑक्सीक्लोराइड + गोबर राख का लेप लगाएं।',
      chemicalTreatment: 'हेक्साकोनाज़ोल 5% EC @ 2 मिली/लीटर या पायराक्लोस्ट्रोबिन 20% WG @ 1 ग्राम/लीटर छिड़कें।',
      prevention: 'मक्का या ज्वार के साथ फसल चक्र अपनाएं।'
    },
    {
      id: 'd6',
      name: 'नारियल का कली सड़न रोग (Bud Rot)',
      crop: 'नारियल',
      confidence: 93.9,
      image: 'https://images.unsplash.com/photo-1544860707-c352cc5a92e3?auto=format&fit=crop&w=600&q=80',
      severity: 'अति गंभीर',
      symptoms: 'मध्य पत्तों का सड़ना, पत्तों का मुरझाना और पौधे से दुर्गंध आना।',
      organicTreatment: 'क्राउन की सफाई कर 1% बोर्डो पेस्ट लगाएं और ट्राइकोडर्मा युक्त नीम की खली (5 किग्रा/पेड़) डालें।',
      chemicalTreatment: 'कॉपर ऑक्सीक्लोराइड 0.3% (3 ग्राम/लीटर) का क्राउन पर छिड़काव करें।',
      prevention: 'पेड़ों के पास जल निकासी की अच्छी व्यवस्था करें।'
    }
  ],
  pa: [
    {
      id: 'd1',
      name: 'ਟਮਾਟਰ ਦਾ ਪਿਛੇਤਾ ਝੁਲਸਾ ਰੋਗ',
      crop: 'ਟਮਾਟਰ',
      confidence: 96.4,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22795?auto=format&fit=crop&w=600&q=80',
      severity: 'ਗੰਭੀਰ',
      symptoms: 'ਹੇਠਲੇ ਪੱਤਿਆਂ ਤੇ ਕਾਲੇ-ਭੂਰੇ ਧੱਬੇ ਜੋ ਤੇਜ਼ੀ ਨਾਲ ਫੈਲਦੇ ਹਨ। ਪੱਤਿਆਂ ਦੇ ਹੇਠਾਂ ਉੱਲੀ ਦਿਖਾਈ ਦਿੰਦੀ ਹੈ।',
      organicTreatment: '5% ਖੱਟੀ ਲੱਸੀ + ਟ੍ਰਾਈਕੋਡਰਮਾ @ 5 ਗ੍ਰਾਮ ਪ੍ਰਤੀ ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਮਿਲਾ ਕੇ 7 ਦਿਨਾਂ ਬਾਅਦ ਛਿੜਕੋ।',
      chemicalTreatment: 'ਮੈਨਕੋਜ਼ੇਬ 75% WP @ 2.5 ਗ੍ਰਾਮ/ਲੀਟਰ ਜਾਂ ਰਿਡੋਮਿਲ MZ @ 2 ਗ੍ਰਾਮ/ਲੀਟਰ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।',
      prevention: 'ਬੂਟਿਆਂ ਵਿਚਕਾਰ ਹਵਾ ਦਾ ਲਾਂਘਾ ਰੱਖੋ।'
    },
    {
      id: 'd2',
      name: 'ਕਣਕ ਦਾ ਪੀਲਾ ਰਤੂਆ (Yellow Rust)',
      crop: 'ਕਣਕ',
      confidence: 98.1,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      severity: 'ਅਤਿ ਗੰਭੀਰ',
      symptoms: 'ਪੱਤਿਆਂ ਤੇ ਪੀਲੀਆਂ ਧਾਰੀਆਂ ਬਣ ਜਾਂਦੀਆਂ ਹਨ ਅਤੇ ਹੱਥ ਲਗਾਉਣ ਤੇ ਪੀਲਾ ਪਾਊਡਰ ਉਂਗਲਾਂ ਤੇ ਲੱਗਦਾ ਹੈ।',
      organicTreatment: '10% ਗਊਮੂਤਰ ਅਰਕ 500 ਮਿਲੀਲੀਟਰ ਪ੍ਰਤੀ 15 ਲੀਟਰ ਪੰਪ ਨਾਲ ਛਿੜਕੋ।',
      chemicalTreatment: 'ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ 25% EC (ਟਿਲਟ) 200 ਮਿਲੀਲੀਟਰ ਪ੍ਰਤੀ ਏਕੜ 200 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਮਿਲਾ ਕੇ ਤੁਰੰਤ ਛਿੜਕੋ।',
      prevention: 'ਰੋਗ ਰਹਿਤ ਪ੍ਰਮਾਣਿਤ ਬੀਜ (HD-2967, PBW-725) ਹੀ ਬੀਜੋ।'
    },
    {
      id: 'd3',
      name: 'ਨਰਮੇ ਦਾ ਪੱਤਾ ਮਰੋੜ ਰੋਗ (CLCuV)',
      crop: 'ਨਰਮਾ / ਕਪਾਹ',
      confidence: 94.8,
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
      severity: 'ਗੰਭੀਰ',
      symptoms: 'ਪੱਤੇ ਉੱਪਰ ਜਾਂ ਹੇਠਾਂ ਵੱਲ ਮੁੜ ਜਾਂਦੇ ਹਨ ਅਤੇ ਨਾੜੀਆਂ ਮੋਟੀਆਂ ਹੋ ਜਾਂਦੀਆਂ ਹਨ।',
      organicTreatment: 'ਚਿੱਟੀ ਮੱਖੀ ਨੂੰ ਫੜਨ ਲਈ ਪ੍ਰਤੀ ਏਕੜ 15 ਪੀਲੇ ਸਟਿੱਕੀ ਟਰੈਪ ਲਗਾਓ। 5% ਨਿੰਮ ਤੇਲ ਛਿੜਕੋ।',
      chemicalTreatment: 'ਡਾਇਫੈਂਥੀਯੂਰੋਨ 50% WP @ 1.2 ਗ੍ਰਾਮ/ਲੀਟਰ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।',
      prevention: 'ਵੱਟਾਂ ਤੋਂ ਨਦੀਨ ਅਤੇ ਗਾਜਰ ਘਾਹ ਨਸ਼ਟ ਕਰੋ।'
    },
    {
      id: 'd4',
      name: 'ਝੋਨੇ ਦਾ ਝੁਲਸਾ ਰੋਗ (Rice Blast)',
      crop: 'ਝੋਨਾ / ਬਾਸਮਤੀ',
      confidence: 97.2,
      image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
      severity: 'ਗੰਭੀਰ',
      symptoms: 'ਪੱਤਿਆਂ ਉੱਤੇ ਅੱਖ ਵਰਗੇ ਅੰਡਾਕਾਰ ਧੱਬੇ ਜਿਨ੍ਹਾਂ ਦੇ ਕੇਂਦਰ ਸੁਆਹ ਰੰਗੇ ਹੁੰਦੇ ਹਨ।',
      organicTreatment: 'ਸੂਡੋਮੋਨਾਸ ਬਾਇਓ ਏਜੰਟ @ 2.5 ਗ੍ਰਾਮ/ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਘੋਲ ਕੇ ਛਿੜਕੋ।',
      chemicalTreatment: 'ਟ੍ਰਾਈਸਾਈਕਲਾਜ਼ੋਲ 75% WP @ 0.6 ਗ੍ਰਾਮ/ਲੀਟਰ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।',
      prevention: 'ਬੱਦਲਵਾਈ ਸਮੇਂ ਯੂਰੀਆ ਦੀ ਜ਼ਿਆਦਾ ਵਰਤੋਂ ਤੋਂ ਬਚੋ।'
    },
    {
      id: 'd5',
      name: 'ਸੋਇਆਬੀਨ ਦਾ ਰਤੂਆ ਰੋਗ',
      crop: 'ਸੋਇਆਬੀਨ',
      confidence: 95.7,
      image: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=600&q=80',
      severity: 'ਦਰਮਿਆਨਾ',
      symptoms: 'ਹੇਠਲੇ ਪੱਤਿਆਂ ਤੇ ਛੋਟੇ ਭੂਰੇ-ਲਾਲ ਧੱਬੇ ਜੋ ਬਾਅਦ ਵਿੱਚ ਪੱਤਿਆਂ ਨੂੰ ਸੁਕਾ ਦਿੰਦੇ ਹਨ।',
      organicTreatment: '1% ਬੋਰਡੋ ਮਿਸ਼ਰਣ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।',
      chemicalTreatment: 'ਹੈਕਸਾਕੋਨਾਜ਼ੋਲ 5% EC @ 2 ਮਿਲੀਲੀਟਰ/ਲੀਟਰ ਛਿੜਕੋ।',
      prevention: 'ਮੱਕੀ ਜਾਂ ਬਾਜਰੇ ਨਾਲ ਫ਼ਸਲੀ ਚੱਕਰ ਅਪਣਾਓ।'
    },
    {
      id: 'd6',
      name: 'ਨਾਰੀਅਲ ਦਾ ਕਲੀ ਸੜਨ ਰੋਗ',
      crop: 'ਨਾਰੀਅਲ',
      confidence: 93.9,
      image: 'https://images.unsplash.com/photo-1544860707-c352cc5a92e3?auto=format&fit=crop&w=600&q=80',
      severity: 'ਅਤਿ ਗੰਭੀਰ',
      symptoms: 'ਨਰਮ ਪੱਤੇ ਸੜ ਜਾਂਦੇ ਹਨ ਅਤੇ ਬੂਟੇ ਵਿੱਚੋਂ ਬਦਬੂ ਆਉਂਦੀ ਹੈ।',
      organicTreatment: 'ਸਫ਼ਾਈ ਕਰਕੇ 1% ਬੋਰਡੋ ਪੇਸਟ ਲਗਾਓ।',
      chemicalTreatment: 'ਕਾਪਰ ਆਕਸੀਕਲੋਰਾਈਡ 0.3% ਦਾ ਛਿੜਕਾਅ ਕਰੋ।',
      prevention: 'ਪਾਣੀ ਦੇ ਨਿਕਾਸ ਦਾ ਪੂਰਾ ਪ੍ਰਬੰਧ ਰੱਖੋ।'
    }
  ],
  mr: [
    {
      id: 'd1',
      name: 'टोमॅटोवरील करपा (Late Blight)',
      crop: 'टोमॅटो',
      confidence: 96.4,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22795?auto=format&fit=crop&w=600&q=80',
      severity: 'गंभीर',
      symptoms: 'पानांवर काळपट तपकिरी डाग पडतात आणि पानांच्या खाली पांढरी बुरशी दिसते.',
      organicTreatment: '5% आंबट ताक + ट्रायकोडर्मा @ 5 ग्रॅम/लिटर पाण्यात मिसळून 7 दिवसांच्या अंतराने फवारावे.',
      chemicalTreatment: 'मँकोझेब 75% WP @ 2.5 ग्रॅम/लिटर किंवा रिडोमिल MZ @ 2 ग्रॅम/लिटर फवारावे.',
      prevention: 'झाडांमध्ये हवा खेळती राहील अशी लागवड करावी.'
    },
    {
      id: 'd2',
      name: 'गव्हावरील पिवळा तांबेरा (Yellow Rust)',
      crop: 'गहू',
      confidence: 98.1,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      severity: 'अति गंभीर',
      symptoms: 'पानांवर पिवळ्या पट्ट्यांच्या स्वरूपात बुरशी दिसते आणि हात लावल्यास बोटांना पिवळी पावडर लागते.',
      organicTreatment: '10% गोमूत्र अर्क + दशपर्णी अर्क 500 मिली प्रति 15 लिटर पंपातून फवारावे.',
      chemicalTreatment: 'प्रोपिकोनाझोल 25% EC (टिल्ट) 200 मिली प्रति एकर 200 लिटर पाण्यातून त्वरित फवारावे.',
      prevention: 'रोगप्रतिकारक प्रमाणित वाण वापरावे.'
    },
    {
      id: 'd3',
      name: 'कापसावरील लीफ कर्ल व्हायरस (CLCuV)',
      crop: 'कापूस',
      confidence: 94.8,
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
      severity: 'गंभीर',
      symptoms: 'पाने वर किंवा खाली वळतात, शिरा जाड होतात आणि झाडांची वाढ खुंटते.',
      organicTreatment: 'पांढरी माशी नियंत्रणासाठी प्रति एकरी 15 पिवळे चिकट सापळे लावा. 5% निंबोळी अर्क फवारा.',
      chemicalTreatment: 'डायफेंथियूरॉन 50% WP @ 1.2 ग्रॅम/लिटर फवारावे.',
      prevention: 'बांधावरील तण नष्ट करावे.'
    },
    {
      id: 'd4',
      name: 'भातावरील करपा (Rice Blast)',
      crop: 'भात / धान',
      confidence: 97.2,
      image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
      severity: 'गंभीर',
      symptoms: 'पानांवर डोळ्याच्या आकाराचे राखाडी रंगाचे डाग पडतात.',
      organicTreatment: 'स्यूडोमोनास फ्लोरेसेन्स @ 2.5 ग्रॅम/लिटर फवारावे.',
      chemicalTreatment: 'ट्रायसायक्लॅझोल 75% WP @ 0.6 ग्रॅम/लिटर फवारावे.',
      prevention: 'ढगाळ हवामानात युरियाचा अतिरेक टाळावा.'
    },
    {
      id: 'd5',
      name: 'सोयाबीनवरील तांबेरा (Soybean Rust)',
      crop: 'सोयाबीन',
      confidence: 95.7,
      image: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=600&q=80',
      severity: 'मध्यम',
      symptoms: 'पानांवर तपकिरी-लाल डाग पडून पाने वेळेपूर्वी सुकतात.',
      organicTreatment: '1% बोर्डो मिश्रण फवारावे.',
      chemicalTreatment: 'हेक्साकोनाझोल 5% EC @ 2 मिली/लिटर फवारावे.',
      prevention: 'मका किंवा ज्वारीसोबत पीक फेरपालट करावी.'
    },
    {
      id: 'd6',
      name: 'नारळावरील कळी कुज रोग',
      crop: 'नारळ',
      confidence: 93.9,
      image: 'https://images.unsplash.com/photo-1544860707-c352cc5a92e3?auto=format&fit=crop&w=600&q=80',
      severity: 'अति गंभीर',
      symptoms: 'शेंड्याची पाने कुजतात आणि दुर्गंधी येते.',
      organicTreatment: 'शेंडा स्वच्छ करून 1% बोर्डो पेस्ट लावावी.',
      chemicalTreatment: 'कॉपर ऑक्सीक्लोराईड 0.3% फवारावे.',
      prevention: 'झाडांच्या मुळाशी पाण्याचा निचरा उत्तम ठेवावा.'
    }
  ],
  te: [
    {
      id: 'd1',
      name: 'టమాట లేట్ బ్లైట్ తెగులు',
      crop: 'టమాట',
      confidence: 96.4,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22795?auto=format&fit=crop&w=600&q=80',
      severity: 'తీవ్రం',
      symptoms: 'ఆకులపై ముదురు గోధుమ రంగు మచ్చలు వేగంగా వ్యాపిస్తాయి. ఆకుల అడుగున బూజు కనిపిస్తుంది.',
      organicTreatment: '5% పులిసిన మజ్జిగ ద్రావణాన్ని 7 రోజుల వ్యవధిలో పిచికారీ చేయండి.',
      chemicalTreatment: 'మాంకోజెబ్ 75% WP @ 2.5 గ్రా/లీటరు లేదా రిడోమిల్ MZ @ 2 గ్రా/లీటరు పిచికారీ చేయండి.',
      prevention: 'మొక్కల మధ్య సరైన గాలి వెలుతురు ఉండేలా చూడండి.'
    },
    {
      id: 'd2',
      name: 'గోధుమ పసుపు రస్ట్ తెగులు (Yellow Rust)',
      crop: 'గోధుమ',
      confidence: 98.1,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      severity: 'అత్యంత తీవ్రం',
      symptoms: 'ఆకులపై పసుపు రంగు గీతలు ఏర్పడతాయి, తాకినప్పుడు చేతులకు పసుపు పొడి అంటుకుంటుంది.',
      organicTreatment: '10% ఆవు మూత్రం మరియు వేప నూనె మిశ్రమాన్ని పిచికారీ చేయండి.',
      chemicalTreatment: 'ప్రొపికోనజోల్ 25% EC (టిల్ట్) ను ఎకరాకు 200 మి.లీ చొప్పున 200 లీటర్ల నీటిలో కలిపి పిచికారీ చేయండి.',
      prevention: 'తెగులు నిరోధక విత్తనాలను మాత్రమే వాడండి.'
    },
    {
      id: 'd3',
      name: 'పత్తి ఆకు ముడత వైరస్ (CLCuV)',
      crop: 'పత్తి',
      confidence: 94.8,
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
      severity: 'తీవ్రం',
      symptoms: 'ఆకులు పైకి లేదా కిందకి ముడుచుకుపోతాయి, మొక్కలు గిడసబారిపోతాయి.',
      organicTreatment: 'తెల్లదోమ నివారణకు ఎకరాకు 15 పసుపు జిగురు బోర్డులు ఏర్పాటు చేయండి.',
      chemicalTreatment: 'డయాఫెంథియురాన్ 50% WP @ 1.2 గ్రా/లీటరు పిచికారీ చేయండి.',
      prevention: 'పొలం గట్లపై కలుపు మొక్కలను నివారించండి.'
    },
    {
      id: 'd4',
      name: 'వరి అగ్గితెగులు (Rice Blast)',
      crop: 'వరి / ధాన్యం',
      confidence: 97.2,
      image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
      severity: 'తీవ్రం',
      symptoms: 'ఆకులపై కంటి ఆకారపు మచ్చలు ఏర్పడతాయి.',
      organicTreatment: 'సూడోమోనాస్ @ 2.5 గ్రా/లీటరు నీటిలో కలిపి పిచికారీ చేయండి.',
      chemicalTreatment: 'ట్రైసైక్లాజోల్ 75% WP @ 0.6 గ్రా/లీటరు పిచికారీ చేయండి.',
      prevention: 'మేఘావృతమైన వాతావరణంలో యూరియాను అధికంగా వాడవద్దు.'
    },
    {
      id: 'd5',
      name: 'సోయాబీన్ రస్ట్ తెగులు',
      crop: 'సోయాబీన్',
      confidence: 95.7,
      image: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=600&q=80',
      severity: 'మధ్యస్థం',
      symptoms: 'ఆకులపై ఎరుపు-గోధుమ రంగు మచ్చలు వచ్చి ఆకులు రాలిపోతాయి.',
      organicTreatment: '1% బోర్డో మిశ్రమాన్ని పిచికారీ చేయండి.',
      chemicalTreatment: 'హెక్సాకోనాజోల్ 5% EC @ 2 మి.లీ/లీటరు పిచికారీ చేయండి.',
      prevention: 'మొక్కజొన్నతో పంట మార్పిడి చేయండి.'
    },
    {
      id: 'd6',
      name: 'కొబ్బరి మొవ్వు కుళ్ళు తెగులు',
      crop: 'కొబ్బరి',
      confidence: 93.9,
      image: 'https://images.unsplash.com/photo-1544860707-c352cc5a92e3?auto=format&fit=crop&w=600&q=80',
      severity: 'అత్యంత తీవ్రం',
      symptoms: 'మొవ్వు ఆకులు కుళ్ళిపోయి దుర్వాసన వస్తుంది.',
      organicTreatment: 'మొవ్వును శుభ్రం చేసి 1% బోర్డో పేస్ట్ పూయండి.',
      chemicalTreatment: 'కాపర్ ఆక్సిక్లోరైడ్ 0.3% పిచికారీ చేయండి.',
      prevention: 'చెట్ల వద్ద నీరు నిలవకుండా చూడండి.'
    }
  ],
  ta: [
    {
      id: 'd1',
      name: 'தக்காளி இலை கருகல் நோய் (Late Blight)',
      crop: 'தக்காளி',
      confidence: 96.4,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22795?auto=format&fit=crop&w=600&q=80',
      severity: 'தீவிரம்',
      symptoms: 'இலைகளில் கருப்பு பழுப்பு நிற புள்ளிகள் தோன்றி விரைவாக பரவும்.',
      organicTreatment: '5% புளித்த மோர் கரைசலை 7 நாட்கள் இடைவெளியில் தெளிக்கவும்.',
      chemicalTreatment: 'மேன்கோசெப் 75% WP @ 2.5 கிராம்/லிட்டர் தண்ணீரில் தெளிக்கவும்.',
      prevention: 'செடிகளுக்கிடையே போதிய காற்று வசதி ஏற்படுத்தவும்.'
    },
    {
      id: 'd2',
      name: 'கோதுமை மஞ்சள் துரு நோய் (Yellow Rust)',
      crop: 'கோதுமை',
      confidence: 98.1,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      severity: 'மிகத் தீவிரம்',
      symptoms: 'இலைகளில் மஞ்சள் நிற கோடுகள் தோன்றி தூள் உதிரும்.',
      organicTreatment: '10% பசு சிறுநீர் மற்றும் வேப்ப எண்ணெய் கரைசல் தெளிக்கவும்.',
      chemicalTreatment: 'புரோபிகோனசோல் 25% EC (டில்ட்) @ 1 மி.லி/லிட்டர் தெளிக்கவும்.',
      prevention: 'நோய் எதிர்ப்பு ரகங்களை பயிரிடவும்.'
    },
    {
      id: 'd3',
      name: 'பருத்தி இலை சுருள் வைரஸ் (CLCuV)',
      crop: 'பருத்தி',
      confidence: 94.8,
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=600&q=80',
      severity: 'தீவிரம்',
      symptoms: 'இலைகள் மேல்நோக்கி சுருண்டு செடிகள் குட்டையாகும்.',
      organicTreatment: 'ஏக்கருக்கு 15 மஞ்சள் ஒட்டும் பொறிகளை நிறுவவும்.',
      chemicalTreatment: 'டயாபெந்தியூரான் 50% WP @ 1.2 கிராம்/லிட்டர் தெளிக்கவும்.',
      prevention: 'வரப்புகளில் உள்ள களைகளை அகற்றவும்.'
    }
  ],
  ml: [
    {
      id: 'd1',
      name: 'തക്കാളി ഇല കരിച്ചിൽ രോഗം (Late Blight)',
      crop: 'തക്കാളി',
      confidence: 96.4,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22795?auto=format&fit=crop&w=600&q=80',
      severity: 'തീവ്രം',
      symptoms: 'ഇലകളിൽ ഇരുണ്ട തവിട്ടുനിറത്തിലുള്ള പാടുകൾ വേഗത്തിൽ പടരുന്നു.',
      organicTreatment: '5% പുളിച്ച മോരും ട്രൈക്കോഡെർമയും തളിക്കുക.',
      chemicalTreatment: 'മാങ്കോസെബ് 75% WP @ 2.5 ഗ്രാം/ലിറ്റർ തളിക്കുക.',
      prevention: 'നല്ല വായുസഞ്ചാരം ഉറപ്പാക്കുക.'
    },
    {
      id: 'd2',
      name: 'ഗോതമ്പ് മഞ്ഞ തുരുമ്പ് രോഗം (Yellow Rust)',
      crop: 'ഗോതമ്പ്',
      confidence: 98.1,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      severity: 'വളരെ തീവ്രം',
      symptoms: 'ഇലകളിൽ മഞ്ഞ വരകൾ പ്രത്യക്ഷപ്പെടുന്നു.',
      organicTreatment: '10% ഗോമൂത്രവും വേപ്പെണ്ണയും തളിക്കുക.',
      chemicalTreatment: 'പ്രൊപികോണസോൾ 25% EC ലിറ്ററിന് 1 മില്ലി തളിക്കുക.',
      prevention: 'രോഗപ്രതിരോധ ശേഷിയുള്ള വിത്തുകൾ ഉപയോഗിക്കുക.'
    },
    {
      id: 'd6',
      name: 'തെങ്ങിന്റെ കൂമ്പ് ചീയൽ രോഗം (Bud Rot)',
      crop: 'തെങ്ങ്',
      confidence: 93.9,
      image: 'https://images.unsplash.com/photo-1544860707-c352cc5a92e3?auto=format&fit=crop&w=600&q=80',
      severity: 'ഗുരുതരം',
      symptoms: 'കൂമ്പ് ഇലകൾ ചീഞ്ഞ് ദുർഗന്ധം വമിക്കുന്നു.',
      organicTreatment: 'കൂമ്പ് വൃത്തിയാക്കി 1% ബോർഡോ മിശ്രിതം പുരട്ടുക.',
      chemicalTreatment: 'കോപ്പർ ഓക്സിക്ലോറൈഡ് 0.3% തളിക്കുക.',
      prevention: 'തടങ്ങളിൽ വെള്ളം കെട്ടിനിൽക്കാതെ നോക്കുക.'
    }
  ],
  bn: [
    {
      id: 'd1',
      name: 'টমেটোর নাবী ধ্বসা রোগ (Late Blight)',
      crop: 'টমেটো',
      confidence: 96.4,
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22795?auto=format&fit=crop&w=600&q=80',
      severity: 'মারাত্মক',
      symptoms: 'পাতায় ভেজা বাদামী দাগ দেখা যায় এবং পাতা পচে যায়।',
      organicTreatment: '৫% টক ঘোল ও নিম তেলের দ্রবণ ৭ দিন পর পর স্প্রে করুন।',
      chemicalTreatment: 'ম্যানকোজেব ৭৫% WP প্রতি লিটার জলে ২.৫ গ্রাম স্প্রে করুন।',
      prevention: 'গাছের মাঝে পর্যাপ্ত আলো-বাতাস নিশ্চিত করুন।'
    },
    {
      id: 'd2',
      name: 'গমের হলুদ মরচে রোগ (Yellow Rust)',
      crop: 'গম',
      confidence: 98.1,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
      severity: 'খুব মারাত্মক',
      symptoms: 'পাতায় হলুদ ডোরাকাটা দাগ এবং গুঁড়ো পাউডার বের হয়।',
      organicTreatment: '১০% গোমূত্র ও দশপর্ণী অর্ক স্প্রে করুন।',
      chemicalTreatment: 'প্রোপিকোনাজোল ২৫% EC (টিল্ট) প্রতি লিটার জলে ১ মিলি স্প্রে করুন।',
      prevention: 'প্রতিরোধক জাতের গম বীজ ব্যবহার করুন।'
    },
    {
      id: 'd4',
      name: 'ধানের ব্লাস্ট রোগ (Rice Blast)',
      crop: 'ধান',
      confidence: 97.2,
      image: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
      severity: 'মারাত্মক',
      symptoms: 'পাতায় চোখের মতো স্পিন্ডেল আকৃতির ক্ষত সৃষ্টি হয়।',
      organicTreatment: 'সিউডোমোনাস ফ্লুরোসেন্স ২.৫ গ্রাম/লিটার স্প্রে করুন।',
      chemicalTreatment: 'ট্রাইসাইক্লাজোল ৭৫% WP প্রতি লিটার জলে ০.৬ গ্রাম স্প্রে করুন।',
      prevention: 'মেঘলা আবহাওয়ায় অতিরিক্ত ইউরিয়া সার দেবেন না।'
    }
  ]
};

export const DISTRICTS_DATA = [
  {
    id: 'rourkela',
    name: 'Rourkela (Sundargarh)',
    state: 'Odisha',
    markets: ['Rourkela APMC Yard', 'Panposh Mandi', 'Sundargarh RMC', 'Rajgangpur Market', 'Bonai Yard', 'Bargaon Mandi']
  },
  {
    id: 'yavatmal',
    name: 'Yavatmal',
    state: 'Maharashtra',
    markets: ['Yavatmal APMC', 'Ghatanji Mandi', 'Wani Market Yard', 'Pusad APMC', 'Umarkhed', 'Digras Yard']
  },
  {
    id: 'ernakulam',
    name: 'Ernakulam',
    state: 'Kerala',
    markets: ['Ernakulam Central', 'Aluva APMC', 'Muvattupuzha Market', 'Angamaly Yard', 'Perumbavoor', 'Piravom Agro']
  },
  {
    id: 'karnal',
    name: 'Karnal',
    state: 'Haryana',
    markets: ['Karnal New Grain Market', 'Taraori Mandi', 'Gharaunda Yard', 'Indri APMC', 'Assandh Mandi', 'Nilokheri']
  },
  {
    id: 'bathinda',
    name: 'Bathinda',
    state: 'Punjab',
    markets: ['Bathinda Main Grain Mandi', 'Maur Mandi', 'Rampura Phul', 'Talwandi Sabo', 'Bhucho Mandi', 'Goniana Yard']
  },
  {
    id: 'nashik',
    name: 'Nashik',
    state: 'Maharashtra',
    markets: ['Lasalgaon Onion APMC', 'Pimpalgaon Baswant', 'Nashik Road Yard', 'Yeola APMC', 'Kalwan', 'Sinnar Market']
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    markets: ['Pune Gultekdi APMC', 'Baramati Market', 'Manchar Yard', 'Junnar APMC', 'Khed Market', 'Indapur Yard']
  },
  {
    id: 'latur',
    name: 'Latur',
    state: 'Maharashtra',
    markets: ['Latur Pulse & Oilseed APMC', 'Udgir Yard', 'Ahmedpur Mandi', 'Ausa Market', 'Nilanga APMC', 'Chakur']
  },
  {
    id: 'indore',
    name: 'Indore',
    state: 'Madhya Pradesh',
    markets: ['Indore Choithram Mandi', 'Sanwer Yard', 'Mhow APMC', 'Depalpur Market', 'Betma', 'Rau Mandi']
  }
];

export const CURRENT_FARMER_PROFILE = {
  name: 'Bikesh Ray',
  farmerId: 'OD-ROU-2026-4412',
  village: 'Panposh',
  taluk: 'Rourkela',
  district: 'Sundargarh',
  state: 'Odisha',
  phone: '9861054321',
  email: 'bikesh.ray@agrishield.in',
  landSize: '3.5 Acres',
  experience: '10',
  numFarms: '2',
  soilHealth: {
    ph: 6.8,
    organicCarbon: '0.62%',
    nitrogen: 'Medium (Balanced)',
    phosphorus: 'Medium',
    potassium: 'High',
    lastTested: '12 July 2024 (KVK Rourkela, Sundargarh)'
  },
  activeCrops: [
    { name: 'Paddy / Dhan (Swarna)', area: '2.2 Acres', sowingDate: '25 June 2024', stage: 'Tillering & Vegetative', health: 'Healthy (Optimal Moisture)' },
    { name: 'Mustard / Rai (Pusa Bold)', area: '1.3 Acres', sowingDate: '05 July 2024', stage: 'Vegetative Growth', health: 'Healthy' }
  ],
  kccLoan: {
    bank: 'SBI Panposh Branch, Rourkela',
    sanctionedAmount: 180000,
    outstandingBalance: 145000,
    dueDate: '10 Sept 2026',
    daysRemaining: 12
  },
  pmfbyPolicy: {
    policyNo: 'PMFBY-OD-2026-883194',
    insuredSum: 165000,
    status: 'Active'
  }
};

export const DISTRESS_TALUKS = [
  {
    id: 't1',
    name: 'Yavatmal Central Block',
    state: 'Maharashtra',
    fdiScore: 78.4,
    status: 'RED_CRITICAL',
    flaggedFarmersCount: 412,
    officerInCharge: 'Dr. Suresh Patil (DAO)',
    recommendedIntervention: 'PMFBY Fast-Track Claim Batch + Debt Moratorium Order'
  },
  {
    id: 't2',
    name: 'Beed South Sector',
    state: 'Maharashtra',
    fdiScore: 84.1,
    status: 'RED_CRITICAL',
    flaggedFarmersCount: 567,
    officerInCharge: 'Meenakshi Deshmukh (SDO)',
    recommendedIntervention: 'Immediate Water Tanker Deployment + PM-KISAN Advance'
  },
  {
    id: 't3',
    name: 'Bathinda Rural Sector',
    state: 'Punjab',
    fdiScore: 48.2,
    status: 'AMBER_MODERATE',
    flaggedFarmersCount: 124,
    officerInCharge: 'Gurpreet Singh (CAO)',
    recommendedIntervention: 'Drainage Clearance + Fungicide Subsidy'
  },
  {
    id: 't4',
    name: 'Karnal Agri Belt',
    state: 'Haryana',
    fdiScore: 22.6,
    status: 'GREEN_STABLE',
    flaggedFarmersCount: 18,
    officerInCharge: 'Anil Verma (DAO)',
    recommendedIntervention: 'Standard Agronomy Extension Bulletins'
  }
];

export const DISTRESSED_FARMERS_QUEUE = [
  {
    id: 'F-9021',
    name: 'Rameshwar Tukaram Patil',
    village: 'Ghatanji, Yavatmal',
    crop: 'Cotton & Soybean (4.2 Acres)',
    rainfallDeficit: '54% Deficit (Drought spell)',
    priceDrop: 'Cotton down ₹1,400 vs 2024',
    kccLoanDue: '₹1,85,000 due in 12 days',
    fdiScore: 88.5
  },
  {
    id: 'F-9022',
    name: 'Babanrao Shinde',
    village: 'Ashti, Beed',
    crop: 'Sugarcane & Bajra (3.0 Acres)',
    rainfallDeficit: '68% Deficit (Groundwater dried)',
    priceDrop: 'Bajra selling 20% below MSP',
    kccLoanDue: '₹2,20,000 due in 18 days',
    fdiScore: 84.2
  },
  {
    id: 'F-9023',
    name: 'Balwinder Singh',
    village: 'Maur, Bathinda',
    crop: 'Paddy / Basmati (5.5 Acres)',
    rainfallDeficit: 'Hailstorm (+35% anomaly)',
    priceDrop: 'Moisture penalty cut 12%',
    kccLoanDue: '₹95,000 due in 45 days',
    fdiScore: 54.0
  }
];

export const HOURLY_WEATHER_FORECAST = [
  { time: '06:00', temp: '22°C', rain: '0%', desc: 'Sunny' },
  { time: '09:00', temp: '26°C', rain: '5%', desc: 'Clear Sky' },
  { time: '12:00', temp: '29°C', rain: '15%', desc: 'Partly Cloudy' },
  { time: '15:00', temp: '31°C', rain: '30%', desc: 'Humidity Spike' },
  { time: '18:00', temp: '27°C', rain: '65%', desc: 'Showers' },
  { time: '21:00', temp: '24°C', rain: '85%', desc: 'Thunderstorm' },
  { time: '00:00', temp: '22°C', rain: '75%', desc: 'Rain' }
];

export const WEATHER_FORECAST_DATA = {
  currentTemp: '28°C',
  condition: 'Partly Cloudy with Humidity Spike',
  soilMoisture: '58%',
  precipitationChance: '74%',
  windSpeed: '14 km/h SW',
  humidity: '72%',
  hyperlocalAdvisory: 'Significant precipitation expected in 24 hours (18-25mm). Do NOT broadcast granular fertilizer or perform foliar spray today to avoid nutrient runoff.',
  days: [
    { day: 'Today', temp: '29° / 21°', desc: 'Sunny', rain: '10%' },
    { day: 'Tomorrow', temp: '25° / 19°', desc: 'Heavy Showers', rain: '78%' },
    { day: 'Thu', temp: '26° / 18°', desc: 'Thunderstorm', rain: '65%' },
    { day: 'Fri', temp: '28° / 20°', desc: 'Clearing Sky', rain: '20%' },
    { day: 'Sat', temp: '30° / 22°', desc: 'Clear', rain: '5%' }
  ]
};
