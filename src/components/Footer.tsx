'use client';

import React from 'react';
import { Language } from '@/lib/translations';
import { ShieldCheck, PhoneCall, Heart } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer id="contact" className="bg-[#09090b] text-white pt-20 pb-12 border-t border-white/10">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Left Column: Direct Helplines */}
          <div className="lg:col-span-6">
            <span className="font-mono text-xs uppercase text-red-500 font-semibold tracking-wider">
              ● [SS*—EMERGENCY SAFETY DIRECTORY]
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter mt-3 leading-none">
              {language === 'hi' ? 'सुरक्षा हेल्पलाइन' : language === 'bn' ? 'জরুরি হেল্পলাইন' : 'Help Is One Call Away.'}
            </h2>
            <p className="text-zinc-400 text-sm mt-6 max-w-md leading-relaxed">
              {language === 'hi'
                ? 'यदि किसी भी प्रकार का संशय हो, या पैसे कट गए हों, तो तुरंत भारत सरकार के इन आधिकारिक नंबरों पर कॉल करें। यह सेवा पूरी तरह निःशुल्क है।'
                : language === 'bn'
                ? 'কোনো সন্দেহ হলে বা টাকা খোয়া গেলে অবিলম্বে ভারত সরকারের এই অফিশিয়াল নম্বরে ফোন করুন। এটি সম্পূর্ণ বিনামূল্যে সাহায্য প্রদান করে।'
                : 'If you or an elderly family member feel uneasy, or if money has been deducted, contact the official Government of India helplines immediately.'}
            </p>

            <div className="mt-8 text-xs font-mono space-y-3 text-zinc-300">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span>NATIONAL CYBERCRIME HELPLINE:</span>
                <a href="tel:1930" className="text-red-400 font-bold hover:underline flex items-center gap-1">
                  <PhoneCall className="w-3.5 h-3.5" /> 1930 (FREE 24x7)
                </a>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span>ELDER LINE (SENIOR CITIZENS):</span>
                <a href="tel:14567" className="text-emerald-400 font-bold hover:underline">
                  14567 (TOLL FREE)
                </a>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <span>OFFICIAL CYBER COMPLAINT PORTAL:</span>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="text-white underline">
                  cybercrime.gov.in
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Mission Card & Privacy Architecture */}
          <div className="lg:col-span-6 bg-zinc-900/60 border border-white/10 rounded-3xl p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>STUDENT SOCIAL-IMPACT INNOVATION</span>
              </div>
              <h3 className="text-2xl font-bold mt-2 text-white">
                ScamSaathi Architecture & Ethics
              </h3>
              <p className="text-zinc-300 text-xs md:text-sm mt-3 leading-relaxed">
                Built as a student innovation submission dedicated to protecting India's growing elderly population against digital financial crime. We believe true security requires transparency:
              </p>

              <ul className="mt-6 space-y-2 text-xs text-zinc-400 font-mono">
                <li>✦ 100% Client-Side PII masking of telephone numbers & card digits</li>
                <li>✦ Zero persistent message storage — no private messages logged</li>
                <li>✦ Safe zero-fetch URL inspection to prevent attacker callbacks</li>
                <li>✦ Deterministic core detection with compassionate AI explanations</li>
                <li>✦ Trilingual interface: English, हिन्दी (Hindi), বাংলা (Bengali)</li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span className="flex items-center gap-1">
                Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for India's seniors
              </span>
              <span>DEPLOYED ON VERCEL</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-500 font-mono gap-4">
          <div>© 2026 ScamSaathi. Social Impact Technology. All rights reserved.</div>
          <div className="flex gap-6">
            <span>Non-profit Educational & Screening Companion</span>
            <span>Always independently verify with your bank</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
