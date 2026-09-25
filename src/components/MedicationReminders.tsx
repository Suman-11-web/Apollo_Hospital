import React, { useState } from 'react';
import { 
  Pill, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  BellRing, 
  Plus, 
  Volume2, 
  ShieldCheck, 
  Calendar,
  Sparkles,
  RefreshCw,
  X
} from 'lucide-react';
import { MedicationReminder, LanguageCode } from '../types';
import { translations } from '../translations';

interface MedicationRemindersProps {
  currentLang: LanguageCode;
  medications: MedicationReminder[];
  onUpdateMedicationStatus: (id: string, status: 'taken' | 'snoozed' | 'skipped') => void;
  onAddMedication: (med: MedicationReminder) => void;
}

export const MedicationReminders: React.FC<MedicationRemindersProps> = ({
  currentLang,
  medications,
  onUpdateMedicationStatus,
  onAddMedication,
}) => {
  const t = translations[currentLang];
  const [showAddModal, setShowAddModal] = useState(false);
  const [notificationTestBanner, setNotificationTestBanner] = useState<string | null>(null);

  // New medication form fields
  const [newMedName, setNewMedName] = useState('');
  const [newDosage, setNewDosage] = useState('1 Tablet');
  const [newInstruction, setNewInstruction] = useState<'after_food' | 'before_food' | 'with_food'>('after_food');
  const [newTime, setNewTime] = useState('08:00');
  const [newSlot, setNewSlot] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const [newStock, setNewStock] = useState('30');

  // Adherence calculation
  const total = medications.length;
  const takenCount = medications.filter(m => m.status === 'taken').length;
  const adherencePercent = total > 0 ? Math.round((takenCount / total) * 100) : 0;

  // Gentle medical chime synthesizer using Web Audio API
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5

      gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch {
      // Audio fallback
    }
  };

  const handleTestAlert = () => {
    playChime();
    setNotificationTestBanner('Apollo Automated Medication Reminder: Tab Ecosprin 75mg is scheduled for 01:30 PM (After Lunch)');
    setTimeout(() => {
      setNotificationTestBanner(null);
    }, 6000);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMedName) return;

    const newMed: MedicationReminder = {
      id: `med-${Date.now()}`,
      uhid: 'AP-ND-2024-883921',
      medicineName: newMedName,
      dosage: newDosage,
      type: 'tablet',
      instruction: newInstruction,
      scheduleTime: newTime,
      timeSlotLabel: newSlot,
      prescribedBy: 'Apollo Attending Team',
      startDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      daysRemaining: parseInt(newStock, 10) || 30,
      totalPillsRemaining: parseInt(newStock, 10) || 30,
      refillNeeded: (parseInt(newStock, 10) || 30) < 14,
      takenToday: false,
      status: 'pending',
    };

    onAddMedication(newMed);
    setShowAddModal(false);
    setNewMedName('');
  };

  return (
    <section id="medications" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 mb-1">
              <Pill className="w-4 h-4 text-teal-600" />
              <span>AUTOMATED CLINICAL SCHEDULE & ADHERENCE</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {t.medications.title}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              {t.medications.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleTestAlert}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors cursor-pointer shadow-xs"
              title="Test browser audio chime notification"
            >
              <Volume2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Test Audio Alarm</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.medications.addMedication}</span>
            </button>
          </div>
        </div>

        {/* Live Audio / Visual Alert Banner */}
        {notificationTestBanner && (
          <div className="mb-6 p-4 bg-teal-800 text-white rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center gap-3">
              <BellRing className="w-5 h-5 text-teal-300 animate-bounce" />
              <div className="text-xs">
                <div className="font-bold">Automated Pill Alarm Triggered</div>
                <div className="text-teal-100">{notificationTestBanner}</div>
              </div>
            </div>
            <button
              onClick={() => setNotificationTestBanner(null)}
              className="text-white hover:text-teal-200 text-xs font-semibold px-2 py-1 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Adherence & Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Adherence Score Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500 font-medium">
                {t.medications.adherenceRate}
              </div>
              <div className="text-3xl font-extrabold font-mono text-slate-900 mt-1 tabular-nums">
                {adherencePercent}%
              </div>
              <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Excellent cardiac compliance</span>
              </div>
            </div>

            {/* Circular progress representation */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-teal-600"
                  strokeDasharray={`${adherencePercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-xs font-mono font-bold text-slate-700">
                {takenCount}/{total}
              </span>
            </div>
          </div>

          {/* Today Doses Summary */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="text-xs text-slate-500 font-medium">Scheduled Doses Today</div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {total} Total Prescriptions
            </div>
            <div className="text-xs text-slate-500 mt-1">
              {takenCount} Completed · {total - takenCount} Pending
            </div>
          </div>

          {/* Pharmacy Refill Alerts */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
              <span>Apollo Pharmacy Refills</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-sm font-bold text-amber-800">
              1 Medication Running Low
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center justify-between">
              <span>Metformin SR: <strong className="font-mono text-slate-800">12 pills</strong> left</span>
              <a
                href="#booking"
                className="text-teal-700 font-semibold hover:underline"
              >
                1-Click Refill
              </a>
            </div>
          </div>

        </div>

        {/* Medication Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medications.map((med) => {
            const isTaken = med.status === 'taken';
            return (
              <div
                key={med.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isTaken
                    ? 'bg-white/80 border-emerald-200 shadow-xs'
                    : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isTaken ? 'bg-emerald-50 text-emerald-700' : 'bg-teal-50 text-teal-700'
                    }`}>
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        {med.medicineName}
                      </h4>
                      <div className="text-xs text-slate-500">
                        {med.dosage} · <span className="capitalize">{med.instruction.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-slate-800 flex items-center gap-1 justify-end">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{med.scheduleTime}</span>
                    </div>
                    <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                      {med.timeSlotLabel}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs">
                  <div className="text-slate-500">
                    Stock: <span className="font-mono font-semibold text-slate-800">{med.totalPillsRemaining} pills</span> ({med.daysRemaining} days left)
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {isTaken ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Taken {med.lastTakenAt || 'Today'}</span>
                      </span>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            playChime();
                            onUpdateMedicationStatus(med.id, 'taken');
                          }}
                          className="px-3 py-1.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                        >
                          {t.medications.markTaken}
                        </button>
                        <button
                          type="button"
                          onClick={() => onUpdateMedicationStatus(med.id, 'snoozed')}
                          className="px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        >
                          {t.medications.snooze}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ADD MEDICATION MODAL */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-base font-bold text-slate-900">
                  {t.medications.addMedication}
                </h4>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600 text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Medicine Brand or Generic Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMedName}
                    onChange={(e) => setNewMedName(e.target.value)}
                    placeholder="e.g. Pantoprazole (Pan 40)"
                    className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Dosage
                    </label>
                    <input
                      type="text"
                      value={newDosage}
                      onChange={(e) => setNewDosage(e.target.value)}
                      placeholder="e.g. 40 mg · 1 Tab"
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Food Timing
                    </label>
                    <select
                      value={newInstruction}
                      onChange={(e) => setNewInstruction(e.target.value as any)}
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-600"
                    >
                      <option value="before_food">Before Food / Empty Stomach</option>
                      <option value="after_food">After Food</option>
                      <option value="with_food">With Food</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Alarm Time
                    </label>
                    <input
                      type="time"
                      value={newTime}
                      onChange={(e) => setNewTime(e.target.value)}
                      className="w-full p-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Slot
                    </label>
                    <select
                      value={newSlot}
                      onChange={(e) => setNewSlot(e.target.value as any)}
                      className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-600"
                    >
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                      <option value="night">Night</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Pills in Box
                    </label>
                    <input
                      type="number"
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      className="w-full p-2 text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-600"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    Set Schedule & Reminder
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
