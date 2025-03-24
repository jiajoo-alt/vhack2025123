import React from "react";
import { FaChartLine } from "react-icons/fa";

const OrderManagement: React.FC = () => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[var(--headline)]">Your Orders</h2>
        <button className="bg-[var(--highlight)] text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <FaChartLine size={14} /> Generate Report
        </button>
      </div>
      
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((order) => (
          <div key={order} className="border border-[var(--stroke)] rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-sm text-[var(--paragraph-light)]">Order #{1000 + order}</div>
                <h3 className="text-lg font-medium text-[var(--headline)]">Charity Name #{order}</h3>
                <div className="mt-2 text-sm text-[var(--paragraph)]">
                  <span className="inline-block mr-4">Items: {order + 3}</span>
                  <span className="inline-block">Total: ${(order * 100).toFixed(2)}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  order % 3 === 0 ? 'bg-yellow-100 text-yellow-800' : 
                  order % 3 === 1 ? 'bg-green-100 text-green-800' : 
                  'bg-blue-100 text-blue-800'
                }`}>
                  {order % 3 === 0 ? 'Pending' : order % 3 === 1 ? 'Confirmed' : 'Processing'}
                </span>
                <span className="text-sm text-[var(--paragraph-light)] mt-2">Placed on {new Date().toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex mt-4 gap-2">
              <button className="text-sm text-[var(--highlight)] hover:underline">View Details</button>
              <span className="text-[var(--paragraph-light)]">•</span>
              <button className="text-sm text-[var(--highlight)] hover:underline">Update Status</button>
              <span className="text-[var(--paragraph-light)]">•</span>
              <button className="text-sm text-[var(--highlight)] hover:underline">Contact Charity</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderManagement; 