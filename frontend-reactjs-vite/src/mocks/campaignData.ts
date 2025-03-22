// Define the Campaign interface to match our service
export interface Campaign {
  id: string;
  charity_id: string;
  title: string;
  description: string;
  target_amount: number;
  current_amount: number;
  status: string;
  created_at: string;
  deadline: string;
  image_url?: string;
}

// Create mock campaigns that all components can use
export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    charity_id: "charity123",
    title: "Clean Water Initiative",
    description: "Providing clean water to communities in need.",
    target_amount: 10000,
    current_amount: 5000,
    status: "active",
    created_at: "2024-01-15",
    deadline: "2025-08-31",
    image_url: "https://example.com/image1.jpg"
  },
  {
    id: "2",
    charity_id: "charity123",
    title: "Education for All",
    description: "Supporting education programs for underprivileged children.",
    target_amount: 20000,
    current_amount: 15000,
    status: "active",
    created_at: "2024-02-10",
    deadline: "2025-03-31",
    image_url: "https://example.com/image2.jpg"
  },
  {
    id: "3",
    charity_id: "charity123",
    title: "Wildlife Conservation",
    description: "Protecting endangered species and their habitats.",
    target_amount: 30000,
    current_amount: 25000,
    status: "active",
    created_at: "2024-03-05",
    deadline: "2025-06-27",
    image_url: "https://example.com/image3.jpg"
  },
  {
    id: "4",
    charity_id: "charity123",
    title: "Hunger Relief",
    description: "Providing meals to communities facing food insecurity.",
    target_amount: 40000,
    current_amount: 35000,
    status: "active",
    created_at: "2024-04-20",
    deadline: "2025-07-27",
    image_url: "https://example.com/image4.jpg"
  }
];
