import React, { useState } from 'react';
import { 
  PhoneCall, 
  Globe, 
  ShieldCheck, 
  Menu, 
  X, 
  Calendar, 
  UserCheck, 
  Clock, 
  MapPin, 
  MessageSquare,
  Activity
} from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onEmergencyClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  activeSection,
  onNavigate,
  onEmergencyClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = translations[currentLang];

  const languageLabels: Record<LanguageCode, { label: string; native: string }> = {
    en: { label: 'English', native: 'English' },
    hi: { label: 'Hindi', native: 'हिन्दी' },
    bn: { label: 'Bengali', native: 'বাংলা' },
    ta: { label: 'Tamil', native: 'தமிழ்' },
    te: { label: 'Telugu', native: 'తెలుగు' },
    ar: { label: 'Arabic', native: 'العربية' },
  };

  const navItems = [
    { id: 'availability', label: t.nav.liveAvailability, icon: Clock },
    { id: 'booking', label: t.nav.bookAppointment, icon: Calendar },
    { id: 'portal', label: t.nav.patientPortal, icon: UserCheck },
    { id: 'medications', label: t.nav.medications, icon: Activity },
    { id: 'chat', label: t.nav.consultChat, icon: MessageSquare },
    { id: 'map', label: t.nav.hospitalMap, icon: MapPin },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      {/* Strict 3-Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element Brand Wordmark */}
        <a 
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('hero');
          }}
          className="flex items-center gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-sm shadow-teal-500/20 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v16m-8-8h16" />
              <circle cx="12" cy="12" r="9" className="stroke-teal-200/50 stroke-1" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-slate-900 leading-none">
              Apollo Hospitals
            </span>
            <span className="text-[11px] font-medium text-teal-800 tracking-wide mt-1">
              Indraprastha · New Delhi
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 clean text navigation links (single line, single elevation) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative py-1.5 transition-colors hover:text-teal-700 whitespace-nowrap cursor-pointer ${
                activeSection === item.id 
                  ? 'text-teal-700 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-600 after:rounded-full' 
                  : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: 1-2 Primary Actions + Language Picker */}
        <div className="flex items-center gap-3">
          {/* Multi-language selector dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Change Language"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-teal-700" />
              <span className="font-semibold uppercase tracking-wider">{currentLang}</span>
            </button>

            {langDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setLangDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                    Select Language
                  </div>
                  {(Object.keys(languageLabels) as LanguageCode[]).map((code) => (
                    <button
                      key={code}
                      onClick={() => {
                        onLanguageChange(code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-teal-50 transition-colors cursor-pointer ${
                        currentLang === code ? 'text-teal-700 font-semibold bg-teal-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{languageLabels[code].native}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{languageLabels[code].label}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* 24x7 Emergency Hotline Trigger */}
          <button
            onClick={onEmergencyClick}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer whitespace-nowrap group animate-radar-ping"
            title="Immediate Apollo 24/7 Emergency Response"
          >
            <PhoneCall className="w-3.5 h-3.5 text-rose-600 group-hover:scale-110 transition-transform" />
            <span>1066 Emergency</span>
          </button>

          {/* Primary Book CTA */}
          <button
            onClick={() => onNavigate('booking')}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 active:bg-teal-900 transition-colors cursor-pointer whitespace-nowrap shadow-sm shadow-teal-700/20"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.hero.quickBookCTA}</span>
            <span className="sm:hidden">Book</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors cursor-pointer ${
                  activeSection === item.id 
                    ? 'bg-teal-50 text-teal-800 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4 text-teal-600" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                onEmergencyClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 rounded-lg cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
              <span>Apollo Emergency Hotline 1066</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
