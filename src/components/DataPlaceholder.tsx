import React from "react";

interface DataPlaceholderProps {
  title: string;
  expectedData: string[];
  apiSource: string;
}

export default function DataPlaceholder({ title, expectedData, apiSource }: DataPlaceholderProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <h3 className="text-sm font-medium text-gray-900">{title}</h3>
        <span className="text-[10px] font-mono bg-[#3B5B7E]/10 text-[#3B5B7E] px-2 py-1 rounded-md border border-[#3B5B7E]/20">
          API: {apiSource}
        </span>
      </div>
      <div className="p-6 flex-1 flex flex-col items-center justify-center bg-gray-50/30 border-dashed border-2 border-gray-200 m-4 rounded-md">
        <h4 className="text-xs font-bold text-gray-700 mb-3 uppercase tracking-wider">¿Qué datos se generarán aquí?</h4>
        <ul className="text-sm text-gray-500 space-y-2 mb-4 text-left list-disc pl-5 w-full max-w-sm">
          {expectedData.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className="mt-2 text-xs text-gray-400 flex items-center">
          <svg className="w-4 h-4 mr-1 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Esperando ejecución del agente...
        </div>
      </div>
    </div>
  );
}
