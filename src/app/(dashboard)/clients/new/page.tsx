"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/actions/client"; // We'll create this server action next

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const result = await createClient(formData);
      if (result.success && result.clientId) {
        // Redirigimos al Intelligence Overview de este cliente
        router.push(`/clients/${result.clientId}/intelligence`);
      } else {
        setError(result.error || "Ocurrió un error al crear el cliente");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "Error desconocido");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-serif font-light text-gray-900 mb-2">Crear Nuevo Cliente</h2>
        <p className="text-gray-500 font-light mb-8">
          Ingresa la URL principal de la empresa. Puedes complementar con datos opcionales para enriquecer el Client Brain.
        </p>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Datos principales */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Información Básica</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL de la empresa *</label>
                <input type="url" id="url" name="url" placeholder="https://ejemplo.com" required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3B5B7E] focus:ring focus:ring-[#3B5B7E] focus:ring-opacity-50 px-4 py-2 border"
                />
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre (Desambiguación)</label>
                <input type="text" id="name" name="name" placeholder="Ej. Empresa Corp"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3B5B7E] focus:ring focus:ring-[#3B5B7E] focus:ring-opacity-50 px-4 py-2 border"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">País / Ciudad / Región</label>
                <input type="text" id="location" name="location" placeholder="Ej. CDMX, México"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3B5B7E] focus:ring focus:ring-[#3B5B7E] focus:ring-opacity-50 px-4 py-2 border"
                />
              </div>
              
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industria / Categoría</label>
                <input type="text" id="industry" name="industry" placeholder="Ej. SaaS B2B, Fintech"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3B5B7E] focus:ring focus:ring-[#3B5B7E] focus:ring-opacity-50 px-4 py-2 border"
                />
              </div>
            </div>
          </div>

          {/* Contexto del negocio */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Contexto del Negocio</h3>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label htmlFor="products" className="block text-sm font-medium text-gray-700">Productos / Servicios</label>
                <textarea id="products" name="products" rows={2} placeholder="Principales líneas de negocio..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3B5B7E] focus:ring focus:ring-[#3B5B7E] focus:ring-opacity-50 px-4 py-2 border"
                />
              </div>

              <div>
                <label htmlFor="targetCustomer" className="block text-sm font-medium text-gray-700">Cliente Objetivo (ICP)</label>
                <textarea id="targetCustomer" name="targetCustomer" rows={2} placeholder="Descripción de la audiencia o buyer persona..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3B5B7E] focus:ring focus:ring-[#3B5B7E] focus:ring-opacity-50 px-4 py-2 border"
                />
              </div>

              <div>
                <label htmlFor="knownCompetitors" className="block text-sm font-medium text-gray-700">Competidores Conocidos</label>
                <textarea id="knownCompetitors" name="knownCompetitors" rows={2} placeholder="Semillas de benchmark (empresas, URLs)..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3B5B7E] focus:ring focus:ring-[#3B5B7E] focus:ring-opacity-50 px-4 py-2 border"
                />
              </div>
              
              <div>
                <label htmlFor="businessObjectives" className="block text-sm font-medium text-gray-700">Objetivos de Negocio</label>
                <textarea id="businessObjectives" name="businessObjectives" rows={2} placeholder="Metas a corto/mediano plazo..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3B5B7E] focus:ring focus:ring-[#3B5B7E] focus:ring-opacity-50 px-4 py-2 border"
                />
              </div>
              <div>
                <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-700">Redes Sociales</label>
                <textarea id="socialMedia" name="socialMedia" rows={2} placeholder="URLs de LinkedIn, Twitter, Instagram..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3B5B7E] focus:ring focus:ring-[#3B5B7E] focus:ring-opacity-50 px-4 py-2 border"
                />
              </div>
            </div>
          </div>

          {/* Archivos y Documentos */}
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Archivos y Documentos</h3>
            <p className="text-sm text-gray-500 font-light">
              Sube los documentos de la empresa. Serán almacenados localmente para consulta de los agentes de Aura.
            </p>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="logoFile" className="block text-sm font-medium text-gray-700">Logo (Imagen)</label>
                <input type="file" id="logoFile" name="logoFile" accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#3B5B7E] hover:file:bg-blue-100"
                />
              </div>
              <div>
                <label htmlFor="manualFile" className="block text-sm font-medium text-gray-700">Manual de Marca Existente (PDF)</label>
                <input type="file" id="manualFile" name="manualFile" accept=".pdf"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#3B5B7E] hover:file:bg-blue-100"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="docsFile" className="block text-sm font-medium text-gray-700">Documentos / Presentaciones (PDF)</label>
                <input type="file" id="docsFile" name="docsFile" accept=".pdf" multiple
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-[#3B5B7E] hover:file:bg-blue-100"
                />
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3B5B7E] hover:bg-[#2C4A6B] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3B5B7E] ${loading ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              {loading ? "Registrando Cliente y Ejecutando Intelligence..." : "Crear Cliente"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
