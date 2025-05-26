// ./modules/header/render.js
// Renderiza header con soporte para imagen desde content_img

import { logDebug } from '../../helpers/debugLogger.js';
import { handleOnClick } from '../../helpers/handleClick.js';
import { mergeFunctionalClasses } from '../../helpers/mergeFunctionalClasses.js';
import { mergeInlineStyles } from '../../helpers/mergeInlineStyles.js';

/**
 * Renderiza el header dinámico con imagen opcional
 * @param {HTMLElement} container - Nodo contenedor principal (#content)
 * @param {object} config - Contiene { page, theme }
 */
export async function render(container, config) {
  const { page = {}, theme = {} } = config;

  // 👉 Fusionar clases y estilos para <header>
  const headerClass = mergeFunctionalClasses(theme.class, page.class);
  const headerStyle = mergeInlineStyles(theme.style, page.style);

  const header = document.createElement('header');
  if (headerClass) header.className = headerClass;
  if (headerStyle) header.setAttribute('style', headerStyle);

  // 👉 Fusionar content_img (si existe)
  const content_img = {
    ...theme.content_img,
    ...page.content_img
  };

  if (content_img?.img) {
    const box = document.createElement('div');

    const boxClass = mergeFunctionalClasses(theme.content_img?.class, page.content_img?.class);
    const boxStyle = mergeInlineStyles(theme.content_img?.style, page.content_img?.style);
    if (boxClass) box.className = boxClass;
    if (boxStyle) box.setAttribute('style', boxStyle);

    const img = document.createElement('img');
    img.src = content_img.img;
    img.alt = content_img.alt || '';

    const imgClass = mergeFunctionalClasses(theme.content_img?.img_class, page.content_img?.img_class);
    if (imgClass) img.className = imgClass;

    if (content_img.onClick) {
      handleOnClick(img, content_img.onClick, 'header');
    }

    box.appendChild(img);
    header.appendChild(box);
  }

  container.appendChild(header);
  logDebug('modules', 'header', '✅ Header renderizado correctamente');
}