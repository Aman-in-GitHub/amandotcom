/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        special: ["Meow Script"],
        body: ["Poppins", "sans"],
      },
      colors: {
        background: "#171717",
        body: "#e5e5e5",
        special: "#ffffff",
        blue: "#1e66f5",
        purple: "#8839ef",
        orange: "#dd7878",
      },
    },
  },
};
