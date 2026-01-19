import React, { useEffect, useState } from "react";
import BookCard from "../Books/BookCard";
import axios from "axios";

const RecentlyAdded = () => {
  const [Books, setBooks] = useState();
  
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/get-recent-books"
      );
      setBooks(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {Books && (
        <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-6 lg:px-12 py-16 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-orange-200 rounded-full text-sm font-medium text-orange-600 shadow-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  New Arrivals
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                Recently Added <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Books</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our latest collection of captivating reads, handpicked just for you.
              </p>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {Books.map((items, i) => (
                <BookCard
                  bookid={items._id}
                  image={items.url}
                  title={items.title}
                  author={items.author}
                  price={items.price}
                  key={i}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <button className="group inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-md border-2 border-orange-300 text-orange-600 text-lg font-semibold rounded-xl hover:bg-white hover:border-orange-400 hover:shadow-lg transition-all duration-300">
                View All Books
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentlyAdded;