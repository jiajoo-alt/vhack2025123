import React, { useState, useEffect } from "react";
import { FaSearch, FaComments, FaExchangeAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import VendorChats from "./VendorChats";
import PurchasingTransactions from "./PurchasingTransactions";
import VendorSearch from "./VendorSearch";

const VendorPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'transactions' | 'chats' | 'search'>('transactions');

  // Read tab from URL parameters on component mount and when URL changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    
    if (tab === 'chats' || tab === 'search' || tab === 'transactions') {
      setActiveTab(tab);
    }
  }, [location.search]);

  // Update URL when tab changes
  const handleTabChange = (tab: 'transactions' | 'chats' | 'search') => {
    setActiveTab(tab);
    navigate(`/Vhack-2025/charity/vendor-page?tab=${tab}`, { replace: true });
  };

  return (
    <div className="p-6 bg-[var(--background)] text-[var(--paragraph)] max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-[var(--headline)] mb-6">Vendor Management</h1>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-[var(--stroke)] mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'transactions' 
              ? 'text-[var(--highlight)] border-b-2 border-[var(--highlight)]' 
              : 'text-[var(--paragraph)]'
          }`}
          onClick={() => handleTabChange('transactions')}
        >
          <FaExchangeAlt className="inline mr-2" />
          Purchasing Transactions
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'chats' 
              ? 'text-[var(--highlight)] border-b-2 border-[var(--highlight)]' 
              : 'text-[var(--paragraph)]'
          }`}
          onClick={() => handleTabChange('chats')}
        >
          <FaComments className="inline mr-2" />
          Vendor Chats
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'search' 
              ? 'text-[var(--highlight)] border-b-2 border-[var(--highlight)]' 
              : 'text-[var(--paragraph)]'
          }`}
          onClick={() => handleTabChange('search')}
        >
          <FaSearch className="inline mr-2" />
          Find Vendors
        </button>
      </div>
      
      {/* Content based on active tab */}
      <div className="mt-6">
        {activeTab === 'transactions' && <PurchasingTransactions />}
        {activeTab === 'chats' && <VendorChats />}
        {activeTab === 'search' && <VendorSearch />}
      </div>
    </div>
  );
};

export default VendorPage; 