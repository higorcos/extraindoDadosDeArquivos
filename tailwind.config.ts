import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'fundo-padrao': '#e0e0e0',
        'botao-padrao': '#000080',
        'fundo-n1': '#f3f4f6',
        'fundo-n2': '#ffff',
        'cor-segundaria': '#d1d5db',
        'cor-primaria': '#000080',
      },
    },
  },
  plugins: [],
};
export default config;
 