import React from "react";
import GeneralFund from "./GeneralFund";
import SpecificFund from "./SpecificFund";
import TotalFund from "./TotalFund";
import Withdrawal from "./Withdrawal";

const FundManagement: React.FC = () => {
  // Mock data
  const generalFundBalance = 50000; // General fund balance
  const specificFundBalance = 120000; // Total campaign-specific funds
  const totalFundsRaised = generalFundBalance + specificFundBalance; // Total funds raised
  const withdrawalRequests = [
    {
      id: 1,
      name: "Clean Water Initiative",
      goal: 10000,
      currentContributions: 8000,
      deadline: "2025-03-01",
    },
    {
      id: 2,
      name: "Education for All",
      goal: 20000,
      currentContributions: 15000,
      deadline: "2025-02-15",
    },
  ]; // Overdue campaigns

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
      {/* General Fund */}
      <div className="md:col-span-3">
        <GeneralFund generalFundBalance={generalFundBalance} />
      </div>

      {/* Specific Fund */}
      <div className="md:col-span-3">
        <SpecificFund specificFundBalance={specificFundBalance} />
      </div>

      {/* Total Fund */}
      <div className="md:col-span-6">
        <TotalFund totalFundsRaised={totalFundsRaised} />
      </div>

      {/* Withdrawal Requests */}
      <div className="md:col-span-6">
        <Withdrawal withdrawalRequests={withdrawalRequests} />
      </div>
    </div>
  );
};

export default FundManagement;