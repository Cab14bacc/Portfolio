/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jersey: '"Jersey 10", sans-serif',
        'mono': ' "monospace", monospace',
      },
      fontSize: {
        
      },
      boxShadow: {
        'lb-sm': "-4px 4px 4px 2px rgba(0, 0, 0, 0.08)"
      }

    },
  },
  plugins: [],
}

