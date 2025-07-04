import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Emma Thompson',
    role: 'Wedding Client',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Finding our wedding photographer through PhotoMarket was the best decision. The platform made it easy to compare styles and book the perfect match for our special day.',
    rating: 5,
  },
  {
    name: 'Marcus Chen',
    role: 'Professional Photographer',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'Since joining PhotoMarket, my client base has grown exponentially. The platform handles all the booking logistics so I can focus on what I love - taking amazing photos.',
    rating: 5,
  },
  {
    name: 'Sophia Rodriguez',
    role: 'Family Portrait Client',
    image: 'https://images.pexels.com/photos/762080/pexels-photo-762080.jpeg?auto=compress&cs=tinysrgb&w=400',
    content: 'We needed family portraits and PhotoMarket made the process incredibly simple. We found a photographer whose style we loved, booked a session, and got beautiful results.',
    rating: 4,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What People Are Saying</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Hear from photographers and clients who have used PhotoMarket
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover-scale"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < testimonial.rating ? 'fill-current' : 'stroke-current fill-none opacity-40'}`} 
                  />
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;