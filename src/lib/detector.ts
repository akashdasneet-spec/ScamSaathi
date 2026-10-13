export type RiskLevel = 'low' | 'caution' | 'high';

export interface SecurityIndicator {
  id: string;
  category: 'urgency' | 'credentials' | 'impersonation' | 'payment' | 'remote_access' | 'suspicious_link' | 'prize';
  severity: 'high' | 'medium' | 'low';
  title: string;
  titleHi: string;
  titleBn: string;
  explanation: string;
  explanationHi: string;
  explanationBn: string;
  matchedText?: string;
}

export interface AnalysisResult {
  riskLevel: RiskLevel;
  score: number; // 0-100
  verdict: string;
  verdictHi: string;
  verdictBn: string;
  categoryName: string;
  categoryNameHi: string;
  categoryNameBn: string;
  indicators: SecurityIndicator[];
  recommendations: {
    en: string[];
    hi: string[];
    bn: string[];
  };
  urgencyDetected: boolean;
  credentialsRequested: boolean;
  impersonationDetected: string | null;
  remoteAccessWarning: boolean;
  isUnknownOrShort: boolean;
  analyzedAt: string;
}

// Deterministic rules targeting realistic scam patterns in India
export function analyzeTextMessage(input: string): AnalysisResult {
  const text = input.trim();
  const lower = text.toLowerCase();
  const indicators: SecurityIndicator[] = [];

  let score = 0;
  let urgencyDetected = false;
  let credentialsRequested = false;
  let remoteAccessWarning = false;
  let impersonationDetected: string | null = null;
  let categoryName = 'General Message Assessment';
  let categoryNameHi = 'सामान्य संदेश समीक्षा';
  let categoryNameBn = 'সাধারণ বার্তা মূল্যায়ন';

  const isUnknownOrShort = text.length < 15;

  // 1. URGENCY & THREAT PATTERNS
  const urgencyRegex = /(tonight at \d|within \d+\s*(hours|hrs|mins|minutes)|disconnected tonight|account (will be |)blocked|service will be stopped|immediate(ly)?|urgent(ly)?|last warning|final notice|legal action|arrest warrant|fir registered|power cut|बिजली कट|तुरंत|अंतिम चेतावनी|खाता बंद|বিদ্যুৎ বিচ্ছিন্ন|জরুরি|অ্যাকাউন্ট ব্লক|আইনি ব্যবস্থা)/i;
  const urgencyMatch = text.match(urgencyRegex);
  if (urgencyMatch) {
    urgencyDetected = true;
    score += 30;
    indicators.push({
      id: 'urgency-threat',
      category: 'urgency',
      severity: 'high',
      title: 'High Pressure & Artificial Urgency',
      titleHi: 'कृत्रिम हड़बड़ी और डर का माहौल',
      titleBn: 'জরুরি ভয় ও মানসিক চাপ',
      explanation: 'Scammers use deadlines like "tonight" or "within 2 hours" so you panic and don\'t consult your family or bank.',
      explanationHi: 'धोखेबाज़ "आज रात बिजली कटेगी" या "2 घंटे में खाता बंद" जैसी धमकियां देकर घबराहट पैदा करते हैं ताकि आप सोचने का समय न पाएं।',
      explanationBn: 'প্রতারকরা "আজ রাতেই বিদ্যুৎ বন্ধ" বা "২ ঘণ্টার মধ্যে অ্যাকাউন্ট বাতিল" বলে আতঙ্ক তৈরি করে যাতে পরিবারের সাথে কথা বলার সুযোগ না থাকে।',
      matchedText: urgencyMatch[0],
    });
  }

  // 2. OTP, PIN, CVV, AND PASSWORD REQUESTS
  const credentialsRegex = /(otp|one time password|cvv|atm pin|upi pin|netbanking password|share (\d|6) digit code|secret code|enter pin to receive|पिन|ओटीपी|पासवर्ड|ওটিপি|পিন নম্বর|গোপন কোড)/i;
  const credentialsMatch = text.match(credentialsRegex);
  if (credentialsMatch) {
    credentialsRequested = true;
    score += 45;
    indicators.push({
      id: 'credential-harvest',
      category: 'credentials',
      severity: 'high',
      title: 'Request for Sensitive PIN / OTP',
      titleHi: 'ओटीपी (OTP) या गुप्त पिन की मांग',
      titleBn: 'গোপন ওটিপি বা পিন নম্বর চাওয়ার প্রমাণ',
      explanation: 'No bank, electricity board, or government agency ever asks for your OTP or PIN. Sharing this allows them to drain money immediately.',
      explanationHi: 'कोई भी बैंक, बिजली विभाग या सरकारी अधिकारी कभी भी आपका OTP या पिन नहीं मांगता। इसे साझा करते ही पैसे कट सकते हैं।',
      explanationBn: 'কোনো ব্যাংক বা সরকারি অফিস কখনোই আপনার ওটিপি বা পিন জানতে চায় না। এটি দিলে নিমেষেই টাকা খোয়া যেতে পারে।',
      matchedText: credentialsMatch[0],
    });
  }

  // 3. REMOTE ACCESS APPS (AnyDesk, TeamViewer, RustDesk, QuickSupport)
  const remoteAccessRegex = /(anydesk|teamviewer|rustdesk|quicksupport|screen share|support app|apk file|\.apk|download app to verify)/i;
  const remoteMatch = text.match(remoteAccessRegex);
  if (remoteMatch) {
    remoteAccessWarning = true;
    score += 40;
    indicators.push({
      id: 'remote-app',
      category: 'remote_access',
      severity: 'high',
      title: 'Screen-Sharing or Unknown APK Download Request',
      titleHi: 'स्क्रीन शेयरिंग या अज्ञात ऐप डाउनलोड करने का निर्देश',
      titleBn: 'স্ক্রিন শেয়ারিং বা অচেনা অ্যাপ ডাউনলোডের অনুরোধ',
      explanation: 'Apps like AnyDesk or unofficial .apk files give scammers complete control of your phone screen, bank apps, and SMS.',
      explanationHi: 'AnyDesk या अनजान APK फाइल डाउनलोड करने से धोखेबाज़ के पास आपके पूरे फोन और बैंक मैसेज का कंट्रोल चला जाता है।',
      explanationBn: 'AnyDesk বা অচেনা APK অ্যাপ ইনস্টল করলে প্রতারক দূর থেকেই আপনার ফোনের স্ক্রিন ও ব্যাংক মেসেজ দেখতে পারে।',
      matchedText: remoteMatch[0],
    });
  }

  // 4. IMPERSONATION (Electricity Board, Bank, Telecom, Police/CBI Digital Arrest)
  const powerScamRegex = /(electricity bill|power supply|wbsecl|wbsedcl|bses|dhbvn|tneb|mseb|bescom|uppcl|power will be disconnected|electricity officer|बिजली बिल|बिजली विभाग|बिजली कट|বিদ্যুৎ বিল|বিদ্যুৎ দপ্তর|বিদ্যুৎ বিচ্ছিন্ন)/i;
  const digitalArrestRegex = /(cbi|crime branch|cyber cell|mumbai police|customs|narcotics|parcel seized|arrest warrant|supreme court|digital arrest|trai.*deactivate|डिजिटल अरेस्ट|सीबीआई|क्राइम ब्रांच|वारंट|পুলিশ|সিবিআই|ডিজিটাল অ্যারেস্ট|গ্রেফতার)/i;
  const bankKycRegex = /(sbi|hdfc|icici|axis|pnb|bob|bank kyc|pan card update|aadhaar linking|yono|account suspended|debit card blocked|केवाईसी|खाता ब्लॉक|पैन कार्ड|কেওয়াইসি|অ্যাকাউন্ট ব্লক)/i;
  const lotteryPrizeRegex = /(kbc|kaun banega crorepati|won.*(\$|₹|rs|lakh|crore)|lottery|lucky draw|claim reward|cash prize|लॉटरी|इनाम जीत|লটারি|পুরস্কার)/i;
  const upiRefundRegex = /(scan qr to receive|enter upi pin to receive|refund of rs|claim refund|send re 1 to verify|send ₹1|रिफंड|টাকা ফেরত)/i;

  if (powerScamRegex.test(lower)) {
    impersonationDetected = 'Electricity Board (Disconnection Scam)';
    categoryName = 'Electricity Bill Disconnection Scam';
    categoryNameHi = 'बिजली बिल कटने का फर्जी संदेश';
    categoryNameBn = 'বিদ্যুৎ বিল বকেয়া কাটার ভুয়ো হুমকি';
    score += 35;
    indicators.push({
      id: 'power-scam-pattern',
      category: 'impersonation',
      severity: 'high',
      title: 'Electricity Department Impersonation',
      titleHi: 'बिजली विभाग का नाम लेकर धोखाधड़ी',
      titleBn: 'বিদ্যুৎ দফতরের ভুয়ো পরিচয়',
      explanation: 'State power distribution companies never send SMS from regular 10-digit mobile numbers threatening disconnection within hours.',
      explanationHi: 'सरकारी बिजली कंपनियां कभी भी आम मोबाइल नंबर से आज रात बिजली काटने का मैसेज नहीं भेजतीं।',
      explanationBn: 'বিদ্যুৎ দপ্তর কখনোই কোনো সাধারণ মোবাইল নম্বর থেকে আজ রাতেই সংযোগ কাটার হুমকি দিয়ে মেসেজ পাঠায় না।',
    });
  } else if (digitalArrestRegex.test(lower)) {
    impersonationDetected = 'Police / CBI / Customs (Digital Arrest)';
    categoryName = 'Digital Arrest & Law Enforcement Impersonation';
    categoryNameHi = 'डिजिटल अरेस्ट / पुलिस अधिकारी का फर्जी दावा';
    categoryNameBn = 'ডিজিটাল অ্যারেস্ট ও ভুয়ো পুলিশি হুমকি';
    score += 45;
    indicators.push({
      id: 'digital-arrest-threat',
      category: 'impersonation',
      severity: 'high',
      title: 'Fake Law Enforcement & Digital Arrest Fraud',
      titleHi: 'फर्जी पुलिस व सीबीआई का डिजिटल अरेस्ट झांसा',
      titleBn: 'ভুয়ো সিবিআই/পুলিশি গ্রেফতারির ভয়',
      explanation: 'Indian police, CBI, and courts NEVER conduct arrests via Skype/WhatsApp video calls or demand money for clearance.',
      explanationHi: 'भारत की पुलिस, सीबीआई या अदालत कभी भी व्हाट्सएप वीडियो कॉल पर जांच नहीं करती और न ही पैसे मांगती है।',
      explanationBn: 'ভারতীয় পুলিশ বা সিবিআই কোনোদিন ভিডিও কলে গ্রেফতার বা অভিযোগ নিষ্পত্তির জন্য টাকা দাবি করে না।',
    });
  } else if (bankKycRegex.test(lower)) {
    impersonationDetected = 'Bank KYC Verification Trap';
    categoryName = 'Banking KYC Phishing Scam';
    categoryNameHi = 'बैंक केवाईसी (KYC) अपडेशन धोखाधड़ी';
    categoryNameBn = 'ব্যাংক কেওয়াইসি (KYC) প্রতারণা';
    score += 30;
    indicators.push({
      id: 'bank-kyc-trap',
      category: 'impersonation',
      severity: 'high',
      title: 'Bank Name Misuse for KYC Verification',
      titleHi: 'बैंक के नाम पर पैन/केवाईसी अपडेट का झांसा',
      titleBn: 'প্যান/কেওয়াইসি আপডেটের নামে ব্যাংকের ভুয়ো বার্তা',
      explanation: 'Banks never threaten immediate account suspension over SMS links. KYC updates are done in branch or official apps.',
      explanationHi: 'बैंक कभी भी मैसेज में लिंक भेजकर तुरंत खाता बंद करने की धमकी नहीं देते। केवाईसी सिर्फ बैंक शाखा या असली ऐप से होती है।',
      explanationBn: 'মেসেজের লিংকে ক্লিক করে কেওয়াইসি না করলে অ্যাকাউন্ট বন্ধের হুমকি ব্যাংক কখনই দেয় না।',
    });
  } else if (lotteryPrizeRegex.test(lower)) {
    impersonationDetected = 'Lottery / KBC Lottery Fraud';
    categoryName = 'Lottery & Sweepstakes Fraud';
    categoryNameHi = 'केबीसी / लॉटरी इनाम का लालच';
    categoryNameBn = 'লটারি ও পুরস্কারের মিথ্যা প্রলোভন';
    score += 35;
    indicators.push({
      id: 'lottery-lure',
      category: 'prize',
      severity: 'high',
      title: 'Unsolicited Prize / Lottery Trap',
      titleHi: 'बिना खरीदे लॉटरी या 25 लाख जीतने का झूठा दावा',
      titleBn: 'লটারি বা নগদ টাকা জেতার মিথ্যে টোপ',
      explanation: 'You cannot win a lottery or prize you never entered. They will ask you to pay an advance "tax" or "registration fee".',
      explanationHi: 'जिस प्रतियोगिता में आपने भाग ही नहीं लिया, उसमें जीतना असंभव है। यह टैक्स के नाम पर पैसे ऐंठने की चाल है।',
      explanationBn: 'যে প্রতিযোগিতায় আপনি অংশই নেননি, তাতে জেতা অসম্ভব। রেজিস্ট্রেশন ফি-র নামে আপনার থেকে টাকা হাতিয়ে নেওয়াই এদের উদ্দেশ্য।',
    });
  } else if (upiRefundRegex.test(lower)) {
    impersonationDetected = 'UPI QR Code / Refund Trap';
    categoryName = 'UPI QR Code Refund Trick';
    categoryNameHi = 'पैसे पाने के लिए क्यूआर कोड / पिन धोखाधड़ी';
    categoryNameBn = 'টাকা পাওয়ার নামে কিউআর কোড বা পিন জালিয়াতি';
    score += 40;
    indicators.push({
      id: 'upi-refund-trap',
      category: 'payment',
      severity: 'high',
      title: 'Scan QR / Enter PIN to Receive Money Deception',
      titleHi: 'पैसे प्राप्त करने के लिए पिन डालने का जाल',
      titleBn: 'টাকা পাওয়ার জন্য পিন দেওয়ার বিভ্রান্তি',
      explanation: 'Remember the golden rule of UPI: You NEVER need to scan a QR code or enter your UPI PIN to RECEIVE money.',
      explanationHi: 'यूपीआई का स्वर्णिम नियम: पैसे पाने के लिए कभी भी पिन (PIN) दर्ज करने या क्यूआर कोड स्कैन करने की ज़रूरत नहीं होती।',
      explanationBn: 'ইউপিআই-এর সোনালী নিয়ম: কারো থেকে টাকা পেতে কখনোই পিন দেওয়ার বা কিউআর কোড স্ক্যান করার দরকার পড়ে না।',
    });
  }

  // 5. UNVERIFIED PHONE NUMBER OR PERSONAL CONTACT CALLOUT
  const personalNumberMatch = text.match(/(call on \+?91\d{10}|contact officer (at|on) \d{10}|helpline:? \d{10})/i);
  if (personalNumberMatch) {
    score += 20;
    indicators.push({
      id: 'personal-mobile-helpline',
      category: 'impersonation',
      severity: 'medium',
      title: 'Personal 10-Digit Number Disguised as Official Helpline',
      titleHi: 'आम 10-अंकों वाले मोबाइल नंबर को हेल्पलाइन बताया गया है',
      titleBn: 'ব্যক্তিগত মোবাইল নম্বরকে অফিশিয়াল হেল্পলাইন বলা হয়েছে',
      explanation: 'Official banks and electricity boards use official shortcodes (like VM-SBIBNK or VK-WBSEDCL), not regular 10-digit mobile numbers.',
      explanationHi: 'सरकारी विभाग और बैंक आधिकारिक कोड (जैसे VM-HDFCBK) से संदेश भेजते हैं, आम 10 अंकों वाले सिम कार्ड से नहीं।',
      explanationBn: 'অফিশিয়াল ব্যাংক বা সরকারি সংস্থা নির্দিষ্ট এসএমএস হেডার থেকে মেসেজ পাঠায়, সাধারণ ১০ সংখ্যার মোবাইল থেকে নয়।',
      matchedText: personalNumberMatch[0],
    });
  }

  // Determine final risk level
  let riskLevel: RiskLevel = 'low';
  let verdict = 'No Obvious Fraud Indicators Detected';
  let verdictHi = 'कोई स्पष्ट धोखाधड़ी के संकेत नहीं मिले';
  let verdictBn = 'কোনো স্পষ্ট প্রতারণার লক্ষণ ধরা পড়েনি';

  if (score >= 40) {
    riskLevel = 'high';
    verdict = 'High Risk of Fraud Detected';
    verdictHi = 'धोखाधड़ी का अत्यंत उच्च जोखिम पाया गया';
    verdictBn = 'প্রতারণার অত্যন্ত উচ্চ ঝুঁকি শনাক্ত হয়েছে';
  } else if (score >= 20 || (isUnknownOrShort && score > 0)) {
    riskLevel = 'caution';
    verdict = 'Proceed with Extreme Caution';
    verdictHi = 'सावधानी बरतें — संदेहास्पद संकेत मिले हैं';
    verdictBn = 'অত্যন্ত সতর্ক থাকুন — সন্দেহজনক লক্ষণ রয়েছে';
  } else if (isUnknownOrShort) {
    riskLevel = 'caution';
    verdict = 'Inconclusive / Content Too Short to Verify';
    verdictHi = 'संदेश बहुत संक्षिप्त है — सुरक्षा की पुष्टि नहीं की जा सकती';
    verdictBn = 'বার্তাটি অতি সংক্ষিপ্ত — সুরক্ষার নিশ্চয়তা দেওয়া অসম্ভব';
    indicators.push({
      id: 'short-inconclusive',
      category: 'suspicious_link',
      severity: 'low',
      title: 'Inconclusive Text',
      titleHi: 'अपूर्ण जानकारी',
      titleBn: 'অসম্পূর্ণ বার্তা',
      explanation: 'The text provided is very brief. Never assume unverified senders are safe without verifying through trusted channels.',
      explanationHi: 'संदेश बहुत छोटा है। जब तक आप अपने परिजनों या बैंक से सीधे पुष्टि न कर लें, तब तक किसी भी अनजान संदेश पर भरोसा न करें।',
      explanationBn: 'বার্তাটি খুবই ছোট। নিজের পরিবার বা ব্যাংকের সাথে সরাসরি কথা না বলে অজানা নম্বরে বিশ্বাস করবেন না।',
    });
  }

  // Recommended actions tailored for elders
  const recommendations = {
    en: [
      'DO NOT click any link or call the phone number provided in this message.',
      'DO NOT share any OTP, UPI PIN, or bank password under any circumstances.',
      'DO NOT install any app (like AnyDesk, TeamViewer, or APK file) suggested to you.',
      'Call the official National Cyber Crime Helpline at 1930 if money was deducted.',
      'Ask your children, younger relatives, or a trusted neighbor to look at this message before doing anything.',
    ],
    hi: [
      'इस संदेश में दिए गए किसी भी लिंक पर क्लिक न करें और न ही उस नंबर पर फोन करें।',
      'किसी भी हालत में अपना OTP, बैंक पिन या पासवर्ड किसी को न बताएं।',
      'कोई भी ऐप (जैसे AnyDesk, TeamViewer या APK फाइल) बिल्कुल डाउनलोड न करें।',
      'यदि गलती से पैसे कट गए हों, तो तुरंत राष्ट्रीय साइबर हेल्पलाइन 1930 पर कॉल करें।',
      'कुछ भी करने से पहले अपने बच्चों, परिवार के सदस्यों या किसी भरोसेमंद पड़ोसी को यह संदेश दिखाएं।',
    ],
    bn: [
      'এই বার্তার কোনো লিংকে ক্লিক করবেন না এবং দেওয়া নম্বরে ফোন করবেন না।',
      'কোনো অবস্থাতেই নিজের ওটিপি (OTP), ব্যাংক পিন বা পাসওয়ার্ড কাউকে জানাবেন না।',
      'কোনো অজানা অ্যাপ (AnyDesk বা APK ফাইল) কখনোই ফোনে ইনস্টল করবেন না।',
      'টাকা কেটে গিয়ে থাকলে অবিলম্বে জাতীয় সাইবার ক্রাইম হেল্পলাইন ১৯৩০ নম্বরে ফোন করুন।',
      'কোনো পদক্ষেপ নেওয়ার আগে আপনার সন্তান, পরিবারের কোনো সদস্য বা পরিচিত কাউকে এই বার্তাটি দেখান।',
    ],
  };

  return {
    riskLevel,
    score: Math.min(score, 100),
    verdict,
    verdictHi,
    verdictBn,
    categoryName,
    categoryNameHi,
    categoryNameBn,
    indicators,
    recommendations,
    urgencyDetected,
    credentialsRequested,
    impersonationDetected,
    remoteAccessWarning,
    isUnknownOrShort,
    analyzedAt: new Date().toISOString(),
  };
}
