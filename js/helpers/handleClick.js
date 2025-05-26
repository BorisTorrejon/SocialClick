// ./helpers/handleClick.js
// Interpreta y aplica el campo onClick a un elemento HTML

export async function handleOnClick(element, onClick, sectionName = '') {
  const isUrl = str => /^https?:\/\//.test(str);
  const isInline = str => str.includes('(') || str.includes('=>');

  if (!onClick || typeof onClick !== 'string') return;

  if (isUrl(onClick)) {
    element.setAttribute('href', onClick);
    element.setAttribute('target', '_blank');
  } else if (isInline(onClick)) {
    element.setAttribute('onclick', onClick);
  } else if (/^[a-zA-Z0-9_\-]+$/.test(onClick)) {
    try {
      const mod = await import(`../modules/${sectionName}/${onClick}.js`);
      element.addEventListener('click', e => mod.default(e, element));
    } catch (err) {
      console.warn(`[SC/handleClick] ⚠️ No se encontró función "${onClick}" en "${sectionName}"`);
    }
  }
}