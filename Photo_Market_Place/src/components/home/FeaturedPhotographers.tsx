import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchPhotographers } from '../../store/slices/photographersSlice';
import { Card, CardContent } from '../ui/Card';
import { Star, MapPin } from 'lucide-react';

const FeaturedPhotographers: React.FC = () => {
  const dispatch = useDispatch();
  const { featuredPhotographers, isLoading } = useSelector(
    (state: RootState) => state.photographers
  );

  useEffect(() => {
    dispatch(fetchPhotographers() as any);
  }, [dispatch]);

  if (isLoading && featuredPhotographers.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Photographers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-t-lg" />
              <CardContent>
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Photographers</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Discover our hand-picked selection of top photographers across various specialties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPhotographers.map((photographer) => (
            <Link 
              key={photographer.id} 
              to={`/photographers/${photographer.id}`}
              className="hover:no-underline"
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative h-64">
                  <img 
                    src={photographer.coverImage} 
                    alt={photographer.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 p-4">
                      <span className="inline-flex items-center bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        ${photographer.hourlyRate}/hr
                      </span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={photographer.avatar} 
                        alt={photographer.name} 
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{photographer.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="h-3.5 w-3.5 mr-1" />
                          <span>{photographer.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-medium">{photographer.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {photographer.bio}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-1 mb-4">
                      {photographer.specialties.slice(0, 3).map((specialty, idx) => (
                        <span 
                          key={idx} 
                          className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    
                    <div className="text-right">
                      <span className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                        View Profile
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/photographers"
            className="btn btn-outline py-2 px-6"
          >
            View All Photographers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPhotographers;