import { writeFileSync } from 'fs';
import { join } from 'path';
import { version } from '../package.json';

const versionFilePath = join(__dirname, '../src/environments/version.ts');
const content = `export const appVersion = '${version}';\n`;

writeFileSync(versionFilePath, content);
console.log(`✅ Versión ${version} escrita en version.ts`);