import { logDebug } from '../../helpers/debugLogger.js';
import { mergeFunctionalClasses } from '../../helpers/mergeFunctionalClasses.js';
import { mergeInlineStyles } from '../../helpers/mergeInlineStyles.js';

export async function render(container, config) {
  const { page = {}, theme = {} } = config;

  // Wrapper
  const wrapper = document.createElement('div');
  const wrapperClass = mergeFunctionalClasses(theme.class, page.class);
  const wrapperStyle = mergeInlineStyles(theme.style, page.style);
  if (wrapperClass) wrapper.className = wrapperClass;
  if (wrapperStyle) wrapper.setAttribute('style', wrapperStyle);

  // Título principal
  const tag = page.tag || theme.tag || 'h1';
  const titleEl = document.createElement(tag);
  titleEl.textContent = page.title || '';

  const titleClass = mergeFunctionalClasses(theme.title_class, page.title_class);
  const titleStyle = mergeInlineStyles(theme.title_style, page.title_style);
  if (titleClass) titleEl.className = titleClass;
  if (titleStyle) titleEl.setAttribute('style', titleStyle);

  wrapper.appendChild(titleEl);

  // Subtítulo (solo si hay texto en page)
  if (page.subtitle?.text) {
    const subtitleTag = page.subtitle.tag || theme.subtitle?.tag || 'p';
    const subtitleEl = document.createElement(subtitleTag);
    subtitleEl.textContent = page.subtitle.text;

    const subtitleClass = mergeFunctionalClasses(theme.subtitle?.class, page.subtitle.class);
    const subtitleStyle = mergeInlineStyles(theme.subtitle?.style, page.subtitle.style);
    if (subtitleClass) subtitleEl.className = subtitleClass;
    if (subtitleStyle) subtitleEl.setAttribute('style', subtitleStyle);

    wrapper.appendChild(subtitleEl);
  }

  container.appendChild(wrapper);
  logDebug('modules', 'title', '✅ Título renderizado correctamente');
}