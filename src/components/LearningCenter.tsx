'use client';

import React from 'react';
import { COMMON_SCAMS } from '@/lib/scam-database';
import { Language } from '@/lib/translations';
import { AlertOctagon, CheckCircle2 } from 'lucide-react';

interface LearningCenterProps {
  language: Language;
}

export const LearningCenter: React.FC<LearningCenterProps> = ({ language }) => {
  return (
    <section id="scams" className="bg-white border-b border-zinc-200">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-12">
        {/* Left Column: Heading & Introduction */}
        <div className="md:col-span-4 p-8 md:p-14 border-b md:border-b-0 md:border-r border-zinc-200 bg-white flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs uppercase text-red-600 font-semibold tracking-wider">
              ● [SS*—HALL OF COMMON SCAMS]
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-4 text-zinc-950 leading-tight">
              {language === 'hi' ? 'भारत में होने वाले 6 प्रमुख डिजिटल धोखे' : language === 'bn' ? 'ভারতে বহুল প্রচলিত ৬টি ডিজিটাল প্রতারণা' : '6 Scams Targeting Indian Seniors'}
            </h2>
            <p className="text-zinc-600 text-sm mt-4 leading-relaxed">
              {language === 'hi'
                ? 'धोखेबाज़ तकनीकी ज्ञान नहीं, बल्कि डर और हड़बड़ी का इस्तेमाल करते हैं। इन 6 तरीकों को समझ लें, तो कोई आपको धोखा नहीं दे सकता।'
                : language === 'bn'
                ? 'প্রতারকরা প্রযুক্তির চেয়ে ভয় ও আতঙ্কের মনস্তত্ত্ব বেশি ব্যবহার করে। এই ৬টি সাধারণ ফাঁদ চিনে রাখলে সুরক্ষিত থাকা সহজ হয়।'
                : 'Scammers rarely hack your phone; they hack human trust, urgency, and fear. Learn the anatomy of India\'s most frequent digital traps.'}
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-zinc-100">
            <a
              href="#checker"
              className="inline-flex items-center gap-2 bg-zinc-950 text-white text-xs font-semibold px-6 py-3.5 rounded-full hover:bg-zinc-800 transition"
            >
              <span>{language === 'hi' ? 'संदेश की जांच करें' : language === 'bn' ? 'বার্তা পরীক্ষা করুন' : 'TEST YOUR MESSAGE'}</span>
              <span>+</span>
            </a>
          </div>
        </div>

        {/* Right Column: Cards Grid */}
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200">
          {COMMON_SCAMS.map((scam, index) => {
            const title = language === 'hi' ? scam.titleHi : language === 'bn' ? scam.titleBn : scam.title;
            const trap = scam.theTrap[language] || scam.theTrap.en;
            const warningSigns = scam.warningSigns[language] || scam.warningSigns.en;
            const goldenRule = scam.goldenRule[language] || scam.goldenRule.en;

            return (
              <div
                key={scam.id}
                className="p-8 md:p-10 flex flex-col justify-between hover:bg-zinc-50 transition border-b border-zinc-200"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span>{`00${index + 1} // ${scam.tag}`}</span>
                    <span className="text-red-600 font-bold">HIGH RISK</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mt-2 text-zinc-900 leading-snug">
                    {title}
                  </h3>

                  {/* Realistic Message Preview */}
                  <div className="mt-4 p-3.5 bg-zinc-100 rounded-xl border border-zinc-200 text-xs font-mono text-zinc-700 italic">
                    "{scam.realisticMessage}"
                  </div>

                  {/* The Trap Description */}
                  <div className="mt-5">
                    <span className="text-[11px] font-mono uppercase font-bold text-zinc-500">THE TRAP:</span>
                    <p className="text-zinc-600 text-xs md:text-sm mt-1 leading-relaxed">
                      {trap}
                    </p>
                  </div>

                  {/* Warning Signs */}
                  <div className="mt-4 space-y-2">
                    <span className="text-[11px] font-mono uppercase font-bold text-red-600 flex items-center gap-1">
                      <AlertOctagon className="w-3.5 h-3.5" />
                      <span>RED FLAGS:</span>
                    </span>
                    <ul className="text-xs text-zinc-600 space-y-1.5 list-disc list-inside">
                      {warningSigns.slice(0, 3).map((sign, sIdx) => (
                        <li key={sIdx} className="leading-snug">{sign}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* The Golden Rule */}
                <div className="mt-6 pt-4 border-t border-zinc-200 bg-red-50 -mx-4 -mb-4 p-4 rounded-b-xl">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] font-mono uppercase font-bold text-red-700">THE GOLDEN RULE</div>
                      <div className="text-xs font-semibold text-zinc-900 mt-0.5">{goldenRule}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
