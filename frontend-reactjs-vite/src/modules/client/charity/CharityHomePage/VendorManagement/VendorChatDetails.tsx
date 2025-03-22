import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const VendorChatDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const chatDetails: Record<number, { vendorName: string; messages: { sender: string; text: string }[] }> = {
        1: {
            vendorName: "ABC Supplies",
            messages: [
                { sender: "Vendor", text: "Hello! How can I assist you today?" },
                { sender: "You", text: "Looking forward to your order." },
                { sender: "Vendor", text: "Great! Let me know if you need anything else." },
            ],
        },
        2: {
            vendorName: "XYZ Traders",
            messages: [
                { sender: "Vendor", text: "Hi! Can we confirm the delivery date?" },
                { sender: "You", text: "Sure, let me check and get back to you." },
            ],
        },
        3: {
            vendorName: "Global Goods",
            messages: [
                { sender: "Vendor", text: "Thank you for your inquiry." },
                { sender: "You", text: "You're welcome! Let me know if you need anything else." },
            ],
        },
    };

    const chat = chatDetails[parseInt(id || "0")] || {
        vendorName: "Unknown Vendor",
        messages: [{ sender: "System", text: "This is a fake message for demonstration purposes." }],
    };

    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState(chat.messages);

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;
        setMessages([...messages, { sender: "You", text: newMessage }]);
        setNewMessage("");
    };

    const handleQuit = () => {
        navigate("/Vhack-2025");
    };

    return (
        <div className="p-6 bg-[var(--background)] text-[var(--paragraph)] max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={handleQuit}
                    className="flex items-center space-x-2 text-[var(--headline)] hover:text-[var(--highlight)] transition-all"
                >
                    <FaArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>
                <h2 className="text-2xl font-bold text-[var(--headline)]">{chat.vendorName}</h2>
            </div>
            <div className="bg-[var(--card-background)] p-4 rounded-lg shadow-md border border-[var(--stroke)] h-[500px] overflow-y-auto space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`p-3 rounded-lg shadow-sm ${
                            message.sender === "You"
                                ? "bg-[var(--highlight)] text-white text-right ml-auto max-w-[70%]"
                                : "bg-gray-100 text-left mr-auto max-w-[70%]"
                        }`}
                    >
                        <p className="text-sm">{message.text}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)]"
                />
                <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-[var(--highlight)] text-white rounded-lg shadow-md hover:bg-opacity-90 transition-all"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default VendorChatDetails;