"use client";

import React, { use } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, BookOpen, BarChart2, Users, Briefcase, FileText } from "lucide-react";

export default function ClientLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const pathname = usePathname();
  const { id } = use(params);

  const intelligenceTabs = [
    { name: "Overview", href: `/clients/${id}/intelligence`, icon: Search },
    { name: "Competitors", href: `/clients/${id}/competitors`, icon: Briefcase },
    { name: "Market", href: `/clients/${id}/market`, icon: BarChart2 },
    { name: "Customers", href: `/clients/${id}/customers`, icon: Users },
  ];

  const auraTabs = [
    { name: "Brand Studio", href: `/clients/${id}/aura`, icon: BookOpen },
    { name: "Communication", href: `/clients/${id}/communication`, icon: Search },
    { name: "Strategy", href: `/clients/${id}/strategy`, icon: Briefcase },
    { name: "Reports", href: `/clients/${id}/reports`, icon: FileText },
  ];

  return (
    <div className="flex h-full">
      {/* Sub-sidebar for the specific client */}
      <div className="w-56 bg-white border-r border-gray-200 flex flex-col h-full shadow-sm">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
            Área del Cliente
          </h2>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="py-4">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Intelligence
            </h3>
            <ul className="space-y-1">
              {intelligenceTabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                  <li key={tab.name}>
                    <Link
                      href={tab.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium border-l-2 transition-colors ${
                        isActive
                          ? "border-[#3B5B7E] text-[#3B5B7E] bg-blue-50"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <tab.icon className={`mr-3 h-4 w-4 ${isActive ? "text-[#3B5B7E]" : "text-gray-400"}`} />
                      {tab.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="py-4 border-t border-gray-200">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Aura
            </h3>
            <ul className="space-y-1">
              {auraTabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                  <li key={tab.name}>
                    <Link
                      href={tab.href}
                      className={`flex items-center px-4 py-2 text-sm font-medium border-l-2 transition-colors ${
                        isActive
                          ? "border-[#3B5B7E] text-[#3B5B7E] bg-blue-50"
                          : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <tab.icon className={`mr-3 h-4 w-4 ${isActive ? "text-[#3B5B7E]" : "text-gray-400"}`} />
                      {tab.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Client Content Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-[#F9FAFB]">
        {children}
      </div>
    </div>
  );
}
