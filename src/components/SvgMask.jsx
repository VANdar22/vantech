import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SvgMask = ({ children, className = '', ...props }) => {
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

  const containerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    backgroundColor: '#f5f5f5',
    transformStyle: 'preserve-3d',
    transform: isHovered 
      ? `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`
      : 'perspective(1000px) rotateY(0) rotateX(0)',
    transition: 'transform 0.3s ease-out',
    willChange: 'transform'
  };

  const imageContainerStyle = {
    width: '100%',
    height: '100%',
    transform: 'translateZ(0)', // Keep the image container static
    backfaceVisibility: 'hidden' // Prevent flickering
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transform: 'translateZ(0)', // Force hardware acceleration
    backfaceVisibility: 'hidden', // Prevent flickering
    willChange: 'transform',
    transition: 'none' // Remove any transitions from the image
  };

  return (
    <div 
      className={`relative ${className}`}
      style={containerStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="img"
      aria-label="Interactive image container"
      {...props}
    >
      <div style={imageContainerStyle}>
        {React.Children.map(children, child => 
          React.cloneElement(child, { 
            style: { 
              ...child.props.style,
              ...imageStyle
            } 
          })
        )}
      </div>
    </div>
  );
};

SvgMask.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default SvgMask;
