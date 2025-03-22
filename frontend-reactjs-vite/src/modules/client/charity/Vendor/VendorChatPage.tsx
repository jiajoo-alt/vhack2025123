import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSearch, FaCircle, FaPlus } from "react-icons/fa";
import VendorChatDetails from "./VendorChatDetails";
import { useVendorChatStore } from "../../../../services/VendorChatService";

const VendorChatPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const { chats } = useVendorChatStore();

  const filteredChats = chats.filter(chat => 
    chat.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatClick = (id: number) => {
    navigate(`/Vhack-2025/charity/vendor-chats/${id}`);
  };

  return (
    <div className="p-6 bg-[var(--background)] text-[var(--paragraph)] max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-[var(--headline)] mb-6">Vendor Chats</h1>
      
      <div className="bg-[var(--main)] rounded-lg shadow-xl border border-[var(--stroke)] overflow-hidden">
        <div className="flex h-[700px]">
          {/* Sidebar - Chat List */}
          <div className="w-1/3 border-r border-[var(--stroke)]">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-[var(--stroke)] flex justify-between items-center">
                <h2 className="text-xl font-bold text-[var(--headline)]">Messages</h2>
                <button className="p-2 text-[var(--highlight)] hover:bg-[var(--highlight)] hover:bg-opacity-10 rounded-full transition-all">
                  <FaPlus />
                </button>
              </div>
              
              {/* Search Bar */}
              <div className="px-4 py-3 border-b border-[var(--stroke)]">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search vendors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-[var(--background)] border border-[var(--stroke)] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[var(--highlight)]"
                  />
                </div>
              </div>
              
              {/* Chat List */}
              <div className="overflow-y-auto flex-1">
                {filteredChats.length > 0 ? (
                  filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      onClick={() => handleChatClick(chat.id)}
                      className="flex items-center p-4 cursor-pointer transition-all"
                    >
                      <div className="relative mr-3">
                        <FaUserCircle className="text-[var(--highlight)] w-12 h-12" />
                        {chat.online && (
                          <FaCircle className="absolute bottom-0 right-0 text-green-500 text-xs" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className={`font-medium truncate ${
                            chat.unread > 0 ? "text-[var(--headline)] font-semibold" : "text-[var(--paragraph)]"
                          }`}>
                            {chat.vendorName}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {chat.timestamp}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm truncate text-gray-500 max-w-[80%]">
                            {chat.lastMessage}
                          </p>
                          {chat.unread > 0 && (
                            <span className="bg-[var(--highlight)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {chat.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No vendors found
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Main Content - Chat or Welcome Screen */}
          <div className="w-2/3">
            <Routes>
              <Route path="/" element={
                <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-[var(--highlight)] bg-opacity-10 flex items-center justify-center mb-4">
                    <FaUserCircle className="text-[var(--highlight)] w-10 h-10" />
                  </div>
                  <h2 className="text-xl font-bold text-[var(--headline)] mb-2">Your Vendor Messages</h2>
                  <p className="text-[var(--paragraph)] max-w-md mb-6">
                    Select a conversation from the list or start a new chat with a vendor.
                  </p>
                  <button className="px-4 py-2 bg-[var(--highlight)] text-white rounded-lg shadow-md hover:bg-opacity-90 transition-all flex items-center gap-2">
                    <FaPlus /> New Conversation
                  </button>
                </div>
              } />
              <Route path=":id" element={<VendorChatDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorChatPage; 