# 2026-09-11 — Correcciones de Ricardo y lote CASE ID 11-20

- Ricardo revisó el lote 1-10 y confirmó **CASE ID 6 = NO** (taller de cerrajería, no vende baterías).
- Dejó 3 ejemplos de fotos en `fotos/002`, `fotos/004` y `fotos/007` mostrando que el Street View "por defecto" que yo había descargado no siempre era la mejor toma disponible — había capturas mejor centradas o en otras fechas/ángulos en la propia interfaz de Maps.
- Se actualizó `scripts/04_generar_excel_revision.py` para sincronizar tanto `OBSERVACIONES` como correcciones a `VENDE BATERIAS` hechas a mano en el Excel de revisión, de vuelta al maestro.
- Se creó `scripts/06_aglomerar_fotos.py`: genera `fotos_aglomeradas/` con una foto representativa por negocio, renombrada `<CASE ID>_Nombre_Del_Negocio`, conservando intacta la carpeta `fotos/` por negocio.
- Se validó el lote CASE ID 11-20 aplicando el criterio corregido:
  - Se revisaron las pestañas de fotos "Street View y 360°" / "Del propietario" en Maps cuando la foto estática no mostraba la fachada (resolvió 12 y 16).
  - Se usó el texto de reseñas como evidencia cuando no había ninguna foto útil (11 y 12).
  - Se detectaron 3 negocios marcados "Cerrado temporalmente" en Maps (18, 19, 20) — se dejaron en PENDIENTE, es una pregunta abierta para Ricardo.
  - Se detectó que CASE ID 2 y 15 son el mismo negocio fisico (fichas duplicadas en Maps).
- Resultado del lote: **7 SI, 0 NO, 3 PENDIENTE**. Ver [[Revision 11-20]].

## Siguiente paso

Esperar respuesta de Ricardo sobre cómo tratar los negocios "Cerrado temporalmente", y si aprueba el criterio ampliado, seguir con el lote 21-30 (y revisar si hay más fichas duplicadas en el resto de la base).
