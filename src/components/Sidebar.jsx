import React from 'react';
import { 
  Home, 
  LayoutDashboard, 
  Scan, 
  MessageSquareText, 
  TrendingUp, 
  CloudSun, 
  User, 
  LogOut, 
  Globe, 
  Wifi, 
  WifiOff, 
  Building2,
  X
} from 'lucide-react';
import { LANGUAGES } from '../data/mockAgriData';
import { TRANSLATIONS } from '../data/translations';
import AppleLanguageDropdown from './AppleLanguageDropdown';

export default function Sidebar({
  activePage,
  setActivePage,
  currentLang,
  setLang,
  isOfflineMode,
  setIsOfflineMode,
  currentUser,
  onSignOut,
  isOpenMobile,
  setIsOpenMobile
}) {
  const t = TRANSLATIONS[currentLang] || TRANSLATIONS.en;

  const navItems = [
    { id: 'dashboard', label: t.navDashboard, icon: LayoutDashboard },
    { id: 'detect', label: t.navDetect, icon: Scan, badge: 'AI' },
    { id: 'chat', label: t.navChat, icon: MessageSquareText, badge: 'VOICE' },
    { id: 'market', label: t.navMarket, icon: TrendingUp, badge: 'LIVE' },
    { id: 'weather', label: t.navWeather, icon: CloudSun },
    { id: 'schemes', label: t.navSchemes, icon: Building2, badge: 'NEW' },
    { id: 'profile', label: t.navProfile, icon: User }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    if (setIsOpenMobile) setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={() => setIsOpenMobile(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Apple Styled Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-[#f5f5f7]/85 backdrop-blur-2xl border-r border-white/70 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Branding Strip (Click to go Home) */}
        <div className="p-5 border-b border-[#d2d2d7]/60">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => handleNavClick('landing')}
              className="flex items-center space-x-2.5 cursor-pointer hover:opacity-80 transition-opacity"
              title="Go to Homepage"
            >
              <div className="w-8 h-8 rounded-full bg-[#1d1d1f] flex items-center justify-center text-white text-base shadow-sm">
                🌾
              </div>
              <h1 className="text-[15px] font-semibold text-[#1d1d1f] tracking-tight">
                {t.appName}
              </h1>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsOpenMobile(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-black/5 text-[#86868b] hover:text-[#1d1d1f]"
            >
              <X size={16} />
            </button>
          </div>

          {/* Active User Capsule */}
          {currentUser && (
            <div 
              onClick={() => handleNavClick('profile')}
              className="mt-4 p-2.5 rounded-[14px] liquid-glass flex items-center space-x-2.5 cursor-pointer hover:bg-[#fafafc] transition-colors"
            >
              <div className="w-7 h-7 rounded-full liquid-pill-btn text-white flex items-center justify-center font-semibold text-xs shrink-0 shadow-xs">
                {currentUser.name?.charAt(0) || 'U'}
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-semibold text-[#1d1d1f] truncate block">
                  {currentUser.name}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Apple Style Nav Items */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-[12px] text-[13px] font-medium transition-all active:scale-[0.97] cursor-pointer ${
                  isActive
                    ? 'liquid-pill-btn text-white shadow-xs font-semibold'
                    : 'text-[#1d1d1f] hover:bg-black/5'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon size={16} className={isActive ? 'text-white' : 'text-[#6e6e73]'} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'LIVE'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.badge === 'NEW'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-black/5 text-[#6e6e73]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Utility Bar (100% Mobile Accessible) */}
        <div className="p-3.5 border-t border-[#d2d2d7]/60 space-y-2 bg-[#f5f5f7]/95">
          


          {/* Low-Bandwidth Mode */}
          <div className="flex items-center justify-between px-2 py-1 text-xs">
            <span className="text-[11px] font-medium text-[#6e6e73] flex items-center gap-1.5">
              {isOfflineMode ? <WifiOff size={13} className="text-amber-600" /> : <Wifi size={13} className="text-emerald-600" />}
              {isOfflineMode ? t.lowBandwidth : t.highSpeed}
            </span>
            <button
              onClick={() => setIsOfflineMode(!isOfflineMode)}
              className={`w-7 h-3.5 rounded-full transition-colors relative cursor-pointer ${
                isOfflineMode ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  isOfflineMode ? 'translate-x-3.5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {/* Sign Out Button */}
          {currentUser && (
            <button
              onClick={onSignOut}
              className="w-full py-1.5 rounded-[10px] text-[#86868b] hover:text-rose-600 hover:bg-rose-50 text-xs font-medium flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
            >
              <LogOut size={13} />
              <span>{t.signOut}</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
