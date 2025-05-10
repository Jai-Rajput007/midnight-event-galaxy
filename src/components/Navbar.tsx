
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'EVENTS', path: '/events' },
    { name: 'SPONSOR', path: '/sponsors' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-xl font-bold">
          MOONSTONE 2k25
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-white hover:text-gray-300 transition-colors py-2 ${
                location.pathname === link.path ? 'border-b-2 border-white' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Auth buttons */}
          <div className="ml-4 flex items-center space-x-2">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black"
                  asChild
                >
                  <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                    {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  className="bg-white text-black hover:bg-gray-200"
                  asChild
                >
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden pt-20`}
      >
        <div className="flex flex-col items-center space-y-6 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-white hover:text-gray-300 text-lg ${
                location.pathname === link.path ? 'border-b-2 border-white' : ''
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          {/* Auth buttons for mobile */}
          <div className="mt-6 flex flex-col space-y-4 w-2/3">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black w-full"
                  asChild
                >
                  <Link to={user.role === 'admin' ? '/admin' : '/dashboard'}>
                    {user.role === 'admin' ? 'Admin Panel' : 'Dashboard'}
                  </Link>
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10 w-full"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-black w-full"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  className="bg-white text-black hover:bg-gray-200 w-full"
                  asChild
                >
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
