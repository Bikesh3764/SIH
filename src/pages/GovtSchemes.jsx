import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  CheckCircle, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Coins, 
  Sun, 
  Tractor, 
  Sprout, 
  Droplets, 
  ChevronRight, 
  X, 
  Clock, 
  CheckSquare,
  ExternalLink,
  ArrowUpRight
} from 'lucide-react';
import { TRANSLATIONS } from '../data/translations';

export const GOVT_SCHEMES_CATALOG = [
  {
    id: 'pm-kisan',
    code: 'PM-KISAN',
    name: 'Pradhan Mantri Kisan Samman Nidhi',
    localizedNames: {
      en: 'Pradhan Mantri Kisan Samman Nidhi',
      hi: 'प्रधानमंत्री किसान सम्मान निधि योजना',
      mr: 'प्रधानमंत्री किसान सन्मान निधी योजना',
      pa: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਕਿਸਾਨ ਸੰਮਾਨ ਨਿਧੀ ਯੋਜਨਾ',
      te: 'ప్రధాన మంత్రి కిసాన్ సమ్మాన్ నిధి',
      ta: 'பிரதான் மந்திரி கிசான் சம்மான் நிதி',
      ml: 'പ്രധാനമന്ത്രി കിസാൻ സമ്മാൻ നിധി',
      bn: 'প্রধানমন্ত্রী কিষাণ সম্মান নিধি'
    },
    category: 'financial',
    categoryLabel: 'Direct Income Support',
    benefitAmount: '₹6,000 / Year',
    benefitDesc: {
      en: 'Direct benefit transfer in 3 equal installments of ₹2,000 credited directly into bank account.',
      hi: '₹2,000 की 3 समान किस्तों में प्रति वर्ष ₹6,000 की प्रत्यक्ष बैंक हस्तांतरण सहायता।',
      mr: 'दरवर्षी ₹२,००० च्या ३ हप्त्यांमध्ये ₹६,००० थेट बँक खात्यात जमा.',
      pa: 'ਹਰ ਸਾਲ ₹2,000 ਦੀਆਂ 3 ਕਿਸ਼ਤਾਂ ਵਿੱਚ ₹6,000 ਸਿੱਧੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ।',
      te: 'ఏడాదికి ₹2,000 చొప్పున 3 విడతల్లో ₹6,000 నేరుగా బ్యాంక్ ఖాతాలో జమ.',
      ta: 'ஆண்டுக்கு ₹2,000 வீதம் 3 தவணைகளில் ₹6,000 நேரடியாக வங்கிக் கணக்கில்.',
      ml: 'വർഷത്തിൽ ₹2,000 വീതം 3 ഗഡുക്കളായി ₹6,000 ബാങ്ക് അക്കൗണ്ടിലേക്ക് നേരിട്ട്.',
      bn: 'বছরে ₹২,০০০ করে ৩টি কিস্তিতে ₹৬,০০০ সরাসরি ব্যাংক অ্যাকাউন্টে জমা।'
    },
    icon: Coins,
    eligibility: {
      en: [
        'All landholding farmer families with cultivable land in state records.',
        'Small & marginal farmers holding up to 2 hectares (5 acres).',
        'Active bank account linked with Aadhaar & e-KYC.'
      ],
      hi: [
        'भू-अभिलेखों में दर्ज कृषि भूमि वाले सभी किसान परिवार।',
        '2 हेक्टेयर (5 एकड़) तक भूमि वाले लघु और सीमांत किसान।',
        'आधार से जुड़ा बैंक खाता और ई-केवाईसी अनिवार्य।'
      ],
      mr: [
        'जमीन धारक सर्व शेतकरी कुटुंबे ज्यांच्या नावे ७/१२ नोंद आहे.',
        '२ हेक्टरपर्यंत शेती असणारे अल्प भूधारक शेतकरी.',
        'आधार लिंक बँक खाते आणि ई-केवायसी पूर्ण.'
      ],
      pa: [
        'ਜ਼ਮੀਨ ਦੇ ਰਿਕਾਰਡ ਵਿੱਚ ਦਰਜ ਸਾਰੇ ਕਿਸਾਨ ਪਰਿਵਾਰ।',
        '5 ਏਕੜ ਤੱਕ ਜ਼ਮੀਨ ਵਾਲੇ ਛੋਟੇ ਕਿਸਾਨ ਪੂਰਾ ਲਾਭ।',
        'ਆਧਾਰ ਲਿੰਕ ਬੈਂਕ ਖਾਤਾ ਅਤੇ ਈ-ਕੇਵਾਈਸੀ ਲਾਜ਼ਮੀ।'
      ],
      te: [
        'భూమి రికార్డుల్లో పేరున్న రైతు కుటుంబాలందరూ అర్హులు.',
        '5 ఎకరాల లోపు భూమి ఉన్న చిన్న, సన్నకారు రైతులు.',
        'ఆధార్ లింక్ అయిన బ్యాంక్ ఖాతా మరియు ఇ-కేవైసీ.'
      ],
      ta: [
        'பட்டா நிலம் வைத்துள்ள அனைத்து விவசாயக் குடும்பங்களும்.',
        '5 ஏக்கர் வரை நிலம் வைத்துள்ள சிறு விவசாயிகள்.',
        'ஆதார் இணைக்கப்பட்ட வங்கிக் கணக்கு மற்றும் e-KYC.'
      ],
      ml: [
        'ഭൂമിയുള്ള എല്ലാ കർഷക കുടുംബങ്ങളും അർഹരാണ്.',
        '5 ഏക്കർ വരെ കൃഷിഭൂമിയുള്ള ചെറുകിട കർഷകർ.',
        'ആധാർ ലിങ്ക് ചെയ്ത ബാങ്ക് അക്കൗണ്ടും ഇ-കെവൈസിയും.'
      ],
      bn: [
        'জমির রেকর্ডভুক্ত সমস্ত কৃষক পরিবার।',
        '৫ একর পর্যন্ত কৃষিজমি থাকা ক্ষুদ্র কৃষকগণ।',
        'আধার লিংকযুক্ত ব্যাংক অ্যাকাউন্ট ও ই-কেওয়াইসি।'
      ]
    },
    documents: [
      'Aadhaar Card',
      'Land Record (7/12 / Patta)',
      'Bank Passbook',
      'Mobile Number'
    ],
    processingDays: '15 Days',
    officialUrl: 'https://pmkisan.gov.in/'
  },
  {
    id: 'pmfby',
    code: 'PMFBY',
    name: 'Pradhan Mantri Fasal Bima Yojana',
    localizedNames: {
      en: 'Pradhan Mantri Fasal Bima Yojana',
      hi: 'प्रधानमंत्री फसल बीमा योजना',
      mr: 'प्रधानमंत्री पीक विमा योजना',
      pa: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਫ਼ਸਲ ਬੀਮਾ ਯੋਜਨਾ',
      te: 'ప్రధాన మంత్రి ఫసల్ బీమా యోజన',
      ta: 'பிரதான் மந்திரி பயிர் காப்பீட்டுத் திட்டம்',
      ml: 'പ്രധാനമന്ത്രി ഫസൽ ബീമാ യോജന',
      bn: 'প্রধানমন্ত্রী ফসল বীমা যোজনা'
    },
    category: 'insurance',
    categoryLabel: 'Crop Insurance & Disaster Relief',
    benefitAmount: 'Up to ₹2,00,000 / Acre Cover',
    benefitDesc: {
      en: 'Comprehensive crop insurance covering drought, floods, pest attack, and hailstorm with nominal 1.5% - 2% premium.',
      hi: 'सूखा, बाढ़, ओलावृष्टि व कीट प्रकोप से फसल क्षति पर संपूर्ण वित्तीय सुरक्षा व बीमा क्लेम।',
      mr: 'दुष्काळ, अतिवृष्टी, गारपीट आणि कीड रोगांपासून पिकांचे संपूर्ण विमा संरक्षण.',
      pa: 'ਸੋਕਾ, ਹੜ੍ਹ, ਗੜੇਮਾਰੀ ਅਤੇ ਕੀੜਿਆਂ ਦੇ ਹਮਲੇ ਤੋਂ ਫ਼ਸਲਾਂ ਦਾ ਪੂਰਾ ਬੀਮਾ ਕਵਰ।',
      te: 'కరువు, వరదలు, తెగుళ్లు మరియు వడగండ్ల వాన వల్ల పంట నష్టానికి పూర్తి బీమా రక్షణ.',
      ta: 'வறட்சி, வெள்ளம், பூச்சித் தாக்குதல் மற்றும் ஆலங்கட்டி மழையிலிருந்து முழு பயிர் காப்பீடு.',
      ml: 'വരൾച്ച, പ്രളയം, കീടബാധ എന്നിവയിൽ നിന്നുള്ള സമഗ്ര വിള ഇൻഷുറൻസ് പരിരക്ഷ.',
      bn: 'খরা, বন্যা, শিলাবৃষ্টি ও পোকার আক্রমণে ফসল ক্ষতির সম্পূর্ণ বীমা সুরক্ষা।'
    },
    icon: ShieldCheck,
    eligibility: {
      en: [
        'All farmers cultivating notified crops in notified areas.',
        'Applicable for both loanee (KCC holders) and non-loanee farmers.',
        'Sharecroppers eligible with village certification.'
      ],
      hi: [
        'अधिसूचित क्षेत्रों में अधिसूचित फसलें उगाने वाले सभी किसान।',
        'केसीसी धारक ऋणी एवं गैर-ऋणी किसान दोनों के लिए लागू।',
        'बटाईदार किसान भी ग्राम प्रमाणपत्र के साथ पात्र।'
      ],
      mr: [
        'अधिसूचित पिके घेणारे सर्व शेतकरी (कर्जदार व बिगर-कर्जदार).',
        'भाडेकरू शेतकरी सुद्धा पात्र.'
      ],
      pa: [
        'ਨੋਟੀਫਾਈਡ ਫ਼ਸਲਾਂ ਉਗਾਉਣ ਵਾਲੇ ਸਾਰੇ ਕਿਸਾਨ (ਲੋਨੀ ਅਤੇ ਗੈਰ-ਲੋਨੀ)।',
        'ਠੇਕੇ ਤੇ ਜ਼ਮੀਨ ਲੈ ਕੇ ਖੇਤੀ ਕਰਨ ਵਾਲੇ ਵੀ ਯੋਗ।'
      ],
      te: [
        'నోటిఫైడ్ పంటలు సాగు చేసే రైతులందరూ అర్హులు.',
        'కౌలు రైతులు కూడా గ్రామ ధ్రువీకరణతో అర్హులు.'
      ],
      ta: [
        'அறிவிக்கப்பட்ட பயிர்களை பயிரிடும் அனைத்து விவசாயிகளும்.',
        'குத்தகை விவசாயிகளும் தகுதியுடையவர்கள்.'
      ],
      ml: [
        'വിജ്ഞാപനം ചെയ്ത വിളകൾ കൃഷി ചെയ്യുന്ന എല്ലാ കർഷകരും.',
        'പാട്ടക്കർഷകർക്കും അപേക്ഷിക്കാം.'
      ],
      bn: [
        'বিজ্ঞাপিত ফসল চাষকারী সমস্ত কৃষক (ঋণগ্রহীता ও অ-ঋণগ্রহীতা)।',
        'ভাগচাষীরাও আবেদনের যোগ্য।'
      ]
    },
    documents: [
      'Crop Sowing Certificate',
      'Land Revenue Extract (7/12)',
      'Aadhaar Card & Bank Details',
      'Crop Loss Photo (within 72h)'
    ],
    processingDays: '7-14 Days',
    officialUrl: 'https://pmfby.gov.in/'
  },
  {
    id: 'pm-kusum',
    code: 'PM-KUSUM',
    name: 'Pradhan Mantri Kisan Urja Suraksha (Solar Pump)',
    localizedNames: {
      en: 'Pradhan Mantri Kisan Urja Suraksha (Solar Pump)',
      hi: 'पीएम-कुसुम सौर कृषि पंप योजना',
      mr: 'पीएम-कुसुम सौर कृषी पंप योजना',
      pa: 'ਪੀਐਮ-ਕੁਸੁਮ ਸੋਲਰ ਐਗਰੀ ਪੰਪ ਯੋਜਨਾ',
      te: 'పీఎం-కుసుమ్ సోలార్ అగ్రికల్చర్ పంప్',
      ta: 'பிஎம்-குசும் சோலார் விவசாய பம்ப் திட்டம்',
      ml: 'പിഎം-കുസും സോളാർ പമ്പ് പദ്ധതി',
      bn: 'পিএম-কুসুম সৌর সেচ পাম্প প্রকল্প'
    },
    category: 'solar',
    categoryLabel: 'Solar Energy & Free Irrigation',
    benefitAmount: '60% to 90% Subsidy',
    benefitDesc: {
      en: 'Get standalone solar agriculture pumps (3HP to 7.5HP) with up to 90% government subsidy + zero electricity bill.',
      hi: '3HP से 7.5HP तक स्टैंडअलोन सोलर एग्रीकल्चर पंपों पर 90% तक सरकारी अनुदान + शून्य बिजली बिल।',
      mr: '३ एचपी ते ७.५ एचपी सौर कृषी पंपांवर ९०% पर्यंत सरकारी अनुदान + मोफत दिवसा वीज.',
      pa: '3HP ਤੋਂ 7.5HP ਸੋਲਰ ਪੰਪਾਂ ਉੱਤੇ 90% ਤੱਕ ਸਰਕਾਰੀ ਸਬਸਿਡੀ।',
      te: '3HP నుండి 7.5HP సౌర వ్యవసాయ పంపులపై 90% వరకు ప్రభుత్వ రాయితీ.',
      ta: '3HP முதல் 7.5HP வரை சோலார் பம்புகளுக்கு 90% வரை அரசு மானியம்.',
      ml: '3HP മുതൽ 7.5HP വരെയുള്ള സോളാർ പമ്പുകൾക്ക് 90% വരെ സബ്‌സിഡി.',
      bn: '৩HP থেকে ৭.৫HP সৌর পাম্পের উপর ৯০% পর্যন্ত সরকারি ভর্তুকি।'
    },
    icon: Sun,
    eligibility: {
      en: [
        'Individual farmers, cooperatives with cultivable land.',
        'Must have open well, borewell, or water source on farm.',
        'Farmers without electric pump connection given priority.'
      ],
      hi: [
        'खेती योग्य जमीन वाले व्यक्तिगत किसान व समितियां।',
        'खेत में कुआं, बोरवेल या जल स्रोत होना चाहिए।',
        'बिजली कनेक्शन न होने वालों को पहली प्राथमिकता।'
      ],
      mr: [
        'शेतीयोग्य जमीन असलेले शेतकरी.',
        'शेतात विहीर किंवा बोरवेल असणे आवश्यक.'
      ],
      pa: [
        'ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ ਵਾਲੇ ਕਿਸਾਨ ਜਿਨ੍ਹਾਂ ਕੋਲ ਪਾਣੀ ਦਾ ਸਰੋਤ ਹੈ।',
        'ਬਿਜਲੀ ਕੁਨੈਕਸ਼ਨ ਨਾ ਹੋਣ ਵਾਲਿਆਂ ਨੂੰ ਪਹਿਲ।'
      ],
      te: [
        'సాగు భూమి మరియు నీటి వనరు ఉన్న రైతులు.',
        'విద్యుత్ కనెక్షన్ లేని రైతులకు ప్రాధాన్యత.'
      ],
      ta: [
        'விவசாய நிலமும் நீர் ஆதாரமும் கொண்ட விவசாயிகள்.',
        'மின் இணைப்பு இல்லாதவர்களுக்கு முன்னுரிமை.'
      ],
      ml: [
        'കൃഷിഭൂമിയും ജലസ്രോതസ്സുമുള്ള കർഷകർ.',
        'വൈദ്യുതി കണക്ഷൻ ഇല്ലാത്തവർക്ക് മുൻഗണന.'
      ],
      bn: [
        'চাষযোগ্য জমি ও জলের উৎস থাকা কৃষকগণ।',
        'বিদ্যুৎ সংযোগহীনদের অগ্রাধিকার।'
      ]
    },
    documents: [
      'Land Proof (Khasra / 7-12)',
      'Water Source Certificate',
      'Aadhaar Card & Bank Passbook',
      'Passport Photograph'
    ],
    processingDays: '30 Days',
    officialUrl: 'https://pmkusum.mnre.gov.in/'
  },
  {
    id: 'smam',
    code: 'SMAM',
    name: 'Sub-Mission on Agricultural Mechanization (Tractor & Drone)',
    localizedNames: {
      en: 'Sub-Mission on Agricultural Mechanization (Tractor & Drone)',
      hi: 'कृषि यंत्रीकरण उप-मिशन (ट्रैक्टर व ड्रोन सब्सिडी)',
      mr: 'कृषी यांत्रिकीकरण उप-अभियान (ट्रॅक्टर व अवजारे अनुदान)',
      pa: 'ਖੇਤੀਬਾੜੀ ਮਸ਼ੀਨਰੀ ਸਬਸਿਡੀ ਮਿਸ਼ਨ',
      te: 'వ్యవసాయ యాంత్రీకరణ సబ్-మిషన్ (ట్రాక్టర్ & డ్రోన్)',
      ta: 'விவசாய இயந்திரமயமாக்கல் துணை இயக்கம்',
      ml: 'കാർഷിക യന്ത്രവൽക്കരണ പദ്ധതി',
      bn: 'কৃষি যান্ত্রিকীকরণ মিশন (ট্রাক্টর ও ড্রোন ভর্তুকি)'
    },
    category: 'machinery',
    categoryLabel: 'Farm Machinery Subsidy',
    benefitAmount: '40% to 80% Subsidy',
    benefitDesc: {
      en: 'Direct financial subsidy on Tractors, Power Tillers, Rotavators, Harvesters, and Kisan Drone Sprayers.',
      hi: 'ट्रैक्टर, पावर टिलर, रोटावेटर, रीपर और किसान ड्रोन स्प्रेयर की खरीद पर 40% से 80% तक की भारी छूट।',
      mr: 'ट्रॅक्टर, पॉवर टिलर, रोटाव्हेटर आणि कृषी ड्रोन खरेदीवर ४०% ते ८०% थेट अनुदान.',
      pa: 'ਟਰੈਕਟਰ, ਰੋਟਾਵੇਟਰ ਅਤੇ ਡਰੋਨ ਸਪਰੇਅਰ ਦੀ ਖਰੀਦ ਤੇ 40% ਤੋਂ 80% ਸਬਸਿਡੀ।',
      te: 'ట్రాక్టర్లు, రోటవేటర్లు మరియు డ్రోన్ స్ప్రేయర్లపై 40% నుండి 80% వరకు రాయితీ.',
      ta: 'டிராக்டர்கள், ரோட்டாவேட்டர்கள் மற்றும் ட்ரோன்களுக்கு 40% முதல் 80% மானியம்.',
      ml: 'ട്രാക്ടറുകൾ, റോട്ടാവേറ്ററുകൾ, ഡ്രോൺ എന്നിവയ്ക്ക് 40% മുതൽ 80% വരെ സബ്‌സിഡി.',
      bn: 'ট্রাক্টর, রোটাভেটর ও কিষাণ ড্রোনের ওপর ৪০% থেকে ৮০% পর্যন্ত ভর্তুকি।'
    },
    icon: Tractor,
    eligibility: {
      en: [
        'Small & marginal landholders get up to 50% subsidy.',
        'Women farmers and FPOs receive up to 80% grant.',
        'Purchase from authorized government dealers.'
      ],
      hi: [
        'लघु एवं सीमांत किसानों को 50% तक सब्सिडी।',
        'महिला किसानों एवं FPO को 80% तक अनुदान।',
        'सरकारी अधिकृत डीलर से खरीद अनिवार्य।'
      ],
      mr: [
        'अल्प भूधारक शेतकऱ्यांना ५०% पर्यंत अनुदान.',
        'महिला शेतकरी व FPO कंपन्यांना ८०% पर्यंत अनुदान.'
      ],
      pa: [
        'ਛੋਟੇ ਕਿਸਾਨਾਂ ਨੂੰ 50% ਅਤੇ ਮਹਿਲਾ ਕਿਸਾਨਾਂ ਨੂੰ 80% ਸਬਸਿਡੀ।',
        'ਸਰਕਾਰੀ ਡੀਲਰਾਂ ਤੋਂ ਖਰੀਦ ਲਾਜ਼ਮੀ।'
      ],
      te: [
        'చిన్న రైతులకు 50%, మహిళా రైతులకు 80% వరకు రాయితీ.',
        'అధికారిక డీలర్ల వద్ద కొనుగోలు చేయాలి.'
      ],
      ta: [
        'சிறு விவசாயிகளுக்கு 50%, பெண்களுக்கு 80% மானியம்.',
        'அரசு டீலர்களிடம் வாங்க வேண்டும்.'
      ],
      ml: [
        'ചെറുകിട കർഷകർക്ക് 50%, വനിതകൾക്ക് 80% സബ്‌സിഡി.',
        'അംഗീകൃത ഡീലർമാരിൽ നിന്ന് വാങ്ങണം.'
      ],
      bn: [
        'ক্ষুদ্র কৃষকদের ৫০% এবং মহিলা কৃষকদের ৮০% অনুদান।'
      ]
    },
    documents: [
      'Aadhaar & Land Record',
      'Dealer Machinery Quotation',
      'Caste Certificate (if applicable)',
      'Bank Cancelled Cheque'
    ],
    processingDays: '21 Days',
    officialUrl: 'https://agrimachinery.nic.in/'
  },
  {
    id: 'kcc',
    code: 'KCC Loan',
    name: 'Kisan Credit Card (Low Interest Agri Loan)',
    localizedNames: {
      en: 'Kisan Credit Card (Low Interest Agri Loan)',
      hi: 'किसान क्रेडिट कार्ड (सस्ता कृषि ऋण @ 4%)',
      mr: 'किसान क्रेडिट कार्ड (सवलतीचा पीक कर्ज दर)',
      pa: 'ਕਿਸਾਨ ਕ੍ਰੈਡਿਟ ਕਾਰਡ (ਸਸਤਾ ਖੇਤੀਬਾੜੀ ਕਰਜ਼ਾ)',
      te: 'కిసాన్ క్రెడిట్ కార్డ్ (తక్కువ వడ్డీ రుణం)',
      ta: 'கிசான் கிரெடிட் கார்டு (குறைந்த வட்டி விவசாய கடன்)',
      ml: 'കിസാൻ ക്രെഡിറ്റ് കാർഡ് (കുറഞ്ഞ പലിശ വായ്പ)',
      bn: 'কিষাণ ক্রেডিট কার্ড (স্বল্প সুদের কৃষি ঋণ)'
    },
    category: 'financial',
    categoryLabel: 'Concessional Credit',
    benefitAmount: 'Up to ₹3,00,000 @ 4% Interest',
    benefitDesc: {
      en: 'Instant working capital loan for seeds, fertilizers, and diesel at an effective 4% annual interest with prompt repayment.',
      hi: 'बीज, खाद और डीजल के लिए 4% की रियायती वार्षिक ब्याज दर पर ₹3 लाख तक का आसान फसली ऋण।',
      mr: 'वेळेवर परतफेडीवर केवळ ४% व्याजदराने ₹३ लाखांपर्यंत तात्काळ पीक कर्ज.',
      pa: 'ਸਮੇਂ ਸਿਰ ਅਦਾਇਗੀ ਤੇ ਸਿਰਫ 4% ਵਿਆਜ ਦਰ ਨਾਲ ₹3 ਲੱਖ ਤੱਕ ਫ਼ਸਲੀ ਕਰਜ਼ਾ।',
      te: 'సకాలంలో చెల్లింపుపై కేవలం 4% వార్షిక వడ్డీతో ₹3 లక్షల వరకు పంట రుణం.',
      ta: 'நேரத்திற்கு திருப்பிச் செலுத்தினால் 4% வட்டியில் ₹3 லட்சம் வரை பயிர் கடன்.',
      ml: 'സമയബന്ധിതമായി തിരിച്ചടയ്ക്കുമ്പോൾ 4% പലിശയിൽ ₹3 ലക്ഷം വരെ വായ്പ.',
      bn: 'সময়মতো পরিশোধে মাত্র ৪% সুদে ₹৩ লাখ পর্যন্ত ফসল ঋণ।'
    },
    icon: Coins,
    eligibility: {
      en: [
        'All owner-cultivators, tenant farmers, and sharecroppers.',
        'Animal husbandry, dairy, and fisheries eligible up to ₹2 Lakh.'
      ],
      hi: [
        'सभी काश्तकार, पट्टेदार और बटाईदार किसान।',
        'पशुपालन व डेयरी किसान भी बिना गारंटी ₹2 लाख तक पात्र।'
      ],
      mr: [
        'सर्व जमीनधारक व भाडेकरू शेतकरी.',
        'पशुपालन व दुग्धव्यवसाय शेतकरी सुद्धा पात्र.'
      ],
      pa: [
        'ਸਾਰੇ ਖੇਤੀਬਾੜੀ, ਪਸ਼ੂ ਪਾਲਣ ਅਤੇ ਡੇਅਰੀ ਕਿਸਾਨ।',
        'ਬਿਨਾਂ ਗਾਰੰਟੀ ₹2 ਲੱਖ ਤੱਕ ਕਰਜ਼ਾ ਉਪਲਬਧ।'
      ],
      te: [
        'భూమి ఉన్న రైతులు మరియు పాడి, మత్స్య రైతులు అర్హులు.'
      ],
      ta: [
        'விவசாயிகள் மற்றும் கால்நடை வளர்ப்பவர்கள்.'
      ],
      ml: [
        'എല്ലാ കർഷകരും കന്നുകാലി വളർത്തലുകാരും.'
      ],
      bn: [
        'সমস্ত কৃষক এবং পশুপালন ও মৎস্যচাষীগণ।'
      ]
    },
    documents: [
      'KCC Application Form',
      'Land Record (7/12 / Jamabandi)',
      'Aadhaar Card & PAN Card',
      'Self Declaration'
    ],
    processingDays: '7 Days',
    officialUrl: 'https://myscheme.gov.in/schemes/kcc'
  },
  {
    id: 'pmksy',
    code: 'PMKSY',
    name: 'Pradhan Mantri Krishi Sinchayee Yojana (Drip & Sprinkler)',
    localizedNames: {
      en: 'Pradhan Mantri Krishi Sinchayee Yojana (Drip & Sprinkler)',
      hi: 'प्रधानमंत्री कृषि सिंचाई योजना (ड्रिप व स्प्रिंकलर)',
      mr: 'प्रधानमंत्री कृषी सिंचन योजना (ठिबक व तुषार सिंचन)',
      pa: 'ਪ੍ਰਧਾਨ ਮੰਤਰੀ ਤੁਪਕਾ ਸਿੰਚਾਈ ਯੋਜਨਾ',
      te: 'ప్రధాన మంత్రి కృషి సించాయి యోజన (బిందు సేద్యం)',
      ta: 'பிரதான் மந்திரி சொட்டு நீர் பாசனத் திட்டம்',
      ml: 'പ്രധാനമന്ത്രി തുള്ളിനന പദ്ധതി',
      bn: 'প্রধানমন্ত্রী কৃষি সেচ যোজনা (ড্রিপ ও স্প্রিংকলার)'
    },
    category: 'solar',
    categoryLabel: 'Micro-Irrigation Subsidy',
    benefitAmount: '55% to 75% Subsidy',
    benefitDesc: {
      en: 'Substantial grant for installing Drip Irrigation and Sprinkler systems, saving 60% water while boosting yield by 35%.',
      hi: 'ड्रिप (टपक) और स्प्रिंकलर सिंचाई सिस्टम लगाने पर 55% से 75% तक सरकारी सब्सिडी।',
      mr: 'ठिबक आणि तुषार सिंचन संच बसवण्यासाठी ५५% ते ७५% थेट शासकीय अनुदान.',
      pa: 'ਤੁਪਕਾ ਅਤੇ ਫੁਹਾਰਾ ਸਿੰਚਾਈ ਸਿਸਟਮ ਲਗਾਉਣ ਤੇ 75% ਤੱਕ ਸਬਸਿਡੀ।',
      te: 'బిందు మరియు తుంపర సేద్యం పరికరాల కొనుగోలుపై 75% వరకు రాయితీ.',
      ta: 'சொட்டு நீர் மற்றும் தெளிப்பு நீர் பாசனக் கருவிகளுக்கு 75% வரை மானியம்.',
      ml: 'തുള്ളിനന ഉപകരണങ്ങൾ സ്ഥാപിക്കുന്നതിന് 75% വരെ സബ്‌സിഡി.',
      bn: 'ড্রিপ ও স্প্রিংকলার সেচ ব্যবস্থা স্থাপনে ৭৫% পর্যন্ত সরকারি ভর্তুকি।'
    },
    icon: Droplets,
    eligibility: {
      en: [
        'Farmers possessing agricultural land with water source.',
        'Small and marginal farmers eligible for up to 75% subsidy.'
      ],
      hi: [
        'सिंचाई जल स्रोत वाले सभी कृषि भूमि धारक किसान।',
        'लघु एवं सीमांत किसानों को 75% तक का उच्चतम लाभ।'
      ],
      mr: [
        'पाण्याचा स्त्रोत उपलब्ध असलेले सर्व शेतकरी.'
      ],
      pa: [
        'ਪਾਣੀ ਦੇ ਸਰੋਤ ਵਾਲੇ ਸਾਰੇ ਖੇਤੀਬਾੜੀ ਕਿਸਾਨ।'
      ],
      te: [
        'సాగునీటి వనరు ఉన్న రైతు కుటుంబాలందరూ.'
      ],
      ta: [
        'பாசன நீர் ஆதாரமுள்ள அனைத்து விவசாயிகளும்.'
      ],
      ml: [
        'ജലസ്രോതസ്സുള്ള കൃഷിഭൂമിയുള്ള എല്ലാ കർഷകരും.'
      ],
      bn: [
        'সেচ জলের উৎস থাকা সমস্ত চাষযোগ্য জমির মালিক কৃষক।'
      ]
    },
    documents: [
      'Land Title / 7-12 Record',
      'Water Source Proof (Well/Borewell)',
      'Aadhaar Card & Bank Passbook',
      'Micro-irrigation Layout Quotation'
    ],
    processingDays: '20 Days',
    officialUrl: 'https://pmksy.gov.in/'
  }
];

export default function GovtSchemes({ currentLang, onNavigate }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSchemes = GOVT_SCHEMES_CATALOG.filter((scheme) => {
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    const localizedName = scheme.localizedNames[currentLang] || scheme.name;
    const matchesSearch = 
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      localizedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-7 animate-apple-fade text-[#1d1d1f]">
      
      {/* 1. Header Banner (DESIGN.md {component.product-tile-dark}: #272729 Tile) */}
      <div className="p-7 sm:p-9 rounded-[18px] bg-[#272729] text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-apple-in">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-[12px] font-semibold uppercase bg-[#2997ff]/15 border border-[#2997ff]/30 text-[#2997ff] tracking-[0.04em]">
              Central & State Welfare
            </span>
          </div>
          <h1 className="text-[28px] sm:text-[36px] font-semibold tracking-[-0.28px] text-white leading-tight">
            {t.schemesPageTitle}
          </h1>
          <p className="text-[14px] text-[#cccccc] max-w-2xl leading-[1.47]">
            {t.schemesPageSubtitle}
          </p>
        </div>

        {/* 2 Stats Pods (DESIGN.md Tile 2 #2a2a2c) */}
        <div className="grid grid-cols-2 gap-3 shrink-0 w-full sm:w-auto">
          <div className="p-4 rounded-[14px] bg-[#2a2a2c] border border-white/5 text-center min-w-[130px]">
            <span className="text-[11px] uppercase font-semibold text-[#7a7a7a] block tracking-wide">{t.totalGrantPool}</span>
            <span className="text-[21px] font-semibold text-white tracking-[-0.231px]">₹1.24 Lakh Cr</span>
          </div>
          <div className="p-4 rounded-[14px] bg-[#2a2a2c] border border-white/5 text-center min-w-[130px]">
            <span className="text-[11px] uppercase font-semibold text-[#7a7a7a] block tracking-wide">{t.activePrograms}</span>
            <span className="text-[21px] font-semibold text-[#2997ff] tracking-[-0.231px]">6 Schemes</span>
          </div>
        </div>
      </div>

      {/* 2. Search & Category Filter Toolbar (DESIGN.md search-input & pill grammar) */}
      <div className="p-5 rounded-[18px] bg-white border border-[#e0e0e0] space-y-3.5 shadow-xs">
        
        {/* Apple Pill Search Input */}
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a7a7a]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchSchemesPlaceholder}
            className="w-full pl-11 pr-9 py-3 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[14px] font-normal text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:bg-white transition-all shadow-xs"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a7a7a] hover:text-[#1d1d1f] cursor-pointer">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-0.5">
          {[
            { id: 'all', label: t.allSchemes },
            { id: 'financial', label: t.catFinancial },
            { id: 'insurance', label: t.catInsurance },
            { id: 'solar', label: t.catSolar },
            { id: 'machinery', label: t.catMachinery },
            { id: 'soil', label: t.catSoil }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium whitespace-nowrap transition-all cursor-pointer active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-[#0066cc] text-white shadow-sm'
                  : 'bg-[#f5f5f7] hover:bg-[#e8e8ed] text-[#1d1d1f] border border-[#e0e0e0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Schemes Grid (DESIGN.md {component.store-utility-card}: #ffffff, 18px rounded, 24px padding) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme, idx) => {
          const IconComp = scheme.icon;
          const localizedTitle = scheme.localizedNames[currentLang] || scheme.name;
          const localizedDesc = scheme.benefitDesc[currentLang] || scheme.benefitDesc.en;
          const localizedEligibility = scheme.eligibility[currentLang] || scheme.eligibility.en;

          return (
            <div
              key={scheme.id}
              className={`p-7 rounded-[18px] bg-white border border-[#e0e0e0] transition-all flex flex-col justify-between space-y-5 apple-card-hover animate-apple-in delay-${(idx % 6) + 1}`}
            >
              <div className="space-y-4">
                
                {/* Header with Circular Glyph Container */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-12 h-12 rounded-[12px] bg-[#f5f5f7] text-[#0066cc] flex items-center justify-center font-bold shrink-0 border border-[#e0e0e0]">
                    <IconComp size={22} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0]">
                        {scheme.code}
                      </span>
                      <span className="text-[12px] text-[#7a7a7a]">
                        {scheme.categoryLabel}
                      </span>
                    </div>
                    <h3 className="text-[18px] font-semibold text-[#1d1d1f] tracking-[-0.28px] mt-1 leading-snug">
                      {localizedTitle}
                    </h3>
                  </div>
                </div>

                {/* Benefit Highlight Box (DESIGN.md Parchment surface #f5f5f7) */}
                <div className="p-4 rounded-[14px] bg-[#f5f5f7] border border-[#e0e0e0] space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <span className="text-[11px] font-semibold uppercase text-[#7a7a7a] tracking-wider">
                      {t.subsidyBenefit}
                    </span>
                    <span className="text-[17px] font-semibold text-[#0066cc] tracking-tight">
                      {scheme.benefitAmount}
                    </span>
                  </div>
                  <p className="text-[14px] text-[#7a7a7a] leading-relaxed">
                    {localizedDesc}
                  </p>
                </div>

                {/* Eligibility Criteria */}
                <div className="space-y-1.5 text-[14px]">
                  <span className="font-semibold text-[#1d1d1f] flex items-center gap-1.5 text-[13px]">
                    <CheckSquare size={14} className="text-[#0066cc]" /> {t.eligibilityCriteria}
                  </span>
                  <ul className="space-y-1 text-[#7a7a7a] pl-4 list-disc text-[13px]">
                    {localizedEligibility.map((el, elIdx) => (
                      <li key={elIdx} className="leading-snug">{el}</li>
                    ))}
                  </ul>
                </div>

                {/* Required Documents */}
                <div className="space-y-1.5 text-[14px]">
                  <span className="font-semibold text-[#1d1d1f] flex items-center gap-1.5 text-[13px]">
                    <FileText size={14} className="text-[#0066cc]" /> {t.requiredDocuments}
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {scheme.documents.map((doc, docIdx) => (
                      <span key={docIdx} className="px-3 py-1 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[12px] font-medium text-[#7a7a7a]">
                        📄 {doc}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Action Bar (DESIGN.md button-primary pill) */}
              <div className="pt-4 border-t border-[#f0f0f0] flex items-center justify-between gap-3">
                <div className="text-[12px] text-[#7a7a7a] flex items-center gap-1">
                  <Clock size={13} /> {scheme.processingDays} {t.reviewDays}
                </div>

                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-[#0066cc] hover:bg-[#0071e3] active:scale-95 text-white text-[14px] font-medium tracking-tight shadow-sm transition-all flex items-center space-x-1.5 cursor-pointer no-underline apple-btn-active"
                >
                  <span>{t.applyOfficialPortal}</span>
                  <ExternalLink size={14} />
                </a>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
