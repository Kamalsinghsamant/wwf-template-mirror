/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wwf: {
          // Precise CTA orange as requested: rgb(248, 154, 53)
          orange: "rgb(248, 154, 53)",
          "orange-hover": "rgb(235, 140, 38)",
          "orange-subtle": "rgba(248, 154, 53, 0.08)",
          black: "#212529",
          "black-pure": "#000000",
          dark: "#111827",
          gray: {
            50: "#f8f8f8",
            100: "#f2f2f2",
            200: "#e5e7eb",
            300: "#d1d5db",
            400: "#9ca3af",
            500: "#6b7280",
            600: "#4b5563",
            700: "#374151",
            800: "#1f2937",
            900: "#111827",
          },
          blue: "#016da3",
          green: "#1e4620",
          border: "#e5e7eb",
        },
      },
      fontFamily: {
        sans: ["var(--font-opensans)", "Open Sans", "Arial", "sans-serif"],
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        pill: "40px",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        card: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
        hover: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)",
      },
      transitionDuration: {
        instant: "150ms",
        fast: "200ms",
        normal: "300ms",
      },
    },
  },
  plugins: [],
};
