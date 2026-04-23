(function () {
  'use strict';

  const root = document.getElementById('version-selector');
  const trigger = document.getElementById('version-selector-trigger');
  const current = document.getElementById('version-selector-current');
  const menu = document.getElementById('version-selector-menu');
  if (!root || !trigger || !menu || !current) return;

  // Resolve the deployment base. Each page lives at <base>/<version>/<path>.
  // versions.json is published by mike at <base>/versions.json.
  const scriptSrc = (document.querySelector('script[src*="js/version.js"]') || {}).src || '';
  const themeBase = scriptSrc ? scriptSrc.replace(/js\/version\.js.*$/, '') : '';
  // themeBase is .../<base>/<version>/  — strip the version segment.
  const themeUrl = themeBase ? new URL(themeBase, window.location.href) : null;
  if (!themeUrl) return;

  const segments = themeUrl.pathname.replace(/\/$/, '').split('/');
  segments.pop();
  const siteRoot = themeUrl.origin + segments.join('/') + '/';
  const currentVersion = decodeURIComponent(themeUrl.pathname.replace(/\/$/, '').split('/').pop() || '');
  const versionsUrl = siteRoot + 'versions.json';

  fetch(versionsUrl, { cache: 'no-cache' })
    .then((r) => (r.ok ? r.json() : null))
    .then((versions) => {
      if (!Array.isArray(versions) || versions.length === 0) return;
      render(versions);
      root.hidden = false;
    })
    .catch(() => { /* no versions.json: keep selector hidden */ });

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function findActive(versions) {
    return versions.find((v) => v.version === currentVersion)
      || versions.find((v) => (v.aliases || []).includes(currentVersion))
      || versions[0];
  }

  function render(versions) {
    const active = findActive(versions);
    const aliases = (active.aliases || []).join(', ');
    current.textContent = active.title || active.version;
    if (aliases) current.textContent += ' (' + aliases + ')';

    const restPath = window.location.pathname.replace(themeUrl.pathname, '');
    menu.innerHTML = versions.map((v) => {
      const isCurrent = v === active;
      const href = siteRoot + encodeURIComponent(v.version) + '/' + restPath.replace(/^\//, '');
      const label = escapeHtml(v.title || v.version);
      const aliasMarkup = (v.aliases && v.aliases.length)
        ? '<span class="version-selector-alias">' + escapeHtml(v.aliases.join(', ')) + '</span>'
        : '';
      return '<li role="option" aria-selected="' + (isCurrent ? 'true' : 'false') + '">'
        + '<a class="version-selector-item' + (isCurrent ? ' is-current' : '') + '" href="' + escapeHtml(href) + '">'
        + label + aliasMarkup
        + '</a></li>';
    }).join('');
  }

  function open() { menu.hidden = false; trigger.setAttribute('aria-expanded', 'true'); }
  function close() { menu.hidden = true; trigger.setAttribute('aria-expanded', 'false'); }

  trigger.addEventListener('click', () => (menu.hidden ? open() : close()));
  document.addEventListener('click', (e) => {
    if (menu.hidden) return;
    if (root.contains(e.target)) return;
    close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) close();
  });
})();
