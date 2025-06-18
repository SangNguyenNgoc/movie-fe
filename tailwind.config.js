/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
      backgroundImage: {
        loginBackground: "url('assets/images/background.png')",
        homeImage: "url('assets/images/Poster.svg')",
        iconFacebook: "url('assets/icons/IconFacebook.png')",
        iconGoogle: "url('assets/icons/IconGoogle.png')",
        iconTwitter: "url('assets/icons/IconTwitter.png')",
        notFound: "url('assets/images/error.svg')",
        tick: "url('assets/images/tick.svg')",
      },
      colors: {
        glxCustom: "#034ea2",
        vipSeat: "rgb(147,73,8)",
        hallPrimary: "rgb(5,24,43)",
        primary950: "#030E19",
        primary900: "#061D33",
        primary800: "rgb(9,36,69)",
        textPrimary: "#58C9FC",
        primary700: "rgba(18, 86, 153, 1)",
        primary500: "#0CAAF2",
        primary1000: "#020A13",
        searchText: "#0F172A",
        placeholder: "rgba(255,255,255,0.2)",
        label: "rgba(255,255,255,0.7)",
        customBlack: "#333333",
        primary: "#31D7A9",
        notice: "#31AFD7",
        formBackground: "rgba(5, 17, 63, 0.8)",
        errorBackground: "rgb(9, 25, 54)",
      },
      fontFamily: {
        comfortaa: ["Comfortaa", "sans-serif"],
        inter: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: [
      require('tailwind-scrollbar-hide')
  ],
}

