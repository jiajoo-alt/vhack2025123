import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaMoneyBillWave, FaArrowLeft, FaHandHoldingHeart, FaUsers } from "react-icons/fa";

const CampaignDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // In a real application, you would fetch the campaign details based on the ID
  // For now, we'll use mock data
  const campaign = {
    id: parseInt(id || "0"),
    name: `Campaign ${id}`,
    description: `This is a detailed description of Campaign ${id}. It includes comprehensive information about the campaign's goals, objectives, and how the funds will be used. The campaign aims to make a significant impact in its target area and help those in need.`,
    goal: 10000 * parseInt(id || "1"),
    currentContributions: 5000 * parseInt(id || "1"),
    deadline: "2025-08-31",
    donors: 42,
    createdBy: "Organization Name",
    createdAt: "2023-01-15",
  };

  const progress = (campaign.currentContributions / campaign.goal) * 100;
  const timeLeft = Math.max(0, Math.floor((new Date(campaign.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="p-4 bg-[var(--background)] text-[var(--paragraph)] max-w-5xl mx-auto">
      <button 
        className="flex items-center gap-2 text-[var(--headline)] hover:text-[var(--highlight)] transition-colors mb-6"
        onClick={() => navigate("/charity")}
      >
        <FaArrowLeft />
        <span>Back to Campaigns</span>
      </button>
      
      <div className="bg-[var(--main)] rounded-xl shadow-xl border border-[var(--stroke)] overflow-hidden">
        {/* Header with decorative element */}
        <div className="relative bg-gradient-to-r from-[var(--highlight)] to-[var(--secondary)] h-32 flex items-end">
          <div className="absolute inset-0 bg-opacity-30 bg-[var(--stroke)]"></div>
          <h1 className="text-3xl font-bold text-white p-6 relative z-10">{campaign.name}</h1>
        </div>
        
        <div className="p-6">
          {/* Campaign stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-[var(--background)] p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <FaMoneyBillWave className="text-[var(--highlight)] text-xl" />
                <h3 className="font-semibold">Funding</h3>
              </div>
              <p className="text-2xl font-bold">${campaign.currentContributions}</p>
              <p className="text-sm">of ${campaign.goal} goal</p>
            </div>
            
            <div className="bg-[var(--background)] p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <FaCalendarAlt className="text-[var(--tertiary)] text-xl" />
                <h3 className="font-semibold">Time Left</h3>
              </div>
              <p className="text-2xl font-bold">{timeLeft} days</p>
              <p className="text-sm">Deadline: {campaign.deadline}</p>
            </div>
            
            <div className="bg-[var(--background)] p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <FaUsers className="text-[var(--secondary)] text-xl" />
                <h3 className="font-semibold">Supporters</h3>
              </div>
              <p className="text-2xl font-bold">{campaign.donors}</p>
              <p className="text-sm">people have donated</p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, var(--highlight) 0%, var(--secondary) 100%)`
                }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">{Math.round(progress)}% funded</span>
              <span>{timeLeft > 0 ? `${timeLeft} days to go` : "Campaign ended"}</span>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-[var(--headline)]">About this campaign</h2>
            <p className="leading-relaxed">{campaign.description}</p>
          </div>
          
          {/* Campaign details */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold">Created by:</p>
              <p>{campaign.createdBy}</p>
            </div>
            <div>
              <p className="font-semibold">Campaign started:</p>
              <p>{campaign.createdAt}</p>
            </div>
          </div>
          
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
  );
};

export default CampaignDetail; 