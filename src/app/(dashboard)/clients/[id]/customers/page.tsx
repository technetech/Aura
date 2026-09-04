import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";
import DataPlaceholder from "@/components/DataPlaceholder";
import CustomerAnalyzeButton from "@/components/CustomerAnalyzeButton";

export default async function CustomersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  let data = null;
  if (client.customerAnalysis) {
    try {
      data = JSON.parse(client.customerAnalysis);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Customer Intelligence</h1>
          <p className="text-gray-500 font-light mt-1">Voz del cliente, quejas comunes y motivadores de compra.</p>
        </div>
        <CustomerAnalyzeButton clientId={client.id} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {data ? (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pain Points & Quejas de la Industria</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {data.painPoints?.map((p: string, i: number) => <li key={i}>{p}</li>)}
            </ul>
          </div>
        ) : (
          <DataPlaceholder 
            title="Pain Points & Quejas de la Industria"
            expectedData={["Lista de frustraciones", "Citas literales de reseñas", "Oportunidades"]}
            apiSource="Apify (Capterra/Google Scraper) + Nvidia NIM"
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data ? (
            <>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Purchase Drivers (Motivadores)</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  {data.purchaseDrivers?.map((p: string, i: number) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Arquetipo del Comprador</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{data.buyerPersona}</p>
              </div>
            </>
          ) : (
            <>
              <DataPlaceholder 
                title="Purchase Drivers (Motivadores)"
                expectedData={["Razones de compra", "Características valoradas"]}
                apiSource="Apify (Scraper de Reseñas)"
              />
              <DataPlaceholder 
                title="Arquetipo del Comprador (Buyer Persona)"
                expectedData={["Perfil demográfico", "Miedos y deseos"]}
                apiSource="Nvidia NIM"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
