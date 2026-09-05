import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";
import DataPlaceholder from "@/components/DataPlaceholder";
import CustomerAnalyzeButton from "@/components/CustomerAnalyzeButton";
import { VoiceOfCustomer } from "@/types/intelligence";

export default async function CustomersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  // Buscar el insight de Voice of Customer
  const vocInsight = client.insights?.find((i: any) => i.framework === 'voc_clusters');
  const data = vocInsight ? (vocInsight.payload as unknown as VoiceOfCustomer) : null;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Voice of Customer</h1>
          <p className="text-gray-500 font-light mt-1">Clustering temático y necesidades no cubiertas (JTBD).</p>
        </div>
        <CustomerAnalyzeButton clientId={client.id} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {data ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Clusters de Necesidades (JTBD)</h3>
            <div className="space-y-6">
              {data.clusters.map((cluster, i) => (
                <div key={i} className="border-l-4 border-[#3B5B7E] pl-4 py-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-gray-900">{cluster.nombre}</h4>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono">
                      Frecuencia: {cluster.frecuencia_pct}%
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-700"><strong>Oportunidad:</strong> {cluster.oportunidad}</p>
                  <p className="mt-1 text-xs text-gray-500">Atendido por: <span className="font-medium">{cluster.atendido_por}</span></p>
                </div>
              ))}
            </div>
            {vocInsight?.narrative && (
              <div className="mt-6 pt-4 border-t border-gray-100 text-sm text-gray-600">
                <strong>Resumen del Analista:</strong> {vocInsight.narrative}
              </div>
            )}
          </div>
        ) : (
          <DataPlaceholder 
            title="Voice of Customer (Clustering)"
            expectedData={["Agrupación de reviews y comentarios", "Análisis JTBD (Jobs-to-be-Done)", "Oportunidades de producto/mensaje"]}
            apiSource="Apify (Reviews Scraper) + Nvidia NIM"
          />
        )}
      </div>
    </div>
  );
}
