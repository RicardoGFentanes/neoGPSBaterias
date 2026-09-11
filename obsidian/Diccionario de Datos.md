# Diccionario de Datos — NEGOCIOS_BATERIAS_ARAÑAS.xlsx (hoja `ar_neg`)

## Columnas originales

| Columna | Descripción |
|---|---|
| NOMBRE NEGOCIO | Nombre del negocio según Google Maps. Ojo: ~77/270 filas tienen caracteres corruptos (`�`) por un problema de encoding en la exportación original — ver nota abajo. |
| GIRO NEGOCIO | Categoría de Maps (ej. "Tienda de baterías para automóvil"). |
| DIRECCION | Dirección. **Las 270 filas tienen encoding corrupto** (acentos/ñ se perdieron). No se puede recuperar del LINK; candidato a reconstruir vía reverse geocoding con LAT/LONG cuando tengamos la API key. |
| TELEFONO | Teléfono (41 filas vacías). |
| HORARIO | Horario de Maps (11 filas vacías). |
| LAT / LONG | Coordenadas — estas SÍ están limpias y son la fuente confiable para Street View / geocoding. |
| LINK | Link de Google Maps al lugar. El slug de la URL (`/place/<slug>/data=...`) trae el nombre del negocio bien codificado (URL-encoded) — de ahí se puede recuperar el nombre correcto con acentos cuando NOMBRE NEGOCIO está corrupto. |
| PAIS / DEPARTAMENTO / MUNICIPIO | Ubicación administrativa. |
| BUSQUEDA | Query usada para encontrar el negocio en Maps. |
| PRIORIDAD | Prioridad asignada (ej. "PRIORIDAD ALTA"). |

## Columnas nuevas (a agregar en el pipeline de validación)

| Columna | Descripción |
|---|---|
| CASE ID | Consecutivo 1..n, identificador único del negocio. Se usa para nombrar las fotos descargadas. |
| VENDE BATERIAS | Veredicto final: SI / NO / PENDIENTE. |
| NOMBRE FACHADA DETECTADO | Nombre leído directamente de la fachada en la foto (Street View o Maps). |
| MARCAS LOGOS DETECTADOS | Marcas de batería identificadas en logos de fachada o en el mostrador (NO cuenta lo visto solo en anuncios/publicidad). Se normaliza contra `marcas_bat.xlsx`. |
| BATERIAS EN MOSTRADOR | SI/NO — si se ve un mostrador/exhibidor con baterías de auto físicas. |
| EVIDENCIA | Texto libre: qué se vio exactamente (ej. "anuncio de marca X en fachada", "mostrador con 6 baterías visibles", "coincide nombre pero no hay evidencia visual"). |
| FOTOS ARCHIVO | Nombres de archivo de las fotos descargadas para este CASE ID, en `fotos/`. |
| FECHA VALIDACION | Fecha en que se hizo la validación. |
| VALIDADO POR | Quién/qué validó (ej. "Claude" o iniciales del equipo). |

## Nota sobre el encoding corrupto

Se confirmó que `NOMBRE NEGOCIO` y `DIRECCION` tienen caracteres de reemplazo Unicode (`�`) reales en el archivo — no es un problema de visualización. Para `NOMBRE NEGOCIO` se puede recuperar el valor correcto decodificando el slug de `LINK`. Para `DIRECCION` no hay forma de recuperarlo del Excel mismo; la opción es usar reverse geocoding (Google Geocoding API) con LAT/LONG una vez que tengamos la API key.
