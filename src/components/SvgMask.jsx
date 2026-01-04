import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const SvgMask = ({ children, type = 'right', className = '', ...props }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };
  
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };
  // New SVG path with three shapes
  const rightMaskPath = 'M 242 10 L 448 10 A 32 32 0 0 1 480 42 L 480 258 A 32 32 0 0 1 448 290 L 210 290 L 210 290 L 210 42 A 32 32 0 0 1 242 10 Z M 42 90 L 210 90 L 210 90 L 210 290 L 210 290 L 42 290 A 32 32 0 0 1 10 258 L 10 122 A 32 32 0 0 1 42 90 Z M 462 10 L 518 10 A 32 32 0 0 1 550 42 L 550 148 A 32 32 0 0 1 518 180 L 462 180 A 32 32 0 0 1 430 148 L 430 42 A 32 32 0 0 1 462 10 Z M 210 58 C 210 81.872 204.24 90 178 90 H 210 Z';
  
  // Left mask (mirrored version of the right mask)
  const leftMaskPath = 'M 318 10 L 112 10 A 32 32 0 0 0 80 42 L 80 258 A 32 32 0 0 0 112 290 L 350 290 L 350 290 L 350 42 A 32 32 0 0 0 318 10 Z M 518 90 L 350 90 L 350 90 L 350 290 L 350 290 L 518 290 A 32 32 0 0 0 550 258 L 550 122 A 32 32 0 0 0 518 90 Z M 98 10 L 42 10 A 32 32 0 0 0 10 42 L 10 148 A 32 32 0 0 0 42 180 L 98 180 A 32 32 0 0 0 130 148 L 130 42 A 32 32 0 0 0 98 10 Z M 350 58 C 350 81.872 355.76 90 382 90 H 350 Z';
  
  const maskId = `svg-mask-${type}`;
  const pathData = type === 'right' ? rightMaskPath : leftMaskPath;

  const transformStyle = {
    transform: isHovered 
      ? `perspective(1000px) rotateY(${mousePosition.x * 15}deg) rotateX(${-mousePosition.y * 15}deg)`
      : 'perspective(1000px) rotateY(0) rotateX(0)',
    transition: 'transform 0.3s ease-out',
    transformStyle: 'preserve-3d',
    willChange: 'transform',
    width: '100%',
    height: '100%',
    position: 'relative',
  };

  const imageStyle = {
    transform: isHovered 
      ? `translateZ(20px)` 
      : 'translateZ(0)',
    transition: 'transform 0.3s ease-out',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  const shadowStyle = {
    position: 'absolute',
    top: '5%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    background: 'rgba(0,0,0,0.1)',
    filter: 'blur(10px)',
    transform: 'translateZ(-20px)',
    opacity: isHovered ? 0.6 : 0,
    transition: 'opacity 0.3s ease-out',
    borderRadius: '16px',
  };

  return (
    <div 
      className={`relative ${className}`}
      style={{
        width: '100%',
        height: '100%',
        clipPath: `url(#${maskId})`,
        WebkitClipPath: `url(#${maskId})`,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div style={transformStyle}>
      {/* Hidden SVG for the clip path definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id={maskId} clipPathUnits="objectBoundingBox">
            <path 
              d={pathData} 
              transform="scale(0.00179 0.00333)" // Adjusted scale to make it larger while fitting
              fillRule="nonzero"
            />
          </clipPath>
        </defs>
      </svg>
      
        {/* The content to be masked with 3D effect */}
        <div className="absolute inset-0 w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
          <div style={shadowStyle} />
          <div style={imageStyle}>
            {React.Children.map(children, child => 
              React.cloneElement(child, { 
                style: { 
                  ...child.props.style,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                } 
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

SvgMask.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string,
};

export default SvgMask;
