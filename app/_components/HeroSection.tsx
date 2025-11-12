'use client';

import React, { useState } from 'react';

function HeroSection() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = () => {
    setIsSignedIn(true);
  };

  return (
    <div className="w-full bg-white px-4 py-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-[#4B4E4B] mb-4">Offers</h1>
      
      {!isSignedIn ? (
        <>
          <p className="text-base text-[#4B4E4B] mb-6">
            Sign in to unlock exclusive additional rewards
          </p>
          <button
            onClick={handleSignIn}
            className="w-full bg-[#C16B3E] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center"
          >
            Sign in
          </button>
        </>
      ) : (
        <p className="text-base text-gray-800">
          Book directly with us to get exclusive benefits
        </p>
      )}
    </div>
  );
}

export default HeroSection;

