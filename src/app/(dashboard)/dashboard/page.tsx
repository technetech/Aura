export default function DashboardPage() {
  return (
    <div className="space-y-6 p-8">
      <h1 className="text-3xl font-serif font-light text-gray-900">Dashboard</h1>
      <p className="text-gray-500 font-light">Estado del cliente, actualizaciones, alertas y revisiones.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Active Clients</h3>
          <p className="text-3xl font-light text-[#3B5B7E] mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Pending Approvals</h3>
          <p className="text-3xl font-light text-amber-500 mt-2">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">Recent Insights</h3>
          <p className="text-3xl font-light text-[#3B5B7E] mt-2">28</p>
        </div>
      </div>
    </div>
  );
}
