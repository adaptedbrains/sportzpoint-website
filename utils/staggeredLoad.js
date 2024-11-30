'use client';

export const staggeredLoad = (items, batchSize = 4, delay = 100) => {
  return new Promise((resolve) => {
    const results = [];
    let currentIndex = 0;

    const loadBatch = () => {
      const batch = items.slice(currentIndex, currentIndex + batchSize);
      results.push(...batch);
      currentIndex += batchSize;

      if (currentIndex >= items.length) {
        resolve(results);
      } else {
        setTimeout(loadBatch, delay);
      }
    };

    loadBatch();
  });
};

export const useStaggeredLoad = (initialDelay = 0) => {
  return {
    loadWithStagger: async (items, batchSize, delay) => {
      if (initialDelay) {
        await new Promise(resolve => setTimeout(resolve, initialDelay));
      }
      return staggeredLoad(items, batchSize, delay);
    }
  };
};
