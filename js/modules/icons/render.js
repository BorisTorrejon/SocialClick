// ./modules/icons/render.js
// Renderiza la sección de íconos con soporte de herencia funcional, <a> para URLs y cursor:pointer

import { logDebug } from '../../helpers/debugLogger.js';
import { handleOnClick } from '../../helpers/handleClick.js';
import { mergeFunctionalClasses } from '../../helpers/mergeFunctionalClasses.js';
import { mergeInlineStyles } from '../../helpers/mergeInlineStyles.js';
import { labelPosition } from '../../helpers/labelPosition.js';
import { createIcon } from '../../helpers/createIcon.js';

/**
 * Renderiza la sección de íconos
 * @param {HTMLElement} container - Nodo contenedor principal
 * @param {object} config - Contiene { page, theme }
 */
export async function render(container, config) {
  const { page = {}, theme = {} } = config;
  const icons = page.icons || [];

  // 🔹 Contenedor principal
  const wrapper = document.createElement('div');
  const wrapperClass = mergeFunctionalClasses(theme.content_class, page.content_class);
  const wrapperStyle = mergeInlineStyles(theme.content_style, page.content_style);
  if (wrapperClass) wrapper.className = wrapperClass;
  if (wrapperStyle) wrapper.setAttribute('style', wrapperStyle);

  icons.forEach((icon, i) => {
    const themeIcon = theme.icons?.[i] || {};

    const isUrl = /^https?:\/\//.test(icon.onClick);
    const box = document.createElement(isUrl ? 'a' : 'div');

    // 🔹 Clases y estilos del contenedor
    const boxClass = mergeFunctionalClasses(
      mergeFunctionalClasses(theme.box_class, themeIcon.box_class),
      mergeFunctionalClasses(page.box_class, icon.box_class)
    );
    const boxStyle = mergeInlineStyles(
      mergeInlineStyles(theme.box_style, themeIcon.box_style),
      mergeInlineStyles(page.box_style, icon.box_style)
    );

    // 🔹 Clases y estilos del ícono
    const iconClass = mergeFunctionalClasses(
      mergeFunctionalClasses(theme.icon_class, themeIcon.icon_class),
      mergeFunctionalClasses(page.icon_class, icon.icon_class)
    );
    const iconStyle = mergeInlineStyles(
      mergeInlineStyles(theme.icon_style, themeIcon.icon_style),
      mergeInlineStyles(page.icon_style, icon.icon_style)
    );

    // 🔹 Clases y estilos del label
    const labelClass = mergeFunctionalClasses(
      mergeFunctionalClasses(theme.label_class, themeIcon.label_class),
      mergeFunctionalClasses(page.label_class, icon.label_class)
    );
    const labelStyle = mergeInlineStyles(
      mergeInlineStyles(theme.label_style, themeIcon.label_style),
      mergeInlineStyles(page.label_style, icon.label_style)
    );

    const labelPositionFinal = labelPosition(
      labelPosition(theme.label_position, themeIcon.label_position),
      labelPosition(page.label_position, icon.label_position)
    );

    if (boxClass) box.className = boxClass;
    if (boxStyle) box.setAttribute('style', boxStyle);

    if (icon.onClick) {
      box.style.cursor = 'pointer';
      handleOnClick(box, icon.onClick, 'icons');
    }

    // 🔹 Crear ícono con helper
    const iconEl = createIcon(icon.name, iconClass, iconStyle);

    // 🔹 Crear label si existe
    const hasLabel = !!icon.label;
    const labelEl = hasLabel ? document.createElement('span') : null;
    if (labelEl) {
      labelEl.textContent = icon.label;
      if (labelClass) labelEl.className = labelClass;
      if (labelStyle) labelEl.setAttribute('style', labelStyle);
    }

    // 🔹 Orden
    if (labelPositionFinal === 'left' && labelEl) box.appendChild(labelEl);
    if (iconEl) box.appendChild(iconEl);
    if (labelPositionFinal === 'right' && labelEl) box.appendChild(labelEl);

    wrapper.appendChild(box);
  });

  container.appendChild(wrapper);
  logDebug('modules', 'icons', '✅ Sección de íconos renderizada correctamente');
}