import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";
import DataPlaceholder from "@/components/DataPlaceholder";
import MarketAnalyzeButton from "@/components/MarketAnalyzeButton";
import { ShareOfVoice, MomentumScore } from "@/types/intelligence";

export default async function MarketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  // Buscar Insights
  const sovInsight = client.insights?.find((i: any) => i.framework === 'sov_composite');
  const sovData = sovInsight ? (sovInsight.payload as unknown as ShareOfVoice) : null;
  
  const momentumInsight = client.insights?.find((i: any) => i.framework === 'momentum_score');
  const momentumData = momentumInsight ? (momentumInsight.payload as unknown as MomentumScore) : null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Market Intelligence</h1>
          <p className="text-gray-500 font-light mt-1">Share of Voice, momentum de competidores y tendencias.</p>
        </div>
        <MarketAnalyzeButton clientId={client.id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sovData ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Share of Voice Compuesto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-sm font-bold text-gray-700 mb-3">Puntuación Total</h4>
                <div className="space-y-3">
                  {Object.entries(sovData.scores_por_competidor || {}).map(([comp, score], i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">{comp}</span>
                      <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                        <div className="bg-[#3B5B7E] h-2 rounded-full" style={{ width: `${score}%` }}></div>
                      </div>
                      <span className="text-sm font-mono text-gray-600">{Number(score).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-700">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Análisis de Canales</h4>
                <div className="bg-gray-50 p-4 rounded border border-gray-100">
                  <p className="whitespace-pre-wrap">{sovData.narrativa}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <DataPlaceholder title="Share of Voice Compuesto" expectedData={["SOV Orgánico (Google Search)", "SOV Pagado (Ads)", "SOV Social (Apify)"]} apiSource="Google Search + Apify" />
        )}

        {momentumData ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center justify-between">
              <span>Momentum Score</span>
              <span className="text-2xl font-black text-[#3B5B7E]">{momentumData.score} / 100</span>
            </h3>
            
            <p className="text-sm text-gray-600 mb-6 bg-blue-50 p-3 rounded">
              <strong>Sugerencia Táctica:</strong> {momentumData.sugerencia}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 p-3 rounded border border-gray-100 text-center">
                <span className="block text-xs text-gray-500 uppercase">Señal: Vacantes</span>
                <span className="block text-xl font-bold text-gray-800 mt-1">{momentumData.desglose.vacantes > 0 ? `+${momentumData.desglose.vacantes}` : momentumData.desglose.vacantes}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-100 text-center">
                <span className="block text-xs text-gray-500 uppercase">Señal: Ads Activos</span>
                <span className="block text-xl font-bold text-gray-800 mt-1">{momentumData.desglose.ads > 0 ? `+${momentumData.desglose.ads}` : momentumData.desglose.ads}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-100 text-center">
                <span className="block text-xs text-gray-500 uppercase">Cambios Pricing</span>
                <span className="block text-xl font-bold text-gray-800 mt-1">{momentumData.desglose.pricing}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-100 text-center">
                <span className="block text-xs text-gray-500 uppercase">Picos de Prensa</span>
                <span className="block text-xl font-bold text-gray-800 mt-1">{momentumData.desglose.prensa}</span>
              </div>
            </div>
            
            {momentumInsight?.narrative && (
              <div className="mt-6 text-sm text-gray-600 border-t pt-4">
                <strong>Análisis de Aceleración:</strong> {momentumInsight.narrative}
              </div>
            )}
          </div>
        ) : (
          <DataPlaceholder title="Momentum Score (Aceleración)" expectedData={["Variación en vacantes publicadas", "Nuevos ads activos", "Picos de menciones en prensa"]} apiSource="Apify (LinkedIn/Ads) + Jina AI" />
        )}
      </div>
    </div>
  );
}
