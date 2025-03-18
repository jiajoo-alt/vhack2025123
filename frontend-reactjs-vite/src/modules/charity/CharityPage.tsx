import React from "react";
import CampaignCard from "../../components/cards/CampaignCard";

const CharityPage: React.FC = () => {
  const campaigns = [
    { id: 1, name: "Campaign 1", description: "Description of Campaign 1", goal: 10000, currentContributions: 5000, deadline: "2025-08-31" },
    { id: 2, name: "Campaign 2", description: "Description of Campaign 2", goal: 20000, currentContributions: 15000, deadline: "2025-03-31" },
    { id: 3, name: "Campaign 3", description: "Description of Campaign 3", goal: 30000, currentContributions: 25000, deadline: "2025-06-27" },
    { id: 4, name: "Campaign 4", description: "Description of Campaign 4", goal: 40000, currentContributions: 35000, deadline: "2025-07-27" },
    { id: 5, name: "Campaign 5", description: "Description of Campaign 5", goal: 50000, currentContributions: 45000, deadline: "2025-08-27" },
    { id: 6, name: "Campaign 6", description: "Description of Campaign 6", goal: 60000, currentContributions: 55000, deadline: "2025-09-27" },
    { id: 7, name: "Campaign 7", description: "Description of Campaign 7", goal: 70000, currentContributions: 65000, deadline: "2025-10-27" },
    { id: 8, name: "Campaign 8", description: "Description of Campaign 8", goal: 80000, currentContributions: 75000, deadline: "2025-11-27" },
    { id: 9, name: "Campaign 9", description: "Description of Campaign 9", goal: 90000, currentContributions: 85000, deadline: "2025-12-27" },
    { id: 10, name: "Campaign 10", description: "Description of Campaign 10", goal: 100000, currentContributions: 95000, deadline: "2026-01-27" },
    //add more campaigns as needed
  ];

  return (
    <div className="p-4 bg-[var(--background)] text-[var(--paragraph)]">
      <h1 className="text-2xl font-bold mb-4 text-[var(--headline)]">Charity Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            id={campaign.id}
            name={campaign.name}
            description={campaign.description}
            goal={campaign.goal}
            currentContributions={campaign.currentContributions}
            deadline={campaign.deadline}
          />
        ))}
      </div>
    </div>
  );
};

export default CharityPage; 