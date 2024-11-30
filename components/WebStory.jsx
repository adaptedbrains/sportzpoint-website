'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useSwipeable } from 'react-swipeable';

const WebStory = ({ story }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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

  const handleNext = useCallback(() => {
    if (currentPage < story.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, story.length]);

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrevious,
    onTouchStartOrOnMouseDown: handleTouchStart,
    onTouchEndOrOnMouseUp: handleTouchEnd,
    preventDefaultTouchmoveEvent: true,
    trackMouse: false
  });

  if (!story || !Array.isArray(story) || story.length === 0) {
    return null;
  }

  const currentStory = story[currentPage];
  if (!currentStory) {
    return null;
  }

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `https://dmpsza32x691.cloudfront.net/${path}`;
  };

  const imageUrl = getImageUrl(currentStory.image);

  return (
    <div 
      {...handlers}
      className="fixed inset-0 w-screen h-screen bg-black flex items-center justify-center"
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
      <div className="relative w-full h-full md:w-[400px] md:h-[711px] mx-auto">
        <div className="absolute top-0 left-0 right-0 z-50 p-2 flex justify-between items-start">
          <div className="flex-1 flex gap-1">
            {story.map((_, index) => (
              <div key={index} className="flex-1 h-[3px] bg-white/30 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: index === currentPage ? "100%" : index < currentPage ? "100%" : "0%" }}
                  transition={{ 
                    duration: index === currentPage && !isPaused ? 10 : 0,
                    ease: "linear"
                  }}
                  onAnimationComplete={() => {
                    if (index === currentPage && !isPaused) {
                      handleNext();
                    }
                  }}
                  className="h-full bg-white"
                />
              </div>
            ))}
          </div>

          <button 
            onClick={() => window.history.back()}
            className="ml-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
            aria-label="Close story"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative w-full h-full overflow-hidden bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              {/* Background image with blur */}
              <div className="absolute inset-0 bg-black">
                <Image
                  src={imageUrl}
                  alt=""
                  className="object-cover object-center opacity-30 blur-sm scale-110"
                  fill
                  priority
                />
              </div>

              {/* Main image */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={currentStory.heading}
                    className="object-contain"
                    fill
                    sizes="100vw"
                    priority
                  />
                </div>
              </div>

              {/* Content overlay */}
              <motion.div
                key={`content-${currentPage}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/50 to-transparent pt-32 pb-8 px-6"
              >
                <h1 className="text-white text-2xl font-bold mb-3 leading-tight">{currentStory.heading}</h1>
                <p className="text-white/90 text-base leading-relaxed max-w-[90%]">{currentStory.description}</p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation UI Layer */}
          <div className="absolute inset-0 z-40">
            {/* Navigation arrows */}
            <div className="absolute inset-0 flex items-center justify-between px-4">
              {currentPage > 0 && (
                <button
                  onClick={handlePrevious}
                  className="p-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-all"
                  aria-label="Previous story"
                >
                  <IoIosArrowBack size={24} className="text-white" />
                </button>
              )}
              <div className="flex-1" />
              {currentPage < story.length - 1 && (
                <button
                  onClick={handleNext}
                  className="p-3 rounded-full bg-black/20 backdrop-blur-sm hover:bg-black/40 transition-all"
                  aria-label="Next story"
                >
                  <IoIosArrowForward size={24} className="text-white" />
                </button>
              )}
            </div>

            {/* Touch areas */}
            <div className="absolute inset-0 flex">
              <div 
                className="w-1/3 h-full" 
                onClick={handlePrevious}
                aria-label="Previous story"
              />
              <div className="w-1/3 h-full" />
              <div 
                className="w-1/3 h-full" 
                onClick={handleNext}
                aria-label="Next story"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebStory;
