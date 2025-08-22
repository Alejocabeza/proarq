#!/usr/bin/env node

import { execSync } from 'child_process';

const migrationName = process.argv[2];

if (!migrationName) {
  console.error('Error: Por favor, proporciona un nombre para la migración.');
  process.exit(1);
}

const command = `npx typeorm migration:generate ./migrations/${migrationName} -d ./typeOrm.config.ts`;

console.log(`Ejecutando: ${command}`);

try {
  execSync(command, { stdio: 'inherit' });
  console.log(`Migración '${migrationName}' creada exitosamente.`);
} catch (error) {
  console.error('Error al crear la migración. ', error.message);
  process.exit(1);
}
