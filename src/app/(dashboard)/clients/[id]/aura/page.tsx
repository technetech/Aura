import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";
import EmptyState from "@/components/EmptyState";
import AuraAnalyzeButton from "@/components/AuraAnalyzeButton";

export default async function AuraOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  const hasBrandCore = !!client.brandCore;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Aura / Brand Studio</h1>
          <p className="text-gray-500 font-light mt-1">Auditoría e Identidad (Visual, Verbal y Core).</p>
        </div>
        <AuraAnalyzeButton clientId={client.id} />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Brand Core</h3>
          <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">API: Jina AI + Nvidia NIM</span>
        </div>
        
        {!hasBrandCore ? (
          <EmptyState />
        ) : (
          <div className="px-6 py-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Propósito (Purpose)</dt>
                <dd className="mt-2 text-lg text-gray-900 font-serif italic">"{client.brandCore?.purpose}"</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Promesa de Marca / Posicionamiento</dt>
                <dd className="mt-2 text-base text-gray-900">{client.brandCore?.positioning}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Misión y Visión</dt>
                <dd className="mt-2 text-sm text-gray-700 space-y-2">
                  <p><strong>Misión:</strong> {client.brandCore?.mission}</p>
                  <p><strong>Visión:</strong> {client.brandCore?.vision}</p>
                </dd>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
               <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Personalidad y Valores</dt>
               <div className="space-y-4">
                 <div>
                   <h4 className="text-xs font-bold text-gray-700 mb-1">Personalidad</h4>
                   <p className="text-sm text-gray-600">{client.brandCore?.personality}</p>
                 </div>
                 <div>
                   <h4 className="text-xs font-bold text-gray-700 mb-1">Valores Base</h4>
                   <p className="text-sm text-gray-600 capitalize">{client.brandCore?.values}</p>
                 </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
