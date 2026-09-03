import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";
import { FileText, Download, Share2 } from "lucide-react";

export default async function ReportsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Document Builder & Export</h1>
          <p className="text-gray-500 font-light mt-1">Generación de manuales y reportes de inteligencia en PDF interactivo.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card Reporte 1 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="p-6 border-b border-gray-100 flex items-center justify-center bg-gray-50 h-32">
             <FileText className="w-16 h-16 text-[#3B5B7E] opacity-80" />
           </div>
           <div className="p-6">
             <h3 className="text-lg font-bold text-gray-900">Brand Book & Identity</h3>
             <p className="text-sm text-gray-500 mt-2 mb-4 line-clamp-2">Manual completo con Brand Core, Pilares de Comunicación, Voz y Tono y Guía Visual.</p>
             <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center py-2 px-4 bg-[#3B5B7E] text-white rounded text-sm font-medium hover:bg-[#2C4A6B]">
                   <Download className="w-4 h-4 mr-2" /> Descargar PDF
                </button>
             </div>
           </div>
        </div>

        {/* Card Reporte 2 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="p-6 border-b border-gray-100 flex items-center justify-center bg-gray-50 h-32">
             <FileText className="w-16 h-16 text-emerald-600 opacity-80" />
           </div>
           <div className="p-6">
             <h3 className="text-lg font-bold text-gray-900">Market & Competitors Report</h3>
             <p className="text-sm text-gray-500 mt-2 mb-4 line-clamp-2">Análisis de la industria, Benchmark competitivo y señales de demanda.</p>
             <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center py-2 px-4 bg-emerald-600 text-white rounded text-sm font-medium hover:bg-emerald-700">
                   <Download className="w-4 h-4 mr-2" /> Descargar PDF
                </button>
             </div>
           </div>
        </div>

        {/* Card Reporte 3 */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
           <div className="p-6 border-b border-gray-100 flex items-center justify-center bg-gray-50 h-32">
             <FileText className="w-16 h-16 text-purple-600 opacity-80" />
           </div>
           <div className="p-6">
             <h3 className="text-lg font-bold text-gray-900">Go-To-Market Playbook</h3>
             <p className="text-sm text-gray-500 mt-2 mb-4 line-clamp-2">Estrategia comercial, perfiles de audiencia (ICP) y Pitch corporativo.</p>
             <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center py-2 px-4 bg-purple-600 text-white rounded text-sm font-medium hover:bg-purple-700">
                   <Download className="w-4 h-4 mr-2" /> Descargar PDF
                </button>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
