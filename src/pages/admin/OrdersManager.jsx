import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const OrdersManager = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Failed to update status');
    } else {
      fetchOrders();
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Orders Management</h2>
        <p className="text-gray-500 mt-1">Track and update customer orders.</p>
      </div>

      {loading ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 text-center text-gray-500">Loading orders...</div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Order ID</th>
                <th className="p-4 font-semibold text-gray-600">Customer</th>
                <th className="p-4 font-semibold text-gray-600">Total</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500">
                    No orders yet. They will appear here once customers checkout.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="p-4 font-mono text-sm text-gray-500">{order.id.slice(0, 8)}...</td>
                    <td className="p-4">
                      <p className="font-medium text-gray-800">{order.customer_name}</p>
                      <p className="text-sm text-gray-500">{order.customer_email}</p>
                    </td>
                    <td className="p-4 font-medium text-gray-800">₹{order.total_amount}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="bg-white border rounded px-2 py-1 text-sm outline-none focus:border-accent"
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersManager;
