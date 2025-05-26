// ./core/loader.js
// Carga el JSON de página y su correspondiente theme (con fallback)

import { appConfig } from '../config/appConfig.js';
import { logDebug } from '../helpers/debugLogger.js';

/**
 * Carga page.json primero, luego theme según page.theme
 * Si el theme no existe, usa appConfig.themeDefault
 */
export async function loadJSONFiles(slug) {
  const pagePath = `${appConfig.basePath}pages/${slug}.json`;

  logDebug('system', 'loader', `📥 Cargando página: ${slug}`);

  // Cargar page.json primero
  const pageRes = await fetch(pagePath);
  if (!pageRes.ok) {
    throw new Error(`No se pudo cargar page.json para "${slug}"`);
  }

  const pageData = await pageRes.json();
  const themeName = pageData.theme || appConfig.themeDefault;
  let themeData = null;

  try {
    const themePath = `${appConfig.basePath}themes/${themeName}.json`;
    const themeRes = await fetch(themePath);

    if (!themeRes.ok) throw new Error();

    themeData = await themeRes.json();
    logDebug('system', 'loader', `🎨 Theme cargado: ${themeName}`);
  } catch {
    const fallbackTheme = appConfig.themeDefault;
    const fallbackPath = `${appConfig.basePath}themes/${fallbackTheme}.json`;
    const fallbackRes = await fetch(fallbackPath);

    if (!fallbackRes.ok) {
      throw new Error(`No se pudo cargar el theme "${themeName}" ni el fallback "${fallbackTheme}"`);
    }

    themeData = await fallbackRes.json();
    logDebug('system', 'loader', `⚠️ Usando theme por defecto: ${fallbackTheme}`, 'warn');
  }

  return { themeData, pageData };
}