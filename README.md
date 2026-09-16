# css-grid-lanes

Demo for the **CSS Grid Lanes** feature (`display: grid-lanes`, CSS Grid Layout
Module Level 3) — currently supported only in **Safari 26.2+ and Safari
Technology Preview 234+** (see [caniuse](https://caniuse.com/css-grid-lanes)).

The page feature-detects support and shows a disclaimer in unsupported
browsers, which render a multi-column fallback instead.

**Live demo:** https://jordilopez.github.io/css-grid-lanes/

## Examples

A single set of dog cards is reused across all six layout examples — pick one
from the pill selector on the page and the gallery, description, and CSS
snippet update together. The switching is pure CSS (native radios + `:has()`),
no JavaScript:

1. Waterfall — `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))`
2. Varied lane sizes — mixed `minmax()` tracks
3. Spanning items — `grid-column: span N`
4. Explicit placement — `grid-column: -3 / -1`
5. Brick layout — lanes via `grid-template-rows`
6. Flow tolerance — `flow-tolerance: 15em` vs the default `1em`

Dog photos come from the [dog.ceo API](https://dog.ceo/dog-api/), fetched at
build time (placeholder cards are used if the API is unreachable).

## Usage

```sh
npm install
npm run dev       # dev server
npm run build     # static build into dist/
npm run preview   # preview the built site
npm test          # vitest unit tests (dog.ceo client, feature detection)
```

## Deployment

The site deploys to GitHub Pages automatically from the `main` branch via
`.github/workflows/deploy.yml`. The workflow runs `npm ci`, `npm test`, and
`npm run build`, then publishes `dist/`. `main` is branch-protected: every
change lands through a pull request and the `build` check must pass before
merge. There are no per-PR preview deployments — merging to `main` publishes
production at https://jordilopez.github.io/css-grid-lanes/.

## Development

Styling builds on [css-starter](https://github.com/jordilopez/css-starter)
v0.3.0, using its `.card` and `.picker` components. The dependency is pinned
to the public release tarball
(`https://github.com/jordilopez/css-starter/archive/refs/tags/v0.3.0.tar.gz`)
so the project installs in CI and for any contributor. Demo styles in
`src/styles/demo.css` are unlayered and override the `css-starter.*`
cascade layers by design.
