import React, { useState, useEffect } from "react";
import { FaSave, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

interface CharityInfoProps {
  charity: {
    name: string;
    description: string;
    logo: string;
    founded: string;
    location: string;
    website: string;
    email: string;
    phone: string;
  };
  isEditing: boolean;
  onSave: (updatedCharity: any) => void;
}

const CharityInfo: React.FC<CharityInfoProps> = ({ charity, isEditing, onSave }) => {
  const [formData, setFormData] = useState(charity);
  
  useEffect(() => {
    setFormData(charity);
  }, [charity]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    // In a real app, you would make an API call here to update the charity info
    alert("Charity information updated successfully!");
  };

  return (
    <div className="bg-[var(--main)] rounded-xl border border-[var(--stroke)] overflow-hidden">
      <div className="p-6 border-b border-[var(--stroke)]">
        <h2 className="text-xl font-bold text-[var(--headline)]">Organization Information</h2>
        <p className="text-[var(--paragraph)] text-sm mt-1">
          {isEditing ? "Edit your organization details below" : "View your organization details"}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-[var(--headline)] mb-2">Organization Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-[var(--stroke)] rounded-lg bg-[var(--background)]"
                required
              />
            ) : (
              <p className="text-[var(--paragraph)] p-3 bg-[var(--background)] rounded-lg">{charity.name}</p>
            )}
          </div>
          
          <div className="col-span-2">
            <label className="block text-sm font-medium text-[var(--headline)] mb-2">Description</label>
            {isEditing ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 border border-[var(--stroke)] rounded-lg bg-[var(--background)]"
                required
              />
            ) : (
              <p className="text-[var(--paragraph)] p-3 bg-[var(--background)] rounded-lg">{charity.description}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--headline)] mb-2">
              <FaCalendarAlt className="inline mr-2" />
              Founded
            </label>
            {isEditing ? (
              <input
                type="text"
                name="founded"
                value={formData.founded}
                onChange={handleChange}
                className="w-full p-3 border border-[var(--stroke)] rounded-lg bg-[var(--background)]"
              />
            ) : (
              <p className="text-[var(--paragraph)] p-3 bg-[var(--background)] rounded-lg">{charity.founded}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--headline)] mb-2">
              <FaMapMarkerAlt className="inline mr-2" />
              Location
            </label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border border-[var(--stroke)] rounded-lg bg-[var(--background)]"
              />
            ) : (
              <p className="text-[var(--paragraph)] p-3 bg-[var(--background)] rounded-lg">{charity.location}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--headline)] mb-2">
              <FaGlobe className="inline mr-2" />
              Website
            </label>
            {isEditing ? (
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full p-3 border border-[var(--stroke)] rounded-lg bg-[var(--background)]"
              />
            ) : (
              <p className="text-[var(--paragraph)] p-3 bg-[var(--background)] rounded-lg">{charity.website}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--headline)] mb-2">
              <FaEnvelope className="inline mr-2" />
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-[var(--stroke)] rounded-lg bg-[var(--background)]"
              />
            ) : (
              <p className="text-[var(--paragraph)] p-3 bg-[var(--background)] rounded-lg">{charity.email}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--headline)] mb-2">
              <FaPhone className="inline mr-2" />
              Phone
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border border-[var(--stroke)] rounded-lg bg-[var(--background)]"
              />
            ) : (
              <p className="text-[var(--paragraph)] p-3 bg-[var(--background)] rounded-lg">{charity.phone}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[var(--headline)] mb-2">Logo</label>
            {isEditing ? (
              <input
                type="file"
                name="logo"
                className="w-full p-3 border border-[var(--stroke)] rounded-lg bg-[var(--background)]"
              />
            ) : (
              <p className="text-[var(--paragraph)] p-3 bg-[var(--background)] rounded-lg">
                {charity.logo ? "Logo uploaded" : "No logo uploaded"}
              </p>
            )}
          </div>
        </div>
        
        {isEditing && (
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[var(--highlight)] text-white rounded-lg flex items-center gap-2 hover:bg-opacity-90 transition-colors"
            >
              <FaSave /> Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CharityInfo; 