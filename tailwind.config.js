/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        brand: {
          dark: '#09090b',
          darker: '#0b0b0c',
          panel: '#121215',
          crimson: '#dc2626',
          alert: '#ef4444',
          warning: '#f59e0b',
          safe: '#10b981',
          accent: '#e11d48',
        }
      }
    },
  },
  plugins: [],
};
