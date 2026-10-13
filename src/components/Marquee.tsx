'use client';

import React from 'react';

interface MarqueeProps {
  items?: string[];
}

export const Marquee: React.FC<MarqueeProps> = ({
  items = [
    'SMS & WHATSAPP FRAUD DETECTOR',
    'DIGITAL ARREST CBI/POLICE DEFENSE',
    'SAFE ZERO-FETCH URL AUDIT',
    'GOVT HELPLINE: 1930',
    'ENGLISH • हिन्दी • বাংলা',
    'SENIOR-OPTIMIZED ACCESSIBILITY',
    'ZERO-STORAGE PRIVACY ENGINE',
    'AUTO PII REDACTION',
  ],
}) => {
  return (
    <div className="w-full bg-[#0e0e11] border-y border-white/10 py-3 overflow-hidden select-none">
      <div className="flex w-max animate-marquee space-x-8 text-xs font-mono uppercase tracking-widest text-zinc-400">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center space-x-6 flex-shrink-0">
            <span className="text-red-500 font-bold">✦</span>
            <span className="hover:text-white transition-colors">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
