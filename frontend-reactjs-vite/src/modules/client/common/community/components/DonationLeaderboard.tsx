import React, { useState } from "react";
import { FaTrophy, FaMedal, FaAward, FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";

interface DonationLeaderboardProps {
  communityId: number;
  communityType: string;
}

interface Donor {
  id: number;
  name: string;
  amount: number;
  donations: number;
  lastDonation: string;
  avatar: string;
}

const DonationLeaderboard: React.FC<DonationLeaderboardProps> = ({ communityId, communityType }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  
  // Mock data for donors
  const donors: Donor[] = [
    { id: 1, name: "John Smith", amount: 5000, donations: 3, lastDonation: "2025-03-10", avatar: "" },
    { id: 2, name: "Maria Garcia", amount: 7500, donations: 2, lastDonation: "2025-03-05", avatar: "" },
    { id: 3, name: "David Lee", amount: 3000, donations: 5, lastDonation: "2025-03-15", avatar: "" },
    { id: 4, name: "Sarah Johnson", amount: 10000, donations: 1, lastDonation: "2025-02-28", avatar: "" },
    { id: 5, name: "Robert Chen", amount: 2500, donations: 4, lastDonation: "2025-03-12", avatar: "" },
    { id: 6, name: "Emily Davis", amount: 4000, donations: 2, lastDonation: "2025-03-08", avatar: "" },
    { id: 7, name: "Michael Brown", amount: 1500, donations: 3, lastDonation: "2025-03-01", avatar: "" },
    { id: 8, name: "Lisa Wong", amount: 6000, donations: 1, lastDonation: "2025-02-25", avatar: "" },
    { id: 9, name: "James Wilson", amount: 2000, donations: 2, lastDonation: "2025-03-07", avatar: "" },
    { id: 10, name: "Anonymous Donor", amount: 8000, donations: 1, lastDonation: "2025-03-03", avatar: "" },
  ];
  
  // Filter and sort donors
  const filteredDonors = donors
    .filter(donor => donor.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "desc") {
        return b.amount - a.amount;
      } else {
        return a.amount - b.amount;
      }
    });
  
  // Get total donations
  const totalDonations = donors.reduce((sum, donor) => sum + donor.amount, 0);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get rank badge
  const getRankBadge = (index: number) => {
    if (index === 0) {
      return <FaTrophy className="text-[var(--highlight)]" />;
    } else if (index === 1) {
      return <FaMedal className="text-[var(--secondary)]" />;
    } else if (index === 2) {
      return <FaMedal className="text-[var(--tertiary)]" />;
    } else {
      return <span className="text-[var(--paragraph)] font-bold">{index + 1}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-[var(--main)] rounded-lg border border-[var(--stroke)] overflow-hidden">
        <div className="p-4 border-b border-[var(--stroke)]">
          <h3 className="text-xl font-bold text-[var--headline)] mb-2">Top Donors</h3>
          <div className="flex items-center justify-between">
            <p className="text-[var(--paragraph)]">
              Total Donations: <span className="font-bold text-[var(--headline)]">${totalDonations.toLocaleString()}</span>
            </p>
            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              className="flex items-center gap-2 text-[var(--paragraph)] hover:text-[var(--headline)]"
            >
              {sortOrder === "desc" ? <FaSortAmountDown /> : <FaSortAmountUp />}
              Sort by Amount
            </button>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-[var(--paragraph)]" />
            </div>
            <input
              type="text"
              placeholder="Search donors..."
              className="pl-10 pr-4 py-2 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] bg-[var(--main)] text-[var(--paragraph)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="bg-[var(--main)] rounded-lg overflow-hidden shadow">
          <table className="min-w-full divide-y divide-[var(--stroke)]">
            <thead className="bg-[var(--background)]">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--paragraph)] uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--paragraph)] uppercase tracking-wider">
                  Donor
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--paragraph)] uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--paragraph)] uppercase tracking-wider hidden md:table-cell">
                  Donations
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[var(--paragraph)] uppercase tracking-wider hidden md:table-cell">
                  Last Donation
                </th>
              </tr>
            </thead>
            <tbody className="bg-[var(--main)] divide-y divide-[var(--stroke)]">
              {filteredDonors.map((donor, index) => (
                <tr key={donor.id} className={index < 3 ? "bg-[var(--highlight)] bg-opacity-5" : ""}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100">
                      {getRankBadge(index)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[var(--tertiary)] text-white flex items-center justify-center font-bold">
                        {donor.avatar ? (
                          <img src={donor.avatar} alt={donor.name} className="h-10 w-10 rounded-full" />
                        ) : (
                          donor.name.charAt(0)
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-[var(--headline)]">
                          {donor.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-[var(--headline)]">${donor.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="text-sm text-[var(--paragraph)]">{donor.donations} {donor.donations === 1 ? 'donation' : 'donations'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="text-sm text-[var(--paragraph)]">{formatDate(donor.lastDonation)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DonationLeaderboard; 