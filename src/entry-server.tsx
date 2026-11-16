import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../App';
import { buildHead, PRERENDER_ROUTES, sitemapEntries } from './seo/seoConfig';

export { buildHead, PRERENDER_ROUTES, sitemapEntries };

export function render(url: string): string {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>,
  );
}
