import React from "react";
import VendorChats from "./VendorChats";
import PurchaseRequest from "./PurchaseRequest";

const VendorManagement: React.FC = () => {
  return (
    <div className="pt-0.1 bg-[var(--background)] text-[var(--paragraph)] max-w-7xl mx-auto space-y-6">
      {/* Vendor Chats Section */}
      <VendorChats />

      {/* Purchase Requests Section */}
      <PurchaseRequest />
    </div>
  );
};

export default VendorManagement;