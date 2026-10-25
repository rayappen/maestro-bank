import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import eslint from "vite-plugin-eslint";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        // Tells the plugin to use your .eslintrc.cjs configurations
        lintCommand: 'eslint "./src/**/*.{js,jsx}"',
      },
    }),
  ],
});
