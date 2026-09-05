import { generateInsights } from "./llm";
import { searchWithGoogle, scrapeWithFirecrawl, scrapeWithJina, scrapeWithApify } from "./scrapers";
import { DataCategory, FrameworkType } from "../types/intelligence";

/**
 * Pipeline de Extracción de Datos
 * Orden: Barato -> Caro, Amplio -> Específico
 * 1. Discovery (Google Search API)
 * 2. Mapeo del sitio (Firecrawl)
 * 3. Lectura selectiva (Jina Reader)
 * 4. Extracción especializada (Apify)
 */
export async function runDataCollectionPipeline(accountId: string) {
  console.log(`Iniciando pipeline de colección para la cuenta: ${accountId}`);
  
  // TODO: Leer de la tabla refresh_schedule para saber qué toca correr hoy
  
  // 1. Discovery: Encontrar competidores si no se dieron, sus dominios, perfiles
  console.log("-> Paso 1: Discovery (Google Search)");
  // const competidores = await searchWithGoogle("Top competitors for [Client Industry]");

  // 2. Mapeo: Obtener estructura completa de los competidores detectados
  console.log("-> Paso 2: Mapeo del sitio (Firecrawl)");
  // const structure = await scrapeWithFirecrawl(competidor.websiteUrl, "map");

  // 3. Lectura Selectiva: Artículos de prensa, blogs
  console.log("-> Paso 3: Lectura selectiva (Jina Reader)");
  // const articleMarkdown = await scrapeWithJina(articleUrl);

  // 4. Extracción Especializada: Ads, Reviews, Jobs (Solo lo filtrado)
  console.log("-> Paso 4: Extracción especializada (Apify)");
  // const ads = await scrapeWithApify("apify/meta-ads-scraper", { ... });

  // NOTA: Después de cada llamada, se debería comparar el `contentHash` 
  // con el último `RawSnapshot`. Si cambia, insertar `RawSnapshot` y crear `Delta`.
}


/**
 * Pipeline de Síntesis (Generación de Insights usando LLM)
 * Utiliza los deltas y snapshots para generar los frameworks definidos.
 */
export async function generateFrameworkInsight(accountId: string, framework: FrameworkType, periodStart: Date, periodEnd: Date) {
  console.log(`Generando framework: ${framework} para la cuenta: ${accountId}`);

  // En producción, aquí se traen los RawSnapshots y Deltas de la base de datos
  const mockDeltas = {}; 

  let systemPrompt = "";
  let userPrompt = `Periodo: ${periodStart.toISOString()} - ${periodEnd.toISOString()}\nDatos: ${JSON.stringify(mockDeltas)}`;

  switch (framework) {
    case "battlecard":
      systemPrompt = `Eres un analista senior de inteligencia competitiva. Recibirás datos crudos
sobre un competidor (sitio web, pricing, redes sociales, reviews, vacantes,
menciones de prensa) de las últimas semanas. Genera un battlecard en JSON...`;
      break;
    case "positioning_map":
      systemPrompt = `Ubica a la empresa del usuario y hasta 5 competidores en un mapa de
posicionamiento. Los ejes por defecto son "precio" y "amplitud de producto"...`;
      break;
    case "sov_composite":
      systemPrompt = `Calcula un índice de Share of Voice ponderado (0-100 por competidor)
combinando señales: orgánico, pagado, social...`;
      break;
    case "sentiment_trend":
      systemPrompt = `Recibirás reviews y comentarios. No reportes solo el promedio:
calcula la TENDENCIA (mejorando/empeorando) y el tema principal del cambio...`;
      break;
    case "momentum_score":
      systemPrompt = `Calcula un "momentum score" (0-100) que combine variación en
vacantes, ads activos, cambios de pricing, y menciones de prensa...`;
      break;
    case "voc_clusters":
      systemPrompt = `Agrupa comentarios, reviews y menciones en 4-7 clusters temáticos (Jobs-To-Be-Done)...`;
      break;
  }

  // const result = await generateInsights(`${systemPrompt}\n\n${userPrompt}`, true);
  // Guardar en tabla Insights
  // return result;
}
