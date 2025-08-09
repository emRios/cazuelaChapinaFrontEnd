/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/ui/tailux/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "brand-this-lighter": "var(--color-this-lighter)",
        "brand-this-light": "var(--color-this-light)",
        // Agrega más tokens de Tailux aquí con prefijo "brand"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        "brand-soft": "var(--shadow-soft)",
        "brand-soft-dark": "var(--shadow-soft-dark)",
      },
    },
  },
  safelist: [
    "border-gray-500",
    "text-gray-600",
    "border-blue-500",
    "text-blue-600",
    "border-red-500",
    "text-red-600",
    "border-green-500",
    "text-green-600"
  ],
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    // Agrega más plugins de Tailux si existen
  ],
};
