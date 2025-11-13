'use client';

import React from 'react';
import { Search, Gift, Calendar, Heart, User } from 'lucide-react';

function LowerBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
      <div className="flex justify-around items-center py-2">
        {/* Explore */}
        <button className="flex flex-col items-center py-2 px-3 min-w-0">
          <Search className="w-6 h-6 text-gray-600 mb-1" />
          <span className="text-xs text-gray-600">Explore</span>
        </button>

        {/* Offers */}
        <button className="flex flex-col items-center py-2 px-3 min-w-0">
          <Gift className="w-6 h-6 text-[#C16B3E] mb-1" />
          <span className="text-xs text-[#C16B3E] font-medium">Offers</span>
        </button>

        {/* Bookings */}
        <button className="flex flex-col items-center py-2 px-3 min-w-0">
          <Calendar className="w-6 h-6 text-gray-600 mb-1" />
          <span className="text-xs text-gray-600">Bookings</span>
        </button>

        {/* Wishlist */}
        <button className="flex flex-col items-center py-2 px-3 min-w-0">
          <Heart className="w-6 h-6 text-gray-600 mb-1" />
          <span className="text-xs text-gray-600">Wishlist</span>
        </button>

        {/* Sign In */}
        <button className="flex flex-col items-center py-2 px-3 min-w-0">
          <User className="w-6 h-6 text-gray-600 mb-1" />
          <span className="text-xs text-gray-600">Sign In</span>
        </button>
      </div>
    </div>
  );
}

export default LowerBar;
