# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server on port 3000
npm run build     # Production build
npm run lint      # TypeScript type checking (tsc --noEmit)
npm run preview   # Preview production build
```

## Architecture

This is a **single-page React + TypeScript + Vite** application with no external routing library. All pages are rendered conditionally from `App.tsx` based on a `currentPage` state string.

### Routing

Navigation is entirely state-based. To navigate between pages, call `setCurrentPage('page-name')`. Page names include: `home`, `expertises`, `solutions`, `contact`, `a-propos`, `ressources`, `ressource-1/2/3`, `solution-bardage/enduit/precadres/toles/ravalement`, `merci`.

The header theme (`headerTheme: 'light' | 'dark'`) is also set per-page to control logo color and nav styling.

### Key Files

- **`App.tsx`** (~2800 lines) — monolithic component containing all pages, navigation, and UI logic
- **`TerritorialMap.tsx`** — D3.js SVG map of France intervention zones
- **`Success.tsx` / `MerciPage.tsx`** — post-form-submission thank you pages
- **`index.html`** — CDN imports (Tailwind CSS, Iconify icons, Google Fonts), custom CSS animations, and theme variables

### Styling

- Tailwind CSS loaded via CDN (not PostCSS)
- Global custom CSS lives in `index.html`'s `<style>` tag
- Sections alternate between `.section--dark` (`#071318`) and `.section--light` (`#F0F4F6`) classes
- Dynamic theming uses inline styles for gradients; Tailwind utility classes for everything else

### External Services

- **Formspree** (`https://formspree.io/f/mwvrvrqg`) — contact form submission with file upload (PDF/DWG/DXF/JPG/PNG, max 10MB)
- **Cloudinary** (`https://res.cloudinary.com/dyiup6v5x/`) — all images hosted here with responsive `srcset`
- **D3 GeoJSON** — fetched from GitHub for the map component

### Environment Variables

`GEMINI_API_KEY` is referenced in `vite.config.ts` but not used in the current codebase.
