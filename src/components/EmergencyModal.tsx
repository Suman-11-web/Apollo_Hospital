import React, { useState } from 'react';
import { 
  PhoneCall, 
  ShieldAlert, 
  MapPin, 
  AlertTriangle, 
  Clock, 
  Navigation, 
  HeartHandshake, 
  ExternalLink,
  CheckCircle2,
  X
} from 'lucide-react';
import { LanguageCode } from '../types';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: LanguageCode;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const [ambulanceDispatched, setAmbulanceDispatched] = useState(false);
  const [callerLocation, setCallerLocation] = useState('South Delhi / Mathura Road area');

  if (!isOpen) return null;

  const handleSimulateDispatch = () => {
    setAmbulanceDispatched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-rose-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 animate-soft-pulse">
            <PhoneCall className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-700 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Apollo 24/7 National Emergency</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
              Dial 1066 Immediate Helpline
            </h3>
            <p className="text-xs text-slate-500">
              Direct hot-line to Indraprastha Apollo Emergency & Trauma Center (Gate 2)
            </p>
          </div>
        </div>

        {/* Direct Call Action Strip */}
        <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs text-rose-800 font-semibold">Toll-Free Emergency Number</div>
            <div className="text-3xl font-black font-mono text-rose-700 tracking-tight tabular-nums">
              1066
            </div>
            <div className="text-[11px] text-rose-600">Free call from any mobile or landline across India</div>
          </div>
          <a
            href="tel:1066"
            className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-rose-600/30 flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call 1066 Now</span>
          </a>
        </div>

        {/* Emergency Dispatch Simulator */}
        {!ambulanceDispatched ? (
          <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-teal-600" />
              <span>Request GPS Ambulance Dispatch to Your Location</span>
            </div>
            <p className="text-xs text-slate-600">
              Our 5G-enabled Advanced Life Support (ALS) ambulances feature telemetry directly connected to Apollo Cath Lab.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={callerLocation}
                onChange={(e) => setCallerLocation(e.target.value)}
                placeholder="Enter current address / locality in Delhi NCR..."
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-rose-500 font-medium"
              />
              <button
                type="button"
                onClick={handleSimulateDispatch}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl cursor-pointer shrink-0"
              >
                Dispatch Ambulance
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>ALS Ambulance #AP-DEL-04 Dispatched</span>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Paramedic Team led by Dr. Verma notified. Estimated time of arrival: <strong className="font-mono">8 minutes</strong> to {callerLocation}.
            </p>
            <div className="text-[11px] text-emerald-600 font-mono">
              Vehicle live telemetry streaming to Indraprastha Trauma Room 2.
            </div>
          </div>
        )}

        {/* Golden Hour Guidelines */}
        <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
          <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Crucial First-Aid Protocols:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <strong className="text-slate-900 block mb-0.5">Suspected Heart Attack:</strong>
              Chew one 300mg/75mg Aspirin tablet if not allergic. Sit upright and stay calm.
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
              <strong className="text-slate-900 block mb-0.5">Stroke FAST Symptoms:</strong>
              Do not give food or water. Note the exact time symptoms started for tPA clot-buster.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
          <a
            href="https://maps.app.goo.gl/fRQZcZ9MNXFPjhSp9"
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-700 font-semibold hover:underline flex items-center gap-1"
          >
            <span>Drive directly to Gate 2 (Emergency Bay)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
          >
            Close Dialog
          </button>
        </div>

      </div>
    </div>
  );
};
