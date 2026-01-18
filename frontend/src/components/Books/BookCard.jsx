import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const BookCard = ({ image, title, author, price, bookid, fav }) => {
  const headers = {
    bookid: bookid,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  
  const removeFromFavourite = async () => {
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-from-favourite",
        {},
        { headers }
      );
     toast.success(response.data.message)
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="group w-full bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <Link to={`/view-book-details/${bookid}`}>
        {/* Book Image Container */}
        <div className="relative w-full aspect-[3/2.8] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Quick View Badge */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Book Details */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-orange-600 transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-sm text-gray-500 mb-3 line-clamp-1">
            by <span className="font-medium text-gray-700">{author}</span>
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              ₹{price}
            </span>
            
            {/* Add to Cart Icon */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-2 shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Remove from Favourites Button */}
      {fav === true && (
        <div className="px-5 pb-5">
          <button
            className="w-full py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 font-semibold hover:bg-red-100 hover:border-red-300 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
            onClick={removeFromFavourite}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            Remove from Favourites
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;