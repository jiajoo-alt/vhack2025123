import React from "react";

interface WithdrawalRequest {
  id: number;
  name: string;
  goal: number;
  currentContributions: number;
  deadline: string;
}

interface WithdrawalProps {
  withdrawalRequests: WithdrawalRequest[];
}

const Withdrawal: React.FC<WithdrawalProps> = ({ withdrawalRequests }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-bold text-[var(--headline)]">Withdrawal Requests</h3>
      {withdrawalRequests.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {withdrawalRequests.map((request) => (
            <li key={request.id} className="border-b pb-2">
              <p className="text-[var(--headline)] font-semibold">{request.name}</p>
              <p className="text-sm text-[var(--paragraph)]">
                Goal: ${request.goal.toLocaleString()} | Contributions: ${request.currentContributions.toLocaleString()}
              </p>
              <p className="text-sm text-[var(--paragraph)]">Deadline: {request.deadline}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-[var(--paragraph)] mt-4">No withdrawal requests at the moment.</p>
      )}
    </div>
  );
};

export default Withdrawal;