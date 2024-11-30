'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSwipeable } from 'react-swipeable';

const WebStory = ({ story }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Prevent body scroll when story is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleNext = () => {
    if (currentPage < story.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
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
      className="fixed inset-0 w-screen h-screen bg-black"
      role="region"
      aria-label="Web Story Viewer"
    >
      <div className="relative w-full h-full max-w-[540px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <div className="relative w-full h-full">
              <Image
                src={`https://dmpsza32x691.cloudfront.net/${story[currentPage]?.image}`}
                alt={story[currentPage]?.title || 'Story image'}
                layout="fill"
                objectFit="cover"
                priority={true}
                quality={90}
                aria-hidden="false"
              />
              <div 
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/50 to-transparent"
                aria-live="polite"
              >
                <h1 className="text-white text-lg sm:text-xl font-bold mb-2">
                  {story[currentPage]?.title}
                </h1>
                <p className="text-white text-sm sm:text-base">
                  {story[currentPage]?.description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4 text-white opacity-75 hover:opacity-100 focus:opacity-100 transition-opacity"
          aria-label="Previous story"
          disabled={currentPage === 0}
        >
          <IoIosArrowBack size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4 text-white opacity-75 hover:opacity-100 focus:opacity-100 transition-opacity"
          aria-label="Next story"
          disabled={currentPage === story.length - 1}
        >
          <IoIosArrowForward size={24} />
        </button>

        {/* Progress Indicators */}
        <div 
          className="absolute top-0 left-0 right-0 flex gap-1 p-2"
          role="progressbar"
          aria-valuemin="1"
          aria-valuemax={story.length}
          aria-valuenow={currentPage + 1}
        >
          {story.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 rounded-full ${
                index === currentPage ? 'bg-white' : 'bg-gray-500'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebStory;
