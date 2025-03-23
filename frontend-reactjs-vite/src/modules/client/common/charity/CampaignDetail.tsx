import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMoneyBillWave, FaArrowLeft, FaHandHoldingHeart, FaUsers, FaChartLine, FaHistory, FaBuilding } from "react-icons/fa";
import { useRole } from "../../../../contexts/RoleContext";
import { mockCampaigns, mockDonorContributions, mockOrganizations } from "../../../../utils/mockData";

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userRole } = useRole();
  const campaignId = parseInt(id || "0");

  // Find the campaign from our centralized mock data
  const campaign = mockCampaigns.find(c => c.id === campaignId);
  
  // If campaign not found, show error or redirect
  if (!campaign) {
    return (
      <div className="p-6 bg-[var(--background)] text-[var(--paragraph)]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Campaign not found</h1>
          <button 
            onClick={() => navigate('/charity')} 
            className="button flex items-center gap-2 px-6 py-2 mx-auto"
          >
            <FaArrowLeft />
            Back to Campaigns
          </button>
        </div>
      </div>
    );
  }

  // Find the organization for this campaign
  const organization = mockOrganizations.find(org => org.id === campaign.organizationId);

  // Check if the donor has contributed to this campaign
  const supportedCampaign = mockDonorContributions.supportedCampaigns.find(
    (c) => c.id === campaignId
  );
  
  // Get donor contribution details if they exist
  const donorContribution = supportedCampaign ? {
    totalAmount: supportedCampaign.donorContribution,
    contributions: mockDonorContributions.contributionDetails[campaignId] || [],
    percentageOfTotal: ((supportedCampaign.donorContribution / campaign.currentContributions) * 100).toFixed(1)
  } : null;

  const progress = (campaign.currentContributions / campaign.goal) * 100;
  const timeLeft = Math.max(0, Math.floor((new Date(campaign.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="p-6 bg-[var(--background)] text-[var(--paragraph)]">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-[var(--paragraph)] hover:text-[var(--headline)] mb-6"
        >
          <FaArrowLeft />
          Back to Campaigns
        </button>
        
        {/* Campaign Card */}
        <div className="bg-[var(--main)] rounded-xl shadow-lg overflow-hidden mb-8">
          {/* Campaign Header */}
          <div className="bg-gradient-to-r from-[var(--highlight)] to-[var(--secondary)] p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">{campaign.name}</h1>
            <p className="text-white text-opacity-90 mb-4">{campaign.description}</p>
            
            {/* Progress bar */}
            <div className="mb-4">
              <div className="w-full bg-white bg-opacity-30 rounded-full h-4 mb-2">
                <div 
                  className="h-full rounded-full bg-white"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-sm text-white">
                <span>${campaign.currentContributions} raised</span>
                <span>${campaign.goal} goal</span>
              </div>
            </div>
            
            {/* Campaign stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold">${campaign.currentContributions}</div>
                <div className="text-sm">Raised</div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold">{timeLeft}</div>
                <div className="text-sm">Days Left</div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg text-center">
                <div className="text-2xl font-bold">42</div>
                <div className="text-sm">Donors</div>
              </div>
            </div>
          </div>
          
          {/* Campaign details */}
          <div className="p-8">
            {/* Organization info */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-2 text-[var(--headline)]">Organized by</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[var(--highlight)] bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaBuilding className="text-[var(--highlight)]" />
                </div>
                <div>
                  <p className="font-semibold text-[var(--headline)]">{organization?.name || "Organization"}</p>
                  <p className="text-sm text-[var(--paragraph)]">Verified Organization</p>
                </div>
              </div>
            </div>
            
            {/* Campaign details */}
            <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">Campaign deadline:</p>
                <p>{campaign.deadline}</p>
              </div>
              <div>
                <p className="font-semibold">Campaign started:</p>
                <p>2023-01-15</p>
              </div>
            </div>
            
            {/* Donor-specific contribution section - only show if donor has contributed */}
            {userRole === 'donor' && donorContribution && (
              <div className="mb-8 bg-[var(--background)] p-6 rounded-lg border border-[var(--stroke)]">
                <h3 className="text-lg font-bold mb-4 text-[var(--headline)] flex items-center gap-2">
                  <FaHistory />
                  Your Contributions
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-[var(--highlight)]">${donorContribution.totalAmount}</div>
                    <div className="text-sm text-[var(--paragraph)]">Total Contributed</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-[var(--secondary)]">{donorContribution.contributions.length}</div>
                    <div className="text-sm text-[var(--paragraph)]">Donations Made</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-[var(--tertiary)]">{donorContribution.percentageOfTotal}%</div>
                    <div className="text-sm text-[var(--paragraph)]">Of Total Raised</div>
                  </div>
                </div>
                
                <div className="border-t border-[var(--stroke)] pt-4">
                  <h4 className="font-semibold mb-2">Contribution History</h4>
                  <div className="space-y-2">
                    {donorContribution.contributions.map((contribution, index) => (
                      <div key={index} className="flex justify-between items-center text-sm p-2 bg-white rounded">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-[var(--highlight)]" />
                          <span>{new Date(contribution.date).toLocaleDateString()}</span>
                        </div>
                        <div className="font-semibold">${contribution.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Donation button */}
            <div className="flex justify-center mt-8">
              <button className="button flex items-center gap-2 px-8 py-3 text-lg">
                <FaHandHoldingHeart />
                Donate Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail; 