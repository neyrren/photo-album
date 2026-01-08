import type { Config } from 'tailwindcss'

import forms from '@tailwindcss/forms'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f6ff',
          100: '#f3effe',
          200: '#e9dffd',
          300: '#d9c5fb',
          400: '#c4a3f6',
          500: '#a878f0',
          600: '#9358e8',
          700: '#8043d8',
          800: '#6b35c4',
          900: '#5a2ea8',
        },
        secondary: {
          50: '#fdf8f6',
          100: '#fcf1ed',
          200: '#f7dcd5',
          300: '#f0bcb0',
          400: '#e89281',
          500: '#de6f5a',
          600: '#d15241',
          700: '#b73d32',
          800: '#963532',
          900: '#7e2f2d',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #a878f0 0%, #764ba2 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [forms],
}

export default config
