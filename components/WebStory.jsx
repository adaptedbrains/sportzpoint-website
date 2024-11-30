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
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        overflow: 'hidden',
        touchAction: 'none'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 w-full h-full"
        >
          {story[currentPage] && (
            <Image
              src={`https://dmpsza32x691.cloudfront.net/${story[currentPage].pages[0].image}`}
              alt={story[currentPage].pages[0].heading}
              className="object-cover object-center"
              fill
              sizes="100vw"
              priority
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons - Only show on desktop */}
      {!isMobile && (
        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
          <button
            onClick={handlePrevious}
            className={`p-2 rounded-full bg-black/50 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 ${
              currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-black/70 cursor-pointer'
            }`}
            disabled={currentPage === 0}
          >
            <IoIosArrowBack size={24} />
          </button>

          <button
            onClick={handleNext}
            className={`p-2 rounded-full bg-black/50 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 ${
              currentPage === story.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-black/70 cursor-pointer'
            }`}
            disabled={currentPage === story.length - 1}
          >
            <IoIosArrowForward size={24} />
          </button>
        </div>
      )}

      {/* Touch Navigation Areas with Arrows */}
      <div className="absolute inset-0 flex touch-none">
        <div 
          className="w-1/2 h-full relative flex items-center justify-start" 
          onClick={handlePrevious}
        >
          {currentPage > 0 && (
            <div className="absolute left-4 bg-black/20 rounded-full p-2 backdrop-blur-sm">
              <IoIosArrowBack size={24} className="text-white/90" />
            </div>
          )}
        </div>
        <div 
          className="w-1/2 h-full relative flex items-center justify-end" 
          onClick={handleNext}
        >
          {currentPage < story.length - 1 && (
            <div className="absolute right-4 bg-black/20 rounded-full p-2 backdrop-blur-sm">
              <IoIosArrowForward size={24} className="text-white/90" />
            </div>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-0 left-0 right-0 flex space-x-1 p-2 z-10">
        {story.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-white/30 overflow-hidden rounded-full">
            <motion.div
              initial={{ width: index < currentPage ? "100%" : "0%" }}
              animate={{ 
                width: index === currentPage ? "100%" : index < currentPage ? "100%" : "0%"
              }}
              transition={{ 
                duration: index === currentPage ? 5 : 0,
                ease: "linear"
              }}
              className="h-full bg-white"
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={`content-${currentPage}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-20 pb-safe px-4"
      >
        {story[currentPage] && <>
          <h1 className="text-white text-lg font-bold mb-2">{story[currentPage].pages[0].heading}</h1>
          <p className="text-gray-200 text-sm leading-relaxed mb-safe">{story[currentPage].pages[0].description}</p>
        </>}
      </motion.div>
    </div>
  );
};

export default WebStory;
