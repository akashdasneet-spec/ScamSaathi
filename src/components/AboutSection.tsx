'use client';

import React from 'react';
import { Language } from '@/lib/translations';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  return (
    <section id="about" className="bg-white border-b border-zinc-200">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Mission & Identity */}
        <div className="md:col-span-5 p-8 md:p-14 border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs uppercase text-red-600 tracking-wider font-semibold">
              ● [SS*—WHO WE ARE & MISSION]
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-6 leading-tight text-zinc-950">
              {language === 'hi'
                ? 'हमारे बुजुर्गों के लिए डिजिटल आत्मसम्मान और सुरक्षा।'
                : language === 'bn'
                ? 'আমাদের প্রবীণদের জন্য ডিজিটাল মর্যাদা ও সুরক্ষা।'
                : 'Digital dignity and safety for Indian elders.'}
            </h2>
          </div>

          <div className="mt-10">
            <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
              {language === 'hi'
                ? 'साइबर अपराधी बुज़ुर्गों के अकेलेपन, भय और तकनीकी संकोच का फायदा उठाते हैं। स्कैमसाथी इस डर को दूर करने के लिए बनाया गया है — ताकि कोई भी वरिष्ठ नागरिक अकेले भयभीत न हो।'
                : language === 'bn'
                ? 'সাইবার অপরাধীরা প্রবীণদের একাকীত্ব, ভয় এবং ডিজিটাল দ্বিধার সুযোগ নেয়। স্ক্যামসাথী এই ফাঁদ ভেঙে দেওয়ার জন্য প্রস্তুত — যাতে কোনো প্রবীণ মানুষ ভয়ে বিভ্রান্ত না হন।'
                : 'Cybercriminals prey on urgency, technical hesitation, and fear of authority. ScamSaathi is engineered to break that psychological trap by providing calm, accessible, and instantaneous clarity.'}
            </p>

            <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
                SS
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900">ScamSaathi Innovation Lab</div>
                <div className="text-[11px] text-zinc-500 font-mono">
                  {language === 'hi' ? 'सामाजिक प्रभाव साइबर रक्षा परियोजना' : language === 'bn' ? 'সামাজিক প্রভাব সাইবার সুরক্ষা উদ্যোগ' : 'Social-Impact Cybersecurity Initiative'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative + Key Social Impact Metrics */}
        <div className="md:col-span-7 p-8 md:p-14 bg-zinc-50 flex flex-col justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase text-zinc-400 font-bold tracking-wider">
              001 // THE INDIAN REALITY
            </span>
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900 leading-snug mt-3">
              {language === 'hi'
                ? 'बिजली कटने की धमकी से लेकर फर्जी सीबीआई डिजिटल अरेस्ट तक — डिजिटल भारत में वरिष्ठ नागरिकों को ढाल की जरूरत है।'
                : language === 'bn'
                ? 'বিদ্যুৎ সংযোগ কাটার ভয় থেকে শুরু করে সিবিআই ডিজিটাল অ্যারেস্ট — ডিজিটাল ভারতে প্রবীণদের সুরক্ষার দৃঢ় প্রাচীর প্রয়োজন।'
                : 'From fake electricity disconnection notices to terrifying "Digital Arrest" video calls — India\'s elders deserve a calm, reliable shield.'}
            </h3>
            <p className="text-zinc-600 text-xs md:text-sm mt-4 leading-relaxed">
              {language === 'hi'
                ? 'हम सुरक्षा जांच को पारदर्शी और नियम-आधारित (Deterministic) रखते हैं। कोई भी व्यक्तिगत डेटा कभी भी स्टोर नहीं किया जाता।'
                : language === 'bn'
                ? 'আমরা সমস্ত সুরক্ষা পরীক্ষা উন্মুক্ত ও নিয়মভিত্তিক (Deterministic) রাখি। কোনো ব্যক্তিগত তথ্য কখনো সংরক্ষণ করা হয় না।'
                : 'We prioritize deterministic, transparent rules so you always understand why a message was flagged. When AI is used, it serves solely to explain the trap in warm, grandfatherly language without jargon.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-zinc-200 text-zinc-900">
            <div>
              <div className="text-3xl md:text-4xl font-extrabold tracking-tighter text-red-600">₹1,750+ Cr</div>
              <div className="text-[11px] uppercase font-mono text-zinc-500 mt-1">Reported Lost in 2024</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold tracking-tighter">73%</div>
              <div className="text-[11px] uppercase font-mono text-zinc-500 mt-1">Seniors Hesitant Online</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold tracking-tighter text-emerald-600">1930</div>
              <div className="text-[11px] uppercase font-mono text-zinc-500 mt-1">National Helpline</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-extrabold tracking-tighter">0 Logs</div>
              <div className="text-[11px] uppercase font-mono text-zinc-500 mt-1">Zero-Data Retention</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
