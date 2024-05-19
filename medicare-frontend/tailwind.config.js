
/** @type {import('tailwindcss').Config} */

const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors: {
        'login-color': '#c3e9ed',
        'input-color': '#f2f3f2',
        'submit-color': '#0B8FAC',
        'super-admin-color': '#E2E9FA',
        'super-admin-submit': '#353381',
        'super-admin-submit-hover': '#99c2f1',
        'admin-submit': '#446698',
        'admin-hover': '#B3C4E0',
      },
      screens: {
        '2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
  
        'xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }
  
        'lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
        
        'sidebar-size': {'max': '890px'},
        // => @media (max-width: 890px) { ... }
  
        'md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }
  
        'sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
      }
    },
  },
  plugins: [],
});

