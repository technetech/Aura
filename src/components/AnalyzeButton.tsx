"use client";

import { useTransition } from "react";
import { generateCompanyProfile } from "@/actions/intelligence";
import { Sparkles } from "lucide-react";

export default function AnalyzeButton({ clientId }: { clientId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleAnalyze = () => {
    startTransition(async () => {
      await generateCompanyProfile(clientId);
    });
  };

  return (
    <button
      onClick={handleAnalyze}
      disabled={isPending}
      className={`flex items-center px-4 py-2 bg-[#3B5B7E] text-white rounded-md text-sm font-medium hover:bg-[#2C4A6B] transition-colors ${
        isPending ? "opacity-75 cursor-not-allowed" : ""
      }`}
    >
      <Sparkles className="w-4 h-4 mr-2" />
      {isPending ? "Analizando con IA..." : "Analizar con IA (Nvidia NIM)"}
    </button>
  );
}
