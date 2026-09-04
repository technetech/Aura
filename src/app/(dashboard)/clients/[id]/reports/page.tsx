import React from "react";
import { getClientById } from "@/actions/client";
import { notFound } from "next/navigation";
import EmptyState from "@/components/EmptyState";

export default async function ReportsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await getClientById(id);
  if (!client) notFound();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-light text-gray-900">Reports & Tracking</h1>
          <p className="text-gray-500 font-light mt-1">Reportes de evolución y KPIs.</p>
        </div>
      </div>
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900">Métricas Principales</h3>
        </div>
        <EmptyState />
      </div>
    </div>
  );
}
