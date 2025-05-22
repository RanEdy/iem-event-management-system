import TrancitionForm from '@/components/loginUI/TrancitionForm'; // Adjust the route if necessary
import React from 'react';

const ForgotPasswordPage = () => {
  return (
    // You can wrap the form with any layout or container you use in your application.
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <TrancitionForm />
    </div>
  );
};

export default ForgotPasswordPage;