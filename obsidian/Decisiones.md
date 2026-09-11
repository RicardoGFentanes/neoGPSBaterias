# Decisiones del proyecto

Bitácora de decisiones de diseño del pipeline. Cada entrada: fecha, decisión, por qué.

## 2026-09-11 — Excel de revisión + direcciones limpias

- **Dos Excels, uno maestro y uno de revisión.** `NEGOCIOS_BATERIAS_ARAÑAS.xlsx` sigue siendo la fuente de verdad (270 filas, todas las columnas). `VALIDACION_NEGOCIOS_BATERIAS.xlsx` es un export enfocado (solo negocios ya validados) para que el equipo revise cómodamente y escriba notas, sin exponer las columnas ruidosas del original (HORARIO, BUSQUEDA, PRIORIDAD, etc.).
- **La columna OBSERVACIONES se sincroniza del Excel de revisión al maestro antes de regenerar**, para que las notas del equipo nunca se pierdan aunque el archivo de revisión se regenere desde cero en cada lote. Ver [[Diccionario de Datos]].
- **Direcciones reconstruidas con reverse geocoding (Geocoding API) en vez de reparar manualmente los acentos.** Las 270 filas tenían `DIRECCION` con encoding corrupto; se agregó `DIRECCION LIMPIA` a partir de LAT/LONG. Puede diferir levemente del texto original (Google regresa la dirección más cercana indexada a esas coordenadas) pero siempre es una dirección válida y legible.

## 2026-09-11 — Estructura inicial

- **Repo git local + remoto en `RicardoGFentanes/neoGPSBaterias`.** Para compartir con el equipo.
- **Fotos dentro del repo (`fotos/`), no en servicio externo.** Simplicidad para revisión en equipo. A vigilar: si el repo crece mucho (270 negocios x varias fotos), evaluar Git LFS.
- **API key de Google Maps en `.env` (gitignored), nunca en el Excel ni en el repo.**
- **Nombre de negocio corregido a partir del LINK cuando `NOMBRE NEGOCIO` viene corrupto**, en vez de intentar reparar manualmente los acentos — ver [[Diccionario de Datos]].
- **Obsidian vive dentro del repo (`obsidian/`)** para que cualquiera del equipo que clone el repo tenga también la bitácora, no solo el Excel.
- **Se valida primero un lote de 10 CASE ID** antes de correr el pipeline sobre los 270, para ajustar criterios de validación con Ricardo.

<!-- Agregar nuevas decisiones abajo, más recientes primero -->
