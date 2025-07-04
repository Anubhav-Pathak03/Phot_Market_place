import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/authSlice';
import { Camera, Menu, X, Moon, Sun, User, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  
  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle dark mode toggle
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };
  
  return (
    <nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary-600 dark:text-primary-400"
          onClick={() => setIsOpen(false)}
        >
          <Camera className="h-6 w-6" />
          <span className="text-xl font-bold">PhotoMarket</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/" 
            className={`text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
              location.pathname === '/' 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/photographers" 
            className={`text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
              location.pathname.includes('/photographers') 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            Photographers
          </Link>
          <Link 
            to="/how-it-works" 
            className={`text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
              location.pathname === '/how-it-works' 
                ? 'text-primary-600 dark:text-primary-400' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            How It Works
          </Link>
          
          {/* Dark mode toggle */}
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>
          
          {/* Auth buttons */}
          {isAuthenticated ? (
            <div className="relative flex items-center space-x-4">
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                  location.pathname.includes('/dashboard') 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Log In
              </Link>
              <Link 
                to="/signup" 
                className="btn btn-primary py-2 px-4 text-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg py-4 px-6 absolute w-full">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`text-base font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                location.pathname === '/' 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/photographers" 
              className={`text-base font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                location.pathname.includes('/photographers') 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Photographers
            </Link>
            <Link 
              to="/how-it-works" 
              className={`text-base font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                location.pathname === '/how-it-works' 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            
            {/* Auth links for mobile */}
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className={`text-base font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                    location.pathname.includes('/dashboard') 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Log In
                </Link>
                <Link 
                  to="/signup" 
                  className="btn btn-primary py-2 px-4 text-base inline-block w-full text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
            
            {/* Dark mode toggle for mobile */}
            <button 
              onClick={toggleDarkMode}
              className="flex items-center space-x-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {isDarkMode ? (
                <>
                  <Sun className="h-5 w-5" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="h-5 w-5" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;