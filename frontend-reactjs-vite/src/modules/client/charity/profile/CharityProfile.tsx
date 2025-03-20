import React, { useState, useEffect } from "react";
import { FaBuilding, FaHandHoldingHeart, FaUsers, FaBullhorn, FaPencilAlt, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import CharityInfo from "./components/CharityInfo";
import CharityCampaigns from "./components/CharityCampaigns";
import CommunityManagement from "./components/CommunityManagement";
import Announcements from "./components/Announcements";
import AddCampaignModal from "./components/AddCampaignModal";

const CharityProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'info' | 'campaigns' | 'community' | 'announcements'>('info');
  const [isEditing, setIsEditing] = useState(false);
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);
  
  // Mock charity data - In real app, fetch from your backend
  const [charityData, setCharityData] = useState({
    name: "Global Relief",
    description: "A worldwide organization dedicated to providing humanitarian aid in crisis situations.",
    logo: "",
    founded: "2010",
    location: "New York, USA",
    website: "www.globalrelief.org",
    email: "contact@globalrelief.org",
    phone: "+1 (555) 123-4567",
    totalRaised: 250000,
    activeCampaigns: 5,
    supporters: 1250,
    communities: 3
  });

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section with Gradient Background */}
      <div className="relative bg-gradient-to-r from-[var(--secondary)] to-[var(--tertiary)] h-48">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center pt-12 relative z-10">
            <h1 className="text-white text-3xl font-bold drop-shadow-md">Charity Dashboard</h1>
            {activeTab === 'info' && (
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isEditing ? 'bg-red-500 hover:bg-red-600' : 'bg-white hover:bg-gray-100'
                } transition-colors`}
              >
                {isEditing ? (
                  <>
                    <FaTimes /> Cancel Editing
                  </>
                ) : (
                  <>
                    <FaPencilAlt /> Edit Profile
                  </>
                )}
              </button>
            )}
            {activeTab === 'campaigns' && (
              <button 
                onClick={() => setShowAddCampaignModal(true)}
                className="px-4 py-2 rounded-lg bg-white hover:bg-gray-100 flex items-center gap-2 transition-colors"
              >
                <FaPlus /> Add Campaign
              </button>
            )}
          </div>
          <p className="text-white text-opacity-90 relative z-10 drop-shadow-sm">Manage your organization and campaigns</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16">
        {/* Profile Card - Overlapping Hero */}
        <div className="bg-[var(--main)] rounded-xl shadow-xl border border-[var(--stroke)] p-6 mb-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gradient-to-br from-[var(--secondary)] to-[var(--tertiary)] flex items-center justify-center text-white text-4xl font-bold">
              {charityData.logo ? (
                <img src={charityData.logo} alt={charityData.name} className="w-full h-full object-cover rounded-xl" />
              ) : (
                charityData.name.charAt(0)
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--headline)]">{charityData.name}</h2>
              <p className="text-[var(--paragraph)] mt-2 max-w-2xl">{charityData.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <Stat icon={<FaHandHoldingHeart />} value={`$${charityData.totalRaised.toLocaleString()}`} label="Total Raised" />
                <Stat icon={<FaHandHoldingHeart />} value={charityData.activeCampaigns} label="Active Campaigns" />
                <Stat icon={<FaUsers />} value={charityData.supporters} label="Supporters" />
                <Stat icon={<FaUsers />} value={charityData.communities} label="Communities" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[var(--main)] rounded-xl border border-[var(--stroke)] mb-8">
          <div className="flex p-2">
            {[
              { id: 'info', label: 'Organization Info', icon: <FaBuilding /> },
              { id: 'campaigns', label: 'Campaigns', icon: <FaHandHoldingHeart /> },
              { id: 'community', label: 'Community', icon: <FaUsers /> },
              { id: 'announcements', label: 'Announcements', icon: <FaBullhorn /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  if (isEditing) setIsEditing(false);
                }}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[var(--highlight)] text-white font-bold shadow-sm'
                    : 'text-[var(--paragraph)] hover:text-[var(--headline)] hover:bg-[var(--background)]'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="animate-fadeIn">
          {activeTab === 'info' && <CharityInfo charity={charityData} isEditing={isEditing} onSave={setCharityData} />}
          {activeTab === 'campaigns' && <CharityCampaigns />}
          {activeTab === 'community' && <CommunityManagement />}
          {activeTab === 'announcements' && <Announcements />}
        </div>
      </div>

      {/* Add Campaign Modal */}
      {showAddCampaignModal && (
        <AddCampaignModal onClose={() => setShowAddCampaignModal(false)} />
      )}
    </div>
  );
};

// Stat component for displaying statistics
const Stat: React.FC<{ icon: React.ReactNode; value: string | number; label: string }> = ({ icon, value, label }) => (
  <div className="bg-[var(--background)] p-4 rounded-lg shadow-sm">
    <div className="flex items-center gap-2 text-[var(--highlight)] mb-1">
      {icon}
      <span className="font-medium text-sm">{label}</span>
    </div>
    <p className="text-xl font-bold text-[var(--headline)]">{value}</p>
  </div>
);

export default CharityProfile; 