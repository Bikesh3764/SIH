import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import AppleLanguageDropdown from './components/AppleLanguageDropdown';
import LandingPage from './pages/LandingPage';
import SignInModal from './pages/SignInModal';
import FarmerDashboard from './pages/FarmerDashboard';
import CropDiseaseDetect from './pages/CropDiseaseDetect';
import AgronomyChatbot from './pages/AgronomyChatbot';
import MandiMarket from './pages/MandiMarket';
import WeatherAdvisory from './pages/WeatherAdvisory';
import GovtSchemes from './pages/GovtSchemes';
import FarmerProfile from './pages/FarmerProfile';
import { CURRENT_FARMER_PROFILE, LANGUAGES } from './data/mockAgriData';
import { TRANSLATIONS } from './data/translations';
import { 
  Menu, 
  X, 
  Globe, 
  LogOut 
} from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('landing'); // 'landing' | 'dashboard' | 'detect' | 'chat' | 'market' | 'weather' | 'schemes' | 'profile'
  const [currentLang, setLang] = useState('en');
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleOpenSignInWithRole = () => {
    setIsSignInOpen(true);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setActivePage('dashboard');
    showNotification(`Welcome, ${user.name}!`);
  };

  const handleUpdateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    showNotification('Profile updated successfully!');
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setActivePage('landing');
    showNotification('Signed out successfully.');
  };

  const isLanding = activePage === 'landing';

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] flex font-sans selection:bg-[#0071e3]/20 selection:text-[#0071e3]">
      
      {/* Apple Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4 animate-bounce">
          <div className="p-3.5 rounded-[18px] bg-[#1d1d1f]/95 text-white shadow-2xl backdrop-blur-xl border border-white/20 flex items-center justify-between gap-3">
            <div className="flex items-center space-x-2.5">
              <span className="text-base">🌾</span>
              <p className="text-xs font-medium text-white">{toastMessage}</p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-[#86868b] hover:text-white cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Persistent Apple Sidebar */}
      {!isLanding && (
        <Sidebar
          activePage={activePage}
          setActivePage={setActivePage}
          currentLang={currentLang}
          setLang={setLang}
          isOfflineMode={isOfflineMode}
          setIsOfflineMode={setIsOfflineMode}
          currentUser={currentUser}
          onSignOut={handleSignOut}
          isOpenMobile={isMobileNavOpen}
          setIsOpenMobile={setIsMobileNavOpen}
        />
      )}

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${!isLanding ? 'lg:pl-64' : 'w-full'}`}>
        
        {/* Apple Sub-Nav Frosted Header */}
        {!isLanding && (
          <header className="sticky top-0 z-30 h-[56px] px-4 sm:px-8 bg-[#f5f5f7]/80 backdrop-blur-xl border-b border-[#d2d2d7]/60 flex items-center justify-between shadow-xs">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-1.5 rounded-lg hover:bg-black/5 text-[#1d1d1f] cursor-pointer"
              >
                <Menu size={18} />
              </button>

              <div 
                onClick={() => setActivePage('landing')}
                className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
                title="Go to Homepage"
              >
                <span className="text-base">🌾</span>
                <span className="text-sm font-semibold text-[#1d1d1f] tracking-tight">{t.appName}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Apple Popover Language Dropdown */}
              <AppleLanguageDropdown currentLang={currentLang} setLang={setLang} variant="light" />

              {/* User Avatar & Logout */}
              <div className="flex items-center space-x-2 pl-2 border-l border-[#d2d2d7]">
                <div 
                  onClick={() => setActivePage('profile')}
                  className="w-7 h-7 rounded-full bg-[#0071e3] text-white flex items-center justify-center font-semibold text-xs cursor-pointer shadow-xs"
                  title="View Profile"
                >
                  {currentUser?.name?.charAt(0) || 'R'}
                </div>
                <button
                  onClick={handleSignOut}
                  className="p-1 rounded-lg hover:bg-rose-50 text-[#86868b] hover:text-rose-600 transition-colors cursor-pointer"
                  title={t.signOut}
                >
                  <LogOut size={15} />
                </button>
              </div>
            </div>
          </header>
        )}

        {/* Page Routing with Rich Apple Spring Transitions */}
        <main className="flex-1 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1] // Apple Spring Curve
              }}
              className="w-full"
            >
              {activePage === 'landing' && (
                <LandingPage
                  onOpenSignIn={handleOpenSignInWithRole}
                  currentLang={currentLang}
                  setLang={setLang}
                />
              )}

              {activePage === 'dashboard' && (
                <FarmerDashboard
                  onNavigate={(page) => setActivePage(page)}
                  currentLang={currentLang}
                  currentUser={currentUser}
                />
              )}

              {activePage === 'detect' && (
                <CropDiseaseDetect currentLang={currentLang} />
              )}

              {activePage === 'chat' && (
                <AgronomyChatbot currentLang={currentLang} />
              )}

              {activePage === 'market' && (
                <MandiMarket currentLang={currentLang} />
              )}

              {activePage === 'weather' && (
                <WeatherAdvisory currentLang={currentLang} />
              )}

              {activePage === 'schemes' && (
                <GovtSchemes 
                  currentLang={currentLang} 
                  onNavigate={(page) => setActivePage(page)} 
                />
              )}

              {activePage === 'profile' && (
                <FarmerProfile 
                  currentLang={currentLang} 
                  setLang={setLang}
                  currentUser={currentUser}
                  onUpdateUser={handleUpdateUser}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Apple Dense Footer (when not on landing) */}
        {!isLanding && (
          <footer className="py-6 px-4 sm:px-8 border-t border-[#d2d2d7]/60 text-[#86868b] text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 {t.appName} • Built with ❤️ by Vikesh Ray</p>
            <button onClick={() => setActivePage('landing')} className="text-[#0071e3] hover:underline font-medium cursor-pointer">
              {t.navHome}
            </button>
          </footer>
        )}
      </div>

      {/* Authentication Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        currentLang={currentLang}
        setLang={setLang}
      />

    </div>
  );
}
