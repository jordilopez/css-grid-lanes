# Task List: Publish css-grid-lanes to GitHub + GitHub Pages

Plan: `tasks/plan.md`

## Phase 1: Public-ready dependency
- [x] Task 1: Switch css-starter dependency to `github:jordilopez/css-starter#v0.3.0`, reinstall, and verify build + tests pass

**Verification:**
- [x] `npm install` resolves css-starter from a public HTTPS URL (no `file:` path)
- [x] `npm run build` and `npm test` pass

**Dependencies:** None

**Files likely touched:** `package.json`, `package-lock.json`

**Estimated scope:** Small (1-2 files)

## Checkpoint: Dependency is publicly resolvable
- [x] Clean `rm -rf node_modules && npm install` succeeds
- [ ] Review with human before pushing anything public

## Phase 2: Pages deployment config
- [x] Task 2: Add `site` and `base` to `astro.config.mjs` for project-pages URL

**Acceptance criteria:**
- [x] `site: 'https://jordilopez.github.io'`, `base: '/css-grid-lanes'`
- [x] Built `dist/index.html` references assets under `/css-grid-lanes/`

**Verification:**
- [x] `npm run build` succeeds; manual check of asset paths in `dist/`

**Dependencies:** Task 1

**Files likely touched:** `astro.config.mjs`

**Estimated scope:** Small (1 file)

- [x] Task 3: Add GitHub Actions workflow `.github/workflows/deploy.yml` (withastro/action + actions/deploy-pages, triggered on push to `main`)

**Acceptance criteria:**
- [x] Workflow builds on push to `main` and deploys `dist/` via Pages
- [x] `permissions` scoped to pages deploy only

**Verification:**
- [x] YAML parses; `npm ci` plus test/build steps verified locally
- [ ] Workflow appears in repo after push (Task 4)

**Dependencies:** Task 2

**Files likely touched:** `.github/workflows/deploy.yml`

**Estimated scope:** Small (1 file)

## Checkpoint: Config ready
- [x] Local build produces correct asset paths
- [x] Workflow file committed locally

## Phase 3: Publish with protected main
- [ ] Task 4: Create public repo `jordilopez/css-grid-lanes`, bootstrap `main`, enable branch protection, enable Pages (GitHub Actions source)

**Acceptance criteria:**
- [ ] Public repo exists with full commit history on `main`
- [ ] Branch protection on `main`: PR required, ≥1 approval from `jordilopez`, stale approvals dismissed, conversation resolution required, force-push and deletion blocked
- [ ] Pages source set to "GitHub Actions"

**Verification:**
- [ ] `gh repo view jordilopez/css-grid-lanes` shows public repo
- [ ] `gh api repos/jordilopez/css-grid-lanes/branches/main/protection` reflects the rules
- [ ] A direct `git push origin main` is rejected (dry-run/actual test on a trivial no-op commit)

**Dependencies:** Tasks 1-3

**Files likely touched:** none (repo/remote operations)

**Estimated scope:** Small (remote operations only)

- [ ] Task 5: Push feature branch with Pages config + workflow, open PR, get owner approval, merge, verify live site

**Acceptance criteria:**
- [ ] All Task 1-3 changes are on a feature branch, not pushed to `main`
- [ ] PR opened against `main`; merge blocked until `jordilopez` approves
- [ ] After approval + merge, deploy workflow runs green

**Verification:**
- [ ] `gh pr view` shows approved-and-merged by `jordilopez`
- [ ] `gh run list` shows successful deploy run
- [ ] Manual check: https://jordilopez.github.io/css-grid-lanes/ loads with styles

**Dependencies:** Task 4

**Files likely touched:** none (git/remote operations)

**Estimated scope:** Small (remote operations only)

## Phase 4: Polish
- [ ] Task 6: Update README with live demo URL and deployment notes via PR

**Acceptance criteria:**
- [ ] README links to the live Pages URL
- [ ] Deployment workflow and protected-branch flow documented briefly
- [ ] Change delivered through a PR approved by `jordilopez`

**Verification:**
- [ ] `npm test` still passes; merged commit triggers green deploy

**Dependencies:** Task 5

**Files likely touched:** `README.md`

**Estimated scope:** Small (1 file)

## Checkpoint: Complete
- [ ] Clean clone: `npm install && npm run build && npm test` passes
- [ ] `main` protected; direct pushes rejected, PR + owner approval enforced
- [ ] Site live at https://jordilopez.github.io/css-grid-lanes/
- [ ] README updated and deployed
