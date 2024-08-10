import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // Added pages directory as we are using Pages Router
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Inter', ...fontFamily.sans], // Changed to 'Inter' directly
        body: ['Inter', ...fontFamily.sans]     // Changed to 'Inter' directly
      },
      colors: {
        border: 'hsl(var(--border, 210 10% 90%))',  // Added fallback colors
        input: 'hsl(var(--input, 210 10% 90%))',
        ring: 'hsl(var(--ring, 210 10% 80%))',
        background: 'hsl(var(--background, 0 0% 100%))',
        foreground: 'hsl(var(--foreground, 0 0% 10%))',
        primary: {
          DEFAULT: 'hsl(var(--primary, 210 100% 50%))',
          foreground: 'hsl(var(--primary-foreground, 210 100% 95%))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary, 210 100% 50%))',
          foreground: 'hsl(var(--secondary-foreground, 210 100% 95%))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive, 0 100% 50%))',
          foreground: 'hsl(var(--destructive-foreground, 0 100% 95%))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted, 210 20% 90%))',
          foreground: 'hsl(var(--muted-foreground, 210 20% 80%))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent, 210 100% 50%))',
          foreground: 'hsl(var(--accent-foreground, 210 100% 95%))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover, 210 100% 50%))',
          foreground: 'hsl(var(--popover-foreground, 210 100% 95%))'
        },
        card: {
          DEFAULT: 'hsl(var(--card, 210 100% 50%))',
          foreground: 'hsl(var(--card-foreground, 210 100% 95%))'
        },
      },
      borderRadius: {
        xl: `calc(var(--radius, 0.75rem) + 4px)`,
        lg: `var(--radius, 0.75rem)`,
        md: `calc(var(--radius, 0.75rem) - 2px)`,
        sm: `calc(var(--radius, 0.75rem) - 4px)`
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height, auto)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height, auto)" },
          to: { height: 0 }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
