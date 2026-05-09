import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg':         '#080808',
        'surface':    '#111111',
        'surface-2':  '#1a1a1a',
        'text':       '#f0ebe3',
        'muted':      '#4a4540',
        'accent':     '#c4a25a',
        'accent-dim': 'rgba(196,162,90,0.1)',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        heading:  ['var(--font-syne)',       'sans-serif'],
        body:     ['var(--font-dm-sans)',    'sans-serif'],
        mono:     ['var(--font-space-mono)', 'monospace'],
      },
      animation: {
        'grain':      'grain 8s steps(10) infinite',
        'float':      'float 6s ease-in-out infinite',
        'line-draw':  'lineDraw 2s ease-out forwards',
        'fade-up':    'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%':       { transform: 'translate(-5%, -10%)' },
          '20%':       { transform: 'translate(-15%, 5%)' },
          '30%':       { transform: 'translate(7%, -25%)' },
          '40%':       { transform: 'translate(-5%, 25%)' },
          '50%':       { transform: 'translate(-15%, 10%)' },
          '60%':       { transform: 'translate(15%, 0%)' },
          '70%':       { transform: 'translate(0%, 15%)' },
          '80%':       { transform: 'translate(3%, 35%)' },
          '90%':       { transform: 'translate(-10%, 10%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        lineDraw: {
          from: { strokeDashoffset: '1000' },
          to:   { strokeDashoffset: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
