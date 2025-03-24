import React, { useState } from "react";
import { FaSearch, FaFilter, FaHeart, FaRegHeart, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

// Mock charity data
const mockCharities = [
  {
    id: 1,
    name: "Clean Water Initiative",
    cause: "Environment",
    description: "Providing clean water to communities in need and protecting water resources.",
    location: "Global",
    impact: "Served over a million people in 20 countries",
    image: "https://images.unsplash.com/photo-1519412666065-94acb3f8838f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    name: "Education for All",
    cause: "Education",
    description: "Empowering children through quality education and learning resources.",
    location: "Southeast Asia",
    impact: "Built 50 schools and educated 20,000 children",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    name: "Hunger Relief Fund",
    cause: "Food Security",
    description: "Fighting hunger and malnutrition in communities across the globe.",
    location: "Africa, Asia",
    impact: "Delivered 5 million meals in the past year",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    name: "Children's Medical Aid",
    cause: "Healthcare",
    description: "Providing medical treatment and healthcare access to children in need.",
    location: "Global",
    impact: "Helped 10,000 children receive medical care",
    image: "https://images.unsplash.com/photo-1571666521805-ef5fd3283849?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    name: "Wildlife Conservation Trust",
    cause: "Environment",
    description: "Protecting endangered species and preserving natural habitats.",
    location: "Global",
    impact: "Protected over 1 million acres of wildlife habitats",
    image: "https://images.unsplash.com/photo-1504173010664-32509aeebb62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
  },
];

const causeFilters = ["All", "Education", "Environment", "Healthcare", "Food Security", "Disaster Relief"];

const CharitySearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCause, setSelectedCause] = useState("All");
  const [favoriteCharities, setFavoriteCharities] = useState<number[]>([]);

  // Filter charities based on search term and selected cause
  const filteredCharities = mockCharities.filter((charity) => {
    const matchesSearch = charity.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          charity.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCause = selectedCause === "All" || charity.cause === selectedCause;
    return matchesSearch && matchesCause;
  });

  const toggleFavorite = (id: number) => {
    if (favoriteCharities.includes(id)) {
      setFavoriteCharities(favoriteCharities.filter(charityId => charityId !== id));
    } else {
      setFavoriteCharities([...favoriteCharities, id]);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[var(--headline)] mb-1">Find Charities to Support</h2>
        <p className="text-[var(--paragraph-light)]">Connect with charities aligned with your values and contribution capabilities.</p>
      </div>
      
      {/* Search and filter section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--paragraph-light)]" />
          <input
            type="text"
            placeholder="Search for charities..."
            className="w-full pl-10 pr-4 py-2 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="relative min-w-[180px]">
          <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--paragraph-light)]" />
          <select
            className="w-full appearance-none pl-10 pr-8 py-2 border border-[var(--stroke)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--highlight)] bg-white"
            value={selectedCause}
            onChange={(e) => setSelectedCause(e.target.value)}
          >
            {causeFilters.map((cause) => (
              <option key={cause} value={cause}>{cause}</option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 fill-current text-[var(--paragraph-light)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Results grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCharities.length > 0 ? (
          filteredCharities.map((charity) => (
            <div key={charity.id} className="border border-[var(--stroke)] rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-40">
                <img 
                  src={charity.image} 
                  alt={charity.name} 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => toggleFavorite(charity.id)}
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
                >
                  {favoriteCharities.includes(charity.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-gray-500" />
                  )}
                </button>
              </div>
              
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <h3 className="text-lg font-medium text-[var(--headline)]">{charity.name}</h3>
                  <span className="inline-block bg-[var(--highlight-light)] text-[var(--highlight)] text-xs px-2 py-1 rounded-full">
                    {charity.cause}
                  </span>
                </div>
                
                <p className="text-sm text-[var(--paragraph)] mb-3 line-clamp-2">
                  {charity.description}
                </p>
                
                <div className="flex items-center text-xs text-[var(--paragraph-light)] mb-3">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>{charity.location}</span>
                </div>
                
                <p className="text-xs text-[var(--paragraph)] mb-4">
                  <strong>Impact:</strong> {charity.impact}
                </p>
                
                <div className="flex gap-2">
                  <button className="flex-1 bg-[var(--highlight)] text-white py-2 rounded-lg hover:bg-[var(--highlight-dark)] transition-colors">
                    View Profile
                  </button>
                  <button className="w-10 bg-[var(--highlight-light)] text-[var(--highlight)] py-2 rounded-lg hover:bg-[var(--highlight-lighter)] transition-colors flex items-center justify-center">
                    <FaEnvelope />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-[var(--paragraph-light)]">No charities found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharitySearch; 