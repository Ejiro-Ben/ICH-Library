/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        "chem-dark": "#0B0F1A",       // deep navy / charcoal
        "chem-slate": "#1F2933",     // dark slate gray

        // Accent colors
        "chem-cyan": "#22D3EE",      // neon cyan
        "chem-green": "#10B981",    // industrial green
        "chem-amber": "#F59E0B",    // soft amber

        // Text colors
        "chem-text": "#E5E7EB",      // light gray text
        "chem-muted": "#9CA3AF",    // muted secondary text
      },
    },
  },
  plugins: [],
};
