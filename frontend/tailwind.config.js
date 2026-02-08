/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50", // Green from the reference
        secondary: "#2E7D32", // Darker green
        dark: "#212121", // Dark gray/black
        light: "#F5F5F5", // Off-white
        accent: "#FFC107", // Amber/Gold for highlights
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=2074&auto=format&fit=crop')",
      }
    },
  },
  plugins: [],
};
