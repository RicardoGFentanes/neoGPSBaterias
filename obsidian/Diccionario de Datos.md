# Diccionario de Datos

## Carpetas de fotos

- **`fotos/`** — una subcarpeta por negocio (`<CASE ID en 3 digitos>_<slug>/`), con todas las fotos de ese negocio (`streetview_1.jpg`, `maps_foto_N.jpg`, o archivos `ejemplo_*` que el equipo deje a mano como referencia de la mejor toma). Esta carpeta **no se reorganiza ni se borra**.
- **`fotos_aglomeradas/`** — carpeta adicional, generada por `scripts/06_aglomerar_fotos.py`, con **una foto representativa por negocio ya validado**, copiada (no movida) y renombrada como `<CASE ID>_Nombre_Del_Negocio.<ext>` (ej. `12_Baterías_Para_Carro_La_Primera.jpg`). Se regenera cada vez que se corre el script — prioriza archivos `ejemplo`/`final` dejados a mano, luego `streetview_1.jpg`, luego `maps_foto_1.jpg`.

Dos archivos Excel viven en el proyecto:

- **`NEGOCIOS_BATERIAS_ARAÑAS.xlsx`** (hoja `ar_neg`) — base maestra, las 270 filas, con todas las columnas originales de Maps más las columnas que agrega el pipeline. Es la fuente de verdad.
- **`VALIDACION_NEGOCIOS_BATERIAS.xlsx`** — Excel de revisión, generado/regenerado por `scripts/04_generar_excel_revision.py`. Solo incluye los negocios ya procesados por el pipeline (no los 270 desde el inicio), con columnas más enfocadas y **la columna OBSERVACIONES para que el equipo escriba notas** — ver más abajo.

## Columnas originales (Maps)

| Columna | Descripción |
|---|---|
| NOMBRE NEGOCIO | Nombre del negocio según Google Maps. Ojo: ~77/270 filas tienen caracteres corruptos (`�`) por un problema de encoding en la exportación original — ver nota abajo. Usar `NOMBRE NEGOCIO LIMPIO` en su lugar. |
| GIRO NEGOCIO | Categoría de Maps (ej. "Tienda de baterías para automóvil"). |
| DIRECCION | Dirección original. **Las 270 filas tienen encoding corrupto** (acentos/ñ se perdieron). Usar `DIRECCION LIMPIA` en su lugar. |
| TELEFONO | Teléfono (41 filas vacías). |
| HORARIO | Horario de Maps (11 filas vacías). |
| LAT / LONG | Coordenadas — estas SÍ están limpias y son la fuente confiable para Street View / geocoding. |
| LINK | Link de Google Maps al lugar. El slug de la URL (`/place/<slug>/data=...`) trae el nombre del negocio bien codificado — de ahí se recupera el nombre correcto cuando NOMBRE NEGOCIO está corrupto. |
| PAIS / DEPARTAMENTO / MUNICIPIO | Ubicación administrativa. |
| BUSQUEDA | Query usada para encontrar el negocio en Maps. |
| PRIORIDAD | Prioridad asignada (ej. "PRIORIDAD ALTA"). |

## Columnas agregadas por el pipeline (solo en el Excel maestro)

| Columna | Script que la crea | Descripción |
|---|---|---|
| CASE ID | `01_add_columns.py` | Consecutivo 1..n, identificador único. Se usa para nombrar las fotos y para todo el resto del pipeline. |
| NOMBRE NEGOCIO LIMPIO | `01_add_columns.py` | Nombre recuperado del slug del LINK cuando el original venía corrupto. |
| DIRECCION LIMPIA | `05_reverse_geocode.py` | Dirección reconstruida vía reverse geocoding (Geocoding API) usando LAT/LONG. **Nota**: puede diferir ligeramente de la dirección original (Google devuelve la dirección más cercana indexada a esas coordenadas, no necesariamente el texto exacto original), pero siempre es correcta como ubicación. |
| VENDE BATERIAS | `01_add_columns.py` / `03_update_validation.py` | Veredicto final: SI / NO / PENDIENTE. |
| NOMBRE FACHADA DETECTADO | `03_update_validation.py` | Nombre leído directamente de la fachada en la foto (Street View o Maps). |
| MARCAS LOGOS DETECTADOS | `03_update_validation.py` | Marcas de batería identificadas en logos de fachada o en el mostrador (NO cuenta lo visto solo en anuncios/publicidad). Se normaliza contra `marcas_bat.xlsx`. |
| BATERIAS EN MOSTRADOR | `03_update_validation.py` | SI/NO — si se ve un mostrador/exhibidor con baterías de auto físicas. |
| EVIDENCIA | `03_update_validation.py` | Texto libre con el razonamiento de Claude: qué se vio exactamente y por qué se concluyó el veredicto. |
| FOTOS ARCHIVO | `03_update_validation.py` | Nombres de archivo de las fotos descargadas para este CASE ID, en `fotos/<CASE ID>_<slug>/`. |
| FECHA VALIDACION | `03_update_validation.py` | Fecha en que se hizo la validación. |
| VALIDADO POR | `03_update_validation.py` | Quién/qué validó (ej. "Claude"). |
| OBSERVACIONES | `04_generar_excel_revision.py` | **Columna para el equipo** (ver abajo). |

## Criterio de validación (actualizado con correcciones de Ricardo, lote 1-10 y 11-20)

- **Nombre en fachada + logos/mostrador/anuncio de baterías = SI.** Fachada de otro giro sin ninguna evidencia = NO (ej. CASE ID 6: taller de cerrajería, sin baterías ni anuncios).
- **Cuando el Street View no muestra la fachada** (bloqueado por árboles/vehículos, ángulo equivocado, cortina cerrada), **antes de conformarse hay que revisar**, en orden:
  1. La pestaña "Street View y 360°" / "Del propietario" en la ficha de Maps — a veces hay una foto de street view en OTRA fecha/ángulo que sí muestra la fachada (ver CASE ID 7 y 12 — el Street View "por defecto" no era el mejor disponible).
  2. Fotos subidas por el negocio o clientes en Maps.
  3. **El texto de las reseñas** — pueden confirmar la venta de baterías aunque no haya ninguna foto útil (ej. CASE ID 11: reseña "No sirven sus baterías"; CASE ID 12 y 19: reseñas mencionando precios/calidad de sus baterías).
  4. Si after eso no hay ninguna evidencia (ni foto ni reseña), se dejó como PENDIENTE.
- **"Cerrado temporalmente" en Google Maps**: varios negocios de la base aparecen así. No se asumió automáticamente ni SI ni NO — se dejaron en PENDIENTE con la evidencia disponible, y es una pregunta abierta para Ricardo (ver [[Revision 11-20]]) cómo tratarlos en la base final.
- **Fichas duplicadas**: Google Maps a veces tiene dos fichas distintas para el mismo local físico (CASE ID 2 y 15 son el mismo negocio). Vale la pena vigilar esto al escalar a los 260 restantes.
- **Calidad de foto**: cuando se use una foto de Street View/Maps distinta a la que da por defecto la Static API (por estar mejor centrada o ser la única que muestra la fachada), se guarda como `maps_foto_N.jpg` junto al `streetview_1.jpg` original en la carpeta del negocio — no se borra el original.

## La columna OBSERVACIONES — cómo se usa

Es el canal para que Ricardo (o el equipo) le diga a Claude cuándo un veredicto está mal, o dé contexto que no se puede ver en la foto (ej. "este negocio ya cerró", "el letrero es viejo, ahora vende otra cosa", "cuidado, esta marca en realidad es X no Y").

Flujo:
1. El equipo escribe notas en la columna `OBSERVACIONES` de `VALIDACION_NEGOCIOS_BATERIAS.xlsx`.
2. Antes de generar/actualizar ese Excel de nuevo, `04_generar_excel_revision.py` copia esas notas hacia el Excel maestro (por `CASE ID`), así nunca se pierden aunque el archivo de revisión se regenere.
3. Claude lee esas observaciones antes de validar los siguientes lotes, para ajustar criterio (ej. si Ricardo corrige un veredicto, ese patrón se aplica a casos similares).

## Nota sobre el encoding corrupto (resuelto)

Se confirmó que `NOMBRE NEGOCIO` (77/270 filas) y `DIRECCION` (270/270 filas) tenían caracteres de reemplazo Unicode (`�`) reales en el archivo original — no era un problema de visualización. Ya está resuelto: `NOMBRE NEGOCIO LIMPIO` recupera el nombre del slug de `LINK`, y `DIRECCION LIMPIA` lo reconstruye vía reverse geocoding con la Geocoding API (`scripts/05_reverse_geocode.py`, corrido para las 270 filas el 2026-09-11).
