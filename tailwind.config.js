export default {
  content: ['./index.html', './*.{ts,tsx}', './components/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Poppins', 'sans-serif']
      },
      colors: {
        navy: '#0E2A33',
        ink: { 900: '#071318', 800: '#0B1E26' },
        accent: { DEFAULT: '#E2FD48', hover: '#D4ED3F' },
        mist: '#F3F6F7',
        paper: '#F5F5F3'
      },
      borderRadius: { block: '20px' },
      boxShadow: { cta: '0 0 30px rgba(226,253,72,0.15)' }
    }
  }
}
