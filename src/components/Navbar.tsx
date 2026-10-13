'use client';

import React from 'react';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { ShieldAlert, PhoneCall, Eye, Type } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  fontScale: 'normal' | 'large' | 'xlarge';
  onFontScaleChange: (scale: 'normal' | 'large' | 'xlarge') => void;
  highContrast: boolean;
  onToggleHighContrast: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  fontScale,
  onFontScaleChange,
  highContrast,
  onToggleHighContrast,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e0e10]/95 backdrop-blur-md border-b border-white/10 text-white text-xs tracking-wide transition-colors">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <a
            href="#"
            className="flex items-center gap-2 text-xl font-black tracking-tighter hover:text-red-500 transition focus:outline-none"
            aria-label="ScamSaathi Home"
          >
            <ShieldAlert className="w-6 h-6 text-red-500 flex-shrink-0" />
            <span className="text-lg md:text-xl font-black tracking-tighter">ScamSaathi</span>
          </a>
          <span className="text-[10px] uppercase tracking-wider bg-white/10 px-2.5 py-0.5 rounded-full text-zinc-300 hidden lg:inline-block font-mono">
            Senior Safety Companion
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-6 text-zinc-300 font-medium text-xs tracking-wider">
          <a href="#about" className="hover:text-white transition">
            {language === 'hi' ? 'हम कौन हैं' : language === 'bn' ? 'আমাদের লক্ষ্য' : 'WHO WE ARE'}
          </a>
          <a href="#checker" className="hover:text-white transition flex items-center gap-1.5 font-bold text-red-400">
            {language === 'hi' ? 'स्कैम चेकर' : language === 'bn' ? 'স্ক্যাম পরীক্ষক' : 'SCAM CHECKER'}
            <span className="text-[10px] bg-red-600 px-1.5 py-0.2 rounded-full text-white font-mono">LIVE</span>
          </a>
          <a href="#scams" className="hover:text-white transition">
            {language === 'hi' ? 'आम धोखे' : language === 'bn' ? 'প্রতারণার তালিকা' : 'COMMON SCAMS'}
          </a>
          <a href="#faq" className="hover:text-white transition">
            {language === 'hi' ? 'सवाल-जवाब' : language === 'bn' ? 'সাধারণ জিজ্ঞাসা' : 'FAQ & HELP'}
          </a>
        </nav>

        {/* Controls: Helpline + Accessibility + Languages */}
        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Helpline Callout */}
          <a
            href="tel:1930"
            className="bg-red-600/20 border border-red-500/40 text-red-400 hover:bg-red-600 hover:text-white transition px-2.5 md:px-3 py-1.5 rounded-full font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-sm"
            title="National Cyber Crime Helpline"
            aria-label="National Cyber Crime Helpline 1930"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-pulse text-red-400" />
            <span className="hidden sm:inline">HELPLINE:</span>
            <span>1930</span>
          </a>

          {/* Accessibility Font Size Magnifier */}
          <div className="flex items-center bg-white/10 rounded-full p-0.5 border border-white/10">
            <button
              onClick={() => {
                const next = fontScale === 'normal' ? 'large' : fontScale === 'large' ? 'xlarge' : 'normal';
                onFontScaleChange(next);
              }}
              className="px-2 py-1 text-[11px] font-bold rounded-full hover:bg-white/20 transition flex items-center gap-1"
              title="Change Text Size"
              aria-label="Toggle text size for readability"
            >
              <Type className="w-3 h-3" />
              <span className="font-mono uppercase">{fontScale === 'normal' ? 'A' : fontScale === 'large' ? 'A+' : 'A++'}</span>
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            onClick={onToggleHighContrast}
            className={`p-1.5 rounded-full border transition ${
              highContrast ? 'bg-amber-400 text-black border-amber-300' : 'bg-white/10 text-zinc-300 border-white/10 hover:bg-white/20'
            }`}
            title="Toggle High Contrast Mode"
            aria-label="Toggle High Contrast Mode"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>

          {/* Language Selector */}
          <div className="flex items-center bg-zinc-900 border border-white/15 rounded-full p-0.5 text-[11px] font-medium">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 rounded-full transition ${language === 'en' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
              aria-label="Switch language to English"
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-2 py-1 rounded-full transition ${language === 'hi' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
              aria-label="Switch language to Hindi"
            >
              हिन्दी
            </button>
            <button
              onClick={() => onLanguageChange('bn')}
              className={`px-2 py-1 rounded-full transition ${language === 'bn' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'}`}
              aria-label="Switch language to Bengali"
            >
              বাংলা
            </button>
          </div>

          {/* Action CTA */}
          <a
            href="#checker"
            className="hidden sm:inline-flex bg-white text-black hover:bg-zinc-200 transition px-3.5 py-1.5 rounded-full font-bold text-xs tracking-tight"
          >
            {t.startCheck}
          </a>
        </div>
      </div>
    </header>
  );
};
