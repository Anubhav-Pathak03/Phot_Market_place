import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { 
  fetchPhotographer, 
  fetchPortfolio,
  clearCurrentPhotographer 
} from '../store/slices/photographersSlice';
import { clearBookingStatus } from '../store/slices/bookingsSlice';
import PhotoGallery from '../components/photographers/PhotoGallery';
import BookingForm from '../components/booking/BookingForm';
import { 
  Star, 
  MapPin, 
  Calendar, 
  Camera, 
  Instagram, 
  Globe, 
  Twitter, 
  Facebook,
  Heart,
  Share2,
  MessageCircle,
  X
} from 'lucide-react';
import Button from '../components/ui/Button';
import { toast, Toaster } from 'sonner';

const PhotographerDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const { currentPhotographer, portfolioPhotos, isLoading } = useSelector(
    (state: RootState) => state.photographers
  );
  
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    if (id) {
      dispatch(fetchPhotographer(id) as any);
      dispatch(fetchPortfolio(id) as any);
    }
    
    return () => {
      dispatch(clearCurrentPhotographer());
      dispatch(clearBookingStatus());
    };
  }, [dispatch, id]);
  
  const handleBookingSuccess = () => {
    setShowBookingForm(false);
    toast.success('Booking request sent successfully!');
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.success('Added to favorites!');
    }
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${currentPhotographer?.name} - PhotoMarket`,
        text: `Check out ${currentPhotographer?.name}'s photography portfolio`,
        url: window.location.href,
      }).catch(error => {
        console.log('Error sharing:', error);
      });
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success('Link copied to clipboard!'))
        .catch(error => console.error('Error copying link:', error));
    }
  };
  
  if (isLoading || !currentPhotographer) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg mb-8" />
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mb-4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2 mb-8" />
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/4 mb-4" />
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded" />
                ))}
              </div>
            </div>
            <div>
              <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <main className="pt-24 pb-16">
      <Toaster position="top-center" />
      
      {/* Cover image */}
      <div className="relative h-64 md:h-80 lg:h-96 mb-8 overflow-hidden">
        <img 
          src={currentPhotographer.coverImage} 
          alt={`${currentPhotographer.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <img 
                src={currentPhotographer.avatar} 
                alt={currentPhotographer.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white object-cover"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">{currentPhotographer.name}</h1>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm sm:text-base">{currentPhotographer.location}</span>
                  <div className="mx-3 h-1 w-1 rounded-full bg-white/60" />
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-amber-400 stroke-amber-400 mr-1" />
                    <span className="text-sm sm:text-base">{currentPhotographer.rating.toFixed(1)}</span>
                    <span className="text-xs text-white/70 ml-1">({currentPhotographer.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Bio */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">About Me</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">{currentPhotographer.bio}</p>
              
              {/* Tags & social */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentPhotographer.specialties.map((specialty, idx) => (
                  <span 
                    key={idx} 
                    className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
              
              {/* Gear list */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">My Gear</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                  {currentPhotographer.gear.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              
              {/* Social links */}
              <div className="flex gap-3">
                {currentPhotographer.socialLinks.instagram && (
                  <a 
                    href={currentPhotographer.socialLinks.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-pink-600 dark:text-gray-400 dark:hover:text-pink-400 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
                {currentPhotographer.socialLinks.website && (
                  <a 
                    href={currentPhotographer.socialLinks.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                    aria-label="Website"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                )}
                {currentPhotographer.socialLinks.twitter && (
                  <a 
                    href={currentPhotographer.socialLinks.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {currentPhotographer.socialLinks.facebook && (
                  <a 
                    href={currentPhotographer.socialLinks.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-800 dark:text-gray-400 dark:hover:text-blue-600 transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
            
            {/* Portfolio */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Portfolio</h2>
                <div className="flex space-x-2">
                  <button 
                    className={`p-2 rounded-full ${
                      isFavorite 
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                    }`}
                    onClick={toggleFavorite}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    onClick={handleShare}
                    aria-label="Share profile"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                  <button
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    aria-label="Contact photographer"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
              
              {portfolioPhotos.length > 0 ? (
                <PhotoGallery photos={portfolioPhotos} />
              ) : (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
                  <Camera className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-600 dark:text-gray-400">No portfolio photos available</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking widget */}
            <div className="sticky top-24">
              {!showBookingForm ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Book a Session</h3>
                  
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                      <span className="text-gray-900 dark:text-white">Hourly Rate</span>
                    </div>
                    <span className="font-semibold text-lg">${currentPhotographer.hourlyRate}</span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                    Book a photography session with {currentPhotographer.name}. Typical sessions last 2-3 hours.
                  </p>
                  
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      if (isAuthenticated) {
                        setShowBookingForm(true);
                      } else {
                        toast((t) => (
                          <div className="flex flex-col gap-2">
                            <p className="font-medium">Please log in to book a session</p>
                            <div className="flex gap-2 justify-end">
                              <button
                                className="btn-outline px-3 py-1 text-xs"
                                onClick={() => toast.dismiss(t)}
                              >
                                Close
                              </button>
                              <Link
                                to="/login"
                                className="btn-primary px-3 py-1 text-xs"
                                onClick={() => toast.dismiss(t)}
                              >
                                Log In
                              </Link>
                            </div>
                          </div>
                        ));
                      }
                    }}
                    fullWidth
                  >
                    Book Now
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Close booking form"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <BookingForm 
                    photographer={currentPhotographer}
                    onSuccess={handleBookingSuccess}
                  />
                </div>
              )}
              
              {/* Contact info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Contact</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Have questions? Contact {currentPhotographer.name} directly or book a session to discuss your project needs.
                </p>
                <Button
                  variant="outline"
                  fullWidth
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PhotographerDetailsPage;