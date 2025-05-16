// scripts/set-version.ts
import { writeFileSync } from 'fs';
import { join } from 'path';

const version = require('../package.json').version;
const versionFilePath = join(__dirname, '../src/enviroments/version.ts');

const content = `export const appVersion = '${version}';\n`;

writeFileSync(versionFilePath, content);
console.log(`✅ Versión actual (${version}) guardada en version.ts`);