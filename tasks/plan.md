# Implementation Plan: Publish css-grid-lanes to GitHub + GitHub Pages

## Overview

Publish the completed CSS Grid Lanes demo as a public GitHub repository
(`jordilopez/css-grid-lanes`) and deploy the static Astro build to GitHub
Pages. The site will be served at
`https://jordilopez.github.io/css-grid-lanes/` via a GitHub Actions workflow
that builds on every push to `main`.

## Architecture Decisions

- **Deploy via GitHub Actions** — builds in CI on push to `main`; no local build
  artifacts (`dist/`) committed, no gh-pages branch juggling. Custom workflow:
  `setup-node` (from `.nvmrc`) → `npm ci` → `npm test` → `npm run build` →
  `actions/upload-pages-artifact` → `actions/deploy-pages`. Tests gate deploys.
- **Project pages (not user pages)** — repo name dictates base path, so Astro
  gets `site: 'https://jordilopez.github.io'` and
  `base: '/css-grid-lanes'`.
- **Switch `css-starter` to the GitHub tag first** — the current
  `file:../../sandboxes/css-starter` dependency won't install for anyone else
  (or in CI). `v0.3.0` is confirmed published at
  `github:jordilopez/css-starter#v0.3.0`.
- **Create the repo with `gh` CLI** — authenticated as `jordilopez` over SSH.
- **Protected `main` + mandatory PRs** — `main` requires a pull request before
  merging, blocks direct pushes/force-pushes/deletions, requires conversation
  resolution, requires the `build` status check, and enforces the rules on
  admins. GitHub forbids self-approval and `jordilopez` is the only account, so
  the approving-review count is **0**; the owner remains the sole merge gate by
  virtue of being the only write/admin user. Every change lands via feature
  branch → PR → owner merges.
- **Bootstrap exception** — the repository starts empty, so the existing local
  `main` history is pushed once to create the branch; protection is enabled
  immediately after. Every later change goes through a PR.
- **README updates** — document the live demo URL and deployment flow.

## Task List

### Phase 1: Public-ready dependency
- [x] Task 1: Switch css-starter dependency to GitHub tag and verify install/build

### Phase 2: Pages deployment config
- [x] Task 2: Astro site/base config for GitHub Pages
- [x] Task 3: GitHub Actions deploy workflow

### Phase 3: Publish with protected main
- [x] Task 4: Create public repo, bootstrap `main`, enable branch protection
- [ ] Task 5: Open PR for the Pages config/workflow changes; owner approves and merges; verify live site

### Phase 4: Polish
- [ ] Task 6: README updates (live demo URL, deployment notes) via PR + final verification

### Checkpoint: Complete
- [ ] Fresh `npm install && npm run build && npm test` passes from a clean clone
- [ ] `main` is protected; direct push rejected, PR + owner approval required
- [ ] Site live at https://jordilopez.github.io/css-grid-lanes/
- [ ] Workflow green on GitHub Actions

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| css-starter GitHub tag missing files that `file:` clone had | Med | Verify `npm run build && npm test` locally immediately after switching (Task 1 gates everything) |
| Pages asset paths break without `base` config | Med | Set `site` + `base` before first deploy; verify built `index.html` references `/css-grid-lanes/...` |
| Astro build needs Node version pinning in CI | Low | Use `withastro/action` which reads `.nvmrc` |
| Repo name collision on GitHub | Low | Check with `gh repo view` before creating; pick alternative name if taken |
| Branch protection blocks the deploy workflow or first push | Med | Bootstrap `main` before enabling protection; deploy workflow only needs to publish artifacts, not push to `main` |
| Owner cannot approve own PR (GitHub forbids self-approval) | Med | If GitHub refuses self-approval, use the ruleset's "require approval" with the owner as bypass actor; confirm the exact setting during Task 4 |

## Open Questions
- None — repo name assumed `css-grid-lanes` under `jordilopez`.
