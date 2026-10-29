# Brother Furnitures — Frontend

React + TypeScript + Vite + Tailwind CSS v4 storefront for Brothers Furniture — office furniture, "Inspiring Better Workspaces".

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```

## Structure

- `src/pages` — Home, Shop (filter/search/sort via URL params), ProductDetail, Cart, About, Contact, NotFound
- `src/components` — Layout, Navbar (search overlay, Shop dropdown), Hero (3-slide carousel), Footer, ProductCard, Logo
- `src/context` — cart state (persisted to localStorage)
- `src/data/products.ts` — mock catalogue; swap for API calls when a backend exists
- `src/index.css` — theme tokens (brand navy `#1e4b98`, accent orange `#f27229`, pastel hero tints, Jost font) and `btn-outline` / `btn-solid` / `field` utilities
- `src/assets` — logo and hero workstation image (background brightened to pure white so it blends onto the pastel hero with `mix-blend-multiply`)
