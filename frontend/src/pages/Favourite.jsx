import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../components/Books/BookCard";
import Loader from "./Loader";

const Favourite = () => {
  const [FavBooks, setFavBooks] = useState();
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-favourite-books",
        { headers }
      );
      setFavBooks(res.data.data);
    };
    fetch();
  });

  return (
    <div className="min-h-screen">
      {!FavBooks && <Loader />}
      
      {/* Empty State */}
      {FavBooks && FavBooks.length === 0 && (
        <div className="min-h-[80vh] flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <div className="inline-block p-6 bg-gradient-to-br from-orange-100 to-red-100 rounded-full shadow-lg mb-6">
                <svg className="w-20 h-20 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
              No Favourites Yet
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Start adding books to your favourites and they'll appear here. Discover your next great read!
            </p>
            <button
              onClick={() => window.location.href = "/all-books"}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-red-500 hover:to-pink-500 transition-all duration-300"
            >
              Explore Books
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Favourites List */}
      {FavBooks && FavBooks.length > 0 && (
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-red-200 rounded-full text-sm font-medium text-red-600 shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Your Collection
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-2">
              Favourite <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Books</span>
            </h1>
            <p className="text-lg text-gray-600">
              {FavBooks.length} {FavBooks.length === 1 ? 'book' : 'books'} you've saved
            </p>
          </div>

          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {FavBooks.map((items, i) => (
              <BookCard
                bookid={items._id}
                image={items.url}
                title={items.title}
                author={items.author}
                price={items.price}
                key={i}
                fav={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourite;