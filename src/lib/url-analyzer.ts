import { RiskLevel, SecurityIndicator, AnalysisResult } from './detector';

export function analyzeUrlSafety(rawUrl: string): AnalysisResult {
  const indicators: SecurityIndicator[] = [];
  let score = 0;
  let urgencyDetected = false;
  let credentialsRequested = false;
  const remoteAccessWarning = false;
  let impersonationDetected: string | null = null;
  let categoryName = 'URL Syntax & Link Assessment';
  let categoryNameHi = 'वेबसाइट लिंक सुरक्षा समीक्षा';
  let categoryNameBn = 'ওয়েবসাইট লিংক সুরক্ষা মূল্যায়ন';

  const clean = rawUrl.trim();
  let normalized = clean;
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = 'http://' + normalized;
  }

  let parsed: URL | null = null;
  try {
    parsed = new URL(normalized);
  } catch {
    // Malformed URL
    return {
      riskLevel: 'caution',
      score: 50,
      verdict: 'Malformed or Suspicious Web Address',
      verdictHi: 'अमान्य अथवा संदेहास्पद वेब पता',
      verdictBn: 'ভুল বা সন্দেহজনক ওয়েব ঠিকানা',
      categoryName: 'Unrecognized URL Format',
      categoryNameHi: 'अवैध लिंक प्रारूप',
      categoryNameBn: 'অজ্ঞাত লিংক ফরম্যাট',
      indicators: [
        {
          id: 'malformed-url',
          category: 'suspicious_link',
          severity: 'medium',
          title: 'Malformed or Broken Web Link',
          titleHi: 'टूटा हुआ अथवा अमान्य वेब लिंक',
          titleBn: 'ত্রুটিপূর্ণ বা অস্বাভাবিক ওয়েব লিংক',
          explanation: 'This link has an abnormal structure. Scammers often disguise links or use obfuscated strings to confuse older users.',
          explanationHi: 'यह लिंक मानक वेबसाइट पते जैसा नहीं दिखता। धोखेबाज़ अक्सर छद्म लिंक बनाकर भ्रमित करते हैं।',
          explanationBn: 'এই লিংকটির গঠন স্বাভাবিক ওয়েবসাইটের মতো নয়। প্রতারকরা বিভ্রান্ত করতে প্রায়শই এমন লিংক বানায়।',
          matchedText: clean,
        },
      ],
      recommendations: {
        en: [
          'DO NOT open this link on your phone or computer.',
          'Never type your bank password or phone number on unfamiliar websites.',
          'If you need to visit a service (like SBI, Electricity Board, or Amazon), open your browser and type the official address yourself.',
        ],
        hi: [
          'इस लिंक को अपने फोन या कंप्यूटर पर बिल्कुल न खोलें।',
          'किसी भी अनजान वेबसाइट पर अपना बैंक पासवर्ड, पिन या मोबाइल नंबर न भरें।',
          'यदि आपको किसी सेवा (जैसे बैंक या बिजली विभाग) पर जाना है, तो सीधे गूगल में आधिकारिक नाम लिखकर जाएं।',
        ],
        bn: [
          'আপনার ফোন বা কম্পিউটারে এই লিংকটি খুলবেন না।',
          'অপরিচিত কোনো ওয়েবসাইটে নিজের ব্যাংকের পাসওয়ার্ড, পিন বা ফোন নম্বর দেবেন না।',
          'কোনো জরুরি প্রয়োজনে ব্রাউজারে গিয়ে নিজে সরকারি বা ব্যাংকের আসল ঠিকানা টাইপ করে প্রবেশ করুন।',
        ],
      },
      urgencyDetected: false,
      credentialsRequested: false,
      impersonationDetected: null,
      remoteAccessWarning: false,
      isUnknownOrShort: false,
      analyzedAt: new Date().toISOString(),
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const pathname = parsed.pathname.toLowerCase();

  // 1. IP ADDRESS HOSTNAME CHECK (e.g., http://192.168.1.1/login or http://45.12.89.1)
  const isIpAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname);
  if (isIpAddress) {
    score += 55;
    indicators.push({
      id: 'raw-ip-address',
      category: 'suspicious_link',
      severity: 'high',
      title: 'Raw IP Address Instead of Real Domain Name',
      titleHi: 'वेबसाइट नाम की जगह सीधा आईपी एड्रेस (संख्याएं)',
      titleBn: 'ওয়েবসাইটের নামের বদলে সরাসরি আইপি অ্যাড্রেস',
      explanation: 'Legitimate banks and organizations use registered domain names (like sbi.co.in). Raw numbers are a major hallmark of malicious phishing servers.',
      explanationHi: 'असली बैंक या सरकारी संस्थान sbi.co.in जैसे नाम इस्तेमाल करते हैं। केवल अंकों (IP) वाले लिंक प्रायः हैकर्स के बनाए जाल होते हैं।',
      explanationBn: 'আসল ব্যাংক বা সরকারি দপ্তর নিজস্ব নাম (যেমন sbi.co.in) ব্যবহার করে। কেবল সংখ্যার লিংক সাইবার অপরাধীদের ফাঁদ হতে পারে।',
      matchedText: hostname,
    });
  }

  // 2. KNOWN URL SHORTENERS (Hiding final destination)
  const shorteners = ['bit.ly', 'tinyurl.com', 'is.gd', 'cutt.ly', 'rb.gy', 't.co', 'ow.ly', 'shorturl.at', 'buff.ly', 'v.gd'];
  if (shorteners.some((s) => hostname === s || hostname.endsWith('.' + s))) {
    score += 35;
    categoryName = 'URL Shortener (Hidden Destination)';
    categoryNameHi = 'संक्षिप्त लिंक (छुपा हुआ असली पता)';
    categoryNameBn = 'সংক্ষিপ্ত লিংক (লুকানো আসল ঠিকানা)';
    indicators.push({
      id: 'url-shortener',
      category: 'suspicious_link',
      severity: 'medium',
      title: 'URL Shortener Hiding True Destination',
      titleHi: 'शॉर्ट लिंक द्वारा असली वेबसाइट का छुपाया जाना',
      titleBn: 'সংক্ষিপ্ত লিংকের মাধ্যমে আসল পরিচয় গোপন করা',
      explanation: 'Shortened links (like bit.ly) are used to disguise dangerous destinations. You cannot see what website you will reach until it is too late.',
      explanationHi: 'bit.ly जैसे छोटे लिंक का इस्तेमाल असली फर्जी वेबसाइट को छुपाने के लिए किया जाता है ताकि आप धोखा खा जाएं।',
      explanationBn: 'bit.ly বা tinyurl লিংক ব্যবহার করে বিপদজনক আসল ঠিকানা আড়াল করা হয় যাতে আপনি বুঝতে না পারেন।',
      matchedText: hostname,
    });
  }

  // 3. SUSPICIOUS HIGH-ABUSE TLDs
  const suspiciousTlds = ['.xyz', '.top', '.club', '.work', '.click', '.buzz', '.cam', '.live', '.rest', '.gq', '.cf', '.tk', '.ml'];
  const hasSuspiciousTld = suspiciousTlds.some((tld) => hostname.endsWith(tld));
  if (hasSuspiciousTld) {
    score += 35;
    indicators.push({
      id: 'suspicious-tld',
      category: 'suspicious_link',
      severity: 'high',
      title: 'High-Risk Cheap or Disposable Domain Extension',
      titleHi: 'संदिग्ध एक्सटेंशन वाली वेबसाइट (.xyz, .top, ইত্যাদি)',
      titleBn: 'সন্দেহজনক ডোমেন এক্সটেনশন (.xyz, .top ইত্যাদি)',
      explanation: 'Indian public institutions and banks use ".in", ".gov.in", or ".co.in". Cheap disposable domains like .xyz or .top are heavily favored by cybercriminals.',
      explanationHi: 'भारतीय बैंक और सरकारी संस्थान .in या .co.in इस्तेमाल करते हैं। .xyz या .top जैसे लिंक अपराधी फर्जी पेजों के लिए खरीदते हैं।',
      explanationBn: 'ভারতের ব্যাংক ও সরকারি সংস্থা .in বা .gov.in ব্যবহার করে। .xyz বা .top ডোমেন প্রায়ই প্রতারকদের কেনা সস্তা ঠিকানা।',
    });
  }

  // 4. BANK / BRAND IMPERSONATION IN SUBDOMAINS OR PATHS
  const brandKeywords = [
    { key: 'sbi', name: 'State Bank of India (SBI)' },
    { key: 'hdfc', name: 'HDFC Bank' },
    { key: 'icici', name: 'ICICI Bank' },
    { key: 'paytm', name: 'Paytm' },
    { key: 'phonepe', name: 'PhonePe' },
    { key: 'googlepay', name: 'Google Pay' },
    { key: 'electricity', name: 'Electricity Utility' },
    { key: 'bijli', name: 'Electricity Department' },
    { key: 'bses', name: 'BSES Delhi' },
    { key: 'wbsedcl', name: 'WBSEDCL Bengal' },
    { key: 'income-tax', name: 'Income Tax Dept' },
    { key: 'aadhaar', name: 'UIDAI Aadhaar' },
  ];

  for (const brand of brandKeywords) {
    if (hostname.includes(brand.key) || pathname.includes(brand.key)) {
      // Check if it's genuinely the official domain
      const isOfficial =
        (brand.key === 'sbi' && (hostname.endsWith('onlinesbi.sbi') || hostname.endsWith('sbi.co.in'))) ||
        (brand.key === 'hdfc' && hostname.endsWith('hdfcbank.com')) ||
        (brand.key === 'icici' && hostname.endsWith('icicibank.com')) ||
        (brand.key === 'paytm' && hostname.endsWith('paytm.com')) ||
        (brand.key === 'aadhaar' && hostname.endsWith('uidai.gov.in'));

      if (!isOfficial) {
        score += 45;
        impersonationDetected = brand.name;
        categoryName = `Fake ${brand.name} Phishing Portal`;
        categoryNameHi = `फर्जी ${brand.name} क्लोन वेबसाइट`;
        categoryNameBn = `ভুয়ো ${brand.name} নকল পোর্টাল`;
        indicators.push({
          id: `impersonate-${brand.key}`,
          category: 'impersonation',
          severity: 'high',
          title: `Brand Name Misuse (${brand.name})`,
          titleHi: `${brand.name} के नाम का अनधिकृत इस्तेमाल`,
          titleBn: `${brand.name} এর নাম নকল করার চেষ্টা`,
          explanation: `This link contains "${brand.key}", but the actual website host is "${hostname}". Scammers create fake look-alike pages to harvest your credentials.`,
          explanationHi: `इस लिंक में "${brand.key}" लिखा है लेकिन मुख्य वेबसाइट "${hostname}" है। यह बैंक की असली वेबसाइट नहीं है।`,
          explanationBn: `লিংকটিতে "${brand.key}" লেখা থাকলেও আসল ওয়েবসাইটটি "${hostname}"। এটি ব্যাংকের আসল ঠিকানা নয়।`,
          matchedText: hostname,
        });
        break;
      }
    }
  }

  // 5. SUSPICIOUS FILE EXTENSION (.apk download trigger)
  if (pathname.endsWith('.apk') || pathname.includes('.apk?') || clean.includes('.apk')) {
    score += 50;
    categoryName = 'Malicious Android APK App Download';
    categoryNameHi = 'खतरनाक एंड्रॉयड ऐप (.apk) डाउनलोड लिंक';
    categoryNameBn = 'ক্ষতিকর অ্যান্ড্রয়েড অ্যাপ (.apk) ডাউনলোড লিংক';
    indicators.push({
      id: 'apk-download',
      category: 'remote_access',
      severity: 'high',
      title: 'Direct Android APK Application Installer',
      titleHi: 'सीधे एंड्रॉयड ऐप (.apk) डाउनलोड कराने का प्रयास',
      titleBn: 'সরাসরি ক্ষতিকর অ্যান্ড্রয়েড APK অ্যাপ ইনস্টল করার নির্দেশ',
      explanation: 'Legitimate services never ask elders to download .apk files via SMS or WhatsApp links. Such apps contain trojans that steal your OTPs silently.',
      explanationHi: 'कोई भी असली कंपनी मैसेज में APK फाइल नहीं भेजती। ऐसी फाइलें आपके फोन में जाकर बैंक के सारे OTP चुपके से चुरा लेती हैं।',
      explanationBn: 'আসল সংস্থা মেসেজে কখনো APK ফাইল দেয় না। এই ফাইল ডাউনলোড করলে ফোনের গোপন ওটিপি প্রতারকদের হাতে চলে যায়।',
    });
  }

  // 6. FREE HOSTING OR TUNNELING PLATFORMS
  const freeHostingServices = [
    'ngrok-free.app',
    'firebaseapp.com',
    'web.app',
    'pages.dev',
    '000webhostapp.com',
    'glitch.me',
    'weebly.com',
    'wixsite.com',
    'surge.sh',
  ];
  if (freeHostingServices.some((svc) => hostname.endsWith(svc))) {
    score += 25;
    indicators.push({
      id: 'free-hosting-service',
      category: 'suspicious_link',
      severity: 'medium',
      title: 'Hosted on Free Hosting or Temporary Tunnel',
      titleHi: 'अस्थायी अथवा मुफ्त वेब-होस्टिंग प्लेटफॉर्म पर बना पेज',
      titleBn: 'সাময়িক বা ফ্রি ওয়েব-হোস্টিং সার্ভারে তৈরি পেজ',
      explanation: 'Scammers frequently launch quick fake pages on free hosting platforms to evade detection.',
      explanationHi: 'धोखेबाज़ पकड़े जाने से बचने के लिए अक्सर मुफ्त होस्टिंग साइटों पर फर्जी पेज बनाकर लिंक भेजते हैं।',
      explanationBn: 'ধরা পড়ার হাত থেকে বাঁচতে প্রতারকরা প্রায়ই ফ্রি হোস্টিংয়ে ভুয়ো পেজ তৈরি করে পাঠায়।',
    });
  }

  // 7. PUNYCODE / HOMOGRAPH ATTEMPT
  if (hostname.includes('xn--')) {
    score += 40;
    indicators.push({
      id: 'punycode-homograph',
      category: 'suspicious_link',
      severity: 'high',
      title: 'Punycode / Homograph Deception Detected',
      titleHi: 'समान दिखने वाले फर्जी अक्षरों का छद्मवेष (होमोग्राफ हमला)',
      titleBn: 'একইরকম দেখতে ভুয়ো অক্ষরের কারসাজি',
      explanation: 'The website address uses special international characters that look identical to genuine bank names but take you to an attacker site.',
      explanationHi: 'यह लिंक दिखने में असली बैंक जैसा लगता है मगर इसमें धोखे के विशेष अक्षर हैं जो आपको जालसाज की साइट पर ले जाएंगे।',
      explanationBn: 'লিংকটি দেখতে ব্যাংকের মতো হলেও এতে বিশেষ অক্ষর লুকানো আছে যা ক্ষতিকর ওয়েবসাইটে নিয়ে যাবে।',
    });
  }

  // 8. UNENCRYPTED HTTP SENSITIVE REQUEST
  if (parsed.protocol === 'http:') {
    score += 15;
    indicators.push({
      id: 'unencrypted-http',
      category: 'suspicious_link',
      severity: 'medium',
      title: 'Insecure Unencrypted Connection (HTTP)',
      titleHi: 'असुरक्षित कनेक्शन (HTTP) — सुरक्षित पैडलॉक गायब',
      titleBn: 'অসুরক্ষিত সংযোগ (HTTP) — কোনো সুরক্ষা তালা নেই',
      explanation: 'Modern banks always use secure encrypted connections (HTTPS with a lock icon). Never enter private details on plain HTTP sites.',
      explanationHi: 'सभी असली बैंक सुरक्षित HTTPS कनेक्शन इस्तेमाल करते हैं। कभी भी ऐसे लिंक पर निजी विवरण न भरें।',
      explanationBn: 'সমস্ত আসল ব্যাংক সুরক্ষিত HTTPS সংযোগ ব্যবহার করে। এই পেজে কখনোই নিজের ব্যক্তিগত তথ্য দেবেন না।',
    });
  }

  // Determine final risk level
  let riskLevel: RiskLevel = 'low';
  let verdict = 'No Obvious Hostile Link Signals';
  let verdictHi = 'कोई स्पष्ट हानिकारक लिंक संकेत नहीं मिले';
  let verdictBn = 'কোনো স্পষ্ট ক্ষতিকর লিংক সংকেত মেলেনি';

  if (score >= 40) {
    riskLevel = 'high';
    verdict = 'High Risk Phishing or Malicious Link';
    verdictHi = 'अत्यंत खतरनाक फ़िशिंग या हानिकारक लिंक';
    verdictBn = 'অত্যন্ত বিপদজনক ফিশিং বা ক্ষতিকর লিংক';
  } else if (score >= 20) {
    riskLevel = 'caution';
    verdict = 'Unverified or Potentially Risky Link';
    verdictHi = 'अपुष्ट अथवा संभावित रूप से जोखिम भरा लिंक';
    verdictBn = 'অযাচাইকৃত বা ঝুঁকিপূর্ণ লিংক';
  } else {
    // low risk still needs clear elder caution
    verdict = 'No Obvious Malicious Pattern — Still Exercise Caution';
    verdictHi = 'कोई स्पष्ट दुर्भावनापूर्ण पैटर्न नहीं — फिर भी सतर्क रहें';
    verdictBn = 'কোনো স্পষ্ট ক্ষতিকর লক্ষণ নেই — তবুও সতর্ক থাকুন';
  }

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
    recommendations: {
      en: [
        'DO NOT open this link on your mobile phone or browser.',
        'Never enter your Aadhaar, PAN card, or bank account credentials on any web link received in SMS.',
        'If in doubt, call the official customer care number written on the back of your bank debit card.',
        'Remember: We analyzed only the URL syntax safely without visiting or running the site.',
      ],
      hi: [
        'इस लिंक को अपने मोबाइल फोन या कंप्यूटर पर न खोलें।',
        'एसएमएस या व्हाट्सएप पर आए लिंक में कभी भी अपना आधार नंबर, पैन नंबर या बैंक डिटेल न भरें।',
        'संदेह होने पर अपने बैंक एटीएम कार्ड के पीछे लिखे आधिकारिक कस्टमर केयर नंबर पर फोन करें।',
        'ध्यान दें: हमने बिना वेबसाइट खोले केवल लिंक के पते की सुरक्षा जांच की है।',
      ],
      bn: [
        'এই লিংকটি নিজের মোবাইল বা কম্পিউটারে ভুলেও খুলবেন না।',
        'এসএমএস বা হোয়াটসঅ্যাপে পাওয়া কোনো লিংকে নিজের আধার নম্বর, প্যান নম্বর বা ব্যাংকের তথ্য দেবেন না।',
        'সন্দেহ হলে নিজের ব্যাংক ডেবিট কার্ডের পেছনে লেখা অফিশিয়াল কাস্টমার কেয়ার নম্বরে ফোন করুন।',
        'মনে রাখবেন: সাইটটিতে প্রবেশ না করে কেবল লিংকের গঠন পরীক্ষা করা হয়েছে।',
      ],
    },
    urgencyDetected,
    credentialsRequested,
    impersonationDetected,
    remoteAccessWarning,
    isUnknownOrShort: false,
    analyzedAt: new Date().toISOString(),
  };
}
