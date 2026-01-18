import React from "react";
import { Link } from "react-router-dom";
import { FiMail, FiPhone, FiMapPin, FiHeart } from "react-icons/fi";

const Footer = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "All Books", link: "/all-books" },
  ];

  const quickLinks = [
    { title: "Privacy Policy", link: "/privacy" },
    { title: "Terms of Service", link: "/terms" },
    { title: "Contact Us", link: "/contact" },
  ];

  const categories = [
    { title: "Fiction", link: "/category/fiction" },
    { title: "Non-Fiction", link: "/category/non-fiction" },
    { title: "Best Sellers", link: "/bestsellers" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-t-2 border-gray-200 mt-20 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-12">
        {/* Top Section - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {/* Company Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                  alt="logo"
                  className="h-7 w-7 brightness-0 invert"
                />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900 tracking-tight">
                Book<span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Fiction</span>
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Your gateway to endless stories, knowledge, and inspiration. Discover your next great read with us.
            </p>
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiMail className="w-4 h-4 text-blue-600" />
                </div>
                <span>support@bookFiction.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <FiPhone className="w-4 h-4 text-green-600" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FiMapPin className="w-4 h-4 text-purple-600" />
                </div>
                <span>123 Kisa khwani bazar Peshawar, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {links.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    className="group inline-flex items-center text-sm text-gray-600 hover:text-orange-600 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.link}
                    className="group inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-teal-500 rounded-full"></div>
              Newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to get updates on new arrivals and special offers.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-200"
              />
              <button
                type="submit"
                className="group w-full px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 overflow-hidden relative"
              >
                <span className="relative z-10">Subscribe</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </form>
          </div>
        </div>

        {/* Divider with gradient */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t-2 border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-6 py-2 rounded-full border-2 border-gray-200">
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="group w-10 h-10 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-orange-400 text-gray-600 hover:text-orange-500 transition-all duration-200 hover:shadow-md hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="group w-10 h-10 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-blue-400 text-gray-600 hover:text-blue-500 transition-all duration-200 hover:shadow-md hover:scale-110"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="group w-10 h-10 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-pink-400 text-gray-600 hover:text-pink-500 transition-all duration-200 hover:shadow-md hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="group w-10 h-10 flex items-center justify-center rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 hover:border-red-400 text-gray-600 hover:text-red-500 transition-all duration-200 hover:shadow-md hover:scale-110"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </span>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            © 2026 Fiction. Made with 
            <FiHeart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> 
            for UET.
          </p>
          
          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {quickLinks.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer