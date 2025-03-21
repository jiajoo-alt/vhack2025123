import React, { useState } from "react";
import CampaignCard from "../../../../components/cards/CampaignCard";
import FundManagement from "./FundManagement/FundManagement"; // Import FundManagement
import { FaSearch } from "react-icons/fa";

const CharityHomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for campaigns
  const campaigns = [
    {
      id: 1,
      name: "Clean Water Initiative",
      description: "Providing clean water to communities in need.",
      goal: 10000,
      currentContributions: 5000,
      deadline: "2025-08-31",
    },
    {
      id: 2,
      name: "Education for All",
      description: "Supporting education programs for underprivileged children.",
      goal: 20000,
      currentContributions: 15000,
      deadline: "2025-03-31",
    },
    {
      id: 3,
      name: "Wildlife Conservation",
      description: "Protecting endangered species and their habitats.",
      goal: 30000,
      currentContributions: 25000,
      deadline: "2025-06-27",
    },
    {
      id: 4,
      name: "Hunger Relief",
      description: "Providing meals to communities facing food insecurity.",
      goal: 40000,
      currentContributions: 35000,
      deadline: "2025-07-27",
    },
  ];

  // Filter campaigns based on the search term
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[var(--background)] text-[var(--paragraph)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Section: Fund Management */}
        <div className="lg:col-span-3">
          <FundManagement />
        </div>

        {/* Middle Section: Campaign Listing */}
        <div className="lg:col-span-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[var(--headline)]">
              Active Campaigns
            </h1>
            <p className="text-[var(--paragraph)]">
              Explore and support active charity campaigns.
            </p>
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
                  id={campaign.id}
                  name={campaign.name}
                  description={campaign.description}
                  goal={campaign.goal}
                  currentContributions={campaign.currentContributions}
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

        {/* Right Section: Placeholder or Additional Content */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-bold text-[var(--headline)]">
              Additional Content
            </h3>
            <p className="text-[var(--paragraph)]">
              This section can be used for additional information, links, or
              widgets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityHomePage;