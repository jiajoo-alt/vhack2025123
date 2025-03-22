import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaUserCircle, FaPaperPlane, FaPaperclip } from "react-icons/fa";
import { useVendorChatStore } from "../../../../services/VendorChatService";

interface ChatModalProps {
  chatId: number;
  onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ chatId, onClose }) => {
  const { chats, messages, sendMessage } = useVendorChatStore();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Find the current chat
  const currentChat = chats.find(chat => chat.id === chatId);
  
  // Get messages for this chat
  const chatMessages = messages[chatId] || [];
  
  // Scroll to bottom of messages on load and when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && chatId) {
      sendMessage(chatId, newMessage);
      setNewMessage("");
    }
  };
  
  if (!currentChat) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--main)] rounded-lg shadow-2xl border border-[var(--stroke)] w-full max-w-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-[var(--stroke)] flex items-center justify-between">
          <div className="flex items-center">
            <FaUserCircle className="text-[var(--highlight)] w-10 h-10 mr-3" />
            <div>
              <h2 className="text-lg font-bold text-[var(--headline)]">{currentChat.vendorName}</h2>
              <p className="text-xs text-gray-500">
                {currentChat.online ? "Online" : "Offline"}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--background)] transition-all"
          >
            <FaTimes />
          </button>
        </div>
        
        {/* Messages Container */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4 bg-[var(--background)]">
          {chatMessages.map((message, index) => (
            <div 
              key={index}
              className={`flex ${message.fromVendor ? "justify-start" : "justify-end"}`}
            >
              <div 
                className={`max-w-[70%] p-3 rounded-lg ${
                  message.fromVendor 
                    ? "bg-[var(--card-background)] text-[var(--paragraph)] rounded-tl-none" 
                    : "bg-[var(--highlight)] text-white rounded-tr-none"
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs mt-1 opacity-70 text-right">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          
          {chatMessages.length === 0 && (
            <div className="h-full flex items-center justify-center">
              <p className="text-gray-500">No messages yet. Start the conversation!</p>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--stroke)] flex">
          <button 
            type="button"
            className="p-2 text-gray-500 hover:text-[var(--highlight)] transition-all"
          >
            <FaPaperclip />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-[var(--background)] border border-[var(--stroke)] rounded-full mx-2 focus:outline-none focus:ring-2 focus:ring-[var(--highlight)]"
          />
          <button 
            type="submit"
            disabled={!newMessage.trim()}
            className={`p-2 rounded-full ${
              newMessage.trim() 
                ? "bg-[var(--highlight)] text-white" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatModal; 