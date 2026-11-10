# CLAUDE.md

## Commandes

```bash
npm run dev    # Serveur de développement, port 3000
npm run build  # Build de production
npm run lint   # Vérification TypeScript (tsc --noEmit)
```

## Architecture

SPA React + TypeScript + Vite, sans routeur. La page courante est l'état `currentPage` dans `App.tsx`. Les URL, titres et descriptions viennent de `SEO_CONFIG`. `BLOCKED_PAGE_KEYS` renvoie certaines URL vers l'accueil.

## Styles et icônes

Tailwind est compilé en local : `tailwind.config.js` et `index.css`. Les icônes viennent de `lucide-react`. Le design system de `src/components/ds/ds.ts` est obligatoire pour les nouveaux écrans.

## Contenus et services

Le formulaire part vers Basin. Les images sont hébergées sur Cloudinary, avec `srcset` et un `alt` rédigé pour le SEO. Aucun texte du site ne contient de tiret cadratin ni de tiret demi-cadratin.

Toute nouvelle ressource externe doit être ajoutée à la politique de sécurité du contenu dans `public/.htaccess`.
