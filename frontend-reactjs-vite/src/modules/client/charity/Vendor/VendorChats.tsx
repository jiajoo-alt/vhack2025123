import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaCircle } from "react-icons/fa";
import { useVendorChatStore } from "../../../../services/VendorChatService";

interface VendorChatsProps {
  limit?: number;
}

const VendorChats: React.FC<VendorChatsProps> = ({ limit }) => {
  const navigate = useNavigate();
  const { chats } = useVendorChatStore();
  
  // Sort chats by recency (most recent first)
  const sortedChats = [...chats].sort((a, b) => {
    // Convert relative timestamps to comparable values
    // This is a simplified approach - in a real app, you'd use actual timestamps
    const getTimeValue = (timestamp: string) => {
      if (timestamp.includes("Just now")) return Date.now();
      if (timestamp.includes("hour")) {
        const hours = parseInt(timestamp.split(" ")[0]);
        return Date.now() - hours * 60 * 60 * 1000;
      }
      if (timestamp.includes("day")) {
        const days = parseInt(timestamp.split(" ")[0]);
        return Date.now() - days * 24 * 60 * 60 * 1000;
      }
      return 0; // fallback
    };
    
    return getTimeValue(b.timestamp) - getTimeValue(a.timestamp);
  });
  
  // Limit the number of chats if specified
  const displayedChats = limit ? sortedChats.slice(0, limit) : sortedChats;

  const handleChatClick = (id: number) => {
    navigate(`/Vhack-2025/charity/vendor-chats/${id}`);
  };

  return (
    <div className="bg-[var(--main)] rounded-lg shadow-xl border border-[var(--stroke)] overflow-hidden">
      <div className="p-4 border-b border-[var(--stroke)]">
        <h2 className="text-xl font-bold text-[var(--headline)]">Vendor Chats</h2>
      </div>
      
      <div className="divide-y divide-[var(--stroke)]">
        {displayedChats.length > 0 ? (
          displayedChats.map((chat) => (
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
            No vendor chats available
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorChats;