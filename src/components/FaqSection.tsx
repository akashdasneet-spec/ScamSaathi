'use client';

import React from 'react';
import { Language } from '@/lib/translations';

interface FaqSectionProps {
  language: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ language }) => {
  const faqs = [
    {
      qEn: 'Can the Police, CBI, or ED ever place me under "Digital Arrest" on video call?',
      qHi: 'क्या पुलिस, सीबीआई या ईडी कभी भी मुझे वीडियो कॉल पर "डिजिटल अरेस्ट" कर सकती है?',
      qBn: 'পুলিশ, সিবিআই বা ইডি কি কখনো ভিডিও কলে আমাকে "ডিজিটাল অ্যারেস্ট" করতে পারে?',
      aEn: 'NO. NEVER. There is NO legal provision for "Digital Arrest" under Indian law. Legitimate law enforcement officers never conduct formal investigations over WhatsApp or Skype, nor do they ever ask citizens to transfer money to "government verification accounts". If you receive such a call, hang up immediately.',
      aHi: 'बिल्कुल नहीं। भारतीय कानून में "डिजिटल अरेस्ट" जैसा कोई शब्द या कानून है ही नहीं। असली पुलिस कभी भी व्हाट्सएप या स्काइप पर पूछताछ नहीं करती और न ही पैसे मांगती है। ऐसा कोई भी कॉल आते ही तुरंत काट दें।',
      aBn: 'কখনোই নয়। ভারতীয় আইনে "ডিজিটাল অ্যারেস্ট" বলে কোনো বিধান নেই। আসল পুলিশ কখনো হোয়াটসঅ্যাপ বা স্কাইপে জিজ্ঞাসাবাদ করে না বা কোনো অ্যাকাউন্টে টাকা পাঠাতে বলে না। এমন ফোন এলে অবিলম্বে কেটে দিন।',
    },
    {
      qEn: 'What should I do if I already entered my PIN or sent money to a fraudster?',
      qHi: 'यदि मैंने गलती से अपना पिन डाल दिया है या पैसे भेज दिए हैं, तो मुझे क्या करना चाहिए?',
      qBn: 'আমি যদি ভুলবশত পিন দিয়ে ফেলি বা টাকা পাঠিয়ে থাকি, তবে কী করব?',
      aEn: 'Act immediately within the "Golden Hour": 1) Dial 1930 (National Cyber Crime Helpline) right away so authorities can attempt to freeze the fraudulent destination account. 2) Call your bank\'s official customer care to block your netbanking and debit card. 3) File a formal cyber complaint on cybercrime.gov.in.',
      aHi: 'तुरंत कदम उठाएं: 1) फौरन 1930 पर कॉल करें ताकि सरकार जालसाज के खाते में जाने वाले पैसे को फ्रीज कर सके। 2) अपने बैंक को फोन करके अपना एटीएम कार्ड और नेटबैंकिंग ब्लॉक कराएं। 3) cybercrime.gov.in पर आधिकारिक शिकायत दर्ज करें।',
      aBn: 'দেরি না করে দ্রুত পদক্ষেপ নিন: ১) অবিলম্বে ১৯৩০ হেল্পলাইনে ফোন করুন যাতে প্রতারকের ব্যাংক অ্যাকাউন্ট ফ্রিজ করা যায়। ২) ব্যাংকে ফোন করে ডেবিট কার্ড ও নেটব্যাংকিং ব্লক করুন। ৩) cybercrime.gov.in পোর্টালে অভিযোগ দায়ের করুন।',
    },
    {
      qEn: 'Does a "Low Risk" result mean the message is 100% guaranteed safe?',
      qHi: 'क्या "कम जोखिम (Low Risk)" का मतलब है कि संदेश 100% सुरक्षित है?',
      qBn: '"কম ঝুঁকি (Low Risk)" ফলাফল কি বার্তাটি ১০০% নিরাপদ হওয়ার গ্যারান্টি দেয়?',
      aEn: 'No software can guarantee 100% safety. Cybercriminals constantly invent new variations. A Low Risk result means no known threat patterns were detected in the text, but you must still exercise caution with unfamiliar senders. Always independently verify through official phone numbers.',
      aHi: 'नहीं। कोई भी सॉफ्टवेयर 100% सुरक्षा की गारंटी नहीं दे सकता। कम जोखिम का अर्थ केवल यह है कि इस संदेश में कोई जाना-पहचाना खतरा नहीं दिखा। फिर भी किसी भी अनजान व्यक्ति के कहने पर पैसे न भेजें।',
      aBn: 'না। কোনো প্রযুক্তিই ১০০% নিরাপত্তার নিশ্চয়তা দিতে পারে না। এর মানে এই যে চেনা বিপদের সংকেত মেলেনি, তবে অচেনা ব্যক্তির কথায় বিশ্বাস করবেন না এবং নিজে যাচাই করে তবেই সিদ্ধান্ত নিন।',
    },
    {
      qEn: 'Why doesn\'t ScamSaathi visit or fetch user-submitted website links?',
      qHi: 'स्कैमसाथी संदिग्ध लिंक को खुद खोलकर क्यों नहीं देखता?',
      qBn: 'স্ক্যামসাথী লিংকে প্রবেশ না করে কেন পরীক্ষা করে?',
      aEn: 'Visiting phishing or malicious links directly can trigger attacker webhooks, download dangerous drive-by payloads, or confirm that your phone number/IP is active. ScamSaathi uses a safe zero-fetch architecture that inspects only the domain name, syntax, TLD, and structure without ever executing code on the dangerous site.',
      aHi: 'किसी खतरनाक लिंक को सीधे खोलने से आपके फोन में वायरस आ सकता है या हैकर को पता चल जाता है कि आपका नंबर चालू है। स्कैमसाथी सुरक्षित तकनीक से बिना वेबसाइट खोले केवल उसके पते की संरचना की जांच करता है।',
      aBn: 'সরাসরি কোনো লিংকে প্রবেশ করলে ম্যালওয়্যার ডাউনলোড হতে পারে বা হ্যাকার বুঝতে পারে আপনি সক্রিয়। তাই স্ক্যামসাথী সাইটে না ঢুকে কেবল লিংকের গঠন ও ডোমেন পরীক্ষা করে নিরাপদ তথ্য দেয়।',
    },
    {
      qEn: 'How does ScamSaathi protect my privacy and personal data?',
      qHi: 'स्कैमसाथी मेरी गोपनीयता और व्यक्तिगत डेटा की सुरक्षा कैसे करता है?',
      qBn: 'স্ক্যামসাথী কীভাবে আমার গোপনীয়তা রক্ষা করে?',
      aEn: 'We operate on a zero-storage principle. Before any analysis occurs, sensitive details (10-digit mobile numbers, Aadhaar patterns, credit card numbers) are automatically redacted client-side. We run zero tracking databases and never log or store your private messages.',
      aHi: 'हम किसी भी प्रकार का डेटा स्टोर नहीं करते। संदेश की जांच से पहले ही मोबाइल नंबर और बैंक के आंकड़े अपने-आप मिटा दिए जाते हैं। हमारे पास कोई डेटाबेस नहीं है।',
      aBn: 'আমরা জিরো-স্টোরেজ নীতি অনুসরণ করি। কোনো বার্তা যাচাই করার আগেই মোবাইল নম্বর বা ব্যাংকের সংখ্যা স্বয়ংক্রিয়ভাবে ঢেকে ফেলা হয়। আমরা কোনো তথ্য জমা রাখি না।',
    },
  ];

  return (
    <section id="faq" className="bg-zinc-50 py-16 md:py-24 border-b border-zinc-200">
      <div className="max-w-[1000px] mx-auto px-4 md:px-8">
        <span className="font-mono text-xs uppercase text-red-600 font-semibold tracking-wider">
          ● [SS*—FREQUENTLY ASKED QUESTIONS]
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mt-2 text-zinc-950 mb-10">
          {language === 'hi' ? 'जरूरी सवाल और जवाब' : language === 'bn' ? 'প্রয়োজনীয় প্রশ্নোত্তর' : 'Clear Answers For Families'}
        </h2>

        <div className="divide-y divide-zinc-200 border-y border-zinc-200 bg-white rounded-2xl overflow-hidden shadow-sm">
          {faqs.map((faq, index) => {
            const question = language === 'hi' ? faq.qHi : language === 'bn' ? faq.qBn : faq.qEn;
            const answer = language === 'hi' ? faq.aHi : language === 'bn' ? faq.aBn : faq.aEn;

            return (
              <details key={index} className="group p-6 cursor-pointer">
                <summary className="flex justify-between items-center font-bold text-zinc-900 text-sm md:text-base list-none">
                  <span>{question}</span>
                  <span className="transition group-open:rotate-45 text-xl font-light text-zinc-500 ml-4 flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="text-zinc-600 text-xs md:text-sm mt-4 leading-relaxed pt-2 border-t border-zinc-100">
                  {answer}
                </p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
};
