import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle, 
  MapPin, 
  Video, 
  Building2, 
  Download, 
  CalendarPlus, 
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  QrCode,
  Sparkles
} from 'lucide-react';
import { Doctor, AppointmentBooking, LanguageCode, ConsultType } from '../types';
import { translations } from '../translations';

interface AppointmentBookingSectionProps {
  doctors: Doctor[];
  currentLang: LanguageCode;
  selectedDoctor: Doctor | null;
  initialConsultType: ConsultType;
  onBookingComplete: (booking: AppointmentBooking) => void;
}

export const AppointmentBookingSection: React.FC<AppointmentBookingSectionProps> = ({
  doctors,
  currentLang,
  selectedDoctor: preselectedDoctor,
  initialConsultType,
  onBookingComplete,
}) => {
  const t = translations[currentLang];

  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedDocId, setSelectedDocId] = useState<string>(preselectedDoctor ? preselectedDoctor.id : doctors[0]?.id || '');
  const [consultType, setConsultType] = useState<ConsultType>(initialConsultType || 'in_person');
  
  // Date slots: today + next 6 days
  const today = new Date();
  const availableDates = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      dateString: d.toISOString().split('T')[0],
      dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      formatted: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(availableDates[0].dateString);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM');

  // Form patient fields
  const [patientName, setPatientName] = useState('Rajesh Kumar');
  const [patientPhone, setPatientPhone] = useState('+91 98101 23456');
  const [patientEmail, setPatientEmail] = useState('rajesh.kumar@delhinet.org');
  const [uhid, setUhid] = useState('AP-ND-2024-883921');
  const [reason, setReason] = useState('Routine cardiac checkup and medication review');

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentBooking | null>(null);

  const selectedDoctor = doctors.find((d) => d.id === selectedDocId) || doctors[0];

  const timeSlots = [
    { time: '09:30 AM', status: 'available' },
    { time: '10:00 AM', status: 'available' },
    { time: '10:30 AM', status: 'selected' },
    { time: '11:15 AM', status: 'available' },
    { time: '11:45 AM', status: 'fast_filling' },
    { time: '02:00 PM', status: 'available' },
    { time: '02:30 PM', status: 'available' },
    { time: '03:15 PM', status: 'available' },
    { time: '04:00 PM', status: 'fast_filling' },
  ];

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientPhone) return;

    const newBooking: AppointmentBooking = {
      id: `AP-OPD-${Math.floor(10000 + Math.random() * 90000)}`,
      patientName,
      patientPhone,
      patientEmail,
      uhid: uhid || `AP-TEMP-${Math.floor(1000 + Math.random() * 9000)}`,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      department: selectedDoctor.department,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
      consultType,
      reason,
      tokenNumber: selectedDoctor.currentToken + Math.floor(Math.random() * 5) + 3,
      roomNo: selectedDoctor.roomNo,
      block: selectedDoctor.block,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(newBooking);
    onBookingComplete(newBooking);
    setActiveStep(4);
  };

  const downloadIcsCalendar = () => {
    if (!confirmedBooking) return;
    const icsData = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Apollo Hospitals//Indraprastha Delhi//EN
BEGIN:VEVENT
SUMMARY:Apollo OPD Consultation: ${confirmedBooking.doctorName}
DESCRIPTION:Scheduled OPD token #${confirmedBooking.tokenNumber}. Department: ${confirmedBooking.department}. Room: ${confirmedBooking.roomNo} (${confirmedBooking.block}).
LOCATION:Indraprastha Apollo Hospitals, Delhi Mathura Road, Sarita Vihar, New Delhi 110076
DTSTART:20260926T103000Z
DTEND:20260926T110000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Apollo_Appointment_${confirmedBooking.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="booking" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>INSTANT CONFIRMED APPOINTMENTS</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.booking.title}
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            {t.booking.subtitle}
          </p>
        </div>

        {/* Step Indicator Bar */}
        <div className="grid grid-cols-4 gap-2 mb-8 text-center text-xs">
          {[
            { step: 1, label: t.booking.step1 },
            { step: 2, label: t.booking.step2 },
            { step: 3, label: t.booking.step3 },
            { step: 4, label: t.booking.step4 },
          ].map((item) => (
            <div
              key={item.step}
              className={`p-2.5 rounded-xl border transition-all ${
                activeStep === item.step
                  ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold'
                  : activeStep > item.step
                  ? 'bg-slate-50 border-slate-200 text-teal-700 font-medium'
                  : 'bg-white border-slate-200 text-slate-400'
              }`}
            >
              <div className="truncate">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Multi-Step Booking Container */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-xs p-6 sm:p-8">
          
          {/* STEP 1: SELECT SPECIALIST & CONSULT MODE */}
          {activeStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Consult Mode Switcher */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  {t.booking.consultMode}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultType('in_person')}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      consultType === 'in_person'
                        ? 'bg-white border-teal-600 ring-2 ring-teal-600/10 shadow-xs'
                        : 'bg-white/60 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Building2 className={`w-5 h-5 mt-0.5 ${consultType === 'in_person' ? 'text-teal-700' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{t.booking.inPerson}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Indraprastha Hospital OPD · Room Consultation
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultType('teleconsult')}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      consultType === 'teleconsult'
                        ? 'bg-white border-teal-600 ring-2 ring-teal-600/10 shadow-xs'
                        : 'bg-white/60 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Video className={`w-5 h-5 mt-0.5 ${consultType === 'teleconsult' ? 'text-teal-700' : 'text-slate-400'}`} />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{t.booking.videoConsult}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Encrypted HD Video · Digital Signed Prescription
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Doctor Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  {t.booking.selectDoctor}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {doctors.map((doc) => (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setSelectedDocId(doc.id)}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedDocId === doc.id
                          ? 'bg-white border-teal-600 ring-2 ring-teal-600/10 shadow-xs'
                          : 'bg-white/60 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-teal-800">{doc.department}</span>
                        <span className="text-xs font-mono font-bold text-slate-900">
                          ₹{consultType === 'in_person' ? doc.opdFee : doc.teleconsultFee}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-slate-900 mt-1">{doc.name}</div>
                      <div className="text-xs text-slate-500 truncate">{doc.specialty}</div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        {doc.roomNo} ({doc.block})
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <span>Continue to Date & Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: SELECT DATE & TIME SLOT */}
          {activeStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Doctor Summary Header */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-teal-700 font-semibold">{selectedDoctor.department}</span>
                  <h4 className="text-sm font-bold text-slate-900">{selectedDoctor.name}</h4>
                  <p className="text-xs text-slate-500">{selectedDoctor.roomNo} · {selectedDoctor.block}</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Consultation Fee</div>
                  <div className="text-sm font-bold font-mono text-slate-900">
                    ₹{consultType === 'in_person' ? selectedDoctor.opdFee : selectedDoctor.teleconsultFee}
                  </div>
                </div>
              </div>

              {/* Date Selection Grid */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  {t.booking.selectDate}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.dateString;
                    return (
                      <button
                        key={item.dateString}
                        type="button"
                        onClick={() => setSelectedDate(item.dateString)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-teal-700 text-white border-teal-700 shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className={`text-[11px] font-medium ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                          {item.dayName}
                        </div>
                        <div className="text-sm font-bold mt-0.5">
                          {item.formatted}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slot Selection Grid */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                  {t.booking.selectTimeSlot}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-teal-700 text-white border-teal-700 font-semibold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 font-medium'
                        }`}
                      >
                        <div className="text-xs font-mono tabular-nums">{slot.time}</div>
                        {slot.status === 'fast_filling' && (
                          <div className={`text-[10px] ${isSelected ? 'text-teal-200' : 'text-amber-600'}`}>
                            Fast filling
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveStep(1)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <span>Continue to Patient Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: PATIENT INFORMATION FORM */}
          {activeStep === 3 && (
            <form onSubmit={handleConfirm} className="space-y-5 animate-in fade-in duration-150">
              
              <div className="bg-teal-50/70 p-3.5 rounded-xl border border-teal-200/80 flex items-center justify-between text-xs text-teal-900">
                <span className="font-medium">
                  Booking for: <strong className="font-semibold">{selectedDoctor.name}</strong> · {selectedDate} at {selectedTimeSlot}
                </span>
                <span className="font-mono font-bold">
                  ₹{consultType === 'in_person' ? selectedDoctor.opdFee : selectedDoctor.teleconsultFee}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.booking.fullName} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Rajesh Kumar"
                      className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.booking.phone} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={patientPhone}
                      onChange={(e) => setPatientPhone(e.target.value)}
                      placeholder="+91 98101 23456"
                      className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.booking.email} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={patientEmail}
                      onChange={(e) => setPatientEmail(e.target.value)}
                      placeholder="patient@example.com"
                      className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.booking.uhidOptional}
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={uhid}
                      onChange={(e) => setUhid(e.target.value)}
                      placeholder="e.g. AP-ND-2024-883921"
                      className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.booking.reasonForVisit}
                </label>
                <textarea
                  rows={2}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Provide brief symptoms or prior hospital reference..."
                  className="w-full p-3 text-xs text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{t.booking.confirmBooking}</span>
                </button>
              </div>

            </form>
          )}

          {/* STEP 4: INSTANT CONFIRMATION & DIGITAL OPD PASS */}
          {activeStep === 4 && confirmedBooking && (
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {t.booking.confirmedSuccess}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  A confirmation SMS & WhatsApp notice has been dispatched to {confirmedBooking.patientPhone}
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-white rounded-2xl border-2 border-dashed border-teal-500 p-6 shadow-sm max-w-xl mx-auto relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-teal-700 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
                  {confirmedBooking.consultType === 'in_person' ? 'OPD SLIP' : 'TELECONSULT PASS'}
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-teal-800 mb-3">
                  <span>Indraprastha Apollo Hospitals</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-mono font-normal text-slate-500">Ref: {confirmedBooking.id}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-100">
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">{t.booking.tokenAssigned}</div>
                    <div className="text-2xl font-black font-mono text-teal-800 tabular-nums">
                      #{confirmedBooking.tokenNumber}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wider">Appointment Time</div>
                    <div className="text-sm font-bold text-slate-900 font-mono">
                      {confirmedBooking.timeSlot} · {confirmedBooking.date}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-100 text-xs">
                  <div>
                    <div className="text-slate-400">Doctor / Department</div>
                    <div className="font-bold text-slate-900">{confirmedBooking.doctorName}</div>
                    <div className="text-slate-500">{confirmedBooking.department}</div>
                  </div>
                  <div>
                    <div className="text-slate-400">Clinic Chamber Location</div>
                    <div className="font-bold text-slate-900">{confirmedBooking.roomNo}</div>
                    <div className="text-slate-500">{confirmedBooking.block} (Gate 1 Entry)</div>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-slate-400">Patient Name / UHID</div>
                    <div className="font-semibold text-slate-800">{confirmedBooking.patientName}</div>
                    <div className="font-mono text-slate-500">{confirmedBooking.uhid}</div>
                  </div>
                  <div className="text-right">
                    <div className="w-12 h-12 border border-slate-200 rounded-md p-1 bg-slate-50 flex items-center justify-center">
                      <QrCode className="w-10 h-10 text-slate-800" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Download pass, calendar sync, book another */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={downloadIcsCalendar}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                >
                  <CalendarPlus className="w-4 h-4 text-teal-600" />
                  <span>{t.booking.addToCalendar}</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>{t.booking.downloadPass}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveStep(1);
                    setConfirmedBooking(null);
                  }}
                  className="px-4 py-2.5 text-xs font-medium text-teal-800 hover:underline cursor-pointer"
                >
                  Book Another Appointment
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
