'use client';

import React, { useState, useEffect } from 'react';
import { Language } from '@/lib/translations';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { AboutSection } from '@/components/AboutSection';
import { ScamChecker } from '@/components/ScamChecker';
import { LearningCenter } from '@/components/LearningCenter';
import { FaqSection } from '@/components/FaqSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');
  const [fontScale, setFontScale] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);

  // Sync fontScale class to document element
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('text-scale-normal', 'text-scale-large', 'text-scale-xlarge');
      root.classList.add(`text-scale-${fontScale}`);
    }
  }, [fontScale]);

  // Sync high contrast mode to body element
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const body = document.body;
      if (highContrast) {
        body.classList.add('high-contrast-mode');
      } else {
        body.classList.remove('high-contrast-mode');
      }
    }
  }, [highContrast]);

  return (
    <main className="min-h-screen flex flex-col justify-between transition-colors">
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        fontScale={fontScale}
        onFontScaleChange={setFontScale}
        highContrast={highContrast}
        onToggleHighContrast={() => setHighContrast(!highContrast)}
      />

      <Hero language={language} />

      <Marquee />

      <AboutSection language={language} />

      <ScamChecker language={language} />

      <LearningCenter language={language} />

      <FaqSection language={language} />

      <Footer language={language} />
    </main>
  );
}
