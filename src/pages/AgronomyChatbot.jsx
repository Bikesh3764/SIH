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
  Bot, 
  User, 
  AlertCircle,
  HelpCircle,
  CheckCircle,
  CornerDownLeft
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
      text: chatConfig?.welcomeMessage || "Hello! I am your Kisan Mitra Agronomy AI. Ask me anything about crop diseases, fertilizers, weather, irrigation, or market prices in your preferred language.",
      time: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Suggested Prompts
  const suggestedPrompts = chatConfig?.sampleQueries?.map((s) => s.text) || [
    "How to identify rice blast disease?",
    "Best time to plant wheat crops?",
    "Organic pest control methods for cotton",
    "Monsoon farming & fertilizer guidance"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Clean up speech synthesis on component unmount
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

    // AI Semantic Match Engine
    setTimeout(() => {
      let botResponse = "I have noted your agricultural question. Based on current ICAR guidelines and regional agronomy models for your district, ensure proper soil drainage and maintain scheduled nutrient feeding.";

      const qLower = query.toLowerCase();

      if (chatConfig?.sampleQueries) {
        const found = chatConfig.sampleQueries.find(
          (sq) => sq.text.toLowerCase().includes(qLower) || qLower.includes(sq.text.toLowerCase())
        );
        if (found) {
          botResponse = found.answer;
        } else if (qLower.includes('fertilizer') || qLower.includes('khad') || qLower.includes('dose')) {
          botResponse = "For optimal vegetative stage: Apply NPK in split doses. Apply Urea @ 45 kg/acre after first weeding. Ensure soil has adequate moisture before broadcasting fertilizer.";
        } else if (qLower.includes('disease') || qLower.includes('fungus') || qLower.includes('spray') || qLower.includes('rust') || qLower.includes('pest')) {
          botResponse = "Fungal infection risk detected: Spray Neem Oil (5ml/L) or Tricyclazole 75% WP (0.6g/L water) in clear weather. Avoid spraying if rain is expected in 24 hours.";
        } else if (qLower.includes('mandi') || qLower.includes('price') || qLower.includes('rate') || qLower.includes('sell') || qLower.includes('market')) {
          botResponse = "Current Mandi Spot Outlook: APMC modal prices are currently trading above MSP. Best selling window is expected around mid-week due to steady mill procurement demand.";
        } else if (qLower.includes('weather') || qLower.includes('rain') || qLower.includes('water') || qLower.includes('monsoon')) {
          botResponse = "Weather Advisory: Moderate rainfall expected in next 24-48 hours. Postpone chemical foliar spraying and clear drainage furrows to avoid root waterlogging.";
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
    }, 600);
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
      }, 300);
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-[#1d1d1f]">
      
      {/* 1. Header (DESIGN.md SF Pro Display + Action Blue Pill) */}
      <motion.div 
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#0066cc]">
              Apple Intelligence Agronomy Engine
            </span>
            <span className="text-[12px] text-[#7a7a7a]">•</span>
            <span className="text-[12px] text-[#7a7a7a]">8 Regional Languages</span>
          </div>
          <h1 className="text-[26px] sm:text-[32px] font-semibold tracking-[-0.28px] text-[#1d1d1f] mt-0.5">
            {t.chatTitle}
          </h1>
          <p className="text-[14px] text-[#7a7a7a] leading-relaxed">
            {t.chatSubtitle}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMessages([{
            id: 1,
            sender: 'bot',
            text: chatConfig?.welcomeMessage || "Hello! I am your Kisan Mitra Agronomy AI. Ask me anything in your regional language.",
            time: 'Just now'
          }])}
          className="px-4 py-2 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] border border-[#e0e0e0] text-[#1d1d1f] text-[13px] font-medium transition-colors flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
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
        className="p-5 sm:p-7 rounded-[18px] bg-white border border-[#e0e0e0] shadow-sm flex flex-col justify-between h-[68vh] sm:h-[72vh]"
      >
        
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2">
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 16, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar Icon */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white font-bold shadow-xs ${
                      isUser
                        ? 'bg-[#0066cc]'
                        : 'bg-[#272729]'
                    }`}
                  >
                    {isUser ? <User size={16} /> : <Sparkles size={16} className="text-amber-300" />}
                  </div>

                  {/* Message Bubble (Apple iMessage / Siri Style) */}
                  <div className={`space-y-1.5 max-w-[85%] sm:max-w-[75%] ${isUser ? 'items-end text-right' : 'items-start text-left'}`}>
                    <div
                      className={`px-4 sm:px-5 py-3 rounded-[18px] text-[14px] leading-[1.47] tracking-[-0.224px] shadow-xs whitespace-pre-line ${
                        isUser
                          ? 'bg-[#0066cc] text-white rounded-tr-[4px]'
                          : 'bg-[#f5f5f7] text-[#1d1d1f] border border-[#e0e0e0] rounded-tl-[4px]'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Audio Speaker & Timestamp */}
                    <div className={`flex items-center space-x-2 text-[12px] text-[#7a7a7a] px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <span>{msg.time}</span>
                      {!isUser && (
                        <motion.button
                          whileHover={{ scale: 1.06 }}
                          whileTap={{ scale: 0.94 }}
                          onClick={() => speakText(msg.text, msg.id)}
                          className={`px-3 py-1 rounded-full border text-[12px] font-medium flex items-center space-x-1 cursor-pointer transition-all ${
                            isSpeakingId === msg.id 
                              ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse' 
                              : 'bg-white border-[#e0e0e0] text-[#0066cc] hover:bg-[#f5f5f7]'
                          }`}
                          title="Listen Audio"
                        >
                          {isSpeakingId === msg.id ? <VolumeX size={13} /> : <Volume2 size={13} />}
                          <span>{isSpeakingId === msg.id ? t.stopAudio : t.listenAudio}</span>
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Typing Indicator */}
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
              <span>Kisan Mitra is researching ICAR agronomy recommendations...</span>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts (DESIGN.md Pill Chips) */}
        <div className="pt-3 border-t border-[#f0f0f0] space-y-2 shrink-0">
          <span className="text-[12px] font-semibold text-[#7a7a7a] block uppercase tracking-[0.04em]">
            Suggested Agronomy Prompts:
          </span>
          <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
            {suggestedPrompts.map((p, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSendMessage(p)}
                className="px-3.5 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#e0e0e0] border border-[#e0e0e0] text-[13px] font-normal text-[#1d1d1f] transition-colors cursor-pointer shadow-xs whitespace-normal text-left"
              >
                {p}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Apple Full-Pill Siri Input Bar */}
        <div className="pt-3 shrink-0">
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
                className="w-full pl-5 pr-14 py-3.5 rounded-full bg-[#f5f5f7] border border-[#e0e0e0] text-[14px] font-normal text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:bg-white transition-all shadow-xs"
              />
              
              {/* Voice Mic Button with Apple Pulse Effect */}
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

            {/* Send Button */}
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
