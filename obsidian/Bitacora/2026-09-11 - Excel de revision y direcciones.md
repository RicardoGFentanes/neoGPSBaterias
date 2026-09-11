# 2026-09-11 — Excel de revisión y direcciones limpias

- Ricardo pidió: un Excel dedicado a la validación (con direcciones y coordenadas) y una columna para que él escriba observaciones que guíen los siguientes lotes.
- Se creó `scripts/04_generar_excel_revision.py` → genera `VALIDACION_NEGOCIOS_BATERIAS.xlsx` con los negocios ya validados (por ahora los 10 del primer lote), formateado (encabezado con color, autofiltro, fila congelada, link a Maps clickeable, rutas de fotos).
- Se agregó la columna `OBSERVACIONES` al Excel maestro; el script la sincroniza en ambos sentidos para no perder notas del equipo.
- Se aprovechó la API key para resolver el problema de encoding en `DIRECCION`: se creó `scripts/05_reverse_geocode.py` y se corrió sobre las 270 filas → 270 direcciones reconstruidas, 0 fallos. Nueva columna `DIRECCION LIMPIA` en el maestro.
- Se intentó abrir Obsidian automáticamente en el vault del proyecto (`obsidian://open?path=...`). El proceso de Obsidian se abrió, pero probablemente pide una confirmación manual la primera vez que se abre un vault nuevo por link — no se pudo confirmar ese diálogo de forma automática. Ver nota para Ricardo en el chat.

## Siguiente paso

Seguir esperando la revisión de Ricardo sobre el lote 1-10 (especialmente CASE ID 6) antes de escalar a los 260 restantes. Cuando Ricardo escriba observaciones en `VALIDACION_NEGOCIOS_BATERIAS.xlsx`, correr `04_generar_excel_revision.py` antes del siguiente lote para no perderlas.
