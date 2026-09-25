import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Activity, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../translations';

interface HeroSectionProps {
  currentLang: LanguageCode;
  onNavigate: (section: string) => void;
  onSelectSpecialty: (specialty: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  onNavigate,
  onSelectSpecialty,
}) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');

  const featuredSpecialties = [
    'Cardiology', 
    'Neurology', 
    'Orthopedics', 
    'Oncology', 
    'Pediatrics', 
    'Pulmonology'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSelectSpecialty(searchQuery.trim());
      onNavigate('availability');
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-teal-50/20 to-white pt-10 pb-16 border-b border-slate-200">
      {/* Background soft geometric architectural grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: 'radial-gradient(#0d9488 0.75px, transparent 0.75px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Value Proposition & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Accreditation trust kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800">
              <span className="flex items-center gap-1.5 bg-white border border-teal-200 px-3 py-1 rounded-full shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                <span>{t.hero.badge}</span>
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600 font-normal">Delhi Mathura Road, New Delhi</span>
            </div>

            {/* Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 text-balance leading-tight">
              {t.hero.headline}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600">
                {t.hero.highlight}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {t.hero.subheadline}
            </p>

            {/* Instant Specialty / Doctor Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
              <div className="relative flex items-center bg-white rounded-xl border border-slate-300 shadow-sm focus-within:border-teal-600 focus-within:ring-2 focus-within:ring-teal-600/20 transition-all p-1.5">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.hero.searchPlaceholder}
                  className="w-full px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden bg-transparent"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 shadow-sm"
                >
                  Search
                </button>
              </div>

              {/* Quick specialty filters */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3 text-xs text-slate-500">
                <span className="font-medium text-slate-700">Quick Access:</span>
                {featuredSpecialties.map((spec) => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => {
                      onSelectSpecialty(spec);
                      onNavigate('availability');
                    }}
                    className="hover:text-teal-700 hover:underline px-1 py-0.5 cursor-pointer font-medium"
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </form>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('booking')}
                className="px-6 py-3 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-all shadow-md shadow-teal-700/20 cursor-pointer flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.hero.quickBookCTA}</span>
              </button>
              <button
                onClick={() => onNavigate('availability')}
                className="px-5 py-3 text-sm font-semibold text-slate-800 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
              >
                <Clock className="w-4 h-4 text-teal-600" />
                <span>{t.hero.viewLiveQueueCTA}</span>
              </button>
              <button
                onClick={() => onNavigate('portal')}
                className="px-4 py-3 text-sm font-medium text-teal-800 hover:text-teal-900 hover:bg-teal-50/80 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>{t.hero.openPortalCTA}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Hospital Architecture Card & Real-Time OPD Radar */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              
              {/* Card Header: Hospital Campus Status */}
              <div className="p-5 bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold tracking-wider uppercase text-emerald-300 font-mono">
                      Live Hospital Operations
                    </span>
                  </div>
                  <span className="text-xs text-slate-300 font-mono">
                    25 Sep 2026
                  </span>
                </div>
                <div className="mt-3">
                  <h2 className="text-lg font-bold text-white">Indraprastha Apollo Hospital</h2>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-teal-400" />
                    Opp. Jasola Apollo Metro Station, Delhi
                  </p>
                </div>
              </div>

              {/* Graphical architectural representation */}
              <div className="p-6 bg-slate-50 border-b border-slate-100">
                <div className="relative h-44 rounded-xl bg-gradient-to-br from-teal-900 via-slate-800 to-teal-950 p-4 text-white overflow-hidden flex flex-col justify-between">
                  {/* Visual hospital blueprint motif */}
                  <div className="absolute inset-0 opacity-15">
                    <svg className="w-full h-full" viewBox="0 0 400 200" fill="none" stroke="currentColor">
                      <line x1="20" y1="180" x2="380" y2="180" strokeWidth="2" />
                      <rect x="50" y="60" width="80" height="120" strokeWidth="1.5" />
                      <rect x="150" y="30" width="100" height="150" strokeWidth="1.5" />
                      <rect x="270" y="70" width="80" height="110" strokeWidth="1.5" />
                      <circle cx="200" cy="50" r="12" strokeWidth="1.5" />
                    </svg>
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[11px] font-mono font-medium bg-teal-500/20 text-teal-200 border border-teal-500/30 px-2 py-0.5 rounded-sm">
                      OPD BLOCKS A, B & C
                    </span>
                    <span className="text-[11px] font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Tokens Issuing
                    </span>
                  </div>

                  <div className="relative z-10 space-y-1">
                    <div className="text-2xl font-bold font-mono tracking-tight text-white tabular-nums">
                      Token #14 <span className="text-xs font-normal text-slate-300 font-sans">Serving Now in Cardiology</span>
                    </div>
                    <div className="text-xs text-slate-300 flex items-center gap-3">
                      <span>Avg. Wait: <strong className="text-white font-mono">12 mins</strong></span>
                      <span>·</span>
                      <span>Trauma Center: <strong className="text-emerald-300">Open 24/7</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Clean Metric Cells with Tabular Numerals */}
              <div className="grid grid-cols-2 divide-x divide-y divide-slate-100 bg-white">
                <div className="p-4">
                  <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                    {t.hero.stat1Value}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {t.hero.stat1Label}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                    {t.hero.stat2Value}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {t.hero.stat2Label}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                    {t.hero.stat3Value}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {t.hero.stat3Label}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-emerald-600 font-mono tabular-nums">
                    {t.hero.stat4Value}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {t.hero.stat4Label}
                  </div>
                </div>
              </div>

              {/* Card Footer Quick Link */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600">Need immediate help finding a doctor?</span>
                <button
                  onClick={() => onNavigate('availability')}
                  className="font-semibold text-teal-700 hover:text-teal-800 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>View All 8 On-Duty Doctors</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
