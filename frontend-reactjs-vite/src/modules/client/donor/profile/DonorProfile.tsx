import React, { useState } from "react";
import { FaUser, FaHandHoldingHeart, FaUsers, FaComments, FaTrophy } from "react-icons/fa";
import DonationHistory from "./components/DonationHistory";
import JoinedCommunities from "./components/JoinedCommunities";
import UserPosts from "./components/UserPosts";
import ContributionStats from "./components/ContributionStats";

const DonorProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'donations' | 'communities' | 'posts'>('donations');

  // Mock user data - In real app, fetch from your backend
  const userData = {
    name: "John Doe",
    walletAddress: "0x1234...5678",
    joinDate: "2024-01-15",
    totalDonations: 15000,
    totalCampaigns: 12,
    communitiesJoined: 5,
    postsCount: 28,
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-6">
      {/* Profile Header */}
      <div className="bg-[var(--main)] rounded-xl shadow-lg border border-[var(--stroke)] p-6 mb-6">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--highlight)] to-[var(--tertiary)] flex items-center justify-center text-white text-3xl font-bold">
            {userData.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-[var(--headline)]">{userData.name}</h1>
            <p className="text-[var(--paragraph)] mb-4">
              Wallet: {userData.walletAddress}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat icon={<FaHandHoldingHeart />} value={`$${userData.totalDonations}`} label="Total Donated" />
              <Stat icon={<FaTrophy />} value={userData.totalCampaigns} label="Campaigns Supported" />
              <Stat icon={<FaUsers />} value={userData.communitiesJoined} label="Communities" />
              <Stat icon={<FaComments />} value={userData.postsCount} label="Posts" />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[var(--main)] rounded-xl border border-[var(--stroke)] mb-6">
        <div className="flex p-2">
          {['donations', 'communities', 'posts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-[var(--highlight)] bg-opacity-10 text-[var(--highlight)]'
                  : 'text-[var(--paragraph)] hover:text-[var(--headline)]'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {activeTab === 'donations' && (
          <>
            <ContributionStats />
            <DonationHistory />
          </>
        )}
        {activeTab === 'communities' && <JoinedCommunities />}
        {activeTab === 'posts' && <UserPosts />}
      </div>
    </div>
  );
};

// Stat component
const Stat: React.FC<{ icon: React.ReactNode; value: number | string; label: string }> = ({ icon, value, label }) => (
  <div className="bg-[var(--background)] p-4 rounded-lg">
    <div className="flex items-center gap-2 mb-2 text-[var(--highlight)]">
      {icon}
      <span className="font-semibold">{label}</span>
    </div>
    <p className="text-xl font-bold text-[var(--headline)]">{value}</p>
  </div>
);

export default DonorProfile; 