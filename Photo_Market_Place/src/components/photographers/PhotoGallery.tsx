import React, { useState } from 'react';
import { Photo } from '../../types';
import { XCircle } from 'lucide-react';

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  const openPhotoModal = (photo: Photo) => {
    setSelectedPhoto(photo);
    document.body.style.overflow = 'hidden';
  };
  
  const closePhotoModal = () => {
    setSelectedPhoto(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <div>
      <div className="gallery-grid">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            className="photo-card cursor-pointer fade-in" 
            onClick={() => openPhotoModal(photo)}
          >
            <img 
              src={photo.imageUrl} 
              alt={photo.title} 
              className="w-full h-full object-cover"
            />
            <div className="image-mask">
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h4 className="text-lg font-medium">{photo.title}</h4>
                {photo.description && (
                  <p className="text-sm text-white/80">{photo.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={closePhotoModal}
            className="absolute top-4 right-4 text-white/80 hover:text-white focus:outline-none"
            aria-label="Close modal"
          >
            <XCircle className="h-8 w-8" />
          </button>
          
          <div className="w-full max-w-5xl max-h-[90vh] relative">
            <img 
              src={selectedPhoto.imageUrl} 
              alt={selectedPhoto.title} 
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            
            <div className="mt-4 text-white">
              <h3 className="text-xl font-medium">{selectedPhoto.title}</h3>
              {selectedPhoto.description && (
                <p className="text-white/80 mt-1">{selectedPhoto.description}</p>
              )}
              
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedPhoto.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-1 bg-white/10 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;