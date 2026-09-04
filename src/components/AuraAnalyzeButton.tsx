"use client";

import { useTransition } from "react";
import { generateBrandCore } from "@/actions/intelligence";
import { Sparkles, Loader2 } from "lucide-react";

export default function AuraAnalyzeButton({ clientId }: { clientId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleAnalyze = () => {
    startTransition(async () => {
      const result = await generateBrandCore(clientId);
      if (!result?.success) {
        alert(result?.error || "Error al generar identidad");
      }
    });
  };

  return (
    <button
      onClick={handleAnalyze}
      disabled={isPending}
      className="flex items-center justify-center px-4 py-2 bg-[#3B5B7E] text-white rounded-md text-sm font-medium hover:bg-[#2C4A6B] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
    >
      {isPending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Auditando Marca...
        </>
      ) : (
        <>
          <Sparkles className="w-4 h-4 mr-2" />
          Generar Identidad con IA
        </>
      )}
    </button>
  );
}
