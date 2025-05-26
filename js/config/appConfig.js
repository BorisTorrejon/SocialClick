// ./config/appConfig.js
// Configuración global de SocialClick

export const appConfig = {
  // Slug por defecto si no se resuelve desde la URL
  slug: 'test',

  // Rutas base
  basePath: '/data/',
  baseTheme: '/themes/',

  // Nombre del tema que se usará si el declarado falla
  themeDefault: 'test',

  // Visual y sistema
  debug: true,
  preset: 'default',
  analytics: false,

  // Módulos activables
  modules: {
    header: true,
    title: true,
    icons: true,
    buttons: true,
    footer: true,
  },

  // Rutas internas que no deben interpretarse como slugs
  excludedSlugs: [
    'index.html',
    'contacto',
    'quienes-somos',
    'sobre-nosotros',
    'faq',
    'admin'
  ]
};
