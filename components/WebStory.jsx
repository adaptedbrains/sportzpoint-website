'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSwipeable } from 'react-swipeable';
import { IoClose } from 'react-icons/io5';

const WebStory = ({ story }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Debug logging
    console.log('Current story:', story);
    console.log('Current page data:', story[currentPage]);
    console.log('Image URL:', story[currentPage]?.banner_image ? 
      `https://dmpsza32x691.cloudfront.net/${story[currentPage].banner_image}` : 
      '/placeholder.jpg'
    );
  }, [story, currentPage]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 1, 100));
      } else {
        handleNext();
      }
    }, 50);

    return () => clearInterval(timer);
  }, [progress, currentPage]);

  const handleNext = () => {
    if (currentPage < story.length - 1) {
      setCurrentPage(currentPage + 1);
      setProgress(0);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      setProgress(0);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  return (
    <div 
      {...handlers}
      className="fixed inset-0 w-screen h-screen bg-black z-50"
      role="region"
      aria-label="Web Story Viewer"
    >
      <div className="relative w-full h-full max-w-[540px] mx-auto">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 z-50 flex gap-1 p-2">
          {story.map((_, index) => (
            <div 
              key={index} 
              className="flex-1 h-1 bg-gray-500/30 rounded overflow-hidden"
            >
              <div 
                className={`h-full bg-white transition-all duration-100 ease-linear ${
                  index === currentPage ? 'w-[' + progress + '%]' : 
                  index < currentPage ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 right-4 z-50 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
          aria-label="Close story"
        >
          <IoClose size={24} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <div className="relative w-full h-full">
              <Image
                src={story[currentPage]?.banner_image ? `https://dmpsza32x691.cloudfront.net/${story[currentPage].banner_image}` : '/placeholder.jpg'}
                alt={story[currentPage]?.title || 'Story image'}
                fill
                sizes="(max-width: 540px) 100vw, 540px"
                priority={true}
                quality={90}
                className="object-cover"
                aria-hidden="false"
              />
              <div 
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/50 to-transparent"
                aria-live="polite"
              >
                <h1 className="text-white text-xl sm:text-2xl font-bold mb-3 leading-tight">
                  {story[currentPage]?.title}
                </h1>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  {story[currentPage]?.description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="absolute inset-y-0 left-0 w-1/3 z-40" onClick={handlePrevious} />
        <div className="absolute inset-y-0 right-0 w-1/3 z-40" onClick={handleNext} />

        {/* Visual Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 text-white/75 hover:text-white focus:text-white transition-colors z-50"
          aria-label="Previous story"
          disabled={currentPage === 0}
        >
          <IoIosArrowBack size={28} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 text-white/75 hover:text-white focus:text-white transition-colors z-50"
          aria-label="Next story"
          disabled={currentPage === story.length - 1}
        >
          <IoIosArrowForward size={28} />
        </button>
      </div>
    </div>
  );
};

export default WebStory;
