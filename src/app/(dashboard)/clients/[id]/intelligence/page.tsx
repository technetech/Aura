import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";
import AnalyzeButton from "@/components/AnalyzeButton";
import ReactMarkdown from "react-markdown";

export default async function IntelligenceOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);

  if (!client) {
    notFound();
  }

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
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Información del Cliente</h3>
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
            <div>
              <dt className="text-xs font-medium text-gray-500 uppercase">Competidores</dt>
              <dd className="mt-1 text-sm text-gray-900">{client.knownCompetitors || "-"}</dd>
            </div>
          </dl>
        </div>

        {/* AI Profile Output */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 lg:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2 flex items-center justify-between">
            <span>Perfil Generado (Nvidia NIM)</span>
            {!client.companyProfile && (
              <span className="text-xs font-normal text-amber-600 bg-amber-50 px-2 py-1 rounded">Pendiente de Análisis</span>
            )}
          </h3>
          
          {client.companyProfile ? (
            <div className="prose prose-sm max-w-none text-gray-700 font-sans">
              <ReactMarkdown>{client.companyProfile}</ReactMarkdown>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 font-light">
              <p>No se ha generado el perfil de inteligencia para esta empresa.</p>
              <p className="text-sm mt-2">Haz clic en "Analizar con IA" en la parte superior derecha.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
