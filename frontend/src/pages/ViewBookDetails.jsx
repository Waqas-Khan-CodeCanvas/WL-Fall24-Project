import React, { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";
import { GrLanguage } from "react-icons/gr";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import { BiBook } from "react-icons/bi";
import axios from "axios";
import Loader from "./Loader";
import toast from "react-hot-toast";

const ViewBookDetails = () => {
  const { id } = useParams();
  const role = useSelector((state) => state.auth.role);
  const history = useNavigate();
  const [Book, setBook] = useState();
  const [isAddingToFav, setIsAddingToFav] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setBook(res.data.data);
    };
    fetch();
  }, [id]);

  const headers = {
    bookid: id,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const addToFavourite = async () => {
    setIsAddingToFav(true);
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-favourite",
        {},
        { headers }
      );
      toast.success(response.data.message)
    } catch (error) {
      console.log(error);
    } finally {
      setIsAddingToFav(false);
    }
  };

  const addToCart = async () => {
    setIsAddingToCart(true);
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-cart",
        {},
        { headers }
      );
      toast.success(response.data.message)
    } catch (error) {
      console.log(error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const deleteBook = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        const response = await axios.delete(
          "http://localhost:1000/api/v1/delete-book",
          { headers }
        );
        toast.success(response.data.message)
        history("/all-books");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {!Book && <Loader />}
      {Book && (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-6 lg:px-12 py-12 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link 
                to="/all-books" 
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Books
              </Link>
            </div>

            {/* Main Content */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="flex flex-col lg:flex-row">
                {/* Left Side - Book Image */}
                <div className="w-full lg:w-2/5 bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12 flex items-center justify-center relative">
                  {/* Decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-bl-full"></div>
                  
                  <div className="relative group">
                    <img
                      src={Book.url}
                      alt={Book.title}
                      className="h-[60vh] lg:h-[75vh] rounded-2xl shadow-2xl object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Right Side - Book Details */}
                <div className="w-full lg:w-3/5 p-8 lg:p-12">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200 rounded-full text-sm font-medium text-orange-600 mb-6">
                    <BiBook className="w-4 h-4" />
                    Featured Book
                  </div>

                  {/* Title */}
                  <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-3 leading-tight">
                    {Book.title}
                  </h1>

                  {/* Author */}
                  <p className="text-lg text-gray-600 mb-6">
                    by <span className="font-semibold text-gray-800">{Book.author}</span>
                  </p>

                  {/* Rating (Mock - you can replace with real data) */}
                  <div className="flex items-center gap-2 mb-8">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <IoStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">(4.8 / 5.0)</span>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-3">
                      Description
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {Book.desc}
                    </p>
                  </div>

                  {/* Book Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <GrLanguage className="text-blue-600 text-xl" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Language</p>
                          <p className="text-sm font-bold text-gray-900">{Book.language}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4 border border-green-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <BiBook className="text-green-600 text-xl" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 font-medium">Format</p>
                          <p className="text-sm font-bold text-gray-900">Hardcover</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-gradient-to-r from-orange-50 via-red-50 to-pink-50 rounded-2xl p-6 mb-8 border border-orange-200">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg text-gray-600 font-medium">Price:</span>
                      <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                        ₹{Book.price}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {localStorage.getItem("id") && (
                    <div className="flex flex-col sm:flex-row gap-4">
                      {role !== "admin" && (
                        <>
                          <button
                            onClick={addToCart}
                            disabled={isAddingToCart}
                            className="group flex-1 relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 overflow-hidden disabled:opacity-50"
                          >
                            <span className="relative z-10 flex items-center gap-3">
                              <FaCartShopping className="text-xl" />
                              {isAddingToCart ? "Adding..." : "Add to Cart"}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                          </button>

                          <button
                            onClick={addToFavourite}
                            disabled={isAddingToFav}
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-md border-2 border-pink-300 text-pink-600 text-lg font-semibold rounded-xl hover:bg-white hover:border-pink-400 hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                          >
                            <GoHeartFill className="text-xl" />
                            <span className="hidden sm:inline">
                              {isAddingToFav ? "Adding..." : "Favourite"}
                            </span>
                          </button>
                        </>
                      )}

                      {role === "admin" && (
                        <>
                          <Link
                            to={`/update-book/${id}`}
                            className="group flex-1 relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 overflow-hidden"
                          >
                            <span className="relative z-10 flex items-center gap-3">
                              <FaRegEdit className="text-xl" />
                              Edit Book
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                          </Link>

                          <button
                            onClick={deleteBook}
                            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/80 backdrop-blur-md border-2 border-red-300 text-red-600 text-lg font-semibold rounded-xl hover:bg-red-50 hover:border-red-400 hover:shadow-lg transition-all duration-300"
                          >
                            <MdDelete className="text-xl" />
                            <span className="hidden sm:inline">Delete</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {!localStorage.getItem("id") && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <p className="text-gray-700 mb-4">
                        Please <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">log in</Link> to add this book to your cart or favourites.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info Section */}
            <div className="mt-12 bg-white/80 backdrop-blur-md rounded-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                About This <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Book</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                  <div className="text-3xl mb-3">📖</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Free Shipping</h4>
                  <p className="text-sm text-gray-600">On orders over ₹500</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-pink-50 rounded-xl border border-orange-100">
                  <div className="text-3xl mb-3">🎁</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Gift Wrapping</h4>
                  <p className="text-sm text-gray-600">Available at checkout</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-100">
                  <div className="text-3xl mb-3">↩️</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Easy Returns</h4>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;