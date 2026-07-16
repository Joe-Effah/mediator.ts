Later Improvements & Changes
===========================

This file lists implemented improvements, configuration changes, and suggested next steps for the CQRS library spike.

Implemented (done)
- CI/CD
  - Added `checkin.yaml` to run tests and produce an artifact on PRs (Check-in workflow).
  - Added `ci.yaml` to run after `Check-in` completes (via `workflow_run`) and execute tests + smoke run.
  - Updated `cd.yaml` so CD runs on published releases and also after successful `CI` (via `workflow_run`).
  - Guarded `CD` job so it runs only for successful `CI` or release events.
  - Adjusted GitHub Action setup steps (Node/Bun action versions updated).

- TypeScript / Tooling
  - Updated `tsconfig.json` to include `DOM` lib and Node types to fix `console` global resolution.
  - Tests implemented using `bun:test` and pass locally (10 tests, 0 failures at last run).

- Core library
  - Implemented mediator/registry with `registerCommand`, `registerQuery`, `clear`.
  - Added pipeline behaviors (`IPipelineBehavior`) with hooks: `before`, `validate`, `onError`, `after`.
  - Implemented `executeWithPipeline` orchestration in `Mediator`.
  - Command/Query handler base classes created for consistent handler signatures.

- Sample feature
  - Created `sample/features/students` demonstrating commands, queries, handlers, and an in-memory repository.
  - Fixed stale console output by returning clones from `StudentRepository` methods (immutable snapshots for logging).

- Tests & fixtures
  - Split tests into multiple files with factories and stubs for clarity and isolation.
  - Added tests for dispatch, pipeline validation, logging hooks, and registry clear behavior.

Suggested / Pending Improvements (later)
- Publishing & secrets
  - Add `NPM_TOKEN` to repository secrets (required for `npm publish`).
  - Consider switching CD to tag-based publishing instead of releases, if desired.

- CI enhancements
  - Add `tsc --noEmit` type-check step in CI to catch type errors earlier.
  - Add `eslint` linting step and optional `prettier` formatting check.
  - Consider caching Bun/Node dependencies in CI for speed.

- Library enhancements
  - Replace `console.log` in samples with `LoggerBase` integration throughout sample and handlers.
  - Add more pipeline behaviors: metrics, retry, transaction, and audit logging.
  - Add type-safe registry helper utilities and stricter generics for handler signatures.
  - Add runtime validation helpers (e.g., `zod`) for command/query payload validation in pipelines.

- Release process
  - Consider `semantic-release` or `changesets` for automated versioning and changelogs.
  - Add a `CHANGELOG.md` generation step as part of CD.

- DX & docs
  - Add a README section describing CI/CD workflow and how to publish.
  - Create contribution guidelines and a minimal `CONTRIBUTING.md`.
  - Add examples or a `sample/README.md` showing how to run the sample feature.

Notes
- If you want I can: add `tsc`/`eslint` to CI, switch CD to tag-based publishing, or convert `later` items into tracked issues or PR templates.

Last updated: 2026-07-16
