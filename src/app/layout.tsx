import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ScamSaathi — Digital Safety Companion for Indian Seniors',
  description:
    'An accessible, AI-assisted digital safety companion protecting elderly citizens in India from SMS scams, fake calls, digital arrest threats, and phishing links.',
  keywords: [
    'ScamSaathi',
    'Senior Citizen Safety',
    'India Cyber Fraud',
    'Digital Arrest',
    'Electricity Bill Scam',
    'KYC Fraud',
    '1930 Helpline',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="text-scale-normal scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Caveat:wght@600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-red-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
