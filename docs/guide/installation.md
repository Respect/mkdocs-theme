# Installation

`mkdocs-respect` is published on PyPI. Install it alongside MkDocs:

```bash
pip install mkdocs mkdocs-respect
```

For a project that pins versions, add the package to your requirements
file:

```text
mkdocs>=1.5
mkdocs-respect>=0.1
```

## Use the theme

Set `theme.name` to `respect` in your `mkdocs.yml`:

```yaml
site_name: My Project
theme:
  name: respect
  logo: assets/logo.svg
plugins:
  - search
```

## Verify

Run the strict build to confirm the theme is registered and the docs are
free of broken links:

```bash
mkdocs build --strict
```

Then start the dev server and open <http://127.0.0.1:8000>:

```bash
mkdocs serve
```
