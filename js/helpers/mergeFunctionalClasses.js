// ./helpers/mergeFunctionalClasses.js
// Fusión inteligente de clases funcionales por grupo (bg-, text-, etc.)

/**
 * Elimina de base las clases que colisionan funcionalmente con override
 * y devuelve base limpia + override juntas, sin duplicar funciones
 *
 * @param {string} base - clases heredadas desde el theme
 * @param {string} override - clases desde page.json
 * @returns {string} - fusión funcional correcta
 */
export function mergeFunctionalClasses(base = '', override = '') {
  const baseArr = base.trim().split(/\s+/);
  const overrideArr = override.trim().split(/\s+/);

  const overridePrefixes = new Set(
    overrideArr.map(cls => cls.split('-')[0])
  );

  const cleanedBase = baseArr.filter(cls => {
    const prefix = cls.split('-')[0];
    return !overridePrefixes.has(prefix);
  });

  return [...cleanedBase, ...overrideArr].join(' ');
}
