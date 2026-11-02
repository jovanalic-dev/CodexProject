/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,html}'],
  corePlugins: {
    preflight: false
  },
  theme: {
    extend: {
      colors: {
        ink: '#182522',
        accent: '#246b58',
        paper: '#f4f5f1'
      }
    }
  },
  plugins: []
};
