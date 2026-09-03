import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";

export default async function CustomersPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Customer Intelligence</h1>
          <p className="text-gray-500 font-light mt-1">Análisis profundo de los dolores, motivadores y lenguaje del cliente (ICP).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-red-200 shadow-sm p-6">
          <h3 className="text-lg font-medium text-red-800 mb-4 flex items-center">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            Pain Points (Dolores Principales)
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="p-3 bg-red-50 rounded-md">"Pasamos horas cuadrando el inventario manualmente cada cierre de mes."</li>
            <li className="p-3 bg-red-50 rounded-md">"El sistema actual es muy difícil de enseñar a los nuevos empleados."</li>
            <li className="p-3 bg-red-50 rounded-md">"Falta de visibilidad real sobre qué productos son los más rentables."</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-green-200 shadow-sm p-6">
          <h3 className="text-lg font-medium text-green-800 mb-4 flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            Purchase Drivers (Motivadores)
          </h3>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="p-3 bg-green-50 rounded-md">Garantía de implementación en menos de 48 horas.</li>
            <li className="p-3 bg-green-50 rounded-md">Soporte local en español que responda rápido.</li>
            <li className="p-3 bg-green-50 rounded-md">Integración nativa con su sistema contable (ej. SAT en México).</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Customer Language (Voz del Cliente)</h3>
        <p className="text-sm text-gray-500 mb-4">Extractos literales de reviews de G2 / Capterra de competidores para modelar el copy de la marca:</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <blockquote className="p-4 bg-gray-50 border-l-4 border-[#3B5B7E] text-sm text-gray-600 italic">
            "Lo que más me gusta es que no tengo que ser un experto en sistemas para generar un reporte de ventas..."
          </blockquote>
          <blockquote className="p-4 bg-gray-50 border-l-4 border-[#3B5B7E] text-sm text-gray-600 italic">
            "Antes usábamos 3 Excels diferentes, ahora con esta plataforma todo mi equipo ve la misma información."
          </blockquote>
          <blockquote className="p-4 bg-gray-50 border-l-4 border-[#3B5B7E] text-sm text-gray-600 italic">
            "El dolor de cabeza más grande era el soporte técnico del software anterior, te dejaban colgado días."
          </blockquote>
        </div>
      </div>
    </div>
  );
}
