'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { AnalysisResult } from '@/lib/detector';
import { X, MessageSquare, Copy, Check, Users, ShieldAlert } from 'lucide-react';

interface FamilyShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: AnalysisResult;
  analyzedSnippet: string;
  language: Language;
}

export const FamilyShareModal: React.FC<FamilyShareModalProps> = ({
  isOpen,
  onClose,
  result,
  analyzedSnippet,
  language,
}) => {
  const [copied, setCopied] = useState(false);
  const t = TRANSLATIONS[language];

  if (!isOpen) return null;

  const riskEmoji = result.riskLevel === 'high' ? '🚨 HIGH RISK SCAM' : result.riskLevel === 'caution' ? '⚠️ CAUTION' : 'ℹ️ MESSAGE CHECK';
  const category = language === 'hi' ? result.categoryNameHi : language === 'bn' ? result.categoryNameBn : result.categoryName;

  const shareText = `*ScamSaathi Digital Safety Alert for Family:*
Status: ${riskEmoji}
Type: ${category}
Analyzed Content: "${analyzedSnippet.slice(0, 150)}${analyzedSnippet.length > 150 ? '...' : ''}"

Advice from ScamSaathi:
1. Please check this message for me.
2. I have NOT shared any OTP or clicked any link.
3. National Cyber Crime Helpline: 1930.`;

  const encodedWhatsApp = encodeURIComponent(shareText);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div className="bg-zinc-900 border border-white/20 rounded-3xl max-w-lg w-full p-6 md:p-8 text-white relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full bg-white/5 hover:bg-white/10 transition"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center border border-red-500/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase text-red-400 tracking-wider font-bold">
              ● [CONSENT-BASED FAMILY SHARING]
            </span>
            <h3 id="share-modal-title" className="text-xl font-bold tracking-tight text-white">
              {t.shareTitle}
            </h3>
          </div>
        </div>

        <p className="text-zinc-300 text-xs md:text-sm mt-4 leading-relaxed">
          {t.shareDesc}
        </p>

        {/* Preview of Safety Card */}
        <div className="mt-4 p-4 rounded-2xl bg-zinc-950 border border-white/10 text-xs font-mono space-y-2 text-zinc-300">
          <div className="flex items-center justify-between text-red-400 font-bold">
            <span>{riskEmoji}</span>
            <span>SCORE: {result.score}/100</span>
          </div>
          <div className="text-white font-semibold">{category}</div>
          <div className="text-zinc-400 text-[11px] line-clamp-2">"{analyzedSnippet}"</div>
          <div className="text-[11px] text-emerald-400 font-bold">✓ PII automatically redacted</div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <a
            href={`https://api.whatsapp.com/send?text=${encodedWhatsApp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition shadow-lg"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.whatsappShare}</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider transition border border-white/10"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? t.copied : t.copyReport}</span>
          </button>
        </div>

        <div className="mt-5 pt-4 border-t border-white/10 text-[11px] text-zinc-400 flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-zinc-300 flex-shrink-0 mt-0.5" />
          <p>
            {language === 'hi'
              ? 'परिवार के सदस्यों से बात करने में कभी भी संकोच न करें। बातचीत ही धोखेबाज़ों की सबसे बड़ी काट है।'
              : language === 'bn'
              ? 'পরিবারের সাথে কথা বলতে কখনো দ্বিধাবোধ করবেন না। আপনার সজাগ থাকাই অপরাধীদের ব্যর্থ করে।'
              : 'Never feel embarrassed to ask family. Criminals count on your silence to succeed.'}
          </p>
        </div>
      </div>
    </div>
  );
};
