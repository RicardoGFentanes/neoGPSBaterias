# 2026-09-11 — Asegurar que se noten baterías/logos/nombre en las fotos

- Ricardo pidió que las fotos de Street View aseguren que se note el nombre del local, los logos de marca y las baterías.
- `scripts/02_download_streetview.py` ahora descarga dos tomas por negocio: `streetview_1.jpg` (fov=50, zoom) y `streetview_2.jpg` (fov=90, contexto).
- Se re-descargaron ambas tomas para los 20 negocios ya validados y se revisó cada una con visión. Hallazgo importante: **el heading automático de la Static API no es estable** — en varios casos (10, 13, 18) el zoom quedó peor que el contexto, o cambió de objetivo por completo (13 saltó a mostrar una clínica pediátrica vecina).
- Se agregó la columna `FOTO PRINCIPAL` al Excel maestro y se llenó a mano para los 20 casos, comparando ambas tomas (y, cuando ninguna alcanzaba, usando fotos de Maps — para CASE ID 13 se usó una foto de producto de las baterías POWER CONNECTION/FULL POWER en el anaquel, mejor evidencia que la fachada parcialmente cortada).
- `06_aglomerar_fotos.py` ahora prioriza `FOTO PRINCIPAL` sobre el heurístico anterior.
- Se descubrió un gotcha de sincronización: editar el maestro directamente sin actualizar también el Excel de revisión puede hacer que `04_generar_excel_revision.py` revierta el cambio (pasó con CASE ID 13, corregido). Documentado en [[Decisiones]] y en la skill.
- Documentación actualizada: [[Diccionario de Datos]] (nueva sección "Regla de calidad de foto"), skill `validar-negocio-baterias`.

## Siguiente paso

Aplicar el mismo estándar de calidad de foto (comparar zoom vs contexto, anotar FOTO PRINCIPAL explícita) en los siguientes lotes. Seguir esperando la respuesta de Ricardo sobre los negocios "Cerrado temporalmente" (CASE ID 18, 19, 20) antes de escalar al resto de la base.
