# Revisión CASE ID 21-270 — Base completa

Cierre de la validación completa de los 270 negocios de `NEGOCIOS_BATERIAS_ARAÑAS.xlsx`. Ver [[Decisiones]] para el registro de decisión.

## Resultado global (270/270)

- **SI: 214**
- **NO: 56**
- **PENDIENTE: 0** — eliminado por instrucción explícita de Ricardo (2026-09-12): "SOLO ES SI O NO CON BASE EN LAS REGLAS QUE YA SE ESTABLECIERON". Los 22 casos que habían quedado en PENDIENTE se resolvieron aplicando estrictamente las reglas ya vigentes (regla del PIN exacto + exigencia de evidencia fotográfica real) sobre la evidencia ya recopilada, sin inventar evidencia nueva. Ver [[Decisiones]] para el detalle de cada resolución.

## Los 22 CASE ID que estaban en PENDIENTE, ahora resueltos

| CASE ID | Negocio | Veredicto final | Motivo |
|---|---|---|---|
| 23 | Sanchez Espino Maria Del Rocio | NO | Vista bloqueada por vegetación; sin fachada comercial visible |
| 34 | Baterías Osonix | SI | (editado a mano por Ricardo en el Excel de revisión) |
| 52 | Centro de Servicio LTH Santa Catarina | NO | Sin ninguna foto que muestre rótulo, logo o producto |
| 54 | Carga de Baterías Corte de Placa | NO | Foto de Maps muestra piezas de bicicleta; reseñas hablan de soldadura, no baterías |
| 57 | Refaccionaria Super Diesel Carrera | NO | Galería completa muestra refaccionaria diesel (aceites/filtros), sin batería ni logo |
| 91 | Energizer Supply Chain México | NO | Centro de distribución/logística, no punto de venta al público |
| 171 | Bodega Acumuladores Tauro | NO | Cortina cerrada, sin rótulo ni logo visible en ninguna foto |
| 176 | Sistemas Inteligentes e Instrumentación Electrónica | NO | Fachada residencial, sin ningún indicio comercial |
| 177 | LTH | **SI** | Logo de marca LTH visible en el mostrador junto a producto Bardahl |
| 180 | Baterías El Oferton Sucursal Tlalpizahuac | NO | Muro residencial con grafiti, sin rótulo ni producto |
| 183 | Centro de Servicio Gonher | NO | Street View muestra tienda de materiales de construcción; ficha de Maps sin fotos propias |
| 207 | Acumuladores Guzmán | NO | Local cerrado/en remodelación, sin rótulo ni producto visible |
| 211 | Acumuladores Galgo | NO | Street View muestra abarrotes "ISRADAV"; solo reseñas de texto sin foto de respaldo |
| 213 | Baterías UVAN Ermita | NO | Street View muestra depósito de cerveza "RAMIREZ"; solo reseñas de texto |
| 219 | Baterías Duracell | NO | Street View muestra fachada residencial (mural religioso) |
| 225 | Auto Pro | NO | Street View muestra "LONA IMPRESA"; reseñas no mencionan baterías |
| 228 | Acumuladores "CORA" | NO | Portón cerrado; ficha de Maps sin reseñas ni fotos |
| 231 | Acumuladores-Chamapa | NO | Únicas 2 fotos disponibles no muestran rótulo, logo ni producto |
| 243 | Duracell Av.Mexicas | NO | Street View muestra local de reparación de celulares (AT&T) |
| 249 | Xbatt | NO | Sin fachada visible; "Cerrado temporalmente"; sin fotos de Maps |
| 250 | Baterías Conservicioa Domicilio | NO | Muro liso / cafetería vecina; sin fotos de Maps |
| 257 | Baterías Trojan México | NO | Solo mural de agradecimiento en la barda, sin local visible |
| 258 | Baterías Durcell | NO | Cortina con grafiti, sin rótulo ni foto de Maps |
| 268 | UCCE | NO | Solo letrero "UCCE" (sin relación textual a baterías), sin producto visible |

Nota: CASE ID 23 y 34 fueron editados directamente por Ricardo en `VALIDACION_NEGOCIOS_BATERIAS.xlsx` (sin comentario) antes de esta resolución — se respetaron esos valores tal cual.

## Casos límite ya resueltos (aceptados como SI vía ficha de Maps con misma dirección/teléfono)

Cuando el Street View del pin exacto no mostraba el negocio pero la ficha de Google Maps de esa MISMA dirección/teléfono sí tenía fotos propias probando el giro (no una ficha vecina distinta), se aceptó como evidencia válida. Ejemplos: CASE ID 131-140 (Baterías Serrauto, Acumuladores Power 3, etc.), 162-163, 191-200 (varios), 211-247 (varios). Ver el detalle completo en la columna `EVIDENCIA` del Excel maestro.

## Posibles duplicados de ubicación (documentados, NO fusionados)

- **CASE ID 2 (Nova Autopartes) / CASE ID 15 (Centro de Servicio Autorizado Gonher)** — cercanos por distancia (haversine), pero nombres de negocio distintos. Se dejaron como fichas independientes.
- **CASE ID 214 (Acumuladores GHR) / CASE ID 260 (Baterías Raquel)** — mismo caso: cercanos físicamente, confirmados por dos agentes distintos como negocios independientes con nombres distintos.

## Nota pendiente de decisión de equipo

- **CASE ID 20 sigue como NO** (regla del PIN exacto). El negocio real "Acumuladores LEO" cercano NO se agregó a la base — requiere pedido explícito de Ricardo/equipo para añadirse como candidato nuevo.

## Archivos relacionados

- `NEGOCIOS_BATERIAS_ARAÑAS.xlsx` (maestro, 270 filas completas)
- `VALIDACION_NEGOCIOS_BATERIAS.xlsx` (revisión, regenerado)
- `fotos_aglomeradas/` (270 fotos representativas)
- `data/resultados_lote_*.json` (payloads crudos de cada lote de 10)
