'use client';

import React, { useState, useEffect } from 'react';
import { AnalysisResult } from '@/lib/detector';
import { Language, TRANSLATIONS } from '@/lib/translations';
import {
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Volume2,
  VolumeX,
  Share2,
  PhoneCall,
  Clock,
  KeyRound,
  FileDown,
  Info,
} from 'lucide-react';

interface ResultCardProps {
  result: AnalysisResult;
  aiExplanation: string | null;
  analyzedSnippet: string;
  language: Language;
  onOpenShareModal: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  result,
  aiExplanation,
  analyzedSnippet,
  language,
  onOpenShareModal,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const t = TRANSLATIONS[language];

  // Stop speech when unmounting or changing result
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [result]);

  const categoryTitle =
    language === 'hi'
      ? result.categoryNameHi
      : language === 'bn'
      ? result.categoryNameBn
      : result.categoryName;

  const verdictTitle =
    language === 'hi'
      ? result.verdictHi
      : language === 'bn'
      ? result.verdictBn
      : result.verdict;

  const recommendations = result.recommendations[language] || result.recommendations.en;

  // Audio Speech Synthesis Handler
  const handleToggleSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported on this browser.');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const narrationText = [
      verdictTitle,
      categoryTitle,
      aiExplanation || (language === 'hi' ? 'सावधान रहें और यह सलाह ध्यान से सुनें।' : language === 'bn' ? 'সতর্ক থাকুন এবং এই পরামর্শ শুনুন।' : 'Please follow these instructions carefully.'),
      recommendations.slice(0, 3).join('. '),
    ].join('. ');

    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = 0.85; // Slightly slower for elderly comprehension
    utterance.pitch = 1.0;

    // Pick appropriate language voice if available
    const voices = window.speechSynthesis.getVoices();
    const langCode = language === 'hi' ? 'hi-IN' : language === 'bn' ? 'bn-IN' : 'en-IN';
    const matchedVoice = voices.find((v) => v.lang.startsWith(langCode) || v.lang.startsWith(language));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const isHighRisk = result.riskLevel === 'high';
  const isCaution = result.riskLevel === 'caution';

  const riskBorderColor = isHighRisk
    ? 'border-red-600'
    : isCaution
    ? 'border-amber-500'
    : 'border-emerald-600';

  const riskBadgeBg = isHighRisk
    ? 'bg-red-600 text-white'
    : isCaution
    ? 'bg-amber-500 text-black'
    : 'bg-emerald-600 text-white';

  return (
    <div
      className={`mt-10 rounded-3xl border-2 ${riskBorderColor} bg-[#0e0e11] text-white p-6 md:p-10 shadow-2xl transition-all animate-fade-in`}
      tabIndex={0}
      aria-live="polite"
    >
      {/* Top Status Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              isHighRisk ? 'bg-red-600/20 text-red-500' : isCaution ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
            }`}
          >
            {isHighRisk ? (
              <ShieldAlert className="w-8 h-8 animate-bounce" />
            ) : isCaution ? (
              <AlertTriangle className="w-8 h-8" />
            ) : (
              <ShieldCheck className="w-8 h-8" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${riskBadgeBg}`}>
                {isHighRisk ? 'HIGH RISK ALERT' : isCaution ? 'CAUTION ADVISED' : 'LOW RISK DETECTED'}
              </span>
              <span className="font-mono text-xs text-zinc-400">
                SCORE: <strong className="text-white">{result.score}/100</strong>
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 text-white">
              {verdictTitle}
            </h2>
            <p className="text-xs md:text-sm text-zinc-400 font-mono mt-0.5">
              Category: {categoryTitle}
            </p>
          </div>
        </div>

        {/* Audio Speech + Share Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleSpeech}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold tracking-tight transition ${
              isPlayingAudio ? 'bg-red-600 text-white animate-pulse' : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
            aria-label={isPlayingAudio ? t.speechStop : t.speechSpeak}
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isPlayingAudio ? t.speechStop : t.speechSpeak}</span>
          </button>

          <button
            onClick={onOpenShareModal}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-full text-xs font-bold tracking-tight transition shadow-md"
            aria-label={t.shareTitle}
          >
            <Share2 className="w-4 h-4" />
            <span>{t.whatsappShare}</span>
          </button>
        </div>
      </div>

      {/* Senior-Friendly AI / Rule-based Explanation */}
      <div className="mt-6 p-5 md:p-6 rounded-2xl bg-zinc-900/90 border border-white/10">
        <span className="text-[10px] font-mono uppercase tracking-wider text-red-400 font-bold">
          ● [COMPASSIONATE EXPLANATION // NO JARGON]
        </span>
        <div className="mt-2 text-sm md:text-base text-zinc-200 leading-relaxed font-normal">
          {aiExplanation ? (
            <p>{aiExplanation}</p>
          ) : (
            <p>
              {language === 'hi'
                ? 'यह संदेश आपको डराकर या तुरंत फैसला लेने के लिए उकसाकर आपके पैसे या बैंक जानकारी चुराने की कोशिश कर सकता है। घबराएं नहीं — जब तक आप कोई पिन या कोड साझा नहीं करते, आपका पैसा सुरक्षित है।'
                : language === 'bn'
                ? 'এই বার্তাটি আপনাকে ভয় দেখিয়ে বা বিভ্রান্ত করে টাকা বা ব্যাংকের গোপন তথ্য হাতিয়ে নেওয়ার চেষ্টা হতে পারে। ভয় পাবেন না — যতক্ষণ না আপনি কোনো পিন বা ওটিপি শেয়ার করছেন, আপনার টাকা সুরক্ষিত আছে।'
                : 'This message shows signs of manipulating urgency or fear to trick you into making an unverified transfer or sharing passwords. Stay calm — as long as you do not click or share codes, your money is safe.'}
            </p>
          )}
        </div>
      </div>

      {/* Crucial Signals Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs font-mono">
        <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${result.urgencyDetected ? 'bg-red-950/40 border-red-800 text-red-300' : 'bg-zinc-900 border-white/5 text-zinc-400'}`}>
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>Urgency / Panic Trigger: {result.urgencyDetected ? 'YES' : 'NO'}</span>
        </div>
        <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${result.credentialsRequested ? 'bg-red-950/40 border-red-800 text-red-300' : 'bg-zinc-900 border-white/5 text-zinc-400'}`}>
          <KeyRound className="w-4 h-4 flex-shrink-0" />
          <span>OTP / PIN Demand: {result.credentialsRequested ? 'YES' : 'NO'}</span>
        </div>
        <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${result.remoteAccessWarning ? 'bg-red-950/40 border-red-800 text-red-300' : 'bg-zinc-900 border-white/5 text-zinc-400'}`}>
          <FileDown className="w-4 h-4 flex-shrink-0" />
          <span>Dangerous App / APK: {result.remoteAccessWarning ? 'YES' : 'NO'}</span>
        </div>
      </div>

      {/* Flagged Indicators Breakdown */}
      {result.indicators.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold mb-4 flex items-center gap-2">
            <span>{t.resultIndicatorsLabel}</span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white">{result.indicators.length}</span>
          </h3>

          <div className="space-y-3">
            {result.indicators.map((ind) => {
              const title = language === 'hi' ? ind.titleHi : language === 'bn' ? ind.titleBn : ind.title;
              const explanation = language === 'hi' ? ind.explanationHi : language === 'bn' ? ind.explanationBn : ind.explanation;

              return (
                <div
                  key={ind.id}
                  className="p-4 md:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col md:flex-row md:items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <h4 className="text-sm md:text-base font-bold text-white">{title}</h4>
                      <span className="text-[10px] font-mono uppercase bg-red-600/20 text-red-400 px-2 py-0.5 rounded-full">
                        {ind.severity}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-zinc-300 leading-relaxed pt-1">
                      {explanation}
                    </p>
                  </div>

                  {ind.matchedText && (
                    <div className="bg-black/60 border border-white/10 px-3 py-1.5 rounded-lg text-[11px] font-mono text-red-300 flex-shrink-0 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                      Found: "{ind.matchedText}"
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Immediate Recommendations */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <h3 className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold mb-3">
          {t.resultRecommendationsLabel}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recommendations.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-zinc-900 border border-white/10 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <p className="text-xs md:text-sm text-zinc-200 leading-snug">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Callout */}
      <div className="mt-8 p-4 rounded-2xl bg-red-950/30 border border-red-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <PhoneCall className="w-5 h-5 text-red-400 flex-shrink-0" />
          <div className="text-xs">
            <div className="font-bold text-white">Did you already send money or share an OTP?</div>
            <div className="text-zinc-400">Call Government Cybercrime Helpline 1930 immediately to freeze fraudulent transfers.</div>
          </div>
        </div>

        <a
          href="tel:1930"
          className="bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase flex-shrink-0 transition"
        >
          Dial 1930 Now
        </a>
      </div>

      {/* No Result Guarantees Safety Disclaimer */}
      <div className="mt-4 pt-3 text-[11px] font-mono text-zinc-500 flex items-center gap-2">
        <Info className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
        <span>{t.noRiskGuaranteeNotice}</span>
      </div>
    </div>
  );
};
