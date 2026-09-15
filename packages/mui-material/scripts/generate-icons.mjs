/**
 * Generate React icon components from Figma-exported JSON.
 *
 * Usage: node scripts/generate-icons.mjs <path-to-figma-json>
 *
 * Reads _svg field from each INSTANCE node, converts SVG inner elements to JSX,
 * outputs one file per icon + a barrel index.js into src/icons/.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const OUT_DIR = resolve(ROOT, 'src/icons');

// --- Helpers ---

function kebabToPascal(str) {
  return str
    .replace(/[^a-zA-Z0-9-\s]/g, '')
    .split(/[-\s]+/)
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join('');
}

function extractIconName(fullName) {
  // "icon/line/log-out" → "log-out"
  const parts = fullName.split('/');
  return parts[parts.length - 1];
}

function svgToJsx(svgString) {
  // Extract everything inside the <svg ...>...</svg> tags
  const innerMatch = svgString.match(/<svg[^>]*>([\s\S]*)<\/svg>/i);
  if (!innerMatch) return null;

  let inner = innerMatch[1].trim();

  // Convert SVG attributes to JSX (kebab-case → camelCase)
  inner = inner
    .replace(/stroke-width/g, 'strokeWidth')
    .replace(/stroke-linecap/g, 'strokeLinecap')
    .replace(/stroke-linejoin/g, 'strokeLinejoin')
    .replace(/stroke-dasharray/g, 'strokeDasharray')
    .replace(/stroke-dashoffset/g, 'strokeDashoffset')
    .replace(/stroke-miterlimit/g, 'strokeMiterlimit')
    .replace(/stroke-opacity/g, 'strokeOpacity')
    .replace(/fill-rule/g, 'fillRule')
    .replace(/fill-opacity/g, 'fillOpacity')
    .replace(/clip-rule/g, 'clipRule')
    .replace(/clip-path/g, 'clipPath')
    .replace(/xmlns:xlink/g, 'xmlnsXlink')
    .replace(/xlink:href/g, 'xlinkHref');

  // Replace hardcoded colors with "currentColor" so icons follow theme color
  inner = inner.replace(/stroke="(?!none)[^"]*"/g, 'stroke="currentColor"');
  inner = inner.replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"');

  return inner;
}

function collectIcons(node, category = '') {
  const icons = [];
  if (node.type === 'FRAME' && (node.name === 'Line icons' || node.name === 'Sizer icons')) {
    category = node.name;
  }
  if (node.type === 'INSTANCE' && node._svg) {
    icons.push({ name: node.name, category, svg: node._svg, id: node.id });
  }
  for (const child of node.children || []) {
    icons.push(...collectIcons(child, category));
  }
  return icons;
}

// --- Main ---

const jsonPath = process.argv[2];
if (!jsonPath) {
  console.error('Usage: node scripts/generate-icons.mjs <path-to-figma-json>');
  process.exit(1);
}

const data = JSON.parse(readFileSync(resolve(jsonPath), 'utf-8'));
const allIcons = collectIcons(data.node || data);

console.log(`Found ${allIcons.length} icon instances`);

// Deduplicate: track seen names, add "Alt" suffix for duplicates
const seen = new Map();
const processedIcons = [];

for (const icon of allIcons) {
  const baseName = extractIconName(icon.name);
  const pascalName = kebabToPascal(baseName);

  if (!pascalName) continue;

  if (seen.has(pascalName)) {
    const altName = pascalName + 'Alt';
    if (seen.has(altName)) continue; // skip triple+
    seen.set(altName, true);
    processedIcons.push({ ...icon, componentName: altName });
  } else {
    seen.set(pascalName, true);
    processedIcons.push({ ...icon, componentName: pascalName });
  }
}

console.log(`After dedup: ${processedIcons.length} unique icons`);

// Ensure output directory
if (!existsSync(OUT_DIR)) {
  mkdirSync(OUT_DIR, { recursive: true });
}

// Generate each icon file
const exported = [];
let errors = 0;

for (const icon of processedIcons) {
  const jsx = svgToJsx(icon.svg);
  if (!jsx) {
    console.warn(`  SKIP: ${icon.name} (no SVG inner content)`);
    errors++;
    continue;
  }

  const needsFragment = (jsx.match(/<(?:path|circle|rect|line|polyline|polygon|ellipse|g|mask|defs|use)/g) || [])
    .length > 1;

  const wrappedJsx = needsFragment ? `<>${jsx}</>` : jsx;

  const content = `'use client';
import createSvgIcon from '../SvgIcon/createSvgIcon';

export default createSvgIcon(
  ${wrappedJsx}
, '${icon.componentName}');
`;

  writeFileSync(resolve(OUT_DIR, `${icon.componentName}.js`), content);
  exported.push(icon.componentName);
}

// Generate index.js barrel
const indexLines = exported.map(
  (name) => `export { default as ${name} } from './${name}';`,
);
writeFileSync(resolve(OUT_DIR, 'index.js'), indexLines.join('\n') + '\n');

console.log(`Generated ${exported.length} icon files + index.js in src/icons/`);
if (errors) console.warn(`  ${errors} icons skipped due to parse errors`);
