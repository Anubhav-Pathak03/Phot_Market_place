import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchPhotographers } from '../store/slices/photographersSlice';
import PhotographerCard from '../components/photographers/PhotographerCard';
import { Search, Filter, Map, Grid, List } from 'lucide-react';
import Button from '../components/ui/Button';

const PhotographersListPage: React.FC = () => {
  const dispatch = useDispatch();
  const { photographers, isLoading } = useSelector(
    (state: RootState) => state.photographers
  );
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  useEffect(() => {
    dispatch(fetchPhotographers() as any);
  }, [dispatch]);
  
  // Filter photographers based on search query
  const filteredPhotographers = photographers.filter(photographer => 
    photographer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photographer.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photographer.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    photographer.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Find Photographers</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Browse and connect with talented photographers for your next project or event
          </p>
          
          {/* Search bar */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search photographers by name, specialty, location..."
              className="form-input pl-10 pr-4 py-3 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filters and view toggle */}
          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-3">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Filter className="h-4 w-4" />}
              onClick={() => setShowFilters(!showFilters)}
            >
              Filters
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">View:</span>
              <div className="flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
                <button
                  className={`p-2 ${
                    viewMode === 'grid' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  className={`p-2 ${
                    viewMode === 'list' 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
              
              <Button
                variant="outline"
                size="md"
                leftIcon={<Map className="h-4 w-4" />}
              >
                Map View
              </Button>
            </div>
          </div>
          
          {/* Additional filters */}
          {showFilters && (
            <div className="bg-white dark:bg-gray-800 p-4 rounded-md border border-gray-200 dark:border-gray-700 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="form-label">Location</label>
                <select className="form-input">
                  <option value="">Any location</option>
                  <option value="New York, NY">New York, NY</option>
                  <option value="Los Angeles, CA">Los Angeles, CA</option>
                  <option value="Chicago, IL">Chicago, IL</option>
                  <option value="San Francisco, CA">San Francisco, CA</option>
                  <option value="Denver, CO">Denver, CO</option>
                </select>
              </div>
              <div>
                <label className="form-label">Specialty</label>
                <select className="form-input">
                  <option value="">Any specialty</option>
                  <option value="Portrait">Portrait</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Landscape">Landscape</option>
                  <option value="Family">Family</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Event">Event</option>
                </select>
              </div>
              <div>
                <label className="form-label">Price Range</label>
                <select className="form-input">
                  <option value="">Any price</option>
                  <option value="budget">Budget ($50-100/hr)</option>
                  <option value="mid">Mid-range ($100-150/hr)</option>
                  <option value="premium">Premium ($150-200/hr)</option>
                  <option value="luxury">Luxury ($200+/hr)</option>
                </select>
              </div>
            </div>
          )}
          
          {/* Results count */}
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Showing {filteredPhotographers.length} photographers
          </div>
        </div>
        
        {/* Photographers grid */}
        {isLoading && photographers.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-t-lg" />
                <div className="bg-white dark:bg-gray-800 p-4 rounded-b-lg border border-gray-200 dark:border-gray-700">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPhotographers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">No photographers found matching your criteria</p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery('')}
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}`}>
            {filteredPhotographers.map((photographer) => (
              <PhotographerCard
                key={photographer.id}
                photographer={photographer}
                variant={viewMode}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default PhotographersListPage;