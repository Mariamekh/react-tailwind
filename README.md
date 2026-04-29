React + TypeScript + Tailwind

## Stack

- **React 18** + **TypeScript** (Vite)
- **Tailwind CSS** for styling
- **TanStack Query** for server state (caching, fetching, retries)
- **React Router** for routing
- **nuqs** for URL-driven filter state (draft state via context)
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
│   ├── filters/               # filter sidebar, mobile drawer, url+draft state
│   ├── products/              # listing card, grid, pagination
│   └── sort/                  # sort dropdown
├── shared/
│   ├── icons/                 # all SVG icons in one file (currentColor for tinting)
│   ├── layout/                # Header, Breadcrumbs, Logo
│   └── ui/                    # primitives: Dropdown, Button, Combobox
├── lib/                       # api client, formatters, queryClient
└── assets/fonts/              # TBC X webfonts + Helvetica Neue LT
```
