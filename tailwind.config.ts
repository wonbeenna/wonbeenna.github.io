import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primaryColor: '#0074d0',
      primaryGradient01: '#2ca2b4',
      primaryGradient02: '#7f87ff',
      primaryGradient03: '#5598de',
      primaryGradient04: '#f65aad',
      primaryGradient05: '#ec3d43',

      white: '#ffffff',
      black: '#333333',

      gray100: '#f7f7f7',
      gray200: '#f1f1f1',
      gray300: '#e7e7e7',
      gray400: '#dddddd',
      gray500: '#c7c7c7',
      gray600: '#a6a6a6',
      gray700: '#858585',
      gray800: '#777777',
      gray900: '#626262'
    },
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
};
export default config;
