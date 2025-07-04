import React from 'react';
import SignupForm from '../components/auth/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <main className="pt-32 pb-16 flex flex-col items-center min-h-screen">
      <div className="container mx-auto px-4 max-w-md">
        <SignupForm />
      </div>
    </main>
  );
};

export default SignupPage;