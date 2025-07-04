import React from 'react';
import { Link } from 'react-router-dom';
import { Photographer } from '../../types';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import Button from '../ui/Button';

interface PhotographerCardProps {
  photographer: Photographer;
  variant?: 'grid' | 'list';
}

const PhotographerCard: React.FC<PhotographerCardProps> = ({ 
  photographer,
  variant = 'grid'
}) => {
  const isGrid = variant === 'grid';
  
  return (
    <Card className={`overflow-hidden flex ${isGrid ? 'flex-col' : 'flex-row'}`}>
      <div 
        className={`relative ${
          isGrid ? 'h-56' : 'h-full w-40 sm:w-56 md:w-72'
        }`}
      >
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
        <div className="flex items-start justify-between mb-4">
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
            <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({photographer.reviewCount})</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {photographer.bio}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {photographer.specialties.map((specialty, idx) => (
            <span 
              key={idx} 
              className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
            >
              {specialty}
            </span>
          ))}
        </div>
        
        <div className="mt-auto flex justify-between items-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(photographer.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </div>
          <Link to={`/photographers/${photographer.id}`}>
            <Button
              variant="primary"
              size="sm"
            >
              View Profile
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotographerCard;