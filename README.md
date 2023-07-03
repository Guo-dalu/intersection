Compute the intersection of two collections

## routes

- root /: Input the sizes of two collections and choose which one to iterate, then run the computation to get the size of the intersection and the time cost.
- statistic /statistic: Run it multiple times(default 30) and see the relationship between time cost the the sizes of collections.

## Features

- Language: `Typescript`, `postcss`
- Framework: `Svelte`
- CSS: `TailwindCSS`
- Component Library: `Flowbite-svelte`
- Add `Web Worker` for computation to prevent blocking the main thread
- With unit tests by `vitest` and e2e tests by `playwright`

## Developing

```bash
npm install
npm run dev
```

## Building

```bash
npm run build
```

You can preview the production build with `npm run preview`.

**Mind: it use static adapter to deploy on git pages so once you build it, use `http-server` or other tool to preview. Or you can switch the adapter to `auto`**
