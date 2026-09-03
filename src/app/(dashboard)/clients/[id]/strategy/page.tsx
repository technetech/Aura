import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";

export default async function StrategyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Commercial Strategy</h1>
          <p className="text-gray-500 font-light mt-1">Go-To-Market, Ventajas Competitivas y Posicionamiento para {client.name || client.url}.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
           <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
             <h3 className="text-lg font-medium text-gray-900">Estrategia Comercial (Go-To-Market)</h3>
           </div>
           <div className="p-6 text-sm text-gray-700 space-y-4">
             <p><strong>Canal Principal:</strong> Product-Led Growth combinado con ventas consultivas Outbound para cuentas corporativas.</p>
             <p><strong>Estrategia de Pricing:</strong> Penetración de mercado (Freemium o Tiers accesibles) escalando según uso (seats o volumen de datos).</p>
             <p><strong>Partnerships:</strong> Alianzas estratégicas con despachos contables y agencias de marketing digital locales.</p>
           </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
           <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
             <h3 className="text-lg font-medium text-gray-900">Ventaja Competitiva Core</h3>
           </div>
           <div className="p-6 text-sm text-gray-700 space-y-4">
             <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold mr-3">1</span>
                <p>Ciclo de Onboarding automatizado que reduce el Time-to-Value de 3 semanas (estándar de la industria) a 48 horas.</p>
             </div>
             <div className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold mr-3">2</span>
                <p>Curva de aprendizaje plana: UI/UX inspirada en apps de consumidor final (B2C), disminuyendo el rechazo del empleado final.</p>
             </div>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Cuadrante de Posicionamiento</h3>
        </div>
        <div className="p-6 flex justify-center items-center h-64 bg-gray-50 border border-gray-100 m-6 rounded border-dashed">
          {/* Dummy visual for quadrant */}
          <div className="text-center">
             <p className="text-gray-400 font-medium mb-2">[ Gráfico de Matriz 2x2 Generado por Agente Visual ]</p>
             <p className="text-sm text-gray-500">Eje X: Precio/Accesibilidad | Eje Y: Sofisticación Tecnológica</p>
             <p className="text-xs text-[#3B5B7E] font-bold mt-2">La marca se ubica en: Alta Sofisticación / Alta Accesibilidad</p>
          </div>
        </div>
      </div>
    </div>
  );
}
