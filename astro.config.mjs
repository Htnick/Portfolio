import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://htnick.github.io',
  base: '/Portfolio/',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      // Light syntax theme to match the white/orange site theme —
      // the default (github-dark) clashed with a dark panel dropped
      // into an otherwise light page.
      theme: 'github-light',
    },
  },
});
