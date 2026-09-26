# AGENTS.md

## Tooling

Use [Bun](https://bun.sh/) for every JavaScript operation in this repository. Do not use `node`, `npm`, `npx`, `pnpm`, or `yarn`.

| Task | Command |
|---|---|
| Install dependencies | `bun install` |
| Add a dependency | `bun add <pkg>` (`bun add -d <pkg>` for dev) |
| Start the dev server | `bun run dev` |
| Type check and build | `bun run build` |
| Preview the build | `bun run preview` |
| Run a package binary | `bunx <bin>`, e.g. `bunx astro`, `bunx prettier --write .` |
| Audit dependencies | `bun audit` |
| Check for updates | `bun outdated` |

Do not create `package-lock.json` or other package manager lockfiles.

## Verification

Run `bun run build` after changes; it runs `astro check` before `astro build`.
