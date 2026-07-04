import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        gold: "#FFC000",
        "dark-gold": "#917300",
        "gold-text": "#FFCE3E",
        "cyan-pulse": "#29ABE2",
        "link-blue": "#3860BE",
        "teal-action": "#1EAEDB",
        charcoal: "#202020",
        "dark-iron": "#181818",
        "near-white": "#F8F8F8",
        mist: "#E6E6E6",
        smoke: "#F5F5F5",
        graphite: "#494949",
        ash: "#7D7D7D",
        steel: "#969696",
        slate: "#666666",
        iron: "#555555",
        shadow: "#313131",
      },
      fontFamily: {
        sans: ["var(--font-oswald)", "Oswald", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
