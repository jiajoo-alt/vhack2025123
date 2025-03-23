// Define the Campaign interface to match our service
export interface Campaign {
  id: number;
  name: string;
  description: string;
  goal: number;
  currentContributions: number;
  deadline: string;
  organizationId: number;
  category: string;
}

// Mock data for all campaigns and donor contributions
export const mockCampaigns: Campaign[] = [
  { id: 1, name: "Clean Water Initiative", description: "Providing clean water to communities in need through sustainable infrastructure projects.", goal: 10000, currentContributions: 5000, deadline: "2025-08-31", organizationId: 1, category: "Health & Medical" },
  { id: 2, name: "Education for All", description: "Supporting education programs for underprivileged children around the world.", goal: 20000, currentContributions: 15000, deadline: "2025-03-31", organizationId: 2, category: "Education" },
  { id: 3, name: "Wildlife Conservation", description: "Protecting endangered species and their habitats through conservation efforts.", goal: 30000, currentContributions: 25000, deadline: "2025-06-27", organizationId: 3, category: "Environment" },
  { id: 4, name: "Hunger Relief", description: "Providing meals and food security to communities facing food insecurity.", goal: 40000, currentContributions: 35000, deadline: "2025-07-27", organizationId: 5, category: "Poverty & Hunger" },
  { id: 5, name: "Medical Aid", description: "Delivering essential medical supplies and healthcare to underserved regions.", goal: 50000, currentContributions: 45000, deadline: "2025-08-27", organizationId: 4, category: "Health & Medical" },
  { id: 6, name: "Disaster Relief", description: "Providing immediate assistance to communities affected by natural disasters.", goal: 60000, currentContributions: 55000, deadline: "2025-09-27", organizationId: 1, category: "Disaster Relief" },
  { id: 7, name: "Renewable Energy", description: "Implementing renewable energy solutions in developing communities.", goal: 70000, currentContributions: 65000, deadline: "2025-10-27", organizationId: 6, category: "Environment" },
  { id: 8, name: "Women Empowerment", description: "Supporting programs that empower women through education and economic opportunities.", goal: 80000, currentContributions: 75000, deadline: "2025-11-27", organizationId: 2, category: "Community Development" },
  { id: 9, name: "Mental Health Support", description: "Providing mental health resources and support to those in need.", goal: 90000, currentContributions: 85000, deadline: "2025-12-27", organizationId: 4, category: "Health & Medical" },
  { id: 10, name: "Ocean Cleanup", description: "Removing plastic and pollution from oceans to protect marine life.", goal: 100000, currentContributions: 95000, deadline: "2026-01-27", organizationId: 6, category: "Environment" },
  { id: 100, name: "Global Relief Campaign 1", description: "This is a campaign by Global Relief focused on addressing specific needs in target communities.", goal: 20000, currentContributions: 15000, deadline: "2025-08-31", organizationId: 1, category: "Community Development" },
  { id: 101, name: "Global Relief Campaign 2", description: "This is a campaign by Global Relief focused on addressing specific needs in target communities.", goal: 30000, currentContributions: 20000, deadline: "2025-08-31", organizationId: 1, category: "Human Rights" }
];

// Define the Organization interface
export interface Organization {
  id: number;
  name: string;
  description: string;
  logo: string;
  campaigns: number;
  totalRaised: number;
}

export const mockOrganizations: Organization[] = [
  { id: 1, name: "Global Relief", description: "A worldwide organization dedicated to providing humanitarian aid in crisis situations.", logo: "", campaigns: 5, totalRaised: 250000 },
  { id: 2, name: "EduCare", description: "Focused on providing quality education to underprivileged children around the world.", logo: "", campaigns: 3, totalRaised: 180000 },
  { id: 3, name: "Nature First", description: "Committed to protecting wildlife and natural habitats through conservation efforts.", logo: "", campaigns: 4, totalRaised: 320000 },
  { id: 4, name: "Health Alliance", description: "Delivering essential healthcare services to communities with limited access to medical care.", logo: "", campaigns: 6, totalRaised: 420000 },
  { id: 5, name: "Food for All", description: "Working to eliminate hunger and food insecurity in vulnerable communities.", logo: "", campaigns: 2, totalRaised: 150000 },
  { id: 6, name: "Clean Earth Initiative", description: "Focused on environmental conservation and sustainable practices to protect our planet.", logo: "", campaigns: 4, totalRaised: 280000 },
];

// Define interfaces for donor contributions
export interface SupportedCampaign extends Campaign {
  donorContribution: number;
}

export interface ContributionDetail {
  amount: number;
  date: string;
  transactionHash: string;
}

export interface SupportedOrganization {
  id: number;
  name: string;
  totalContribution: number;
}

export const mockDonorContributions = {
  // Campaigns the donor has supported
  supportedCampaigns: [
    { 
      id: 1, 
      name: "Clean Water Initiative", 
      description: "Providing clean water to communities in need through sustainable infrastructure projects.", 
      goal: 10000, 
      currentContributions: 5000, 
      deadline: "2025-08-31",
      donorContribution: 500,
      organizationId: 1,
      category: "Health & Medical"
    },
    { 
      id: 3, 
      name: "Wildlife Conservation", 
      description: "Protecting endangered species and their habitats through conservation efforts.", 
      goal: 30000, 
      currentContributions: 25000, 
      deadline: "2025-06-27",
      donorContribution: 1200,
      organizationId: 3,
      category: "Environment"
    },
    { 
      id: 100, 
      name: "Global Relief Campaign 1", 
      description: "This is a campaign by Global Relief focused on addressing specific needs in target communities.", 
      goal: 20000, 
      currentContributions: 15000, 
      deadline: "2025-08-31",
      donorContribution: 1500,
      organizationId: 1,
      category: "Community Development"
    },
    { 
      id: 101, 
      name: "Global Relief Campaign 2", 
      description: "This is a campaign by Global Relief focused on addressing specific needs in target communities.", 
      goal: 30000, 
      currentContributions: 20000, 
      deadline: "2025-08-31",
      donorContribution: 1000,
      organizationId: 1,
      category: "Human Rights"
    }
  ] as SupportedCampaign[],
  
  // Detailed contribution history for each campaign
  contributionDetails: {
    1: [
      { amount: 300, date: "2024-03-15", transactionHash: "0x123..." },
      { amount: 200, date: "2024-02-10", transactionHash: "0x456..." }
    ],
    3: [
      { amount: 700, date: "2024-02-20", transactionHash: "0x789..." },
      { amount: 500, date: "2024-01-05", transactionHash: "0xabc..." }
    ],
    100: [
      { amount: 1000, date: "2024-03-10", transactionHash: "0xdef..." },
      { amount: 500, date: "2024-02-15", transactionHash: "0xghi..." }
    ],
    101: [
      { amount: 1000, date: "2024-02-15", transactionHash: "0xjkl..." }
    ]
  } as Record<number, ContributionDetail[]>,
  
  // Organizations the donor has supported
  supportedOrganizations: [
    { id: 1, name: "Global Relief", totalContribution: 2500 },
    { id: 3, name: "Nature First", totalContribution: 1200 }
  ] as SupportedOrganization[]
}; 