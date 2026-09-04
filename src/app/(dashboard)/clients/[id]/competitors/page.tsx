import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";
import DataPlaceholder from "@/components/DataPlaceholder";
import CompetitorAnalyzeButton from "@/components/CompetitorAnalyzeButton";

export default async function CompetitorsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  let data = null;
  if (client.competitorAnalysis) {
    try { data = JSON.parse(client.competitorAnalysis); } catch (e) {}
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Competitor Intelligence</h1>
          <p className="text-gray-500 font-light mt-1">Identificación de rivales, modelos de precios y posicionamiento.</p>
        </div>
        <CompetitorAnalyzeButton clientId={client.id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data ? (
          <>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Directorio de Competidores</h3>
              <ul className="space-y-3">
                {data.topCompetitors?.map((c: any, i: number) => (
                  <li key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-bold text-sm">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.type}</p>
                    </div>
                    <span className="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">{c.overlap}% overlap</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Modelos de Precios</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {data.priceModels?.map((p: string, i: number) => <li key={i} className="text-sm">{p}</li>)}
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Análisis de Brechas (Gaps)</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {data.gaps?.map((g: string, i: number) => <li key={i} className="text-sm">{g}</li>)}
              </ul>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Amenazas Emergentes</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {data.threats?.map((t: string, i: number) => <li key={i} className="text-sm">{t}</li>)}
              </ul>
            </div>
          </>
        ) : (
          <>
            <DataPlaceholder title="Directorio de Competidores y Solapamiento" expectedData={["Lista de los Top 5 competidores reales.", "Porcentaje de solapamiento de audiencia (SERP).", "Clasificación: Competidor Directo vs Indirecto."]} apiSource="Google Custom Search API" />
            <DataPlaceholder title="Matriz de Oferta y Precios" expectedData={["Rango de precios detectados en sus webs.", "Modelos de negocio (Suscripción, Pago único).", "Características clave que ellos resaltan."]} apiSource="Jina AI (Scraping) + Nvidia NIM" />
            <DataPlaceholder title="Análisis de Brechas (Gaps)" expectedData={["¿Qué ofrecen ellos que nuestro cliente NO?", "¿Qué ofrece nuestro cliente que ellos NO?", "Debilidades técnicas detectadas en su web."]} apiSource="Jina AI + Google PageSpeed" />
            <DataPlaceholder title="Amenazas Emergentes" expectedData={["Nuevos jugadores con crecimiento rápido.", "Tecnologías o tendencias que están adoptando.", "Estrategias de captura de leads que usan."]} apiSource="Nvidia NIM (Inferencia Estratégica)" />
          </>
        )}
      </div>
    </div>
  );
}
