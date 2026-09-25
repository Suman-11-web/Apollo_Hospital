import React, { useState } from 'react';
import { 
  Lock, 
  Unlock, 
  ShieldCheck, 
  FileText, 
  Activity, 
  Plus, 
  Download, 
  Eye, 
  User, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  Heart, 
  Droplet, 
  TrendingUp,
  FileCheck,
  ChevronRight,
  UploadCloud,
  FileSpreadsheet
} from 'lucide-react';
import { PatientProfile, HealthRecord, VitalsLog, LanguageCode } from '../types';
import { translations } from '../translations';

interface PatientPortalProps {
  currentLang: LanguageCode;
  profiles: PatientProfile[];
  activeProfile: PatientProfile;
  onSelectProfile: (profile: PatientProfile) => void;
  healthRecords: HealthRecord[];
  vitalsHistory: VitalsLog[];
  onAddVitalLog: (vital: VitalsLog) => void;
}

export const PatientPortal: React.FC<PatientPortalProps> = ({
  currentLang,
  profiles,
  activeProfile,
  onSelectProfile,
  healthRecords,
  vitalsHistory,
  onAddVitalLog,
}) => {
  const t = translations[currentLang];

  const [isUnlocked, setIsUnlocked] = useState(true); // default unlocked for smooth exploration, can lock/unlock
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  // Active view tab in portal
  const [activeTab, setActiveTab] = useState<'records' | 'vitals' | 'prescriptions'>('records');
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(healthRecords[0] || null);
  const [showAddVitalModal, setShowAddVitalModal] = useState(false);

  // New vital state
  const [newSystolic, setNewSystolic] = useState('120');
  const [newDiastolic, setNewDiastolic] = useState('78');
  const [newHeartRate, setNewHeartRate] = useState('72');
  const [newGlucose, setNewGlucose] = useState('105');
  const [newSpO2, setNewSpO2] = useState('99');

  const filteredRecords = healthRecords.filter(r => r.uhid === activeProfile.uhid);
  const filteredVitals = vitalsHistory.filter(v => v.uhid === activeProfile.uhid);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === activeProfile.pinHash || pinInput === '1234') {
      setIsUnlocked(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleCreateVital = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: VitalsLog = {
      id: `v-${Date.now()}`,
      uhid: activeProfile.uhid,
      timestamp: 'Just now',
      systolic: parseInt(newSystolic, 10) || 120,
      diastolic: parseInt(newDiastolic, 10) || 80,
      heartRate: parseInt(newHeartRate, 10) || 72,
      bloodGlucose: parseInt(newGlucose, 10) || 105,
      spO2: parseInt(newSpO2, 10) || 99,
      weightKg: 74.2,
      note: 'Self-logged via Apollo Secure Portal',
    };
    onAddVitalLog(newLog);
    setShowAddVitalModal(false);
  };

  const latestVital = filteredVitals[0] || {
    systolic: 122,
    diastolic: 78,
    heartRate: 71,
    bloodGlucose: 106,
    spO2: 99,
    timestamp: 'Today 08:15 AM',
  };

  return (
    <section id="portal" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 mb-1">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>AES-256 GCM SECURE HEALTH VAULT</span>
              <span className="text-slate-300">·</span>
              <span className="text-slate-500 font-mono text-[11px]">DISHA & HIPAA Compliant</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.portal.title}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t.portal.subtitle}
            </p>
          </div>

          {/* Profile Switcher & Lock Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Profile Dropdown */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-1 flex items-center gap-1">
              {profiles.map((p) => (
                <button
                  key={p.uhid}
                  onClick={() => onSelectProfile(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    activeProfile.uhid === p.uhid
                      ? 'bg-white text-slate-900 shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Lock/Unlock Toggle */}
            <button
              onClick={() => setIsUnlocked(!isUnlocked)}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isUnlocked
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  : 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title={isUnlocked ? 'Lock Vault' : 'Unlock Vault'}
            >
              {isUnlocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* LOCKED STATE */}
        {!isUnlocked ? (
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 sm:p-12 text-center max-w-md mx-auto shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {t.portal.lockTitle}
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
              {t.portal.lockDesc} (Default PIN: <strong>1234</strong>)
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={4}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="••••"
                  className="w-36 text-center tracking-widest text-2xl font-mono py-2.5 px-4 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-teal-600 shadow-inner"
                  autoFocus
                />
                {pinError && (
                  <p className="text-xs text-rose-600 mt-1.5">
                    Incorrect PIN. Try 1234
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  {t.portal.unlockVault}
                </button>
                <button
                  type="button"
                  onClick={() => setIsUnlocked(true)}
                  className="text-xs text-teal-700 hover:underline cursor-pointer"
                >
                  Instant Demo Unlock
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* UNLOCKED PORTAL INTERFACE */
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Patient Identity Ribbon */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-700 text-white font-bold flex items-center justify-center text-lg">
                  {activeProfile.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{activeProfile.name}</h3>
                    <span className="text-xs font-mono font-semibold text-teal-800 bg-teal-100/70 px-2 py-0.5 rounded-sm">
                      {activeProfile.uhid}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {activeProfile.age} yrs · {activeProfile.gender} · Blood Group: <strong className="text-slate-700">{activeProfile.bloodGroup}</strong>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 flex flex-wrap items-center gap-4 border-t md:border-t-0 pt-3 md:pt-0 border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[11px]">Primary Attending</span>
                  <strong className="text-slate-800">{activeProfile.primaryDoctor}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Known Allergies</span>
                  <span className="text-rose-700 font-medium">{activeProfile.allergies.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Vitals Summary Strip with Tabular Figures */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-teal-600" />
                  <span>{t.portal.vitalsTitle}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddVitalModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t.portal.addVital}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Blood Pressure */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Blood Pressure</span>
                    <Heart className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                    {latestVital.systolic}/{latestVital.diastolic}
                    <span className="text-xs font-normal text-slate-400 ml-1 font-sans">mmHg</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Target Range (Optimal)</span>
                  </div>
                </div>

                {/* Heart Rate */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Resting Pulse</span>
                    <Activity className="w-3.5 h-3.5 text-teal-500" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                    {latestVital.heartRate}
                    <span className="text-xs font-normal text-slate-400 ml-1 font-sans">bpm</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Regular sinus rhythm
                  </div>
                </div>

                {/* Blood Glucose */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Blood Glucose</span>
                    <Droplet className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                    {latestVital.bloodGlucose}
                    <span className="text-xs font-normal text-slate-400 ml-1 font-sans">mg/dL</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Fasting · Target &lt; 110
                  </div>
                </div>

                {/* SpO2 */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>Oxygen SpO2</span>
                    <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
                  </div>
                  <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                    {latestVital.spO2}
                    <span className="text-xs font-normal text-slate-400 ml-1 font-sans">%</span>
                  </div>
                  <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Normal room air</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Health Records & Lab Explorer */}
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('records')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'records'
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Lab Reports & Scans ({filteredRecords.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('prescriptions')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                      activeTab === 'prescriptions'
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Active Prescriptions
                  </button>
                </div>

                <div className="text-xs text-slate-500 font-mono">
                  Sync: 100% Encrypted
                </div>
              </div>

              {/* Records List + Detail View */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                {/* List Column */}
                <div className="lg:col-span-5 space-y-3">
                  {filteredRecords.map((record) => {
                    const isSelected = selectedRecord?.id === record.id;
                    return (
                      <div
                        key={record.id}
                        onClick={() => setSelectedRecord(record)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-teal-600 ring-2 ring-teal-600/10 shadow-xs'
                            : 'bg-white border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[11px] font-mono font-medium text-slate-500">
                            {record.date}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-sm ${
                            record.statusBadge === 'Normal'
                              ? 'text-emerald-800 bg-emerald-50 border border-emerald-200'
                              : 'text-amber-800 bg-amber-50 border border-amber-200'
                          }`}>
                            {record.statusBadge}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                          {record.title}
                        </h4>
                        <div className="text-xs text-slate-500 mt-1">
                          {record.doctor} · {record.department}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Detail View Column */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
                  {selectedRecord ? (
                    <div className="space-y-6">
                      
                      {/* Document Meta Header */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                        <div>
                          <div className="flex items-center gap-2 text-xs text-teal-800 font-semibold mb-1">
                            <FileCheck className="w-4 h-4 text-teal-600" />
                            <span>{selectedRecord.department}</span>
                            <span className="text-slate-300">·</span>
                            <span className="text-slate-500 font-mono">{selectedRecord.date}</span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900">
                            {selectedRecord.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Attending Physician: {selectedRecord.doctor}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer shrink-0"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>{t.portal.downloadPdf}</span>
                        </button>
                      </div>

                      {/* Clinical Summary Note */}
                      <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                        <div className="text-xs font-bold text-slate-900 mb-1">
                          Clinical Impression & Interpretation
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {selectedRecord.summary}
                        </p>
                      </div>

                      {/* Diagnostic Parameters Table with Tabular Numerals */}
                      {selectedRecord.results && (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                            Quantitative Laboratory Values
                          </div>
                          <div className="border border-slate-200 rounded-xl overflow-hidden">
                            <table className="w-full text-left text-xs">
                              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                                <tr>
                                  <th className="py-2.5 px-3 font-semibold">Test Parameter</th>
                                  <th className="py-2.5 px-3 font-semibold text-right">Result Value</th>
                                  <th className="py-2.5 px-3 font-semibold text-right">Reference Range</th>
                                  <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {selectedRecord.results.map((res, i) => (
                                  <tr key={i} className="hover:bg-slate-50/50">
                                    <td className="py-2.5 px-3 text-slate-900 font-medium">
                                      {res.parameter}
                                    </td>
                                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                                      {res.value} <span className="text-[11px] font-normal text-slate-500 font-sans">{res.unit}</span>
                                    </td>
                                    <td className="py-2.5 px-3 text-right font-mono text-slate-500 text-[11px] tabular-nums">
                                      {res.normalRange}
                                    </td>
                                    <td className="py-2.5 px-3 text-center">
                                      <span className={`inline-block px-2 py-0.5 rounded-sm text-[10px] font-semibold ${
                                        res.status === 'normal'
                                          ? 'text-emerald-700 bg-emerald-50'
                                          : 'text-amber-700 bg-amber-50'
                                      }`}>
                                        {res.status === 'normal' ? 'Normal' : 'Borderline'}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Prescribed Medications on this Consultation */}
                      {selectedRecord.medicationsPrescribed && (
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                            Prescription Regimen
                          </div>
                          <div className="space-y-2">
                            {selectedRecord.medicationsPrescribed.map((med, i) => (
                              <div key={i} className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between text-xs">
                                <div>
                                  <span className="font-bold text-slate-900">{med.name}</span>
                                  <span className="text-slate-500 ml-2 font-mono">{med.dosage}</span>
                                </div>
                                <div className="text-right text-slate-600 font-medium">
                                  {med.frequency} · {med.duration}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      Select a medical record from the left list to review detailed lab findings.
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        )}

        {/* LOG NEW VITAL READING MODAL */}
        {showAddVitalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-base font-bold text-slate-900">
                  Log Monitored Vital Reading
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddVitalModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateVital} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Systolic BP (mmHg)
                    </label>
                    <input
                      type="number"
                      value={newSystolic}
                      onChange={(e) => setNewSystolic(e.target.value)}
                      className="w-full p-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Diastolic BP (mmHg)
                    </label>
                    <input
                      type="number"
                      value={newDiastolic}
                      onChange={(e) => setNewDiastolic(e.target.value)}
                      className="w-full p-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Heart Pulse (bpm)
                    </label>
                    <input
                      type="number"
                      value={newHeartRate}
                      onChange={(e) => setNewHeartRate(e.target.value)}
                      className="w-full p-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Glucose (mg/dL)
                    </label>
                    <input
                      type="number"
                      value={newGlucose}
                      onChange={(e) => setNewGlucose(e.target.value)}
                      className="w-full p-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-600"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddVitalModal(false)}
                    className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Save to Health Vault
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
