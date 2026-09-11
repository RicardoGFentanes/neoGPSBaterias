export const meta = {
  name: 'validar-lote-completo-21-270',
  description: 'Valida masivamente CASE ID 21-270 contra Street View/Maps, en paralelo por lotes de 10',
  phases: [{ title: 'Validar', detail: 'un agente por lote de 10 negocios, con investigacion en Maps cuando la foto no alcance' }],
}

const RESULT_SCHEMA = {
  type: 'object',
  properties: {
    results: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          case_id: { type: 'integer' },
          nombre_fachada: { type: 'string' },
          marcas: { type: 'string' },
          mostrador: { type: 'string', enum: ['SI', 'NO'] },
          baterias_fotos_maps: { type: 'string' },
          evidencia: { type: 'string' },
          vende_baterias: { type: 'string', enum: ['SI', 'NO', 'PENDIENTE'] },
          fotos: { type: 'string' },
          foto_principal: { type: 'string' },
          validado_por: { type: 'string' },
        },
        required: ['case_id', 'evidencia', 'vende_baterias', 'fotos', 'foto_principal', 'validado_por'],
      },
    },
  },
  required: ['results'],
}

function buildPrompt(start, end) {
  return `Eres un agente de validacion del proyecto bateriasNeoGPS (negocios de baterias para auto en Nezahualcoyotl y zona metropolitana, Mexico). Trabajas en la carpeta C:\\Users\\AUTOMATION\\bateriasNeoGPS -- usa esa ruta absoluta (o cd ahi) en cada comando de Bash.

TU TAREA: determinar si CADA negocio con CASE ID entre ${start} y ${end} (inclusive, ${end - start + 1} negocios) REALMENTE vende baterias para automovil, usando evidencia real de fotos de Street View y de Google Maps. NO escribas nada al Excel tu mismo -- solo REGRESA los resultados en el JSON pedido al final; otro proceso los escribe.

## Paso 1 -- obten los datos de tus negocios

Corre esto en Bash (ya tiene tu rango puesto):

python -c "
import openpyxl, json
wb = openpyxl.load_workbook(r'NEGOCIOS_BATERIAS_ARAÑAS.xlsx', data_only=True)
ws = wb['ar_neg']
headers = [c.value for c in ws[1]]
col = {h:i+1 for i,h in enumerate(headers)}
data = []
for row in range(2, ws.max_row+1):
    cid = ws.cell(row=row, column=col['CASE ID']).value
    if cid is not None and ${start} <= cid <= ${end}:
        data.append({'case_id': int(cid), 'nombre': ws.cell(row=row, column=col['NOMBRE NEGOCIO LIMPIO']).value, 'direccion': ws.cell(row=row, column=col['DIRECCION LIMPIA']).value, 'lat': ws.cell(row=row, column=col['LAT']).value, 'long': ws.cell(row=row, column=col['LONG']).value, 'link': ws.cell(row=row, column=col['LINK']).value})
print(json.dumps(data, ensure_ascii=False, indent=1))
"

Esto te da nombre limpio, direccion limpia, coordenadas y el link de Maps de cada negocio de tu lote. Procesa los ${end - start + 1}, sin saltarte ninguno.

## Paso 2 -- para CADA negocio de tu lote

1. Busca su carpeta de fotos: \`fotos/<CASE_ID con 3 digitos>_<slug>/\` (ej. CASE ID 45 -> \`fotos/045_algo/\`; usa \`ls fotos/ | grep "^045_"\` o Glob para encontrarla). Ya deberia tener \`streetview_1.jpg\` (zoom, fov=50) y \`streetview_2.jpg\` (contexto, fov=90). Si en vez de eso hay un archivo \`SIN_STREETVIEW.txt\`, no hay Street View disponible -- investiga solo con el \`link\` de Maps (paso 3).

2. Lee (Read) AMBAS fotos streetview_1.jpg y streetview_2.jpg. El heading automatico de la Static API NO es estable entre llamadas (se recalcula cada vez) -- no asumas que el zoom siempre es mejor, compara las dos. Busca evidencia de: nombre del negocio en la fachada, logos de marca de bateria, baterias fisicas visibles (mostrador/anaquel/producto).

3. Si NINGUNA de las dos fotos da evidencia clara (bloqueada, mal encuadrada, cortina cerrada, fachada equivocada, o no hay Street View), investiga en el navegador abriendo el \`link\` de Maps de ese negocio. Primero carga las herramientas con \`ToolSearch\` (query: "select:mcp__Claude_Browser__navigate,mcp__Claude_Browser__computer,mcp__Claude_Browser__javascript_tool,mcp__Claude_Browser__get_page_text,mcp__Claude_Browser__find"). Luego:
   a. Haz click en la foto principal para abrir la galeria y **revisa TODAS las fotos disponibles** (pestañas "Todo"/"Interior"/"Del propietario"/"Street View y 360°"), no solo la primera miniatura -- muchas veces la miniatura por defecto no sirve pero otra foto de la misma galeria si muestra el anaquel de baterias con claridad.
   b. Si encuentras una foto mejor que las dos que ya tienes, descargala a resolucion completa: usa \`javascript_tool\` para sacar el \`src\` de la imagen grande mostrada (un \`<img>\` con dominio \`googleusercontent.com/gps-cs-s/...\`), cambia el sufijo de tamaño (algo como \`=w203-h152-k-no\`) por \`=w1200-h900-k-no\`, y descargala con Bash (\`python -c "import requests; r=requests.get(URL); open('fotos/<CASE_ID>_<slug>/maps_foto_N.jpg','wb').write(r.content)"\`) -- usa el siguiente numero N disponible en esa carpeta.
   c. Lee el texto de las reseñas (pestaña "Opiniones", o \`get_page_text\` de la pagina) -- pueden confirmar o negar la venta de baterias aunque no haya ninguna foto util (ej. una reseña que diga "no sirven sus baterias" o que hable del precio de sus baterias SI cuenta como evidencia de que las venden).
   d. Anota si el negocio aparece **"Cerrado temporalmente"** o **"Cerrado permanentemente"** en Maps.

## Reglas de decision (ya validadas con el cliente del proyecto -- no te las saltes)

- **Regla de oro, no inventar nada**: solo reporta lo que puedas confirmar con evidencia real (foto legible, reseña, texto de la ficha de Maps). Si la evidencia es insuficiente o ambigua, usa \`vende_baterias="PENDIENTE"\` y explica en \`evidencia\` exactamente que falta. Nunca fuerces un SI o un NO por probabilidad, parecido, o "seguramente es asi".
- **Regla del PIN exacto (critica)**: si el Street View en las coordenadas EXACTAS (lat/long dados) no muestra el nombre del negocio en la fachada, clasifica **NO** -- aunque haya otro negocio de baterias distinto cerca. No le acredites a esta ficha la evidencia de un negocio DISTINTO (el pin de Maps puede estar mal puesto, pero eso no vuelve al vecino "el mismo negocio"). Si notas un negocio de baterias real cerca pero con nombre distinto al registrado, mencionalo en \`evidencia\` como dato aparte -- el veredicto de ESTA ficha depende solo de si el nombre coincide en el sitio exacto.
- **"Cerrado temporalmente" en Maps NO descalifica automaticamente** -- evalua la evidencia de venta de baterias igual que cualquier otro caso; solo anota el estatus en la evidencia.
- **\`marcas_bat.xlsx\` NO se usa para nada aqui** (es de otro proceso interno del cliente, no relacionado).
- No cuentan anuncios/publicidad generica como "marca detectada" -- solo logos de marca reales o baterias fisicas visibles.
- **La \`foto_principal\` de un negocio SI debe probar VISUALMENTE que vende baterias** (baterias o logos de marca visibles) -- no una foto que solo muestre la calle o el contexto sin relacion. Si genuinamente no existe ninguna foto que lo pruebe (ya revisaste todo Street View y toda la galeria de Maps), usa la mejor disponible de todos modos y deja constancia explicita empezando con "LIMITACION: " en \`evidencia\`.
- Si el \`NOMBRE NEGOCIO\` no coincide exactamente con lo visto en la fachada pero el giro y la ubicacion si corresponden razonablemente, prioriza la evidencia visual sobre el nombre registrado (anotalo en evidencia).

## Para cada negocio, reporta

- \`case_id\`: numero.
- \`nombre_fachada\`: nombre legible en la fachada, si lo hay (vacio si no se ve).
- \`marcas\`: marcas/logos de bateria reales vistos, separadas por coma (vacio si ninguna).
- \`mostrador\`: "SI" o "NO" -- si hay mostrador/anaquel con baterias fisicas visibles.
- \`baterias_fotos_maps\`: descripcion de que baterias se ven especificamente en las fotos (cantidad/color/marca si se distingue); si no se ve ninguna, dilo explicitamente ("No se aprecian baterias en la foto disponible...").
- \`evidencia\`: 1-3 frases explicando exactamente que se vio y por que se concluyo el veredicto. Usa "LIMITACION: " al inicio si aplica (ver reglas arriba).
- \`vende_baterias\`: "SI" / "NO" / "PENDIENTE".
- \`fotos\`: nombres de archivo usados como evidencia, separados por coma (ej. "streetview_1.jpg, maps_foto_1.jpg").
- \`foto_principal\`: el nombre de archivo (de los listados en \`fotos\`) que MEJOR prueba el veredicto.
- \`validado_por\`: "Claude (workflow)".

Regresa un JSON con la lista COMPLETA de resultados (uno por cada CASE ID de tu rango, sin saltarte ninguno) en el campo \`results\`.`
}

const results = []
for (let start = 21; start <= 270; start += 10) {
  results.push([start, Math.min(start + 9, 270)])
}

const batchResults = await parallel(
  results.map(([start, end]) => () =>
    agent(buildPrompt(start, end), { label: `lote-${start}-${end}`, phase: 'Validar', schema: RESULT_SCHEMA })
  )
)

const flat = batchResults.filter(Boolean).flatMap((r) => r.results || [])
const missingBatches = results.filter((_, i) => !batchResults[i]).map(([s, e]) => `${s}-${e}`)

return { total: flat.length, results: flat, missingBatches }
