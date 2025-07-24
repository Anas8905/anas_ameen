/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        'bg-light': '#f2f5f8',
        'section-light': '#ffffff',
        'text-primary-light': '#000000',
        'nav-light': '#000000',
        "border-light": '#CCCCCC',

        // Dark mode colors
        'bg-dark': '#000000',
        'section-dark': '#1C1E20',
        'text-primary-dark': '#ffffff',
        'nav-dark': '#1C1E20',
        'border-dark': '#494b4d',

        // Common colors
        'white': '#ffffff',
        'black': '#000000',
        'border-portfolio': '#F8F9FA',
        'text-secondary': '#838485',
        'nav-active': '#ffffff',//nav seleted/current section item indication dashed rotating circle 24x24px on the right end
        'nav-inactive': '#ffffffb3'//rest of the nav items indication dot 4x4px on the right end,
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        open_sans: ['var(--font-open-sans)', 'sans-serif'],
        roboto_mono: ['var(--font-roboto-mono)', 'monospace'],
      },
      fontSize: {
        'name': '72px',
        'section-heading': '40px',
        'project-heading': '32px',
        'experience-title': '20px',
        'nav-text': '14px',
        'stats-number': '56px',
        'secondary-text': '16px',
      },
      animation: {
        'spin-slow': 'spin 2s linear infinite',
      }
    },
  },
  plugins: [],
}