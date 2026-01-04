const TeamIcon = ({ className = '', ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 512 512" 
    className={`w-24 h-24 text-red-500 ${className}`}
    {...props}
  >
    <path d="M 256 384 C 185.308 384 128 441.308 128 512 L 0 512 C 0 370.616 114.616 256 256 256 L 256 384 Z M 512 256 C 512 397.384 397.384 512 256 512 L 256 384 C 326.692 384 384 326.692 384 256 Z M 256 128 C 185.308 128 128 185.308 128 256 L 0 256 C 0 114.616 114.616 0 256 0 Z M 512 0 C 512 141.384 397.384 256 256 256 L 256 128 C 326.692 128 384 70.692 384 0 Z" 
      fill="currentColor"
    />
  </svg>
);

export default TeamIcon;
