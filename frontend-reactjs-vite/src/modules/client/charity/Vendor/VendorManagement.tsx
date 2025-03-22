import React from "react";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import VendorChats from "./VendorChats";
import PurchaseRequest from "./PurchaseRequest";

const VendorManagement: React.FC = () => {
  return (
    <div className="pt-0.1 bg-[var(--background)] text-[var(--paragraph)] max-w-7xl mx-auto space-y-6">
      <div className="relative">
        <VendorChats limit={3} />
        <Link 
          to="/Vhack-2025/charity/vendor-chats" 
          className="absolute top-6 right-6 text-[var(--highlight)] hover:underline flex items-center gap-1 text-sm"
        >
          View All <FaExternalLinkAlt size={12} />
        </Link>
      </div>

      {/* Purchase Requests Section */}
      <PurchaseRequest />
    </div>
  );
};

export default VendorManagement;