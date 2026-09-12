# Revisión CASE ID 21-270 — Base completa

Cierre de la validación completa de los 270 negocios de `NEGOCIOS_BATERIAS_ARAÑAS.xlsx`. Ver [[Decisiones]] para el registro de decisión.

## Resultado global (270/270)

- **SI: 219**
- **NO: 27**
- **PENDIENTE: 24**

## CASE ID que quedaron en PENDIENTE (para revisión en equipo)

Igual que CASE ID 18/19/20 en el primer lote, estos casos no tienen evidencia suficiente para un veredicto confiable — no se forzó SI ni NO.

| CASE ID | Negocio | Motivo resumido |
|---|---|---|
| 23 | Sanchez Espino Maria Del Rocio | Vista bloqueada por vegetación; sin fachada comercial visible |
| 34 | Baterías Osonix | Coordenadas muestran calle lejana sin negocio identificable |
| 52 | Centro de Servicio LTH Santa Catarina | Ambas tomas bloqueadas por camión/árboles |
| 54 | Carga de Baterías Corte de Placa | Solo barda y portón, sin rótulo |
| 57 | Refaccionaria Super Diesel Carrera | Nombre coincide pero Street View no confirma producto |
| 91 | Energizer Supply Chain México | Solo portón/caseta de vigilancia industrial |
| 171 | Bodega Acumuladores Tauro | Cortina cerrada, sin rótulo; navegador falló al complementar con Maps |
| 176 | Sistemas Inteligentes e Instrumentación Electrónica | Fachada residencial; navegador falló al complementar con Maps |
| 177 | LTH | Rótulo dice "Carga de Baterías" (servicio), no venta clara |
| 180 | Baterías El Oferton Sucursal Tlalpizahuac | Muro con grafiti, sin rótulo; pin posiblemente desplazado a gasolinera vecina |
| 183 | Centro de Servicio Gonher | Street View muestra tienda de materiales de construcción |
| 207 | Acumuladores Guzmán | Local cerrado/en remodelación; navegador falló al complementar |
| 211 | Acumuladores Galgo | Street View muestra abarrotes "ISRADAV"; ficha de Maps sí existe con la dirección |
| 213 | Baterías UVAN Ermita | Street View muestra depósito de cerveza "RAMIREZ" |
| 219 | Baterías Duracell | Street View muestra fachada residencial (mural religioso) |
| 225 | Auto Pro | Street View muestra "LONA IMPRESA" sin relación |
| 228 | Acumuladores "CORA" | Portón cerrado; ficha de Maps sin reseñas ni fotos |
| 231 | Acumuladores-Chamapa | Único par de fotos disponibles no muestra producto ni rótulo |
| 243 | Duracell Av.Mexicas | Street View muestra local de reparación de celulares |
| 249 | Xbatt | Dirección es oficina piso 4; Maps "Cerrado temporalmente", sin fotos |
| 250 | Baterías Conservicioa Domicilio | Dirección "Local B"; Street View muestra muro liso / cafetería vecina |
| 257 | Baterías Trojan México | Solo mural de agradecimiento en la barda, sin local visible |
| 258 | Baterías Durcell | Cortina con grafiti, sin rótulo; navegador falló al complementar |
| 268 | UCCE | Solo letrero pequeño "UCCE" en bodega industrial, sin producto visible |

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
