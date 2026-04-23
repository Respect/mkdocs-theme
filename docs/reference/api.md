# API reference

Most consumers will never touch the internals. The pieces below are
documented so authors can override blocks or extend styles when they need
to.

## Templates

### `base.html`

The root template. Defines the major Jinja blocks: `site_meta`, `styles`,
`libs`, `header`, `container`, `sidebar`, `content`, `pagination`, `toc`,
`footer`, `search_modal`, `scripts`. Override any of them from a child
template.

### `main.html`

The default page template. Extends `base.html` without changes. Every
documentation page renders through it.

### `404.html`

A standalone error page that renders a centered "Not Found" message and a
link back home. MkDocs writes this to `404.html` at the site root.

## Partials

### `partials/header.html`

The site header. Holds the brand link with logo, the mobile nav toggle, and
the search trigger button. Sticky at the top of the viewport.

### `partials/nav.html`

Recursively renders the configured navigation tree. Sections render their
title plus a nested `<ul>`. Leaves render an `<a>` with an active modifier
when matching the current page.

### `partials/toc.html`

Renders `page.toc.items` recursively as a nested list. Hidden on viewports
narrower than 960px.

### `partials/footer.html`

The site footer. Holds the configured social icons (GitHub and LinkedIn
built in) and an optional `footer_text`.

### `partials/search-modal.html`

The hidden modal opened by `Ctrl+K` (`⌘K` on macOS) or the header search
button.

## CSS files

### `css/respect.css`

Tokens (`:root`), typography, container, prose styles, and the footer.

### `css/nav.css`

Three-column docs layout, the sticky header, the sidebar, the TOC, the
pagination, the search modal, and the mobile breakpoints.

### `css/syntax.css`

Code blocks, inline code, tables, blockquotes, and admonitions. Pygments
token colors live here.

## JavaScript

### `js/theme.js`

Wires the mobile nav toggle and the search modal open/close (`Ctrl+K`
and `Esc`).

### `js/search.js`

Loads `search/search_index.json` from the MkDocs search plugin and renders
matches inside the modal.
