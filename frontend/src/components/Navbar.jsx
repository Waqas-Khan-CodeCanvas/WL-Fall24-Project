import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiShoppingCart, FiUser, FiHome, FiBook, FiSettings } from "react-icons/fi";

const Navbar = () => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const links = [
    { title: "Home", link: "/", icon: FiHome },
    { title: "All Books", link: "/all-books", icon: FiBook },
    isLoggedIn && { title: "Cart", link: "/cart", icon: FiShoppingCart },
    isLoggedIn && role === "user" && { title: "Profile", link: "/profile", icon: FiUser },
    isLoggedIn && role === "admin" && {
      title: "Admin Panel",
      link: "/profile",
      icon: FiSettings,
    },
  ].filter(Boolean);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/98 backdrop-blur-xl shadow-lg border-b border-gray-200' 
            : 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                    alt="logo"
                    className="h-7 w-7 brightness-0 invert"
                  />
                </div>
                <div className="absolute inset-0 bg-orange-500/30 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                Book<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Fiction</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-2">
              {links.map((item, i) => {
                const Icon = item.icon;
                const active = isActive(item.link);
                return (
                  <Link
                    key={i}
                    to={item.link}
                    className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 group flex items-center gap-2 ${
                      active
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${active ? 'text-orange-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
                    {item.title}
                    {active && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500" />
                    )}
                  </Link>
                );
              })}

              {!isLoggedIn && (
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="group relative px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg shadow-md hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200 relative"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
              {isLoggedIn && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="lg:hidden fixed top-20 left-0 right-0 bg-white border-b border-gray-200 shadow-2xl z-50 animate-slide-down">
            <div className="mx-auto max-w-7xl px-6 py-6">
              <div className="flex flex-col gap-2">
                {links.map((item, i) => {
                  const Icon = item.icon;
                  const active = isActive(item.link);
                  return (
                    <Link
                      key={i}
                      to={item.link}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 text-base font-semibold rounded-xl transition-all duration-200 ${
                        active
                          ? 'text-orange-600 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${active ? 'text-orange-600' : 'text-gray-500'}`} />
                      {item.title}
                      {active && (
                        <span className="ml-auto">
                          <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </Link>
                  );
                })}

                {!isLoggedIn && (
                  <div className="flex flex-col gap-3 mt-4 pt-4 border-t-2 border-gray-100">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 px-4 py-3.5 text-base font-semibold text-gray-700 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-200 border-2 border-gray-200"
                    >
                      <FiUser className="w-5 h-5" />
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="group relative flex items-center justify-center gap-2 px-4 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                        Sign Up
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;