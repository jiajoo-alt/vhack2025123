import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import VendorChatDetails from "./VendorChatDetails";

const VendorChats: React.FC = () => {
    const navigate = useNavigate();

    const chats = [
        { id: 1, vendorName: "ABC Supplies", lastMessage: "Looking forward to your order.", timestamp: "2 hours ago" },
        { id: 2, vendorName: "XYZ Traders", lastMessage: "Can we confirm the delivery date?", timestamp: "1 day ago" },
        { id: 3, vendorName: "Global Goods", lastMessage: "Thank you for your inquiry.", timestamp: "3 days ago" },
    ];

    const handleChatClick = (id: number) => {
        navigate(`/vendor-chats/${id}`);
    };

    return (
        <div className="pt-4 bg-[var(--main)] p-6 rounded-lg shadow-xl border border-[var(--stroke)]">
            <Routes>
                {/* Chat List */}
                <Route
                    path="/"
                    element={
                        <div>
                            <h2 className="text-2xl font-bold text-[var(--headline)] mb-4">Vendor Chats</h2>
                            <div className="divide-y divide-[var(--stroke)]">
                                {chats.map((chat) => (
                                    <div
                                        key={chat.id}
                                        onClick={() => handleChatClick(chat.id)}
                                        className="flex items-center space-x-4 py-4 cursor-pointer hover:bg-[var(--card-hover)] transition-all"
                                    >
                                        <FaUserCircle className="text-[var(--highlight)] w-10 h-10" />
                                        <div className="flex-1">
                                            <p className="text-[var(--headline)] font-semibold">{chat.vendorName}</p>
                                            <p className="text-sm text-[var(--paragraph)]">{chat.lastMessage}</p>
                                            <p className="text-xs text-gray-500 mt-1">{chat.timestamp}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                />

                {/* Chat Details */}
                <Route path=":id" element={<VendorChatDetails />} />
            </Routes>
        </div>
    );
};

export default VendorChats;