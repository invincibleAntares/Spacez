'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

function MainSection() {
  const [activeTab, setActiveTab] = useState('Coupons');
  const [collectedItems, setCollectedItems] = useState<any[]>([]);
  const [claimedSections, setClaimedSections] = useState({
    giftCards: false,
    paymentOffers: false
  });

  // Refs for section elements
  const couponsRef = useRef<HTMLDivElement>(null);
  const giftcardsRef = useRef<HTMLDivElement>(null);
  const paymentOffersRef = useRef<HTMLDivElement>(null);

  const coupons = [
    {
      id: 1,
      value: '₹1,500',
      title: 'LONGSTAY',
      description: '15% off when you book for 5 days or more and 20% off when you book for 30 days or more.'
    },
    {
      id: 2,
      value: '₹3,000',
      title: 'EARLYBIRD',
      description: '15% off when you book for 5 days or more and 20% off when you book for 30 days or more.'
    },
    {
      id: 3,
      value: 'Flat 10%',
      title: 'RUSHDEAL',
      description: '15% off when you book for 5 days or more and 20% off when you book for 30 days or more.'
    }
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const handleCollect = (item: any) => {
    // Check if item is already collected
    const isAlreadyCollected = collectedItems.some(collected => collected.id === item.id);
    if (!isAlreadyCollected) {
      setCollectedItems(prev => [...prev, item]);
    }
  };

  // Intersection Observer for scroll-based tab switching
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setActiveTab(sectionId);
            }
          }
        });
      },
      {
        threshold: [0.3, 0.7],
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    // Observe sections when they exist
    if (couponsRef.current) observer.observe(couponsRef.current);
    if (giftcardsRef.current) observer.observe(giftcardsRef.current);
    if (paymentOffersRef.current) observer.observe(paymentOffersRef.current);

    return () => {
      observer.disconnect();
    };
  }, [collectedItems]); // Re-run when collected items change (sections appear/disappear)

  return (
    <div className="w-full bg-white max-w-md mx-auto">
      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 px-4">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setActiveTab('Coupons')}
            className={`pb-3 text-base transition-colors ${
              activeTab === 'Coupons'
                ? 'text-gray-900 border-b-2 border-gray-900 font-bold'
                : 'text-gray-500 font-medium'
            }`}
          >
            Coupons
          </button>
          <button
            onClick={() => setActiveTab('Giftcards')}
            className={`pb-3 text-base transition-colors ${
              activeTab === 'Giftcards'
                ? 'text-gray-900 border-b-2 border-gray-900 font-bold'
                : 'text-gray-500 font-medium'
            }`}
          >
            Giftcards
          </button>
          <button
            onClick={() => setActiveTab('Payment Offers')}
            className={`pb-3 text-base transition-colors ${
              activeTab === 'Payment Offers'
                ? 'text-gray-900 border-b-2 border-gray-900 font-bold'
                : 'text-gray-500 font-medium'
            }`}
          >
            Payment Offers
          </button>
        </div>
      </div>

      {/* Coupons Content */}
      {activeTab === 'Coupons' && (
        <div className="px-4 py-6" ref={couponsRef} data-section="Coupons">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sitewide coupons:</h2>
          
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-[#F5F5DC] rounded-lg overflow-hidden flex shadow-sm"
              >
                {/* Left Section - Brown Strip with Perforated Edge */}
                <div className="bg-[#8B4513] relative flex items-center justify-center min-w-[80px]">
                  {/* Perforated edge effect */}
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-4"
                    style={{
                      background: '#F5F5DC',
                      clipPath: 'polygon(0 0, 100% 10%, 100% 30%, 0 50%, 100% 70%, 100% 90%, 0 100%)'
                    }}
                  ></div>
                  {/* Rotated text */}
                  <div className="transform -rotate-90 whitespace-nowrap z-10 px-2">
                    <span className="text-white font-bold text-lg">{coupon.value}</span>
                  </div>
                </div>

                {/* Right Section - Content */}
                <div className="flex-1 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{coupon.title}</h3>
                    <button
                      onClick={() => handleCopy(coupon.title)}
                      className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      <span className="text-sm">Copy</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{coupon.description}</p>
                  <button className="text-sm text-gray-700 hover:text-gray-900 underline">
                    Read more
                  </button>
                </div>
              </div>
            ))}

            {/* Display Collected Gift Cards */}
            {collectedItems.filter(item => item.id === 'myntra-gift' || item.id === 'hammer-gift').length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-1">Bonus gift cards:</h2>
                <p className="text-sm text-gray-600 mb-4">Collect multiple of these</p>
                
                <div className="space-y-4">
                  {collectedItems.filter(item => item.id === 'myntra-gift' || item.id === 'hammer-gift').map((item) => (
                    <div
                      key={`collected-${item.id}`}
                      className={`rounded-lg overflow-hidden flex shadow-sm ${item.bgColor || 'bg-[#F5F5DC]'}`}
                    >
                      {/* Left Section - Colored Strip */}
                      <div className={`relative flex items-center justify-center min-w-[80px] ${item.stripColor || 'bg-[#8B4513]'}`}>
                        <div 
                          className="absolute right-0 top-0 bottom-0 w-4"
                          style={{
                            background: item.bgColor || '#F5F5DC',
                            clipPath: 'polygon(0 0, 100% 10%, 100% 30%, 0 50%, 100% 70%, 100% 90%, 0 100%)'
                          }}
                        ></div>
                        <div className="transform -rotate-90 whitespace-nowrap z-10 px-2">
                          <span className="text-white font-bold text-lg">{item.value}</span>
                        </div>
                      </div>

                      {/* Right Section - Content */}
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {item.logo && (
                              <Image 
                                src={item.logo} 
                                alt={item.title} 
                                width={20} 
                                height={20}
                                className="h-5 w-5"
                              />
                            )}
                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                          </div>
                          <button
                            onClick={() => handleCopy(item.title)}
                            className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            <span className="text-sm">Copy</span>
                          </button>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                        <button className="text-sm text-gray-700 hover:text-gray-900 underline">
                          Read more
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Display Collected Payment Offers */}
            {collectedItems.filter(item => item.id === 'hdfc-payment').length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Payment offers:</h2>
                
                <div className="space-y-4">
                  {collectedItems.filter(item => item.id === 'hdfc-payment').map((item) => (
                    <div
                      key={`collected-${item.id}`}
                      className={`rounded-lg overflow-hidden flex shadow-sm ${item.bgColor || 'bg-[#F5F5DC]'}`}
                    >
                      {/* Left Section - Colored Strip */}
                      <div className={`relative flex items-center justify-center min-w-[80px] ${item.stripColor || 'bg-[#8B4513]'}`}>
                        <div 
                          className="absolute right-0 top-0 bottom-0 w-4"
                          style={{
                            background: item.bgColor || '#F5F5DC',
                            clipPath: 'polygon(0 0, 100% 10%, 100% 30%, 0 50%, 100% 70%, 100% 90%, 0 100%)'
                          }}
                        ></div>
                        <div className="transform -rotate-90 whitespace-nowrap z-10 px-2">
                          <span className="text-white font-bold text-lg">{item.value}</span>
                        </div>
                      </div>

                      {/* Right Section - Content */}
                      <div className="flex-1 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {item.logo && (
                              <Image 
                                src={item.logo} 
                                alt={item.title} 
                                width={20} 
                                height={20}
                                className="h-5 w-5"
                              />
                            )}
                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                          </div>
                          <button
                            onClick={() => handleCopy(item.title)}
                            className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            <span className="text-sm">Copy</span>
                          </button>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{item.description}</p>
                        <button className="text-sm text-gray-700 hover:text-gray-900 underline">
                          Read more
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bonus Gift Cards Section - Only show if not claimed */}
          {!claimedSections.giftCards && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Bonus gift cards:</h2>
              
              <div className="bg-[#FDF9F7] rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-base text-gray-800">
                      Assured vouchers up to{' '}
                      <span className="text-2xl font-bold text-gray-900">₹1000</span>
                      {' '}of trending brands
                    </p>
                  </div>
                  <div className="ml-4">
                    <Image 
                      src="/Group 1597884795.svg" 
                      alt="Gift cards" 
                      width={120} 
                      height={100}
                      className="h-auto w-auto"
                    />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  // Add both MYNTRA and HAMMER gift cards
                  handleCollect({
                    id: 'myntra-gift',
                    value: '₹1500',
                    title: 'MYNTRA',
                    description: 'Get this gift voucher on booking above ₹2000',
                    bgColor: 'bg-[#FEF9F8]',
                    stripColor: 'bg-[#E91E63]',
                    logo: '/myntra.png'
                  });
                  handleCollect({
                    id: 'hammer-gift',
                    value: '₹1000',
                    title: 'HAMMER',
                    description: 'Get this gift voucher on booking above ₹1500',
                    bgColor: 'bg-[#FEF9F8]',
                    stripColor: 'bg-[#000000]',
                    logo: '/hammer.svg'
                  });
                  // Mark gift cards section as claimed
                  setClaimedSections(prev => ({ ...prev, giftCards: true }));
                }}
                className="w-full bg-[#C16B3E] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center"
              >
                Claim gift cards »
              </button>
            </div>
          )}

          {/* Payment Offers Section - Only show if not claimed */}
          {!claimedSections.paymentOffers && (
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Payment offers:</h2>
              
              <div className="bg-[#FDF9F7] rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-base text-gray-800">
                      Save more on your bookings{' '}
                      <span className="text-xl font-bold text-gray-900">upto 15% Off</span>
                      {' '}on select payment methods
                    </p>
                  </div>
                  <div className="ml-4">
                    <Image 
                      src="/image 401.svg" 
                      alt="Payment offers" 
                      width={120} 
                      height={100}
                      className="h-auto w-auto"
                    />
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  // Add HDFC Bank payment offer
                  handleCollect({
                    id: 'hdfc-payment',
                    value: '10% OFF',
                    title: 'HDFC BANK',
                    description: 'Get 10% off on booking above ₹1500',
                    bgColor: 'bg-[#FDF9F7]',
                    stripColor: 'bg-[#1565C0]',
                    logo: '/hdfc.svg'
                  });
                  // Mark payment offers section as claimed
                  setClaimedSections(prev => ({ ...prev, paymentOffers: true }));
                }}
                className="w-full bg-[#C16B3E] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity text-center"
              >
                Unlock offers »
              </button>
            </div>
          )}
        </div>
      )}

      {/* Giftcards Content */}
      {activeTab === 'Giftcards' && (
        <div className="px-4 py-6" ref={giftcardsRef} data-section="Giftcards">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Bonus gift cards:</h2>
          <p className="text-sm text-gray-600 mb-4">Collect multiple of these</p>
          
          <div className="space-y-4">
            {/* MYNTRA Gift Card */}
            <div className="bg-[#FEF9F8] rounded-lg overflow-hidden flex shadow-sm">
              {/* Left Section - Pink Strip */}
              <div className="bg-[#E91E63] relative flex items-center justify-center min-w-[80px]">
                <div 
                  className="absolute right-0 top-0 bottom-0 w-4"
                  style={{
                    background: '#FEF9F8',
                    clipPath: 'polygon(0 0, 100% 10%, 100% 30%, 0 50%, 100% 70%, 100% 90%, 0 100%)'
                  }}
                ></div>
                <div className="transform -rotate-90 whitespace-nowrap z-10 px-2">
                  <span className="text-white font-bold text-lg">₹1500</span>
                </div>
              </div>

              {/* Right Section - Content */}
              <div className="flex-1 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Image 
                      src="/myntra.png" 
                      alt="MYNTRA" 
                      width={20} 
                      height={20}
                      className="h-5 w-5"
                    />
                    <h3 className="text-lg font-bold text-gray-900">MYNTRA</h3>
                  </div>
                  <button 
                    onClick={() => handleCollect({
                      id: 'myntra-gift',
                      value: '₹1500',
                      title: 'MYNTRA',
                      description: 'Get this gift voucher on booking above ₹2000',
                      bgColor: 'bg-[#FEF9F8]',
                      stripColor: 'bg-[#E91E63]',
                      logo: '/myntra.png'
                    })}
                    className="bg-[#C16B3E] text-white px-4 py-1 rounded text-sm font-medium"
                  >
                    Collect
                  </button>
                </div>
                <p className="text-sm text-gray-700 mb-2">Get this gift voucher on booking above ₹2000</p>
                <button className="text-sm text-gray-700 hover:text-gray-900 underline">
                  Read more
                </button>
              </div>
            </div>

            {/* HAMMER Gift Card */}
            <div className="bg-[#FEF9F8] rounded-lg overflow-hidden flex shadow-sm">
              {/* Left Section - Black Strip */}
              <div className="bg-[#000000] relative flex items-center justify-center min-w-[80px]">
                <div 
                  className="absolute right-0 top-0 bottom-0 w-4"
                  style={{
                    background: '#FEF9F8',
                    clipPath: 'polygon(0 0, 100% 10%, 100% 30%, 0 50%, 100% 70%, 100% 90%, 0 100%)'
                  }}
                ></div>
                <div className="transform -rotate-90 whitespace-nowrap z-10 px-2">
                  <span className="text-white font-bold text-lg">₹1000</span>
                </div>
              </div>

              {/* Right Section - Content */}
              <div className="flex-1 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Image 
                      src="/hammer.svg" 
                      alt="HAMMER" 
                      width={20} 
                      height={20}
                      className="h-5 w-5"
                    />
                    <h3 className="text-lg font-bold text-gray-900">HAMMER</h3>
                  </div>
                  <button 
                    onClick={() => handleCollect({
                      id: 'hammer-gift',
                      value: '₹1000',
                      title: 'HAMMER',
                      description: 'Get this gift voucher on booking above ₹1500',
                      bgColor: 'bg-[#FEF9F8]',
                      stripColor: 'bg-[#000000]',
                      logo: '/hammer.svg'
                    })}
                    className="bg-[#C16B3E] text-white px-4 py-1 rounded text-sm font-medium"
                  >
                    Collect
                  </button>
                </div>
                <p className="text-sm text-gray-700 mb-2">Get this gift voucher on booking above ₹1500</p>
                <button className="text-sm text-gray-700 hover:text-gray-900 underline">
                  Read more
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Offers Content */}
      {activeTab === 'Payment Offers' && (
        <div className="px-4 py-6" ref={paymentOffersRef} data-section="Payment Offers">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Payment offers:</h2>
          
          <div className="space-y-4">
            {/* HDFC Bank Offer */}
            <div className="bg-[#FDF9F7] rounded-lg overflow-hidden flex shadow-sm">
              {/* Left Section - Blue Strip */}
              <div className="bg-[#1565C0] relative flex items-center justify-center min-w-[80px]">
                <div 
                  className="absolute right-0 top-0 bottom-0 w-4"
                  style={{
                    background: '#FDF9F7',
                    clipPath: 'polygon(0 0, 100% 10%, 100% 30%, 0 50%, 100% 70%, 100% 90%, 0 100%)'
                  }}
                ></div>
                <div className="transform -rotate-90 whitespace-nowrap z-10 px-2">
                  <span className="text-white font-bold text-lg">10% OFF</span>
                </div>
              </div>

              {/* Right Section - Content */}
              <div className="flex-1 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Image 
                      src="/hdfc.svg" 
                      alt="HDFC BANK" 
                      width={20} 
                      height={20}
                      className="h-5 w-5"
                    />
                    <h3 className="text-lg font-bold text-gray-900">HDFC BANK</h3>
                  </div>
                  <button 
                    onClick={() => handleCollect({
                      id: 'hdfc-payment',
                      value: '10% OFF',
                      title: 'HDFC BANK',
                      description: 'Get 10% off on booking above ₹1500',
                      bgColor: 'bg-[#FDF9F7]',
                      stripColor: 'bg-[#1565C0]',
                      logo: '/hdfc.svg'
                    })}
                    className="bg-[#C16B3E] text-white px-4 py-1 rounded text-sm font-medium"
                  >
                    Collect
                  </button>
                </div>
                <p className="text-sm text-gray-700 mb-2">Get 10% off on booking above ₹1500</p>
                <button className="text-sm text-gray-700 hover:text-gray-900 underline">
                  Read more
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainSection;

