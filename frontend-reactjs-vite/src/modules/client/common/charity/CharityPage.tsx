import React, { useState } from "react";
import CampaignCard from "../../../../components/cards/CampaignCard";
import { FaHandHoldingHeart, FaBuilding, FaSearch } from "react-icons/fa";
import OrganizationCard from "../../../../components/cards/OrganizationCard";
import { useNavigate } from "react-router-dom";



const CharityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'campaigns' | 'organizations'>('campaigns');
  const [searchTerm, setSearchTerm] = useState('');

  const campaigns = [
    { id: 1, name: "Clean Water Initiative", description: "Providing clean water to communities in need through sustainable infrastructure projects.", goal: 10000, currentContributions: 5000, deadline: "2025-08-31" },
    { id: 2, name: "Education for All", description: "Supporting education programs for underprivileged children around the world.", goal: 20000, currentContributions: 15000, deadline: "2025-03-31" },
    { id: 3, name: "Wildlife Conservation", description: "Protecting endangered species and their habitats through conservation efforts.", goal: 30000, currentContributions: 25000, deadline: "2025-06-27" },
    { id: 4, name: "Hunger Relief", description: "Providing meals and food security to communities facing food insecurity.", goal: 40000, currentContributions: 35000, deadline: "2025-07-27" },
    { id: 5, name: "Medical Aid", description: "Delivering essential medical supplies and healthcare to underserved regions.", goal: 50000, currentContributions: 45000, deadline: "2025-08-27" },
    { id: 6, name: "Disaster Relief", description: "Providing immediate assistance to communities affected by natural disasters.", goal: 60000, currentContributions: 55000, deadline: "2025-09-27" },
    { id: 7, name: "Renewable Energy", description: "Implementing renewable energy solutions in developing communities.", goal: 70000, currentContributions: 65000, deadline: "2025-10-27" },
    { id: 8, name: "Women Empowerment", description: "Supporting programs that empower women through education and economic opportunities.", goal: 80000, currentContributions: 75000, deadline: "2025-11-27" },
    { id: 9, name: "Mental Health Support", description: "Providing mental health resources and support to those in need.", goal: 90000, currentContributions: 85000, deadline: "2025-12-27" },
    { id: 10, name: "Ocean Cleanup", description: "Removing plastic and pollution from oceans to protect marine life.", goal: 100000, currentContributions: 95000, deadline: "2026-01-27" },
  ];

  const organizations = [
    { id: 1, name: "Global Relief", description: "A worldwide organization dedicated to providing humanitarian aid in crisis situations.", logo: "", campaigns: 5, totalRaised: 250000 },
    { id: 2, name: "EduCare", description: "Focused on providing quality education to underprivileged children around the world.", logo: "", campaigns: 3, totalRaised: 180000 },
    { id: 3, name: "Nature First", description: "Committed to protecting wildlife and natural habitats through conservation efforts.", logo: "", campaigns: 4, totalRaised: 320000 },
    { id: 4, name: "Health Alliance", description: "Delivering essential healthcare services to communities with limited access to medical care.", logo: "", campaigns: 6, totalRaised: 420000 },
    { id: 5, name: "Food for All", description: "Working to eliminate hunger and food insecurity in vulnerable communities.", logo: "", campaigns: 2, totalRaised: 150000 },
    { id: 6, name: "Clean Earth Initiative", description: "Focused on environmental conservation and sustainable practices to protect our planet.", logo: "", campaigns: 4, totalRaised: 280000 },
  ];

  const filteredCampaigns = campaigns.filter(campaign => 
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredOrganizations = organizations.filter(org => 
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
      ) : (
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
      )}
    </div>
  );
};

export default CharityPage; 