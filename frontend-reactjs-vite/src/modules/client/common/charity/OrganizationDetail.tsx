import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHandHoldingHeart, FaBuilding, FaUsers } from "react-icons/fa";
import CampaignCard from "../../../../components/cards/CampaignCard";

const OrganizationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Mock data for the organization
  const organization = {
    id: parseInt(id || "0"),
    name: id === "1" ? "Global Relief" : 
          id === "2" ? "EduCare" : 
          id === "3" ? "Nature First" : 
          id === "4" ? "Health Alliance" : 
          id === "5" ? "Food for All" : 
          id === "6" ? "Clean Earth Initiative" : `Organization ${id}`,
    description: "This organization is dedicated to making a positive impact through various initiatives and campaigns. They work with communities around the world to address pressing issues and create sustainable solutions.",
    logo: "",
    founded: "2010",
    location: "New York, USA",
    website: "www.organization.org",
    totalRaised: id === "1" ? 250000 : 
                id === "2" ? 180000 : 
                id === "3" ? 320000 : 
                id === "4" ? 420000 : 
                id === "5" ? 150000 : 
                id === "6" ? 280000 : 200000,
    campaigns: id === "1" ? 5 : 
              id === "2" ? 3 : 
              id === "3" ? 4 : 
              id === "4" ? 6 : 
              id === "5" ? 2 : 
              id === "6" ? 4 : 3,
  };
  
  // Mock data for organization's campaigns
  const orgCampaigns = Array.from({ length: organization.campaigns }, (_, i) => ({
    id: 100 + i,
    name: `${organization.name} Campaign ${i + 1}`,
    description: `This is a campaign by ${organization.name} focused on addressing specific needs in target communities.`,
    goal: 20000 + (i * 10000),
    currentContributions: 15000 + (i * 5000),
    deadline: "2025-08-31",
  }));

  return (
    <div className="p-4 bg-[var(--background)] text-[var(--paragraph)] max-w-5xl mx-auto">
      <button 
        className="flex items-center gap-2 text-[var(--headline)] hover:text-[var(--highlight)] transition-colors mb-6"
        onClick={() => navigate("/charity")}
      >
        <FaArrowLeft />
        <span>Back to Organizations</span>
      </button>
      
      <div className="bg-[var(--main)] rounded-xl shadow-xl border border-[var(--stroke)] overflow-hidden mb-8">
        {/* Header with decorative element */}
        <div className="relative bg-gradient-to-r from-[var(--secondary)] to-[var(--tertiary)] h-32 flex items-end">
          <div className="absolute inset-0 bg-opacity-30 bg-[var(--stroke)]"></div>
          <div className="p-6 relative z-10 flex items-center gap-4 w-full">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-[var(--headline)] text-3xl font-bold overflow-hidden border-4 border-white">
              {organization.logo ? <img src={organization.logo} alt={organization.name} className="w-full h-full object-cover" /> : organization.name.charAt(0)}
            </div>
            <h1 className="text-3xl font-bold text-white">{organization.name}</h1>
          </div>
        </div>
        
        <div className="p-6">
          {/* Organization stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[var(--background)] p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <FaBuilding className="text-[var(--secondary)] text-xl" />
                <h3 className="font-semibold">Founded</h3>
              </div>
              <p className="text-2xl font-bold">{organization.founded}</p>
              <p className="text-sm">{organization.location}</p>
            </div>
            
            <div className="bg-[var(--background)] p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <FaHandHoldingHeart className="text-[var(--highlight)] text-xl" />
                <h3 className="font-semibold">Total Raised</h3>
              </div>
              <p className="text-2xl font-bold">${organization.totalRaised.toLocaleString()}</p>
              <p className="text-sm">across all campaigns</p>
            </div>
            
            <div className="bg-[var(--background)] p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <FaUsers className="text-[var(--tertiary)] text-xl" />
                <h3 className="font-semibold">Active Campaigns</h3>
              </div>
              <p className="text-2xl font-bold">{organization.campaigns}</p>
              <p className="text-sm">ongoing initiatives</p>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[var(--headline)]">About this organization</h2>
            <p className="leading-relaxed">{organization.description}</p>
          </div>
          
          {/* Organization details */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Location:</p>
              <p>{organization.location}</p>
            </div>
            <div>
              <p className="font-semibold">Website:</p>
              <p>{organization.website}</p>
            </div>
          </div>
          
          {/* Donation button */}
          <div className="flex justify-center mt-8">
            <button className="button flex items-center gap-2 px-8 py-3 text-lg">
              <FaHandHoldingHeart />
              Support This Organization
            </button>
          </div>
        </div>
      </div>
      
      {/* Organization's campaigns */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-[var(--headline)]">Campaigns by {organization.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orgCampaigns.map(campaign => (
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
      </div>
    </div>
  );
};

export default OrganizationDetail; 