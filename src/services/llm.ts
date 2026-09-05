// Estructura lista para interactuar con la API de Nvidia NIM
// Utilizando el endpoint compatible con OpenAI

const NVIDIA_NIM_API_KEY = process.env.NVIDIA_NIM_API_KEY || "";
const MODEL = process.env.NVIDIA_NIM_MODEL || "moonshotai/kimi-k3";
const API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";

/**
 * Función base para estructurar llamadas al LLM.
 * Actualmente retorna un mock (datos dummies) según las instrucciones, 
 * pero ya tiene la estructura de la llamada Fetch preparada para cuando quites el mock.
 */
export async function generateInsights(prompt: string, useMock = false) {
  if (useMock) {
    // Retornamos un delay simulado y datos dummy para el desarrollo UI inicial
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          purpose: "Democratizar el acceso a herramientas de inteligencia de ventas para PyMEs en Latinoamérica.",
          personality: ["Directa", "Confiable", "Innovadora"],
          promise: "Crecimiento predecible sin complicaciones técnicas.",
        });
      }, 1500);
    });
  }

  // Estructura real de la llamada para Nvidia NIM
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${NVIDIA_NIM_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: "system", content: "You are an expert brand and business strategist." },
          { role: "user", content: prompt }
        ],
        temperature: 0.2,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error llamando a NVIDIA NIM:", error);
    throw error;
  }
}
