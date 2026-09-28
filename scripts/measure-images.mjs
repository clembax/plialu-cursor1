// One-shot: reads the intrinsic size of every PROJECTS image from its WebP
// header and writes width/height back into projects.ts.
import { readFileSync, writeFileSync } from 'node:fs';

const FILE = 'projects.ts';

const readWebpSize = (buf) => {
  if (buf.length < 30) throw new Error('truncated file');
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') {
    throw new Error('not a RIFF/WEBP container');
  }

  const chunk = buf.toString('ascii', 12, 16);

  if (chunk === 'VP8 ') {
    if (buf[23] !== 0x9d || buf[24] !== 0x01 || buf[25] !== 0x2a) {
      throw new Error('bad VP8 sync code');
    }
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  }

  if (chunk === 'VP8L') {
    if (buf[20] !== 0x2f) throw new Error('bad VP8L signature');
    const bits = buf.readUInt32LE(21);
    return {
      width: (bits & 0x3fff) + 1,
      height: ((bits >> 14) & 0x3fff) + 1,
    };
  }

  if (chunk === 'VP8X') {
    return {
      width: buf.readUIntLE(24, 3) + 1,
      height: buf.readUIntLE(27, 3) + 1,
    };
  }

  throw new Error(`unsupported chunk ${chunk}`);
};

const fetchHeader = async (url) => {
  const res = await fetch(url, { headers: { Range: 'bytes=0-63' } });
  if (!res.ok && res.status !== 206) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
};

let source = readFileSync(FILE, 'utf8');

const entries = [
  ...source.matchAll(/^(\s*)src: "([^"]+)",\n(\s*)srcset: "[^"]*"(,?)$/gm),
].map((m) => ({ indent: m[3], url: m[2], block: m[0] }));

console.log(`found ${entries.length} images`);

const failures = [];

for (const [i, entry] of entries.entries()) {
  if (/\n\s*width:/.test(entry.block)) continue;
  try {
    const size = readWebpSize(await fetchHeader(entry.url));
    const withComma = entry.block.replace(/(srcset: "[^"]*")(,?)$/, '$1,');
    const patched = `${withComma}\n${entry.indent}width: ${size.width},\n${entry.indent}height: ${size.height}`;
    if (!source.includes(entry.block)) throw new Error('block not found in source');
    source = source.replace(entry.block, patched);
    console.log(`${i + 1}/${entries.length} ${size.width}x${size.height}  ${entry.url.split('/').pop()}`);
  } catch (err) {
    failures.push({ url: entry.url, reason: err.message });
    console.log(`${i + 1}/${entries.length} FAILED (${err.message})  ${entry.url}`);
  }
}

writeFileSync(FILE, source);

console.log(`\nmeasured: ${entries.length - failures.length}/${entries.length}`);
if (failures.length) {
  console.log('failures:');
  for (const f of failures) console.log(`  ${f.url} — ${f.reason}`);
}
