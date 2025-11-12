'use client';

import React from 'react';
import Image from 'next/image';

function Navbar() {
  return (
    <nav className="w-full bg-[#FFFFFF] border-b border-gray-200 max-w-md mx-auto">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-1 h-6">
        <div className="text-sm font-medium text-gray-800">
          9:30
        </div>
        <div className="flex items-center gap-1">
          <Image 
            src="/right icons.svg" 
            alt="Status icons" 
            width={60} 
            height={16}
            className="h-4 w-auto"
          />
        </div>
      </div>

      {/* Main Navbar */}
      <div className="flex justify-between items-center px-4 py-3 h-14">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Image 
            src="/logo.svg" 
            alt="SPACEZ Logo" 
            width={32} 
            height={32}
            className="h-32 w-32"
          />
         
        </div>

        {/* Hamburger Menu */}
        <button className="flex flex-col gap-1.5 p-1" aria-label="Menu">
          <div className="w-5 h-0.5 bg-[#8B4513]"></div>
          <div className="w-5 h-0.5 bg-[#8B4513]"></div>
          <div className="w-5 h-0.5 bg-[#8B4513]"></div>
        </button>
      </div>
    </nav>
  )
}

export default Navbar