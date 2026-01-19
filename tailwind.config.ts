import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Warm, earthy tones inspired by Reid's love of the outdoors
        forest: {
          50: '#f6f7f4',
          100: '#e3e7dc',
          200: '#c7cfba',
          300: '#a4b191',
          400: '#839470',
          500: '#667856',
          600: '#505f44',
          700: '#404b38',
          800: '#363e30',
          900: '#2f362b',
          950: '#171c14',
        },
        warmstone: {
          50: '#faf8f5',
          100: '#f2ede5',
          200: '#e4d9c9',
          300: '#d2c0a6',
          400: '#bea382',
          500: '#b08d68',
          600: '#a37a5c',
          700: '#88634d',
          800: '#6f5244',
          900: '#5b453a',
          950: '#30231e',
        },
        sky: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        ember: {
          50: '#fef7ee',
          100: '#fdedd7',
          200: '#fad6ae',
          300: '#f6b87a',
          400: '#f19144',
          500: '#ed7420',
          600: '#de5a16',
          700: '#b84314',
          800: '#933618',
          900: '#772f17',
          950: '#40150a',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in-slow': 'fadeIn 2s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
