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
  Check 
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
      text: chatConfig?.welcomeMessage || "Hello! I am your Kisan Mitra Agronomy AI assistant. Ask me anything about crop diseases, fertilizers, weather alerts, or market prices in your preferred language.",
      time: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

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
        } else if (qLower.includes('fertilizer') || qLower.includes('khad') || qLower.includes('dose') || qLower.includes('npk')) {
          botResponse = "Fertilizer Guidance: For vegetative growth, apply NPK (19:19:19) foliar spray @ 10g/L water. For top-dressing, apply Urea @ 45 kg/acre in split doses with adequate soil moisture.";
        } else if (qLower.includes('rust') || qLower.includes('disease') || qLower.includes('fungus') || qLower.includes('spray') || qLower.includes('pest')) {
          botResponse = "Crop Protection Advisory: For foliar fungal rust/blight, spray Propiconazole 25% EC @ 1ml/L or Organic Neem Oil (1500 ppm) @ 5ml/L. Spray during calm morning hours.";
        } else if (qLower.includes('mandi') || qLower.includes('price') || qLower.includes('rate') || qLower.includes('sell') || qLower.includes('market')) {
          botResponse = "Mandi Spot Outlook: Spot rates in APMC yards are trading above MSP floor. Best selling window is expected around mid-week due to steady miller procurement.";
        } else if (qLower.includes('weather') || qLower.includes('rain') || qLower.includes('monsoon')) {
          botResponse = "Weather & Spraying Notice: Rain is expected within 24-48 hours. Postpone foliar spraying of insecticides/fungicides to avoid rain wash-off.";
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-[#1d1d1f]">
      
      {/* 1. Header (DESIGN.md SF Pro Display + Clean Pill CTA) */}
      <motion.div 
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-semibold tracking-[-0.374px] text-[#1d1d1f]">
            {t.chatTitle}
          </h1>
          <p className="text-[15px] sm:text-[17px] text-[#7a7a7a] tracking-[-0.224px] mt-0.5">
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
          className="px-4 py-2 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] border border-[#e0e0e0] text-[#1d1d1f] text-[14px] font-medium transition-colors flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
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
        className="p-6 sm:p-8 rounded-[18px] bg-white border border-[#e0e0e0] shadow-sm flex flex-col justify-between h-[620px] sm:h-[660px]"
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
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar Icon */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white font-semibold shadow-xs ${
                      isUser
                        ? 'bg-[#0066cc]'
                        : 'bg-[#272729]'
                    }`}
                  >
                    {isUser ? <User size={16} /> : <Sparkles size={16} className="text-amber-300" />}
                  </div>

                  {/* Message Bubble (Apple iMessage Style) */}
                  <div className={`space-y-1.5 max-w-[85%] sm:max-w-[78%] ${isUser ? 'items-end text-right' : 'items-start text-left'}`}>
                    <div
                      className={`px-5 py-3.5 rounded-[18px] text-[15px] leading-[1.47] tracking-[-0.224px] shadow-xs whitespace-pre-line ${
                        isUser
                          ? 'bg-[#0066cc] text-white rounded-tr-[4px]'
                          : 'bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] rounded-tl-[4px]'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Controls & Timestamp */}
                    <div className={`flex items-center space-x-2 text-[12px] text-[#7a7a7a] px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
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
              className="flex items-center space-x-2 text-xs text-[#7a7a7a] pl-12"
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

        {/* Apple Full-Pill Search / Input Bar (DESIGN.md search-input) */}
        <div className="pt-3 border-t border-[#f0f0f0]">
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
                className="w-full pl-5 pr-14 py-3.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[15px] font-normal text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:bg-white transition-all shadow-xs"
              />
              
              {/* Voice Mic Button with Apple Glow Pulse */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleStartVoiceRecognition}
                className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-md'
                    : 'text-[#0066cc] hover:bg-black/5'
                }`}
                title={t.speakVoice}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </motion.button>
            </div>

            {/* Send Button (DESIGN.md button-primary) */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.92 }}
              type="submit"
              disabled={!inputQuery.trim()}
              className="w-12 h-12 rounded-full bg-[#0066cc] hover:bg-[#0071e3] text-white disabled:opacity-40 transition-colors shadow-sm flex items-center justify-center cursor-pointer shrink-0"
            >
              <Send size={18} />
            </motion.button>
          </form>
        </div>

      </motion.div>

    </div>
  );
}
