import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#050505',
          elevated: '#0A0A0A',
        },
        border: {
          subtle: 'rgba(255,255,255,0.06)',
          DEFAULT: 'rgba(255,255,255,0.08)',
          strong: 'rgba(255,255,255,0.12)',
        },
        text: {
          primary: '#FAFAFA',
          secondary: 'rgba(250,250,250,0.6)',
          tertiary: 'rgba(250,250,250,0.35)',
        },
        accent: {
          blue: '#3B82F6',
          violet: '#8B5CF6',
        },
      },
      fontFamily: {
        heading: ['Clash Display', 'Space Grotesk', 'sans-serif'],
        body: ['Geist', 'Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 120s linear infinite',
        'spin-slower': 'spin 200s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require("daisyui")],
}
export default config
