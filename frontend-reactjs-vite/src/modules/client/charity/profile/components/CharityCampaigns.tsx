import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaChartLine, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { mockCampaigns, Campaign } from "../../../../../mocks/campaignData";

const CharityCampaigns: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use the shared mock campaigns data
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = async (id: string) => {
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

  const handleView = (id: string) => {
    navigate(`/charity/${id}`);
  };

  const handleEdit = (id: string) => {
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
                  <div className="font-medium text-[var(--headline)]">{campaign.title}</div>
                  <div className="text-sm text-[var(--paragraph)] truncate max-w-xs">{campaign.description}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-1">
                    <FaMoneyBillWave className="text-green-500" />
                    <span>${campaign.target_amount.toLocaleString()}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="w-full bg-[var(--background)] rounded-full h-2.5 mb-1">
                    <div 
                      className="bg-[var(--highlight)] h-2.5 rounded-full" 
                      style={{ width: `${Math.min(100, (campaign.current_amount / campaign.target_amount) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-[var(--paragraph)]">
                    ${campaign.current_amount.toLocaleString()} (
                    {Math.round((campaign.current_amount / campaign.target_amount) * 100)}%)
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
                    campaign.status === 'active' ? 'bg-green-100 text-green-800' : 
                    campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleView(campaign.id)}
                      className="p-2 text-[var(--paragraph)] hover:text-[var(--headline)] transition-colors"
                      title="View Campaign"
                    >
                      <FaEye />
                    </button>
                    <button 
                      onClick={() => handleEdit(campaign.id)}
                      className="p-2 text-[var(--paragraph)] hover:text-[var(--headline)] transition-colors"
                      title="Edit Campaign"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDelete(campaign.id)}
                      className="p-2 text-[var(--paragraph)] hover:text-red-500 transition-colors"
                      title="Delete Campaign"
                    >
                      <FaTrash />
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