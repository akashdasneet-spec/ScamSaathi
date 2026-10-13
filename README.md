# ScamSaathi (स्कैमसाथी / স্ক্যামসাথী) 🛡️
> **"Protection Without Panic"** — An AI-Assisted Digital Safety Companion for Seniors in India.

ScamSaathi is an accessible, production-minded digital security companion designed specifically for older adults in India. It empowers elders and their families to assess suspicious SMS messages, WhatsApp forwards, phone calls, emails, and web links; explains fraud mechanics in clear, compassionate language without cybersecurity jargon; and provides immediate, panic-free next steps.

---

## 🎯 The Social Problem & Impact
- **The Senior Vulnerability:** Over ₹1,750+ Crore was lost to cyber fraud in India in 2024 alone. Fraudsters systematically target older adults using manufactured panic (e.g. *“Electricity power disconnected tonight at 9:30 PM”* or *“Digital Arrest warrant issued by CBI/Mumbai Police”*).
- **The Psychological Trap:** Elders often feel ashamed or hesitant to ask younger family members for fear of appearing technologically illiterate. Scammers rely on isolation and hurry to force hasty transfers.
- **The ScamSaathi Solution:** A calm, high-contrast, multi-lingual companion that immediately deconstructs the threat, provides audio explanation, allows one-click WhatsApp sharing with trusted family members, and directs users to the National Cyber Crime Helpline (**1930**).

---

## 🚀 Key Features

| Feature | Description |
| :--- | :--- |
| **Instant Scam Assessment** | Analyzes messages, calls, or suspicious URLs and classifies them into **Low Risk**, **Caution**, or **High Risk** with score transparency (0–100). |
| **Senior-Friendly Explanations** | Translates technical threats into simple, caring advice. Grounded in deterministic indicators with optional AI explanation. |
| **Safe Zero-Fetch URL Engine** | Inspects domain syntax, suspicious TLDs (`.xyz`, `.top`), IP addresses, homographs, and APK downloads **without ever making network requests** or executing attacker payloads. |
| **3 Indian Languages** | Native support with instant switching across **English**, **हिन्दी (Hindi)**, and **বাংলা (Bengali)**. |
| **Voice & Accessibility** | Integrated Web Speech API text-to-speech (TTS), font size magnification (A / A+ / A++), and high-contrast dark/black mode. |
| **Privacy-First (Zero Logs)** | Automatic client-side masking of phone numbers, Aadhaar patterns, and card digits before processing. Zero message storage on servers. |
| **Consent-Based Family Share** | One-click WhatsApp and clipboard sharing so seniors can effortlessly ask children or trusted contacts for help. |
| **Hall of Common Scams** | Deep educational case studies covering Electricity SMS scams, Digital Arrest, Bank KYC APK traps, and UPI QR code tricks. |
| **Official Helpline Integration** | Prominent links and direct dial triggers for the Government of India Cyber Crime Helpline (**1930**) and Elder Line (**14567**). |

---

## 🏗️ Architecture & Security Design

```
                   ┌──────────────────────────────────────────────┐
                   │               User Interface                 │
                   │   Next.js 14 / TypeScript / Tailwind CSS     │
                   │   - Multilingual: EN / HI / BN               │
                   │   - Accessibility: Font Zoom & High Contrast │
                   └──────────────────────┬───────────────────────┘
                                          │
                        Client-side PII Masking (Phone/Aadhaar/Card)
                                          │
                                          ▼
                   ┌──────────────────────────────────────────────┐
                   │             /api/analyze Endpoint            │
                   └───────┬──────────────────────────────┬───────┘
                           │                              │
                           ▼                              ▼
             ┌───────────────────────────┐  ┌───────────────────────────┐
             │ Deterministic Text Engine │  │ Safe URL Analyzer         │
             │ - Urgency & threats       │  │ - ZERO network fetch      │
             │ - OTP / PIN extraction    │  │ - IP address hostname     │
             │ - Impersonation (CBI, SBI)│  │ - Malicious TLDs & short  │
             │ - Remote tools & APKs     │  │ - APK file targets        │
             └─────────────┬─────────────┘  └─────────────┬─────────────┘
                           │                              │
                           └──────────────┬───────────────┘
                                          │
                                          ▼
                         ┌─────────────────────────────────┐
                         │ Optional Generative Explainer   │
                         │ - Google Gemini / OpenAI        │
                         │ - Strict anti-hallucination     │
                         │ - 100% deterministic fallback   │
                         └────────────────┬────────────────┘
                                          │
                                          ▼
                         ┌─────────────────────────────────┐
                         │ Transparent Safety Verdict      │
                         │ - Risk score (0-100)            │
                         │ - Audio Speech Synthesis        │
                         │ - One-click WhatsApp Family     │
                         └─────────────────────────────────┘
```

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS with custom editorial theme, Plus Jakarta Sans, and Caveat fonts
- **Icons:** Lucide React
- **Audio:** Web Speech Synthesis API
- **Deployment:** Vercel ready (zero native build dependencies)

---

## 💻 Getting Started Locally

### 1. Prerequisites
- Node.js 18+ (tested on Node v20/v24)
- npm or yarn

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/your-username/ScamSathi.git
cd ScamSathi

# Install dependencies
npm install
```

### 3. Environment Variables (Optional)
ScamSaathi includes an offline-capable deterministic security engine that operates without any API keys. To enable AI-generated conversational explanations:

```bash
cp .env.example .env.local
```

Add either:
```env
# Recommended
GEMINI_API_KEY=your_gemini_api_key_here

# Or OpenAI
OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

The repository contains automated unit and integration tests verifying all fraud detection vectors and PII sanitization:

```bash
# Test the security detection engine & safe URL analyzer
npx tsx scripts/test-engine.mjs

# Test API route handling, PII redaction, and multilingual inputs
npx tsx scripts/test-api.ts

# Production build check
npm run build
```

---

## 🚢 Deploying to Vercel

1. Push your code to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your ScamSaathi repository.
4. *(Optional)* Under **Environment Variables**, add `GEMINI_API_KEY` or `OPENAI_API_KEY`.
5. Click **Deploy**. Vercel will build and host the Next.js application automatically with zero configuration.

---

## ⚠️ Capabilities & Honest Limitations

### What ScamSaathi DOES:
- Detects signature psychological manipulation patterns (artificial deadlines, threats of disconnection, fake arrest orders).
- Identifies demands for sensitive credentials (OTPs, PINs, Netbanking passwords, remote screen-sharing tools).
- Flags high-risk URL syntax (raw IPs, untrusted disposable TLDs, APK links) safely without connecting to hostile servers.
- Protects user privacy by stripping phone numbers, card figures, and Aadhaar numbers.

### What ScamSaathi CANNOT and DOES NOT do:
- **No 100% Safety Guarantee:** A "Low Risk" result does not certify that an unknown message is completely benign. Cybercriminals invent novel variants daily.
- **No Threat Intelligence API Invention:** ScamSaathi does not pretend to query proprietary threat intelligence databases; all detection logic is transparent and verifiable.
- **No Network Execution of Links:** ScamSaathi strictly refuses to visit submitted links, ensuring elder devices are never exposed to drive-by exploits or tracking pixels.

---

## 🤝 Emergency Helplines (India)
- **National Cyber Crime Helpline:** **1930** (Toll-Free, 24x7)
- **National Cyber Portal:** [cybercrime.gov.in](https://cybercrime.gov.in)
- **Senior Citizen Helpline (Elder Line):** **14567** (Toll-Free)
- **Emergency Police / Disaster:** **112**

---

## 📄 License & Student Submission Notice
Created for student social-impact innovation and hackathon submissions. Released under the MIT License.
