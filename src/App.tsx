/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DoctorAvailabilityDashboard } from './components/DoctorAvailabilityDashboard';
import { AppointmentBookingSection } from './components/AppointmentBookingSection';
import { HospitalLocationMap } from './components/HospitalLocationMap';
import { PatientPortal } from './components/PatientPortal';
import { MedicationReminders } from './components/MedicationReminders';
import { EncryptedConsultationChat } from './components/EncryptedConsultationChat';
import { InteractivePatientResources } from './components/InteractivePatientResources';
import { EmergencyModal } from './components/EmergencyModal';
import { Footer } from './components/Footer';

import { 
  Doctor, 
  LanguageCode, 
  PatientProfile, 
  HealthRecord, 
  VitalsLog, 
  MedicationReminder, 
  AppointmentBooking, 
  ConsultType 
} from './types';

import { 
  initialDoctors, 
  demoPatientProfiles, 
  mockHealthRecords, 
  mockVitalsHistory, 
  initialMedications 
} from './data/mockData';

export default function App() {
  const [currentLang, setCurrentLang] = useState<LanguageCode>('en');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);

  // Doctors & real-time live availability simulation
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
  const [bookingConsultType, setBookingConsultType] = useState<ConsultType>('in_person');

  // Patient profiles & records
  const [profiles] = useState<PatientProfile[]>(demoPatientProfiles);
  const [activeProfile, setActiveProfile] = useState<PatientProfile>(demoPatientProfiles[0]);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(mockHealthRecords);
  const [vitalsHistory, setVitalsHistory] = useState<VitalsLog[]>(mockVitalsHistory);
  const [medications, setMedications] = useState<MedicationReminder[]>(initialMedications);
  const [myBookings, setMyBookings] = useState<AppointmentBooking[]>([]);

  // Periodic subtle live queue update simulator (simulating OPD counter movement)
  useEffect(() => {
    const timer = setInterval(() => {
      setDoctors((prevDocs) =>
        prevDocs.map((doc) => {
          // 25% chance of token advancing by 1
          if (Math.random() < 0.25 && doc.currentStatus === 'in_consultation') {
            const nextTok = doc.currentToken + 1;
            const wait = Math.max(5, doc.estimatedWaitMins - 2);
            return {
              ...doc,
              currentToken: nextTok,
              estimatedWaitMins: wait,
            };
          }
          return doc;
        })
      );
    }, 12000);

    return () => clearInterval(timer);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBookDoctor = (doc: Doctor, consultType: ConsultType) => {
    setBookingDoctor(doc);
    setBookingConsultType(consultType);
    handleNavigate('booking');
  };

  const handleBookingComplete = (booking: AppointmentBooking) => {
    setMyBookings((prev) => [booking, ...prev]);
  };

  const handleAddVitalLog = (vital: VitalsLog) => {
    setVitalsHistory((prev) => [vital, ...prev]);
  };

  const handleUpdateMedicationStatus = (id: string, status: 'taken' | 'snoozed' | 'skipped') => {
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id === id) {
          return {
            ...med,
            status,
            takenToday: status === 'taken',
            lastTakenAt: status === 'taken' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : med.lastTakenAt,
          };
        }
        return med;
      })
    );
  };

  const handleAddMedication = (newMed: MedicationReminder) => {
    setMedications((prev) => [newMed, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Bar Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onEmergencyClick={() => setEmergencyModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section with Quick Specialty Search */}
        <HeroSection
          currentLang={currentLang}
          onNavigate={handleNavigate}
          onSelectSpecialty={(spec) => {
            setSelectedSpecialty(spec);
            handleNavigate('availability');
          }}
        />

        {/* Real-time Doctor Availability Dashboard */}
        <DoctorAvailabilityDashboard
          doctors={doctors}
          currentLang={currentLang}
          selectedSpecialty={selectedSpecialty}
          onSelectSpecialty={setSelectedSpecialty}
          onBookDoctor={handleBookDoctor}
        />

        {/* Streamlined Appointment Booking Section */}
        <AppointmentBookingSection
          doctors={doctors}
          currentLang={currentLang}
          selectedDoctor={bookingDoctor}
          initialConsultType={bookingConsultType}
          onBookingComplete={handleBookingComplete}
        />

        {/* Secure Patient Portal for Managing Health Records */}
        <PatientPortal
          currentLang={currentLang}
          profiles={profiles}
          activeProfile={activeProfile}
          onSelectProfile={setActiveProfile}
          healthRecords={healthRecords}
          vitalsHistory={vitalsHistory}
          onAddVitalLog={handleAddVitalLog}
        />

        {/* Automated Medication Reminders */}
        <MedicationReminders
          currentLang={currentLang}
          medications={medications}
          onUpdateMedicationStatus={handleUpdateMedicationStatus}
          onAddMedication={handleAddMedication}
        />

        {/* Encrypted Chat Support for Provider Consultations */}
        <EncryptedConsultationChat
          currentLang={currentLang}
          activeProfile={activeProfile}
          onEmergencyClick={() => setEmergencyModalOpen(true)}
        />

        {/* Interactive Patient Resources & Clinical Triage */}
        <InteractivePatientResources
          currentLang={currentLang}
          onNavigateToBooking={(specialty) => {
            if (specialty) setSelectedSpecialty(specialty);
            handleNavigate('booking');
          }}
          onEmergencyClick={() => setEmergencyModalOpen(true)}
        />

        {/* Hospital Location & Interactive Map (Google Maps Link Integration) */}
        <HospitalLocationMap
          currentLang={currentLang}
          onEmergencyClick={() => setEmergencyModalOpen(true)}
        />
      </main>

      {/* 24x7 Apollo Emergency Hotline Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        currentLang={currentLang}
      />

      {/* Quiet Corporate Healthcare Footer */}
      <Footer
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        onNavigate={handleNavigate}
        onEmergencyClick={() => setEmergencyModalOpen(true)}
      />

    </div>
  );
}
