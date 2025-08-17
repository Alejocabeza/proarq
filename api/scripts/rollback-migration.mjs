#!/usr/bin/env node

import { execSync } from 'child_process';

const command = 'pnpm typeorm migration:revert -d ./typeOrm.config.ts';

console.log(`Ejecutando: ${command}`);

try {
  execSync(command, { stdio: 'inherit' });
  console.log('Rollback de migración ejecutado exitosamente.');
} catch (error) {
  console.error(
    'Error al ejecutar el rollback de la migración. ',
    error.message,
  );
  process.exit(1);
}
