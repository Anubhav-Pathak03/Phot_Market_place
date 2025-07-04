import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedPhotographers from '../components/home/FeaturedPhotographers';
import HowItWorks from '../components/home/HowItWorks';
import Testimonials from '../components/home/Testimonials';

const HomePage: React.FC = () => {
  return (
    <main>
      <Hero />
      <FeaturedPhotographers />
      <HowItWorks />
      <Testimonials />
    </main>
  );
};

export default HomePage;