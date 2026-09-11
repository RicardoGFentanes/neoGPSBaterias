# Decisiones del proyecto

Bitácora de decisiones de diseño del pipeline. Cada entrada: fecha, decisión, por qué.

## 2026-09-11 — Estructura inicial

- **Repo git local + remoto en `RicardoGFentanes/neoGPSBaterias`.** Para compartir con el equipo.
- **Fotos dentro del repo (`fotos/`), no en servicio externo.** Simplicidad para revisión en equipo. A vigilar: si el repo crece mucho (270 negocios x varias fotos), evaluar Git LFS.
- **API key de Google Maps en `.env` (gitignored), nunca en el Excel ni en el repo.**
- **Nombre de negocio corregido a partir del LINK cuando `NOMBRE NEGOCIO` viene corrupto**, en vez de intentar reparar manualmente los acentos — ver [[Diccionario de Datos]].
- **Obsidian vive dentro del repo (`obsidian/`)** para que cualquiera del equipo que clone el repo tenga también la bitácora, no solo el Excel.
- **Se valida primero un lote de 10 CASE ID** antes de correr el pipeline sobre los 270, para ajustar criterios de validación con Ricardo.

<!-- Agregar nuevas decisiones abajo, más recientes primero -->
