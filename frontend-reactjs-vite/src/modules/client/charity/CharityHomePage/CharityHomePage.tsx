import React, { useState } from "react";
import CampaignCard from "../../../../components/cards/CampaignCard";
import FundManagement from "./FundManagement/FundManagement";
import VendorManagement from "../Vendor/VendorManagement";
import Announcements from "../profile/components/Announcements"; // Import Announcements
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { mockCampaigns } from "../../../../mocks/campaignData";

const CharityHomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filter campaigns based on the search term
  const filteredCampaigns = mockCampaigns.filter(
    (campaign) =>
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateCampaign = () => {
    navigate("/create-campaign");
  };

  return (
    <div className="p-6 bg-[var(--background)] text-[var(--paragraph)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section: Fund Management */}
        <div className="lg:col-span-3 space-y-6">
          <FundManagement />
        </div>

        {/* Middle Section: Announcements and Campaign Listing */}
        <div className="lg:col-span-6">
          {/* Announcements Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[var(--headline)] mb-4">
              Announcements
            </h2>
            <Announcements />
          </div>

          {/* Header */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-[var(--headline)]">
                Active Campaigns
              </h1>
              <p className="text-[var(--paragraph)]">
                Explore your own active ongoing campaign.
              </p>
            </div>
            <button
              onClick={handleCreateCampaign}
              className="px-4 py-2 bg-[var(--highlight)] text-white rounded-lg shadow-md hover:bg-opacity-90 transition-all"
            >
              Create Campaign
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search campaigns..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Campaign Listing */}
          {filteredCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCampaigns.map((campaign) => (
                <CampaignCard
                  key={campaign.id}
                  id={Number(campaign.id)}
                  name={campaign.title}
                  description={campaign.description}
                  goal={campaign.target_amount}
                  currentContributions={campaign.current_amount}
                  deadline={campaign.deadline}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg">No campaigns found matching your search.</p>
            </div>
          )}
        </div>

        {/* Right Section: Vendor Management */}
        <div className="lg:col-span-3">
          <VendorManagement />
        </div>
      </div>
    </div>
  );
};

export default CharityHomePage;