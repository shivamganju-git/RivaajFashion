import React from 'react';
import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react';

const AdminDashboard = () => {
  // In a real app, these would be fetched from Supabase
  const stats = [
    { label: 'Total Revenue', value: '₹0', icon: DollarSign, color: 'bg-green-100 text-green-600' },
    { label: 'Active Orders', value: '0', icon: ShoppingCart, color: 'bg-blue-100 text-blue-600' },
    { label: 'Products in Stock', value: '0', icon: Package, color: 'bg-purple-100 text-purple-600' },
    { label: 'Total Customers', value: '0', icon: Users, color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-8">Store Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-lg ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center text-gray-500">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome to your new Rivaaj Admin!</h3>
        <p>Once you connect your Supabase database and add products, your live stats will appear here.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
