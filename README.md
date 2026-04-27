React + TypeScript + Tailwind

## Stack

- **React 18** + **TypeScript** (Vite)
- **Tailwind CSS** for styling
- **TanStack Query** for server state (caching, fetching, retries)
- **Zustand** for filter state
- **React Router** for routing
- **axios** for HTTP

## Run

```bash
npm install
npm run dev
```

## Project structure

```
src/
├── app/                       # routes, page composition
├── features/
│   ├── filters/               # filter sidebar, mobile drawer, store
│   ├── products/              # listing card, grid, pagination
│   └── sort/                  # sort dropdown
├── shared/
│   ├── icons/                 # all SVG icons in one file (currentColor for tinting)
│   ├── layout/                # Header, Breadcrumbs, Logo
│   └── ui/                    # primitives: Dropdown, Button, Combobox
├── lib/                       # api client, formatters, queryClient
└── assets/fonts/              # TBC X webfonts + Helvetica Neue LT
```
