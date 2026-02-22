import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://titulacionexpress.com',
  integrations: [
    sitemap({
      lastmod: new Date(),
      customPages: [],
      serialize(item) {
        const url = item.url.replace('https://titulacionexpress.com', '');

        // Home — máxima prioridad
        if (url === '/' || url === '') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
          return item;
        }

        // SILO hubs — alta prioridad
        if (
          url === '/titulacion-por-experiencia-laboral/' ||
          url === '/acuerdo-286/' ||
          url === '/carreras/' ||
          url === '/cedula-profesional/' ||
          url === '/contacto/'
        ) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
          return item;
        }

        // Subpáginas SILO 1 y SILO 2 — prioridad alta
        if (
          url.startsWith('/titulacion-por-experiencia-laboral/') ||
          url.startsWith('/acuerdo-286/')
        ) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
          return item;
        }

        // Carreras individuales — prioridad alta (long tail transaccional)
        if (url.startsWith('/carreras/') && url !== '/carreras/') {
          item.priority = 0.8;
          item.changefreq = 'monthly';
          return item;
        }

        // Cédula profesional subpáginas
        if (url.startsWith('/cedula-profesional/')) {
          item.priority = 0.7;
          item.changefreq = 'monthly';
          return item;
        }

        // Blog hub
        if (url === '/blog/') {
          item.priority = 0.7;
          item.changefreq = 'weekly';
          return item;
        }

        // Blog artículos — prioridad media, actualización frecuente
        if (url.startsWith('/blog/')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
          return item;
        }

        // Institucionales y legal — baja prioridad
        if (
          url === '/nosotros/' ||
          url === '/aviso-de-privacidad/'
        ) {
          item.priority = 0.3;
          item.changefreq = 'yearly';
          return item;
        }

        // 404 — excluir del sitemap
        if (url === '/404/') {
          return undefined;
        }

        // Default
        item.priority = 0.5;
        item.changefreq = 'monthly';
        return item;
      },
    }),
  ],
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
