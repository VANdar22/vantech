import React from 'react';

const ImageMask = ({ children, width = '100%', height = '100%', className = '' }) => {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        viewBox="0 0 420 300" 
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id="merged-shape-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.1 0.033 L 0.424 0.033 A 0.107 0.107 0 0 1 0.5 0.14 L 0.5 0.86 A 0.107 0.107 0 0 1 0.424 0.967 L 0.1 0.967 A 0.107 0.107 0 0 1 0 0.86 L 0 0.14 A 0.107 0.107 0 0 1 0.1 0.033 Z M 0.5 0.267 L 0.9 0.267 A 0.107 0.107 0 0 1 1 0.373 L 1 0.627 A 0.107 0.107 0 0 1 0.9 0.733 L 0.5 0.733 Z M 0.5 0.16 C 0.5 0.24 0.513 0.267 0.576 0.267 H 0.5 Z M 0.5 0.84 C 0.5 0.76 0.513 0.733 0.576 0.733 H 0.5 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className="w-full h-full" style={{ clipPath: 'url(#merged-shape-clip)' }}>
        {children}
      </div>
    </div>
  );
};

export default ImageMask;
