import React, { useState } from 'react';
import { 
  FileQuestion, 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  HelpCircle, 
  BookOpen, 
  ChevronRight, 
  Stethoscope, 
  PhoneCall, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { LanguageCode, SymptomAssessment } from '../types';
import { symptomAssessments, preProcedureGuides } from '../data/mockData';
import { translations } from '../translations';

interface InteractivePatientResourcesProps {
  currentLang: LanguageCode;
  onNavigateToBooking: (specialty?: string) => void;
  onEmergencyClick: () => void;
}

export const InteractivePatientResources: React.FC<InteractivePatientResourcesProps> = ({
  currentLang,
  onNavigateToBooking,
  onEmergencyClick,
}) => {
  const t = translations[currentLang];

  const [selectedSymptomId, setSelectedSymptomId] = useState<string>(symptomAssessments[0].id);
  const [activeGuideIndex, setActiveGuideIndex] = useState<number>(0);

  const currentSymptom = symptomAssessments.find((s) => s.id === selectedSymptomId) || symptomAssessments[0];
  const activeGuide = preProcedureGuides[activeGuideIndex];

  return (
    <section id="resources" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-3">
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>CLINICAL TRIAGE & PATIENT EDUCATION</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Interactive Patient Resources & Triage
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Empowering patients with evidence-based pre-procedure preparation, symptoms assessment, and golden-hour emergency guidance.
          </p>
        </div>

        {/* 2-Column Module: Symptom Checker & Pre-Op Preparation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Symptom Evaluator */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-teal-600" />
                  <span>Symptom Triage & Department Navigator</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select your current clinical presentation to determine appropriate care level
                </p>
              </div>
              <span className="text-[11px] font-mono text-teal-800 bg-teal-50 px-2 py-0.5 rounded-sm">
                Clinical Guide
              </span>
            </div>

            {/* Symptom Choices */}
            <div className="space-y-2">
              {symptomAssessments.map((sym) => {
                const isSelected = selectedSymptomId === sym.id;
                return (
                  <button
                    key={sym.id}
                    type="button"
                    onClick={() => setSelectedSymptomId(sym.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50/60 border-teal-600 ring-2 ring-teal-600/10'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{sym.name}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                        sym.urgency === 'emergency'
                          ? 'text-rose-700 bg-rose-50 border border-rose-200'
                          : sym.urgency === 'urgent_opd'
                          ? 'text-amber-700 bg-amber-50 border border-amber-200'
                          : 'text-teal-700 bg-teal-50 border border-teal-200'
                      }`}>
                        {sym.urgency === 'emergency' ? 'Critical' : sym.urgency === 'urgent_opd' ? 'Urgent OPD' : 'Teleconsult'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Category: {sym.category}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Assessment Result Panel */}
            <div className={`p-4 rounded-xl border ${
              currentSymptom.urgency === 'emergency'
                ? 'bg-rose-50 border-rose-200 text-rose-950'
                : 'bg-teal-50 border-teal-200 text-teal-950'
            }`}>
              <div className="flex items-start gap-3">
                {currentSymptom.urgency === 'emergency' ? (
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5 animate-pulse" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider mb-1">
                    Recommended Clinical Action
                  </div>
                  <p className="text-xs leading-relaxed font-medium">
                    {currentSymptom.actionText}
                  </p>

                  <div className="mt-3 pt-2 border-t border-black/10 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-xs font-semibold">
                      Department: <span className="underline">{currentSymptom.recommendedSpecialty}</span>
                    </div>

                    {currentSymptom.urgency === 'emergency' ? (
                      <button
                        type="button"
                        onClick={onEmergencyClick}
                        className="px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg cursor-pointer flex items-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Dial 1066 Now</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onNavigateToBooking('Cardiology')}
                        className="px-4 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg cursor-pointer flex items-center gap-1.5"
                      >
                        <span>Book Relevant OPD Slot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Pre-Procedure Clinical Guides */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Pre-Procedure Checklists
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Essential clinical preparation guidelines
                </p>
              </div>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>

            {/* Checklist Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {preProcedureGuides.map((guide, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveGuideIndex(idx)}
                  className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer text-center truncate ${
                    activeGuideIndex === idx
                      ? 'bg-white text-slate-900 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {idx === 0 ? 'Angio / Cath' : idx === 1 ? 'MRI / PET-CT' : 'Robotic Knee'}
                </button>
              ))}
            </div>

            {/* Selected Guide Details */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {activeGuide.title}
                </h4>
                <div className="text-xs text-teal-800 font-mono font-semibold mt-0.5">
                  Protocol Fasting: {activeGuide.duration}
                </div>
              </div>

              <div className="space-y-2.5">
                {activeGuide.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                    <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Need specific fasting advice?</span>
                <button
                  type="button"
                  onClick={() => onNavigateToBooking('Cardiology')}
                  className="font-bold text-teal-700 hover:underline cursor-pointer"
                >
                  Consult Anesthesiology Desk
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
