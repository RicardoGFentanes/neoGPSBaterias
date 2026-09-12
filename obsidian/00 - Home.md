# Proyecto: Negocios Baterías Araña(s) — NeoGPS

Segundo cerebro del proyecto. Abre esta carpeta (`obsidian/`) como vault en Obsidian.

## Mapa del proyecto

- [[Diccionario de Datos]] — qué significa cada columna del Excel, criterio de validación actualizado.
- [[Decisiones]] — bitácora de decisiones tomadas sobre el flujo y el esquema.
- [[Revision Primeros 10]] — resultado de la revisión de los primeros 10 CASE ID (CASE ID 6 confirmado NO por Ricardo).
- [[Revision 11-20]] — resultado del segundo lote. "Cerrado temporalmente" resuelto (no descalifica); posible negocio nuevo "Acumuladores LEO" por confirmar.
- [[Revision 21-270 - Base Completa]] — validación de los 250 CASE ID restantes; base completa (270/270) cerrada.
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
- [x] CASE ID 1-20 validados y revisados con Ricardo: 18 SI, 2 NO, 0 PENDIENTE
- [x] Carpeta `fotos_aglomeradas/` con foto representativa por negocio (columna `FOTO PRINCIPAL` explícita)
- [x] Columna `BATERIAS VISIBLES EN FOTOS MAPS` agregada
- [ ] Decidir si "Acumuladores LEO" (posible negocio nuevo cerca de CASE ID 20) se agrega a la base
- [x] Pipeline aplicado al resto de la base (250 negocios restantes) — **base completa: 270/270 CASE ID validados**
- [x] Regla de evidencia fotográfica endurecida (2026-09-12): 7 SI sin ninguna foto de respaldo corregidos a NO
- [x] PENDIENTE eliminado como veredicto (2026-09-12): los 22 casos restantes se resolvieron SI/NO. **Conteo final: 214 SI / 56 NO / 0 PENDIENTE**
- [x] Repo compartido en GitHub (`RicardoGFentanes/neoGPSBaterias`)
- [ ] Revisión en equipo de los 24 CASE ID que quedaron en PENDIENTE (ver [[Revision 21-270 - Base Completa]])
