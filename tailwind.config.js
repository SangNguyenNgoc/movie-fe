/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        homeImage: "url('assets/images/Poster.svg')",
        iconFacebook: "url('assets/icons/IconFacebook.png')",
        iconGoogle: "url('assets/icons/IconGoogle.png')",
        iconTwitter: "url('assets/icons/IconTwitter.png')",
      },
      colors: {
        primary950: "#030E19",
        primary900: "#061D33",
        textPrimary: "#58C9FC",
        primary500: "#0CAAF2",
        primary1000: "#020A13",
        searchText: "#0F172A",
        placeholder: "rgba(255,255,255,0.2)",
        label: "rgba(255,255,255,0.7)",
        customBlack: "#333333",
      }
    },
    fontFamily: {
      comfortaa: ["Comfortaa", "sans-serif"],
      inter: ["Inter", "sans-serif"]
    }
  },
  plugins: [
      require('tailwind-scrollbar-hide')
  ],
}

