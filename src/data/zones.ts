export const SHOW_ZONE_KEY = true;
export const ZONE_HIGHLIGHT = true;

export type ZoneId = 'main' | 'secondary' | 'delivery';

export const ZONE_ROWS: { kind: ZoneId; name: string; detail: string }[] = [
  { kind: 'main', name: 'Rhône-Alpes', detail: 'Zone principale' },
  { kind: 'secondary', name: 'Île-de-France et Sud-Est', detail: 'Zones secondaires' },
  { kind: 'delivery', name: 'France, Belgique, Suisse', detail: 'Livraison possible' },
];
