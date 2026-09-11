# 2026-09-11 — Resolución CASE ID 18/19/20, marcas_bat aclarado, nueva columna

- Ricardo dejó observaciones para CASE ID 18, 19 y 20 en `VALIDACION_NEGOCIOS_BATERIAS.xlsx`:
  - **18**: se queda en PENDIENTE — pasa a revisión en persona con el equipo (foto insuficiente).
  - **19**: aprobado como **SI** — cumple los requisitos aunque Maps lo marque "Cerrado temporalmente". Esto resuelve la pregunta abierta del lote anterior: **ese estatus no descalifica automáticamente**.
  - **20**: se queda en PENDIENTE — Ricardo detectó un negocio de baterías en la esquina de enfrente. Se investigó y se encontró **"Acumuladores LEO"** (Av. Pantitlán 155, a ~30m), con fotos claras de anaquel de baterías y logo LTH — posible reubicación de la franquicia original o negocio nuevo. Pendiente decidir si se agrega a la base.
- **Aclarado con Ricardo**: `marcas_bat.xlsx` es para otro proceso interno suyo, **no se usa en este pipeline** (ni para normalizar ni para excluir marcas). Se sigue anotando `MARCAS LOGOS DETECTADOS` libremente. Se actualizó el README, el diccionario de datos y la skill para quitar cualquier referencia a usarlo.
- **Nueva columna `BATERIAS VISIBLES EN FOTOS MAPS`**: a petición de Ricardo, describe qué baterías se aprecian específicamente en las fotos (cantidad/color/marca legible), distinto de `BATERIAS EN MOSTRADOR` que es solo SI/NO. Poblada para los 20 casos ya validados.
- Se volvió a topar el gotcha de sincronización (editar `VENDE BATERIAS` en el maestro sin reflejarlo también en el archivo de revisión antes de correr `04`) — ya documentado y corregido en [[Decisiones]].

## Estado del lote 1-20

**17 SI, 1 NO, 2 PENDIENTE** (CASE ID 6 = NO; CASE ID 18 y 20 = PENDIENTE para revisión en persona).

## Siguiente paso

Decidir con Ricardo si "Acumuladores LEO" se agrega como candidato nuevo a la base. Confirmar si se puede escalar al lote 21-30.
