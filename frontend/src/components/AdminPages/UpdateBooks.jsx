import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FiImage, FiBook, FiUser, FiDollarSign, FiGlobe, FiFileText, FiSave, FiArrowLeft } from "react-icons/fi";
import Loader from "../../pages/Loader";
import toast from "react-hot-toast";

const UpdateBooks = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1000/api/v1/get-book-by-id/${id}`
        );
        setData({
          url: res.data.data.url,
          title: res.data.data.title,
          author: res.data.data.author,
          price: res.data.data.price,
          desc: res.data.data.desc,
          language: res.data.data.language,
        });
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetch();
  }, [id]);

  const headers = {
    bookid: id,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const update = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        toast.error("All fields are required")
      } else {
        setIsUpdating(true);
        const response = await axios.put(
          "http://localhost:1000/api/v1/update-book",
          Data,
          { headers }
        );
        toast.success(response.data.message)
        history(`/view-book-details/${id}`);
      }
    } catch (error) {
      toast.error(error.response.data.message)
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-6 lg:px-12 py-12 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            to={`/view-book-details/${id}`}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition-colors duration-300"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Book Details
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full text-sm font-medium text-blue-600 mb-4">
            <FiBook className="w-4 h-4" />
            Admin Panel
          </div>
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-2">
            Update <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Book</span>
          </h1>
          <p className="text-lg text-gray-600">
            Edit the book details below and save your changes
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/90 backdrop-blur-md border-2 border-gray-200 rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
          {/* Image URL */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <FiImage className="text-white text-sm" />
              </div>
              Book Cover Image URL
            </label>
            <input
              type="text"
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
              placeholder="https://example.com/book-cover.jpg"
              name="url"
              required
              value={Data.url}
              onChange={change}
            />
            {Data.url && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-600 font-medium mb-2">Current Preview:</p>
                <img 
                  src={Data.url} 
                  alt="Book preview" 
                  className="h-32 rounded-lg shadow-md object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Title */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <FiBook className="text-white text-sm" />
              </div>
              Book Title
            </label>
            <input
              type="text"
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300"
              placeholder="Enter book title"
              name="title"
              required
              value={Data.title}
              onChange={change}
            />
          </div>

          {/* Author */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <FiUser className="text-white text-sm" />
              </div>
              Author Name
            </label>
            <input
              type="text"
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300"
              placeholder="Enter author name"
              name="author"
              required
              value={Data.author}
              onChange={change}
            />
          </div>

          {/* Language and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                  <FiGlobe className="text-white text-sm" />
                </div>
                Language
              </label>
              <input
                type="text"
                className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300"
                placeholder="e.g., English"
                name="language"
                required
                value={Data.language}
                onChange={change}
              />
            </div>

            {/* Price */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                  <FiDollarSign className="text-white text-sm" />
                </div>
                Price (₹)
              </label>
              <input
                type="number"
                className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all duration-300"
                placeholder="Enter price"
                name="price"
                required
                value={Data.price}
                onChange={change}
                min="0"
              />
            </div>
          </div>

          {/* Description */}
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                <FiFileText className="text-white text-sm" />
              </div>
              Book Description
            </label>
            <textarea
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3.5 text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300 resize-none"
              rows="6"
              placeholder="Enter a detailed description of the book..."
              name="desc"
              required
              value={Data.desc}
              onChange={change}
            />
            <p className="mt-2 text-sm text-gray-500">
              {Data.desc.length} characters
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-gray-100">
            <Link
              to={`/view-book-details/${id}`}
              className="w-full sm:w-auto px-6 py-3.5 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 text-center"
            >
              Cancel
            </Link>
            
            <button
              onClick={update}
              disabled={isUpdating}
              className="group w-full sm:w-auto relative inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 overflow-hidden disabled:opacity-50"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isUpdating ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
                    <FiSave className="w-5 h-5" />
                    Update Book
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t-2 border-gray-100">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">💾</div>
              <p className="text-sm font-semibold text-gray-900 mb-1">Auto-save</p>
              <p className="text-xs text-gray-600">Changes saved instantly</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-100 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🔄</div>
              <p className="text-sm font-semibold text-gray-900 mb-1">Version Control</p>
              <p className="text-xs text-gray-600">Track all changes</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">✅</div>
              <p className="text-sm font-semibold text-gray-900 mb-1">Validation</p>
              <p className="text-xs text-gray-600">All fields verified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBooks;