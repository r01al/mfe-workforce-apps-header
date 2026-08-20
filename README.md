# Workforce Header Remote

Independent header micro-frontend. It exposes `./Header` from the `headerMfe` container and consumes the host's React Router plus the `@r01al/mfe-workforce-common-client` theme contract.

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm start
```

`npm run dev` renders the Header independently at `http://localhost:3002/`.
The shell and other remotes are not required.
