// ./config/logConfig.js
// Configuración global y modular del sistema de logs

export const logConfig = {
  enabled: true,           // Activa/desactiva todos los logs
  prefix: '[SC]',          // Prefijo estándar en consola
  levels: ['info', 'warn', 'error'], // Niveles permitidos

  // Áreas principales del sistema
  areas: {
    system: false,          // index.js, init.js, mergeThemeWithPage.js
    modules: true,         // renderModule y módulos visuales
    engine: false,          // parser, color, spacing, etc.
    analytics: false,       // clickTracker, timeTracker
    effects: false,         // handleClick, applyEffects
    inheritance: false      // mergeClassGroups, reglas implícitas
  },

  // Control por módulo dentro de "modules"
  modules: {
    header:false,
    title:false,
    icons: false,
    buttons: false,
    footer: true
  }
};
