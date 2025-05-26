// ./modules/buttons/render.js
// Renderiza botones con herencia visual, íconos opcionales y efectos

import { logDebug } from "../../helpers/debugLogger.js";
import { handleOnClick } from "../../helpers/handleClick.js";
import { mergeFunctionalClasses } from "../../helpers/mergeFunctionalClasses.js";
import { mergeInlineStyles } from "../../helpers/mergeInlineStyles.js";
import { createIcon } from "../../helpers/createIcon.js";

/**
 * Renderiza la sección de botones
 * @param {HTMLElement} container - Nodo contenedor principal
 * @param {object} config - Contiene { page, theme }
 */
export async function render(container, config) {
  const { page = {}, theme = {} } = config;
  const buttons = page.buttons || [];

  // 🔹 Contenedor general
  const wrapper = document.createElement("div");
  const wrapperClass = mergeFunctionalClasses(
    theme.content_class,
    page.content_class
  );
  const wrapperStyle = mergeInlineStyles(
    theme.content_style,
    page.content_style
  );
  if (wrapperClass) wrapper.className = wrapperClass;
  if (wrapperStyle) wrapper.setAttribute("style", wrapperStyle);

  buttons.forEach((btn, i) => {
    const themeBtn = theme.buttons?.[i] || {};
    const themeIcon = themeBtn.icon || {};
    const pageIcon = page.icon || {};
    const btnIcon = btn.icon || {};

    // 🔸 Clases y estilos del botón
    const buttonClass = mergeFunctionalClasses(
      mergeFunctionalClasses(
        mergeFunctionalClasses(theme.button_class, themeBtn.class),
        page.button_class
      ),
      btn.class
    );

    const buttonStyle = mergeInlineStyles(
      mergeInlineStyles(
        mergeInlineStyles(theme.button_style, themeBtn.style),
        page.button_style
      ),
      btn.style
    );

    // 🔸 Clases y estilos del ícono
    const iconClass = mergeFunctionalClasses(
      mergeFunctionalClasses(
        mergeFunctionalClasses(theme.icon_class, themeIcon.class),
        page.icon_class
      ),
      btnIcon.class
    );

    const iconStyle = mergeInlineStyles(
      mergeInlineStyles(
        mergeInlineStyles(theme.icon_style, themeIcon.style),
        page.icon_style
      ),
      btnIcon.style
    );

    const iconPosition =
      btnIcon.position || page.icon_position || theme.icon_position || "left";

    // 🔹 Elemento base
    const isUrl = /^https?:\/\//.test(btn.onClick);
    const el = document.createElement(isUrl ? "a" : "button");
    if (buttonClass) el.className = buttonClass;
    if (buttonStyle) el.setAttribute("style", buttonStyle);
    el.style.cursor = "pointer";

    // 🔹 Acción onClick
    if (btn.onClick) handleOnClick(el, btn.onClick, "buttons");

    // 🔹 Efectos visuales
    const allEffects = {
      ...theme.effects,
      ...page.effects,
      ...btn.effects,
    };

    const visual = allEffects.visual || {};
    const animation = allEffects.animation || {};

    if (visual.preset) el.classList.add(`preset:${visual.preset}`);
    if (visual.bg_color) el.classList.add(visual.bg_color);
    if (visual.text_color) el.classList.add(visual.text_color);
    if (visual.border_color) el.classList.add(visual.border_color);
    if (animation.type) el.classList.add(`animate:${animation.type}`);

    // 🔹 Crear ícono (si name está definido)
    const iconEl = createIcon(btnIcon.name, iconClass, iconStyle);

    // 🔸 Herencia para label
    const labelClass = mergeFunctionalClasses(
      mergeFunctionalClasses(theme.label_class, page.label_class),
      btn.label_class
    );

    const labelStyle = mergeInlineStyles(
      mergeInlineStyles(theme.label_style, page.label_style),
      btn.label_style
    );

    // 🔹 Crear label
    const label = document.createElement("span");
    label.textContent = btn.label || "";
    if (labelClass) label.className = labelClass;
    if (labelStyle) label.setAttribute("style", labelStyle);

    // 🔹 Insertar elementos según posición
    if (iconEl && iconPosition === "left") {
      el.append(iconEl, label);
    } else if (iconEl && iconPosition === "right") {
      el.append(label, iconEl);
    } else {
      el.append(label);
    }

    wrapper.appendChild(el);
  });

  container.appendChild(wrapper);
  logDebug("modules", "buttons", `✅ Renderizados ${buttons.length} botones`);
}
