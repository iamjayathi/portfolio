/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg:      '#0d1117',
        surface: '#161b22',
        raised:  '#1c2333',
        border:  '#30363d',
        cyan:    { DEFAULT: '#22d3ee', dim: '#0e7490', light: '#67e8f9' },
        ink:     { DEFAULT: '#c9d1d9', muted: '#8b949e', dim: '#6e7681' },
        green:   { DEFAULT: '#3fb950', dim: '#1a7f37' },
        yellow:  { DEFAULT: '#d29922', dim: '#9e6a03' },
        red:     { DEFAULT: '#f85149', dim: '#b91c1c' },
        purple:  { DEFAULT: '#bc8cff', dim: '#8957e5', light: '#d8b4fe' },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-up':   { '0%':{ opacity:'0', transform:'translateY(20px)' }, '100%':{ opacity:'1', transform:'translateY(0)' } },
        marquee:     { '0%':{ transform:'translateX(0)' }, '100%':{ transform:'translateX(-50%)' } },
        blink:       { '0%,100%':{ opacity:'1' }, '50%':{ opacity:'0' } },
        float:       { '0%,100%':{ transform:'translateY(0)' }, '50%':{ transform:'translateY(-8px)' } },
        'pulse-dot': { '0%,100%':{ boxShadow:'0 0 0 0 rgba(34,211,238,0.4)' }, '50%':{ boxShadow:'0 0 0 6px rgba(34,211,238,0)' } },
        'slide-in':  { '0%':{ opacity:'0', transform:'translateX(-10px)' }, '100%':{ opacity:'1', transform:'translateX(0)' } },
        'widen':     { '0%':{ maxWidth:'700px' }, '100%':{ maxWidth:'100%' } },
        shimmer:     { '0%':{ backgroundPosition:'-200% center' }, '100%':{ backgroundPosition:'200% center' } },
      },
      animation: {
        'fade-up':   'fade-up 0.55s ease forwards',
        marquee:     'marquee 30s linear infinite',
        blink:       'blink 1s step-end infinite',
        float:       'float 3s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        'slide-in':  'slide-in 0.3s ease forwards',
        shimmer:     'shimmer 1.5s linear infinite',
      },
    },
  },
  plugins: [],
}
