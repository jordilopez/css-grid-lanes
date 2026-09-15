# Implementation Plan: CSS Grid Lanes Demo

## Overview

A static Astro site demonstrating the new CSS Grid Lanes feature (`display: grid-lanes`,
CSS Grid Level 3), supported today only in Safari (26.2+ / Safari Technology Preview 234+).
The page shows a top disclaimer when the browser doesn't support the feature, then walks
through progressive examples — basic waterfall gallery, lane spanning, brick layout,
`flow-tolerance` — using dog photos from the dog.ceo API as content. Styles build on the
`css-starter` design system (github:jordilopez/css-starter#0.2.1) via its cascade layers,
overridden with unlayered demo styles.

## Architecture Decisions

- **Astro (static output)** — zero-JS by default fits a static demo; component structure
  maps cleanly to example sections; build-time fetch of dog.ceo images avoids runtime API
  dependency.
- **css-starter as a git dependency** (`github:jordilopez/css-starter#0.2.1`) — the npm
  registry package is a stale 2022 v0.0.2; the GitHub tag has the layered design system.
  Imported once in the base layout; all demo styles are unlayered so they always win over
  `css-starter.*` layers (by design of css-starter).
- **Feature detection for the disclaimer** — a small inline script uses
  `CSS.supports('display', 'grid-lanes')` to show the Safari-only banner only when needed;
  content still renders with a flexbox fallback in unsupported browsers.
- **dog.ceo API at build time** — fetch a set of random/breed images in the Astro frontmatter
  of each example; deterministic enough for a demo, no API keys.
- **No CSS framework** — Grid Lanes is the star; demo CSS is hand-written on top of
  css-starter tokens.

## Supported Examples (from WebKit blog / CSS Grid 3 spec)

1. **Basic waterfall** — `display: grid-lanes; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap`
2. **Varying lane sizes** — alternating narrow/wide lanes via mixed `minmax()` repeat tracks
3. **Spanning items** — `grid-column: span N` on featured cards
4. **Explicit placement** — e.g. `grid-column: -3 / -1`
5. **Brick layout** — lanes defined with `grid-template-rows`
6. **Flow tolerance** — `flow-tolerance` slider-less demo (two side-by-side variants)

## Task List

### Phase 1: Foundation
- [ ] Task 1: Scaffold Astro project with css-starter and dog.ceo utilities

### Phase 2: Page shell & core demo
- [ ] Task 2: Base layout, header, disclaimer banner, fallback styles
- [ ] Task 3: Hero + Example 1 (basic waterfall gallery with dog cards)

### Phase 3: Advanced examples
- [ ] Task 4: Examples 2–6 (varying lanes, spanning, placement, brick, flow-tolerance)

### Phase 4: Polish
- [ ] Task 5: Resources/footer, accessibility pass, build verification

### Checkpoint: Complete
- [ ] `npm run build` succeeds; dist output serves statically
- [ ] All examples render with fallback in Chrome/Firefox and with Grid Lanes in Safari
- [ ] README updated with how to run and where to see the feature

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Git dependency install fails in sandboxed npm | Med | Fallback: `file:` dependency to the local sandbox clone |
| dog.ceo API flaky at build time | Low | Catch fetch errors and fall back to a small set of placeholder gradient cards |
| Syntax drift (e.g. `flow-tolerance` vs older `item-tolerance`) | Low | Follow the WebKit blog's updated names; document Safari TP version required |
| Non-Safari visitors see broken layout | Med | Flexbox/multi-column fallback behind `@supports not (display: grid-lanes)` |

## Open Questions
- None — design latitude granted by user.
