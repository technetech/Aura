import { getClients } from "@/actions/client";
import Link from "next/link";

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Directorio de Clientes</h1>
          <p className="text-gray-500 font-light mt-1">
            {clients.length === 0 ? "No hay clientes registrados aún." : `Gestionando ${clients.length} cliente(s).`}
          </p>
        </div>
        <div>
          <Link href="/clients/new" className="px-4 py-2 bg-[#3B5B7E] text-white rounded-md text-sm font-medium hover:bg-[#2C4A6B]">
            + Nuevo Cliente
          </Link>
        </div>
      </div>

      {clients.length > 0 && (
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industria
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Añadido
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients.map((client: any) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-900">{client.name || client.url}</span>
                      {client.name && <span className="text-sm text-gray-500">{client.url}</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client.industry || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(client.createdAt).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-4">
                      <Link href={`/clients/${client.id}/intelligence`} className="text-[#3B5B7E] hover:text-[#2C4A6B]">
                        Ver Client Brain
                      </Link>
                      <form action={async () => {
                        "use server";
                        const { deleteClient } = await import("@/actions/client");
                        await deleteClient(client.id);
                      }}>
                        <button type="submit" className="text-red-500 hover:text-red-700 text-xs">
                          Borrar
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
