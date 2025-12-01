/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "fttx-bg": "#020617",
        "fttx-surface": "#0f172a",
        "fttx-panel": "#1e293b",
        "fttx-primary": "#0EA5E9",
        "fttx-primary-soft": "#082F49",
        "fttx-accent": "#22C55E",
        "fttx-border": "#1E293B",
      },
    },
  },
  plugins: [],
};
