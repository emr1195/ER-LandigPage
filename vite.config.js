import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://emr1195.github.io/ER-LandigPage/",
  server: {
    port: 3000,
  },
});
