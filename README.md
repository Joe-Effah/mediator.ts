# cqrs

`mediator.ts` — Lightweight TypeScript CQRS mediator

This repository contains a small, testable CQRS mediator library implemented in TypeScript. The core library is `lib/Mediator.ts` (exported as `mediator.ts` in the project) and provides:

- A registry-based mediator for registering command and query handlers
- Pipeline behaviors (validation, logging, domain events, error hooks)
- Type-safe handler bases and a simple in-memory sample feature

Quickstart

To install dependencies:

```bash
bun install
```

To run the sample spike:

```bash
bun run start
```

To run the test suite:

```bash
bun run test
```

Notes

This project was bootstrapped with `bun init`. See the `sample/` folder for a small feature slice demonstrating commands, queries, handlers, and an in-memory repository.
