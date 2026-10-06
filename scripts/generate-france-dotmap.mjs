import fs from 'fs';
import { feature } from 'topojson-client';
import { geoConicConformal, geoContains, geoDistance, geoBounds, geoPath, geoGraticule } from 'd3-geo';

// Pour régénérer : npm install --no-save d3-geo world-atlas topojson-client puis node scripts/generate-france-dotmap.mjs 0.6 franceDotMapData.ts
const topo = JSON.parse(fs.readFileSync('node_modules/world-atlas/countries-50m.json', 'utf8'));
const all = feature(topo, topo.objects.countries).features;
const polysOf = (n) => {
  const g = all.find((f) => f.properties.name === n).geometry;
  return g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
};
const frPolys = polysOf('France').filter((poly) => {
  const [lon, lat] = poly[0][0];
  return lon > -6 && lon < 10 && lat > 41 && lat < 52;
});
const parts = [
  { id: 'FR', polys: frPolys },
  { id: 'BE', polys: polysOf('Belgium') },
  { id: 'CH', polys: polysOf('Switzerland') },
];
const cover = { type: 'Feature', geometry: { type: 'MultiPolygon', coordinates: parts.flatMap((p) => p.polys) } };

const W = 108, H = 100;
const PITCH = Number(process.argv[2] || 0.6);
const makeProj = () => geoConicConformal().parallels([44, 49]).rotate([-3, 0]).fitExtent([[13, 9], [95, 91]], cover);
const projection = makeProj();
const path = geoPath(projection).digits(1);
const R = 6371;
const dist = (a, b) => geoDistance(a, b) * R;

const hubs = { lyon: [4.835, 45.764], paris: [2.352, 48.857], marseille: [5.37, 43.296] };
const polyFeatures = parts.flatMap((p) => p.polys.map((coords) => {
  const f = { type: 'Polygon', coordinates: coords };
  return { f, b: geoBounds(f), id: p.id };
}));
function inside(lon, lat) {
  for (const { f, b, id } of polyFeatures) {
    if (lat < b[0][1] || lat > b[1][1]) continue;
    if (b[0][0] <= b[1][0] && (lon < b[0][0] || lon > b[1][0])) continue;
    if (geoContains(f, [lon, lat])) return id;
  }
  return null;
}

// 1. points de terre
const cols = Math.floor(W / PITCH), rows = Math.floor(H / PITCH);
const land = [];
for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
  const ll = projection.invert([i * PITCH + PITCH / 2, j * PITCH + PITCH / 2]);
  const id = ll ? inside(ll[0], ll[1]) : null;
  if (id) land.push({ i, j, ll, id, dl: dist(ll, hubs.lyon), dp: dist(ll, hubs.paris), dm: dist(ll, hubs.marseille) });
}

// 2. zones : Lyon 150 km ; Paris 110 km ; Sud-Est = rayon calé pour avoir le MÊME nombre de points que Paris
const R_LYON = 150, R_PARIS = 110;
const nParis = land.filter((d) => d.dl >= R_LYON && d.dp < R_PARIS).length;
let lo = 60, hi = 300;
for (let k = 0; k < 30; k++) {
  const mid = (lo + hi) / 2;
  const n = land.filter((d) => d.dl >= R_LYON && d.dm < mid).length;
  if (n < nParis) lo = mid; else hi = mid;
}
const R_SUD = +((lo + hi) / 2).toFixed(1);
const nSud = land.filter((d) => d.dl >= R_LYON && d.dm < R_SUD).length;

const grid = Array.from({ length: rows }, () => Array(cols).fill('_'));
const counts = {};
for (const d of land) {
  let c = d.id === 'FR' ? 'b' : 'e';
  if (d.dl < R_LYON) { const w = 1 - d.dl / R_LYON; c = w > 0.66 ? 'r' : w > 0.33 ? 'q' : 'p'; }
  else if (d.dp < R_PARIS) { const w = 1 - d.dp / R_PARIS; c = w > 0.5 ? 'y' : 'x'; }
  else if (d.dm < R_SUD) { const w = 1 - d.dm / R_SUD; c = w > 0.5 ? 'y' : 'x'; }
  grid[d.j][d.i] = c;
  counts[c] = (counts[c] || 0) + 1;
}
const rle = (r) => {
  let out = '', prev = r[0], n = 1;
  for (let k = 1; k < r.length; k++) { if (r[k] === prev) n++; else { out += (n > 1 ? n : '') + prev; prev = r[k]; n = 1; } }
  return out + (n > 1 ? n : '') + prev;
};
const rowsRle = grid.map((r) => rle(r));

// 3. contours, graticule
const outline = {
  fr: path({ type: 'MultiPolygon', coordinates: frPolys }),
  be: path({ type: 'MultiPolygon', coordinates: polysOf('Belgium') }),
  ch: path({ type: 'MultiPolygon', coordinates: polysOf('Switzerland') }),
};
const gp = geoPath(makeProj().clipExtent([[6, 5], [102, 95]])).digits(2);
const graticule = gp(geoGraticule().extent([[-8, 38], [13, 54]]).step([2, 2])());

// 4. arcs Lyon -> Paris / Marseille (courbes en S, un seul fil)
const P = Object.fromEntries(Object.entries(hubs).map(([k, v]) => [k, projection(v).map((n) => +n.toFixed(2))]));
const arc = (a, b, side) => {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  const nx = -dy / len, ny = dx / len;
  const k = 0.16 * len * side;
  return `M${a[0]} ${a[1]}Q${(mx + nx * k).toFixed(2)} ${(my + ny * k).toFixed(2)} ${b[0]} ${b[1]}`;
};
const cand = (a, b, wantWest) => {
  const s1 = arc(a, b, 1), s2 = arc(a, b, -1);
  const cx = (s) => +s.match(/Q([\d.]+)/)[1];
  const mid = (a[0] + b[0]) / 2;
  return (cx(s1) < mid) === wantWest ? s1 : s2;
};
const arcs = { paris: cand(P.lyon, P.paris, true), marseille: cand(P.lyon, P.marseille, false) };

// 5. échelle réelle
const a = projection.invert([50, 50]), b = projection.invert([51, 50]);
const kmPerUnit = dist(a, b);
const scaleKm = 200;
const scale = { km: scaleKm, len: +(scaleKm / kmPerUnit).toFixed(2) };

const lab = (lon, lat) => projection([lon, lat]).map((n) => +n.toFixed(2));
const labels = { belgique: lab(4.7, 51.6), suisse: lab(10.6, 46.9), corse: lab(9.9, 42.2) };

const data = { viewBox: `0 0 ${W} ${H}`, pitch: PITCH, rows: rowsRle, outline, graticule, hubs: P, arcs, labels, scale };
const target = process.argv[3] || 'franceDotMapData.ts';
fs.writeFileSync(target, `// Carte pointillée de la zone d'intervention PLIALU (France, Corse, Belgique, Suisse).
// Fichier généré par scripts/generate-france-dotmap.mjs : ne pas modifier à la main.
// Classes de points (une lettre par point, "_" = vide) :
//   b = France   e = Belgique / Suisse   p, q, r = zone Lyon (du bord au centre)
//   x, y = zones Paris et Sud-Est (même nombre de points, du bord au centre)
export type DotClass = 'b' | 'e' | 'x' | 'y' | 'p' | 'q' | 'r';

export const FRANCE_DOT_MAP = ${JSON.stringify(data, null, 2)} as const;

export type Dot = { x: number; y: number; c: DotClass };

export function decodeDots(rows: readonly string[] = FRANCE_DOT_MAP.rows, pitch: number = FRANCE_DOT_MAP.pitch): Dot[] {
  const dots: Dot[] = [];
  rows.forEach((row, j) => {
    const re = /(\\d*)([_a-z])/g;
    let m: RegExpExecArray | null;
    let i = 0;
    while ((m = re.exec(row)) !== null) {
      const n = m[1] ? parseInt(m[1], 10) : 1;
      const c = m[2];
      if (c !== '_') for (let k = 0; k < n; k++) dots.push({ x: (i + k + 0.5) * pitch, y: (j + 0.5) * pitch, c: c as DotClass });
      i += n;
    }
  });
  return dots;
}
`);
console.log({ R_SUD, nParis, nSud, counts, total: land.length, kmPerUnit: +kmPerUnit.toFixed(1), scale });
