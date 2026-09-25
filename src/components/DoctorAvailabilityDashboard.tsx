import React, { useState } from 'react';
import { 
  Clock, 
  Search, 
  Filter, 
  Video, 
  UserCheck, 
  MapPin, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  BellRing,
  Stethoscope,
  Star,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { Doctor, LanguageCode, DoctorStatus } from '../types';
import { translations } from '../translations';

interface DoctorAvailabilityDashboardProps {
  doctors: Doctor[];
  currentLang: LanguageCode;
  selectedSpecialty: string;
  onSelectSpecialty: (specialty: string) => void;
  onBookDoctor: (doctor: Doctor, consultType: 'in_person' | 'teleconsult') => void;
}

export const DoctorAvailabilityDashboard: React.FC<DoctorAvailabilityDashboardProps> = ({
  doctors,
  currentLang,
  selectedSpecialty,
  onSelectSpecialty,
  onBookDoctor,
}) => {
  const t = translations[currentLang];
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAvailableOnly, setFilterAvailableOnly] = useState(false);
  const [filterTeleconsultOnly, setFilterTeleconsultOnly] = useState(false);
  const [subscribedTokenDoc, setSubscribedTokenDoc] = useState<string | null>(null);

  const departments = [
    'All',
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Oncology',
    'Pediatrics',
    'Gynecology',
    'Endocrinology',
    'Pulmonology',
  ];

  // Filtering logic
  const filteredDoctors = doctors.filter((doc) => {
    const matchesDept = 
      selectedSpecialty === 'All' || 
      doc.department.toLowerCase() === selectedSpecialty.toLowerCase();

    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAvailable = !filterAvailableOnly || doc.currentStatus === 'available_now';
    const matchesTeleconsult = !filterTeleconsultOnly || doc.availableForTeleconsult;

    return matchesDept && matchesSearch && matchesAvailable && matchesTeleconsult;
  });

  const getStatusBadge = (status: DoctorStatus) => {
    switch (status) {
      case 'available_now':
        return (
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t.liveDashboard.statusAvailable}
          </span>
        );
      case 'in_consultation':
        return (
          <span className="flex items-center gap-1.5 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            {t.liveDashboard.statusConsulting}
          </span>
        );
      case 'in_surgery':
        return (
          <span className="flex items-center gap-1.5 text-xs font-medium text-purple-800 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-purple-500" />
            {t.liveDashboard.statusSurgery}
          </span>
        );
      case 'on_break':
        return (
          <span className="flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            {t.liveDashboard.statusBreak}
          </span>
        );
      case 'next_slot_soon':
      default:
        return (
          <span className="flex items-center gap-1.5 text-xs font-medium text-sky-800 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-md">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            {t.liveDashboard.nextSlot} Soon
          </span>
        );
    }
  };

  const handleSubscribeQueue = (docId: string, docName: string) => {
    setSubscribedTokenDoc(docId);
    setTimeout(() => {
      // simulated notification alert
    }, 4000);
  };

  return (
    <section id="availability" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 mb-1">
              <Activity className="w-4 h-4 text-teal-600 animate-pulse" />
              <span>LIVE OPD SYNCHRONIZED FEED</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-500 font-mono text-[11px]">Updated 10s ago</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.liveDashboard.title}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t.liveDashboard.subtitle}
            </p>
          </div>

          {/* Quick Counter Banner */}
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-xs shrink-0">
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 font-bold font-mono">
              {doctors.filter(d => d.currentStatus === 'available_now').length}
            </div>
            <div className="text-xs">
              <div className="font-semibold text-slate-900">{t.liveDashboard.activeConsultations}</div>
              <div className="text-slate-500">Walk-in OPD & Teleconsult</div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by doctor name, specialty or disease..."
                className="w-full pl-9 pr-4 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600 focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Interactive Toggle Toggles (Buttons permitted for interactive state) */}
            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => setFilterAvailableOnly(!filterAvailableOnly)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                  filterAvailableOnly 
                    ? 'bg-teal-50 text-teal-800 border-teal-300 font-semibold' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${filterAvailableOnly ? 'bg-teal-600' : 'bg-slate-300'}`} />
                <span>{t.liveDashboard.availableOnly}</span>
              </button>

              <button
                type="button"
                onClick={() => setFilterTeleconsultOnly(!filterTeleconsultOnly)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 border ${
                  filterTeleconsultOnly 
                    ? 'bg-sky-50 text-sky-800 border-sky-300 font-semibold' 
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Video className="w-3.5 h-3.5 text-sky-600" />
                <span>{t.liveDashboard.teleconsultOnly}</span>
              </button>
            </div>
          </div>

          {/* Department Tabs Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none">
            {departments.map((dept) => {
              const isActive = selectedSpecialty === dept || (dept === 'All' && selectedSpecialty === '');
              return (
                <button
                  key={dept}
                  type="button"
                  onClick={() => onSelectSpecialty(dept)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {dept === 'All' ? t.liveDashboard.allDepartments : dept}
                </button>
              );
            })}
          </div>

        </div>

        {/* Doctor Grid (Populated State) */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => {
              const isSubscribed = subscribedTokenDoc === doc.id;
              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between overflow-hidden"
                >
                  {/* Top Portion: Doctor Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-medium text-teal-800 mb-0.5">
                          <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
                          <span>{doc.department}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-500">{doc.experienceYears} yrs exp</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {doc.name}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {doc.qualifications}
                        </p>
                      </div>

                      {/* Doctor Status Badge */}
                      <div className="shrink-0">
                        {getStatusBadge(doc.currentStatus)}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                      {doc.bio}
                    </p>

                    {/* Room & Location Info */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-medium text-slate-700">{doc.roomNo}</span>
                        <span className="text-slate-400">({doc.block})</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-600 font-medium">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-mono tabular-nums">{doc.rating}</span>
                        <span className="text-slate-400">({doc.reviewCount})</span>
                      </div>
                    </div>

                    {/* Real-time Token Queue Pod */}
                    <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                      <div>
                        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                          {t.liveDashboard.currentToken}
                        </div>
                        <div className="text-xl font-bold font-mono tabular-nums text-slate-900 flex items-center gap-2">
                          #{doc.currentToken}
                          <span className="text-[11px] font-normal text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded-sm">
                            In Chamber
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                          {t.liveDashboard.estWait}
                        </div>
                        <div className="text-sm font-semibold font-mono tabular-nums text-slate-800">
                          ~{doc.estimatedWaitMins} {t.liveDashboard.mins}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Next Slot: <span className="font-medium text-slate-600">{doc.nextAvailableSlot}</span>
                        </div>
                      </div>
                    </div>

                    {/* Live queue tracker subscription button */}
                    <div className="mt-2.5 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Languages: {doc.languagesSpoken.join(', ')}</span>
                      <button
                        type="button"
                        onClick={() => handleSubscribeQueue(doc.id, doc.name)}
                        className={`inline-flex items-center gap-1 hover:underline cursor-pointer ${
                          isSubscribed ? 'text-emerald-700 font-semibold' : 'text-teal-700'
                        }`}
                      >
                        {isSubscribed ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>Queue SMS Alert On</span>
                          </>
                        ) : (
                          <>
                            <BellRing className="w-3 h-3" />
                            <span>Track Queue Live</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onBookDoctor(doc, 'in_person')}
                      className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer text-center whitespace-nowrap shadow-xs"
                    >
                      {t.liveDashboard.bookConsultBtn} · ₹{doc.opdFee}
                    </button>

                    {doc.availableForTeleconsult && (
                      <button
                        type="button"
                        onClick={() => onBookDoctor(doc, 'teleconsult')}
                        className="py-2 px-3 text-xs font-semibold text-teal-800 bg-white hover:bg-teal-50 border border-teal-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1"
                        title="Book high-definition video teleconsultation"
                      >
                        <Video className="w-3.5 h-3.5 text-teal-600" />
                        <span>Teleconsult</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 max-w-lg mx-auto">
            <UserCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Doctors Match Your Filter</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              We couldn't find any specialist matching "{searchQuery || selectedSpecialty}". Please reset your filter or contact the 24x7 Apollo helpline.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectSpecialty('All');
                setFilterAvailableOnly(false);
                setFilterTeleconsultOnly(false);
              }}
              className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 rounded-lg hover:bg-teal-800 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
