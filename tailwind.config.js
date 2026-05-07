/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          200: "#bfdbfe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          blue: "#1456f0",
          sky: "#3daeff",
          pink: "#ea5ec1",
          deep: "#17437d",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        pill: "9999px",
        card: "20px",
        "card-lg": "24px",
      },
      fontFamily: {
        sans: ["DM Sans", "ui-sans-serif", "system-ui"],
        display: ["Outfit", "ui-sans-serif", "system-ui"],
        poppins: ["Poppins", "ui-sans-serif"],
        mono: ["Roboto", "ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        subtle: "0 4px 6px rgba(0, 0, 0, 0.08)",
        ambient: "0 0 22.576px rgba(0, 0, 0, 0.08)",
        glow: "0 0 15px rgba(44, 30, 116, 0.16)",
        "directional-glow": "6.5px 2px 17.5px rgba(44, 30, 116, 0.11)",
        elevation: "0 12px 16px -4px rgba(36, 36, 36, 0.08)",
      }
    },
  },
  plugins: [],
}
