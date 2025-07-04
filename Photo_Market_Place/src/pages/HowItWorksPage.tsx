import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  UserCheck, 
  CalendarCheck, 
  CreditCard, 
  Camera, 
  Download,
  CheckCircle
} from 'lucide-react';
import Button from '../components/ui/Button';

const steps = [
  {
    icon: <Search className="h-12 w-12" />,
    title: 'Browse Photographers',
    description: 'Search through our curated selection of professional photographers. Filter by location, specialty, price range, and ratings to find the perfect match.',
  },
  {
    icon: <UserCheck className="h-12 w-12" />,
    title: 'Create an Account',
    description: 'Sign up for a free account to save your favorite photographers, view detailed portfolios, and communicate directly with them.',
  },
  {
    icon: <CalendarCheck className="h-12 w-12" />,
    title: 'Book a Session',
    description: 'Choose a date and time for your session, specify the location, and share any special requests. Our easy booking system makes scheduling simple.',
  },
  {
    icon: <CreditCard className="h-12 w-12" />,
    title: 'Secure Payment',
    description: 'Pay with confidence using our secure payment system. We only release payment to the photographer after your session is completed.',
  },
  {
    icon: <Camera className="h-12 w-12" />,
    title: 'Enjoy Your Session',
    description: 'Meet your photographer at the scheduled time and location. They\'ll work with you to create beautiful photos that meet your vision.',
  },
  {
    icon: <Download className="h-12 w-12" />,
    title: 'Receive Your Photos',
    description: 'After your session, your photographer will edit and deliver your photos through our platform. Download high-resolution images directly to your devices.',
  },
];

const HowItWorksPage: React.FC = () => {
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">How PhotoMarket Works</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            We make it easy to connect with talented photographers and create amazing photos.
            Follow these simple steps to get started.
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto mb-16">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center fade-in">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                {step.icon}
              </div>
              <div className="mt-2">
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Photographer section */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Are You a Photographer?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Join PhotoMarket to showcase your work, connect with new clients, and grow your photography business.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  'Create a professional portfolio to showcase your work',
                  'Set your own pricing and availability',
                  'Receive booking requests and payments securely',
                  'Build your reputation with reviews and ratings',
                  'Access photographer resources and community',
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup">
                <Button
                  variant="primary"
                  size="lg"
                >
                  Join as a Photographer
                </Button>
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.pexels.com/photos/3933843/pexels-photo-3933843.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Photographer at work" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* FAQ */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                question: 'How much does it cost to use PhotoMarket?',
                answer: 'PhotoMarket is free to sign up and browse photographers. You only pay for the photography sessions you book, at the rates set by each photographer. We add a small service fee to each booking to maintain our platform.',
              },
              {
                question: 'Can I cancel or reschedule a booking?',
                answer: 'Yes, you can cancel or reschedule a booking according to the photographer\'s cancellation policy. Most photographers allow rescheduling at no cost with 48 hours notice. Cancellation policies vary by photographer and are clearly displayed before you book.',
              },
              {
                question: 'How are photographers vetted?',
                answer: 'All photographers on our platform go through a review process where we check their portfolio, credentials, and past client feedback. We also verify their identity and contact information to ensure a safe and professional experience.',
              },
              {
                question: 'When will I receive my photos?',
                answer: 'Delivery times vary by photographer and the type of session. Typically, you can expect to receive your edited photos within 1-2 weeks for standard sessions, and 4-6 weeks for events like weddings. The exact delivery timeline will be specified by your photographer.',
              },
              {
                question: 'What happens if I\'m not satisfied with my photos?',
                answer: 'If you\'re not completely satisfied with your photos, we encourage you to first communicate directly with your photographer to address your concerns. If issues remain unresolved, our customer support team can help mediate and find a solution, which may include partial refunds or reshoot opportunities in certain cases.',
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-primary-900 text-white rounded-lg p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Photographer?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of clients who have found their perfect photographer on PhotoMarket.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/photographers">
              <Button
                variant="accent"
                size="lg"
              >
                Browse Photographers
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Create an Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HowItWorksPage;