import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHandHoldingHeart, FaBuilding, FaUsers, FaHistory, FaChartLine } from "react-icons/fa";
import CampaignCard from "../../../../components/cards/CampaignCard";
import { useRole } from "../../../../contexts/RoleContext";
import { mockDonorContributions } from "../../../../utils/mockData";

const OrganizationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userRole } = useRole();
  const organizationId = parseInt(id || "0");
  
  // Mock data for the organization
  const organization = {
    id: organizationId,
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

  // Check if the donor has supported any campaigns from this organization
  const supportedCampaignsFromOrg = mockDonorContributions.supportedCampaigns.filter(
    campaign => campaign.organizationId === organizationId
  );
  
  // Only create donor contributions data if there are supported campaigns
  const donorContributions = supportedCampaignsFromOrg.length > 0 ? {
    totalAmount: supportedCampaignsFromOrg.reduce((sum, campaign) => sum + campaign.donorContribution, 0),
    supportedCampaigns: supportedCampaignsFromOrg.length,
    percentageOfDonors: 4.2, // Mock percentage
    recentDonations: supportedCampaignsFromOrg.map(campaign => ({
      campaignId: campaign.id,
      campaignName: campaign.name,
      amount: campaign.donorContribution,
      date: mockDonorContributions.contributionDetails[campaign.id]?.[0]?.date || "2024-01-01"
    }))
  } : null;
  
  return (
    <div className="p-6 bg-[var(--background)] text-[var(--paragraph)]">
      <div className="max-w-7xl mx-auto">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-[var(--paragraph)] hover:text-[var(--headline)] mb-6"
        >
          <FaArrowLeft />
          Back to Organizations
        </button>
        
        {/* Organization Card */}
        <div className="bg-[var(--main)] rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Organization Header */}
          <div className="bg-gradient-to-r from-[var(--secondary)] to-[var(--tertiary)] p-8 text-white">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-[var(--secondary)] text-4xl font-bold">
                {organization.logo ? <img src={organization.logo} alt={organization.name} /> : organization.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{organization.name}</h1>
                <p className="text-white text-opacity-90">{organization.location}</p>
              </div>
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
            
            {/* Donor-specific contribution section - only show if donor has contributed */}
            {userRole === 'donor' && donorContributions && (
              <div className="mb-8 bg-[var(--background)] p-6 rounded-lg border border-[var(--stroke)]">
                <h3 className="text-lg font-bold mb-4 text-[var(--headline)] flex items-center gap-2">
                  <FaHistory />
                  Your Support for {organization.name}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-[var(--highlight)]">${donorContributions.totalAmount}</div>
                    <div className="text-sm text-[var(--paragraph)]">Total Contributed</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-[var(--secondary)]">{donorContributions.supportedCampaigns}</div>
                    <div className="text-sm text-[var(--paragraph)]">Campaigns Supported</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-center">
                      <FaChartLine className="text-[var(--tertiary)] mr-2" />
                      <div className="text-2xl font-bold text-[var(--tertiary)]">{donorContributions.percentageOfDonors}%</div>
                    </div>
                    <div className="text-sm text-[var(--paragraph)]">Of All Donors</div>
                  </div>
                </div>
                
                <div className="border-t border-[var(--stroke)] pt-4">
                  <h4 className="font-semibold mb-2">Your Supported Campaigns</h4>
                  <div className="space-y-2">
                    {donorContributions.recentDonations.map((donation, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center text-sm p-3 bg-white rounded cursor-pointer hover:bg-[var(--highlight)] hover:bg-opacity-5 transition-colors"
                        onClick={() => navigate(`/charity/${donation.campaignId}`)}
                      >
                        <div>
                          <div className="font-medium">{donation.campaignName}</div>
                          <div className="text-xs text-[var(--paragraph)]">{new Date(donation.date).toLocaleDateString()}</div>
                        </div>
                        <div className="font-semibold text-[var(--highlight)]">${donation.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
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
              <div key={campaign.id} className="relative">
                <CampaignCard
                  id={campaign.id}
                  name={campaign.name}
                  description={campaign.description}
                  goal={campaign.goal}
                  currentContributions={campaign.currentContributions}
                  deadline={campaign.deadline}
                />
                {userRole === 'donor' && mockDonorContributions.supportedCampaigns.some(c => c.id === campaign.id) && (
                  <div className="absolute top-0 right-0 bg-[var(--highlight)] text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-sm font-medium">
                    Your contribution: ${mockDonorContributions.supportedCampaigns.find(c => c.id === campaign.id)?.donorContribution}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetail; 