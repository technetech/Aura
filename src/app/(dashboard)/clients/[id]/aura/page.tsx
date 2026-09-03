import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";

export default async function AuraOverviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);

  if (!client) notFound();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Aura / Brand Studio</h1>
          <p className="text-gray-500 font-light mt-1">
            Auditoría e Identidad (Visual, Verbal y Core) de {client.name ? `${client.name}` : client.url}
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-[#3B5B7E] text-white rounded-md text-sm font-medium hover:bg-[#2C4A6B]">
            Generar Brand Book PDF
          </button>
        </div>
      </div>

      {/* Brand Audit */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Brand Audit</h3>
          <p className="mt-1 text-sm text-gray-500">Evaluación de la marca actual.</p>
        </div>
        <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
              <h4 className="text-sm font-bold text-gray-700 mb-2">Inconsistencias Detectadas</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                 <li>Múltiples variaciones del logo en redes sociales vs sitio web.</li>
                 <li>Tono verbal disonante (muy formal en web, excesivamente informal en IG).</li>
                 <li>Falta de propuesta de valor clara en el Above the Fold (Hero section).</li>
              </ul>
           </div>
           <div>
              <h4 className="text-sm font-bold text-gray-700 mb-2">Oportunidades de Mejora</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                 <li>Estandarizar la paleta cromática alrededor del azul corporativo.</li>
                 <li>Simplificar el tagline para que responda a los 'Purchase Drivers'.</li>
                 <li>Humanizar la marca mostrando al equipo fundador.</li>
              </ul>
           </div>
        </div>
      </div>

      {/* Brand Core */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Brand Core</h3>
          <p className="mt-1 text-sm text-gray-500">Fundamentos estratégicos de la marca (Generado por IA).</p>
        </div>
        <div className="px-6 py-5 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Propósito (Purpose)</dt>
              <dd className="mt-2 text-lg text-gray-900 font-serif">"Democratizar el acceso a herramientas de inteligencia de negocios para que cualquier PyME compita en las grandes ligas."</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Promesa de Marca (Brand Promise)</dt>
              <dd className="mt-2 text-base text-gray-900">Visibilidad absoluta de tus finanzas en 3 clics, sin necesidad de contadores.</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Misión y Visión</dt>
              <dd className="mt-2 text-sm text-gray-700 space-y-2">
                <p><strong>Misión:</strong> Entregar tecnología intuitiva y accesible para operaciones comerciales.</p>
                <p><strong>Visión:</strong> Ser el sistema operativo estándar para el comercio minorista en LATAM para 2030.</p>
              </dd>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
             <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">Personalidad (Arquetipos)</dt>
             <dd className="space-y-2">
               <div className="flex justify-between items-center text-sm">
                 <span className="font-medium text-gray-800">El Sabio (Dominante)</span>
                 <span className="text-blue-600 font-bold">60%</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="font-medium text-gray-800">El Creador</span>
                 <span className="text-blue-600 font-bold">30%</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                 <span className="font-medium text-gray-800">El Héroe</span>
                 <span className="text-blue-600 font-bold">10%</span>
               </div>
             </dd>
          </div>
        </div>
      </div>

      {/* Identidad Visual y Verbal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
           <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Identidad Verbal</h3>
           <div className="space-y-4 text-sm text-gray-700">
              <div><strong className="text-gray-900">Tono:</strong> Educativo, empático, seguro, sin jerga innecesaria.</div>
              <div><strong className="text-gray-900">Voz:</strong> Un mentor experimentado que guía paso a paso.</div>
              <div><strong className="text-gray-900">Keywords de Marca:</strong> Transparencia, Crecimiento, Control, Facilidad.</div>
           </div>
         </div>
         <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
           <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Identidad Visual</h3>
           <div className="flex space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#3B5B7E] border border-gray-200 shadow-sm"></div>
              <div className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-sm"></div>
              <div className="w-12 h-12 rounded-full bg-gray-900 border border-gray-200 shadow-sm"></div>
           </div>
           <p className="text-sm text-gray-500">Logotipos y tipografías se generarán vía integración multimodal en futuras fases.</p>
         </div>
      </div>
    </div>
  );
}
