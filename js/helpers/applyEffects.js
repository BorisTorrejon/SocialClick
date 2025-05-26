// ./helpers/applyEffects.js
// Aplica efectos visuales y animaciones al hover/active

/**
 * Aplica clases de efecto desde config global + override individual
 */
export function applyEffects(element, globalEffects = {}, localEffects = {}) {
  const visual = { ...globalEffects.visual, ...localEffects?.visual };
  const animation = localEffects?.animation?.type || globalEffects?.animation?.type;

  const styleParts = [];

  if (visual.icon_color) styleParts.push(`--icon-color: var(--clr-${visual.icon_color});`);
  if (visual.bg_color) styleParts.push(`--icon-bg: var(--clr-${visual.bg_color});`);
  if (visual.border_color) styleParts.push(`--icon-border: var(--clr-${visual.border_color});`);

  if (styleParts.length > 0) {
    element.setAttribute('style', styleParts.join(' '));
  }

  if (animation) {
    element.classList.add(`anim-${animation}`);
  }
}
