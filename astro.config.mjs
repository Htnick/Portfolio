import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://htnick.github.io',
  base: '/Portfolio/',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      // Light syntax theme to match the white/red site theme —
      // the default (github-dark) clashed with a dark panel dropped
      // into an otherwise light page.
      theme: 'github-light',
    },
  },
});
