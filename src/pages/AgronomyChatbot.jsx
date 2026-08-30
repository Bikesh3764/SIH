import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  User, 
  Copy, 
  Check,
  Bot,
  ArrowUpRight
} from 'lucide-react';
import { CHATBOT_CONTENT } from '../data/mockAgriData';
import { TRANSLATIONS } from '../data/translations';
import { askAgronomyChatbot } from '../services/geminiService';

export default function AgronomyChatbot({ currentLang, currentUser }) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
  const activeLangConfig = CHATBOT_CONTENT[currentLang] || CHATBOT_CONTENT.en;

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: activeLangConfig.welcomeMessage,
      time: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messagesEndRef = useRef(null);

  // Instantly update initial welcome message when language changes
  useEffect(() => {
    const freshConfig = CHATBOT_CONTENT[currentLang] || CHATBOT_CONTENT.en;
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [{
          id: Date.now(),
          sender: 'bot',
          text: freshConfig.welcomeMessage,
          time: 'Just now'
        }];
      }
      return prev;
    });
  }, [currentLang]);

  // Quick Demo Auto-Questions for the Active Language
  const sampleQueries = activeLangConfig.sampleQueries || CHATBOT_CONTENT.en.sampleQueries;

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
        or: 'or-IN',
        mr: 'mr-IN',
        pa: 'pa-IN',
        ml: 'ml-IN',
        en: 'en-US'
      };
      
      utterance.lang = langVoiceMap[currentLang] || 'en-US';
      utterance.rate = 0.92;

      utterance.onend = () => setIsSpeakingId(null);
      utterance.onerror = () => setIsSpeakingId(null);

      window.speechSynthesis.speak(utterance);
      setIsSpeakingId(messageId);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    if (!textToSend) setInputQuery('');
    setIsTyping(true);

    try {
      const farmerDistrict = currentUser?.district || currentUser?.taluk || 'Sundargarh (Rourkela)';
      const farmerCrops = currentUser?.crops || 'Paddy, Mustard, Tomato';

      const botReply = await askAgronomyChatbot({
        prompt: query,
        history: newHistory,
        language: currentLang,
        district: farmerDistrict,
        crops: farmerCrops
      });

      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.warn('Gemini Chat error, using fallback:', err.message);
      const activeContent = CHATBOT_CONTENT[currentLang] || CHATBOT_CONTENT.en;
      const fallbackReply = activeContent.sampleQueries?.[0]?.reply || activeContent.botDefaultReply;

      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: fallbackReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }
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
      ml: 'ml-IN',
      or: 'or-IN',
      en: 'en-IN'
    };

    recognition.lang = langVoiceMap[currentLang] || 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputQuery(transcript);
      setIsListening(false);
      setTimeout(() => handleSendMessage(transcript), 250);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 text-[#1d1d1f] overflow-x-hidden min-w-0">
      
      {/* 1. Clean Apple SF-Pro Header */}
      <motion.div 
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div className="space-y-0.5">
          <h1 className="text-2xl sm:text-[32px] font-bold tracking-tight text-[#1d1d1f] leading-tight">
            {t.chatTitle || 'Kisan Voice & Text AI'}
          </h1>
          <p className="text-xs sm:text-[14px] text-[#86868b] font-normal leading-relaxed">
            {t.chatSubtitle || 'Ask any question about crops, pests, weather or mandi prices in your own language.'}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMessages([{
            id: Date.now(),
            sender: 'bot',
            text: (CHATBOT_CONTENT[currentLang] || CHATBOT_CONTENT.en).welcomeMessage,
            time: 'Just now'
          }])}
          className="px-4 py-2 rounded-full bg-white hover:bg-[#f5f5f7] border border-[#d2d2d7]/70 text-[#1d1d1f] text-xs font-semibold transition-all flex items-center space-x-1.5 self-start sm:self-auto cursor-pointer shadow-xs active:scale-95"
        >
          <RotateCcw size={13} />
          <span>{t.newSession || 'Reset Chat'}</span>
        </motion.button>
      </motion.div>

      {/* 2. Main Apple Glass Chat Canvas */}
      <motion.div 
        initial={{ opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="p-4 sm:p-6 rounded-[28px] bg-white border border-[#d2d2d7]/70 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[72vh] sm:h-[640px]"
      >
        
        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 sm:pr-2">
          
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-start gap-2.5 sm:gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar Icon */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 text-white font-semibold shadow-xs ${
                      isUser
                        ? 'bg-[#0071e3]'
                        : 'bg-[#1d1d1f]'
                    }`}
                  >
                    {isUser ? <User size={15} /> : <Bot size={16} className="text-white" />}
                  </div>

                  {/* Message Bubble (Apple SF-Pro Typography) */}
                  <div className={`space-y-1.5 max-w-[88%] sm:max-w-[78%] ${isUser ? 'items-end text-right' : 'items-start text-left'}`}>
                    <div
                      className={`px-4 sm:px-5 py-3 sm:py-3.5 rounded-[20px] text-[14px] sm:text-[14.5px] leading-[1.5] tracking-tight whitespace-pre-line ${
                        isUser
                          ? 'bg-[#0071e3] text-white rounded-tr-[4px] shadow-xs font-normal'
                          : 'bg-[#f5f5f7] text-[#1d1d1f] border border-[#e5e5ea] rounded-tl-[4px] shadow-2xs font-normal'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Controls & Timestamp */}
                    <div className={`flex items-center space-x-2 text-[11px] text-[#86868b] px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                      <span>{msg.time}</span>
                      {!isUser && (
                        <>
                          <span>•</span>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => speakText(msg.text, msg.id)}
                            className={`px-2.5 py-0.5 rounded-full border text-[10.5px] font-semibold flex items-center space-x-1 cursor-pointer transition-all ${
                              isSpeakingId === msg.id 
                                ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse' 
                                : 'bg-white border-[#d2d2d7]/70 text-[#0071e3] hover:bg-[#f5f5f7]'
                            }`}
                            title="Listen Audio"
                          >
                            {isSpeakingId === msg.id ? <VolumeX size={12} /> : <Volume2 size={12} />}
                            <span>{isSpeakingId === msg.id ? (t.stopAudio || 'Stop') : (t.listenAudio || 'Listen')}</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="p-1 rounded-full text-[#86868b] hover:text-[#1d1d1f] hover:bg-[#f5f5f7] cursor-pointer"
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

          {/* Welcome Suggestion Bento Cards (In Active Regional Language) */}
          {messages.length === 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="pt-3 space-y-2.5"
            >
              <span className="text-[11px] font-bold text-[#86868b] uppercase tracking-wider block px-1">
                {t.suggestedQuestions || 'Suggested Questions'}:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sampleQueries.map((sq, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ y: -2, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSendMessage(sq.text)}
                    className="p-3.5 rounded-[18px] bg-[#f5f5f7] hover:bg-[#ebebee] border border-[#d2d2d7]/60 text-left transition-all cursor-pointer shadow-2xs group flex items-center justify-between"
                  >
                    <span className="text-[13px] font-medium text-[#1d1d1f] leading-snug group-hover:text-[#0071e3] transition-colors pr-2">
                      {sq.text}
                    </span>
                    <ArrowUpRight size={15} className="text-[#86868b] group-hover:text-[#0071e3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-2 text-xs text-[#86868b] pl-10"
            >
              <div className="flex space-x-1">
                <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 rounded-full bg-[#0071e3] animate-bounce [animation-delay:0.4s]"></span>
              </div>
              <span className="font-medium text-[11px]">{t.aiThinking || 'AI Agronomist is thinking...'}</span>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Input Area */}
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
                placeholder={isListening ? (t.listening || 'Listening to your voice...') : (t.chatPlaceholder || 'Ask anything about crops, pests, weather or mandi prices...')}
                className="w-full pl-4 sm:pl-5 pr-12 sm:pr-14 py-3 sm:py-3.5 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/70 text-[14px] font-normal text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:bg-white transition-all shadow-2xs placeholder:text-[#86868b]"
              />
              
              {/* Mic Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleStartVoiceRecognition}
                className={`absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse shadow-md'
                    : 'text-[#0071e3] hover:bg-black/5'
                }`}
                title={t.speakVoice || 'Speak'}
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
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white disabled:opacity-40 transition-all shadow-md shadow-blue-500/20 flex items-center justify-center cursor-pointer shrink-0"
            >
              <Send size={17} />
            </motion.button>
          </form>
        </div>

      </motion.div>

    </div>
  );
}
