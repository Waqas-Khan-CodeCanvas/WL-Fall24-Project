import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-[90vh] rounded-2xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 rounded-2xl">
        {/* Geometric shapes */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-orange-400/30 to-red-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-green-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Decorative dots pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-600 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-orange-600 rounded-full"></div>
          <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-green-600 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-purple-600 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-pink-600 rounded-full"></div>
          <div className="absolute top-2/3 right-1/2 w-2 h-2 bg-teal-600 rounded-full"></div>
        </div>

        {/* Abstract book illustrations */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-100/60 to-transparent"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 lg:px-0 max-w-4xl animate-fade-in">
        <div className="mb-6 inline-block">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-md border border-blue-200 rounded-full text-sm font-medium text-blue-700 shadow-sm">
            <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Welcome to BookFiction
          </span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-display font-bold text-gray-900 mb-6 leading-tight">
          Discover Your Next
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
            Great Read
          </span>
        </h1>
        
        <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/all-books"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-secondary-500/30 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Discover Books</span>
            <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-secondary-700 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </Link>
          
          <Link
            to="/all-books"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-md border-2 border-primary-300 text-primary-700 text-lg font-semibold rounded-xl hover:bg-white hover:border-primary-400 hover:shadow-md transition-all duration-300"
          >
            Browse Collection
          </Link>
        </div>

        {/* Stats or Features */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="group text-center p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-blue-100 hover:shadow-md transition-all duration-300">
            <div className="text-3xl lg:text-4xl font-bold text-blue-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">10k+</div>
            <div className="text-sm text-gray-600">Books Available</div>
          </div>
          <div className="group text-center p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-blue-100 hover:shadow-md transition-all duration-300">
            <div className="text-3xl lg:text-4xl font-bold text-blue-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">5k+</div>
            <div className="text-sm text-gray-600">Happy Readers</div>
          </div>
          <div className="group text-center p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-blue-100 hover:shadow-md transition-all duration-300">
            <div className="text-3xl lg:text-4xl font-bold text-blue-800 mb-2 group-hover:text-orange-600 transition-colors duration-300">500+</div>
            <div className="text-sm text-gray-600">New Arrivals</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-gray-400 animate-bounce">
          <span className="text-xs font-medium">Scroll to explore</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;