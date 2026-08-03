/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F2EDE6',
          'bg-alt': '#E8E0D6',
          surface: '#FFFFFF',
          text: '#1A1A1A',
          muted: '#5C5C5C',
          accent: '#E8612D',
          'accent-dark': '#C94E1F',
          border: '#D4CCC4',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        pill: '999px',
      },
      boxShadow: {
        editorial: '0 24px 48px rgba(26, 26, 26, 0.12)',
      },
    },
  },
  plugins: [],
};
