#!/usr/bin/env node

import { execSync } from 'child_process';

const command = 'pnpm typeorm migration:run -d ./typeOrm.config.ts';

console.log(`Ejecutando: ${command}`);

try {
  execSync(command, { stdio: 'inherit' });
  console.log('Migraciones ejecutadas exitosamente.');
} catch (error) {
  console.error('Error al ejecutar las migraciones. ', error.message);
  process.exit(1);
}
