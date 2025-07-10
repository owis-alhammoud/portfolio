export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          100: '#f5f5f5',
          900: '#1f1f1f',
        },
        primary: {
          DEFAULT: '#38bdf8',
          dark: '#0ea5e9',
        },
        accent: {
          DEFAULT: '#84cc16',
          dark: '#4ade80',
        }
      }
    }
  },
  plugins: [],
};
