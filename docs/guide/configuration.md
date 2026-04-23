# Configuration

The theme accepts a small number of options under the `theme:` key in your
`mkdocs.yml`.

## Options

| Option        | Type    | Default | Description                                              |
| ------------- | ------- | ------- | -------------------------------------------------------- |
| `logo`        | string  | `null`  | Path to the logo shown in the site header.               |
| `favicon`     | string  | `null`  | Path to the site favicon.                                |
| `social`      | list    | (org)   | List of `{ icon, link, name }` entries for the footer.   |
| `footer_text` | string  | `null`  | Custom footer text. Falls back to `copyright` if unset.  |
| `language`    | string  | `en`    | Value used for the `<html lang>` attribute.              |

When `logo` is unset the theme falls back to its bundled Respect mark.

## Social links

Built-in icons are `github` and `linkedin`. Any other `icon` value falls
back to showing the entry's `name` as text.

```yaml
theme:
  name: respect
  social:
    - icon: github
      link: https://github.com/your-org
      name: GitHub
    - icon: linkedin
      link: https://www.linkedin.com/company/your-org
      name: LinkedIn
```

!!! note
    The theme is monochrome by design. There is no dark-mode option in the
    current release.

!!! tip
    Use a transparent SVG logo for the cleanest result against the
    `#fafafa` page background.

!!! warning
    Setting `logo:` to an external URL is not supported. Place the file
    inside your `docs/` directory.

!!! danger
    Avoid editing the bundled CSS files when you upgrade. Your changes will
    be overwritten. Override styles with `extra_css` instead.

## Versioned documentation

The header includes a version selector that activates automatically when
the deployment exposes a `versions.json` at its root. See
[Versioned docs](versioning.md) for the full setup.
