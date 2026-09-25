import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Train, 
  Car, 
  Plane, 
  PhoneCall, 
  ShieldAlert, 
  Building, 
  Compass, 
  Layers,
  CheckCircle2
} from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../translations';

interface HospitalLocationMapProps {
  currentLang: LanguageCode;
  onEmergencyClick: () => void;
}

export const HospitalLocationMap: React.FC<HospitalLocationMapProps> = ({
  currentLang,
  onEmergencyClick,
}) => {
  const t = translations[currentLang];
  const googleMapsUrl = 'https://maps.app.goo.gl/fRQZcZ9MNXFPjhSp9';

  const [activeGate, setActiveGate] = useState<'gate1' | 'gate2' | 'gate3' | 'diagnostic'>('gate1');

  const gates = [
    {
      id: 'gate1',
      title: 'Gate 1 · Main OPD & Patient Entry',
      badge: 'Main Reception & Valet',
      description: 'Primary access for all Outpatient Department (OPD) consultations, admissions counter, multi-level visitor parking, and 24x7 Apollo Pharmacy.',
      timings: '07:00 AM – 09:00 PM',
      bestFor: 'General OPD, Doctor Visits, Daycare procedures',
    },
    {
      id: 'gate2',
      title: 'Gate 2 · 24/7 Emergency & Trauma Bay',
      badge: 'Ambulance & Critical Care',
      description: 'Immediate 24-hour access dedicated to acute stroke, chest pain (cardiac cath priority), pediatric emergency, and major trauma.',
      timings: 'Open 24 Hours / 365 Days',
      bestFor: 'Emergency 1066 arrivals, Urgent Acute Care',
    },
    {
      id: 'gate3',
      title: 'Gate 3 · Metro Skywalk Bridge',
      badge: 'Violet Line Connection',
      description: 'Direct pedestrian covered skywalk connecting directly from the concourse of Jasola Apollo Metro Station straight into the hospital campus.',
      timings: '06:00 AM – 11:00 PM',
      bestFor: 'Delhi Metro commuters, traffic-free access',
    },
    {
      id: 'diagnostic',
      title: 'Diagnostic Wing · Labs & Imaging',
      badge: '3T MRI, PET-CT & Blood Draw',
      description: 'Central collection center for blood tests, pathology, radiology, high-field MRI, 128-slice CT, and nuclear medicine scans.',
      timings: '24 Hours Open for Emergency Labs',
      bestFor: 'Pre-surgery tests, routine health checkups',
    },
  ];

  return (
    <section id="map" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 mb-1">
              <Compass className="w-4 h-4 text-teal-600" />
              <span>GEOLOCATION & CAMPUS NAVIGATION</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.map.title}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t.map.subtitle}
            </p>
          </div>

          {/* Primary External Map Button pointing to provided Google Maps link */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors shadow-sm shrink-0"
          >
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span>{t.map.openInGoogleMaps}</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Main Grid: Interactive Campus Schematic + Gate Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Visual Campus Schematic (Clean SVG/CSS architecture) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            
            {/* Campus Map Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-teal-400" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Indraprastha Campus Master Plan · 15 Acres
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-sm">
                GPS Verified
              </span>
            </div>

            {/* Interactive Schematic Diagram */}
            <div className="relative p-6 bg-gradient-to-b from-slate-100 to-slate-200">
              <div className="relative w-full h-80 bg-slate-900 rounded-xl border border-slate-700 p-4 text-white overflow-hidden shadow-inner flex flex-col justify-between">
                
                {/* Background Roads & Ground Lines */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 500 320" fill="none" stroke="currentColor">
                    {/* Delhi Mathura Road */}
                    <line x1="0" y1="280" x2="500" y2="280" strokeWidth="24" stroke="gray" />
                    <line x1="0" y1="280" x2="500" y2="280" strokeWidth="2" strokeDasharray="10 10" stroke="yellow" />
                    {/* Metro Track */}
                    <line x1="0" y1="30" x2="500" y2="30" strokeWidth="6" stroke="#8b5cf6" />
                  </svg>
                </div>

                {/* Delhi Metro Violet Line marker */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-purple-950/80 border border-purple-500/40 px-3 py-1 rounded-md text-xs text-purple-200">
                    <Train className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-semibold">Jasola Apollo Metro Station (Violet Line)</span>
                  </div>
                  <div className="text-[11px] text-purple-300 font-mono">
                    Direct Skywalk ➔ Gate 3
                  </div>
                </div>

                {/* Central Hospital Buildings Representation */}
                <div className="relative z-10 grid grid-cols-3 gap-3 my-auto">
                  
                  {/* Block A */}
                  <div 
                    onClick={() => setActiveGate('gate1')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      activeGate === 'gate1'
                        ? 'bg-teal-900/90 border-teal-400 ring-2 ring-teal-400/30'
                        : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-xs font-bold text-teal-300">BLOCK A</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Cardiology & OPD</div>
                    <div className="text-[10px] text-teal-400 mt-1">Gate 1 Entry</div>
                  </div>

                  {/* Emergency / Trauma Center */}
                  <div 
                    onClick={() => setActiveGate('gate2')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      activeGate === 'gate2'
                        ? 'bg-rose-950/90 border-rose-500 ring-2 ring-rose-500/30'
                        : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-xs font-bold text-rose-400 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
                      EMERGENCY
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">24x7 Trauma Bay</div>
                    <div className="text-[10px] text-rose-400 mt-1">Gate 2 Direct Access</div>
                  </div>

                  {/* Block B & C */}
                  <div 
                    onClick={() => setActiveGate('diagnostic')}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      activeGate === 'diagnostic'
                        ? 'bg-sky-900/90 border-sky-400 ring-2 ring-sky-400/30'
                        : 'bg-slate-800/80 border-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <div className="text-xs font-bold text-sky-300">BLOCK B & C</div>
                    <div className="text-[11px] text-slate-300 mt-0.5">Neuro & Cancer Center</div>
                    <div className="text-[10px] text-sky-400 mt-1">Diagnostic Labs</div>
                  </div>

                </div>

                {/* Delhi Mathura Road Footer Label */}
                <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-2">
                  <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    <Car className="w-3.5 h-3.5 text-amber-400" />
                    <span>Delhi Mathura Road (Sarita Vihar Flyover)</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Opposite Jasola Pocket</span>
                </div>

              </div>
            </div>

            {/* Interactive Campus Map Controls */}
            <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-slate-600">
                Click a gate or block on the map to view operational guidelines.
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1"
                >
                  <span>Open Coordinates in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Gate Cards & Transit Connectivity */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Gate Selector Tabs */}
            <div className="space-y-3">
              {gates.map((g) => {
                const isSelected = activeGate === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => setActiveGate(g.id as any)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-teal-600 ring-2 ring-teal-600/10 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">{g.title}</span>
                      <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-sm">
                        {g.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">
                      {g.description}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                      <span>Timings: <strong className="text-slate-700">{g.timings}</strong></span>
                      <span className="text-teal-700 font-medium">Click to highlight</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Travel Time & Connectivity Reference Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Transit & Airport Connectivity
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Train className="w-3.5 h-3.5 text-purple-600" />
                    <span>Jasola Apollo Metro Station</span>
                  </div>
                  <span className="font-mono font-semibold text-slate-900">0 km (Walk)</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Plane className="w-3.5 h-3.5 text-sky-600" />
                    <span>IGI International Airport (T3)</span>
                  </div>
                  <span className="font-mono font-semibold text-slate-900">21 km (~35m)</span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Train className="w-3.5 h-3.5 text-teal-600" />
                    <span>Hazrat Nizamuddin Railway Station</span>
                  </div>
                  <span className="font-mono font-semibold text-slate-900">8 km (~18m)</span>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2 text-slate-700">
                    <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                    <span>24x7 Apollo Ambulance Dispatch</span>
                  </div>
                  <button
                    onClick={onEmergencyClick}
                    className="font-mono font-bold text-rose-700 hover:underline cursor-pointer"
                  >
                    Dial 1066
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
