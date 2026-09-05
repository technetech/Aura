import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";
import AnalyzeButton from "@/components/AnalyzeButton";
import { Battlecard } from "@/types/intelligence";
import ReactMarkdown from "react-markdown";

export default async function IntelligenceOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

  // Buscar el Battlecard de la propia empresa (scope = own_company o id de la empresa)
  const ownBattlecard = client.insights?.find((i: any) => i.framework === 'battlecard' && (i.scope === 'own_company' || i.scope === client.id));
  const data = ownBattlecard ? (ownBattlecard.payload as unknown as Battlecard) : null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Intelligence Overview</h1>
          <p className="text-gray-500 font-light mt-1">
            {client.name ? `${client.name} (${client.url})` : client.url}
          </p>
        </div>
        <div className="flex space-x-3">
          <AnalyzeButton clientId={client.id} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic DB Info */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:col-span-1 h-fit">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Información de la Cuenta</h3>
          <dl className="grid grid-cols-1 gap-y-4">
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase">Industria</dt>
              <dd className="mt-1 text-sm text-gray-900">{client.industry || "-"}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase">Ubicación</dt>
              <dd className="mt-1 text-sm text-gray-900">{client.location || "-"}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase">Productos</dt>
              <dd className="mt-1 text-sm text-gray-900">{client.products || "-"}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase">Cliente Objetivo</dt>
              <dd className="mt-1 text-sm text-gray-900">{client.targetCustomer || "-"}</dd>
            </div>
          </dl>
        </div>

        {/* AI Insight Output (Battlecard Propio) */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2 flex items-center justify-between">
            <span>Battlecard de la Empresa (Insights)</span>
            {!data && (
              <span className="text-xs font-normal text-amber-600 bg-amber-50 px-2 py-1 rounded">Generación Pendiente</span>
            )}
          </h3>
          
          {data ? (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900">Resumen Ejecutivo</h4>
                <p className="text-sm text-gray-700 mt-1">{data.resumen_ejecutivo}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-700">Fortalezas</h4>
                  <ul className="list-disc pl-5 mt-1 text-sm text-gray-700">
                    {data.fortalezas.map((f, i) => <li key={i}>{f}</li>)}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-700">Debilidades</h4>
                  <ul className="list-disc pl-5 mt-1 text-sm text-gray-700">
                    {data.debilidades.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded">
                <h4 className="font-medium text-gray-900 text-sm">Mensaje Central</h4>
                <p className="text-sm text-gray-700 mt-1 italic">"{data.mensaje_central_marketing}"</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm mb-2">Narrativa del Analista</h4>
                <div className="prose prose-sm text-gray-600">
                  <ReactMarkdown>{ownBattlecard?.narrative || ""}</ReactMarkdown>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 font-light">
              <p>El motor de Inteligencia Comercial aún no ha generado el Battlecard principal.</p>
              <p className="text-sm mt-2">Haz clic en "Analizar con IA" para ejecutar el pipeline sobre {client.url}.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
