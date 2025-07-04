// User related types
export type UserRole = 'customer' | 'photographer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

// Photographer profile
export interface Photographer {
  id: string;
  userId: string;
  name: string;
  bio: string;
  location: string;
  avatar: string;
  coverImage: string;
  specialties: string[];
  gear: string[];
  hourlyRate: number;
  socialLinks: {
    instagram?: string;
    website?: string;
    twitter?: string;
    facebook?: string;
  };
  featured: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

// Portfolio and gallery
export interface Photo {
  id: string;
  photographerId: string;
  title: string;
  description?: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
}

// Booking related types
export interface Booking {
  id: string;
  customerId: string;
  photographerId: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  sessionType: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
}

// Form submission types
export interface BookingFormData {
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  sessionType: string;
  notes?: string;
}

// Auth related types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}