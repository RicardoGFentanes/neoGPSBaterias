# Decisiones del proyecto

Bitácora de decisiones de diseño del pipeline. Cada entrada: fecha, decisión, por qué.

## 2026-09-12 — Se elimina PENDIENTE: todo caso se resuelve SI o NO

- **Ricardo instruyó explícitamente**: "VEO QUE HAY VARIOS PENDIENTES, ELIMINA ESA OPCION, SOLO ES SI O NO CON BASE EN LAS REGLAS QUE YA SE ESTABLECIERON" — ya no existe un tercer estado; cada CASE ID debe resolverse a SI o NO aplicando las reglas ya vigentes (regla del PIN exacto, evidencia fotográfica real, "Cerrado temporalmente" no descalifica por sí solo) sobre la evidencia YA recopilada, sin salir a buscar evidencia nueva ni inventar nada.
- **Se resolvieron los 22 CASE ID que quedaban en PENDIENTE**: 21 a NO (sin ninguna evidencia fotográfica real de venta de baterías — ni nombre, ni logo, ni producto, ni foto de Maps que lo respalde) y 1 a SI (CASE ID 177 "LTH": logo de marca LTH visible en el mostrador junto a producto Bardahl, aunque no se distingan unidades físicas con nitidez). Detalle completo en [[Revision 21-270 - Base Completa]].
- **Conteo final: 214 SI / 56 NO / 0 PENDIENTE** (270/270 resueltos).
- **PENDIENTE deja de ser un veredicto válido en este proyecto** de aquí en adelante — cualquier validación futura (negocios nuevos que se agreguen a la base) debe resolverse a SI/NO con las mismas reglas, no dejarse abierta.

## 2026-09-12 — Regla más estricta: el veredicto SI exige evidencia FOTOGRÁFICA, no solo texto

- **Ricardo instruyó explícitamente**: "LAS QUE DICEN SI VENDE BATERIA... SI DE PLANO NO HAY NADA QUE EVIDENCIE QUE VENDE BATERIAS EN LAS FOTOS CAMBIALO A NO", y aclaró el matiz: "O EN LA FACHADA SE VE CERRADO, PERO HAY MARCA DE BATERIA ENTONCES SI VENDE" — es decir, una cortina cerrada NO descalifica si hay un logo/marca de batería visible en la foto; lo que sí descalifica es que NO haya absolutamente ninguna evidencia visual (ni nombre en fachada, ni logo/marca, ni producto en mostrador, ni foto de Maps) y el veredicto se sostenga solo en reseñas de texto, categoría de Maps, o "mismo teléfono/domicilio" sin ninguna foto de respaldo.
- **Esto reemplaza la regla anterior** ("si no hay foto pero sí evidencia en reseñas de texto, cuenta como confirmación", aplicada a CASE ID 11 y 12 en el lote 11-20) — las reseñas de texto YA NO son suficientes por sí solas para un veredicto SI.
- **Se revisaron los 219 SI existentes y se identificaron 7 casos sin ninguna evidencia fotográfica real**, corregidos a NO: CASE ID **11** (Baterías "El Güero"), **73** (Baterias SR Santiago Apostol), **76** (Acomuladores Gutiérrez), **122** (Acumuladores Insurgentes), **134** (Acumuladores Nascar — el rótulo visible decía "Daytona", no coincide y sin marca de respaldo), **147** (Baterías de gel Bolaños), **184** (bateriasadomicilio24hrs.com.mx).
- **Casos revisados y confirmados que SÍ tienen evidencia fotográfica real (se quedan en SI)**: CASE ID 39 (foto de batería física Duralast + material promocional de marca), CASE ID 187 (rótulo "DISTRIBUIDOR LTH" + batería LTH pintada + vitrina de producto, junto al pin exacto aunque el nombre no coincida), y todos los casos donde el nombre de fachada coincide (aunque no haya foto de producto) o donde una ficha de Maps de la MISMA dirección/teléfono (no una ficha vecina distinta) sí tiene fotos propias de producto.
- **Conteo actualizado tras esta corrección: 213 SI / 35 NO / 22 PENDIENTE** (antes: 219 SI / 27 NO / 24 PENDIENTE).
- Nota: durante esta corrección se detectó que el Excel de revisión ya tenía ediciones manuales sin comentario en CASE ID 23 (→ NO) y CASE ID 34 (→ SI) — se sincronizaron al maestro como corresponde (edición humana en el archivo de revisión siempre gana), asumiendo que son decisiones de Ricardo tomadas directamente en el Excel.

## 2026-09-12 — Base completa: 270/270 CASE ID validados

- **Ricardo pidió terminar la base completa** ("termina la base (250 caseids)") tras el cierre de CASE ID 1-20. Se validaron los 250 CASE ID restantes (21-270) en lotes de 10, usando el mismo criterio ya acordado con Ricardo (regla del PIN exacto, "Cerrado temporalmente" no descalifica, revisar galería completa de Maps, no inventar nada).
- **Resultado final: 219 SI / 27 NO / 24 PENDIENTE** sobre 270 fichas.
- **24 casos quedaron en PENDIENTE** por evidencia genuinamente insuficiente (Street View bloqueado por vehículos/vegetación/portones cerrados, sin fotos adicionales en Maps, o mismatch de nombre en el pin sin resolver) — ver detalle en [[Revision 21-270 - Base Completa]]. Igual que con CASE ID 18/19/20, estos quedan para revisión en equipo, no se forzó un veredicto.
- **Se reafirmó la regla del PIN exacto en varios casos límite** (p.ej. CASE ID 133-140, 162-163, 191-200, 211-247): cuando el Street View del pin exacto no mostraba el negocio pero la ficha de Maps con la MISMA dirección/teléfono sí tenía fotos propias que probaban el giro, se aceptó esa evidencia (es la ficha correcta, solo que el Street View por defecto capturó el vecino) — a diferencia de "pedir prestada" evidencia de una ficha de Maps distinta (que sigue prohibido, ver regla de CASE ID 20 abajo).
- **Posibles duplicados de ubicación (distancia por haversine) detectados y documentados, no fusionados**: CASE ID 2/15 y CASE ID 214/260 están muy cerca físicamente pero corresponden a nombres de negocio distintos en el Excel — se dejaron como fichas independientes con nota cruzada, sin combinarlas ni eliminar ninguna sin instrucción explícita.
- **Contención del navegador entre agentes concurrentes**: al correr muchos lotes en paralelo, el panel de Maps compartido a veces mostraba la ficha de OTRO negocio que un agente distinto estaba visitando al mismo tiempo. Cada agente verificaba nombre/dirección contra el Excel antes de confiar en el contenido, y tras 2-3 reintentos fallidos se documentaba como `LIMITACION` (solo evidencia de Street View) en vez de insistir indefinidamente.
- Se regeneró `VALIDACION_NEGOCIOS_BATERIAS.xlsx` y `fotos_aglomeradas/` (270 fotos) para reflejar la base completa; commit y push final a `RicardoGFentanes/neoGPSBaterias`.

## 2026-09-11 — La foto principal debe probar visualmente la venta de baterías

- **Ricardo pidió que la foto del aglomerado siempre pruebe visualmente que el negocio vende baterías** — señaló específicamente que `19_Venta_De_Baterias_De_Carros.jpg` (antes: Street View de una gasolinera) no servía como prueba.
- **Causa raíz**: en varios casos solo se había revisado la PRIMERA miniatura de la galería de fotos de Maps, sin abrir "Ver fotos"/"Ver más fotos" para revisar el resto. Al revisar la galería completa se encontraron fotos mucho mejores para CASE ID 5, 10, 19 (anaqueles con baterías, marcas legibles) que ya reemplazaron a las anteriores en `FOTO PRINCIPAL`.
- **Cuando genuinamente no existe ninguna foto que pruebe la venta** (CASE ID 11 y 18 — solo hay 1 foto de Street View en toda la ficha de Maps, sin galería adicional), se documentó explícitamente como `LIMITACION` en `EVIDENCIA` en vez de forzar o simular una prueba visual que no existe. El veredicto SI en esos dos casos sigue apoyado en otra evidencia (reseñas de texto para 11, letrero parcialmente legible para 18), no en la foto.
- Regla agregada a la skill: revisar SIEMPRE la galería completa de Maps antes de conformarse con la miniatura por defecto.

## 2026-09-11 — Regla de precisión del PIN + resolución final 18/19/20

- **Regla clave de precisión (aplica a toda la base, "no inventar nada"): si el Street View en las coordenadas exactas del negocio NO muestra el nombre registrado en la fachada, se clasifica NO — aunque haya otros negocios de baterías cerca.** No se debe acreditar evidencia de un negocio DISTINTO (aunque esté a unos metros) a la ficha que se está validando; el pin de Maps puede estar mal puesto, pero eso no convierte automáticamente al vecino en "el mismo negocio". Ricardo aplicó esto en CASE ID 20 (NO, a pesar de que cerca hay un negocio real de baterías, "Acumuladores LEO" — ese es un hallazgo aparte, no evidencia para CASE ID 20).
- **CASE ID 18 → SI** (revertido de PENDIENTE): Ricardo confirmó que sí se alcanza a apreciar la marca de batería en el letrero pese al grafiti — sí cuenta como evidencia suficiente.
- **CASE ID 20 → NO** (revertido de PENDIENTE): no cumple el nombre en el pin exacto (ver regla de arriba).
- **"Cerrado temporalmente" en Maps NO descalifica automáticamente.** Ricardo aprobó CASE ID 19 como SI a pesar de ese estatus, porque la evidencia (reseñas) cumplía los requisitos del equipo. Regla final: evaluar la evidencia de que el negocio vendía/vende baterías igual que cualquier otro caso; el estatus "Cerrado temporalmente" se anota pero no decide el veredicto por sí solo.
- **PENDIENTE sigue siendo un estado final válido** para "revisión en conjunto con el equipo" cuando la evidencia es genuinamente insuficiente para decidir con confianza (no se debe forzar SI/NO sin evidencia real, ver instrucción explícita de Ricardo de "no inventar nada").
- **"Acumuladores LEO"** (Av. Pantitlán 155, cerca de CASE ID 20) queda documentado como un negocio real que vende baterías, pero NO se agrega a la base — Ricardo no lo pidió y el caso 20 se resolvió como NO por su cuenta. Si se quiere agregar como candidato nuevo en el futuro, debe pedirse explícitamente.
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
