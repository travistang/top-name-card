import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    svgr(),
    react(),
    VitePWA({
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*"],
      },
      includeAssets: ["**/*"],
      manifest: {
        name: "TOP Name Card",
        short_name: "Name Card",
        description: "Your name card and big texts, all in one place.",
        display: "standalone",
        theme_color: "#",
        icons: [
          {
            src: "icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
