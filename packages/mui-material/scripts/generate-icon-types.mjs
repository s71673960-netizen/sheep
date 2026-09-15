/**
 * Generates .d.ts and .d.mts type declarations for each icon in src/icons/
 * Run after generate-icons.mjs or before build.
 *
 * Usage: node scripts/generate-icon-types.mjs
 */
import { readdirSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ICONS_DIR = resolve(__dirname, '../src/icons');

const jsFiles = readdirSync(ICONS_DIR).filter(
  (f) => f.endsWith('.js') && f !== 'index.js',
);

let count = 0;
for (const file of jsFiles) {
  const name = file.replace('.js', '');

  const dts = `import SvgIcon from '../SvgIcon/SvgIcon';\ndeclare const ${name}: typeof SvgIcon;\nexport default ${name};\n`;
  writeFileSync(resolve(ICONS_DIR, `${name}.d.ts`), dts);
  writeFileSync(resolve(ICONS_DIR, `${name}.d.mts`), dts);
  count++;
}

// index.d.ts — re-export all icons
const indexLines = jsFiles.map((f) => {
  const name = f.replace('.js', '');
  return `export { default as ${name} } from './${name}';`;
});
const indexDts = indexLines.join('\n') + '\n';
writeFileSync(resolve(ICONS_DIR, 'index.d.ts'), indexDts);
writeFileSync(resolve(ICONS_DIR, 'index.d.mts'), indexDts);

console.log(`Generated ${count} icon .d.ts/.d.mts pairs + index.d.ts`);
