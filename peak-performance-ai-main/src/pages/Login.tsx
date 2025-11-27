import React from 'react';
import { Navigation } from "@/components/Navigation";
import LoginComponent from "@/components/Login";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation />
      <div className="flex items-center justify-center p-4">
        <LoginComponent />
      </div>
    </div>
  );
};

export default Login;
