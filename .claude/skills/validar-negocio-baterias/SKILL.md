---
name: validar-negocio-baterias
description: Valida un rango de CASE ID de NEGOCIOS_BATERIAS_ARAÑAS.xlsx contra Google Street View / Maps para confirmar si el negocio realmente vende baterías de auto, descarga y renombra las fotos, y actualiza el Excel con fachada/marcas/mostrador detectados. Usar cuando el usuario pida "valida los negocios X a Y", "corre el pipeline de baterías", "revisa el siguiente lote de CASE ID", o similar dentro de este proyecto.
---

# Validar negocios de baterías (NeoGPS)

Este skill ejecuta el flujo de validación del proyecto `bateriasNeoGPS` sobre un rango de `CASE ID` de `NEGOCIOS_BATERIAS_ARAÑAS.xlsx` (hoja `ar_neg`).

## Precondiciones

1. `.env` debe existir en la raíz con `GOOGLE_MAPS_API_KEY` configurada (ver `.env.example`). Necesita Street View Static + Metadata API, y Geocoding API (para direcciones limpias).
2. El Excel debe tener ya las columnas `CASE ID` y de validación (`scripts/01_add_columns.py`). Si no existen, córrelo primero (falla si el archivo está abierto en Excel — pide al usuario que lo cierre).
3. El Excel **no debe estar abierto en Excel** al momento de escribir resultados (`03_update_validation.py`, `04_generar_excel_revision.py` y `05_reverse_geocode.py` fallarán con permiso denegado si lo está).
4. **Antes de validar un lote nuevo, revisar si hay `OBSERVACIONES` escritas por el equipo** en `VALIDACION_NEGOCIOS_BATERIAS.xlsx` (o ya sincronizadas en la columna `OBSERVACIONES` del Excel maestro) — pueden corregir el criterio para casos similares. Ver [[Diccionario de Datos]] en Obsidian.

## Pasos por lote (ej. CASE ID 1 a 10)

1. **Descargar Street View**: `python scripts/02_download_streetview.py <inicio> <fin>`. Guarda en `fotos/<CASEID>_<slug>/streetview_1.jpg`. Si el status de metadata no es `OK`, se guarda `SIN_STREETVIEW.txt` en la carpeta — en ese caso, revisar el negocio manualmente por el `LINK` de Maps (abrir en el navegador) en vez de asumir que no vende baterías.

2. **Revisar cada foto con visión** (Read de la imagen descargada). Para cada `CASE ID` del lote, determinar:
   - `nombre_fachada`: nombre legible en la fachada, si lo hay.
   - `marcas`: marcas/logos de batería visibles en fachada o mostrador (lista separada por coma). **No cuentan anuncios/publicidad genérica** como "marca detectada" — solo logos de marca reales o baterías físicas visibles.
   - `mostrador`: "SI"/"NO" — si se ve un mostrador o exhibidor con baterías de auto físicas.
   - `evidencia`: texto breve de qué se vio y por qué se concluye lo que se concluye.
   - `vende_baterias`: "SI" si hay evidencia razonable (nombre coincide + fachada/mostrador/anuncio de baterías), "NO" si la fachada/negocio claramente no corresponde (ej. es una tienda de otro giro), "PENDIENTE" si la imagen no es concluyente (mala calidad, sin Street View, fachada no visible) — en ese caso anotar en `evidencia` qué falta y considerar revisar el `LINK` de Maps directamente con el navegador antes de dejarlo en PENDIENTE.
   - Si `NOMBRE NEGOCIO` en el Excel no coincide con lo visto en la fachada pero el giro sí es de baterías, priorizar la evidencia visual sobre el nombre registrado.

3. **Cuando la foto de Street View (Static API) no sea concluyente** (bloqueada, mal encuadrada, cortina cerrada, fachada equivocada), NO asumir PENDIENTE de inmediato — el "encuadre por defecto" de la Static API no siempre es la mejor imagen disponible. Revisar, en este orden, abriendo el `LINK` de Maps en el navegador (Browser tool):
   a. La pestaña de fotos **"Street View y 360°"** y **"Del propietario"** en la ficha del negocio — puede haber una captura de Street View en otra fecha/ángulo que sí muestre la fachada (pasó en varios casos: el Street View "actual" no servía pero uno más viejo o con otro heading sí). Si se encuentra una mejor, guardarla como `maps_foto_N.jpg` en la carpeta del negocio (extraer la URL `lh3.googleusercontent.com/gps-cs-s/...` con `javascript_tool` sobre los `<img>` de la pagina, y descargarla con `requests` a mayor resolución — no sirve `computer` "zoom" para esto, no recorta).
   b. Fotos subidas por el negocio o clientes.
   c. **El texto de las reseñas** (pestaña "Opiniones" / `get_page_text`) — a veces confirman o niegan la venta de baterías aunque no haya ninguna foto útil (ej. una reseña quejándose de que "no sirven sus baterías" SÍ cuenta como evidencia de que las venden).
   d. Revisar si el negocio aparece marcado **"Cerrado temporalmente"** o **"Cerrado permanentemente"** en Maps — es una señal que hay que reportar aparte (no asumir SI/NO automáticamente; ver criterio en [[Diccionario de Datos]] de Obsidian, es una decision que debe confirmar el equipo).
   Solo si ninguna de estas da evidencia, se deja como PENDIENTE.

4. **Escribir resultados**: acumular un JSON con el formato de `scripts/03_update_validation.py` (uno por lote, ej. `data/resultados_lote_11_20.json`) y correr:
   `python scripts/03_update_validation.py data/resultados_lote_11_20.json`

5. **Direcciones limpias**: correr `python scripts/05_reverse_geocode.py <inicio> <fin>` (es idempotente — solo llena `DIRECCION LIMPIA` donde falte). Si no se pasa rango, corre sobre toda la base pendiente.

6. **Regenerar el Excel de revisión**: correr `python scripts/04_generar_excel_revision.py`. Este paso primero sincroniza `OBSERVACIONES` **y correcciones manuales a `VENDE BATERIAS`** que el equipo haya escrito en `VALIDACION_NEGOCIOS_BATERIAS.xlsx` hacia el Excel maestro (para no perderlas — una corrección humana ahí siempre gana), y luego regenera ese Excel con todos los negocios validados hasta el momento.

7. **Actualizar el aglomerado de fotos**: correr `python scripts/06_aglomerar_fotos.py`. Regenera `fotos_aglomeradas/` con una foto representativa por negocio ya validado (prioriza archivos `ejemplo`/`final` dejados a mano por el equipo). No toca la carpeta `fotos/` por negocio.

8. **Registrar el lote en Obsidian**: agregar una entrada en `obsidian/Bitacora/<fecha> - Lote <inicio>-<fin>.md` con un resumen (cuántos SI/NO/PENDIENTE, hallazgos notables, marcas nuevas no listadas en `marcas_bat.xlsx`, observaciones del equipo que cambiaron el criterio, negocios "Cerrado temporalmente", posibles fichas duplicadas). Crear también `obsidian/Revision <inicio>-<fin>.md` con la tabla de resultados para revisar con el usuario.

## Notas

- `NOMBRE NEGOCIO` puede venir con encoding corrupto (`�`) en ~77/270 filas; usar `NOMBRE NEGOCIO LIMPIO` (agregada por `01_add_columns.py`) que recupera el nombre real desde el slug del `LINK`. `DIRECCION` viene corrupta en las 270 filas; usar `DIRECCION LIMPIA` (`05_reverse_geocode.py`).
- No asumir tamaños de lote grandes sin confirmar con el usuario — el proyecto arrancó pidiendo revisar primero los CASE ID 1-10 antes de escalar a los 270.
- Marcas detectadas deben normalizarse, cuando sea posible, contra la lista de `marcas_bat.xlsx` (columna "Marca correcta") para mantener consistencia de nombres.
- **Fichas duplicadas**: dos entradas distintas en el Excel pueden ser el mismo negocio físico (mismo LAT/LONG casi exacto, ej. CASE ID 2 y 15). Si se detecta, anotarlo en la evidencia de ambos.
- **Negocios "Cerrado temporalmente" en Maps**: no asumir automáticamente SI ni NO. Dejar en PENDIENTE con la evidencia histórica disponible y avisar al usuario — es una decisión de negocio, no solo de validación visual.
