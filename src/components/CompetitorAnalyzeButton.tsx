"use client";
import { useTransition } from "react";
import { generateCompetitorIntelligence } from "@/actions/intelligence";
import { Sparkles, Loader2 } from "lucide-react";

export default function CompetitorAnalyzeButton({ clientId }: { clientId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleAnalyze = () => {
    startTransition(async () => {
      const result = await generateCompetitorIntelligence(clientId);
      if (!result?.success) alert("Error al analizar competidores");
    });
  };

  return (
    <button onClick={handleAnalyze} disabled={isPending} className="flex items-center justify-center px-4 py-2 bg-[#3B5B7E] text-white rounded-md text-sm font-medium hover:bg-[#2C4A6B] disabled:opacity-50">
      {isPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analizando...</> : <><Sparkles className="w-4 h-4 mr-2" /> Ejecutar Competitor Analyst (Jina)</>}
    </button>
  );
}
