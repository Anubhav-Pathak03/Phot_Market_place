import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Photographer, Photo } from '../../types';

interface PhotographersState {
  photographers: Photographer[];
  featuredPhotographers: Photographer[];
  currentPhotographer: Photographer | null;
  portfolioPhotos: Photo[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PhotographersState = {
  photographers: [],
  featuredPhotographers: [],
  currentPhotographer: null,
  portfolioPhotos: [],
  isLoading: false,
  error: null,
};

// Sample data for the MVP
const mockPhotographers: Photographer[] = [
  {
    id: '1',
    userId: '2',
    name: 'Alex Morgan',
    bio: 'Award-winning photographer specializing in portrait and landscape photography with over 10 years of experience.',
    location: 'New York, NY',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    coverImage: 'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    specialties: ['Portrait', 'Landscape', 'Wedding'],
    gear: ['Canon EOS R5', 'Canon RF 24-70mm f/2.8L', 'Canon RF 70-200mm f/2.8L'],
    hourlyRate: 150,
    socialLinks: {
      instagram: 'https://instagram.com',
      website: 'https://example.com',
      twitter: 'https://twitter.com',
    },
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    createdAt: '2023-01-15T12:00:00Z',
  },
  {
    id: '2',
    userId: '5',
    name: 'Jamie Chen',
    bio: 'Passionate about capturing the beauty in everyday moments. Specializing in family portraits and events.',
    location: 'San Francisco, CA',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=600',
    coverImage: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    specialties: ['Family', 'Events', 'Commercial'],
    gear: ['Sony A7 IV', 'Sony 24-70mm f/2.8 GM', 'Sony 85mm f/1.4 GM'],
    hourlyRate: 120,
    socialLinks: {
      instagram: 'https://instagram.com',
      website: 'https://example.com',
    },
    featured: true,
    rating: 4.6,
    reviewCount: 92,
    createdAt: '2023-03-22T10:30:00Z',
  },
  {
    id: '3',
    userId: '6',
    name: 'Taylor Reed',
    bio: 'Fashion and editorial photographer with a unique visual style. Published in Vogue and Elle magazines.',
    location: 'Los Angeles, CA',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=600',
    coverImage: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    specialties: ['Fashion', 'Editorial', 'Studio'],
    gear: ['Nikon Z9', 'Nikon 24-70mm f/2.8 S', 'Profoto B10 Plus'],
    hourlyRate: 200,
    socialLinks: {
      instagram: 'https://instagram.com',
      website: 'https://example.com',
      twitter: 'https://twitter.com',
      facebook: 'https://facebook.com',
    },
    featured: true,
    rating: 4.9,
    reviewCount: 186,
    createdAt: '2022-11-05T09:15:00Z',
  },
  {
    id: '4',
    userId: '7',
    name: 'Jordan Smith',
    bio: 'Wildlife and nature photographer who has traveled to all seven continents capturing the beauty of our planet.',
    location: 'Denver, CO',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600',
    coverImage: 'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    specialties: ['Wildlife', 'Nature', 'Travel'],
    gear: ['Canon EOS R6', 'Canon RF 100-500mm f/4.5-7.1L', 'Gitzo Traveler Tripod'],
    hourlyRate: 175,
    socialLinks: {
      instagram: 'https://instagram.com',
      website: 'https://example.com',
    },
    featured: false,
    rating: 4.7,
    reviewCount: 104,
    createdAt: '2023-05-12T14:45:00Z',
  },
  {
    id: '5',
    userId: '8',
    name: 'Casey Wong',
    bio: 'Architectural photographer with an eye for urban landscapes. Worked with major real estate companies nationwide.',
    location: 'Chicago, IL',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    coverImage: 'https://images.pexels.com/photos/1563256/pexels-photo-1563256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    specialties: ['Architecture', 'Real Estate', 'Interior'],
    gear: ['Sony A7R V', 'Sony 16-35mm f/2.8 GM', 'DJI Mavic 3 Pro'],
    hourlyRate: 165,
    socialLinks: {
      instagram: 'https://instagram.com',
      website: 'https://example.com',
    },
    featured: false,
    rating: 4.5,
    reviewCount: 78,
    createdAt: '2023-07-30T11:20:00Z',
  },
];

const mockPhotos: Photo[] = [
  // Photos for photographer 1 (Alex Morgan)
  {
    id: '101',
    photographerId: '1',
    title: 'Mountain Sunrise',
    description: 'Early morning light over the mountains',
    imageUrl: 'https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['landscape', 'mountains', 'sunrise'],
    featured: true,
    createdAt: '2023-01-20T08:30:00Z',
  },
  {
    id: '102',
    photographerId: '1',
    title: 'Business Portrait',
    description: 'Corporate headshot in natural light',
    imageUrl: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['portrait', 'corporate', 'professional'],
    featured: true,
    createdAt: '2023-02-15T14:20:00Z',
  },
  {
    id: '103',
    photographerId: '1',
    title: 'Wedding Couple',
    description: 'Sunset portrait of newlyweds',
    imageUrl: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['wedding', 'couple', 'sunset'],
    featured: false,
    createdAt: '2023-03-10T17:45:00Z',
  },
  {
    id: '104',
    photographerId: '1',
    title: 'Coastal View',
    description: 'Rocky coastline at dusk',
    imageUrl: 'https://images.pexels.com/photos/1295138/pexels-photo-1295138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['landscape', 'coast', 'ocean'],
    featured: false,
    createdAt: '2023-04-05T19:15:00Z',
  },
  
  // Photos for photographer 2 (Jamie Chen)
  {
    id: '201',
    photographerId: '2',
    title: 'Family Picnic',
    description: 'Candid family moment in the park',
    imageUrl: 'https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['family', 'candid', 'outdoors'],
    featured: true,
    createdAt: '2023-03-25T11:30:00Z',
  },
  {
    id: '202',
    photographerId: '2',
    title: 'Corporate Event',
    description: 'Annual company celebration',
    imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['event', 'corporate', 'celebration'],
    featured: false,
    createdAt: '2023-04-12T20:00:00Z',
  },
  {
    id: '203',
    photographerId: '2',
    title: 'Product Showcase',
    description: 'Minimalist product photography',
    imageUrl: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['product', 'commercial', 'minimalist'],
    featured: true,
    createdAt: '2023-05-08T13:45:00Z',
  },
  
  // Photos for photographer 3 (Taylor Reed)
  {
    id: '301',
    photographerId: '3',
    title: 'Editorial Fashion',
    description: 'Magazine cover shoot',
    imageUrl: 'https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['fashion', 'editorial', 'magazine'],
    featured: true,
    createdAt: '2022-11-15T10:00:00Z',
  },
  {
    id: '302',
    photographerId: '3',
    title: 'Studio Portrait',
    description: 'Dramatic lighting portrait',
    imageUrl: 'https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['portrait', 'studio', 'dramatic'],
    featured: true,
    createdAt: '2022-12-20T15:30:00Z',
  },
  {
    id: '303',
    photographerId: '3',
    title: 'Fashion Week',
    description: 'Behind the scenes at fashion week',
    imageUrl: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['fashion', 'event', 'backstage'],
    featured: false,
    createdAt: '2023-01-05T09:20:00Z',
  },
];

export const photographersSlice = createSlice({
  name: 'photographers',
  initialState,
  reducers: {
    fetchPhotographersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPhotographersSuccess: (state, action: PayloadAction<Photographer[]>) => {
      state.photographers = action.payload;
      state.featuredPhotographers = action.payload.filter(p => p.featured);
      state.isLoading = false;
    },
    fetchPhotographersFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchPhotographerStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPhotographerSuccess: (state, action: PayloadAction<Photographer>) => {
      state.currentPhotographer = action.payload;
      state.isLoading = false;
    },
    fetchPhotographerFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    fetchPortfolioStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPortfolioSuccess: (state, action: PayloadAction<Photo[]>) => {
      state.portfolioPhotos = action.payload;
      state.isLoading = false;
    },
    fetchPortfolioFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearCurrentPhotographer: (state) => {
      state.currentPhotographer = null;
      state.portfolioPhotos = [];
    },
  },
});

// Mock API functions
export const fetchPhotographers = () => (dispatch: any) => {
  dispatch(fetchPhotographersStart());
  
  // Simulate API call
  setTimeout(() => {
    dispatch(fetchPhotographersSuccess(mockPhotographers));
  }, 500);
};

export const fetchPhotographer = (id: string) => (dispatch: any) => {
  dispatch(fetchPhotographerStart());
  
  // Simulate API call
  setTimeout(() => {
    const photographer = mockPhotographers.find(p => p.id === id);
    if (photographer) {
      dispatch(fetchPhotographerSuccess(photographer));
    } else {
      dispatch(fetchPhotographerFailed('Photographer not found'));
    }
  }, 500);
};

export const fetchPortfolio = (photographerId: string) => (dispatch: any) => {
  dispatch(fetchPortfolioStart());
  
  // Simulate API call
  setTimeout(() => {
    const photos = mockPhotos.filter(p => p.photographerId === photographerId);
    dispatch(fetchPortfolioSuccess(photos));
  }, 500);
};

export const {
  fetchPhotographersStart, fetchPhotographersSuccess, fetchPhotographersFailed,
  fetchPhotographerStart, fetchPhotographerSuccess, fetchPhotographerFailed,
  fetchPortfolioStart, fetchPortfolioSuccess, fetchPortfolioFailed,
  clearCurrentPhotographer
} = photographersSlice.actions;

export default photographersSlice.reducer;