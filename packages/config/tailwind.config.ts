import type { Config } from "tailwindcss";

const config: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        // Brand colors
        "falcon-navy": "#1B2A4A",
        "sky-blue": "#3B82F6",
        "success-green": "#10B981",
        "warning-amber": "#F59E0B",
        "error-red": "#EF4444",
        slate: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          300: "#CBD5E1",
          500: "#64748B",
          700: "#334155",
          900: "#0F172A",
        },
        // Per-site accent colors
        accent: {
          pdf: "#3B82F6",
          pix: "#8B5CF6",
          kit: "#10B981",
          vid: "#F43F5E",
          dev: "#F59E0B",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
