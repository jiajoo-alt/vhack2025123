import React, { useState } from "react";
import CampaignCard from "../../../../components/cards/CampaignCard";
import { FaHandHoldingHeart, FaBuilding, FaSearch, FaHistory } from "react-icons/fa";
import OrganizationCard from "../../../../components/cards/OrganizationCard";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../../../contexts/RoleContext";
import DonorSupportedCampaigns from "./DonorSupportedCampaigns";
import { mockCampaigns, mockOrganizations } from "../../../../utils/mockData";

const CharityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'organizations' | 'supported'>('campaigns');
  const [searchTerm, setSearchTerm] = useState('');
  const { userRole } = useRole();
  const navigate = useNavigate();

  const filteredCampaigns = mockCampaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrganizations = mockOrganizations.filter(org => 
    org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    org.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-[var(--background)] text-[var(--paragraph)] max-w-7xl mx-auto">
      {/* Header with decorative element */}
      <div className="relative bg-gradient-to-r from-[var(--highlight)] to-[var(--secondary)] rounded-lg mb-6 overflow-hidden">
        <div className="absolute inset-0 bg-opacity-30 bg-[var(--stroke)]"></div>
        <div className="relative z-10 p-8">
          <h1 className="text-3xl font-bold text-white mb-2">Charity Hub</h1>
          <p className="text-white text-opacity-90 max-w-2xl">Support causes you care about and make a difference in the world through our verified charity campaigns and organizations.</p>
        </div>
      </div>
      
      {/* Search bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search campaigns or organizations..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* Tab navigation */}
      <div className="flex border-b border-gray-300 mb-6">
        <button
          className={`px-6 py-3 font-semibold flex items-center gap-2 transition-colors ${
            activeTab === 'campaigns'
              ? 'text-[var(--highlight)] border-b-2 border-[var(--highlight)]'
              : 'text-[var(--paragraph)] hover:text-[var(--headline)]'
          }`}
          onClick={() => setActiveTab('campaigns')}
        >
          <FaHandHoldingHeart />
          Campaigns
        </button>
        <button
          className={`px-6 py-3 font-semibold flex items-center gap-2 transition-colors ${
            activeTab === 'organizations'
              ? 'text-[var(--highlight)] border-b-2 border-[var(--highlight)]'
              : 'text-[var(--paragraph)] hover:text-[var(--headline)]'
          }`}
          onClick={() => setActiveTab('organizations')}
        >
          <FaBuilding />
          Organizations
        </button>
        
        {userRole === 'donor' && (
          <button
            className={`px-6 py-3 font-semibold flex items-center gap-2 transition-colors ${
              activeTab === 'supported'
                ? 'text-[var(--highlight)] border-b-2 border-[var(--highlight)]'
                : 'text-[var(--paragraph)] hover:text-[var(--headline)]'
            }`}
            onClick={() => setActiveTab('supported')}
          >
            <FaHistory />
            My Supported
          </button>
        )}
      </div>
      
      {/* Content based on active tab */}
      {activeTab === 'campaigns' ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-[var(--headline)]">Active Campaigns</h2>
          {filteredCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </>
      ) : activeTab === 'organizations' ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-[var(--headline)]">Charity Organizations</h2>
          {filteredOrganizations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOrganizations.map((org) => (
                <OrganizationCard
                  key={org.id}
                  id={org.id}
                  name={org.name}
                  description={org.description}
                  logo={org.logo}
                  campaigns={org.campaigns}
                  totalRaised={org.totalRaised}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-lg">No organizations found matching your search.</p>
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-[var(--headline)]">My Supported Campaigns</h2>
          <DonorSupportedCampaigns />
        </>
      )}
    </div>
  );
};

export default CharityPage; 