'use client';

import React from 'react';

const BlinkBlur = () => {
  return (
    <div className="animate-pulse bg-gray-200 rounded-lg w-full h-full">
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
};

export default BlinkBlur;
