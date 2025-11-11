import React from 'react';

const Header = () => {
  return (
    <header className="bg-card text-card-foreground shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img 
              src="/src/assets/logo.png" 
              alt="Midak Dark Logo" 
              className="h-10 w-auto"
            />
          </div>
          <nav className="hidden md:ml-6 md:flex md:space-x-8">
            <a href="#" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Home
            </a>
            <a href="#services" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Services
            </a>
            <a href="#appointment" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Book Appointment
            </a>
            <a href="#contact" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </a>
          </nav>
          <div className="flex items-center md:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div className="pt-2 pb-3 space-y-1">
          <a href="#" className="text-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium">
            Home
          </a>
          <a href="#services" className="text-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium">
            Services
          </a>
          <a href="#appointment" className="text-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium">
            Book Appointment
          </a>
          <a href="#contact" className="text-foreground hover:bg-accent hover:text-accent-foreground block px-3 py-2 rounded-md text-base font-medium">
            Contact
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
