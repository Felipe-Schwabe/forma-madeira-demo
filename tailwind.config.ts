import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#232724',
        olive: '#343c31',
        sand: '#e8dfd1',
        paper: '#f6f3ec',
        wood: '#8a6248',
      },
      fontFamily: {
        display: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Arial', 'Helvetica Neue', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
