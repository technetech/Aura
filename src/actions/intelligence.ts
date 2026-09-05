"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { generateInsights } from "@/services/llm";
import { scrapeWithJina } from "@/services/scrapers";

const prisma = new PrismaClient();

export async function generateCompanyProfile(clientId: string) {
  try {
    const client = await prisma.account.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return { success: false, error: "Cliente no encontrado" };
    }

    // 1. EXTRAER SITIO WEB CON JINA AI
    let websiteData = "";
    if (client.url) {
      websiteData = await scrapeWithJina(client.url);
    }

    // 2. Armamos el prompt para la API de Nvidia NIM inyectando la Data Real
    const prompt = `Analiza a la siguiente empresa como un estratega de negocios experto.
    
Información base:
- URL: ${client.url}
- Industria: ${client.industry || "No especificada"}
- Cliente Objetivo: ${client.targetCustomer || "No especificado"}

CONTENIDO EXTRAÍDO DE SU SITIO WEB:
"""
${websiteData ? websiteData.substring(0, 5000) : "No se pudo extraer contenido del sitio."}
"""

Genera un Battlecard en formato JSON ESTRICTO sobre esta empresa. El JSON debe tener esta estructura exacta, y NADA MÁS. Asegúrate de cerrar bien las llaves y corchetes:

{
  "resumen_ejecutivo": "Texto breve",
  "fortalezas": ["Punto 1", "Punto 2"],
  "debilidades": ["Punto 1", "Punto 2"],
  "pricing_actual": {
    "detalle": "Explicación",
    "cambio_vs_periodo_anterior": "Explicación"
  },
  "mensaje_central_marketing": "Texto",
  "movimientos_recientes": ["Movimiento 1", "Movimiento 2"],
  "como_competir": ["Estrategia 1", "Estrategia 2"]
}

IMPORTANTE: Responde ÚNICAMENTE con el objeto JSON válido. No uses bloques de código (ni \`\`\`json). Solo el { ... }. Todo debe estar correctamente formateado en JSON.`;

    // Llamada real al LLM
    const responseString = await generateInsights(prompt, false);
    
    // Limpieza agresiva por si el LLM devuelve markdown tags
    let cleanJson = responseString.replace(/```json/gi, "").replace(/```/g, "").trim();
    if (cleanJson.startsWith("`")) cleanJson = cleanJson.substring(1);
    if (cleanJson.endsWith("`")) cleanJson = cleanJson.substring(0, cleanJson.length - 1);

    let parsedData;
    try {
      parsedData = JSON.parse(cleanJson);
    } catch (parseError: any) {
      console.error("Error parseando JSON de Nvidia:", cleanJson);
      return { success: false, error: "La IA no devolvió un JSON válido. Reintenta." };
    }

    // Guardamos el resultado en la nueva tabla Insights
    await prisma.insight.create({
      data: {
        accountId: clientId,
        framework: 'battlecard',
        scope: 'own_company',
        periodStart: new Date(),
        periodEnd: new Date(),
        payload: parsedData,
        narrative: parsedData.resumen_ejecutivo || "Análisis base completado."
      }
    });
    
    // También actualizamos el campo viejo por si acaso
    await prisma.account.update({
      where: { id: clientId },
      data: { companyProfile: parsedData.resumen_ejecutivo },
    });

    revalidatePath(`/clients/${clientId}/intelligence`);

    return { success: true };
  } catch (error: any) {
    console.error("Error al generar perfil:", error);
    return { success: false, error: error.message };
  }
}

export async function generateBrandCore(clientId: string) {
  try {
    const client = await prisma.account.findUnique({
      where: { id: clientId },
    });

    if (!client || !client.url) return { success: false, error: "Cliente sin URL válida" };

    // 1. Extraer web con Jina
    const websiteData = await scrapeWithJina(client.url);

    // 2. Prompt para estructurar el Brand Core en JSON
    const prompt = `Actúa como un Director de Estrategia de Marca (Chief Brand Officer).
Basado en el contenido del sitio web del cliente, define su "Brand Core" (Identidad Central).
    
SITIO WEB:
"""
${websiteData}
"""

Debes deducir y crear lo siguiente:
- purpose: El propósito superior de la marca (Por qué existen más allá de ganar dinero).
- mission: La misión operativa.
- vision: La visión a futuro.
- values: 3 o 4 valores fundamentales separados por comas.
- personality: Descripción de su personalidad (Ej. Innovador, rebelde, sabio) y su tono.
- positioning: Una frase de posicionamiento en el mercado.

RESPONDE ÚNICAMENTE CON UN OBJETO JSON VÁLIDO. No agregues comillas invertidas ni explicaciones.
Formato estricto:
{
  "purpose": "texto",
  "mission": "texto",
  "vision": "texto",
  "values": "texto",
  "personality": "texto",
  "positioning": "texto"
}`;

    const jsonString = await generateInsights(prompt, false); // Supongamos que soporta JSON
    // Limpiar posibles bloques markdown del LLM
    const cleanJsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(cleanJsonString);

    await prisma.brandCore.upsert({
      where: { accountId: client.id },
      update: {
        purpose: data.purpose,
        mission: data.mission,
        vision: data.vision,
        values: data.values,
        personality: data.personality,
        positioning: data.positioning,
      },
      create: {
        accountId: client.id,
        purpose: data.purpose,
        mission: data.mission,
        vision: data.vision,
        values: data.values,
        personality: data.personality,
        positioning: data.positioning,
      }
    });

    revalidatePath(`/clients/${clientId}/aura`);
    return { success: true };
  } catch (error) {
    console.error("Error generating Brand Core:", error);
    return { success: false, error: "Error en la generación" };
  }
}

export async function generateCustomerIntelligence(clientId: string) {
  try {
    const client = await prisma.account.findUnique({ where: { id: clientId } });
    if (!client) return { success: false, error: "No encontrado" };

    // Simulación de llamada a Apify (o extracción real si tuviéramos un Actor ID específico de G2)
    // Para MVP, pasamos la industria y los competidores conocidos a Nvidia para extraer insights de usuario
    const prompt = `Actúa como Analista de Voz del Cliente (CX).
Industria: ${client.industry}
Target: ${client.targetCustomer}
Competidores: ${client.knownCompetitors}

Genera un análisis profundo de los clientes de esta industria. Devuelve un JSON VÁLIDO con esta estructura:
{
  "painPoints": ["Punto de dolor 1 (largo)", "Punto 2", "Punto 3"],
  "purchaseDrivers": ["Motivador 1", "Motivador 2", "Motivador 3"],
  "buyerPersona": "Descripción profunda de quién es el comprador ideal, sus miedos y deseos"
}`;

    let jsonString = await generateInsights(prompt, false);
    jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();

    await prisma.account.update({
      where: { id: clientId },
      data: { customerAnalysis: jsonString }
    });

    revalidatePath(`/clients/${clientId}/customers`);
    return { success: true };
  } catch (error: any) {
    console.error("Error en Customer Analyst:", error);
    return { success: false, error: error.message || "Error desconocido" };
  }
}

export async function generateCompetitorIntelligence(clientId: string) {
  try {
    const client = await prisma.account.findUnique({ where: { id: clientId } });
    if (!client) return { success: false, error: "Cliente no encontrado" };

    // Extraer web principal si existe para comparar
    let web = "";
    if (client.url) web = await scrapeWithJina(client.url);

    const prompt = `Actúa como Analista de Competencia.
Nuestro Cliente: ${client.name} (${client.industry})
Competidores detectados: ${client.knownCompetitors}
Web del cliente: ${web ? web.substring(0, 1000) : 'N/A'}

Genera inteligencia competitiva. Devuelve un JSON VÁLIDO:
{
  "topCompetitors": [
    {"name": "Comp 1", "overlap": 75, "type": "Directo"},
    {"name": "Comp 2", "overlap": 45, "type": "Indirecto"}
  ],
  "priceModels": ["Modelo 1", "Modelo 2"],
  "gaps": ["Brecha 1", "Brecha 2"],
  "threats": ["Amenaza 1", "Amenaza 2"]
}`;

    let jsonString = await generateInsights(prompt, false);
    jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();

    await prisma.account.update({
      where: { id: clientId },
      data: { competitorAnalysis: jsonString }
    });

    revalidatePath(`/clients/${clientId}/competitors`);
    return { success: true };
  } catch (error: any) {
    console.error("Error en Competitor Analyst:", error);
    return { success: false, error: error.message || "Error desconocido" };
  }
}

export async function generateMarketIntelligence(clientId: string) {
  try {
    const client = await prisma.account.findUnique({ where: { id: clientId } });
    if (!client) return { success: false, error: "Cliente no encontrado" };

    const prompt = `Actúa como Analista de Mercado.
Industria: ${client.industry}

Calcula métricas de mercado. Devuelve un JSON VÁLIDO:
{
  "trends": ["Tendencia al alza en X", "Pico estacional en Y"],
  "marketSize": {"tam": "Tamaño Total", "sam": "Mercado Servible", "som": "Mercado Obtenible"},
  "porter": ["Poder de clientes: Alto", "Riesgo de sustitutos: Medio"]
}`;

    let jsonString = await generateInsights(prompt, false);
    jsonString = jsonString.replace(/```json/g, '').replace(/```/g, '').trim();

    await prisma.account.update({
      where: { id: clientId },
      data: { marketAnalysis: jsonString }
    });

    revalidatePath(`/clients/${clientId}/market`);
    return { success: true };
  } catch (error: any) {
    console.error("Error en Market Analyst:", error);
    return { success: false, error: error.message || "Error desconocido" };
  }
}
