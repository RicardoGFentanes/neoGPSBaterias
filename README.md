# NEGOCIOS_BATERIAS_ARAÑAS

Base de negocios (270 registros) a validar como vendedores reales de baterías para automóvil, usando Google Maps / Street View, para construir una base confiable para el equipo.

## Archivos

- `NEGOCIOS_BATERIAS_ARAÑAS.xlsx` — base maestra de negocios a validar (hoja `ar_neg`), fuente de verdad de las 270 filas.
- `VALIDACION_NEGOCIOS_BATERIAS.xlsx` — Excel de revisión (solo negocios ya validados), con columna `OBSERVACIONES` para que el equipo escriba notas que guían la validación de los siguientes lotes. Se regenera con `scripts/04_generar_excel_revision.py`.
- `marcas_bat.xlsx` — catálogo de marcas de baterías (correctas, clonadas, proveedor, inventario) usado como referencia al anotar marcas detectadas.
- `fotos/` — fotos descargadas de Street View / Maps, organizadas por `CASE ID`.
- `scripts/` — scripts de validación:
  - `01_add_columns.py` — agrega CASE ID y columnas de validación al Excel maestro.
  - `02_download_streetview.py <inicio> <fin>` — descarga fotos de Street View.
  - `03_update_validation.py <resultados.json>` — escribe resultados de validación al Excel maestro.
  - `04_generar_excel_revision.py` — sincroniza OBSERVACIONES y regenera el Excel de revisión.
  - `05_reverse_geocode.py [inicio fin]` — reconstruye direcciones limpias vía reverse geocoding.
- `data/` — datos intermedios/export (resultados de validación por lote, en JSON).
- `obsidian/` — vault de Obsidian (segundo cerebro del proyecto): bitácora, hallazgos, decisiones.
- `.claude/skills/` — skills de Claude Code para repetir el flujo de validación.

## Flujo de validación por negocio

1. Confirmar `CASE ID` consecutivo (1..n).
2. Revisar el link de Maps y el Street View (con base en LAT/LONG) del negocio.
3. Confirmar si el negocio realmente vende baterías: nombre coincide, hay baterías en fachada, anuncios, o mostrador con baterías de auto.
4. Descargar fotos de Street View, renombrarlas con el `CASE ID` y guardarlas en `fotos/`.
5. Anotar en el Excel: nombre de fachada detectado, marcas/logos detectados o baterías en mostrador (no anuncios), y si vende baterías o no.

## Configuración

1. Copia `.env.example` a `.env` y coloca tu Google Maps API key (`GOOGLE_MAPS_API_KEY`). Nunca se sube al repositorio.
2. Instala dependencias de Python: `pip install requests openpyxl pandas`.

## Obsidian

Abre la carpeta `obsidian/` como vault en Obsidian para ver la bitácora del proyecto y las notas de hallazgos por negocio.
