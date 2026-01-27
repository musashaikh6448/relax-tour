
export interface Tour {
  id: string;
  name: string;
  location: string;
  description: string;
  fullOverview: string;
  duration: string;
  price: number;
  image: string;
  category: 'Domestic' | 'International';
  itinerary: { day: number; title: string; activities: string[] }[];
  inclusions: string[];
  exclusions: string[];
}

export interface Quotation {
  id: string;
  customerName: string;
  destination: string;
  travelDate: string;
  people: number;
  budget: string;
  status: 'Pending' | 'Processed' | 'Cancelled';
  notes: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Support' | 'User';
  joinDate: string;
}

export interface DashboardStats {
  totalTours: number;
  totalUsers: number;
  totalQuotations: number;
  revenue: string;
}
