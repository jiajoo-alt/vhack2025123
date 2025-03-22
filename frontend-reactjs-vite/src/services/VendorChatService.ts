// This service will provide consistent chat data across components
import { create } from 'zustand';

export interface ChatMessage {
    id: number;
    sender: string;
    text: string;
    timestamp: string;
    status?: 'sent' | 'delivered' | 'read';
}

export interface Chat {
    id: number;
    vendorName: string;
    lastMessage: string;
    timestamp: string;
    unread: number;
    online: boolean;
    avatar: string | null;
    messages: ChatMessage[];
}

interface ChatState {
    chats: Chat[];
    addMessage: (chatId: number, message: Omit<ChatMessage, 'id'>) => void;
    markAsRead: (chatId: number) => void;
}

// Initial chat data
const initialChats: Chat[] = [
    {
        id: 1,
        vendorName: "ABC Supplies",
        lastMessage: "Looking forward to your order.",
        timestamp: "2 hours ago",
        unread: 2,
        online: true,
        avatar: null,
        messages: [
            { id: 1, sender: "Vendor", text: "Hello! How can I assist you today?", timestamp: "10:30 AM" },
            { id: 2, sender: "You", text: "I'm interested in ordering some supplies for our upcoming campaign.", timestamp: "10:32 AM", status: 'read' },
            { id: 3, sender: "Vendor", text: "Great! We have a wide range of supplies available. Could you specify what you're looking for?", timestamp: "10:33 AM" },
            { id: 4, sender: "You", text: "We need water filters, about 100 units.", timestamp: "10:35 AM", status: 'read' },
            { id: 5, sender: "Vendor", text: "Perfect! We have those in stock. Would you like me to send you a quote?", timestamp: "10:36 AM" },
            { id: 6, sender: "You", text: "Yes, please. And could you include delivery options?", timestamp: "10:38 AM", status: 'delivered' },
            { id: 7, sender: "Vendor", text: "Absolutely! I'll prepare that for you right away.", timestamp: "10:40 AM" },
        ],
    },
    {
        id: 2,
        vendorName: "XYZ Traders",
        lastMessage: "Can we confirm the delivery date?",
        timestamp: "1 day ago",
        unread: 0,
        online: false,
        avatar: null,
        messages: [
            { id: 1, sender: "Vendor", text: "Hi! Can we confirm the delivery date?", timestamp: "Yesterday, 3:45 PM" },
            { id: 2, sender: "You", text: "Sure, let me check and get back to you.", timestamp: "Yesterday, 4:00 PM", status: 'read' },
            { id: 3, sender: "Vendor", text: "Thank you, we need to schedule our logistics.", timestamp: "Yesterday, 4:05 PM" },
            { id: 4, sender: "You", text: "We're looking at next Tuesday. Would that work?", timestamp: "Yesterday, 4:30 PM", status: 'read' },
        ],
    },
    {
        id: 3,
        vendorName: "Global Goods",
        lastMessage: "Thank you for your inquiry.",
        timestamp: "3 days ago",
        unread: 1,
        online: true,
        avatar: null,
        messages: [
            { id: 1, sender: "Vendor", text: "Thank you for your inquiry.", timestamp: "Monday, 9:15 AM" },
            { id: 2, sender: "You", text: "You're welcome! Let me know if you need anything else.", timestamp: "Monday, 9:20 AM", status: 'read' },
            { id: 3, sender: "Vendor", text: "I've attached our catalog for your review.", timestamp: "Monday, 9:25 AM" },
        ],
    },
];

export const useVendorChatStore = create<ChatState>((set) => ({
    chats: initialChats,
    
    addMessage: (chatId, message) => set((state) => {
        const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
        if (chatIndex === -1) return state;
        
        const chat = state.chats[chatId - 1];
        const newMessage = {
            ...message,
            id: chat.messages.length + 1,
        };
        
        const updatedChats = [...state.chats];
        updatedChats[chatIndex] = {
            ...chat,
            lastMessage: message.text,
            timestamp: message.sender === "You" ? "Just now" : "Just now",
            messages: [...chat.messages, newMessage],
            unread: message.sender === "Vendor" ? chat.unread + 1 : chat.unread,
        };
        
        return { chats: updatedChats };
    }),
    
    markAsRead: (chatId) => set((state) => {
        const chatIndex = state.chats.findIndex(chat => chat.id === chatId);
        if (chatIndex === -1) return state;
        
        const updatedChats = [...state.chats];
        updatedChats[chatIndex] = {
            ...updatedChats[chatIndex],
            unread: 0,
        };
        
        return { chats: updatedChats };
    }),
})); 