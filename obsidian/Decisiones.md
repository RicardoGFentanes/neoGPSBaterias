# Decisiones del proyecto

Bitácora de decisiones de diseño del pipeline. Cada entrada: fecha, decisión, por qué.

## 2026-09-11 — Resolución de "Cerrado temporalmente" + regla de sincronización más clara

- **"Cerrado temporalmente" en Maps NO descalifica automáticamente.** Ricardo aprobó CASE ID 19 como SI a pesar de ese estatus, porque la evidencia (reseñas) cumplía los requisitos del equipo. Regla final: evaluar la evidencia de que el negocio vendía/vende baterías igual que cualquier otro caso; el estatus "Cerrado temporalmente" se anota pero no decide el veredicto por sí solo.
- **PENDIENTE es un estado final válido para "revisión en conjunto con el equipo"**, no solo "todavía no se revisó". CASE ID 18 se queda así a propósito (evidencia de foto insuficiente, decisión de Ricardo).
- **Nuevo hallazgo por seguir**: para CASE ID 20, Ricardo detectó un negocio de baterías en la esquina de enfrente. Se identificó como "Acumuladores LEO" (Av. Pantitlán 155, ~30m) — posible reubicación/cambio de nombre de la franquicia Duracell original, o negocio nuevo no listado. Pendiente decidir si se agrega como candidato nuevo a la base.
- **Regla de sincronización más estricta (para evitar el gotcha de CASE ID 13)**: si necesitas cambiar `VENDE BATERIAS` / `OBSERVACIONES` / `FOTO PRINCIPAL` fuera de una corrida fresca de `04_generar_excel_revision.py` (por ejemplo, aplicando una decisión que Ricardo ya escribió en el Excel de revisión, directamente al maestro), **hay que escribir el mismo valor en AMBOS archivos** antes de volver a correr `04` — si no, el sync revierte el cambio con el valor viejo. Volvió a pasar con CASE ID 19 el 2026-09-11 (correcto ahora). Campos que NO son humanos-editables (`EVIDENCIA`, `BATERIAS VISIBLES EN FOTOS MAPS`, etc.) no tienen este problema — se pueden editar directo en el maestro sin riesgo.

## 2026-09-11 — Calidad de foto: zoom + contexto, y columna FOTO PRINCIPAL

- **Ricardo pidió asegurar que en las fotos de Street View se noten las baterías, los logos y el nombre del local.** `scripts/02_download_streetview.py` ahora descarga DOS tomas por negocio: `streetview_1.jpg` (fov=50, zoom) y `streetview_2.jpg` (fov=90, contexto).
- **El heading automático de la Static API no es estable entre llamadas** (se recalcula cada vez y a veces apunta a otro punto/negocio vecino) — por eso NO se puede asumir que el zoom (fov=50) siempre es mejor que el contexto (fov=90). Hay que comparar ambas y elegir a mano.
- **Se agregó la columna `FOTO PRINCIPAL`** al Excel maestro: la elección explícita, por CASE ID, de cuál foto (de las que sea) muestra mejor la evidencia. `06_aglomerar_fotos.py` la usa como primera prioridad para el aglomerado, antes que el heurístico ejemplo→streetview→maps_foto.
- **Gotcha de sincronización**: `FOTO PRINCIPAL` (como `OBSERVACIONES` y `VENDE BATERIAS`) es un campo "humano" que `04_generar_excel_revision.py` sincroniza desde `VALIDACION_NEGOCIOS_BATERIAS.xlsx` hacia el maestro ANTES de regenerar. Si se edita el maestro directamente (por script o a mano) sin también actualizar el archivo de revisión, la siguiente corrida de `04` puede **revertir el cambio** con el valor viejo del archivo de revisión. Pasó con CASE ID 13 el 2026-09-11. Regla: si se edita `FOTO PRINCIPAL`/`VENDE BATERIAS`/`OBSERVACIONES` directamente en el maestro, actualizar tambien esa misma celda en `VALIDACION_NEGOCIOS_BATERIAS.xlsx` antes de correr `04`, o hacerlo únicamente desde el archivo de revisión.
- Se re-revisaron las 20 fotos zoom nuevas contra las de contexto; en varios casos (10, 13, 18) el contexto (fov=90) resultó mejor que el zoom. En otros (1, 3, 14, 15, 17) el zoom fue claramente mejor. Se documentó explícitamente cada elección en `FOTO PRINCIPAL`.

## 2026-09-11 — Correcciones de Ricardo (lote 1-10) + criterio ampliado

- **CASE ID 6 confirmado como NO** por Ricardo (taller de cerrajería, no vende baterías) — corrección aplicada directamente en `VALIDACION_NEGOCIOS_BATERIAS.xlsx` y sincronizada al maestro.
- **El Excel de revisión ahora es la fuente de correcciones humanas**: además de `OBSERVACIONES`, el campo `VENDE BATERIAS` editado a mano ahí también se sincroniza hacia el maestro (gana sobre lo que haya puesto el pipeline). Ver `scripts/04_generar_excel_revision.py`.
- **Nueva regla: revisar otras fechas/ángulos de Street View antes de rendirse.** Ricardo mostró con ejemplos (CASE ID 2, 4, 7) que el Street View "por defecto" de la Static API no siempre es la mejor imagen disponible — la pestaña "Street View y 360°" / "Del propietario" en Maps puede tener una captura mejor centrada o en otra fecha que sí confirma la fachada.
- **Nueva regla: si no hay foto pero sí evidencia en reseñas de texto, cuenta como confirmación.** Aplicado en CASE ID 11 y 12 del lote 11-20.
- **Nuevo caso abierto (sin resolver aún): negocios "Cerrado temporalmente" en Maps.** 3 del lote 11-20 (18, 19, 20) tienen este estatus con distintos niveles de evidencia histórica de venta de baterías. Se dejaron en PENDIENTE — pregunta abierta para Ricardo, ver [[Revision 11-20]].
- **Carpeta `fotos_aglomeradas/` agregada** (`scripts/06_aglomerar_fotos.py`): una foto representativa por negocio, copiada y renombrada `<CASE ID>_Nombre_Del_Negocio.<ext>`, sin tocar la estructura de `fotos/` por negocio.

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
