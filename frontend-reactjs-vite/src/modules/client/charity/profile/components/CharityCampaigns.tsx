import React, { useState } from "react";
import { FaEdit, FaTrash, FaEye, FaChartLine, FaCalendarAlt, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CharityCampaigns: React.FC = () => {
  const navigate = useNavigate();
  
  // Mock campaigns data - In real app, fetch from your backend
  const [campaigns, setCampaigns] = useState([
    { 
      id: 1, 
      name: "Clean Water Initiative", 
      description: "Providing clean water to communities in need through sustainable infrastructure projects.", 
      goal: 10000, 
      currentContributions: 5000, 
      deadline: "2025-08-31",
      status: "active"
    },
    { 
      id: 2, 
      name: "Education for All", 
      description: "Supporting education programs for underprivileged children around the world.", 
      goal: 20000, 
      currentContributions: 15000, 
      deadline: "2025-03-31",
      status: "active"
    },
    { 
      id: 3, 
      name: "Wildlife Conservation", 
      description: "Protecting endangered species and their habitats through conservation efforts.", 
      goal: 30000, 
      currentContributions: 25000, 
      deadline: "2025-06-27",
      status: "active"
    },
    { 
      id: 4, 
      name: "Hunger Relief", 
      description: "Providing meals and food security to communities facing food insecurity.", 
      goal: 40000, 
      currentContributions: 35000, 
      deadline: "2025-07-27",
      status: "active"
    },
    { 
      id: 5, 
      name: "Medical Aid", 
      description: "Delivering essential medical supplies and healthcare to underserved regions.", 
      goal: 50000, 
      currentContributions: 45000, 
      deadline: "2025-08-27",
      status: "active"
    },
  ]);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      setCampaigns(campaigns.filter(campaign => campaign.id !== id));
      // In a real app, you would make an API call here to delete the campaign
    }
  };

  const handleView = (id: number) => {
    navigate(`/charity/${id}`);
  };

  const handleEdit = (id: number) => {
    // In a real app, you would navigate to an edit page or open a modal
    alert(`Edit campaign ${id}`);
  };

  return (
    <div className="bg-[var(--main)] rounded-xl border border-[var(--stroke)] overflow-hidden">
      <div className="p-6 border-b border-[var(--stroke)]">
        <h2 className="text-xl font-bold text-[var(--headline)]">Your Campaigns</h2>
        <p className="text-[var(--paragraph)] text-sm mt-1">
          Manage your active and past fundraising campaigns
        </p>
      </div>
      
      <div className="overflow-x-auto">
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
            {campaigns.map((campaign) => {
              const progress = (campaign.currentContributions / campaign.goal) * 100;
              
              return (
                <tr key={campaign.id} className="hover:bg-[var(--background)] transition-colors">
                  <td className="p-4">
                    <div>
                      <h3 className="font-medium text-[var(--headline)]">{campaign.name}</h3>
                      <p className="text-sm text-[var(--paragraph)] line-clamp-1">{campaign.description}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <FaMoneyBillWave className="text-[var(--highlight)]" />
                      <span>${campaign.goal.toLocaleString()}</span>
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
                      <span className="text-sm">${campaign.currentContributions.toLocaleString()} ({Math.round(progress)}%)</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-[var(--tertiary)]" />
                      <span>{new Date(campaign.deadline).toLocaleDateString()}</span>
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
      </div>
      
      {campaigns.length === 0 && (
        <div className="text-center py-10">
          <p className="text-[var(--paragraph)]">You haven't created any campaigns yet.</p>
        </div>
      )}
    </div>
  );
};

export default CharityCampaigns; 