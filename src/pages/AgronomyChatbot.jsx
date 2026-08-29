import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  RefreshCw, 
  User, 
  Copy, 
  Check,
  Sparkle
} from 'lucide-react';
import { CHATBOT_CONTENT } from '../data/mockAgriData';
import { TRANSLATIONS } from '../data/translations';

export default function AgronomyChatbot({ currentLang }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const chatConfig = CHATBOT_CONTENT[currentLang] || CHATBOT_CONTENT.en;

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: chatConfig?.welcomeMessage || "Hello! I am your Kisan Mitra Agronomy AI assistant. Ask me anything about crop diseases, fertilizers, weather alerts, or live mandi prices.",
      time: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  // Quick Demo Auto-Questions
  const quickDemoQuestions = [
    { label: "🌾 Yellow rust on wheat, what to spray?", query: "Yellow rust on wheat leaves, what to spray?" },
    { label: "🌧️ Rain expected tomorrow, should I spray?", query: "Rain expected tomorrow, should I spray pesticides today?" },
    { label: "🧪 Fertilizer dose for Cotton?", query: "What is the recommended fertilizer dose for Cotton?" },
    { label: "📈 Cotton mandi sell recommendation?", query: "What is the selling recommendation for Cotton today?" },
    { label: "💧 Irrigation schedule for Soybean?", query: "How much irrigation is needed for Soybean crop?" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = (text, messageId) => {
    if ('speechSynthesis' in window) {
      if (isSpeakingId === messageId) {
        window.speechSynthesis.cancel();
        setIsSpeakingId(null);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      
      const langVoiceMap = {
        hi: 'hi-IN',
        mr: 'mr-IN',
        pa: 'pa-IN',
        te: 'te-IN',
        ta: 'ta-IN',
        ml: 'ml-IN',
        bn: 'bn-IN',
        en: 'en-US'
      };
      
      utterance.lang = langVoiceMap[currentLang] || 'en-US';
      utterance.rate = 0.95;

      utterance.onend = () => {
        setIsSpeakingId(null);
      };
      utterance.onerror = () => {
        setIsSpeakingId(null);
      };

      window.speechSynthesis.speak(utterance);
      setIsSpeakingId(messageId);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = "I have noted your agronomy query. Based on regional ICAR recommendations for your district, ensure balanced nutrient application and inspect lower crop foliage for early moisture stress.";

      const qLower = query.toLowerCase();

      if (chatConfig?.sampleQueries) {
        const found = chatConfig.sampleQueries.find(
          (sq) => sq.text.toLowerCase().includes(qLower) || qLower.includes(sq.text.toLowerCase())
        );
        if (found) {
          botResponse = found.answer;
        } else if (qLower.includes('rust') || qLower.includes('wheat') || qLower.includes('yellow')) {
          botResponse = "🌾 Wheat Yellow Rust Treatment:\nImmediately spray Propiconazole 25% EC (Tilt) @ 1ml per liter of water (200ml in 200L water per acre). Repeat after 12-15 days if stripe fungal spores persist. Spray during clear morning hours for best absorption.";
        } else if (qLower.includes('fertilizer') || qLower.includes('cotton') || qLower.includes('dose') || qLower.includes('khad')) {
          botResponse = "🧪 Cotton Fertilizer Recommendation:\nApply N:P:K @ 100:50:50 kg/ha. Top-dress Urea @ 45 kg/acre in 2 split doses at squaring and peak flowering stage. For rapid boll development, apply 19:19:19 foliar spray @ 10g/L.";
        } else if (qLower.includes('rain') || qLower.includes('spray') || qLower.includes('tomorrow')) {
          botResponse = "🌧️ Rain & Spraying Notice:\nDo NOT spray chemical pesticides or foliar nutrition today if rain is forecast within 24 hours. Rainfall will wash off the active chemicals. Resume spraying 24 hours after rain once crop foliage is completely dry.";
        } else if (qLower.includes('mandi') || qLower.includes('cotton') || qLower.includes('sell') || qLower.includes('price')) {
          botResponse = "📈 Cotton Mandi Outlook:\nCurrent APMC spot modal price is ₹7,120/quintal (MSP is ₹6,620). Market trend is bullish with steady mill demand. Advisory: Sell 50% stock at current high rates and retain the remaining for peak market clearing.";
        } else if (qLower.includes('irrigation') || qLower.includes('soybean') || qLower.includes('water')) {
          botResponse = "💧 Soybean Irrigation Advisory:\nCritical growth stages requiring moisture are Flowering (35-40 DAS) and Pod Filling (55-60 DAS). Maintain field capacity without water stagnation. Ensure furrow drainage is clear to prevent root rot.";
        }
      }

      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 550);
  };

  const handleStartVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    
    const langVoiceMap = {
      hi: 'hi-IN',
      mr: 'mr-IN',
      pa: 'pa-IN',
      te: 'te-IN',
      ta: 'ta-IN',
      ml: 'ml-IN',
      bn: 'bn-IN',
      en: 'en-IN'
    };

    recognition.lang = langVoiceMap[currentLang] || 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputQuery(transcript);
      setIsListening(false);
      setTimeout(() => {
        handleSendMessage(transcript);
      }, 250);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-4 sm:space-y-6 text-[#1d1d1f]">
      
      {/* 1. Header (DESIGN.md SF Pro Display + Clean Pill CTA) */}
      <motion.div 
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4"
      >
        <div>
          <h1 className="text-[24px] sm:text-[34px] font-semibold tracking-[-0.374px] text-[#1d1d1f]">
            {t.chatTitle}
          </h1>
          <p className="text-[13px] sm:text-[16px] text-[#7a7a7a] tracking-[-0.224px] mt-0.5">
            {t.chatSubtitle}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMessages([{
            id: 1,
            sender: 'bot',
            text: chatConfig?.welcomeMessage || "Hello! I am your Kisan Mitra Agronomy AI assistant. Ask me anything in your regional language.",
            time: 'Just now'
          }])}
          className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] border border-[#e0e0e0] text-[#1d1d1f] text-[13px] sm:text-[14px] font-medium transition-colors flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
        >
          <RefreshCw size={13} />
          <span>Reset Session</span>
        </motion.button>
      </motion.div>

      {/* 2. Main Apple Chat Canvas (DESIGN.md Store Utility Card #ffffff, 18px rounded) */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="p-4 sm:p-7 rounded-[18px] bg-white border border-[#e0e0e0] shadow-sm flex flex-col justify-between h-[72vh] sm:h-[640px]"
      >
        
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-start gap-2.5 sm:gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar Icon */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 text-white font-semibold shadow-xs ${
                      isUser
                        ? 'bg-[#0066cc]'
                        : 'bg-[#272729]'
                    }`}
                  >
                    {isUser ? <User size={15} /> : <Sparkles size={15} className="text-amber-300" />}
                  </div>

                  {/* Message Bubble (Apple iMessage Style) */}
                  <div className={`space-y-1.5 max-w-[88%] sm:max-w-[78%] ${isUser ? 'items-end text-right' : 'items-start text-left'}`}>
                    <div
                      className={`px-4 sm:px-5 py-3 sm:py-3.5 rounded-[18px] text-[14px] sm:text-[15px] leading-[1.47] tracking-[-0.224px] shadow-xs whitespace-pre-line ${
                        isUser
                          ? 'bg-[#0066cc] text-white rounded-tr-[4px]'
                          : 'bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] rounded-tl-[4px]'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Controls & Timestamp */}
                    <div className={`flex items-center space-x-2 text-[11px] sm:text-[12px] text-[#7a7a7a] px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <span>{msg.time}</span>
                      {!isUser && (
                        <>
                          <span>•</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => speakText(msg.text, msg.id)}
                            className={`px-2.5 py-0.5 rounded-full border text-[11px] font-medium flex items-center space-x-1 cursor-pointer transition-all ${
                              isSpeakingId === msg.id 
                                ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse' 
                                : 'bg-white border-[#e0e0e0] text-[#0066cc] hover:bg-[#f5f5f7]'
                            }`}
                            title="Listen Audio"
                          >
                            {isSpeakingId === msg.id ? <VolumeX size={12} /> : <Volume2 size={12} />}
                            <span>{isSpeakingId === msg.id ? t.stopAudio : t.listenAudio}</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="p-1 rounded-full text-[#7a7a7a] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] cursor-pointer"
                            title="Copy Text"
                          >
                            {copiedId === msg.id ? <Check size={12} className="text-[#30d158]" /> : <Copy size={12} />}
                          </motion.button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing Dot Loader */}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-xs text-[#7a7a7a] pl-10"
            >
              <div className="flex space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#0066cc] animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span>Thinking...</span>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Section: Quick Auto-Prompt Chips + Apple Full-Pill Input */}
        <div className="pt-3 border-t border-[#f0f0f0] space-y-2.5">
          
          {/* Quick Auto-Questions Chips Strip */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {quickDemoQuestions.map((q, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSendMessage(q.query)}
                className="shrink-0 px-3.5 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] border border-[#e0e0e0] text-[12px] sm:text-[13px] font-medium text-[#1d1d1f] transition-all cursor-pointer shadow-2xs whitespace-nowrap"
              >
                {q.label}
              </motion.button>
            ))}
          </div>

          {/* Apple Full-Pill Search / Input Bar (DESIGN.md search-input) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="relative flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={isListening ? t.listening : t.chatPlaceholder}
                className="w-full pl-4 sm:pl-5 pr-12 sm:pr-14 py-3 sm:py-3.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[14px] sm:text-[15px] font-normal text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:bg-white transition-all shadow-xs"
              />
              
              {/* Voice Mic Button with Apple Glow Pulse */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleStartVoiceRecognition}
                className={`absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-md'
                    : 'text-[#0066cc] hover:bg-black/5'
                }`}
                title={t.speakVoice}
              >
                {isListening ? <MicOff size={17} /> : <Mic size={17} />}
              </motion.button>
            </div>

            {/* Send Button (DESIGN.md button-primary) */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              type="submit"
              disabled={!inputQuery.trim()}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white disabled:opacity-40 transition-colors shadow-sm flex items-center justify-center cursor-pointer shrink-0"
            >
              <Send size={17} />
            </motion.button>
          </form>
        </div>

      </motion.div>

    </div>
  );
}
