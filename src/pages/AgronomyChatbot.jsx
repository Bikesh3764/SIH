import React, { useState, useRef, useEffect } from 'react';
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
  CheckCircle
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
  }, [messages]);

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

  const handleStartVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech Recognition is not supported by your browser. Please type your query.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    const langVoiceMap = {
      hi: 'hi-IN',
      mr: 'mr-IN',
      pa: 'pa-IN',
      te: 'te-IN',
      en: 'en-US'
    };
    recognition.lang = langVoiceMap[currentLang] || 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputQuery(transcript);
      setIsListening(false);
      handleSendMessage(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const findBestAnswer = (query) => {
    const qLower = query.toLowerCase();

    if (qLower.includes('hi') || qLower.includes('hello') || qLower.includes('namaste')) {
      return chatConfig?.welcomeMessage || "Hello! How can I assist you with your crops, weather, or mandi prices today?";
    }

    if (chatConfig?.sampleQueries) {
      for (const sample of chatConfig.sampleQueries) {
        const words = sample.text.toLowerCase().split(' ').filter(w => w.length > 3);
        if (words.some((w) => qLower.includes(w))) {
          return sample.reply;
        }
      }
    }

    return chatConfig?.botDefaultReply || "Ensure regular inspection of leaf chlorophyll and soil moisture levels. Delay pesticide spraying when rain or strong winds are forecasted. For localized assistance, contact your District Agriculture Officer or Kisan Call Centre (Toll-Free: 1551).";
  };

  const handleSendMessage = (textToSend = null) => {
    const text = textToSend || inputQuery;
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Bot replies quietly WITHOUT auto-speaking (user must click Listen button to hear voice)
    setTimeout(() => {
      const botResponseText = findBestAnswer(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  const handleResetChat = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeakingId(null);
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: chatConfig?.welcomeMessage || "Hello! I am your Kisan Mitra Agronomy AI. Ask me anything about crop diseases, fertilizers, weather, irrigation, or market prices.",
        time: 'Just now'
      }
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-5 h-[calc(100vh-76px)] flex flex-col space-y-4 animate-apple-fade text-[#1d1d1f]">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-3 shrink-0 animate-apple-in">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">
            {t.chatTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#86868b] font-normal">
            {t.chatSubtitle}
          </p>
        </div>

        <button
          onClick={handleResetChat}
          className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-white hover:bg-[#f5f5f7] border border-[#d2d2d7] text-xs font-medium text-[#0071e3] transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          <RefreshCw size={13} />
          <span>{t.resetChat}</span>
        </button>
      </div>

      {/* Main Full-Height Chat Container */}
      <div className="flex-1 flex flex-col justify-between p-5 sm:p-7 rounded-[26px] bg-white border border-[#d2d2d7]/60 shadow-[0_2px_16px_rgba(0,0,0,0.04)] overflow-hidden space-y-4">
        
        {/* Messages Scrollable Thread */}
        <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 shadow-xs ${
                    isUser
                      ? 'bg-[#0071e3] text-white'
                      : 'bg-[#1d1d1f] text-white'
                  }`}
                >
                  {isUser ? <User size={15} /> : <Bot size={15} />}
                </div>

                {/* Message Bubble */}
                <div className={`space-y-1.5 max-w-[85%] sm:max-w-[75%] ${isUser ? 'items-end text-right' : 'items-start text-left'}`}>
                  <div
                    className={`px-4 py-3 rounded-[20px] text-[13.5px] leading-relaxed font-normal shadow-xs whitespace-pre-line ${
                      isUser
                        ? 'bg-[#0071e3] text-white rounded-tr-xs'
                        : 'bg-[#f5f5f7] text-[#1d1d1f] border border-[#d2d2d7]/50 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Audio Speaker & Timestamp */}
                  <div className={`flex items-center space-x-2.5 text-[11px] text-[#86868b] px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <span>{msg.time}</span>
                    {!isUser && (
                      <button
                        onClick={() => speakText(msg.text, msg.id)}
                        className={`px-2.5 py-0.5 rounded-full border text-[11px] font-medium flex items-center space-x-1 cursor-pointer transition-all ${
                          isSpeakingId === msg.id 
                            ? 'bg-rose-50 border-rose-200 text-rose-600 animate-pulse' 
                            : 'bg-white border-[#d2d2d7]/70 text-[#0071e3] hover:bg-[#f5f5f7]'
                        }`}
                        title="Listen Audio"
                      >
                        {isSpeakingId === msg.id ? <VolumeX size={12} /> : <Volume2 size={12} />}
                        <span>{isSpeakingId === msg.id ? t.stopAudio : t.listenAudio}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="pt-3 border-t border-[#f0f0f0] space-y-2 shrink-0">
          <span className="text-[11px] font-semibold text-[#86868b] block">
            Suggested Agronomy Prompts:
          </span>
          <div className="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="px-3.5 py-1.5 rounded-full bg-[#f5f5f7] hover:bg-[#e8e8ed] border border-[#d2d2d7]/70 text-xs font-medium text-[#1d1d1f] active:scale-95 transition-all cursor-pointer shadow-xs whitespace-normal text-left"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="pt-1 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder={isListening ? t.listening : t.chatPlaceholder}
                className="w-full pl-4 pr-12 py-3.5 rounded-full bg-[#f5f5f7] border border-[#d2d2d7]/70 text-xs sm:text-sm font-medium text-[#1d1d1f] focus:outline-none focus:ring-2 focus:ring-[#0071e3] focus:bg-white transition-all shadow-xs"
              />
              <button
                type="button"
                onClick={handleStartVoiceRecognition}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'text-[#0071e3] hover:bg-black/5'
                }`}
                title={t.speakVoice}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={!inputQuery.trim()}
              className="p-3.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white disabled:opacity-50 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <Send size={16} />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
}
