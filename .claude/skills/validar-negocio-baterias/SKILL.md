---
name: validar-negocio-baterias
description: Valida un rango de CASE ID de NEGOCIOS_BATERIAS_ARAÑAS.xlsx contra Google Street View / Maps para confirmar si el negocio realmente vende baterías de auto, descarga y renombra las fotos, y actualiza el Excel con fachada/marcas/mostrador detectados. Usar cuando el usuario pida "valida los negocios X a Y", "corre el pipeline de baterías", "revisa el siguiente lote de CASE ID", o similar dentro de este proyecto.
---

# Validar negocios de baterías (NeoGPS)

Este skill ejecuta el flujo de validación del proyecto `bateriasNeoGPS` sobre un rango de `CASE ID` de `NEGOCIOS_BATERIAS_ARAÑAS.xlsx` (hoja `ar_neg`).

## Regla de oro: no inventar nada

Ricardo lo pidió explícitamente (2026-09-11): **no inventar información**. Si no se puede confirmar algo con evidencia real (foto legible, reseña, texto de Maps), no se asume ni se completa por lógica/probabilidad. Cuando falte evidencia suficiente, se deja `PENDIENTE` y se anota exactamente qué falta — nunca se fuerza un SI o un NO "por parecido" o "porque seguramente es así".

## Regla del PIN exacto (crítica, aplica a los 270)

**Si el Street View en las coordenadas exactas (LAT/LONG) del negocio NO muestra el nombre registrado en la fachada, se clasifica NO** — aunque cerca (incluso a unos metros) haya otro negocio que sí venda baterías. No se le acredita a esta ficha la evidencia de un negocio distinto; el pin de Maps puede estar mal puesto, pero eso no convierte al vecino en "el mismo negocio". Un negocio de baterías real encontrado cerca pero con nombre distinto se documenta como hallazgo aparte (no se agrega a la base sin que el usuario lo pida explícitamente). Ver CASE ID 20 en [[Decisiones]] para el caso que estableció esta regla.

## Precondiciones

1. `.env` debe existir en la raíz con `GOOGLE_MAPS_API_KEY` configurada (ver `.env.example`). Necesita Street View Static + Metadata API, y Geocoding API (para direcciones limpias).
2. El Excel debe tener ya las columnas `CASE ID` y de validación (`scripts/01_add_columns.py`). Si no existen, córrelo primero (falla si el archivo está abierto en Excel — pide al usuario que lo cierre).
3. El Excel **no debe estar abierto en Excel** al momento de escribir resultados (`03_update_validation.py`, `04_generar_excel_revision.py` y `05_reverse_geocode.py` fallarán con permiso denegado si lo está).
4. **Antes de validar un lote nuevo, revisar si hay `OBSERVACIONES` escritas por el equipo** en `VALIDACION_NEGOCIOS_BATERIAS.xlsx` (o ya sincronizadas en la columna `OBSERVACIONES` del Excel maestro) — pueden corregir el criterio para casos similares. Ver [[Diccionario de Datos]] en Obsidian.

## Pasos por lote (ej. CASE ID 1 a 10)

1. **Descargar Street View**: `python scripts/02_download_streetview.py <inicio> <fin>`. Guarda en `fotos/<CASEID>_<slug>/` DOS tomas: `streetview_1.jpg` (fov=50, zoom) y `streetview_2.jpg` (fov=90, contexto). Si el status de metadata no es `OK`, se guarda `SIN_STREETVIEW.txt` en la carpeta — en ese caso, revisar el negocio manualmente por el `LINK` de Maps (abrir en el navegador) en vez de asumir que no vende baterías.

2. **Revisar AMBAS fotos con visión** (Read de las dos imágenes). El heading automático de la Static API no es estable entre llamadas — no asumir que el zoom (streetview_1) siempre es mejor; compara las dos y usa la que más claramente muestre nombre/logos/baterías (pidió Ricardo explícitamente que esto se note bien, no solo que "se alcance a ver"). Para cada `CASE ID` del lote, determinar:
   - `nombre_fachada`: nombre legible en la fachada, si lo hay.
   - `marcas`: marcas/logos de batería visibles en fachada o mostrador (lista separada por coma), anotadas libremente tal como se leen. **No cuentan anuncios/publicidad genérica** como "marca detectada" — solo logos de marca reales o baterías físicas visibles. **`marcas_bat.xlsx` NO se usa para esto** — es para otro proceso interno de Ricardo, confirmado 2026-09-11 (ver [[Diccionario de Datos]]).
   - `mostrador`: "SI"/"NO" — si se ve un mostrador o exhibidor con baterías de auto físicas.
   - `baterias_fotos_maps`: texto describiendo qué baterías se aprecian específicamente **en las fotos de Google Maps** (marca/cantidad/tipo si se distingue, ej. "anaquel con ~15 baterías, se distinguen cajas negras y rojas apiladas"). Es un campo descriptivo aparte de `mostrador` (que es solo SI/NO) — pensado para cuando la foto de Maps muestra producto aunque no haya "mostrador" tradicional.
   - `evidencia`: texto breve de qué se vio y por qué se concluye lo que se concluye.
   - `vende_baterias`: "SI" si hay evidencia razonable (nombre coincide + fachada/mostrador/anuncio de baterías), "NO" si la fachada/negocio claramente no corresponde (ej. es una tienda de otro giro), "PENDIENTE" si la imagen no es concluyente (mala calidad, sin Street View, fachada no visible) — en ese caso anotar en `evidencia` qué falta y considerar revisar el `LINK` de Maps directamente con el navegador antes de dejarlo en PENDIENTE.
   - Si `NOMBRE NEGOCIO` en el Excel no coincide con lo visto en la fachada pero el giro sí es de baterías, priorizar la evidencia visual sobre el nombre registrado.
   - `foto_principal`: el nombre de archivo (de `streetview_1.jpg`, `streetview_2.jpg`, o cualquier `maps_foto_N.jpg`/`ejemplo_*` que se haya agregado) que mejor muestra la evidencia — **siempre anotarlo explícitamente**, no dejar que `06_aglomerar_fotos.py` lo adivine. Una foto de producto de cerca (baterías con marca legible) cuenta como buena `foto_principal` aunque no muestre la fachada completa, si es la evidencia más clara disponible (ver CASE ID 13).

   ⚠️ **Requisito explícito de Ricardo (2026-09-11): la `foto_principal` de cada negocio SI debe probar visualmente que vende baterías** (baterías/logos de marca visibles), no solo mostrar la fachada o el contexto de la calle. Si el `streetview_1`/`streetview_2` no lo logra, hay que revisar la galería de fotos de Maps completa (ver siguiente paso) buscando una que sí sirva como prueba visual — no conformarse con la primera foto que aparece. Si genuinamente NO existe ninguna foto que pruebe la venta de baterías (ej. CASE ID 11 y 18: solo hay 1 foto de Street View y no hay nada más en la ficha de Maps), **no inventar ni forzar una** — se dejó constancia explícita de esa limitación en `EVIDENCIA` ("LIMITACION: ..."), y el veredicto SI en esos casos se sostiene en otra evidencia (reseñas, letrero parcialmente visible), no en la foto.

3. **Cuando la foto de Street View (Static API) no sea concluyente** (bloqueada, mal encuadrada, cortina cerrada, fachada equivocada), NO asumir PENDIENTE de inmediato — el "encuadre por defecto" de la Static API no siempre es la mejor imagen disponible. Revisar, en este orden, abriendo el `LINK` de Maps en el navegador (Browser tool):
   a. La pestaña de fotos **"Street View y 360°"** y **"Del propietario"** en la ficha del negocio — puede haber una captura de Street View en otra fecha/ángulo que sí muestre la fachada (pasó en varios casos: el Street View "actual" no servía pero uno más viejo o con otro heading sí). **Revisar TODAS las fotos de la galería ("Ver fotos"/"Ver más fotos"), no solo la primera miniatura** — varias veces la miniatura por defecto era una foto sin valor (ej. calle vacía) mientras que otras fotos de la misma galería sí mostraban el anaquel de baterías con claridad (CASE ID 5, 10, 19 — se corrigieron el 2026-09-11 porque la primera revisión solo miró la miniatura inicial). Si se encuentra una mejor, guardarla como `maps_foto_N.jpg` en la carpeta del negocio (extraer la URL `lh3.googleusercontent.com/gps-cs-s/...` con `javascript_tool` sobre los `<img>` de la pagina, y descargarla con `requests` a mayor resolución — no sirve `computer` "zoom" para esto, no recorta).
   b. Fotos subidas por el negocio o clientes.
   c. **El texto de las reseñas** (pestaña "Opiniones" / `get_page_text`) — a veces confirman o niegan la venta de baterías aunque no haya ninguna foto útil (ej. una reseña quejándose de que "no sirven sus baterías" SÍ cuenta como evidencia de que las venden).
   d. Revisar si el negocio aparece marcado **"Cerrado temporalmente"** o **"Cerrado permanentemente"** en Maps — anotarlo en la evidencia, pero **no descalifica automáticamente**. Evaluar la evidencia igual que en cualquier otro caso.
   Solo si ninguna de estas da evidencia suficiente, se deja como PENDIENTE — y PENDIENTE puede ser un estado FINAL, no solo "todavía no revisado". **Recuerda la regla del PIN exacto de arriba**: nombre no coincide en el sitio exacto = NO, no importa si hay otro negocio de baterías cerca.

4. **Escribir resultados**: acumular un JSON con el formato de `scripts/03_update_validation.py` (uno por lote, ej. `data/resultados_lote_11_20.json`) y correr:
   `python scripts/03_update_validation.py data/resultados_lote_11_20.json`

5. **Direcciones limpias**: correr `python scripts/05_reverse_geocode.py <inicio> <fin>` (es idempotente — solo llena `DIRECCION LIMPIA` donde falte). Si no se pasa rango, corre sobre toda la base pendiente.

6. **Regenerar el Excel de revisión**: correr `python scripts/04_generar_excel_revision.py`. Este paso primero sincroniza `OBSERVACIONES`, `VENDE BATERIAS` y `FOTO PRINCIPAL` que el equipo haya editado a mano en `VALIDACION_NEGOCIOS_BATERIAS.xlsx` hacia el Excel maestro (para no perderlas — una corrección humana ahí siempre gana), y luego regenera ese Excel con todos los negocios validados hasta el momento.
   ⚠️ **Gotcha**: si editas `OBSERVACIONES`/`VENDE BATERIAS`/`FOTO PRINCIPAL` directamente en el Excel MAESTRO (por script o a mano) en vez de en el de revisión, hazlo también en `VALIDACION_NEGOCIOS_BATERIAS.xlsx` (o dicho archivo debe estar desactualizado/inexistente) antes de correr este paso — si no, el sync de arriba puede **revertir tu cambio** con el valor viejo que trae el archivo de revisión. Pasó con CASE ID 13 el 2026-09-11, ver [[Decisiones]].

7. **Actualizar el aglomerado de fotos**: correr `python scripts/06_aglomerar_fotos.py`. Regenera `fotos_aglomeradas/` con una foto representativa por negocio ya validado (prioriza archivos `ejemplo`/`final` dejados a mano por el equipo). No toca la carpeta `fotos/` por negocio.

8. **Registrar el lote en Obsidian**: agregar una entrada en `obsidian/Bitacora/<fecha> - Lote <inicio>-<fin>.md` con un resumen (cuántos SI/NO/PENDIENTE, hallazgos notables, observaciones del equipo que cambiaron el criterio, negocios "Cerrado temporalmente", posibles fichas duplicadas o negocios nuevos detectados en la zona). Crear también `obsidian/Revision <inicio>-<fin>.md` con la tabla de resultados para revisar con el usuario.

## Notas

- `NOMBRE NEGOCIO` puede venir con encoding corrupto (`�`) en ~77/270 filas; usar `NOMBRE NEGOCIO LIMPIO` (agregada por `01_add_columns.py`) que recupera el nombre real desde el slug del `LINK`. `DIRECCION` viene corrupta en las 270 filas; usar `DIRECCION LIMPIA` (`05_reverse_geocode.py`).
- No asumir tamaños de lote grandes sin confirmar con el usuario — el proyecto arrancó pidiendo revisar primero los CASE ID 1-10 antes de escalar a los 270.
- `marcas_bat.xlsx` es para otro proceso interno de Ricardo (confirmado 2026-09-11) — **no se usa en este pipeline**, ni para normalizar ni para excluir marcas.
- **Fichas duplicadas**: dos entradas distintas en el Excel pueden ser el mismo negocio físico (mismo LAT/LONG casi exacto, ej. CASE ID 2 y 15). Si se detecta, anotarlo en la evidencia de ambos.
- **Negocios "Cerrado temporalmente" en Maps**: NO descalifica automáticamente (resuelto 2026-09-11). Evaluar la evidencia de venta de baterías igual que cualquier otro caso; anotar el estatus en la evidencia pero decidir SI/NO/PENDIENTE según la evidencia real, no según el estatus de apertura.
- **Descargar fotos de Maps a resolución completa**: los `<img>` en la galería de Maps son `gps-cs-s`/`googleusercontent.com` — se puede sacar el src con `javascript_tool` y pedirla en mayor tamaño cambiando el sufijo `=wNN-hNN-...` por algo como `=w1200-h1200-k-no` antes de descargarla con `requests`. El `computer` "zoom" del navegador NO sirve para esto (no recorta imagenes, solo re-screenshotea).
