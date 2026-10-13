'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/translations';
import { PRESET_EXAMPLES } from '@/lib/scam-database';
import { AnalysisResult } from '@/lib/detector';
import { ResultCard } from './ResultCard';
import { FamilyShareModal } from './FamilyShareModal';
import { MessageSquare, Link as LinkIcon, Shield, Sparkles, AlertCircle, RefreshCw, Lock } from 'lucide-react';

interface ScamCheckerProps {
  language: Language;
}

export const ScamChecker: React.FC<ScamCheckerProps> = ({ language }) => {
  const [tab, setTab] = useState<'message' | 'url'>('message');
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const t = TRANSLATIONS[language];

  const handleSelectPreset = (presetText: string) => {
    setInputText(presetText);
    setErrorMessage(null);
    if (/^https?:\/\//i.test(presetText) || presetText.includes('http://') || presetText.includes('.xyz') || presetText.includes('.apk')) {
      setTab('message');
    }
  };

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) {
      setErrorMessage(
        language === 'hi'
          ? 'कृपया जांच के लिए कोई संदेश या लिंक दर्ज करें।'
          : language === 'bn'
          ? 'অনুগ্রহ করে পরীক্ষার জন্য কোনো বার্তা বা লিংক দিন।'
          : 'Please enter a message or URL to analyze.'
      );
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          type: tab,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze text.');
      }

      setAnalysisResult(data.result);
      setAiExplanation(data.aiExplanation);
    } catch (err: unknown) {
      console.error(err);
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Unable to complete check. Please check your network and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setAnalysisResult(null);
    setAiExplanation(null);
    setErrorMessage(null);
  };

  return (
    <section id="checker" className="py-16 md:py-24 bg-[#09090b] text-white border-b border-white/10 relative">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-mono text-xs uppercase text-red-500 font-semibold tracking-wider">
            ● [SS*—INTERACTIVE DETECTOR]
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-2 text-white">
            {language === 'hi' ? 'स्कैम चेकर — तुरंत जांचें' : language === 'bn' ? 'স্ক্যাম পরীক্ষক — সরাসরি যাচাই' : 'Check Any Message Or Link'}
          </h2>
          <p className="text-zinc-400 text-sm md:text-base mt-3 leading-relaxed">
            {language === 'hi'
              ? 'आया हुआ संदेश, फोन कॉल पर कही गई बात, या कोई भी लिंक यहां पेस्ट करें। हम किसी भी बैंक या पुलिस का डर तुरंत बेनकाब करते हैं।'
              : language === 'bn'
              ? 'পাওয়া এসএমএস, হোয়াটসঅ্যাপ বার্তা বা সন্দেহজনক লিংক এখানে পেস্ট করুন। কয়েক সেকেন্ডেই জানা যাবে এটি প্রতারণা কিনা।'
              : 'Paste a suspicious SMS, WhatsApp forward, email, or web link below. We break down the trap with zero delay and total privacy.'}
          </p>
        </div>

        {/* Quick Realistic Example Chips */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase text-zinc-400 font-bold mb-3 flex items-center gap-2 justify-center">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.quickTest}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {PRESET_EXAMPLES.map((preset) => {
              const label = language === 'hi' ? preset.labelHi : language === 'bn' ? preset.labelBn : preset.label;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.text)}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-red-500/50 text-zinc-300 hover:text-white px-3.5 py-2 rounded-xl text-xs font-medium transition flex items-center gap-1.5"
                >
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Privacy Shield Disclaimer Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 flex items-start gap-3 text-xs text-zinc-300">
          <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Privacy Guarantee:</strong> {t.privacyNotice}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#121215] border border-white/15 rounded-3xl p-6 md:p-10 shadow-2xl">
          {/* Tabs */}
          <div className="flex items-center gap-3 border-b border-white/10 pb-6 mb-6">
            <button
              onClick={() => {
                setTab('message');
                setErrorMessage(null);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-tight transition ${
                tab === 'message'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.tabText}</span>
            </button>

            <button
              onClick={() => {
                setTab('url');
                setErrorMessage(null);
              }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-tight transition ${
                tab === 'url'
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <LinkIcon className="w-4 h-4" />
              <span>{t.tabUrl}</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleAnalyze}>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={tab === 'url' ? t.urlPlaceholder : t.textPlaceholder}
                rows={5}
                className="w-full bg-[#09090b] border border-white/15 rounded-2xl p-4 md:p-5 text-sm md:text-base text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition resize-y"
                aria-label={tab === 'url' ? t.urlPlaceholder : t.textPlaceholder}
              />
              {inputText.length > 0 && (
                <div className="absolute right-3 bottom-3 text-[11px] font-mono text-zinc-500 bg-black/60 px-2 py-0.5 rounded">
                  {inputText.length} chars
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mt-4 p-3.5 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white hover:bg-zinc-200 text-black font-extrabold px-8 py-4 rounded-full text-xs md:text-sm uppercase tracking-wider transition shadow-lg flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{t.checkingButton}</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 text-red-600" />
                      <span>{t.checkButton}</span>
                    </>
                  )}
                </button>

                {inputText && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="bg-white/5 hover:bg-white/10 text-zinc-300 px-5 py-4 rounded-full text-xs uppercase tracking-wider transition"
                  >
                    {t.clearButton}
                  </button>
                )}
              </div>

              <div className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Deterministic Core + AI Explainer</span>
              </div>
            </div>
          </form>
        </div>

        {/* Result Display */}
        {analysisResult && (
          <ResultCard
            result={analysisResult}
            aiExplanation={aiExplanation}
            analyzedSnippet={inputText}
            language={language}
            onOpenShareModal={() => setIsShareModalOpen(true)}
          />
        )}

        {/* Share Modal */}
        {analysisResult && (
          <FamilyShareModal
            isOpen={isShareModalOpen}
            onClose={() => setIsShareModalOpen(false)}
            result={analysisResult}
            analyzedSnippet={inputText}
            language={language}
          />
        )}
      </div>
    </section>
  );
};
