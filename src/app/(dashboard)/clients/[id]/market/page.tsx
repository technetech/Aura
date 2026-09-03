import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";

export default async function MarketPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Market Intelligence</h1>
          <p className="text-gray-500 font-light mt-1">Análisis de la demanda, estacionalidad y segmentación del mercado.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Categoría del Mercado</p>
          <p className="mt-2 text-2xl font-serif text-[#3B5B7E]">{client.industry || "B2B SaaS"}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Madurez del Mercado</p>
          <p className="mt-2 text-2xl font-serif text-[#3B5B7E]">Fase de Crecimiento</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">TAM (Estimado)</p>
          <p className="mt-2 text-2xl font-serif text-[#3B5B7E]">$4.5B USD</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Señales de Demanda (Top Keywords)</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">"software para control de inventarios"</span>
                <span className="text-gray-500">14K Vol</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '85%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">"mejor erp pymes mexico"</span>
                <span className="text-gray-500">8.5K Vol</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '60%' }}></div></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">"sistema de facturacion electronica"</span>
                <span className="text-gray-500">22K Vol</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5"><div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '95%' }}></div></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Oportunidades (Océano Azul)</h3>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
            <li>Alta demanda no satisfecha en la integración de IA para proyecciones de ventas en empresas medianas.</li>
            <li>Saturación en el mercado de "sistemas de punto de venta básicos" pero nicho abierto en soluciones cloud-first para franquicias.</li>
            <li>Señales de estacionalidad altas en el Q4 (cierre fiscal).</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
