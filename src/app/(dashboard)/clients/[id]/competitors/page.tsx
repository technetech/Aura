import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";
import DataPlaceholder from "@/components/DataPlaceholder";
import CompetitorAnalyzeButton from "@/components/CompetitorAnalyzeButton";
import { PositioningMap } from "@/types/intelligence";

export default async function CompetitorsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  // Buscar el Positioning Map
  const posInsight = client.insights?.find((i: any) => i.framework === 'positioning_map');
  const posData = posInsight ? (posInsight.payload as unknown as PositioningMap) : null;
  const competitors = client.competitors || [];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Competitor Intelligence</h1>
          <p className="text-gray-500 font-light mt-1">Identificación de rivales y mapas de posicionamiento.</p>
        </div>
        <CompetitorAnalyzeButton clientId={client.id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lista de Competidores extraída de la nueva tabla Competitor */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Directorio de Competidores</h3>
          {competitors.length > 0 ? (
            <ul className="space-y-3">
              {competitors.map((c: any) => (
                <li key={c.id} className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100">
                  <div>
                    <p className="font-bold text-sm text-gray-900">{c.name}</p>
                    {c.websiteUrl && <a href={c.websiteUrl} target="_blank" className="text-xs text-[#3B5B7E] hover:underline">{c.websiteUrl}</a>}
                  </div>
                  <span className={`text-xs font-mono px-2 py-1 rounded ${c.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                    {c.source === 'user_provided' ? 'Manual' : 'Discovery'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No hay competidores registrados. El pipeline de Discovery (Google Search) se encargará de encontrarlos.</p>
          )}
        </div>
        
        {/* Positioning Map Insight */}
        {posData ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Mapa de Posicionamiento (2x2)</h3>
            <div className="bg-gray-50 p-4 rounded mb-4 text-sm text-gray-700">
              <p><strong>Eje X:</strong> {posData.eje_x.nombre} ({posData.eje_x.min_label} - {posData.eje_x.max_label})</p>
              <p><strong>Eje Y:</strong> {posData.eje_y.nombre} ({posData.eje_y.min_label} - {posData.eje_y.max_label})</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-gray-900">Posiciones:</h4>
              {posData.posiciones.map((pos, i) => (
                <div key={i} className="text-sm border-b pb-2">
                  <span className="font-semibold text-gray-900">{pos.empresa}</span> 
                  <span className="text-xs ml-2 text-gray-500">[X: {pos.x}, Y: {pos.y}]</span>
                  <p className="text-gray-600 mt-1">{pos.justificacion}</p>
                </div>
              ))}
            </div>

            {posData.espacios_vacios.length > 0 && (
              <div className="mt-4 pt-4 border-t">
                <h4 className="text-sm font-bold text-[#3B5B7E]">Espacios Vacíos (Oportunidades)</h4>
                <ul className="list-disc pl-5 mt-2 text-sm text-gray-700 space-y-1">
                  {posData.espacios_vacios.map((espacio, i) => <li key={i}>{espacio}</li>)}
                </ul>
              </div>
            )}
            
            {posInsight?.narrative && (
              <div className="mt-4 pt-4 border-t text-sm text-gray-600 italic">
                {posInsight.narrative}
              </div>
            )}
          </div>
        ) : (
          <DataPlaceholder 
            title="Mapa de Posicionamiento" 
            expectedData={["Ubicación en cuadrantes", "Análisis de precios vs features", "Oportunidades de mercado (espacios en blanco)"]} 
            apiSource="Firecrawl (Pricing) + Nvidia NIM" 
          />
        )}
      </div>
    </div>
  );
}
