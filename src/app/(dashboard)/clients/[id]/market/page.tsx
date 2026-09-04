import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";
import DataPlaceholder from "@/components/DataPlaceholder";
import MarketAnalyzeButton from "@/components/MarketAnalyzeButton";

export default async function MarketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  let data = null;
  if (client.marketAnalysis) {
    try { data = JSON.parse(client.marketAnalysis); } catch (e) {}
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Market Intelligence</h1>
          <p className="text-gray-500 font-light mt-1">Análisis de tamaño de mercado, estacionalidad y tendencias.</p>
        </div>
        <MarketAnalyzeButton clientId={client.id} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data ? (
          <>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Tendencias de Mercado</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {data.trends?.map((t: string, i: number) => <li key={i}>{t}</li>)}
              </ul>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Estimación de Mercado</h3>
              <div className="space-y-4 text-sm">
                <p><strong>TAM (Total):</strong> {data.marketSize?.tam}</p>
                <p><strong>SAM (Servible):</strong> {data.marketSize?.sam}</p>
                <p><strong>SOM (Obtenible):</strong> {data.marketSize?.som}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Fuerzas de Porter</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {data.porter?.map((t: string, i: number) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </>
        ) : (
          <>
            <DataPlaceholder title="Señales de Demanda" expectedData={["Gráficas", "Tendencias"]} apiSource="google-trends-api" />
            <DataPlaceholder title="Estimación de Mercado" expectedData={["TAM, SAM, SOM"]} apiSource="Nvidia NIM" />
            <DataPlaceholder title="Fuerzas de Porter" expectedData={["Rivalidad", "Poder clientes"]} apiSource="Nvidia NIM" />
          </>
        )}
      </div>
    </div>
  );
}
