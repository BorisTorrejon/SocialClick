// ./index.js
import { appConfig } from './config/appConfig.js';
import { logDebug } from './helpers/debugLogger.js';
import { resolveSlugFromURL } from './core/slugResolver.js';
import { loadJSONFiles } from './core/loader.js';
import { init } from './core/init.js';

async function main() {
  try {
    const resolvedSlug = await resolveSlugFromURL() || appConfig.slug;
    logDebug('system', 'index', `🔍 Slug resuelto: ${resolvedSlug}`);

    const { themeData, pageData } = await loadJSONFiles(resolvedSlug);

    logDebug('system', 'index', '🚀 Ejecutando init() para renderizar');
    init(themeData, pageData);
  } catch (err) {
    logDebug('system', 'index', `❌ Error: ${err.message}`, 'error');
  }
}

main();