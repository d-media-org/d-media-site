import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "astro/.astro/**",
    "astro/dist/**",
    "astro/node_modules/**",
    "build/**",
  ]),
]);
