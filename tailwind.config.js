/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        user: "url(/images/user.jpeg)",
      },
      width: {
        ninetyFivePercent: "95%",
        seventyPercent: "70%",
        fourtyEightPercent: "48%",
        fourtyFivePercent: "45%",
        twoFifteen: "215px",
      },
      backgroundColor: {
        lightBlueShade: "rgba(125,211,252,0.2)",
        primarySlate100: "rgba(185,175,175,0.1)",
      },
    },
  },
  plugins: [],
};
