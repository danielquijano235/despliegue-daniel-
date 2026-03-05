Despliegue (Render) - Bookit
=================================

Resumen rápido
- Frontend: Static Site (carpeta `frontend`). Build produce `frontend/build`.
- Backend: Web Service (PHP) en carpeta `backend`.
- Base de datos: MySQL gestionada (PlanetScale, DigitalOcean, RDS, etc.).

Variables de entorno necesarias
- Web Service (backend): `DB_HOST`, `DB_PORT` (3306), `DB_USER`, `DB_PASS`, `DB_NAME`, `FRONTEND_URL`
- Static Site (frontend): `REACT_APP_API_URL` = URL pública del backend (ej. https://mi-backend.onrender.com)

Importar base de datos
Usa los SQL en `base-datos/bookit.sql` y `base-datos/datos-prueba.sql`.
Si tienes cliente mysql:
```bash
mysql -h <DB_HOST> -P <DB_PORT> -u <DB_USER> -p <DB_NAME> < base-datos/bookit.sql
mysql -h <DB_HOST> -P <DB_PORT> -u <DB_USER> -p <DB_NAME> < base-datos/datos-prueba.sql
```

Desplegar backend en Render (Web Service)
1. Nuevo service → Web Service
2. Root Directory: `backend`
3. Start Command: `php -S 0.0.0.0:$PORT -t backend` (o `-t backend/public` si sirves el build aquí)
4. Añade env vars `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME`, `FRONTEND_URL`

Desplegar frontend en Render (Static Site)
1. Nuevo site → Static Site
2. Root Directory: `frontend`
3. Build Command: `npm ci && npm run build`
4. Publish Directory: `build`
5. Environment: `REACT_APP_API_URL=https://<tu-backend>.onrender.com`

Notas
- Si sirves frontend desde otro dominio, asegura CORS en `backend/configuracion/conexion.php` (ya configurado para leer `FRONTEND_URL`).
- Si usas cookies de sesión, asegúrate de `Access-Control-Allow-Credentials: true` y `fetch(..., { credentials: 'include' })`.
