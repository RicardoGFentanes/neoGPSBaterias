# Decisiones del proyecto

Bitácora de decisiones de diseño del pipeline. Cada entrada: fecha, decisión, por qué.

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
