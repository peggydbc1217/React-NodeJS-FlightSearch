import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  // base: "/FlightEase-FrontEnd/",
  server: {
    // 啟動 server 時預設開啟的頁面
    open: "/",
    host: "https://flight-ease.vercel.app",
    // host: "127.0.0.1",
    // port: "5175",
  },
  build: {
    rollupOptions: {
      // https://rollupjs.org/configuration-options/1
    },
  },
});
