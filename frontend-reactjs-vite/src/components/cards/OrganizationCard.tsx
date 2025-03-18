import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaHandHoldingHeart } from "react-icons/fa";

interface OrganizationCardProps {
  id: number;
  name: string;
  description: string;
  logo: string;
  campaigns: number;
  totalRaised: number;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({ 
  id, 
  name, 
  description, 
  logo, 
  campaigns, 
  totalRaised 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/organization/${id}`);
  };

  return (
    <div
      className="bg-[var(--main)] p-6 rounded-lg shadow-xl border border-[var(--stroke)] transition-all transform hover:translate-y-[-8px] hover:shadow-2xl cursor-pointer overflow-hidden"
      onClick={handleClick}
      style={{ position: 'relative' }}
    >
      <div className="absolute top-0 right-0 w-20 h-20 bg-[var(--secondary)] opacity-20 rounded-bl-full"></div>
      
      <div className="flex items-center mb-4">
        <div className="w-16 h-16 rounded-full bg-[var(--highlight)] mr-4 flex items-center justify-center text-[var(--button-text)] text-2xl font-bold overflow-hidden">
          {logo ? <img src={logo} alt={name} className="w-full h-full object-cover" /> : name.charAt(0)}
        </div>
        <h2 className="text-xl font-bold text-[var(--headline)]">{name}</h2>
      </div>
      
      <p className="mb-5 text-[var(--paragraph)] line-clamp-3">{description}</p>
      
      <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
        <div className="text-sm flex items-center gap-1">
          <FaHandHoldingHeart className="text-[var(--tertiary)]" />
          <span className="font-semibold">{campaigns}</span> active campaigns
        </div>
        <div className="text-sm flex items-center gap-1">
          <span className="font-semibold">${totalRaised.toLocaleString()}</span> raised
        </div>
      </div>
    </div>
  );
};

export default OrganizationCard; 