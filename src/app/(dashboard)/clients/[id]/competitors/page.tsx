import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";

export default async function CompetitorsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Competitor Intelligence</h1>
          <p className="text-gray-500 font-light mt-1">Análisis de solapamiento y posicionamiento estratégico.</p>
        </div>
      </div>

      {/* Competitor Map & Overlap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Solapamiento de Audiencia (SERP)</h3>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">TechCorp Solutions</p>
                <p className="text-xs text-gray-500">Competidor Directo</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div></div>
                <span className="text-xs font-bold text-gray-700">75%</span>
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Innovate B2B</p>
                <p className="text-xs text-gray-500">Competidor Directo</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2"><div className="bg-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div></div>
                <span className="text-xs font-bold text-gray-700">45%</span>
              </div>
            </li>
            <li className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Local Agency MX</p>
                <p className="text-xs text-gray-500">Competidor Local</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 bg-gray-200 rounded-full h-2"><div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div></div>
                <span className="text-xs font-bold text-gray-700">20%</span>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4 border-b pb-2">Amenazas Emergentes</h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
              <h4 className="text-sm font-bold text-blue-900">AI-Marketing Startup</h4>
              <p className="text-xs text-blue-800 mt-1">Crecimiento del 300% en tráfico orgánico en el último trimestre. Fuerte enfoque en automatización.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benchmark Struct */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Digital Benchmark vs Competencia</h3>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-white">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Métrica</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-[#3B5B7E] uppercase tracking-wider">{client.name || 'El Cliente'}</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">TechCorp Solutions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Innovate B2B</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tráfico Estimado (Mensual)</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">12,500</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45,000</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8,200</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Footprint de Contenido</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Medio (Blog inactivo)</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Alto (Resource Center)</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Bajo</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Pricing Visible</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">No (Requiere Demo)</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sí (Desde $99/mo)</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sí (Desde $49/mo)</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tecnología (CMS/CRM)</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">WordPress + HubSpot</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Webflow + Salesforce</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">React + Pipedrive</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
