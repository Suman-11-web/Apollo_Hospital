import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  PhoneCall, 
  Mail, 
  Clock, 
  ExternalLink,
  Heart
} from 'lucide-react';
import { LanguageCode } from '../types';
import { translations } from '../translations';

interface FooterProps {
  currentLang: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onNavigate: (section: string) => void;
  onEmergencyClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onNavigate,
  onEmergencyClick,
}) => {
  const t = translations[currentLang];
  const googleMapsUrl = 'https://maps.app.goo.gl/fRQZcZ9MNXFPjhSp9';

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Banner: Emergency & Accreditation */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">
                Indraprastha Apollo Hospitals, New Delhi
              </div>
              <div className="text-slate-400 text-xs">
                First hospital in India accredited by Joint Commission International (JCI) USA since 2005 · NABH Accredited
              </div>
            </div>
          </div>

          <button
            onClick={onEmergencyClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors cursor-pointer shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Emergency 24x7 Hotline: 1066</span>
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Hospital Campus */}
          <div className="space-y-3">
            <div className="text-white font-bold text-base tracking-tight flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs">
                +
              </div>
              <span>Apollo Hospitals</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Indraprastha Apollo Hospitals is a 710+ bed multi-specialty tertiary acute care hospital, providing clinical excellence across 52 specialties.
            </p>
            <div className="pt-2 text-slate-300 space-y-1 font-mono text-[11px]">
              <div className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>Sarita Vihar, Delhi Mathura Road, New Delhi, Delhi 110076</span>
              </div>
              <div className="flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>OPD Appointments: +91 11 2692 5858 / 2692 5801</span>
              </div>
            </div>
          </div>

          {/* Col 2: Patient Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Patient Services
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('availability')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Live Doctor Availability & Queue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('booking')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Book In-Person OPD or Video Consult
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('portal')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Encrypted Health Records Vault
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('medications')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Automated Medication Reminders
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('chat')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Encrypted Doctor Consult Chat
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus & Centers of Excellence */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Centers of Excellence
            </h4>
            <ul className="space-y-2">
              <li>Apollo Heart Institute & Cath Lab</li>
              <li>Apollo Cancer Centre & CyberKnife</li>
              <li>Apollo Neurosciences & Stroke Unit</li>
              <li>Apollo Institutes of Robotic Surgery (Da Vinci)</li>
              <li>Pediatric Liver & Multi-Organ Transplant</li>
              <li>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 inline-flex items-center gap-1 mt-1 font-medium"
                >
                  <span>Google Maps Campus Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Multi-Language & International Patient Care */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider">
              Languages & Global Care
            </h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Serving patients across 120+ nations with personalized clinical concierge, airport pickup, and multi-lingual medical assistance.
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिन्दी' },
                { code: 'bn', label: 'বাংলা' },
                { code: 'ta', label: 'தமிழ்' },
                { code: 'te', label: 'తెలుగు' },
                { code: 'ar', label: 'العربية' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => onLanguageChange(lang.code as any)}
                  className={`px-2 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    currentLang === lang.code
                      ? 'bg-teal-600 text-white font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Disclaimer & Legal Copyright */}
        <div className="border-t border-slate-800 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 Indraprastha Apollo Hospitals Delhi. All rights reserved. 
            <span className="block mt-0.5 text-slate-600">
              Disclaimer: The health records portal is protected by client-side cryptographic storage. For life-threatening symptoms, dial 1066 immediately.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>DISHA / HIPAA Compliance</span>
          </div>
        </div>

      </div>

    </footer>
  );
};
