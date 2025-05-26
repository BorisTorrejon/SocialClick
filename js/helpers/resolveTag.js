// ./helpers/resolveTag.js
// Determina si el botón debe ser <a> o <button>

export function resolveTag(onClick = '') {
  // Si comienza con http/https → es un enlace externo
  if (/^https?:\/\//.test(onClick)) {
    return 'a';
  }

  // Todo lo demás se asume acción → usar <button>
  return 'button';
}
