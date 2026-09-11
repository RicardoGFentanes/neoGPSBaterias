# Proyecto: Negocios Baterías Araña(s) — NeoGPS

Segundo cerebro del proyecto. Abre esta carpeta (`obsidian/`) como vault en Obsidian.

## Mapa del proyecto

- [[Diccionario de Datos]] — qué significa cada columna del Excel, criterio de validación actualizado.
- [[Decisiones]] — bitácora de decisiones tomadas sobre el flujo y el esquema.
- [[Revision Primeros 10]] — resultado de la revisión de los primeros 10 CASE ID (CASE ID 6 confirmado NO por Ricardo).
- [[Revision 11-20]] — resultado del segundo lote. Pregunta abierta: negocios "Cerrado temporalmente".
- `Bitacora/` — una nota por sesión de trabajo.

## Objetivo del proyecto

Validar 270 negocios candidatos a vender baterías para automóvil (fuente: `NEGOCIOS_BATERIAS_ARAÑAS.xlsx`), confirmando con Google Maps / Street View que:

1. Tienen un `CASE ID` consecutivo.
2. Realmente venden baterías (nombre en fachada coincide, hay baterías/logos en fachada o mostrador, o anuncios).
3. Se descargan y archivan sus fotos de Street View.
4. Se anota en el Excel: fachada detectada, marcas/logos encontrados, si hay baterías en mostrador, y el veredicto final (vende / no vende).

## Estado actual

- [x] Estructura de repo y git creada
- [x] Columnas nuevas agregadas al Excel (CASE ID + columnas de validación)
- [x] API key de Google Maps configurada
- [x] Primeros 10 CASE ID validados y revisados con Ricardo (CASE ID 6 = NO confirmado)
- [x] CASE ID 11-20 validados (7 SI, 3 PENDIENTE por estatus "Cerrado temporalmente" — pregunta abierta)
- [x] Carpeta `fotos_aglomeradas/` con foto representativa por negocio
- [ ] Pipeline aplicado al resto de la base (250 negocios restantes)
- [x] Repo compartido en GitHub (`RicardoGFentanes/neoGPSBaterias`)
