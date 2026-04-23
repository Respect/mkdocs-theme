(function () {
  'use strict';

  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  let index = null;
  let loading = null;

  const scriptSrc = (document.querySelector('script[src*="js/search.js"]') || {}).src || '';
  const baseHref = scriptSrc ? scriptSrc.replace(/js\/search\.js.*$/, '') : '';

  function loadIndex() {
    if (index) return Promise.resolve(index);
    if (loading) return loading;
    loading = fetch(baseHref + 'search/search_index.json')
      .then((r) => r.json())
      .then((data) => { index = (data && data.docs) || []; return index; })
      .catch(() => { index = []; return index; });
    return loading;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  function snippet(text, q) {
    if (!text) return '';
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx < 0) return text.slice(0, 140) + (text.length > 140 ? '…' : '');
    const start = Math.max(0, idx - 40);
    const end = Math.min(text.length, idx + q.length + 100);
    return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  }

  function score(doc, q) {
    const t = (doc.title || '').toLowerCase();
    const b = (doc.text || '').toLowerCase();
    const ql = q.toLowerCase();
    let s = 0;
    if (t.includes(ql)) s += 10;
    if (t.startsWith(ql)) s += 5;
    if (b.includes(ql)) s += 1;
    return s;
  }

  function render(docs, q) {
    if (!q) { results.innerHTML = ''; return; }
    if (!docs.length) { results.innerHTML = '<div class="search-empty">No results for “' + escapeHtml(q) + '”</div>'; return; }
    results.innerHTML = docs.slice(0, 12).map((d) => {
      const url = baseHref + (d.location || '');
      return '<a class="search-result" href="' + escapeHtml(url) + '">' +
        '<div class="search-result-title">' + escapeHtml(d.title || url) + '</div>' +
        '<div class="search-result-text">' + escapeHtml(snippet(d.text || '', q)) + '</div>' +
        '</a>';
    }).join('');
  }

  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    const q = input.value.trim();
    debounce = setTimeout(() => {
      loadIndex().then((docs) => {
        const matches = docs
          .map((d) => ({ d, s: score(d, q) }))
          .filter((x) => x.s > 0)
          .sort((a, b) => b.s - a.s)
          .map((x) => x.d);
        render(matches, q);
      });
    }, 80);
  });
})();
