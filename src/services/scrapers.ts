export async function scrapeWithJina(url: string): Promise<string> {
  if (!url) return "";
  
  try {
    const response = await fetch(`https://r.jina.ai/${url}`, {
      headers: {
        Authorization: `Bearer ${process.env.JINA_API_KEY}`,
        "X-Return-Format": "markdown"
      }
    });
    
    if (!response.ok) {
      console.error("Error Jina AI:", response.statusText);
      return "";
    }
    
    const markdown = await response.text();
    // Limitar el contenido a unos 8000 caracteres para no exceder el contexto del LLM
    return markdown.slice(0, 8000); 
  } catch (error) {
    console.error("Failed to scrape with Jina:", error);
    return "";
  }
}

export async function scrapeWithFirecrawl(url: string) {
  // Implementación futura si Jina falla, Firecrawl es la alternativa
}
