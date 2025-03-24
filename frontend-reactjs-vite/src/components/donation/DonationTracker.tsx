import React, { useState } from 'react';
import { FaHistory, FaCalendarAlt, FaExternalLinkAlt, FaUser, FaReceipt, FaInfoCircle, FaSync } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { DonationTracker as DonationTrackerType } from '../../utils/mockData';

interface DonationTrackerProps {
  tracker: DonationTrackerType;
  className?: string;
}

interface TimelineEntry {
  date: string;
  amount: number;
  donorName?: string;
  transactionHash?: string;
  message?: string;
  isRecurring?: boolean;
}

const DonationTracker: React.FC<DonationTrackerProps> = ({ tracker, className = '' }) => {
  const [expandedDonationId, setExpandedDonationId] = useState<string | null>(null);

  const formatTimelineEntry = (entry: TimelineEntry) => {
    const date = new Date(entry.date);
    return {
      ...entry,
      formattedDate: date.toLocaleDateString(),
      formattedTime: date.toLocaleTimeString(),
    };
  };

  return (
    <div className={`bg-[var(--main)] rounded-xl border border-[var(--stroke)] p-6 ${className}`}>
      <h2 className="text-2xl font-bold text-[var(--headline)] flex items-center gap-2 mb-6">
        <FaHistory className="text-[var(--highlight)]" />
        Donation Tracker
      </h2>

      {/* Transaction Timeline */}
      <div className="space-y-4">
        {tracker.donations.timeline.daily.map((day, index) => (
          <motion.div 
            key={day.date}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`rounded-lg border border-[var(--stroke)] hover:border-[var(--highlight)] transition-all duration-200
              ${expandedDonationId === day.date ? 'bg-[var(--background)]' : ''}`}
          >
            {/* Basic Information Row */}
            <div 
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => setExpandedDonationId(expandedDonationId === day.date ? null : day.date)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--highlight)] bg-opacity-10 flex items-center justify-center">
                  <FaCalendarAlt className="text-[var(--highlight)]" />
                </div>
                <div>
                  <div className="font-medium text-[var(--headline)]">
                    ${day.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-[var(--paragraph)]">
                    {new Date(day.date).toLocaleDateString()} at {new Date(day.date).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {day.isRecurring && (
                  <FaSync className="text-[var(--highlight)]" title="Recurring Donation" />
                )}
                <FaInfoCircle 
                  className={`transition-transform ${expandedDonationId === day.date ? 'rotate-180' : ''}`}
                />
              </div>
            </div>

            {/* Expanded Details */}
            {expandedDonationId === day.date && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-4 border-t border-[var(--stroke)]"
              >
                <div className="pt-4 space-y-3">
                  {/* Donor Information */}
                  <div className="flex items-center gap-2 text-sm">
                    <FaUser className="text-[var(--highlight)]" />
                    <span className="text-[var(--paragraph)]">Donor:</span>
                    <span className="font-medium text-[var(--headline)]">
                      {tracker.donations.topDonors.find(donor => 
                        new Date(donor.lastDonation).toISOString().split('T')[0] === day.date
                      )?.name || 'Anonymous'}
                    </span>
                  </div>

                  {/* Transaction Hash */}
                  {day.transactionHash && (
                    <div className="flex items-center gap-2 text-sm">
                      <FaReceipt className="text-[var(--highlight)]" />
                      <span className="text-[var(--paragraph)]">Transaction:</span>
                      <a
                        href={`https://etherscan.io/tx/${day.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-[var(--highlight)] hover:underline flex items-center gap-1"
                      >
                        {`${day.transactionHash.slice(0, 6)}...${day.transactionHash.slice(-4)}`}
                        <FaExternalLinkAlt size={12} />
                      </a>
                    </div>
                  )}

                  {/* Optional Message */}
                  {day.message && (
                    <div className="text-sm text-[var(--paragraph)] bg-[var(--main)] p-3 rounded-lg">
                      "{day.message}"
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DonationTracker; 