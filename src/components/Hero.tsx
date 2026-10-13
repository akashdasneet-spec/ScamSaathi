'use client';

import React from 'react';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { ArrowDown, ShieldCheck, HeartHandshake, Lock, PhoneCall } from 'lucide-react';

interface HeroProps {
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <section className="relative pt-24 pb-14 bg-[#09090b] text-white overflow-hidden flex flex-col justify-between border-b border-white/10">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(220,38,38,0.22),transparent_55%)] pointer-events-none" />
      <div className="absolute -right-40 top-20 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-4 md:px-8 w-full z-10 pt-4 md:pt-8">
        {/* Top Monospace Metadata Banner */}
        <div className="flex flex-wrap items-center justify-between text-[11px] font-mono tracking-widest text-zinc-400 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>2026 SOCIAL IMPACT EDITION // INDIA</span>
          </div>
          <div className="flex gap-4 md:gap-6 mt-2 md:mt-0">
            <span>01. SMS & WHATSAPP</span>
            <span className="hidden sm:inline">02. DIGITAL ARREST CALLS</span>
            <span className="hidden md:inline">03. ZERO-FETCH URL AUDIT</span>
          </div>
        </div>

        {/* Large Hero Title & Handwritten Accent */}
        <div className="relative py-8 md:py-16 select-none">
          <h1 className="text-[17vw] md:text-[15vw] leading-none font-extrabold tracking-tighter text-white/95 scale-y-95">
            ScamSaathi
          </h1>
          <div className="absolute left-2 md:left-20 bottom-3 md:bottom-8">
            <p className="font-script text-2xl md:text-5xl lg:text-6xl text-red-500 -rotate-2 tracking-normal drop-shadow-md">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Hero Subtitle & CTA Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pt-6 border-t border-white/10 pb-6">
          <div className="md:col-span-7 lg:col-span-6">
            <p className="text-zinc-300 text-base md:text-xl font-normal leading-relaxed">
              {t.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 items-center">
              <a
                href="#checker"
                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3.5 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-zinc-200 transition shadow-lg shadow-white/10"
              >
                <span>{t.startCheck}</span>
                <ArrowDown className="w-4 h-4 text-black" />
              </a>

              <a
                href="tel:1930"
                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Govt Helpline 1930</span>
              </a>
            </div>

            <p className="mt-4 text-zinc-400 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Confidential • Redacts Phone & Card Numbers • No Data Saved</span>
            </p>
          </div>

          <div className="md:col-span-5 lg:col-span-6 flex flex-wrap items-center justify-start md:justify-end gap-4 md:gap-6 text-zinc-400 text-xs uppercase font-mono tracking-wider">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
              <Lock className="w-3.5 h-3.5 text-zinc-300" />
              <span>Zero-Storage Architecture</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-2 rounded-lg">
              <HeartHandshake className="w-3.5 h-3.5 text-red-400" />
              <span>Senior-Optimized Interface</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
