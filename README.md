# Apollo Hospitals Indraprastha - Care & Patient Portal

A modern, responsive, animated web platform for **Indraprastha Apollo Hospitals, Delhi Mathura Road**, featuring real-time doctor availability tracking, interactive clinical resources, streamlined appointment booking with digital OPD passes, an encrypted patient portal for EHR records, automated medication reminders, encrypted provider consultation, and campus geolocation navigation.

---

## 🌟 Key Features

1. **Real-Time Doctor Availability & Queue Tracking**
   - Live synchronization with Apollo Indraprastha OPD chambers.
   - Live serving token counters (`font-mono tabular-nums`), estimated wait times in minutes, and room assignments across Blocks A, B, and C.
   - Real-time status indicators: *Available Now*, *In Consultation*, *In Operating Theater*, and *Next Slot Soon*.
   - Filter by specialty, walk-in availability, or video teleconsult readiness.

2. **Streamlined Appointment Booking System**
   - 4-step booking workflow for Hospital In-Person OPD or Encrypted HD Video Teleconsult.
   - Interactive date and time slot selector with fast-filling badges.
   - Generates official **Digital OPD Slip** with scheduled token number, QR code, `.ics` calendar sync download, and print pass.

3. **Indraprastha Hospital Geolocation & Campus Map**
   - Integrated with Google Maps: [Indraprastha Apollo Hospitals, Delhi Mathura Road](https://maps.app.goo.gl/fRQZcZ9MNXFPjhSp9).
   - Interactive campus navigation for **Gate 1** (Main OPD & Multi-level Valet), **Gate 2** (24/7 Emergency & Acute Trauma Bay), and **Gate 3** (Direct skywalk from Jasola Apollo Metro Station on the Violet Line).
   - Connectivity guides for Delhi Metro, IGI Airport (T3), and Hazrat Nizamuddin Railway Station.

4. **Multi-Language Support (6 Languages)**
   - Instant language switching:
     - 🇬🇧 English
     - 🇮🇳 हिन्दी (Hindi)
     - 🇮🇳 বাংলা (Bengali)
     - 🇮🇳 தமிழ் (Tamil)
     - 🇮🇳 తెలుగు (Telugu)
     - 🇦🇪 العربية (Arabic)

5. **Secure Patient Portal (Encrypted Health Records Vault)**
   - Client-side encrypted records vault with PIN authentication (Default Demo PIN: `1234`).
   - Switchable demo patient profiles (*Rajesh Kumar* - Cardiac / Post-PTCA patient; *Anita Sharma* - Orthopedic care).
   - Monitored Vitals (Blood Pressure, Heart Rate, Glucose, SpO2) with interactive "+ Log New Reading" modal.
   - Diagnostic reports viewer (2D Doppler Echocardiogram, Comprehensive Lipid Panel & HbA1c, Outpatient Prescriptions) with quantitative reference range tables and PDF download.

6. **Automated Medication Reminders**
   - Daily schedule partitioned into Morning, Afternoon, Evening, and Night.
   - Weekly adherence calculation, *Mark as Taken*, *Snooze 15m*, and *Skip* actions.
   - Browser audio chime alert synthesized via Web Audio API.
   - Low-stock pharmacy refill warnings and reminder creation form.

7. **Encrypted Provider Consultation Chat**
   - End-to-end encrypted messaging with verified Apollo Care Coordinators and attending physicians.
   - Session security key fingerprint (`0x9E4B...72A1`).
   - Quick clinical prompt replies, lab report attachment sharing, emergency warning detection, and HD video consultation simulator.

8. **24/7 Emergency Hotline (1066)**
   - Dedicated modal with one-click 1066 call trigger and GPS Advanced Life Support (ALS) ambulance dispatch simulator directly connected to Gate 2 Trauma Care.

---

## 🚀 Deploying to Vercel

This application is built on **React 19 + TypeScript + Vite** and is optimized for zero-configuration deployment on [Vercel](https://vercel.com).

### Option 1: Deploy via Vercel Web Dashboard (Recommended)

1. **Push your code to GitHub / GitLab / Bitbucket**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Apollo Hospitals portal"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/apollo-hospitals-portal.git
   git push -u origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Connect your Git account and import the repository.

3. **Configure Project Settings**:
   - **Framework Preset**: `Vite` (Vercel will automatically detect this from `package.json`).
   - **Root Directory**: `./` (Default root).
   - **Install Command**: `npm install --legacy-peer-deps` (configured automatically via `.npmrc` and `vercel.json`).
   - **Build Command**: `npm run build` or `vite build`.
   - **Output Directory**: `dist`.

4. **Environment Variables (Optional)**:
   If using server-side Gemini AI features or custom API keys:
   - `GEMINI_API_KEY`: *(Your Google AI Studio Gemini API Key)*

5. **Click "Deploy"**:
   - Vercel will install dependencies, build the production bundle into `dist/`, and issue a live production URL (e.g. `https://apollo-hospitals-portal.vercel.app`).

---

### Option 2: Deploy using Vercel CLI

1. **Install Vercel CLI globally**:
   ```bash
   npm install -g vercel
   ```

2. **Log in to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from project root**:
   ```bash
   vercel
   ```
   Follow the interactive prompts:
   - *Set up and deploy?* **Y**
   - *Which scope?* Select your account
   - *Link to existing project?* **N**
   - *What's your project's name?* `apollo-hospitals-portal`
   - *In which directory is your code located?* `./`
   - *Want to modify these settings?* **N**

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

---

## 🛠️ Local Development & Build

### Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher (or pnpm / yarn)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
This compiles TypeScript, bundles all assets, and outputs the production-ready static files into the `dist/` directory.

### 4. Preview Production Build Locally
```bash
npm run preview
```

### 5. Type Check & Linting
```bash
npm run lint
```

---

## 📁 Project Structure

```
├── requirements.txt            # Python/container dependency equivalent reference
├── vercel.json                 # Vercel SPA routing and build configuration
├── package.json                # Node.js dependencies and build scripts
├── vite.config.ts              # Vite + Tailwind CSS plugins configuration
├── tsconfig.json               # TypeScript compiler configuration
├── index.html                  # HTML entry point with Plus Jakarta Sans & Outfit fonts
├── metadata.json               # Application metadata
└── src/
    ├── main.tsx                # React application entry point
    ├── App.tsx                 # Core application controller & layout
    ├── index.css               # Tailwind CSS imports & animations
    ├── types/
    │   └── index.ts            # TypeScript data models and interfaces
    ├── translations/
    │   └── index.ts            # 6-language translations (EN, HI, BN, TA, TE, AR)
    ├── data/
    │   └── mockData.ts         # Realistic doctor roster, patient profiles & EHR data
    └── components/
        ├── Navbar.tsx          # Top Bar with language picker & emergency hotline
        ├── HeroSection.tsx     # Hero banner with search & real-time hospital stats
        ├── DoctorAvailabilityDashboard.tsx # Live queue, token tracker & doctor directory
        ├── AppointmentBookingSection.tsx   # Streamlined 4-step booking & OPD pass
        ├── HospitalLocationMap.tsx         # Geolocation & campus gate guide (Google Maps)
        ├── PatientPortal.tsx               # Encrypted health vault, lab reports & vitals
        ├── MedicationReminders.tsx         # Medication scheduler, audio chime & stock alerts
        ├── EncryptedConsultationChat.tsx   # E2EE chat with doctor & video consult
        ├── InteractivePatientResources.tsx # Clinical triage symptom checker & pre-op prep
        ├── EmergencyModal.tsx              # 24/7 hotline (1066) & ambulance dispatch
        └── Footer.tsx                      # Quiet corporate healthcare footer
```

---

## 🔒 Security & Privacy Notice

- **Health Vault**: Electronic Health Records (EHR) within the portal are client-encrypted.
- **Consultation Chat**: Messages use simulated AES-256-GCM session cryptography.
- **Emergency Disclaimer**: The digital portal is intended for non-emergency scheduling, access to medical records, and triage. For life-threatening emergencies, dial **1066** immediately or proceed to Gate 2 Emergency Trauma Bay at Indraprastha Apollo Hospitals, Delhi.
