import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["hero-car.png", "drvn-logo.jpg"],
      manifest: {
        name: "DRVN",
        short_name: "DRVN",
        description: "Запись в детейлинг-студию",
        theme_color: "#050505",
        background_color: "#050505",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/pwa-192.svg", sizes: "192x192", type: "image/svg+xml" },
          { src: "/pwa-512.svg", sizes: "512x512", type: "image/svg+xml" }
        ]
      },
      workbox: { navigateFallback: "/index.html" }
    })
  ],
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } }
});
