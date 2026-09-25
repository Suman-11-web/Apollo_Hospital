import { LanguageCode } from '../types';

export interface Translations {
  hospitalName: string;
  campusName: string;
  tagline: string;
  nav: {
    findDoctor: string;
    liveAvailability: string;
    bookAppointment: string;
    patientPortal: string;
    medications: string;
    resources: string;
    hospitalMap: string;
    emergencyCall: string;
    consultChat: string;
  };
  hero: {
    badge: string;
    headline: string;
    highlight: string;
    subheadline: string;
    searchPlaceholder: string;
    quickBookCTA: string;
    viewLiveQueueCTA: string;
    openPortalCTA: string;
    stat1Label: string;
    stat1Value: string;
    stat2Label: string;
    stat2Value: string;
    stat3Label: string;
    stat3Value: string;
    stat4Label: string;
    stat4Value: string;
  };
  liveDashboard: {
    title: string;
    subtitle: string;
    activeConsultations: string;
    allDepartments: string;
    availableOnly: string;
    teleconsultOnly: string;
    currentToken: string;
    nextSlot: string;
    estWait: string;
    mins: string;
    room: string;
    statusAvailable: string;
    statusConsulting: string;
    statusSurgery: string;
    statusBreak: string;
    bookConsultBtn: string;
    teleconsultBtn: string;
  };
  booking: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    selectSpecialty: string;
    selectDoctor: string;
    selectDate: string;
    selectTimeSlot: string;
    consultMode: string;
    inPerson: string;
    videoConsult: string;
    patientDetails: string;
    fullName: string;
    phone: string;
    email: string;
    uhidOptional: string;
    reasonForVisit: string;
    confirmBooking: string;
    confirmedSuccess: string;
    tokenAssigned: string;
    downloadPass: string;
    addToCalendar: string;
  };
  portal: {
    title: string;
    subtitle: string;
    lockTitle: string;
    lockDesc: string;
    enterPin: string;
    unlockVault: string;
    switchProfile: string;
    vitalsTitle: string;
    reportsTitle: string;
    prescriptionsTitle: string;
    addVital: string;
    viewReport: string;
    normal: string;
    followUp: string;
    downloadPdf: string;
  };
  medications: {
    title: string;
    subtitle: string;
    adherenceRate: string;
    todayDoses: string;
    markTaken: string;
    snooze: string;
    taken: string;
    refillNeeded: string;
    addMedication: string;
    pillsRemaining: string;
  };
  chat: {
    title: string;
    subtitle: string;
    encryptionBadge: string;
    encryptedNotice: string;
    inputPlaceholder: string;
    send: string;
    requestCall: string;
    attachRecord: string;
  };
  map: {
    title: string;
    subtitle: string;
    address: string;
    metroInfo: string;
    openInGoogleMaps: string;
    getDirections: string;
    emergencyGate: string;
    opdGate: string;
    parkingInfo: string;
  };
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    hospitalName: 'Apollo Hospitals',
    campusName: 'Indraprastha, New Delhi',
    tagline: 'World-Class Healthcare with Clinical Excellence',
    nav: {
      findDoctor: 'Find Doctors',
      liveAvailability: 'Live OPD Queue',
      bookAppointment: 'Book Appointment',
      patientPortal: 'Patient Portal',
      medications: 'Med Reminders',
      resources: 'Patient Guide',
      hospitalMap: 'Campus Map',
      emergencyCall: 'Emergency 1066',
      consultChat: 'Encrypted Consult',
    },
    hero: {
      badge: 'Indraprastha Apollo Hospitals · JCI Accredited',
      headline: 'Advanced Clinical Care &',
      highlight: 'Real-Time OPD Access',
      subheadline: 'Connecting you instantly with top specialists at Delhi Mathura Road. Live token tracking, automated medication management, and secure encrypted records vault.',
      searchPlaceholder: 'Search by Doctor, Specialty (e.g. Cardiology, Oncology, Neurology)...',
      quickBookCTA: 'Book Consultation',
      viewLiveQueueCTA: 'Check Live OPD Queue',
      openPortalCTA: 'Access Health Vault',
      stat1Label: 'Multi-Specialties',
      stat1Value: '52+',
      stat2Label: 'Bed Capacity',
      stat2Value: '710+',
      stat3Label: 'Surgeries Daily',
      stat3Value: '120+',
      stat4Label: 'Emergency Care',
      stat4Value: '24/7',
    },
    liveDashboard: {
      title: 'Real-Time Doctor Availability & Queue',
      subtitle: 'Live status synced with Apollo Indraprastha Hospital OPD counters',
      activeConsultations: 'Active In-Clinic Doctors',
      allDepartments: 'All Specialties',
      availableOnly: 'Available Right Now',
      teleconsultOnly: 'Teleconsult Ready',
      currentToken: 'Serving Token',
      nextSlot: 'Next Slot',
      estWait: 'Est. Wait',
      mins: 'mins',
      room: 'Room',
      statusAvailable: 'Available Now',
      statusConsulting: 'In Consultation',
      statusSurgery: 'In Operating Theater',
      statusBreak: 'Short Break',
      bookConsultBtn: 'Book OPD Slot',
      teleconsultBtn: 'Start Teleconsult',
    },
    booking: {
      title: 'Streamlined Appointment Booking',
      subtitle: 'Choose between In-Person Hospital OPD or High-Definition Video Teleconsultation',
      step1: '1. Select Specialist',
      step2: '2. Choose Date & Slot',
      step3: '3. Patient Information',
      step4: '4. Instant Confirmation',
      selectSpecialty: 'Medical Department',
      selectDoctor: 'Preferred Doctor',
      selectDate: 'Appointment Date',
      selectTimeSlot: 'Available Slot',
      consultMode: 'Consultation Mode',
      inPerson: 'Hospital In-Person OPD',
      videoConsult: 'Encrypted Tele-Video Visit',
      patientDetails: 'Patient Information',
      fullName: 'Full Patient Name',
      phone: 'Mobile Phone (+91)',
      email: 'Email Address',
      uhidOptional: 'Apollo UHID (if registered)',
      reasonForVisit: 'Brief Medical Concern / Symptoms',
      confirmBooking: 'Confirm & Generate OPD Token',
      confirmedSuccess: 'Appointment Confirmed Successfully!',
      tokenAssigned: 'Your Scheduled Token Number',
      downloadPass: 'Download Digital OPD Pass',
      addToCalendar: 'Add to Calendar (.ics)',
    },
    portal: {
      title: 'Secure Health Records Portal',
      subtitle: 'End-to-end encrypted medical vault compliant with digital healthcare privacy standards',
      lockTitle: 'Protected Health Records Vault',
      lockDesc: 'Your electronic medical records are client-encrypted. Enter your 4-digit PIN to authenticate.',
      enterPin: 'Enter 4-Digit Security PIN',
      unlockVault: 'Decrypt & Access Records',
      switchProfile: 'Switch Patient Profile',
      vitalsTitle: 'Monitored Vitals & Trends',
      reportsTitle: 'Diagnostic Lab & Imaging Reports',
      prescriptionsTitle: 'Active Prescriptions',
      addVital: 'Log New Reading',
      viewReport: 'View Clinical Details',
      normal: 'Within Normal Limits',
      followUp: 'Follow-Up Recommended',
      downloadPdf: 'Download Official PDF',
    },
    medications: {
      title: 'Automated Medication Schedule & Reminders',
      subtitle: 'Never miss a dose. Track daily adherence, scheduled timings, and pill refills.',
      adherenceRate: 'Weekly Adherence Score',
      todayDoses: "Today's Schedule",
      markTaken: 'Mark as Taken',
      snooze: 'Snooze 15m',
      taken: 'Taken',
      refillNeeded: 'Low Stock Refill Alert',
      addMedication: 'Add Prescription Reminder',
      pillsRemaining: 'Pills Left',
    },
    chat: {
      title: 'Encrypted Clinical Consultation',
      subtitle: 'Direct, secure communication channel with Apollo Care Coordinators & on-duty specialists',
      encryptionBadge: 'AES-256-GCM End-to-End Encrypted',
      encryptedNotice: 'Messages and clinical attachments in this channel are encrypted and private to your medical team.',
      inputPlaceholder: 'Ask a clinical question or report symptoms...',
      send: 'Send Secure Message',
      requestCall: 'Request Urgent Call',
      attachRecord: 'Attach Lab Report',
    },
    map: {
      title: 'Indraprastha Apollo Hospital Campus & Directions',
      subtitle: 'Located on Delhi Mathura Road, opposite Jasola Apollo Metro Station',
      address: 'Sarita Vihar, Delhi Mathura Road, New Delhi, Delhi 110076',
      metroInfo: 'Delhi Metro Violet Line: Jasola Apollo Station (Direct Skywalk to Gate 3)',
      openInGoogleMaps: 'Open in Google Maps',
      getDirections: 'Campus Navigation & Gates',
      emergencyGate: 'Gate 2: 24/7 Emergency & Trauma Bay',
      opdGate: 'Gate 1: Main OPD Reception & Visitor Parking',
      parkingInfo: 'Ample multi-level valet & patient parking available at Gate 1 and Gate 4',
    },
  },
  hi: {
    hospitalName: 'अपोलो हॉस्पिटल्स',
    campusName: 'इंद्रप्रस्थ, नई दिल्ली',
    tagline: 'नैदानिक उत्कृष्टता के साथ विश्वस्तरीय स्वास्थ्य सेवा',
    nav: {
      findDoctor: 'डॉक्टर खोजें',
      liveAvailability: 'लाइव ओपीडी कतार',
      bookAppointment: 'अपॉइंटमेंट बुक करें',
      patientPortal: 'मरीज़ पोर्टल',
      medications: 'दवा अनुस्मारक',
      resources: 'मरीज़ गाइड',
      hospitalMap: 'अस्पताल का नक्शा',
      emergencyCall: 'आपातकालीन 1066',
      consultChat: 'सुरक्षित परामर्श',
    },
    hero: {
      badge: 'इंद्रप्रस्थ अपोलो हॉस्पिटल्स · जेसीआई मान्यता प्राप्त',
      headline: 'उन्नत नैदानिक देखभाल एवं',
      highlight: 'रियल-टाइम ओपीडी उपलब्धता',
      subheadline: 'दिल्ली मथुरा रोड स्थित शीर्ष विशेषज्ञों से तुरंत जुड़ें। लाइव टोकन ट्रैकिंग, स्वचालित दवा अनुस्मारक और सुरक्षित एन्क्रिप्टेड स्वास्थ्य रिकॉर्ड।',
      searchPlaceholder: 'डॉक्टर या विशेषज्ञता खोजें (जैसे कॉर्डियोलॉजी, न्यूरोलॉजी)...',
      quickBookCTA: 'परामर्श बुक करें',
      viewLiveQueueCTA: 'लाइव ओपीडी कतार देखें',
      openPortalCTA: 'स्वास्थ्य वॉल्ट खोलें',
      stat1Label: 'विशेषताएं',
      stat1Value: '52+',
      stat2Label: 'बेड क्षमता',
      stat2Value: '710+',
      stat3Label: 'दैनिक सर्जरी',
      stat3Value: '120+',
      stat4Label: 'आपातकालीन सेवा',
      stat4Value: '24/7',
    },
    liveDashboard: {
      title: 'रियल-टाइम डॉक्टर उपलब्धता एवं कतार',
      subtitle: 'अपोलो इंद्रप्रस्थ ओपीडी काउंटरों से सीधे सिंक्रोनाइज़्ड लाइव स्थिति',
      activeConsultations: 'सक्रिय क्लिनिक डॉक्टर',
      allDepartments: 'सभी विभाग',
      availableOnly: 'अभी उपलब्ध',
      teleconsultOnly: 'टेली-परामर्श तैयार',
      currentToken: 'चल रहा टोकन',
      nextSlot: 'अगला स्लॉट',
      estWait: 'अनुमानित प्रतीक्षा',
      mins: 'मिनट',
      room: 'कमरा',
      statusAvailable: 'अभी उपलब्ध',
      statusConsulting: 'परामर्श जारी',
      statusSurgery: 'ऑपरेशन थिएटर में',
      statusBreak: 'लघु विराम',
      bookConsultBtn: 'ओपीडी स्लॉट बुक करें',
      teleconsultBtn: 'टेली-परामर्श शुरू करें',
    },
    booking: {
      title: 'सुगम अपॉइंटमेंट बुकिंग',
      subtitle: 'अस्पताल ओपीडी या हाई-डेफिनिशन वीडियो टेली-परामर्श चुनें',
      step1: '1. विशेषज्ञ चुनें',
      step2: '2. दिनांक व समय',
      step3: '3. मरीज़ की जानकारी',
      step4: '4. त्वरित पुष्टि',
      selectSpecialty: 'चिकित्सा विभाग',
      selectDoctor: 'पसंदीदा डॉक्टर',
      selectDate: 'अपॉइंटमेंट की तारीख',
      selectTimeSlot: 'उपलब्ध समय स्लॉट',
      consultMode: 'परामर्श का प्रकार',
      inPerson: 'अस्पताल ओपीडी',
      videoConsult: 'सुरक्षित वीडियो टेली-कंसल्ट',
      patientDetails: 'मरीज़ की जानकारी',
      fullName: 'मरीज़ का पूरा नाम',
      phone: 'मोबाइल नंबर (+91)',
      email: 'ईमेल पता',
      uhidOptional: 'अपोलो यूएचआईडी (यदि है)',
      reasonForVisit: 'समस्या या लक्षण',
      confirmBooking: 'पुष्टि करें और टोकन पाएं',
      confirmedSuccess: 'अपॉइंटमेंट सफलतापूर्वक बुक हो गया!',
      tokenAssigned: 'आपका निर्धारित टोकन नंबर',
      downloadPass: 'डिजिटल ओपीडी पास डाउनलोड करें',
      addToCalendar: 'कैलेंडर में जोड़ें (.ics)',
    },
    portal: {
      title: 'सुरक्षित स्वास्थ्य रिकॉर्ड पोर्टल',
      subtitle: 'एंड-टू-एंड एन्क्रिप्टेड डिजिटल मेडिकल वॉल्ट',
      lockTitle: 'सुरक्षित स्वास्थ्य रिकॉर्ड वॉल्ट',
      lockDesc: 'आपके मेडिकल रिकॉर्ड एन्क्रिप्टेड हैं। एक्सेस करने के लिए 4-अंकीय पिन दर्ज करें।',
      enterPin: '4-अंकीय सुरक्षा पिन दर्ज करें',
      unlockVault: 'अनलॉक और रिकॉर्ड देखें',
      switchProfile: 'मरीज़ प्रोफ़ाइल बदलें',
      vitalsTitle: 'स्वास्थ्य संकेत एवं रुझान',
      reportsTitle: 'लैब एवं इमेजिंग रिपोर्ट',
      prescriptionsTitle: 'सक्रिय दवा नुस्खे',
      addVital: 'नई रीडिंग जोड़ें',
      viewReport: 'विवरण देखें',
      normal: 'सामान्य सीमा में',
      followUp: 'फॉलो-अप आवश्यक',
      downloadPdf: 'आधिकारिक पीडीएफ डाउनलोड करें',
    },
    medications: {
      title: 'स्वचालित दवा अनुसूची व अनुस्मारक',
      subtitle: 'एक भी खुराक न भूलें। दैनिक समय और दवा स्टॉक ट्रैक करें।',
      adherenceRate: 'साप्ताहिक अनुपालन दर',
      todayDoses: 'आज की खुराकें',
      markTaken: 'ली गई के रूप में चिह्नित करें',
      snooze: '15 मिनट बाद',
      taken: 'ली गई',
      refillNeeded: 'रीफिल अलर्ट (कम स्टॉक)',
      addMedication: 'दवा अनुस्मारक जोड़ें',
      pillsRemaining: 'गोलियां शेष',
    },
    chat: {
      title: 'एन्क्रिप्टेड डॉक्टर परामर्श',
      subtitle: 'अपोलो केयर टीम और डॉक्टरों के साथ सीधा सुरक्षित संदेश चैनल',
      encryptionBadge: 'AES-256 एन्क्रिप्टेड',
      encryptedNotice: 'इस चैनल में संदेश और मेडिकल फ़ाइलें पूरी तरह सुरक्षित व निजी हैं।',
      inputPlaceholder: 'चिकित्सा प्रश्न पूछें या लक्षण बताएं...',
      send: 'सुरक्षित संदेश भेजें',
      requestCall: 'तुरंत कॉल का अनुरोध करें',
      attachRecord: 'लैब रिपोर्ट संलग्न करें',
    },
    map: {
      title: 'इंद्रप्रस्थ अपोलो अस्पताल परिसर व दिशा-निर्देश',
      subtitle: 'दिल्ली मथुरा रोड, जसोला अपोलो मेट्रो स्टेशन के सामने',
      address: 'सरिता विहार, दिल्ली मथुरा रोड, नई दिल्ली - 110076',
      metroInfo: 'वायलेट लाइन मेट्रो: जसोला अपोलो स्टेशन (गेट 3 के लिए डायरेक्ट स्काईवॉक)',
      openInGoogleMaps: 'गूगल मैप्स में खोलें',
      getDirections: 'परिसर गेट व दिशा-निर्देश',
      emergencyGate: 'गेट 2: 24/7 आपातकालीन एवं ट्रॉमा बे',
      opdGate: 'गेट 1: मुख्य ओपीडी रिसेप्शन और पार्किंग',
      parkingInfo: 'गेट 1 और गेट 4 पर मल्टी-लेवल वैलेट और मरीज़ पार्किंग उपलब्ध',
    },
  },
  bn: {
    hospitalName: 'অ্যাপোলো হসপিটালস',
    campusName: 'ইন্দ্রপ্রস্থ, নয়াদিল্লি',
    tagline: 'ক্লিনিক্যাল শ্রেষ্ঠত্বের সাথে বিশ্বমানের স্বাস্থ্যসেবা',
    nav: {
      findDoctor: 'ডাক্তার খুঁজুন',
      liveAvailability: 'লাইভ ওপিডি কিউ',
      bookAppointment: 'অ্যাপয়েন্টমেন্ট বুকিং',
      patientPortal: 'পেশেন্ট পোর্টাল',
      medications: 'ওষুধের অনুস্মারক',
      resources: 'রোগী গাইড',
      hospitalMap: 'হাসপাতালের ম্যাপ',
      emergencyCall: 'জরুরি ১০৬৬',
      consultChat: 'নিরাপদ পরামর্শ',
    },
    hero: {
      badge: 'ইন্দ্রপ্রস্থ অ্যাপোলো হসপিটালস · JCI অনুমোদিত',
      headline: 'উন্নত চিকিৎসা সেবা ও',
      highlight: 'রিয়েল-টাইম ওপিডি অ্যাক্সেস',
      subheadline: 'দিল্লি মথুরা রোডের শীর্ষ বিশেষজ্ঞদের সাথে অবিলম্বে যুক্ত হন। লাইভ টোকেন ট্র্যাকিং এবং সুরক্ষিত স্বাস্থ্য রেকর্ড।',
      searchPlaceholder: 'ডাক্তার বা বিশেষজ্ঞতা সন্ধান করুন...',
      quickBookCTA: 'পরামর্শ বুক করুন',
      viewLiveQueueCTA: 'লাইভ ওপিডি কিউ দেখুন',
      openPortalCTA: 'স্বাস্থ্য ভল্ট খুলুন',
      stat1Label: 'বিশেষজ্ঞ বিভাগ',
      stat1Value: '৫২+',
      stat2Label: 'বেড ক্ষমতা',
      stat2Value: '৭১০+',
      stat3Label: 'দৈনিক সার্জারি',
      stat3Value: '১২০+',
      stat4Label: 'জরুরি সেবা',
      stat4Value: '২৪/৭',
    },
    liveDashboard: {
      title: 'রিয়েল-টাইম ডাক্তার উপস্থিতি ও কিউ',
      subtitle: 'অ্যাপোলো ইন্দ্রপ্রস্থ ওপিডি কাউন্টারের সাথে সরাসরি সংযুক্ত',
      activeConsultations: 'সক্রিয় ডাক্তারবৃন্দ',
      allDepartments: 'সকল বিভাগ',
      availableOnly: 'এখনই উপলব্ধ',
      teleconsultOnly: 'টেলিকনসাল্ট প্রস্তুত',
      currentToken: 'চলমান টোকেন',
      nextSlot: 'পরবর্তী স্লট',
      estWait: 'আনুমানিক অপেক্ষা',
      mins: 'মিনিট',
      room: 'রুম',
      statusAvailable: 'এখনই উপলব্ধ',
      statusConsulting: 'পরামর্শ চলছে',
      statusSurgery: 'অপারেশন থিয়েটারে',
      statusBreak: 'বিরতি',
      bookConsultBtn: 'ওপিডি স্লট বুক করুন',
      teleconsultBtn: 'টেলিকনসাল্ট শুরু করুন',
    },
    booking: {
      title: 'সহজ অ্যাপয়েন্টমেন্ট বুকিং',
      subtitle: 'হাসপাতাল ওপিডি অথবা ভিডিও টেলিকনসালটেশন বেছে নিন',
      step1: '১. বিশেষজ্ঞ নির্বাচন',
      step2: '২. তারিখ ও সময়',
      step3: '৩. রোগীর বিবরণ',
      step4: '৪. তাৎক্ষণিক নিশ্চিতকরণ',
      selectSpecialty: 'চিকিৎসা বিভাগ',
      selectDoctor: 'পছন্দের ডাক্তার',
      selectDate: 'অ্যাপয়েন্টমেন্টের তারিখ',
      selectTimeSlot: 'উপলব্ধ সময়',
      consultMode: 'পরামর্শের মাধ্যম',
      inPerson: 'হাসপাতাল ওপিডি',
      videoConsult: 'ভিডিও পরামর্শ',
      patientDetails: 'রোগীর তথ্য',
      fullName: 'রোগীর পুরো নাম',
      phone: 'মোবাইল নম্বর',
      email: 'ইমেল ঠিকানা',
      uhidOptional: 'অ্যাপোলো UHID (যদি থাকে)',
      reasonForVisit: 'লক্ষণ বা স্বাস্থ্য সমস্যা',
      confirmBooking: 'নিশ্চিত করুন এবং টোকেন পান',
      confirmedSuccess: 'অ্যাপয়েন্টমেন্ট সফলভাবে সম্পন্ন হয়েছে!',
      tokenAssigned: 'আপনার টোকেন নম্বর',
      downloadPass: 'ডিজিটাল ওপিডি পাস ডাউনলোড',
      addToCalendar: 'ক্যালেন্ডারে যোগ করুন',
    },
    portal: {
      title: 'নিরাপদ স্বাস্থ্য রেকর্ড পোর্টাল',
      subtitle: 'এন্ড-টু-এন্ড এনক্রিপ্ট করা ডিজিটাল মেডিকেল ভল্ট',
      lockTitle: 'সুরক্ষিত স্বাস্থ্য রেকর্ড ভল্ট',
      lockDesc: 'আপনার রেকর্ড নিরাপদে সংরক্ষিত। অ্যাক্সেস করতে ৪-সংখ্যার পিন দিন।',
      enterPin: '৪-সংখ্যার পিন লিখুন',
      unlockVault: 'আনলক করুন',
      switchProfile: 'প্রোফাইল পরিবর্তন',
      vitalsTitle: 'স্বাস্থ্য পরিমাপ ও ট্রেন্ড',
      reportsTitle: 'ল্যাব ও রেডিওলজি রিপোর্ট',
      prescriptionsTitle: 'প্রেসক্রিপশন',
      addVital: 'নতুন রিডিং যোগ করুন',
      viewReport: 'বিস্তারিত দেখুন',
      normal: 'স্বাভাবিক',
      followUp: 'ফলো-আপ প্রয়োজন',
      downloadPdf: 'পিডিএফ ডাউনলোড করুন',
    },
    medications: {
      title: 'স্বয়ংক্রিয় ওষুধের সময়সূচী ও রিমাইন্ডার',
      subtitle: 'কোন ডোজ ভুলবেন না। ওষুধের সময় ও স্টক নিরীক্ষণ করুন।',
      adherenceRate: 'সাপ্তাহিক স্কোর',
      todayDoses: 'আজকের ওষুধ',
      markTaken: 'খাওয়া হয়েছে',
      snooze: '১৫ মিনিট পর',
      taken: 'সম্পন্ন',
      refillNeeded: 'স্টক কম সতর্কতা',
      addMedication: 'নতুন ওষুধ যুক্ত করুন',
      pillsRemaining: 'অবশিষ্ট ওষুধ',
    },
    chat: {
      title: 'এনক্রিপ্ট করা পরামর্শ চ্যাট',
      subtitle: 'অ্যাপোলো মেডিকেল টিমের সাথে নিরাপদ যোগাযোগ',
      encryptionBadge: 'AES-256 এনক্রিপ্ট করা',
      encryptedNotice: 'আপনার কথোপকথন ও প্রেসক্রিপশন সম্পূর্ণ গোপন ও সুরক্ষিত।',
      inputPlaceholder: 'আপনার প্রশ্ন বা সমস্যা লিখুন...',
      send: 'বার্তা পাঠান',
      requestCall: 'জরুরি কল অনুরোধ',
      attachRecord: 'রিপোর্ট যুক্ত করুন',
    },
    map: {
      title: 'ইন্দ্রপ্রস্থ অ্যাপোলো ক্যাম্পাস ও দিকনির্দেশনা',
      subtitle: 'দিল্লি মথুরা রোড, জসোলা অ্যাপোলো মেট্রো স্টেশনের বিপরীতে',
      address: 'সারিতা বিহার, দিল্লি মথুরা রোড, নয়াদিল্লি - ১১০০৭৬',
      metroInfo: 'ভায়োলেট লাইন মেট্রো: জসোলা অ্যাপোলো স্টেশন (গেট ৩ সরাসরি স্কাইওয়াক)',
      openInGoogleMaps: 'গুগল ম্যাপে দেখুন',
      getDirections: 'ক্যাম্পাস গেট ও নেভিগেশন',
      emergencyGate: 'গেট ২: ২৪/৭ জরুরি ও ট্রমা সেন্টার',
      opdGate: 'গেট ১: মূল ওপিডি অভ্যর্থনা ও পার্কিং',
      parkingInfo: 'গেট ১ ও ৪-এ রোগী ও ভ্যালেট পার্কিং উপলব্ধ',
    },
  },
  ta: {
    hospitalName: 'அப்போலோ மருத்துவமனை',
    campusName: 'இந்திரபிரஸ்தா, புது தில்லி',
    tagline: 'மருத்துவ சிறப்புடன் உலகத்தரம் வாய்ந்த சிகிச்சை',
    nav: {
      findDoctor: 'மருத்துவரைக் கண்டறியவும்',
      liveAvailability: 'நேரலை OPD வரிசை',
      bookAppointment: 'முன்பதிவு செய்ய',
      patientPortal: 'நோயாளி போர்டல்',
      medications: 'மருந்து நினைவூட்டல்',
      resources: 'வழிகாட்டி',
      hospitalMap: 'வரைபடம்',
      emergencyCall: 'அவசர உதவி 1066',
      consultChat: 'பாதுகாப்பான உரையாடல்',
    },
    hero: {
      badge: 'இந்திரபிரஸ்தா அப்போலோ மருத்துவமனை · JCI அங்கீகாரம்',
      headline: 'மேம்பட்ட மருத்துவ பராமரிப்பு &',
      highlight: 'நேரலை OPD அணுகல்',
      subheadline: 'தில்லி மதுரா சாலையில் உள்ள முன்னணி மருத்துவ நிபுணர்களை உடனே அணுகுங்கள். நேரலை வரிசை கண்காணிப்பு மற்றும் பாதுகாப்பான பதிவுகள்.',
      searchPlaceholder: 'மருத்துவர் அல்லது துறையைத் தேடுங்கள்...',
      quickBookCTA: 'முன்பதிவு செய்க',
      viewLiveQueueCTA: 'நேரலை வரிசையை காண்க',
      openPortalCTA: 'மருத்துவ போர்டல்',
      stat1Label: 'சிறப்பு துறைகள்',
      stat1Value: '52+',
      stat2Label: 'படுக்கைகள்',
      stat2Value: '710+',
      stat3Label: 'தினசரி அறுவைசிகிச்சை',
      stat3Value: '120+',
      stat4Label: 'அவசர சிகிச்சை',
      stat4Value: '24/7',
    },
    liveDashboard: {
      title: 'நேரலை மருத்துவர் இருப்பு & வரிசை',
      subtitle: 'அப்போலோ இந்திரபிரஸ்தா OPD கவுண்டர்களுடன் இணைக்கப்பட்ட நேரலை நிலை',
      activeConsultations: 'செயலில் உள்ள மருத்துவர்கள்',
      allDepartments: 'அனைத்து துறைகள்',
      availableOnly: 'இப்போது இருப்பவர்கள்',
      teleconsultOnly: 'ஆன்லைன் ஆலோசனை',
      currentToken: 'தற்போதைய டோக்கன்',
      nextSlot: 'அடுத்த நேரம்',
      estWait: 'காத்திருப்பு நேரம்',
      mins: 'நிமிடம்',
      room: 'அறை',
      statusAvailable: 'இப்போது கிடைக்கும்',
      statusConsulting: 'ஆலோசனையில் உள்ளார்',
      statusSurgery: 'அறுவை அரங்கில் உள்ளார்',
      statusBreak: 'இடைவேளை',
      bookConsultBtn: 'நேரில் முன்பதிவு',
      teleconsultBtn: 'வீடியோ ஆலோசனை',
    },
    booking: {
      title: 'எளிதான முன்பதிவு அமைப்பு',
      subtitle: 'மருத்துவமனை நேரடி OPD அல்லது உயர் தர வீடியோ ஆலோசனையை தேர்ந்தெடுக்கவும்',
      step1: '1. மருத்துவர் தேர்வு',
      step2: '2. தேதி & நேரம்',
      step3: '3. நோயாளி தகவல்',
      step4: '4. உடனடி உறுதிப்படுத்தல்',
      selectSpecialty: 'மருத்துவ பிரிவு',
      selectDoctor: 'விரும்பிய மருத்துவர்',
      selectDate: 'முன்பதிவு தேதி',
      selectTimeSlot: 'கிடைக்கும் நேரம்',
      consultMode: 'ஆலோசனை முறை',
      inPerson: 'மருத்துவமனை OPD',
      videoConsult: 'வீடியோ ஆலோசனை',
      patientDetails: 'நோயாளி விவரங்கள்',
      fullName: 'முழு பெயர்',
      phone: 'கைபேசி எண்',
      email: 'மின்னஞ்சல்',
      uhidOptional: 'அப்போலோ UHID (இருப்பின்)',
      reasonForVisit: 'காரணம் / அறிகுறிகள்',
      confirmBooking: 'உறுதி செய்து டோக்கன் பெறவும்',
      confirmedSuccess: 'முன்பதிவு வெற்றிகரமாக முடிந்தது!',
      tokenAssigned: 'உங்கள் டோக்கன் எண்',
      downloadPass: 'டிஜிட்டல் பாஸ் பதிவிறக்கம்',
      addToCalendar: 'காலெண்டரில் சேர்க்க',
    },
    portal: {
      title: 'பாதுகாப்பான மருத்துவ பதிவுகள் போர்டல்',
      subtitle: 'என்க்ரிப்ட் செய்யப்பட்ட டிஜிட்டல் சுகாதார பெட்டகம்',
      lockTitle: 'பாதுகாக்கப்பட்ட மருத்துவ பெட்டகம்',
      lockDesc: 'உங்கள் தகவல்கள் பாதுகாக்கப்பட்டுள்ளது. அணுக 4-இலக்க பின் எண்ணை உள்ளிடவும்.',
      enterPin: '4-இலக்க பின் உள்ளிடவும்',
      unlockVault: 'திறக்க',
      switchProfile: 'சுயவிவரம் மாற்றுக',
      vitalsTitle: 'உடல் நல அளவீடுகள்',
      reportsTitle: 'பரிசோதனை அறிக்கைகள்',
      prescriptionsTitle: 'மருந்து பரிந்துரைகள்',
      addVital: 'புதிய அளவீடு சேர்க்க',
      viewReport: 'அறிக்கையை காண்க',
      normal: 'இயல்பானது',
      followUp: 'பின்தொடர்தல் தேவை',
      downloadPdf: 'PDF பதிவிறக்கம்',
    },
    medications: {
      title: 'தானியங்கி மருந்து அட்டவணை',
      subtitle: 'எந்த மருந்தையும் மறக்காதீர்கள். தினசரி நேரம் மற்றும் இருப்பு கண்காணிப்பு.',
      adherenceRate: 'வாராந்திர குறியீடு',
      todayDoses: 'இன்றைய மருந்துகள்',
      markTaken: 'எடுத்துக்கொண்டேன்',
      snooze: '15 நிமிடம் கழித்து',
      taken: 'முடிக்கப்பட்டது',
      refillNeeded: 'மருந்து வாங்கவும்',
      addMedication: 'மருந்து சேர்க்க',
      pillsRemaining: 'மீதமுள்ள மாத்திரைகள்',
    },
    chat: {
      title: 'பாதுகாப்பான மருத்துவ உரையாடல்',
      subtitle: 'மருத்துவர்கள் மற்றும் ஒருங்கிணைப்பாளர்களுடன் நேரடி உரையாடல்',
      encryptionBadge: 'AES-256 பாதுகாப்பு',
      encryptedNotice: 'இந்த உரையாடல்கள் அனைத்தும் முழுமையாக பாதுகாக்கப்பட்டவை.',
      inputPlaceholder: 'உங்கள் சந்தேகத்தை தட்டச்சு செய்க...',
      send: 'அனுப்புக',
      requestCall: 'அழைப்பு கோருக',
      attachRecord: 'அறிக்கை இணைக்க',
    },
    map: {
      title: 'இந்திரபிரஸ்தா அப்போலோ வளாகம் & வழிகள்',
      subtitle: 'தில்லி மதுரா சாலை, ஜசோலா அப்போலோ மெட்ரோ நிலையம் எதிரில்',
      address: 'சரிதா விஹார், தில்லி மதுரா சாலை, புது தில்லி - 110076',
      metroInfo: 'மெட்ரோ வயலட் வழித்தடம்: ஜசோலா அப்போலோ நிலையம் (கேட் 3 நேரடி பாலம்)',
      openInGoogleMaps: 'கூகிள் வரைபடத்தில் திறக்க',
      getDirections: 'வளாக வழிகாட்டல்',
      emergencyGate: 'கேட் 2: 24/7 அவசர சிகிச்சை & விபத்து பிரிவு',
      opdGate: 'கேட் 1: முக்கிய வரவேற்பு & வாகன நிறுத்துமிடம்',
      parkingInfo: 'கேட் 1 & கேட் 4-ல் போதிய வாகன நிறுத்துமிடம் உள்ளது',
    },
  },
  te: {
    hospitalName: 'అపోలో హాస్పిటల్స్',
    campusName: 'ఇంద్రప్రస్థ, న్యూఢిల్లీ',
    tagline: 'క్లినికల్ ఎక్సలెన్స్‌తో ప్రపంచ స్థాయి వైద్య సేవలు',
    nav: {
      findDoctor: 'వైద్యులను కనుగొనండి',
      liveAvailability: 'లైవ్ OPD క్యూ',
      bookAppointment: 'అపాయింట్‌మెంట్ బుకింగ్',
      patientPortal: 'పేషెంట్ పోర్టల్',
      medications: 'మందుల రిమైండర్',
      resources: 'పేషెంట్ గైడ్',
      hospitalMap: 'హాస్పిటల్ మ్యాప్',
      emergencyCall: 'అత్యవసర 1066',
      consultChat: 'సురక్షిత సంప్రదింపు',
    },
    hero: {
      badge: 'ఇంద్రప్రస్థ అపోలో హాస్పిటల్స్ · JCI గుర్తింపు',
      headline: 'అధునాతన క్లినికల్ కేర్ &',
      highlight: 'రియల్-టైమ్ OPD యాక్సెస్',
      subheadline: 'ఢిల్లీ మధుర రోడ్‌లోని ప్రముఖ నిపుణులతో వెంటనే కనెక్ట్ అవ్వండి. లైవ్ టోకెన్ ట్రాకింగ్ మరియు సురక్షిత రికార్డులు.',
      searchPlaceholder: 'వైద్యుడు లేదా స్పెషాలిటీ కోసం వెతకండి...',
      quickBookCTA: 'బుక్ చేసుకోండి',
      viewLiveQueueCTA: 'లైవ్ క్యూ చూడండి',
      openPortalCTA: 'హెల్త్ వాల్ట్ తెరవండి',
      stat1Label: 'స్పెషాలిటీలు',
      stat1Value: '52+',
      stat2Label: 'బెడ్స్ సామర్థ్యం',
      stat2Value: '710+',
      stat3Label: 'రోజువారీ సర్జరీలు',
      stat3Value: '120+',
      stat4Label: 'అత్యవసర సంరక్షణ',
      stat4Value: '24/7',
    },
    liveDashboard: {
      title: 'రియల్-టైమ్ వైద్యుల లభ్యత & క్యూ',
      subtitle: 'అపోలో ఇంద్రప్రస్థ OPD కౌంటర్లతో లైవ్ సింక్',
      activeConsultations: 'కన్సల్టేషన్ లో ఉన్న వైద్యులు',
      allDepartments: 'అన్ని విభాగాలు',
      availableOnly: 'ఇప్పుడే అందుబాటులో ఉన్నవారు',
      teleconsultOnly: 'ఆన్‌లైన్ కన్సల్టేషన్',
      currentToken: 'ప్రస్తుత టోకెన్',
      nextSlot: 'తదుపరి సమయం',
      estWait: 'వేచి ఉండే సమయం',
      mins: 'నిమిషాలు',
      room: 'గది',
      statusAvailable: 'ఇప్పుడే లభ్యం',
      statusConsulting: 'కన్సల్టేషన్ జరుగుతోంది',
      statusSurgery: 'ఆపరేషన్ థియేటర్‌లో ఉన్నారు',
      statusBreak: 'విరామం',
      bookConsultBtn: 'OPD స్లాట్ బుక్ చేయండి',
      teleconsultBtn: 'వీడియో కన్సల్ట్ ప్రారంభించండి',
    },
    booking: {
      title: 'సరళమైన అపాయింట్‌మెంట్ బుకింగ్',
      subtitle: 'హాస్పిటల్ OPD లేదా హెచ్‌డీ వీడియో కన్సల్టేషన్ ఎంచుకోండి',
      step1: '1. స్పెషలిస్ట్ ఎంపిక',
      step2: '2. తేదీ & సమయం',
      step3: '3. పేషెంట్ వివరాలు',
      step4: '4. తక్షణ నిర్ధారణ',
      selectSpecialty: 'వైద్య విభాగం',
      selectDoctor: 'కోరుకున్న వైద్యుడు',
      selectDate: 'తేదీ',
      selectTimeSlot: 'అందుబాటులో ఉన్న సమయం',
      consultMode: 'కన్సల్టేషన్ రకం',
      inPerson: 'హాస్పిటల్ OPD',
      videoConsult: 'వీడియో కన్సల్టేషన్',
      patientDetails: 'రోగి సమాచారం',
      fullName: 'పూర్తి పేరు',
      phone: 'ఫోన్ నంబర్',
      email: 'ఈమెయిల్ చిరునామా',
      uhidOptional: 'అపోలో UHID (ఉంటే)',
      reasonForVisit: 'లక్షణాలు లేదా సమస్య',
      confirmBooking: 'నిర్ధారించి టోకెన్ పొందండి',
      confirmedSuccess: 'అపాయింట్‌మెంట్ విజయవంతంగా ఖరారైంది!',
      tokenAssigned: 'మీ టోకెన్ సంఖ్య',
      downloadPass: 'డిజిటల్ పాస్ డౌన్‌లోడ్',
      addToCalendar: 'క్యాలెండర్‌కు జోడించండి',
    },
    portal: {
      title: 'సురక్షిత హెల్త్ రికార్డ్స్ పోర్టల్',
      subtitle: 'ఎండ్-టు-ఎండ్ ఎన్‌క్రిప్టెడ్ డిజిటల్ మెడికల్ వాల్ట్',
      lockTitle: 'రక్షిత హెల్త్ రికార్డ్స్ వాల్ట్',
      lockDesc: 'మీ వైద్య రికార్డులు సురక్షితంగా ఉన్నాయి. యాక్సెస్ చేయడానికి 4 అంకెల పిన్ నమోదు చేయండి.',
      enterPin: '4 అంకెల పిన్ ఇవ్వండి',
      unlockVault: 'అన్‌లాక్ చేయండి',
      switchProfile: 'ప్రొఫైల్ మార్చండి',
      vitalsTitle: 'ఆరోగ్య కొలతలు & ట్రెండ్స్',
      reportsTitle: 'ల్యాబ్ రిపోర్టులు',
      prescriptionsTitle: 'ప్రిస్క్రిప్షన్లు',
      addVital: 'కొత్త రీడింగ్ చేర్చండి',
      viewReport: 'వివరాలు చూడండి',
      normal: 'సాధారణం',
      followUp: 'ఫాలో-అప్ అవసరం',
      downloadPdf: 'PDF డౌన్‌లోడ్ చేయండి',
    },
    medications: {
      title: 'స్వయంచాలక మందుల షెడ్యూల్ & రిమైండర్లు',
      subtitle: 'డోస్ మిస్ అవ్వకండి. రోజువారీ సమయాలు మరియు నిల్వలను ట్రాక్ చేయండి.',
      adherenceRate: 'వారపు స్కోరు',
      todayDoses: 'నేటి మందులు',
      markTaken: 'వేసుకున్నాను',
      snooze: '15 నిమిషాల తర్వాత',
      taken: 'పూర్తయింది',
      refillNeeded: 'రీఫిల్ హెచ్చరిక',
      addMedication: 'మందును జోడించండి',
      pillsRemaining: 'మిగిలిన మాత్రలు',
    },
    chat: {
      title: 'ఎన్‌క్రిప్ట్ చేయబడిన వైద్య సంప్రదింపు',
      subtitle: 'అపోలో వైద్య బృందంతో నేరుగా సురక్షిత చాట్ చేయండి',
      encryptionBadge: 'AES-256 రక్షణ',
      encryptedNotice: 'ఈ సంభాషణలు పూర్తిగా సురక్షితమైనవి మరియు రహస్యమైనవి.',
      inputPlaceholder: 'మీ ప్రశ్నను ఇక్కడ అడగండి...',
      send: 'సందేశం పంపండి',
      requestCall: 'అత్యవసర కాల్ అభ్యర్థన',
      attachRecord: 'రిపోర్ట్ జత చేయండి',
    },
    map: {
      title: 'ఇంద్రప్రస్థ అపోలో క్యాంపస్ & రూట్ మ్యాప్',
      subtitle: 'ఢిల్లీ మధుర రోడ్, జసోలా అపోలో మెట్రో స్టేషన్ ఎదురుగా',
      address: 'సరితా విహార్, ఢిల్లీ మధుర రోడ్, న్యూఢిల్లీ - 110076',
      metroInfo: 'వైలెట్ లైన్ మెట్రో: జసోలా అపోలో స్టేషన్ (గేట్ 3కి డైరెక్ట్ స్కైవాక్)',
      openInGoogleMaps: 'గూగుల్ మ్యాప్స్‌లో తెరవండి',
      getDirections: 'క్యాంపస్ నావిగేషన్ & గేట్లు',
      emergencyGate: 'గేట్ 2: 24/7 ఎమర్జెన్సీ & ట్రామా బే',
      opdGate: 'గేట్ 1: ప్రధాన OPD రిసెప్షన్ & పార్కింగ్',
      parkingInfo: 'గేట్ 1 మరియు 4 వద్ద సులభమైన పార్కింగ్ సదుపాయం ఉంది',
    },
  },
  ar: {
    hospitalName: 'مستشفيات أبولو',
    campusName: 'إندرابراستا، نيودلهي',
    tagline: 'رعاية صحية عالمية المستوى بتميز سريري',
    nav: {
      findDoctor: 'البحث عن طبيب',
      liveAvailability: 'طابور العيادات المباشر',
      bookAppointment: 'حجز موعد',
      patientPortal: 'بوابة المريض',
      medications: 'تذكير بالأدوية',
      resources: 'دليل المريض',
      hospitalMap: 'خريطة المستشفى',
      emergencyCall: 'الطوارئ 1066',
      consultChat: 'استشارة مشفرة',
    },
    hero: {
      badge: 'مستشفيات أبولو إندرابراستا · معتمد من JCI',
      headline: 'رعاية طبية فائقة و',
      highlight: 'وصول فوري للعيادات الخارجية',
      subheadline: 'تواصل مباشرة مع كبار الاستشاريين في طريق دلهي ماثورا. تتبع مباشر لأرقام الانتظار وسجلات طبية مشفرة.',
      searchPlaceholder: 'ابحث عن طبيب أو تخصص (مثل القلب، الأورام، الأعصاب)...',
      quickBookCTA: 'احجز استشارة',
      viewLiveQueueCTA: 'عرض الطابور المباشر',
      openPortalCTA: 'الملف الصحي المشفر',
      stat1Label: 'تخصص دقيق',
      stat1Value: '52+',
      stat2Label: 'سعة الأسرّة',
      stat2Value: '710+',
      stat3Label: 'جراحات يومياً',
      stat3Value: '120+',
      stat4Label: 'خدمات الطوارئ',
      stat4Value: '24/7',
    },
    liveDashboard: {
      title: 'توافر الأطباء وحالة الانتظار المباشرة',
      subtitle: 'حالة فورية متزامنة مع مكاتب عيادات أبولو إندرابراستا',
      activeConsultations: 'أطباء متواجدون الآن',
      allDepartments: 'جميع التخصصات',
      availableOnly: 'متاح الآن فوراً',
      teleconsultOnly: 'استشارة فيديو',
      currentToken: 'الرقم الحالي',
      nextSlot: 'الموعد القادم',
      estWait: 'الانتظار المتوقع',
      mins: 'دقيقة',
      room: 'غرفة',
      statusAvailable: 'متاح الآن',
      statusConsulting: 'في استشارة',
      statusSurgery: 'في غرفة العمليات',
      statusBreak: 'استراحة قصيرة',
      bookConsultBtn: 'حجز موعد عيادة',
      teleconsultBtn: 'بدء استشارة مرئية',
    },
    booking: {
      title: 'نظام حجز المواعيد السلس',
      subtitle: 'اختر بين زيارة العيادات بالمستشفى أو الاستشارة المرئية عالية الدقة',
      step1: '1. اختيار الطبيب',
      step2: '2. الموعد والتوقيت',
      step3: '3. بيانات المريض',
      step4: '4. التأكيد الفوري',
      selectSpecialty: 'القسم الطبي',
      selectDoctor: 'الطبيب المعالج',
      selectDate: 'تاريخ الموعد',
      selectTimeSlot: 'التوقيت المتاح',
      consultMode: 'نوع الاستشارة',
      inPerson: 'حضور بالعيادة',
      videoConsult: 'استشارة فيديو مشفرة',
      patientDetails: 'بيانات المريض',
      fullName: 'اسم المريض الكامل',
      phone: 'رقم الهاتف',
      email: 'البريد الإلكتروني',
      uhidOptional: 'رقم ملف أبولو (UHID)',
      reasonForVisit: 'سبب الزيارة أو الأعراض',
      confirmBooking: 'تأكيد وحجز الرمز',
      confirmedSuccess: 'تم تأكيد الموعد بنجاح!',
      tokenAssigned: 'رقم الانتظار المحدد لك',
      downloadPass: 'تحميل بطاقة الدخول الرقمية',
      addToCalendar: 'إضافة إلى التقويم (.ics)',
    },
    portal: {
      title: 'بوابة السجلات الصحية الآمنة',
      subtitle: 'خزينة طبية رقمية مشفرة بالكامل لحماية خصوصية بياناتك الصحية',
      lockTitle: 'الخزينة الطبية المشفرة',
      lockDesc: 'سجلاتك محمية بتشفير عالي الأمان. أدخل رمز PIN الرباعي لفتح الملف.',
      enterPin: 'أدخل رمز الأمان (4 أرقام)',
      unlockVault: 'فك التشفير وعرض السجلات',
      switchProfile: 'تبديل ملف المريض',
      vitalsTitle: 'المؤشرات الحيوية والمخططات',
      reportsTitle: 'تقارير الفحوصات والأشعة',
      prescriptionsTitle: 'الوصفات الطبية الحالية',
      addVital: 'تسجيل قياس جديد',
      viewReport: 'عرض التقرير الطبي',
      normal: 'في النطاق الطبيعي',
      followUp: 'يلزم متابعة',
      downloadPdf: 'تحميل التقرير الرسمي PDF',
    },
    medications: {
      title: 'جدول الأدوية والتنبيهات التلقائية',
      subtitle: 'لا تفوّت أي جرعة. متابعة مواعيد الأدوية اليومية وتنبيهات إعادة التعبئة.',
      adherenceRate: 'معدل الالتزام الأسبوعي',
      todayDoses: 'جرعات اليوم',
      markTaken: 'تم أخذ الجرعة',
      snooze: 'تأجيل 15 دقيقة',
      taken: 'تمت',
      refillNeeded: 'تنبيه: اقتراب نفاد الدواء',
      addMedication: 'إضافة تذكير دواء',
      pillsRemaining: 'الحبوب المتبقية',
    },
    chat: {
      title: 'استشارة طبية مشفرة',
      subtitle: 'تواصل مباشر وآمن مع فريق رعاية أبولو والأطباء المناوبين',
      encryptionBadge: 'تشفير تام AES-256',
      encryptedNotice: 'جميع الرسائل والملفات الطبية في هذه القناة مشفرة وخاصة بفريقك الطبي.',
      inputPlaceholder: 'اطرح سؤالاً طبياً أو صف الأعراض...',
      send: 'إرسال آمن',
      requestCall: 'طلب اتصال عاجل',
      attachRecord: 'إرفاق تقرير فحص',
    },
    map: {
      title: 'مجمع مستشفى أبولو إندرابراستا والاتجاهات',
      subtitle: 'يقع على طريق دلهي ماثورا، مقابل محطة مترو جاسولا أبولو',
      address: 'ساريتا فيهار، طريق دلهي ماثورا، نيودلهي 110076',
      metroInfo: 'خط المترو البنفسجي: محطة جاسولا أبولو (جسر مشاة مباشر إلى بوابة 3)',
      openInGoogleMaps: 'فتح في خرائط جوجل',
      getDirections: 'بوابات المجمع والملاحة',
      emergencyGate: 'بوابة 2: طوارئ ومركز الحوادث 24/7',
      opdGate: 'بوابة 1: الاستقبال الرئيسي والعيادات',
      parkingInfo: 'تتوفر مواقف سيارات متعددة الطوابق ومواقف للمرضى في بوابتي 1 و 4',
    },
  },
};
