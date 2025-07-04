import React from 'react';
import { Search, Calendar, CameraIcon, CreditCard } from 'lucide-react';

const steps = [
  {
    icon: <Search className="h-8 w-8" />,
    title: 'Discover',
    description: 'Browse through our curated selection of professional photographers and view their portfolios.',
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: 'Book',
    description: 'Select a photographer, choose a date, and customize your photography session.',
  },
  {
    icon: <CameraIcon className="h-8 w-8" />,
    title: 'Shoot',
    description: 'Meet your photographer and create amazing photos that capture your special moments.',
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: 'Receive',
    description: 'Get your professionally edited photos delivered through our secure platform.',
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 dark:text-gray-400">
            PhotoMarket makes it easy to find and book professional photographers in just a few simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                {step.icon}
              </div>
              <div className="relative mb-6 mt-2">
                <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                {index < steps.length - 1 && (
                  <div className="absolute top-3 -right-12 w-8 h-0.5 bg-primary-200 dark:bg-primary-800 hidden lg:block" />
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;