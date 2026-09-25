import React, { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Send, 
  Paperclip, 
  PhoneCall, 
  Video, 
  UserCheck, 
  FileText, 
  CheckCheck, 
  AlertCircle,
  Stethoscope,
  Sparkles,
  Bot
} from 'lucide-react';
import { ChatMessage, LanguageCode, PatientProfile } from '../types';
import { translations } from '../translations';

interface EncryptedConsultationChatProps {
  currentLang: LanguageCode;
  activeProfile: PatientProfile;
  onEmergencyClick: () => void;
}

export const EncryptedConsultationChat: React.FC<EncryptedConsultationChatProps> = ({
  currentLang,
  activeProfile,
  onEmergencyClick,
}) => {
  const t = translations[currentLang];
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [inputMessage, setInputMessage] = useState('');
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'coordinator',
      senderName: 'Apollo Care Coordinator (Sr. Nurse Preeti)',
      text: `Namaste ${activeProfile.name}. You are connected to the Apollo Indraprastha Clinical Response Desk. This consultation channel is end-to-end encrypted (AES-256-GCM) with Dr. Ashok Seth's cardiology care team. How can we assist with your health today?`,
      timestamp: '10:00 AM',
      encrypted: true,
    },
    {
      id: 'msg-2',
      sender: 'doctor',
      senderName: 'Dr. Ashok Seth (Cardiology Team)',
      text: 'Good morning Rajesh. I reviewed your 2D Doppler Echocardiogram from Sep 18. Your LVEF at 62% is very reassuring. Please confirm your morning BP reading before taking Telmisartan.',
      timestamp: '10:02 AM',
      encrypted: true,
      attachment: {
        type: 'prescription',
        title: 'Verified Clinical Observation',
        details: 'Continue Telmisartan 40mg + Atorvastatin 20mg. Target systolic < 130 mmHg.',
      },
    },
  ]);

  const quickPrompts = [
    'My morning BP was 122/78 mmHg',
    'Can I renew my Atorvastatin prescription?',
    'I have mild dizziness after taking my medicine',
    'Need urgent assistance regarding chest tightness',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const patientMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'patient',
      senderName: activeProfile.name,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      encrypted: true,
    };

    setMessages((prev) => [...prev, patientMsg]);
    setInputMessage('');

    // If user mentions emergency keywords, trigger warning
    const lower = text.toLowerCase();
    if (lower.includes('chest') || lower.includes('pain') || lower.includes('tightness') || lower.includes('breath')) {
      setTimeout(() => {
        const emergencyBotMsg: ChatMessage = {
          id: `msg-em-${Date.now()}`,
          sender: 'coordinator',
          senderName: 'Apollo Emergency Triage Alert',
          text: 'CRITICAL CLINICAL NOTICE: If you are experiencing chest pressure, pain radiating to your jaw/left arm, or severe shortness of breath, please dial Apollo 1066 IMMEDIATELY or proceed to Gate 2 Emergency Trauma Bay. Do not wait for a text response.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          encrypted: true,
        };
        setMessages((prev) => [...prev, emergencyBotMsg]);
      }, 700);
      return;
    }

    // Standard clinical coordinator / doctor simulated response
    setTimeout(() => {
      let reply = 'Thank you for sharing your reading. Your blood pressure of 122/78 mmHg is well within the therapeutic target. Continue your scheduled evening dose as prescribed.';
      if (lower.includes('renew') || lower.includes('prescription')) {
        reply = 'Your prescription renewal request for Atorvastatin 20mg has been forwarded to Dr. Seth’s assistant for digital re-authorization. You will receive an SMS confirmation once dispatched by Apollo Pharmacy.';
      } else if (lower.includes('dizziness') || lower.includes('side effect')) {
        reply = 'Mild dizziness can occasionally occur if blood pressure drops after sitting up quickly. Please rest in a seated position, hydrate, and recheck your BP in 20 minutes. If symptoms persist, Dr. Seth’s team can initiate a video call.';
      }

      const docMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        sender: 'doctor',
        senderName: 'Dr. Ashok Seth (Cardiology Team)',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        encrypted: true,
      };

      setMessages((prev) => [...prev, docMsg]);
    }, 1200);
  };

  return (
    <section id="chat" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-3">
            <Lock className="w-3.5 h-3.5 text-teal-600" />
            <span>{t.chat.encryptionBadge}</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.chat.title}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {t.chat.subtitle}
          </p>
        </div>

        {/* Encrypted Chat Window Container */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col h-[580px]">
          
          {/* Chat Window Top Bar */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900" />
              </div>
              <div>
                <div className="text-sm font-bold flex items-center gap-2">
                  <span>Dr. Ashok Seth & Care Desk</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-1.5 py-0.5 rounded-sm">
                    Verified MD
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-teal-400" />
                  <span>Session Fingerprint: 0x9E4B...72A1</span>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons: Video Call Simulator, Emergency 1066 */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(true)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
                title="Start Encrypted HD Video Teleconsult"
              >
                <Video className="w-4 h-4 text-cyan-400" />
              </button>

              <button
                type="button"
                onClick={onEmergencyClick}
                className="p-2 rounded-lg bg-rose-950/80 border border-rose-600/40 hover:bg-rose-900 text-rose-300 transition-colors cursor-pointer"
                title="Dial Apollo 24/7 Emergency Line 1066"
              >
                <PhoneCall className="w-4 h-4 text-rose-400" />
              </button>
            </div>
          </div>

          {/* Encryption Security Notice Banner */}
          <div className="bg-teal-50 px-4 py-2 border-b border-teal-100 flex items-center justify-between text-[11px] text-teal-900">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>{t.chat.encryptedNotice}</span>
            </div>
            <span className="font-mono text-teal-700 font-semibold hidden sm:inline">
              ECDH P-256 + AES-GCM
            </span>
          </div>

          {/* Messages Stream Viewport */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isPatient = msg.sender === 'patient';
              const isEmergency = msg.senderName.includes('Emergency');
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isPatient ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[10px] font-medium text-slate-400 mb-1 px-1">
                    {msg.senderName} · {msg.timestamp}
                  </div>

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed shadow-xs ${
                      isPatient
                        ? 'bg-teal-700 text-white rounded-br-xs'
                        : isEmergency
                        ? 'bg-rose-50 text-rose-950 border border-rose-300 font-medium rounded-bl-xs'
                        : 'bg-white text-slate-900 border border-slate-200 rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Optional Clinical Attachment */}
                    {msg.attachment && (
                      <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-[11px]">
                        <div className="font-bold flex items-center gap-1 text-teal-800">
                          <FileText className="w-3.5 h-3.5 text-teal-600" />
                          <span>{msg.attachment.title}</span>
                        </div>
                        <div className="text-slate-600 mt-0.5">{msg.attachment.details}</div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1 font-mono">
                    <Lock className="w-2.5 h-2.5 text-teal-600" />
                    <span>Encrypted</span>
                    {isPatient && <CheckCheck className="w-3 h-3 text-teal-600 ml-1" />}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Consultation Suggestions */}
          <div className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <span className="text-[11px] font-semibold text-slate-400 shrink-0">Quick:</span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 hover:bg-teal-50 hover:text-teal-800 rounded-lg whitespace-nowrap transition-colors cursor-pointer shrink-0 border border-slate-200/60"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSendMessage('Attached recent 2D Doppler Echocardiogram report.')}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Attach Lab Report or Vital Record"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={t.chat.inputPlaceholder}
              className="flex-1 px-3 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:border-teal-600 focus:bg-white transition-all"
            />

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim()}
              className="px-4 py-2 bg-teal-700 hover:bg-teal-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <span>{t.chat.send}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Video Teleconsultation Call Simulator Modal */}
        {isVideoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <div className="bg-slate-900 text-white rounded-2xl border border-slate-700 shadow-2xl max-w-xl w-full p-6 space-y-6 animate-in zoom-in-95 duration-150">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-bold font-mono tracking-wider uppercase text-emerald-400">
                    Apollo Tele-Video Stream Active
                  </span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  Bitrate: 1080p · 60fps
                </div>
              </div>

              {/* Video Window Preview */}
              <div className="relative h-64 bg-slate-800 rounded-xl overflow-hidden flex items-center justify-center border border-slate-700">
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 rounded-full bg-teal-700 flex items-center justify-center mx-auto text-2xl font-bold text-white shadow-lg">
                    AS
                  </div>
                  <div className="text-sm font-bold text-white">Dr. Ashok Seth, MD</div>
                  <div className="text-xs text-slate-400">Connecting audio and video stream...</div>
                </div>

                {/* Self View Floating Thumbnail */}
                <div className="absolute bottom-3 right-3 w-24 h-18 bg-slate-950 border border-slate-700 rounded-lg flex items-center justify-center text-[10px] text-slate-400">
                  You ({activeProfile.name.split(' ')[0]})
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Protected by WebRTC E2EE Encryption</span>
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
                >
                  End Video Session
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
