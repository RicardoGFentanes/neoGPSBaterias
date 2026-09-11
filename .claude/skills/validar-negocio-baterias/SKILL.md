---
name: validar-negocio-baterias
description: Valida un rango de CASE ID de NEGOCIOS_BATERIAS_ARAÑAS.xlsx contra Google Street View / Maps para confirmar si el negocio realmente vende baterías de auto, descarga y renombra las fotos, y actualiza el Excel con fachada/marcas/mostrador detectados. Usar cuando el usuario pida "valida los negocios X a Y", "corre el pipeline de baterías", "revisa el siguiente lote de CASE ID", o similar dentro de este proyecto.
---

# Validar negocios de baterías (NeoGPS)

Este skill ejecuta el flujo de validación del proyecto `bateriasNeoGPS` sobre un rango de `CASE ID` de `NEGOCIOS_BATERIAS_ARAÑAS.xlsx` (hoja `ar_neg`).

## Precondiciones

1. `.env` debe existir en la raíz con `GOOGLE_MAPS_API_KEY` configurada (ver `.env.example`).
2. El Excel debe tener ya las columnas `CASE ID` y de validación (`scripts/01_add_columns.py`). Si no existen, córrelo primero (falla si el archivo está abierto en Excel — pide al usuario que lo cierre).
3. El Excel **no debe estar abierto en Excel** al momento de escribir resultados (`03_update_validation.py` fallará con permiso denegado si lo está).

## Pasos por lote (ej. CASE ID 1 a 10)

1. **Descargar Street View**: `python scripts/02_download_streetview.py <inicio> <fin>`. Guarda en `fotos/<CASEID>_<slug>/streetview_1.jpg`. Si el status de metadata no es `OK`, se guarda `SIN_STREETVIEW.txt` en la carpeta — en ese caso, revisar el negocio manualmente por el `LINK` de Maps (abrir en el navegador) en vez de asumir que no vende baterías.

2. **Revisar cada foto con visión** (Read de la imagen descargada). Para cada `CASE ID` del lote, determinar:
   - `nombre_fachada`: nombre legible en la fachada, si lo hay.
   - `marcas`: marcas/logos de batería visibles en fachada o mostrador (lista separada por coma). **No cuentan anuncios/publicidad genérica** como "marca detectada" — solo logos de marca reales o baterías físicas visibles.
   - `mostrador`: "SI"/"NO" — si se ve un mostrador o exhibidor con baterías de auto físicas.
   - `evidencia`: texto breve de qué se vio y por qué se concluye lo que se concluye.
   - `vende_baterias`: "SI" si hay evidencia razonable (nombre coincide + fachada/mostrador/anuncio de baterías), "NO" si la fachada/negocio claramente no corresponde (ej. es una tienda de otro giro), "PENDIENTE" si la imagen no es concluyente (mala calidad, sin Street View, fachada no visible) — en ese caso anotar en `evidencia` qué falta y considerar revisar el `LINK` de Maps directamente con el navegador antes de dejarlo en PENDIENTE.
   - Si `NOMBRE NEGOCIO` en el Excel no coincide con lo visto en la fachada pero el giro sí es de baterías, priorizar la evidencia visual sobre el nombre registrado.

3. **Cuando la foto de Street View no sea concluyente**, complementar abriendo el `LINK` de Maps del negocio en el navegador (Browser tool) para ver las fotos que haya subido el negocio/usuarios — mismo criterio de evidencia.

4. **Escribir resultados**: acumular un JSON con el formato de `scripts/03_update_validation.py` (uno por lote, ej. `data/resultados_lote_1_10.json`) y correr:
   `python scripts/03_update_validation.py data/resultados_lote_1_10.json`

5. **Registrar el lote en Obsidian**: agregar una entrada en `obsidian/Bitacora/<fecha> - Lote <inicio>-<fin>.md` con un resumen (cuántos SI/NO/PENDIENTE, hallazgos notables, marcas nuevas no listadas en `marcas_bat.xlsx`). Si es el primer lote (CASE ID 1-10), llenar también `obsidian/Revision Primeros 10.md` para revisar con el usuario antes de escalar al resto de la base.

## Notas

- `NOMBRE NEGOCIO` puede venir con encoding corrupto (`�`) en ~77/270 filas; usar `NOMBRE NEGOCIO LIMPIO` (agregada por `01_add_columns.py`) que recupera el nombre real desde el slug del `LINK`.
- No asumir tamaños de lote grandes sin confirmar con el usuario — el proyecto arrancó pidiendo revisar primero los CASE ID 1-10 antes de escalar a los 270.
- Marcas detectadas deben normalizarse, cuando sea posible, contra la lista de `marcas_bat.xlsx` (columna "Marca correcta") para mantener consistencia de nombres.
