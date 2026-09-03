"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { generateInsights } from "@/services/llm";

const prisma = new PrismaClient();

export async function generateCompanyProfile(clientId: string) {
  try {
    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return { success: false, error: "Cliente no encontrado" };
    }

    // Armamos el prompt para la API de Nvidia NIM
    const prompt = `Analiza a la siguiente empresa como un estratega de negocios experto.
    
Información de la empresa:
- URL: ${client.url}
- Industria: ${client.industry || "No especificada"}
- Productos: ${client.products || "No especificados"}
- Cliente Objetivo: ${client.targetCustomer || "No especificado"}

Por favor, redacta un perfil estructurado de la empresa en Markdown que incluya:
1. **Descripción General:** Qué hace la empresa (infiere basándote en la industria y productos).
2. **Propuesta de Valor Inferida:** Cuál es el valor principal que ofrecen a sus clientes.
3. **CTAs y Estrategia probable:** Qué llamados a la acción deberían tener en su sitio web.

Formato: Solo responde con el Markdown limpio, sin introducciones adicionales.`;

    // Llamada real al LLM (Nvidia NIM - moonshotai/kimi-k3)
    const profileMarkdown = await generateInsights(prompt, false);

    // Guardamos el resultado en el campo companyProfile
    await prisma.client.update({
      where: { id: clientId },
      data: { companyProfile: profileMarkdown },
    });

    revalidatePath(`/clients/${clientId}/intelligence`);

    return { success: true };
  } catch (error: any) {
    console.error("Error al generar perfil:", error);
    return { success: false, error: error.message };
  }
}
