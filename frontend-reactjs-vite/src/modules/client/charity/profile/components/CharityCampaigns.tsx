import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaChartLine, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { mockCampaigns, Campaign } from "../../../../../utils/mockData";

// Mock current charity organization ID (Global Relief)
const CURRENT_CHARITY_ORG_ID = 1;

const CharityCampaigns: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter campaigns to only show those belonging to the current charity organization
  const [campaigns, setCampaigns] = useState<Campaign[]>(
    mockCampaigns.filter(campaign => campaign.organizationId === CURRENT_CHARITY_ORG_ID)
  );
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        // Remove from local state instead of calling service
        setCampaigns(campaigns.filter(campaign => campaign.id !== id));
        toast.success("Campaign deleted successfully! (Mock data)");
      } catch (err: any) {
        console.error("Error deleting campaign:", err);
        toast.error(err.message || "Failed to delete campaign. Please try again.");
      }
    }
  };

  const handleView = (id: number) => {
    navigate(`/charity/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/charity/edit/${id}`);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading campaigns...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="overflow-x-auto">
      {campaigns.length === 0 ? (
        <div className="p-6 text-center text-[var(--paragraph)]">
          No campaigns found. Create your first campaign to get started!
        </div>
      ) : (
        <table className="w-full">
          <thead className="bg-[var(--background)] border-b border-[var(--stroke)]">
            <tr>
              <th className="p-4 text-left text-[var(--headline)]">Campaign</th>
              <th className="p-4 text-left text-[var(--headline)]">Goal</th>
              <th className="p-4 text-left text-[var(--headline)]">Progress</th>
              <th className="p-4 text-left text-[var(--headline)]">Deadline</th>
              <th className="p-4 text-left text-[var(--headline)]">Status</th>
              <th className="p-4 text-left text-[var(--headline)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign.id} className="border-b border-[var(--stroke)] hover:bg-[var(--background)] transition-colors">
                <td className="p-4">
                  <div className="font-medium text-[var(--headline)]">{campaign.name}</div>
                  <div className="text-sm text-[var(--paragraph)] truncate max-w-xs">{campaign.description}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <FaMoneyBillWave className="text-green-500" />
                    <span>${campaign.goal.toLocaleString()}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="w-full bg-[var(--background)] rounded-full h-2.5 mb-1">
                    <div 
                      className="bg-[var(--highlight)] h-2.5 rounded-full" 
                      style={{ width: `${Math.min(100, (campaign.currentContributions / campaign.goal) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-[var(--paragraph)]">
                    ${campaign.currentContributions.toLocaleString()} (
                    {Math.round((campaign.currentContributions / campaign.goal) * 100)}%)
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-[var(--highlight)]" />
                    <span>{new Date(campaign.deadline).toLocaleDateString()}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    campaign.currentContributions >= campaign.goal ? 'bg-blue-100 text-blue-800' : 
                    new Date(campaign.deadline) > new Date() ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {campaign.currentContributions >= campaign.goal ? 'Completed' : 
                     new Date(campaign.deadline) > new Date() ? 'Active' : 
                     'Expired'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(campaign.id)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors"
                      title="View Campaign"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(campaign.id)}
                      className="p-2 text-yellow-500 hover:bg-yellow-50 rounded-full transition-colors"
                      title="Edit Campaign"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(campaign.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete Campaign"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={() => navigate(`/charity/analytics/${campaign.id}`)}
                      className="p-2 text-purple-500 hover:bg-purple-50 rounded-full transition-colors"
                      title="Campaign Analytics"
                    >
                      <FaChartLine />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CharityCampaigns; 