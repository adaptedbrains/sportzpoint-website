import React, { useState } from 'react';

const LoginSignUp = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Customise </h2>

     
        <div className="mb-4">
          {/* Signup form fields here */}
          <button
            onClick={toggleMode}
            className="mt-2 w-full inline-flex items-center justify-center px-4 py-1 border border-green-800 bg-green-800 rounded-full font-semibold text-white"
          >
            Create Account
          </button>
          <button
            onClick={toggleMode}
            className="mt-2 w-full inline-flex items-center justify-center px-4 py-1 border border-green-800 rounded-full font-semibold text-green-800"
          >
            Log In
          </button>
         
        </div>
     
    </div>
  );
};

export default LoginSignUp;