# Versioned documentation

The theme ships with a version selector in the header. It is opt-in by
deployment: when the site exposes a `versions.json` at its root the
selector appears, populated, and lets readers switch between versions
while staying on the same page. When `versions.json` is missing the
selector stays hidden and adds nothing to the layout.

The theme does not produce `versions.json` itself. It expects the format
that [`mike`](https://github.com/jimporter/mike) writes when it deploys
multi-version sites to the `gh-pages` branch.

## How the selector works

The browser fetches `versions.json` relative to the deployment root (one
level above the current version directory). Each entry has a `version`,
an optional `title`, and an optional list of `aliases`. The selector
shows the active version's title and any aliases attached to it. Picking
another entry sends the reader to the same page path under that other
version, so deep links survive a version switch.

If the fetch fails (404, network error, malformed JSON) the selector
stays hidden. There is no flash of unstyled content because the partial
renders with `hidden` and is only revealed once the data is in.

## Publishing with mike

Install mike alongside MkDocs:

```bash
pip install mike
```

Deploy a version and tag it as the default `latest`:

```bash
mike deploy --push --update-aliases 1.0 latest
mike set-default --push latest
```

Subsequent releases follow the same pattern. Mike rewrites
`versions.json` on the `gh-pages` branch each time and the selector
reflects the new state on the next page load.

```bash
mike deploy --push --update-aliases 2.0 latest
```

To remove a version:

```bash
mike delete --push 1.0
```

## URL layout

Mike publishes each version into its own subdirectory at the deployment
root. A site published under `https://example.com/myproject/` ends up
shaped like this:

```
myproject/
  versions.json
  1.0/
    index.html
    ...
  2.0/
    index.html
    ...
```

The `versions.json` file uses this shape:

```json
[
  { "version": "2.0", "title": "2.0", "aliases": ["latest"] },
  { "version": "1.0", "title": "1.0", "aliases": [] }
]
```

The selector's "switch to another version" link rewrites the path so
`https://example.com/myproject/2.0/guide/configuration/` becomes
`https://example.com/myproject/1.0/guide/configuration/` when you pick
`1.0`. Pages that only exist in one version land at a 404 and the
bundled 404 page sends the reader back home.

## Testing locally

Mike can serve the multi-version build without pushing:

```bash
mike serve
```

This starts a server that mirrors the `gh-pages` layout, so the selector
behaves the same way it will in production.
