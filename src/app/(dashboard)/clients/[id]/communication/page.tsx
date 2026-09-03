import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";

export default async function CommunicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Communication Studio</h1>
          <p className="text-gray-500 font-light mt-1">Arquitectura de mensajes, historia y propuesta de valor.</p>
        </div>
      </div>

      <div className="bg-[#3B5B7E] rounded-lg shadow-sm p-8 text-white">
         <h3 className="text-xl font-serif font-light mb-2">Company Story</h3>
         <p className="text-blue-100 italic leading-relaxed">
           "Nacimos de la frustración de ver a cientos de emprendedores cerrar sus negocios por falta de orden financiero. Nos dimos cuenta que el software corporativo era excesivamente complejo y caro, y las hojas de cálculo eran propensas a errores catastróficos. Por eso creamos una plataforma que se siente como magia, pero opera con rigor suizo, permitiendo a los dueños dormir tranquilos."
         </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Pitch Corto (10s)</h3>
          <p className="text-sm text-gray-600">Ayudamos a las PyMEs comerciales a retomar el control de su inventario y finanzas en tiempo real, desde el celular.</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Pitch Medio (30s)</h3>
          <p className="text-sm text-gray-600">Somos la plataforma "todo en uno" que conecta ventas, inventario y facturación. A diferencia de los ERPs tradicionales que toman meses en configurarse, nuestra solución permite a los dueños de negocio estar operando y tomando decisiones informadas el mismo día.</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Tagline / Slogan</h3>
          <p className="text-lg font-serif text-[#3B5B7E] font-bold">"Tu negocio bajo control, por fin."</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Messaging Architecture</h3>
        </div>
        <div className="p-6">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border-l-4 border-blue-500 pl-4">
                 <h4 className="font-bold text-gray-800 text-sm">Pilar 1: Simplicidad</h4>
                 <p className="text-sm text-gray-600 mt-1">Cualquier empleado puede aprender a usarlo en 15 minutos. Adiós capacitaciones interminables.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                 <h4 className="font-bold text-gray-800 text-sm">Pilar 2: Confiabilidad</h4>
                 <p className="text-sm text-gray-600 mt-1">Datos actualizados al segundo y uptime del 99.9%. Tu negocio nunca se detiene.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                 <h4 className="font-bold text-gray-800 text-sm">Pilar 3: Acompañamiento</h4>
                 <p className="text-sm text-gray-600 mt-1">Soporte real por personas reales que entienden el contexto de tu negocio local.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
