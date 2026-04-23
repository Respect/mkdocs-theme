(function () {
  'use strict';

  const sidebar = document.getElementById('sidebar');
  const navToggle = document.getElementById('nav-toggle');
  if (navToggle && sidebar) {
    navToggle.addEventListener('click', () => {
      const open = sidebar.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('nav-open', open);
    });
    document.addEventListener('click', (e) => {
      if (!sidebar.classList.contains('is-open')) return;
      if (sidebar.contains(e.target) || navToggle.contains(e.target)) return;
      sidebar.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('nav-open');
    });
  }

  const modal = document.getElementById('search-modal');
  const trigger = document.getElementById('search-trigger');
  const input = document.getElementById('search-input');
  const closeBtns = document.querySelectorAll('[data-search-close]');

  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform || navigator.userAgent || '');
  document.querySelectorAll('[data-shortcut="search"]').forEach((el) => {
    el.textContent = isMac ? '⌘K' : 'Ctrl K';
  });

  function openSearch() {
    if (!modal) return;
    modal.hidden = false;
    setTimeout(() => input && input.focus(), 0);
  }
  function closeSearch() {
    if (!modal) return;
    modal.hidden = true;
    if (input) input.value = '';
    const results = document.getElementById('search-results');
    if (results) results.innerHTML = '';
  }

  if (trigger) trigger.addEventListener('click', openSearch);
  closeBtns.forEach((b) => b.addEventListener('click', closeSearch));

  document.addEventListener('keydown', (e) => {
    const cmdK = (isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === 'k';
    if (cmdK) {
      e.preventDefault();
      if (modal && modal.hidden) openSearch(); else closeSearch();
    }
    if (e.key === 'Escape' && modal && !modal.hidden) closeSearch();
  });
})();
