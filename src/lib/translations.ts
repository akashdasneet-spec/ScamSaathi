export type Language = 'en' | 'hi' | 'bn';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  heroSub: string;
  badge: string;
  helpline: string;
  helplineDesc: string;
  startCheck: string;
  quickTest: string;
  tabText: string;
  tabUrl: string;
  textPlaceholder: string;
  urlPlaceholder: string;
  checkButton: string;
  checkingButton: string;
  clearButton: string;
  privacyNotice: string;
  disclaimerTitle: string;
  disclaimerText: string;
  speechSpeak: string;
  speechStop: string;
  shareTitle: string;
  shareDesc: string;
  whatsappShare: string;
  copyReport: string;
  copied: string;
  emergencyHelpline: string;
  navHome: string;
  navChecker: string;
  navScams: string;
  navFaq: string;
  resultScoreLabel: string;
  resultRiskLabel: string;
  resultIndicatorsLabel: string;
  resultRecommendationsLabel: string;
  trustedContactHeading: string;
  trustedContactSub: string;
  redactedNotice: string;
  statsSectionTitle: string;
  elderFriendlyFeatures: string;
  noRiskGuaranteeNotice: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'ScamSaathi',
    tagline: 'Protection without panic.',
    heroSub:
      'An AI-assisted digital guardian engineered specifically for seniors in India. Verify suspicious SMS messages, WhatsApp alerts, calls, emails, and links in seconds.',
    badge: 'DIGITAL SAFETY COMPANION // 2026 INDIA EDITION',
    helpline: 'NATIONAL CYBER HELPLINE',
    helplineDesc: 'Dial 1930 immediately if money has been deducted from your bank.',
    startCheck: 'Check for Scam Now',
    quickTest: 'Or click a realistic example to test instantly:',
    tabText: 'Check SMS / WhatsApp / Call',
    tabUrl: 'Check Suspicious Link (Safe Zero-Fetch)',
    textPlaceholder:
      'Paste the message or type what the caller told you (e.g. "Your electricity power will be disconnected tonight at 9:30 PM...")',
    urlPlaceholder: 'Paste suspicious web address (e.g. sbi-kyc-update.xyz or http://192.168.1.1/pay)',
    checkButton: 'Analyze for Scams Now',
    checkingButton: 'Analyzing security indicators...',
    clearButton: 'Clear',
    privacyNotice:
      'Privacy First: All phone numbers and personal bank figures are automatically masked. We do not store or track your private messages.',
    disclaimerTitle: 'Senior Safety Notice',
    disclaimerText:
      'ScamSaathi analyzes known patterns and indicators. No software can guarantee 100% safety. If anything feels urgent, unusual, or uncomfortable, always pause and consult your family or bank branch before taking action.',
    speechSpeak: 'Listen to Explanation (Audio)',
    speechStop: 'Stop Audio',
    shareTitle: 'Share with Family / Trusted Contact',
    shareDesc:
      'Send this safety breakdown directly to your son, daughter, or trusted friend on WhatsApp so they can verify it for you.',
    whatsappShare: 'Send via WhatsApp',
    copyReport: 'Copy Safety Report',
    copied: 'Report Copied to Clipboard!',
    emergencyHelpline: 'Dial 1930 (Govt Cyber Cell)',
    navHome: 'Home',
    navChecker: 'Scam Checker',
    navScams: 'Hall of Scams',
    navFaq: 'Questions & Help',
    resultScoreLabel: 'Risk Score',
    resultRiskLabel: 'Safety Assessment',
    resultIndicatorsLabel: 'Identified Red Flags & Warning Signs',
    resultRecommendationsLabel: 'What You Should Do Right Now',
    trustedContactHeading: 'Not sure? Involve someone you trust.',
    trustedContactSub:
      'Cyber criminals rely on secrecy. When you talk to family or friends, scammers immediately lose their power.',
    redactedNotice: 'Sensitive digits were automatically redacted for your privacy.',
    statsSectionTitle: 'Engineered for Seniors Across India',
    elderFriendlyFeatures: 'Senior-Optimized Accessibility',
    noRiskGuaranteeNotice: 'Remember: A low risk score does not mean unknown messages are completely harmless. Always verify independently.',
  },
  hi: {
    appName: 'स्कैमसाथी (ScamSaathi)',
    tagline: 'सुरक्षा, बिना किसी घबराहट के।',
    heroSub:
      'भारतीय वरिष्ठ नागरिकों के लिए विशेष रूप से तैयार डिजिटल सुरक्षा साथी। संदिग्ध एसएमएस, व्हाट्सएप संदेश, फोन कॉल और वेब लिंक की चंद सेकंड में जांच करें।',
    badge: 'डिजिटल सुरक्षा साथी // 2026 भारत संस्करण',
    helpline: 'राष्ट्रीय साइबर हेल्पलाइन',
    helplineDesc: 'यदि बैंक से पैसे कट गए हों, तो तुरंत 1930 पर फोन करें।',
    startCheck: 'अभी संदेश की जांच करें',
    quickTest: 'या तुरंत जांच के लिए इनमें से कोई उदाहरण चुनें:',
    tabText: 'एसएमएस / व्हाट्सएप / कॉल जांचें',
    tabUrl: 'संदिग्ध वेबसाइट लिंक जांचें',
    textPlaceholder:
      'आया हुआ संदेश यहां पेस्ट करें या लिखें कि फोन करने वाले ने क्या कहा (जैसे: "आज रात 9:30 बजे बिजली काट दी जाएगी...")',
    urlPlaceholder: 'संदिग्ध लिंक यहां पेस्ट करें (जैसे sbi-kyc-update.xyz या http://192.168.1.1/pay)',
    checkButton: 'सुरक्षा जांच शुरू करें',
    checkingButton: 'खतरों और फर्जी संकेतों की जांच हो रही है...',
    clearButton: 'हटाएं',
    privacyNotice:
      'पूर्ण गोपनीयता: मोबाइल नंबर और निजी बैंक विवरण स्वतः छुपा दिए जाते हैं। हम आपके संदेशों को कहीं भी स्टोर नहीं करते।',
    disclaimerTitle: 'वरिष्ठ नागरिक सुरक्षा सूचना',
    disclaimerText:
      'स्कैमसाथी केवल ज्ञात धोखाधड़ी के तरीकों की जांच करता है। कोई भी कंप्यूटर 100% सुरक्षा की गारंटी नहीं दे सकता। किसी भी दबाव या जल्दबाजी वाले संदेश पर कदम उठाने से पहले अपने परिवार से जरूर पूछें।',
    speechSpeak: 'आवाज़ में सुनें (ऑडियो)',
    speechStop: 'आवाज़ रोकें',
    shareTitle: 'परिवार या विश्वस्त व्यक्ति को भेजें',
    shareDesc:
      'यह सुरक्षा रिपोर्ट सीधे व्हाट्सएप पर अपने बेटे, बेटी या किसी समझदार दोस्त को भेजें ताकि वे आपकी मदद कर सकें।',
    whatsappShare: 'व्हाट्सएप पर भेजें',
    copyReport: 'रिपोर्ट कॉपी करें',
    copied: 'रिपोर्ट कॉपी हो गई!',
    emergencyHelpline: '1930 डायल करें (साइबर सेल)',
    navHome: 'मुखपृष्ठ',
    navChecker: 'स्कैम चेकर',
    navScams: 'आम धोखों की जानकारी',
    navFaq: 'सवाल-जवाब',
    resultScoreLabel: 'जोखिम स्कोर',
    resultRiskLabel: 'सुरक्षा परिणाम',
    resultIndicatorsLabel: 'पकड़े गए खतरे और धोखे के संकेत',
    resultRecommendationsLabel: 'अब आपको क्या करना चाहिए',
    trustedContactHeading: 'संदेह है? किसी अपने से जरूर पूछें।',
    trustedContactSub:
      'जालसाज अकेलेपन और हड़बड़ी का फायदा उठाते हैं। जब आप परिवार से बात करते हैं, तो धोखेबाज़ हार जाते हैं।',
    redactedNotice: 'आपकी सुरक्षा के लिए फोन नंबर और व्यक्तिगत आंकड़े स्वतः छुपा दिए गए हैं।',
    statsSectionTitle: 'भारत के बुज़ुर्गों के लिए विशेष रूप से निर्मित',
    elderFriendlyFeatures: 'वरिष्ठ नागरिकों के अनुकूल सुगमता',
    noRiskGuaranteeNotice: 'याद रखें: कम जोखिम का अर्थ यह नहीं कि अनजान संदेश पूरी तरह सुरक्षित है। हमेशा सतर्क रहें।',
  },
  bn: {
    appName: 'স্ক্যামসাথী (ScamSaathi)',
    tagline: 'ভয় নয়, ভরসার সুরক্ষা।',
    heroSub:
      'ভারতের প্রবীণ নাগরিকদের জন্য বিশেষভাবে তৈরি কৃত্রিম বুদ্ধিমত্তা চালিত ডিজিটাল সুরক্ষাকবচ। সন্দেহজনক এসএমএস, হোয়াটসঅ্যাপ বার্তা, ফোন কল বা অচেনা লিংক কয়েক সেকেন্ডে যাচাই করুন।',
    badge: 'ডিজিটাল সুরক্ষা সঙ্গী // ২০২৬ ভারত সংস্করণ',
    helpline: 'জাতীয় সাইবার হেল্পলাইন',
    helplineDesc: 'ব্যাংক থেকে টাকা খোয়া গেলে অবিলম্বে ১৯৩০ নম্বরে ফোন করুন।',
    startCheck: 'এখনই প্রতারণা যাচাই করুন',
    quickTest: 'অথবা নিচের উদাহরণে ক্লিক করে তৎক্ষণাৎ পরীক্ষা করুন:',
    tabText: 'এসএমএস / হোয়াটসঅ্যাপ / কল পরীক্ষা',
    tabUrl: 'সন্দেহজনক লিংক পরীক্ষা (নিরাপদ স্থাপত্য)',
    textPlaceholder:
      'বার্তাটি এখানে পেস্ট করুন বা ফোনে কী বলা হয়েছে লিখুন (যেমন: "আজ রাত ৯:৩০ টায় বিদ্যুৎ লাইন কেটে দেওয়া হবে...")',
    urlPlaceholder: 'সন্দেহজনক ওয়েব লিংক দিন (যেমন sbi-kyc-update.xyz বা http://192.168.1.1/pay)',
    checkButton: 'সুরক্ষা পরীক্ষা শুরু করুন',
    checkingButton: 'সন্দেহজনক লক্ষণ অনুসন্ধান করা হচ্ছে...',
    clearButton: 'মুছে ফেলুন',
    privacyNotice:
      'গোপনীয়তা রক্ষা: মোবাইল নম্বর বা ব্যক্তিগত হিসাবের সংখ্যা স্বয়ংক্রিয়ভাবে ঢেকে দেওয়া হয়। আমরা আপনার কোনো বার্তা সংরক্ষণ করি না।',
    disclaimerTitle: 'প্রবীণ নাগরিকদের জন্য সতর্কবার্তা',
    disclaimerText:
      'স্ক্যামসাথী পরিচিত জালিয়াতির লক্ষণ চিহ্নিত করে। কোনো সফটওয়্যার ১০০% নিরাপত্তার গ্যারান্টি দিতে পারে না। কোনো বার্তা জরুরি মনে হলে বা অস্বস্তি বোধ হলে সবসময় পরিবারের সাথে কথা বলুন।',
    speechSpeak: 'ব্যাখ্যাটি শুনুন (অডিও)',
    speechStop: 'অডিও থামান',
    shareTitle: 'পরিবার বা নির্ভরযোগ্য কাউকে পাঠান',
    shareDesc:
      'এই সুরক্ষার ফলাফল সরাসরি হোয়াটসঅ্যাপে আপনার ছেলে, মেয়ে বা বিশ্বস্ত বন্ধুকে পাঠিয়ে যাচাই করিয়ে নিন।',
    whatsappShare: 'হোয়াটসঅ্যাপে পাঠান',
    copyReport: 'রিপোর্ট কপি করুন',
    copied: 'রিপোর্ট কপি করা হয়েছে!',
    emergencyHelpline: '১৯৩০ নম্বরে কল করুন (সাইবার সেল)',
    navHome: 'প্রথম পাতা',
    navChecker: 'স্ক্যাম পরীক্ষক',
    navScams: 'প্রতারণার তালিকা',
    navFaq: 'সাধারণ জিজ্ঞাসা',
    resultScoreLabel: 'ঝুঁকির মাত্রা',
    resultRiskLabel: 'সুরক্ষা ফলাফল',
    resultIndicatorsLabel: 'শনাক্ত করা বিপদের সংকেত',
    resultRecommendationsLabel: 'এখন আপনার করণীয় পদক্ষেপ',
    trustedContactHeading: 'সন্দেহ হচ্ছে? পরিবারের কাউকে জানান।',
    trustedContactSub:
      'সাইবার অপরাধীরা একাকীত্ব ও ভয়ের সুযোগ নেয়। আপনি প্রিয়জনের সাথে কথা বললেই প্রতারকদের উদ্দেশ্য ব্যর্থ হয়।',
    redactedNotice: 'আপনার সুরক্ষার স্বার্থে সংবেদনশীল সংখ্যাগুলি স্বয়ংক্রিয়ভাবে গোপন করা হয়েছে।',
    statsSectionTitle: 'ভারতের প্রবীণদের কথা মাথায় রেখে নির্মিত',
    elderFriendlyFeatures: 'প্রবীণ-বান্ধব সহজ ইন্টারফেস',
    noRiskGuaranteeNotice: 'মনে রাখবেন: কম ঝুঁকির মানে এই নয় যে অচেনা বার্তা সম্পূর্ণ নিরাপদ। সবসময় নিজে যাচাই করুন।',
  },
};
