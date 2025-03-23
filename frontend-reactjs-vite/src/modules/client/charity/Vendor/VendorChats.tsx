import React, { useState } from "react";
import { FaUserCircle, FaCircle, FaSearch, FaPlus } from "react-icons/fa";
import { useVendorChatStore } from "../../../../services/VendorChatService";
import ChatModal from "./ChatModal";

interface VendorChatsProps {
  limit?: number;
}

const VendorChats: React.FC<VendorChatsProps> = ({ limit }) => {
  const { chats } = useVendorChatStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  
  // Filter and sort chats
  const filteredChats = chats.filter(chat => 
    chat.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedChats = [...filteredChats].sort((a, b) => {
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
      return 0;
    };
    
    return getTimeValue(b.timestamp) - getTimeValue(a.timestamp);
  });
  
  const displayedChats = limit ? sortedChats.slice(0, limit) : sortedChats;
  
  return (
    <div className="bg-[var(--main)] p-6 rounded-lg shadow-xl border border-[var(--stroke)]">
      <h2 className="text-xl font-bold text-[var(--headline)] mb-4">Vendor Chats</h2>
      
      {displayedChats.length > 0 ? (
        <div className="space-y-4">
          {displayedChats.map(chat => (
            <div 
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className="bg-[var(--card-background)] p-4 rounded-lg shadow-md border border-[var(--card-border)] flex items-center cursor-pointer hover:bg-opacity-90 transition-all"
            >
              <div className="relative mr-3">
                <FaUserCircle className="text-[var(--highlight)] w-10 h-10" />
                {chat.online && (
                  <FaCircle className="absolute bottom-0 right-0 text-green-500 text-xs" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-[var(--headline)]">{chat.vendorName}</h3>
                  <span className="text-xs text-gray-500">{chat.timestamp}</span>
                </div>
                <p className="text-sm text-[var(--paragraph)] truncate">{chat.lastMessage}</p>
              </div>
              {chat.unread > 0 && (
                <span className="bg-[var(--highlight)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                  {chat.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No chats available</p>
      )}
      
      {activeChatId !== null && (
        <ChatModal 
          chatId={activeChatId} 
          onClose={() => setActiveChatId(null)} 
        />
      )}
    </div>
  );
};

export default VendorChats;
