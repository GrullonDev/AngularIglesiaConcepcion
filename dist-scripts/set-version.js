import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
// Soporte para ESM (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Leer versión del package.json
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf-8'));
// Ruta donde se debe escribir version.ts
const versionDirPath = join(__dirname, '../src/environments');
const versionFilePath = join(versionDirPath, 'version.ts');
// Si no existe la carpeta, la crea
if (!existsSync(versionDirPath)) {
    mkdirSync(versionDirPath, { recursive: true });
}
// Contenido del archivo de versión
const content = `export const appVersion = '${pkg.version}';\n`;
// Escribir el archivo
writeFileSync(versionFilePath, content);
console.log(`✅ Versión actual (${pkg.version}) guardada en version.ts`);
