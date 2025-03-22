import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle, FaCircle, FaPaperclip, FaSmile, FaPaperPlane, FaEllipsisV, FaCheck, FaCheckDouble } from "react-icons/fa";
import { useVendorChatStore } from "../../../../services/VendorChatService";

const VendorChatDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { chats, addMessage, markAsRead } = useVendorChatStore();
    
    const chatId = parseInt(id || "0");
    const chat = chats.find(c => c.id === chatId) || {
        id: 0,
        vendorName: "Unknown Vendor",
        online: false,
        lastMessage: "",
        timestamp: "",
        unread: 0,
        avatar: null,
        messages: [{ id: 0, sender: "System", text: "This is a fake message for demonstration purposes.", timestamp: "Unknown" }],
    };

    const [newMessage, setNewMessage] = useState("");
    
    // Mark messages as read when viewing the chat
    useEffect(() => {
        if (chatId > 0 && chat.unread > 0) {
            markAsRead(chatId);
        }
    }, [chatId, chat.unread, markAsRead]);

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat.messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;
        
        // Add message to the store
        addMessage(chatId, {
            sender: "You", 
            text: newMessage, 
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            status: 'sent'
        });
        
        setNewMessage("");
        
        // Simulate received message after a delay (for demo purposes)
        if (Math.random() > 0.5) {
            setTimeout(() => {
                const responses = [
                    "Thanks for the information!",
                    "I'll check with our team and get back to you.",
                    "That sounds good to me.",
                    "Let me confirm that with our logistics department.",
                    "Perfect! We'll proceed with that."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                
                addMessage(chatId, {
                    sender: "Vendor",
                    text: randomResponse,
                    timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                });
            }, 2000);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleQuit = () => {
        // Always navigate back to the main vendor chats page
        navigate('/Vhack-2025/charity/vendor-chats');
    };

    // Group messages by date
    const groupMessagesByDate = () => {
        const groups: {date: string; messages: typeof chat.messages}[] = [];
        let currentDate = '';
        let currentGroup: typeof chat.messages = [];
        
        chat.messages.forEach(message => {
            // This is simplified - in a real app, you'd parse the timestamp properly
            const messageDate = message.timestamp.includes(',') 
                ? message.timestamp.split(',')[0] 
                : 'Today';
                
            if (messageDate !== currentDate) {
                if (currentGroup.length > 0) {
                    groups.push({date: currentDate, messages: currentGroup});
                }
                currentDate = messageDate;
                currentGroup = [message];
            } else {
                currentGroup.push(message);
            }
        });
        
        if (currentGroup.length > 0) {
            groups.push({date: currentDate, messages: currentGroup});
        }
        
        return groups;
    };

    const messageGroups = groupMessagesByDate();

    return (
        <div className="flex flex-col h-[600px] bg-[var(--background)]">
            {/* Chat Header */}
            <div className="p-4 border-b border-[var(--stroke)] flex justify-between items-center bg-[var(--main)]">
                <div className="flex items-center">
                    <button
                        onClick={handleQuit}
                        className="mr-3 text-[var(--headline)] hover:text-[var(--highlight)] transition-all"
                    >
                        <FaArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center">
                        <div className="relative mr-3">
                            <FaUserCircle className="text-[var(--highlight)] w-10 h-10" />
                            {chat.online && (
                                <FaCircle className="absolute bottom-0 right-0 text-green-500 text-xs" />
                            )}
                        </div>
                        <div>
                            <h2 className="font-semibold text-[var(--headline)]">{chat.vendorName}</h2>
                            <p className="text-xs text-gray-500">
                                {chat.online ? 'Online' : 'Offline'}
                            </p>
                        </div>
                    </div>
                </div>
                <button className="text-[var(--paragraph)] hover:text-[var(--headline)]">
                    <FaEllipsisV />
                </button>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-[var(--background)] bg-opacity-50">
                {messageGroups.map((group, groupIndex) => (
                    <div key={groupIndex} className="mb-4">
                        <div className="text-center mb-4">
                            <span className="px-2 py-1 bg-[var(--stroke)] bg-opacity-20 rounded-full text-xs text-[var(--paragraph)]">
                                {group.date}
                            </span>
                        </div>
                        
                        {group.messages.map((message, index) => {
                            const isUser = message.sender === "You";
                            const showAvatar = index === 0 || group.messages[index - 1].sender !== message.sender;
                            
                            return (
                                <div 
                                    key={message.id} 
                                    className={`flex mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    {!isUser && showAvatar && (
                                        <div className="self-end mr-2">
                                            <FaUserCircle className="text-[var(--highlight)] w-8 h-8" />
                                        </div>
                                    )}
                                    
                                    <div className={`max-w-[70%] ${!isUser && !showAvatar ? 'ml-10' : ''}`}>
                                        <div 
                                            className={`p-3 rounded-lg shadow-sm ${
                                                isUser 
                                                    ? 'bg-[var(--highlight)] text-white rounded-br-none' 
                                                    : 'bg-[var(--main)] text-[var(--paragraph)] rounded-bl-none'
                                            }`}
                                        >
                                            <p className="text-sm">{message.text}</p>
                                        </div>
                                        
                                        <div className={`flex items-center mt-1 text-xs text-gray-500 ${isUser ? 'justify-end' : 'justify-start'}`}>
                                            <span>{message.timestamp}</span>
                                            {isUser && message.status && (
                                                <span className="ml-1">
                                                    {message.status === 'sent' && <FaCheck />}
                                                    {message.status === 'delivered' && <FaCheckDouble />}
                                                    {message.status === 'read' && <FaCheckDouble className="text-blue-500" />}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-3 border-t border-[var(--stroke)] bg-[var(--main)]">
                <div className="flex items-center">
                    <button className="p-2 text-[var(--paragraph)] hover:text-[var(--highlight)]">
                        <FaPaperclip />
                    </button>
                    <div className="flex-1 mx-2">
                        <textarea
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            className="w-full p-3 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] max-h-20 min-h-[44px] resize-none"
                            rows={1}
                        />
                    </div>
                    <button className="p-2 text-[var(--paragraph)] hover:text-[var(--highlight)]">
                        <FaSmile />
                    </button>
                    <button
                        onClick={handleSendMessage}
                        disabled={newMessage.trim() === ""}
                        className={`ml-2 p-2 rounded-full ${
                            newMessage.trim() === "" 
                                ? "bg-gray-200 text-gray-400" 
                                : "bg-[var(--highlight)] text-white hover:bg-opacity-90"
                        } transition-all`}
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VendorChatDetails;