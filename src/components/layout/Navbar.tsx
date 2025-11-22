import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  LogIn,
  User,
  ArrowRight,
  Settings,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  // Scroll detection for shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Define menu items - base items always visible
  const baseMenuItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/directory', label: 'Business Directory' },
    { path: '/contact', label: 'Contact Us' },
  ];

  // Items visible only when authenticated
  const authMenuItems = [
    { path: '/manage-business', label: 'Manage Your Listing', icon: Settings },
    { path: '/favorites', label: 'Favourites', icon: Heart },
  ];

  const NavLinkItem = ({ path, label, icon: Icon }: { path: string; label: string; icon?: React.ComponentType<{ className?: string }> }) => {
    const isActive = location.pathname === path;

    return (
      <Link
        to={path}
        className={`
          relative px-3 xl:px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm xl:text-base
          group overflow-hidden
          ${isActive
            ? 'text-fem-terracotta font-semibold bg-gradient-to-r from-fem-terracotta/10 to-fem-gold/10'
            : 'text-gray-700 hover:text-fem-terracotta hover:bg-gradient-to-r hover:from-gray-50 hover:to-fem-gold/5'}
        `}
      >
        <span className="relative z-10 flex items-center">
          {Icon && <Icon className="w-4 h-4 inline mr-2 transition-transform duration-300 group-hover:scale-110" />}
          {label}
        </span>
        {isActive && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-fem-terracotta to-fem-gold rounded-full"></span>
        )}
        <span className="absolute inset-0 bg-gradient-to-r from-fem-terracotta/5 to-fem-gold/5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
      </Link>
    );
  };

  const MobileNavLink = ({ path, label, icon: Icon }: { path: string; label: string; icon?: React.ComponentType<{ className?: string }> }) => {
    const isActive = location.pathname === path;

    return (
      <Link
        to={path}
        className={`
          relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group active:scale-[0.98]
          ${isActive
            ? 'text-fem-terracotta font-semibold bg-white/60 backdrop-blur-sm shadow-md'
            : 'text-gray-700 hover:text-fem-terracotta hover:bg-white/40 hover:backdrop-blur-sm'}
        `}
        onClick={closeMenu}
      >
        {/* Active indicator line */}
        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-fem-terracotta to-fem-gold rounded-r-full"></div>
        )}
        
        <span className={`transition-all duration-300 ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}>
          {Icon && <Icon className={`w-5 h-5 ${isActive ? 'text-fem-terracotta' : 'text-gray-500 group-hover:text-fem-terracotta'}`} />}
        </span>
        <span className="flex-1 text-base">{label}</span>
        {isActive && (
          <div className="w-2 h-2 bg-fem-terracotta rounded-full"></div>
        )}
        {!isActive && (
          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 text-fem-terracotta" />
        )}
      </Link>
    );
  };

  return (
    <nav className={`sticky top-0 bg-white/95 backdrop-blur-lg border-b z-[100] transition-all duration-400 ${
      isScrolled ? 'shadow-lg border-gray-200' : 'shadow-sm border-gray-100'
    }`}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 md:py-4">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src="/NewFaithConnect (1).png"
              alt="Faith Connect Logo"
              className="h-10 sm:h-12 md:h-14 w-auto"
            />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {baseMenuItems.map((item) => (
              <NavLinkItem key={item.path} {...item} />
            ))}
            
            {/* Authenticated menu items - Only show "Manage Your Listing" for business users */}
            {isAuthenticated && authMenuItems
              .filter(item => {
                // Hide "Manage Your Listing" for community members
                if (item.path === '/manage-business' && (user?.user_type === 'community' || user?.userType === 'community')) {
                  return false;
                }
                return true;
              })
              .map((item) => (
                <NavLinkItem key={item.path} {...item} />
              ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 ml-6">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:text-fem-terracotta transition-all duration-300 hover:bg-gray-50 group"
                >
                  <User className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  <span className="font-medium">{user?.firstName || 'Profile'}</span>
                </Link>
                <Button
                  onClick={logout}
                  variant="outline"
                  size="sm"
                  className="border-2 border-gray-300 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all duration-300 hover:shadow-md active:scale-95"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-gradient-to-r from-fem-terracotta to-fem-gold hover:from-fem-terracotta/90 hover:to-fem-gold/90 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 group">
                  <LogIn className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:scale-110" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2.5 text-gray-700 hover:text-fem-terracotta hover:bg-fem-terracotta/10 rounded-lg transition-all duration-300 active:scale-95"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99998] lg:hidden animate-in fade-in duration-300"
            onClick={closeMenu}
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 99998
            }}
          />

          {/* Mobile Menu Content */}
          <div 
            className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white/80 backdrop-blur-2xl shadow-2xl z-[99999] lg:hidden overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-white/30"
            style={{ 
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100vh',
              width: '85vw',
              maxWidth: '24rem',
              zIndex: 99999,
              transform: 'translateX(0)',
              transition: 'transform 0.3s ease-out',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.85) 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-5 py-5 border-b border-white/20 bg-white/10 backdrop-blur-xl sticky top-0 z-10">
              <h2 className="text-xl font-semibold text-gray-800">Menu</h2>
              <button
                onClick={closeMenu}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-white/20 rounded-lg transition-all duration-200 active:scale-95"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <div className="px-4 py-6 space-y-3">
              {/* Base Menu Items */}
              {baseMenuItems.map((item) => (
                <MobileNavLink key={item.path} {...item} />
              ))}
              
              {/* Authenticated Menu Items - Only show "Manage Your Listing" for business users */}
              {isAuthenticated && (
                <>
                  {authMenuItems
                    .filter(item => {
                      // Hide "Manage Your Listing" for community members
                      if (item.path === '/manage-business' && (user?.user_type === 'community' || user?.userType === 'community')) {
                        return false;
                      }
                      return true;
                    })
                    .map((item) => (
                      <MobileNavLink key={item.path} {...item} />
                    ))}
                </>
              )}

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200/50"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 py-1 bg-white/40 backdrop-blur-sm rounded-full text-xs text-gray-600 font-medium">Account</span>
                </div>
              </div>

              {/* Auth Section */}
              {isAuthenticated ? (
                <div className="space-y-3">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:text-fem-terracotta hover:bg-white/40 hover:backdrop-blur-sm transition-all duration-300 group active:scale-[0.98]"
                    onClick={closeMenu}
                  >
                    <div className="w-9 h-9 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center border border-gray-200/50">
                      <User className="w-4 h-4 text-gray-600 group-hover:text-fem-terracotta transition-colors" />
                    </div>
                    <span className="font-medium text-base flex-1">{user?.firstName || 'Profile'}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300 text-fem-terracotta" />
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white bg-red-500/90 backdrop-blur-sm hover:bg-red-600 transition-all duration-300 font-medium shadow-sm hover:shadow-md active:scale-[0.98]"
                  >
                    <span className="text-base">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-fem-terracotta/90 backdrop-blur-sm text-white rounded-xl hover:bg-fem-terracotta transition-all duration-300 shadow-md hover:shadow-lg group active:scale-[0.98]"
                  onClick={closeMenu}
                >
                  <LogIn className="w-4 h-4" />
                  <span className="font-semibold text-base">Login</span>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export { Navbar };