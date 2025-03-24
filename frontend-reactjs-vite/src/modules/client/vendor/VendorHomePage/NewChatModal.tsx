import React, { useState } from "react";
import { FaSearch, FaTimes, FaUserCircle } from "react-icons/fa";
import { useVendorChatStore } from "../../../../services/VendorChatService";

interface NewChatModalProps {
  onClose: () => void;
}

const NewChatModal: React.FC<NewChatModalProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null);
  const { sendMessage, chats } = useVendorChatStore();

  // Mocked available vendors - in a real app, this would come from a service
  const availableVendors = [
    { id: 101, name: "Green Harvest Co.", category: "Organic Foods" },
    { id: 102, name: "Tech for Good", category: "Technology" },
    { id: 103, name: "Clean Water Solutions", category: "Water Purification" },
    { id: 104, name: "Renewable Energy Inc.", category: "Solar Power" },
    { id: 105, name: "Medical Supplies Direct", category: "Healthcare" },
  ];

  // Filter vendors based on search term
  const filteredVendors = searchTerm
    ? availableVendors.filter(vendor =>
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : availableVendors;

  // Check if vendor is already in chats
  const isVendorInChats = (vendorId: number) => {
    return chats.some(chat => 
      'vendorId' in chat && chat.vendorId === vendorId
    );
  };

  const handleStartChat = () => {
    if (selectedVendorId) {
      // Determine the next available chat ID
      const nextChatId = Math.max(...chats.map(chat => chat.id), 0) + 1;
      
      // In a real app, this would create a chat via the service
      // Here we'll just close the modal since we're using mock data
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-[var(--highlight)] text-white px-4 py-3 flex justify-between items-center">
          <h3 className="font-medium">Start New Conversation</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Search */}
          <div className="mb-4">
            <label className="block text-sm text-[var(--paragraph-light)] mb-1">
              Select a charity provider
            </label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--paragraph-light)]" />
              <input
                type="text"
                placeholder="Search for a provider..."
                className="w-full pl-10 pr-4 py-2 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Vendor list */}
          <div className="max-h-60 overflow-y-auto mb-4 border border-[var(--stroke)] rounded-lg">
            {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  onClick={() => setSelectedVendorId(vendor.id)}
                  className={`p-3 border-b border-[var(--stroke)] last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedVendorId === vendor.id
                      ? "bg-[var(--highlight-light)]"
                      : ""
                  } ${isVendorInChats(vendor.id) ? "opacity-50" : ""}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <FaUserCircle className="text-[var(--paragraph)] w-8 h-8 mr-3" />
                      <div>
                        <h4 className="font-medium text-[var(--headline)]">
                          {vendor.name}
                        </h4>
                        <p className="text-xs text-[var(--paragraph-light)]">
                          {vendor.category}
                        </p>
                        {isVendorInChats(vendor.id) && (
                          <p className="text-xs text-blue-500 mt-1">
                            Already in your chats
                          </p>
                        )}
                      </div>
                    </div>
                    {selectedVendorId === vendor.id && (
                      <div className="w-4 h-4 rounded-full bg-[var(--highlight)] flex items-center justify-center text-white text-xs">
                        ✓
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-[var(--paragraph-light)]">
                No providers found matching your search.
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-[var(--paragraph)] hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleStartChat}
              disabled={selectedVendorId === null || isVendorInChats(selectedVendorId || 0)}
              className="px-4 py-2 bg-[var(--highlight)] text-white rounded-lg hover:bg-[var(--highlight-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChatModal; 