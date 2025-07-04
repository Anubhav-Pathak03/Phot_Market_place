import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { AtSign, User, KeyRound, Eye, EyeOff, CameraIcon } from 'lucide-react';

// Form validation schema
const signupSchema = z.object({
  name: z.string().min(2, 'Name must have at least 2 characters').max(50, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  role: z.enum(['customer', 'photographer']),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'customer',
    },
  });
  
  const selectedRole = watch('role');
  
  const onSubmit = (data: SignupFormData) => {
    console.log(data);
    // In a real app, this would call an API to register the user
    
    // For demo purposes, just delay to simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        alert(`User registration submitted! Check console for details.`);
        resolve();
      }, 1500);
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg max-w-md mx-auto p-8 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Create Your Account</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Role selection */}
          <div className="flex rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
            <label
              className={`flex-1 text-center py-3 cursor-pointer ${
                selectedRole === 'customer' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <input
                type="radio"
                value="customer"
                {...register('role')}
                className="sr-only"
              />
              <User className="h-5 w-5 mx-auto mb-1" />
              <span className="text-sm font-medium">I'm a Customer</span>
            </label>
            <label
              className={`flex-1 text-center py-3 cursor-pointer ${
                selectedRole === 'photographer' 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <input
                type="radio"
                value="photographer"
                {...register('role')}
                className="sr-only"
              />
              <CameraIcon className="h-5 w-5 mx-auto mb-1" />
              <span className="text-sm font-medium">I'm a Photographer</span>
            </label>
          </div>
          
          {/* Name */}
          <div>
            <label htmlFor="name" className="form-label">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="form-input pl-10"
                placeholder="Your full name"
              />
            </div>
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="form-label">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <AtSign className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="form-input pl-10"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>
          
          {/* Password */}
          <div>
            <label htmlFor="password" className="form-label">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                className="form-input pl-10 pr-10"
                placeholder="Create a password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && <p className="form-error">{errors.password.message}</p>}
          </div>
          
          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <KeyRound className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                {...register('confirmPassword')}
                className="form-input pl-10 pr-10"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="form-error">{errors.confirmPassword.message}</p>}
          </div>
          
          {/* Terms and conditions */}
          <div className="flex items-start mt-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
                I agree to the <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-500 dark:text-primary-400">Privacy Policy</a>
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            fullWidth
          >
            Create Account
          </Button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;