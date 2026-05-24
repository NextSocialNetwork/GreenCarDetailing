export type VehicleType = 'sedan' | 'suv' | 'truck';

export interface VehicleDetails {
  id: VehicleType;
  name: string;
  priceMultiplier: number;
  description: string;
  sizeCategory: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  priceBase: number;
  durationMinutes: number;
  tag?: string;
  shortDescription: string;
  features: string[];
  recommendedFor: string;
}

export interface AddOnService {
  id: string;
  name: string;
  price: number;
  durationMinutes: number;
  description: string;
  category: 'interior' | 'exterior' | 'protection';
}

export interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleType: VehicleType;
  vehicleMakeModel: string;
  packageId: string;
  addOnIds: string[];
  selectedScent?: string; // e.g., "Lavender Fields", "Eucalyptus & Peppermint"
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "09:00 AM"
  totalCost: number;
  notes?: string;
  createdAt: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Review {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
  serviceType: string;
  verified: boolean;
  avatarUrl?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
