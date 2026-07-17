import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050505',
          2: '#0a0a0a',
          3: '#111111',
        },
        card: '#0e0e0e',
        border: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          hover: 'rgba(255,255,255,0.15)',
        },
        text: {
          DEFAULT: '#f0f0f0',
          2: '#a8a8a8',
          3: '#5a5a5a',
        },
        accent: {
          DEFAULT: '#ffffff',
          gold: '#c9a96e',
          blue: '#4a9eff',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
        xs: ['12px', { lineHeight: '1.4' }],
        sm: ['14px', { lineHeight: '1.6' }],
        base: ['16px', { lineHeight: '1.75' }],
        lg: ['18px', { lineHeight: '1.6' }],
        xl: ['20px', { lineHeight: '1.4' }],
        '2xl': ['24px', { lineHeight: '1.2' }],
        '3xl': ['32px', { lineHeight: '1.1' }],
        '4xl': ['42px', { lineHeight: '1.0' }],
        '5xl': ['56px', { lineHeight: '1.1' }],
        '6xl': ['72px', { lineHeight: '0.95' }],
        '7xl': ['80px', { lineHeight: '0.95' }],
        '8xl': ['90px', { lineHeight: '0.95' }],
        '9xl': ['96px', { lineHeight: '0.95' }],
      },
      letterSpacing: {
        tightest: '-0.055em',
        tighter: '-0.04em',
        tight: '-0.025em',
        wider: '0.08em',
        widest: '0.16em',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '18px',
        xl: '24px',
        '2xl': '32px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
      },
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        waveform: {
          '0%, 100%': { scaleY: '0.4' },
          '50%': { scaleY: '1' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        float: 'float 4s ease-in-out infinite',
        spin: 'spin 1.5s linear infinite',
        waveform: 'waveform 1.2s ease-in-out infinite',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        scaleIn: 'scaleIn 0.5s ease-out forwards',
        scrollLine: 'scrollLine 2.4s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '4px',
      },
      maxWidth: {
        container: '1440px',
        wrapper: '1600px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '120px',
        '35': '140px',
        '40': '160px',
        '50': '200px',
        '88': '22rem',
        '128': '32rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [],
};

export default config;
