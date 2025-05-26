// ./helpers/labelPosition.js

/**
 * Compara dos valores y devuelve el resultado según prioridad:
 * - Si ambos son vacíos, devuelve 'right' (por defecto)
 * - Si uno está definido y el otro vacío, devuelve el definido
 * - Si ambos son válidos, el segundo sobrescribe al primero
 * @param {string} base - Valor base
 * @param {string} override - Valor que puede sobrescribir
 * @returns {string} - 'left' o 'right'
 */
export function labelPosition(base, override) {
  const isValid = v => v === 'left' || v === 'right';

  if (isValid(override)) return override;
  if (isValid(base)) return base;
  return 'right';
}
