import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Navigate } from 'react-router-dom';
import { User, Settings, Calendar, CreditCard, Camera, Users, FileText } from 'lucide-react';
import Button from '../components/ui/Button';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }
  
  const dashboardSections = {
    customer: [
      { title: 'My Bookings', icon: <Calendar className="h-5 w-5" />, count: 2 },
      { title: 'Favorite Photographers', icon: <Camera className="h-5 w-5" />, count: 5 },
      { title: 'Payment Methods', icon: <CreditCard className="h-5 w-5" />, count: 1 },
    ],
    photographer: [
      { title: 'Upcoming Sessions', icon: <Calendar className="h-5 w-5" />, count: 3 },
      { title: 'Portfolio', icon: <Camera className="h-5 w-5" />, count: 15 },
      { title: 'Reviews', icon: <FileText className="h-5 w-5" />, count: 24 },
      { title: 'Payments', icon: <CreditCard className="h-5 w-5" />, count: 8 },
    ],
    admin: [
      { title: 'All Users', icon: <Users className="h-5 w-5" />, count: 127 },
      { title: 'Photographers', icon: <Camera className="h-5 w-5" />, count: 42 },
      { title: 'Bookings', icon: <Calendar className="h-5 w-5" />, count: 76 },
      { title: 'Reports', icon: <FileText className="h-5 w-5" />, count: 12 },
    ],
  };
  
  const sections = dashboardSections[user.role as keyof typeof dashboardSections] || [];
  
  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center flex-wrap gap-4">
            <img 
              src={user.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400'} 
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                Welcome back, {user.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {user.role === 'customer' && 'Find and book your next photography session'}
                {user.role === 'photographer' && 'Manage your bookings and photography business'}
                {user.role === 'admin' && 'Manage the PhotoMarket platform'}
              </p>
            </div>
            <div className="ml-auto">
              <Button
                variant="outline"
                size="md"
                leftIcon={<Settings className="h-4 w-4" />}
              >
                Settings
              </Button>
            </div>
          </div>
        </div>
        
        {/* Dashboard sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mr-3">
                    {section.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{section.title}</h3>
                </div>
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium">
                  {section.count}
                </span>
              </div>
              <div className="h-24 bg-gray-50 dark:bg-gray-700/30 rounded-md flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Dashboard chart placeholder</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Recent activity */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Recent Activity</h2>
          
          <div className="space-y-4">
            {user.role === 'customer' && (
              <>
                <div className="flex items-start p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <div className="mr-4 mt-1">
                    <Calendar className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Booking Confirmed</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your session with Taylor Reed on July 15, 2025 has been confirmed.</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <div className="mr-4 mt-1">
                    <CreditCard className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Payment Processed</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Your payment of $240 for the session with Jamie Chen has been processed.</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">1 week ago</p>
                  </div>
                </div>
              </>
            )}
            
            {user.role === 'photographer' && (
              <>
                <div className="flex items-start p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <div className="mr-4 mt-1">
                    <User className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">New Booking Request</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">You have a new booking request from Emma Johnson for a family portrait session.</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">3 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <div className="mr-4 mt-1">
                    <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">New Review</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">You received a 5-star review from your recent wedding photoshoot with the Millers.</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">2 days ago</p>
                  </div>
                </div>
              </>
            )}
            
            {user.role === 'admin' && (
              <>
                <div className="flex items-start p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <div className="mr-4 mt-1">
                    <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">New User Registrations</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">5 new users have registered in the last 24 hours.</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <div className="mr-4 mt-1">
                    <FileText className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Support Tickets</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">3 unresolved support tickets require attention.</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">5 hours ago</p>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              size="md"
            >
              View All Activity
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;