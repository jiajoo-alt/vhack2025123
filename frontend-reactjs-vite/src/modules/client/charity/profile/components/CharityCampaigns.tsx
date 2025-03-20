import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaChartLine, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { charityService, Campaign } from "../../../../../services/supabase/charityService";
import { toast } from "react-toastify";

const CharityCampaigns: React.FC = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch campaigns on component mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const data = await charityService.getCharityCampaigns();
        setCampaigns(data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching campaigns:", err);
        setError(err.message || "Failed to load campaigns. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      try {
        await charityService.deleteCampaign(id);
        setCampaigns(campaigns.filter(campaign => campaign.id !== id));
        toast.success("Campaign deleted successfully!");
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
    <div className="bg-[var(--main)] rounded-xl border border-[var(--stroke)] overflow-hidden">
      <div className="p-6 border-b border-[var(--stroke)]">
        <h2 className="text-xl font-bold text-[var(--headline)]">Your Campaigns</h2>
        <p className="text-[var(--paragraph)] text-sm mt-1">
          Manage your active and past fundraising campaigns
        </p>
      </div>
      
      {campaigns.length > 0 ? (
        <table className="w-full">
          <thead className="bg-[var(--background)]">
            <tr>
              <th className="text-left p-4 font-semibold text-[var(--headline)]">Campaign</th>
              <th className="text-left p-4 font-semibold text-[var(--headline)]">Goal</th>
              <th className="text-left p-4 font-semibold text-[var(--headline)]">Progress</th>
              <th className="text-left p-4 font-semibold text-[var(--headline)]">Deadline</th>
              <th className="text-left p-4 font-semibold text-[var(--headline)]">Status</th>
              <th className="text-left p-4 font-semibold text-[var(--headline)]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--stroke)]">
            {campaigns.map(campaign => {
              const progress = (campaign.current_amount / campaign.target_amount) * 100;
              
              return (
                <tr key={campaign.id} className="hover:bg-[var(--background)] transition-colors">
                  <td className="p-4">
                    <div>
                      <h3 className="font-medium text-[var(--headline)]">{campaign.title}</h3>
                      <p className="text-sm text-[var(--paragraph)] line-clamp-1">{campaign.description}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <FaMoneyBillWave className="text-[var(--highlight)]" />
                      <span>${campaign.target_amount.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${progress}%`,
                            background: `linear-gradient(90deg, var(--highlight) 0%, var(--secondary) 100%)`
                          }}
                        ></div>
                      </div>
                      <span className="text-sm">${campaign.current_amount.toLocaleString()} ({Math.round(progress)}%)</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-[var(--tertiary)]" />
                      <span>{campaign.deadline ? new Date(campaign.deadline).toLocaleDateString() : 'No deadline'}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
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
                        className="p-2 text-[var(--paragraph)] hover:text-[var(--highlight)] transition-colors"
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
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-10">
          <p className="text-[var(--paragraph)]">You haven't created any campaigns yet.</p>
        </div>
      )}
    </div>
  );
};

export default CharityCampaigns; 