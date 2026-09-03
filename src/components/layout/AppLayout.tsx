"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, UserPlus, Users } from "lucide-react";

const mainNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Nuevo Cliente", href: "/clients/new", icon: UserPlus },
  { name: "Clientes", href: "/clients", icon: Users },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-white font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800">
        <div className="h-16 flex items-center px-6 border-b border-gray-800">
          <Link href="/dashboard" className="text-xl font-light font-serif text-white tracking-wide">
            Intelligence <span className="text-[#3B5B7E] font-bold">+</span> Aura
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Menú Principal
          </div>
          <ul className="space-y-1 px-3">
            {mainNavigation.map((item) => {
              // Highlight if it's exact match or if we are inside a client and it's the "Clientes" tab
              const isActive = 
                item.href === '/clients' 
                  ? pathname === '/clients' || (pathname.startsWith('/clients/') && pathname !== '/clients/new')
                  : pathname === item.href;
                  
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center px-3 py-2 text-sm font-light rounded-md transition-colors ${
                      isActive
                        ? "bg-[#3B5B7E] text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="font-light text-gray-500 text-sm">
            {/* Breadcrumb o Path */}
            {pathname}
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 rounded-full bg-[#3B5B7E] flex items-center justify-center text-white text-xs shadow-sm">
              CA
            </div>
          </div>
        </header>

        {/* Main Area */}
        <main className="flex-1 overflow-y-auto bg-[#F9FAFB] relative">
          {children}
        </main>
      </div>
    </div>
  );
}
