import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Camera } from 'lucide-react';
import Button from '../ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-950 to-primary-800 text-white">
      {/* Background image overlay */}
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      
      {/* Hero content */}
      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 fade-in">
            Find Your Perfect Photographer
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100 max-w-2xl mx-auto slide-up">
            Connect with professional photographers for your special moments. 
            Browse portfolios, check availability, and book your session seamlessly.
          </p>
          
          {/* Search form */}
          <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-sm p-2 rounded-lg shadow-lg border border-white/20 mb-10 scale-up">
            <div className="flex flex-col sm:flex-row">
              <div className="flex-grow flex items-center bg-white/10 rounded-md px-3 sm:mr-2 mb-2 sm:mb-0">
                <Search className="h-5 w-5 text-white/70 mr-2" />
                <input
                  type="text"
                  placeholder="Portrait, wedding, event photographer..."
                  className="bg-transparent w-full py-3 px-2 text-white placeholder-white/70 focus:outline-none"
                />
              </div>
              <Button
                variant="accent"
                size="lg"
                className="whitespace-nowrap"
              >
                Find Photographers
              </Button>
            </div>
          </div>
          
          {/* Hero buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 fade-in">
            <Link to="/photographers">
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Camera className="h-5 w-5" />}
                className="w-full sm:w-auto bg-white text-primary-800 hover:bg-gray-100"
              >
                Browse Portfolios
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-white text-white hover:bg-white/10"
              >
                Join as a Photographer
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Decorative pattern elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white dark:from-gray-950 to-transparent" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-600 opacity-20 rounded-full blur-3xl" />
      <div className="absolute top-20 right-20 w-32 h-32 bg-accent-500 opacity-20 rounded-full blur-3xl" />
    </div>
  );
};

export default Hero;