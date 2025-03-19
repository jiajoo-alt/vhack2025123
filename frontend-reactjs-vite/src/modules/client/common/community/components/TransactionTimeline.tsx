import React from "react";
import { FaFileInvoiceDollar, FaMoneyBillWave, FaBuilding, FaFileAlt, FaUsers } from "react-icons/fa";

interface TransactionTimelineProps {
  communityId: number;
  communityType: string;
}

const TransactionTimeline: React.FC<TransactionTimelineProps> = ({ communityId, communityType }) => {
  // Mock transaction data
  const transactions = [
    {
      id: 1,
      date: "2025-03-15",
      vendor: "Medical Supplies Co.",
      amount: 5000,
      description: "Purchase of medical equipment for rural clinic",
      hasInvoice: true,
      type: "expense"
    },
    {
      id: 2,
      date: "2025-03-10",
      vendor: "Community Center",
      amount: 2500,
      description: "Rental of venue for community health workshop",
      hasInvoice: true,
      type: "expense"
    },
    {
      id: 3,
      date: "2025-03-05",
      vendor: "Anonymous Donor",
      amount: 10000,
      description: "Major donation to campaign",
      hasInvoice: false,
      type: "donation"
    },
    {
      id: 4,
      date: "2025-02-28",
      vendor: "Transport Services Ltd",
      amount: 1200,
      description: "Transportation of supplies to affected areas",
      hasInvoice: true,
      type: "expense"
    },
    {
      id: 5,
      date: "2025-02-20",
      vendor: "Multiple Donors",
      amount: 7500,
      description: "Collective donations from fundraising event",
      hasInvoice: false,
      type: "donation"
    },
    {
      id: 6,
      date: "2025-02-15",
      vendor: "Training Consultants Inc.",
      amount: 3000,
      description: "Staff training for project implementation",
      hasInvoice: true,
      type: "expense"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[var(--main)] p-4 rounded-lg border border-[var(--stroke)]">
        <h3 className="text-xl font-bold text-[var(--headline)] mb-4">Transaction Timeline</h3>
        <p className="mb-6 text-[var(--paragraph)]">
          Track how funds are being used in this campaign. All expenses are documented with invoices for transparency.
        </p>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--stroke)]"></div>
          
          {/* Timeline items */}
          <div className="space-y-8">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="relative pl-14">
                {/* Timeline dot */}
                <div className={`absolute left-4 top-0 w-4 h-4 rounded-full transform -translate-x-1/2 ${
                  transaction.type === 'expense' ? 'bg-[var(--tertiary)]' : 'bg-[var(--highlight)]'
                }`}></div>
                
                <div className="bg-[var(--main)] p-4 rounded-lg shadow-md border border-[var(--stroke)]">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {transaction.type === 'expense' ? (
                        <FaMoneyBillWave className="text-[var(--tertiary)]" />
                      ) : (
                        <FaMoneyBillWave className="text-[var(--highlight)]" />
                      )}
                      <span className="font-semibold text-[var(--headline)]">
                        {transaction.type === 'expense' ? 'Expense' : 'Donation'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex items-center gap-2">
                      {transaction.type === 'expense' ? (
                        <FaBuilding className="text-gray-500" />
                      ) : (
                        <FaUsers className="text-gray-500" />
                      )}
                      <span className="font-medium">{transaction.vendor}</span>
                    </div>
                    <p className="text-lg font-bold text-[var(--headline)]">
                      {transaction.type === 'expense' ? '-' : '+'} ${transaction.amount.toLocaleString()}
                    </p>
                  </div>
                  
                  <p className="text-[var(--paragraph)] mb-3">{transaction.description}</p>
                  
                  {transaction.hasInvoice && (
                    <button className="flex items-center gap-2 text-sm text-[var(--tertiary)] hover:underline">
                      <FaFileInvoiceDollar />
                      View Invoice
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTimeline; 