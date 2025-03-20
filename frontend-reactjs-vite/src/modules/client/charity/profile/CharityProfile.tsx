import React, { useState, useEffect } from "react";
import { FaBuilding, FaHandHoldingHeart, FaUsers, FaBullhorn, FaPencilAlt, FaPlus, FaSave, FaTimes, FaChevronDown } from "react-icons/fa";
import CharityInfo from "./components/CharityInfo";
import CharityCampaigns from "./components/CharityCampaigns";
import CommunityManagement from "./components/CommunityManagement";
import Announcements from "./components/Announcements";
import AddCampaignModal from "./components/AddCampaignModal";

const CharityProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
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

  // Function to scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section with Gradient Background */}
      <div className="relative bg-gradient-to-r from-[var(--secondary)] to-[var(--tertiary)] h-64 md:h-80">
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center pt-12 relative z-10">
            <h1 className="text-white text-3xl font-bold drop-shadow-md">Charity Dashboard</h1>
          </div>
          <p className="text-white text-opacity-90 relative z-10 drop-shadow-sm mt-2">Manage your organization and campaigns</p>
          
          {/* Quick Navigation */}
          <div className="flex gap-3 mt-8 relative z-10 overflow-x-auto pb-2 md:justify-center">
            {[
              { id: 'info', label: 'Organization Info', icon: <FaBuilding /> },
              { id: 'campaigns', label: 'Campaigns', icon: <FaHandHoldingHeart /> },
              { id: 'community', label: 'Community', icon: <FaUsers /> },
              { id: 'announcements', label: 'Announcements', icon: <FaBullhorn /> }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-white text-[var(--highlight)] shadow-md'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        {/* Profile Card - Overlapping Hero */}
        <div className="bg-[var(--main)] rounded-xl shadow-xl border border-[var(--stroke)] p-6 mb-8">
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

        {/* Organization Info Section */}
        <section id="info" className="mb-12 scroll-mt-24 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaBuilding className="text-[var(--highlight)] text-xl mr-3" />
              <h2 className="text-2xl font-bold text-[var(--headline)]">Organization Information</h2>
            </div>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                isEditing ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-[var(--highlight)] text-white hover:bg-opacity-90'
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
          </div>
          <div className="bg-[var(--main)] rounded-xl border border-[var(--stroke)] overflow-hidden">
            <CharityInfo charity={charityData} isEditing={isEditing} onSave={setCharityData} />
          </div>
        </section>

        {/* Campaigns Section */}
        <section id="campaigns" className="mb-12 scroll-mt-24 animate-fadeIn">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <FaHandHoldingHeart className="text-[var(--highlight)] text-xl mr-3" />
              <h2 className="text-2xl font-bold text-[var(--headline)]">Campaigns</h2>
            </div>
            <button 
              onClick={() => setShowAddCampaignModal(true)}
              className="px-4 py-2 rounded-lg bg-[var(--highlight)] text-white hover:bg-opacity-90 flex items-center gap-2 transition-colors"
            >
              <FaPlus /> Add Campaign
            </button>
          </div>
          <div className="bg-[var(--main)] rounded-xl border border-[var(--stroke)] overflow-hidden">
            <CharityCampaigns />
          </div>
        </section>

        {/* Community Section */}
        <section id="community" className="mb-12 scroll-mt-24 animate-fadeIn">
          <div className="flex items-center mb-4">
            <FaUsers className="text-[var(--highlight)] text-xl mr-3" />
            <h2 className="text-2xl font-bold text-[var(--headline)]">Community Management</h2>
          </div>
          <div className="bg-[var(--main)] rounded-xl border border-[var(--stroke)] overflow-hidden">
            <CommunityManagement />
          </div>
        </section>

        {/* Announcements Section */}
        <section id="announcements" className="mb-12 scroll-mt-24 animate-fadeIn">
          <div className="flex items-center mb-4">
            <FaBullhorn className="text-[var(--highlight)] text-xl mr-3" />
            <h2 className="text-2xl font-bold text-[var(--headline)]">Announcements</h2>
          </div>
          <div className="bg-[var(--main)] rounded-xl border border-[var(--stroke)] overflow-hidden">
            <Announcements />
          </div>
        </section>

        {/* Back to top button */}
        <div className="fixed bottom-8 right-8 z-50">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[var(--highlight)] text-white p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all"
            aria-label="Back to top"
          >
            <FaChevronDown className="transform rotate-180" />
          </button>
        </div>
      </div>

      {/* Add Campaign Modal */}
      {showAddCampaignModal && (
        <AddCampaignModal onClose={() => setShowAddCampaignModal(false)} />
      )}
    </div>
  );
};

// Stat component for the profile card
const Stat: React.FC<{ icon: React.ReactNode; value: string | number; label: string }> = ({ icon, value, label }) => {
  return (
    <div className="bg-[var(--background)] rounded-lg p-4 flex flex-col items-center text-center">
      <div className="text-[var(--highlight)] mb-2">{icon}</div>
      <div className="text-xl font-bold text-[var(--headline)]">{value}</div>
      <div className="text-sm text-[var(--paragraph)]">{label}</div>
    </div>
  );
};

export default CharityProfile; 