# css-grid-lanes

Demo for the **CSS Grid Lanes** feature (`display: grid-lanes`, CSS Grid Layout
Module Level 3) — currently supported only in **Safari 26.2+ and Safari
Technology Preview 234+** (see [caniuse](https://caniuse.com/css-grid-lanes)).

The page feature-detects support and shows a disclaimer in unsupported
browsers, which render a multi-column fallback instead.

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

## Development

Styling builds on [css-starter](https://github.com/jordilopez/css-starter),
including its `.card` and `.picker` components (added in v0.3.0). During
development the dependency points at the local clone
(`file:../../sandboxes/css-starter`); once `v0.3.0` is pushed to GitHub it
can be switched to `github:jordilopez/css-starter#v0.3.0`. Demo styles in
`src/styles/demo.css` are unlayered and override the `css-starter.*`
cascade layers by design.
