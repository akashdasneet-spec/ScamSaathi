export interface ScamScenario {
  id: string;
  title: string;
  titleHi: string;
  titleBn: string;
  tag: string;
  severity: 'high' | 'caution';
  realisticMessage: string;
  theTrap: {
    en: string;
    hi: string;
    bn: string;
  };
  warningSigns: {
    en: string[];
    hi: string[];
    bn: string[];
  };
  goldenRule: {
    en: string;
    hi: string;
    bn: string;
  };
}

export const PRESET_EXAMPLES = [
  {
    id: 'electricity-bill',
    label: '⚡ Electricity Disconnection (SMS)',
    labelHi: '⚡ बिजली बिल कटने का मैसेज',
    labelBn: '⚡ বিদ্যুৎ সংযোগ কাটার এসএমএস',
    text: 'Dear Consumer, Your electricity power will be disconnected tonight at 09:30 PM from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer Rahul Sharma at 9832104523. Thank you.',
  },
  {
    id: 'digital-arrest',
    label: '🚨 Digital Arrest / CBI Notice (WhatsApp)',
    labelHi: '🚨 सीबीआई / डिजिटल अरेस्ट नोटिस',
    labelBn: '🚨 সিবিআই / ডিজিটাল অ্যারেস্ট নোটিশ',
    text: 'URGENT NOTICE: Mumbai Cyber Crime Branch & CBI has issued an Arrest Warrant against your Aadhaar number for money laundering & narcotics shipment seized at airport. Connect immediately on Skype video call for verification or FIR will be executed within 2 hours.',
  },
  {
    id: 'bank-kyc-apk',
    label: '🏦 SBI KYC Suspended APK (SMS/URL)',
    labelHi: '🏦 एसबीआई बैंक खाता सस्पेंड APK',
    labelBn: '🏦 এসবিআই ব্যাংক অ্যাকাউন্ট ব্লক APK',
    text: 'SBI ALERT: Dear customer your SBI YONO account has been blocked today due to pending PAN KYC. Click http://sbi-kyc-update-portal.xyz/yono.apk to update immediately and avoid permanent suspension.',
  },
  {
    id: 'upi-qr-refund',
    label: '💳 QR Code Scan to Receive Money',
    labelHi: '💳 पैसे पाने के लिए क्यूआर कोड स्कैन',
    labelBn: '💳 টাকা পাওয়ার জন্য কিউআর কোড স্ক্যান',
    text: 'Sir I am sending advance payment of Rs 15,000 for your old sofa. Please scan this attached QR code and enter your 4-digit UPI PIN. The money will immediately be credited into your bank account.',
  },
  {
    id: 'fedex-customs',
    label: '📦 FedEx Fake Parcel Seizure (Call/SMS)',
    labelHi: '📦 फेडेक्स पार्सल ज़ब्ती फर्जी कॉल',
    labelBn: '📦 কাস্টমস পার্সেল বাজেয়াপ্ত কল',
    text: 'FedEx Alert: Parcel AWB #94820 sent from Mumbai to Taiwan containing 5 passports and illegal medicines has been intercepted by Customs. Press 1 to speak with Narcotics Bureau Officer immediately.',
  },
  {
    id: 'legitimate-otp',
    label: '✅ Normal Bank Transaction SMS (Low Risk)',
    labelHi: '✅ असली बैंक ट्रांजेक्शन मैसेज',
    labelBn: '✅ আসল ব্যাংকের লেনদেন এসএমএস',
    text: 'Rs 1,200.00 spent on your SBI Credit Card ending 4092 at DMART on 12-Oct-26. Avl Lmt: Rs 48,000. If this was not you, SMS BLOCK to 567676 or call 1800112211.',
  },
];

export const COMMON_SCAMS: ScamScenario[] = [
  {
    id: 'electricity-scam',
    title: 'Electricity Bill Disconnection SMS Trap',
    titleHi: 'बिजली बिल कटने का फर्जी एसएमएस',
    titleBn: 'বিদ্যুৎ বিল বকেয়া ও লাইন কাটার ভুয়ো ভয়',
    tag: 'UTILITY FRAUD',
    severity: 'high',
    realisticMessage:
      'Dear Consumer, Your electricity power will be disconnected tonight at 09:30 PM from electricity office because your previous month bill was not updated. Please immediately contact our electricity officer at 9832104523.',
    theTrap: {
      en: 'Scammers target elders in the evening when fear of spending the night in darkness is acute. When you call the 10-digit number, the fake "officer" asks you to install AnyDesk or pay a small fee of ₹10 via an unverified link, secretly draining your bank account.',
      hi: 'जालसाज शाम के वक्त यह मैसेज भेजते हैं ताकि अंधेरे का डर सताए। फोन करने पर फर्जी "बिजली अधिकारी" आपसे 10 रुपये जमा करने या AnyDesk ऐप डालने को कहता है और फिर चुपके से सारे पैसे निकाल लेता है।',
      bn: 'সন্ধ্যাবেলা যখন রাতের অন্ধকারে থাকার ভয় তীব্র হয়, তখন এই মেসেজ পাঠানো হয়। ফোন করলে ভুয়ো "বিদ্যুৎ অফিসার" ১০ টাকা পেমেন্ট বা AnyDesk ইনস্টল করতে বলে পুরো ব্যাংক খালি করে দেয়।',
    },
    warningSigns: {
      en: [
        'Sent from an ordinary 10-digit mobile number, not official government SMS IDs like "VK-WBSEDCL" or "BP-BSES".',
        'Imposes a strict panic deadline: "tonight at 09:30 PM".',
        'Demands you call an unverified personal phone number immediately.',
        'Asks you to install remote support apps (AnyDesk, QuickSupport).',
      ],
      hi: [
        'मैसेज किसी साधारण 10-अंकों वाले मोबाइल नंबर से आता है, न कि आधिकारिक सरकारी कोड (जैसे VM-UPPCL) से।',
        'तुरंत घबराने वाली समय सीमा दी जाती है: "आज रात 9:30 बजे बिजली कट जाएगी"।',
        'व्यक्तिगत मोबाइल नंबर पर कॉल करने का दबाव डाला जाता है।',
        'AnyDesk या QuickSupport जैसे ऐप डाउनलोड करने को कहा जाता है।',
      ],
      bn: [
        'সাধারণ ১০ ডিজিটের মোবাইল থেকে পাঠানো হয়, অফিশিয়াল সরকারি এসএমএস হেডার থেকে নয়।',
        'অযথা আতঙ্ক সৃষ্টির সময়সীমা দেওয়া হয়: "আজ রাত ৯:৩০ টায় লাইন কাটা হবে"।',
        'অপরিচিত মোবাইল নম্বরে অবিলম্বে ফোন করার নির্দেশ থাকে।',
        'AnyDesk বা QuickSupport এর মতো স্ক্রিন শেয়ারিং অ্যাপ ইনস্টল করতে বলে।',
      ],
    },
    goldenRule: {
      en: 'Power distribution utilities NEVER cut power at night without issuing a written legal notice sent to your physical meter address.',
      hi: 'बिजली विभाग कभी भी बिना लिखित नोटिस दिए रात में अचानक बिजली नहीं काटता।',
      bn: 'বিদ্যুৎ দপ্তর লিখিত আইনি নোটিশ না পাঠিয়ে কখনোই রাতের বেলা হঠাৎ লাইন বিচ্ছিন্ন করে না।',
    },
  },
  {
    id: 'digital-arrest-scam',
    title: 'Digital Arrest & Law Enforcement Impersonation',
    titleHi: 'डिजिटल अरेस्ट — फर्जी पुलिस व सीबीआई का खौफ',
    titleBn: 'ডিজিটাল অ্যারেস্ট — ভুয়ো পুলিশ ও সিবিআইয়ের ভিডিও কল',
    tag: 'LAW ENFORCEMENT FRAUD',
    severity: 'high',
    realisticMessage:
      'URGENT NOTICE: CBI and Mumbai Police have issued an arrest warrant against your Aadhaar card for money laundering. Join Skype video call immediately for clearance or police team will raid your house in 2 hours.',
    theTrap: {
      en: 'Criminals dress in fake police uniforms, sit in rooms designed like police stations, and show forged Supreme Court or CBI notices on Skype/WhatsApp video calls. They keep the elder under continuous surveillance ("Digital Arrest") for days and coerce them into transferring fixed deposits into "safe government verification accounts".',
      hi: 'धोखेबाज़ फर्जी पुलिस की वर्दी पहनकर वीडियो कॉल करते हैं। वे फर्जी सुप्रीम कोर्ट या सीबीआई के लेटरहेड दिखाकर डराते हैं कि आपका आधार मनी लॉन्ड्रिंग में फंस गया है। वे कहते हैं कि जेल से बचने के लिए अपने सारे पैसे "सरकारी जांच खाते" में ट्रांसफर करें।',
      bn: 'প্রতারকরা পুলিশের পোশাক পরে স্কাইপ বা হোয়াটসঅ্যাপ ভিডিও কলে এসে নকল সিবিআই বা সুপ্রিম কোর্টের পরোয়ানা দেখায়। বৃদ্ধ মানুষদের ঘণ্টার পর ঘণ্টা আতঙ্কে রেখে বলে সমস্ত জমানো ফিক্সড ডিপোজিট তাদের "নিরাপদ সরকারি অ্যাকাউন্টে" পাঠাতে।',
    },
    warningSigns: {
      en: [
        'Claims of "Digital Arrest" — no such term or process exists in Indian Law or the Bharatiya Nagarik Suraksha Sanhita.',
        'Conducting official police investigations over WhatsApp or Skype video calls.',
        'Insisting you keep the door locked and not talk to your family or advocate.',
        'Demanding you transfer money to a bank account to "verify clean funds".',
      ],
      hi: [
        '"डिजिटल अरेस्ट" का दावा — भारतीय कानून में ऐसा कोई प्रावधान या प्रक्रिया मौजूद ही नहीं है।',
        'व्हाट्सएप या स्काइप वीडियो कॉल पर पुलिस जांच करना।',
        'कमरा बंद रखने और परिवार या वकील से बात न करने का दबाव बनाना।',
        'पैसे की जांच के नाम पर किसी भी खाते में ट्रांसफर करने को कहना।',
      ],
      bn: [
        '"ডিজিটাল অ্যারেস্ট" দাবি — ভারতীয় আইন বা সংবিধানে এমন কোনো ব্যবস্থা বা শব্দের অস্তিত্বই নেই।',
        'হোয়াটসঅ্যাপ বা স্কাইপ ভিডিও কলে পুলিশের জবানবন্দি নেওয়া।',
        'পরিবার বা আইনজীবীর সাথে কথা না বলতে দেওয়া এবং ঘর আটকে রাখার নির্দেশ দেওয়া।',
        'টাকা নিরাপদ প্রমাণ করার জন্য কোনো অ্যাকাউন্টে টাকা পাঠানোর দাবি করা।',
      ],
    },
    goldenRule: {
      en: 'There is NO SUCH THING as "Digital Arrest". The Prime Minister of India and Cyber Crime Cell have clearly affirmed: Real police will never investigate or arrest anyone via video call.',
      hi: '"डिजिटल अरेस्ट" जैसी कोई चीज़ नहीं होती। भारत के प्रधानमंत्री और गृह मंत्रालय ने स्पष्ट किया है कि पुलिस कभी भी वीडियो कॉल पर पूछताछ या अरेस्ट नहीं करती।',
      bn: '"ডিজিটাল অ্যারেস্ট" বলে কোনো আইন নেই। আসল পুলিশ বা সিবিআই কখনোই ভিডিও কলে গ্রেফতার বা টাকা দাবি করে না।',
    },
  },
  {
    id: 'bank-kyc-scam',
    title: 'Bank KYC Update & Malicious APK Phishing',
    titleHi: 'बैंक खाता व पैन केवाईसी (KYC) अपडेट जाल',
    titleBn: 'ব্যাংক একাউন্ট প্যান-কেওয়াইসি আপডেট জালিয়াতি',
    tag: 'BANKING PHISHING',
    severity: 'high',
    realisticMessage:
      'SBI ALERT: Dear customer your SBI Netbanking will be blocked today due to pending PAN KYC. Click http://sbi-kyc-verify.xyz/update.apk to update PAN immediately.',
    theTrap: {
      en: 'The link prompts you to download an Android APK file. Once installed, this malicious app asks for SMS permissions, intercepts all incoming bank OTPs, and forwards them directly to the scammer without your knowledge.',
      hi: 'लिंक पर क्लिक करने से एक APK फाइल डाउनलोड होती है। जैसे ही यह इंस्टॉल होती है, यह आपके बैंक के सारे मैसेज और OTP चुपके से धोखेबाज़ को भेज देती है और आपका खाता खाली हो जाता है।',
      bn: 'লিংকে ক্লিক করলে একটি APK ফাইল ডাউনলোড হয়। ফোনে ইনস্টল হওয়ামাত্র এটি আপনার সব ব্যাংক মেসেজ ও ওটিপি প্রতারকের কাছে পাঠিয়ে দেয়।',
    },
    warningSigns: {
      en: [
        'Web links ending in .apk or strange addresses like .xyz or .top.',
        'Threatens immediate blocking of account within a few hours.',
        'Asks you to bypass Google Play Store security to install unknown software.',
      ],
      hi: [
        'वेबसाइट का पता .xyz, .top या .apk पर खत्म होता है।',
        'कुछ ही घंटों में खाता ब्लॉक होने की धमकी।',
        'गूगल प्ले स्टोर के बाहर से अनजान फाइल इंस्टॉल करने को कहना।',
      ],
      bn: [
        'ওয়েবসাইটের ঠিকানা .apk, .xyz বা .top দিয়ে শেষ হয়।',
        'কয়েক ঘণ্টার মধ্যে অ্যাকাউন্ট বাতিল করার ভয় দেখানো।',
        'গুগল প্লে স্টোরের বাইরে থেকে ফাইল ইনস্টল করতে বলা।',
      ],
    },
    goldenRule: {
      en: 'Banks NEVER send APK files. Genuine KYC updates can only be completed inside the official branch or the official bank app installed from the Google Play Store.',
      hi: 'बैंक कभी भी मैसेज में APK फाइल नहीं भेजते। केवाईसी सिर्फ शाखा में जाकर या गूगल प्ले स्टोर के असली ऐप में ही होती है।',
      bn: 'ব্যাংক কখনোই মেসেজে APK ফাইল পাঠায় না। কেওয়াইসি আপডেট কেবলমাত্র ব্যাংক শাখায় বা অফিসিয়াল অ্যাপেই সম্ভব।',
    },
  },
  {
    id: 'qr-code-upi-scam',
    title: 'QR Code "Scan to Receive Money" Fraud',
    titleHi: 'पैसे प्राप्त करने के लिए क्यूआर कोड स्कैन करने का धोखा',
    titleBn: 'টাকা পাওয়ার নামে কিউআর কোড স্ক্যান প্রতারণা',
    tag: 'UPI FRAUD',
    severity: 'high',
    realisticMessage:
      'Sir I have transferred ₹12,000 for your used furniture. Please scan this QR code and type your UPI PIN so the money reflects in your account.',
    theTrap: {
      en: 'Common on OLX, Facebook Marketplace, and housing rentals. The scammer sends a QR code claiming "this will credit money to you". In reality, scanning a QR code and entering your UPI PIN always DEBITS money from your account.',
      hi: 'जालसाज कहता है कि वह आपको पैसे भेज रहा है। वह एक QR कोड भेजता है और कहता है कि अपना पिन दर्ज करें। याद रखें, पिन दर्ज करते ही पैसे आपके खाते से कट जाते हैं!',
      bn: 'প্রতারক বলে সে আপনাকে টাকা পাঠাচ্ছে এবং একটি কিউআর কোড পাঠিয়ে পিন দিতে বলে। মনে রাখবেন, পিন দেওয়া মানেই আপনার অ্যাকাউন্ট থেকে টাকা কেটে নেওয়া!',
    },
    warningSigns: {
      en: [
        'Buyer agrees to purchase an item immediately without bargaining or meeting.',
        'Claims that UPI requires "PIN verification to receive funds".',
        'Sends screenshots of fake "Payment Pending" apps.',
      ],
      hi: [
        'खरीदार बिना मोलभाव किए तुरंत पैसे भेजने को तैयार हो जाता है।',
        'दावा करता है कि पैसे लेने के लिए भी UPI पिन दर्ज करना ज़रूरी है।',
        'फर्जी "पेमेंट पेंडिंग" स्क्रीनशॉट भेजता है।',
      ],
      bn: [
        'ক্রেতা কোনো দরদাম না করেই সাথে সাথে টাকা পাঠাতে রাজি হয়।',
        'দাবি করে যে টাকা ঢুকতে গেলে পিন দিতে হবে।',
        'নকল "পেমেন্ট পেন্ডিং" স্ক্রিনশট পাঠায়।',
      ],
    },
    goldenRule: {
      en: 'YOU NEVER ENTER A UPI PIN TO RECEIVE MONEY. A UPI PIN is ONLY needed when you are PAYING money.',
      hi: 'पैसे प्राप्त करने के लिए कभी भी यूपीआई पिन की ज़रूरत नहीं होती। पिन केवल पैसे कटवाने के लिए डाला जाता है।',
      bn: 'টাকা পাওয়ার জন্য কখনো ইউপিআই পিন দেওয়ার প্রয়োজন হয় না। পিন কেবল টাকা পাঠানোর জন্যই ব্যবহার হয়।',
    },
  },
  {
    id: 'customs-parcel-scam',
    title: 'FedEx / Customs Contraband Parcel Call',
    titleHi: 'फेडेक्स व सीमा शुल्क पार्सल ज़ब्ती का फर्जी कॉल',
    titleBn: 'ভুয়ো ফেডেক্স বা কাস্টমস পার্সেল বাজেয়াপ্তির কল',
    tag: 'COURIER FRAUD',
    severity: 'high',
    realisticMessage:
      'Automated Call: Your FedEx parcel from Mumbai to Taiwan has been confiscated by Customs for containing illegal drugs and fake passports. Press 9 to avoid police arrest.',
    theTrap: {
      en: 'Victims are told an international parcel was booked under their Aadhaar card. The scammer connects them to a fake "Narcotics Officer" who demands payments to clear their name from money-laundering charges.',
      hi: 'कहा जाता है कि आपके नाम से विदेश जा रहे पार्सल में गैरकानूनी सामान मिला है। फिर फर्जी अधिकारी जेल का डर दिखाकर पैसे ऐंठते हैं।',
      bn: 'বলা হয় আপনার আধার নম্বরে বিদেশে পাঠানো পার্সেল থেকে বেআইনি জিনিস পাওয়া গেছে। তারপর মিথ্যে পুলিশি ভয় দেখিয়ে টাকা আদায় করা হয়।',
    },
    warningSigns: {
      en: [
        'Automated IVR robocall stating an unknown parcel has been intercepted.',
        'Claims you will be charged under the NDPS Act unless you pay immediately.',
        'Refusal to let you go to your local police station in person.',
      ],
      hi: [
        'कंप्यूटर जनित आवाज वाला कॉल जो पार्सल पकड़े जाने की बात करता है।',
        'तुरंत पैसे न देने पर गंभीर धाराओं में फंसाने की धमकी।',
        'आपको अपने नजदीकी असली पुलिस स्टेशन जाने से रोकना।',
      ],
      bn: [
        'অটোমেটেড কম্পিউটার ভয়েস কল যা পার্সেল বাজেয়াপ্তের কথা বলে।',
        'টাকা না দিলে ড্রাগস কেসে ফাঁসানোর হুমকি।',
        'স্থানীয় আসল থানায় যেতে বাধা দেওয়া।',
      ],
    },
    goldenRule: {
      en: 'Courier companies NEVER ask for money transfers to settle legal inquiries. Directly cut the call and dial 1930.',
      hi: 'कूरियर कंपनियां कभी भी कानूनी मामलों के निपटारे के लिए पैसे नहीं मांगतीं। तुरंत फोन काटें और 1930 पर शिकायत करें।',
      bn: 'কুরিয়ার কোম্পানি কখনোই কোনো আইনি ঝামেলা মেটাতে টাকা চায় না। সাথে সাথে ফোন কেটে ১৯৩০ নম্বরে জানান।',
    },
  },
  {
    id: 'part-time-job-scam',
    title: 'Part-Time "YouTube Video Like" Telegram Scam',
    titleHi: 'घर बैठे यूट्यूब लाइक कर ₹5000 कमाने का झांसा',
    titleBn: 'ঘরে বসে ইউটিউব লাইক করে দৈনিক উপার্জনের প্রতারণা',
    tag: 'EMPLOYMENT FRAUD',
    severity: 'high',
    realisticMessage:
      'Congratulations! You are selected for online part-time job. Earn ₹3,000 to ₹8,000 daily simply by liking YouTube videos and rating hotels on Google. Join our Telegram channel now.',
    theTrap: {
      en: 'Initially, scammers pay ₹150–₹500 for liking 3 videos to win your trust. Then, they add the elder to a Telegram "VIP investment group" and trick them into depositing lakhs of rupees in "prepaid crypto/merchant tasks" which can never be withdrawn.',
      hi: 'शुरुआत में 3 वीडियो लाइक करने पर सच में ₹200 आपके खाते में भेजते हैं ताकि विश्वास हो जाए। फिर टेलीग्राम ग्रुप में लाखों रुपये "निवेश" करवाकर गायब हो जाते हैं।',
      bn: 'প্রথমে ৩টি ভিডিও লাইক করিয়ে বিশ্বাস অর্জনের জন্য সত্যিই ২০০-৩০০ টাকা পাঠায়। এরপর টেলিগ্রাম গ্রুপে বিনিয়োগের নামে লাখ লাখ টাকা হাতিয়ে নিয়ে লাপাত্তা হয়।',
    },
    warningSigns: {
      en: [
        'Unsolicited WhatsApp message from international country codes (+62, +84, +234, etc.).',
        'Promises unrealistic income for mindless tasks (e.g. ₹5,000/day for pressing like).',
        'Directs you to join a Telegram group for "payments".',
      ],
      hi: [
        'विदेशी नंबरों (+62, +84 आदि) से अचानक आने वाले व्हाट्सएप संदेश।',
        'केवल वीडियो लाइक करने के बदले रोजाना ₹5,000 देने का अवास्तविक वादा।',
        'टेलीग्राम ग्रुप जॉइन करने का निर्देश।',
      ],
      bn: [
        'বিদেশি কান্ট্রি কোড (+62, +84 ইত্যাদি) থেকে আসা অজানা হোয়াটসঅ্যাপ মেসেজ।',
        'সাধারণ লাইক করার বদলে দিনে ৫০০০ টাকা উপার্জনের অবাস্তব দাবি।',
        'টেলিগ্রাম গ্রুপে যোগ দিতে বলা।',
      ],
    },
    goldenRule: {
      en: 'Nobody pays thousands of rupees for simply liking videos. If an offer sounds too good to be true, it is 100% a scam.',
      hi: 'केवल वीडियो लाइक करने पर कोई भी हजारों रुपये नहीं देता। मुफ्त या आसान कमाई का हर ऑफर केवल एक धोखा होता है।',
      bn: 'শুধু ভিডিও লাইক করার জন্য কেউ হাজার হাজার টাকা দেয় না। অবাস্তব উপার্জনের যেকোনো প্রস্তাব পুরোপুরি ভুয়ো।',
    },
  },
];
