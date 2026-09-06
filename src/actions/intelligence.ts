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

    const prompt = `Actúa como Analista de Voz del Cliente (CX).
Industria: ${client.industry || "No especificada"}
Target: ${client.targetCustomer || "No especificado"}
Competidores: ${client.knownCompetitors || "Ninguno"}

Genera un análisis profundo de los clientes de esta industria basado en Voice of Customer (VoC) y Jobs-To-Be-Done (JTBD).
Devuelve un JSON ESTRICTO con esta estructura exacta y NADA MÁS. Asegúrate de cerrar bien las llaves y corchetes:

{
  "clusters": [
    {
      "nombre": "Nombre del segmento o necesidad (ej. Integración Rápida)",
      "frecuencia_pct": 40,
      "atendido_por": "nadie | nosotros | nombre_competidor | todos",
      "oportunidad": "Cómo podemos capitalizar esta necesidad"
    }
  ]
}

IMPORTANTE: Responde ÚNICAMENTE con el objeto JSON válido. No uses bloques de código (ni \`\`\`json).`;

    let jsonString = await generateInsights(prompt, false);
    
    // Limpieza agresiva
    let cleanJson = jsonString.replace(/```json/gi, "").replace(/```/g, "").trim();
    if (cleanJson.startsWith("`")) cleanJson = cleanJson.substring(1);
    if (cleanJson.endsWith("`")) cleanJson = cleanJson.substring(0, cleanJson.length - 1);

    let parsedData;
    try {
      parsedData = JSON.parse(cleanJson);
    } catch (e) {
      console.error("Error parseando JSON de Customer:", cleanJson);
      return { success: false, error: "La IA no devolvió un JSON válido. Reintenta." };
    }

    await prisma.insight.create({
      data: {
        accountId: clientId,
        framework: 'voc_clusters',
        scope: 'market_wide',
        periodStart: new Date(),
        periodEnd: new Date(),
        payload: parsedData,
        narrative: "Análisis de clustering generado a partir de segmentación de mercado."
      }
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

    let web = "";
    if (client.url) web = await scrapeWithJina(client.url);

    const prompt = `Actúa como Analista de Competencia.
Nuestro Cliente: ${client.name} (${client.industry})
Competidores detectados: ${client.knownCompetitors}
Web del cliente: ${web ? web.substring(0, 3000) : 'N/A'}

Genera un Mapa de Posicionamiento (Positioning Map 2x2) evaluando al cliente y sus competidores.
Devuelve un JSON ESTRICTO con esta estructura exacta y NADA MÁS. Asegúrate de cerrar bien las llaves y corchetes:

{
  "eje_x": { "nombre": "Precio / Valor", "min_label": "Económico", "max_label": "Premium" },
  "eje_y": { "nombre": "Funcionalidad", "min_label": "Básica", "max_label": "Completa" },
  "posiciones": [
    { "empresa": "${client.name || 'El Cliente'}", "x": 5, "y": 7, "justificacion": "Por qué se ubica aquí" }
  ],
  "espacios_vacios": ["Oportunidad 1", "Oportunidad 2"]
}

IMPORTANTE: Responde ÚNICAMENTE con el objeto JSON válido. No uses bloques de código (ni \`\`\`json).`;

    let jsonString = await generateInsights(prompt, false);
    
    // Limpieza agresiva
    let cleanJson = jsonString.replace(/```json/gi, "").replace(/```/g, "").trim();
    if (cleanJson.startsWith("`")) cleanJson = cleanJson.substring(1);
    if (cleanJson.endsWith("`")) cleanJson = cleanJson.substring(0, cleanJson.length - 1);

    let parsedData;
    try {
      parsedData = JSON.parse(cleanJson);
    } catch (e) {
      console.error("Error parseando JSON de Competitors:", cleanJson);
      return { success: false, error: "La IA no devolvió un JSON válido. Reintenta." };
    }

    await prisma.insight.create({
      data: {
        accountId: clientId,
        framework: 'positioning_map',
        scope: 'market_wide',
        periodStart: new Date(),
        periodEnd: new Date(),
        payload: parsedData,
        narrative: "Mapa de posicionamiento generado estratégicamente frente a competidores conocidos."
      }
    });

    // Como extra, crearemos los competidores en la tabla Competitor si no existen (simplificado)
    if (parsedData.posiciones && parsedData.posiciones.length > 0) {
      for (const pos of parsedData.posiciones) {
        if (pos.empresa !== client.name && pos.empresa !== 'El Cliente') {
          await prisma.competitor.upsert({
            where: { id: '00000000-0000-0000-0000-000000000000' }, // Solo de referencia, vamos a buscar mejor
            create: {
              accountId: clientId,
              name: pos.empresa,
              source: 'discovered_google_search',
              status: 'active'
            },
            update: {}
          }).catch(() => {
             // Ignorar error de upsert y crear directo:
             prisma.competitor.create({
               data: {
                 accountId: clientId,
                 name: pos.empresa,
                 source: 'user_provided',
                 status: 'active'
               }
             }).catch(e => console.error("Competidor ya existe"));
          });
        }
      }
    }

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
Industria: ${client.industry || "No especificada"}
Competidores: ${client.knownCompetitors || "Ninguno"}

Calcula métricas de mercado (Share of Voice y Momentum).
Devuelve un JSON ESTRICTO con esta estructura exacta y NADA MÁS. Asegúrate de cerrar bien las llaves y corchetes:

{
  "sov": {
     "scores_por_competidor": { "El Cliente": 30, "Competidor 1": 70 },
     "desglose_por_canal": {},
     "narrativa": "Análisis del SOV..."
  },
  "momentum": {
     "score": 85,
     "desglose": { "vacantes": 10, "ads": 5, "pricing": 0, "prensa": 2 },
     "sugerencia": "Qué debería hacer el cliente para acelerar"
  }
}

IMPORTANTE: Responde ÚNICAMENTE con el objeto JSON válido. No uses bloques de código (ni \`\`\`json).`;

    let jsonString = await generateInsights(prompt, false);
    
    // Limpieza agresiva
    let cleanJson = jsonString.replace(/```json/gi, "").replace(/```/g, "").trim();
    if (cleanJson.startsWith("`")) cleanJson = cleanJson.substring(1);
    if (cleanJson.endsWith("`")) cleanJson = cleanJson.substring(0, cleanJson.length - 1);

    let parsedData;
    try {
      parsedData = JSON.parse(cleanJson);
    } catch (e) {
      console.error("Error parseando JSON de Market:", cleanJson);
      return { success: false, error: "La IA no devolvió un JSON válido. Reintenta." };
    }

    if (parsedData.sov) {
      await prisma.insight.create({
        data: {
          accountId: clientId,
          framework: 'sov_composite',
          scope: 'market_wide',
          periodStart: new Date(),
          periodEnd: new Date(),
          payload: parsedData.sov,
          narrative: parsedData.sov.narrativa || "Análisis SOV completado."
        }
      });
    }

    if (parsedData.momentum) {
      await prisma.insight.create({
        data: {
          accountId: clientId,
          framework: 'momentum_score',
          scope: 'own_company',
          periodStart: new Date(),
          periodEnd: new Date(),
          payload: parsedData.momentum,
          narrative: "Momentum score calculado."
        }
      });
    }

    revalidatePath(`/clients/${clientId}/market`);
    return { success: true };
  } catch (error: any) {
    console.error("Error en Market Analyst:", error);
    return { success: false, error: error.message || "Error desconocido" };
  }
}
