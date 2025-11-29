import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  publicDir: "../static",
  base: "/website-code/", // 👈 REQUIRED for GitHub Pages
  build: {
    outDir: "../",     // 👈 must point outside /src
    emptyOutDir: true,
  }
});