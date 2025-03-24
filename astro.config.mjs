// @ts-check
import { defineConfig } from "astro/config";
import AstroPWA from "@vite-pwa/astro";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  vite: {
    logLevel: "info",
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
    server: {
      fs: {
        // Allow serving files from hoisted root node_modules
        allow: ["../.."],
      },
    },
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    AstroPWA({
      mode: "production",
      base: "/",
      scope: "/",
      includeAssets: ["logo.svg"],
      registerType: "autoUpdate",
      manifest: {
        name: "Aman Chand",
        short_name: "Aman",
        theme_color: "#1e66f5",
        background_color: "#000000",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/mask-icon.svg",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\//],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      },
    }),
  ],
});
