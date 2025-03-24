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
      includeAssets: [
        "logo.svg",
        "pwa-192x192.png",
        "pwa-512x512.png",
        "apple-touch-icon-180x180.png",
      ],
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
      strategies: "generateSW",
      workbox: {
        skipWaiting: false,
        clientsClaim: true,
        maximumFileSizeToCacheInBytes: 5000000,
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /\.(?:js|css|html|ico|png|svg|jpg|jpeg|gif|woff2)$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "portfolio-assets",
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
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
