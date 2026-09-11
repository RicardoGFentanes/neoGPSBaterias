# Revisión de los primeros 10 CASE ID

Resultado del pipeline (Street View + foto de Maps cuando Street View no fue concluyente) sobre los primeros 10 negocios, antes de correrlo sobre los 270. Detalle completo en `data/resultados_lote_1_10.json`.

| CASE ID | Negocio | Vende Baterías | Evidencia | ¿Ajustar criterio? |
|---|---|---|---|---|
| 1 | Acumuladores Neza Límited | SI | Letrero coincide, "COMPRAMOS BATERIAS USADAS", logos LTH/América/Optima, mostrador con baterías | |
| 2 | Nova Autopartes | SI | Street View bloqueado por árboles; foto de Maps confirma "CENTRO DE SERVICIO BATERIAS GONHER" + mostrador | |
| 3 | Raly Acumuladores | SI | Torre publicitaria con LTH/América/Full Power/Gonher, mostrador visible | |
| 4 | Acumuladores Neza Limited Parque | SI | Letrero coincide, logos LTH/América, aparador pequeño | |
| 5 | Energycentro | SI | Letrero coincide, logos LTH/América. No se ve mostrador (cortina cerrada) | |
| 6 | Venta De Baterias Para Auto | **PENDIENTE** | Fachada es taller de cerrajería/reparación de puertas, no tienda de baterías. Hay un posible cargador y una batería aislada pero sin anuncio ni mostrador claro | **Sí — revisar con Ricardo** |
| 7 | Acumuladores Miranda (suc. 1) | SI | Street View ambiguo; foto de Maps confirma "ESPECIALISTAS EN BATERIAS", rack de baterías, logo LTH | |
| 8 | Acumuladores Miranda (suc. 2) | SI | Street View bloqueado por camión; foto de Maps muestra gran anaquel de baterías, banner LTH | |
| 9 | Acumuladores Nezahualcoyotl | SI | Street View con cortina cerrada; foto de Maps confirma letrero "BATERIAS" + anaquel con baterías | |
| 10 | Baterias para Autos "Samar" | SI | Letrero con ilustración de batería, logos Duracell/LTH/Optima | |

## Notas de la revisión

- **9/10 confirmados como SI**, 1 en PENDIENTE (CASE ID 6).
- **Patrón útil**: cuando Street View no es concluyente (árboles, camiones, cortina cerrada), la foto subida por el propietario en Google Maps casi siempre resuelve la duda — se automatizó como paso 2 del flujo.
- **Marca "Pro One"** aparece repetida en varios negocios (Nova Autopartes, Raly Acumuladores) junto a marcas de batería — parece ser una franquicia/red de refaccionarias, no una marca de batería. No se contó en `MARCAS LOGOS DETECTADOS`.
- Posible error de lectura: en CASE ID 3 el logo podría decir "GONHER" y no "CONHER" (muy fácil de confundir en la foto) — se registró como GONHER, que sí está en `marcas_bat.xlsx`.
- **Pendiente de decidir con Ricardo**: ¿CASE ID 6 se marca como NO, o se investiga más (reseñas, visita) antes de descartarlo?
- Si el criterio general se aprueba, el siguiente paso es correr el mismo pipeline sobre los 260 negocios restantes.
