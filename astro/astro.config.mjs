// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.d-media.org',
  output: 'static',
  trailingSlash: 'always',
  publicDir: '../public',
});
