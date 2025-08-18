# Railway Deployment Guide

## Problema

Railway tiene limitaciones de memoria durante la construcción que causan errores 137.

## Solución

Construir la aplicación localmente y usar un Dockerfile mínimo.

## Pasos para deploy

### 1. Construir localmente

```bash
chmod +x scripts/prepare-railway.sh
./scripts/prepare-railway.sh
```

### 2. Verificar que existe dist/main.js

```bash
ls -la dist/
```

### 3. Hacer commit de los archivos necesarios

```bash
git add dist/ package-railway.json Dockerfile
git commit -m "feat: add compiled dist and minimal files for Railway deployment"
git push
```

### 4. Deploy en Railway

- Railway usará el Dockerfile que solo copia archivos compilados
- No habrá construcción de TypeScript en Railway
- Solo se instalarán dependencias de producción

## Archivos importantes

- `Dockerfile`: Solo copia archivos compilados
- `railway.toml`: Configuración de Railway
- `scripts/prepare-railway.sh`: Script de construcción local
- `.railwayignore`: Excluye archivos innecesarios

## Troubleshooting

Si el deploy falla:

1. Verificar que dist/main.js existe
2. Ejecutar el script de preparación localmente
3. Hacer commit de los archivos compilados
4. Reintentar el deploy
