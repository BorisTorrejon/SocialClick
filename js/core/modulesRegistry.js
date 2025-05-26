// ./core/modulesRegistry.js
// Mapa que registra cada módulo por nombre con su archivo de renderizado

export const modules = {
  header: async () => (await import('../modules/header/render.js')).render,
  title: async () => (await import('../modules/title/render.js')).render,
  icons: async () => (await import('../modules/icons/render.js')).render,
  buttons: async () => (await import('../modules/buttons/render.js')).render,
  footer: async () => (await import('../modules/footer/render.js')).render,
  // agregar más módulos aquí cuando estén disponibles
};
