import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-order-history",
        { headers }
      );
      setOrderHistory(res.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-8 lg:p-10">
      {!OrderHistory && <Loader />}
      
      {/* Empty State */}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="mb-8 relative">
              <div className="inline-block p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl shadow-xl mb-6 relative">
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-orange-400/30 to-pink-400/30 rounded-full blur-xl animate-pulse"></div>
                <svg className="w-24 h-24 text-blue-500 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
              No Orders <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Yet</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Your order history is empty. Start exploring our collection and place your first order today!
            </p>
            <Link
              to="/all-books"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-2">
                Browse Books
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </Link>
          </div>
        </div>
      )}
      
      {/* Order History List */}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="space-y-8">
          {/* Header */}
          <div>
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full text-sm font-medium text-blue-600 shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Your Orders
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-2">
              Order <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">History</span>
            </h1>
            <p className="text-lg text-gray-600">
              Track and review your {OrderHistory.length} {OrderHistory.length === 1 ? 'order' : 'orders'}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-1">
                {OrderHistory.length}
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Orders</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-1">
                {OrderHistory.filter(item => item.status !== "Canceled").length}
              </div>
              <p className="text-sm text-gray-600 font-medium">Active Orders</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-100 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-600 mb-1">
                ₹{OrderHistory.reduce((sum, item) => sum + item.book.price, 0)}
              </div>
              <p className="text-sm text-gray-600 font-medium">Total Spent</p>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block bg-white/90 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 px-6 py-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-bold text-gray-700 uppercase tracking-wider">
                <div className="col-span-1">#</div>
                <div className="col-span-3">Book Details</div>
                <div className="col-span-4">Description</div>
                <div className="col-span-1">Price</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">Payment</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {OrderHistory.map((items, i) => (
                <div
                  key={i}
                  className="px-6 py-5 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-300 group"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Serial Number */}
                    <div className="col-span-1">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-700 font-bold text-sm">{i + 1}</span>
                      </div>
                    </div>

                    {/* Book Title */}
                    <div className="col-span-3">
                      <Link
                        to={`/view-book-details/${items.book._id}`}
                        className="text-gray-900 font-semibold hover:text-orange-600 transition-colors duration-200 line-clamp-2 group-hover:text-orange-600"
                      >
                        {items.book.title}
                      </Link>
                    </div>

                    {/* Description */}
                    <div className="col-span-4">
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {items.book.desc}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="col-span-1">
                      <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                        ₹{items.book.price}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      {items.status === "Order placed" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 text-yellow-700 text-xs font-bold rounded-full shadow-sm">
                          <svg className="w-3.5 h-3.5 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          {items.status}
                        </span>
                      )}
                      {items.status === "Canceled" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-100 to-red-50 border border-red-300 text-red-700 text-xs font-bold rounded-full shadow-sm">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                          {items.status}
                        </span>
                      )}
                      {items.status !== "Order placed" && items.status !== "Canceled" && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-100 to-green-50 border border-green-300 text-green-700 text-xs font-bold rounded-full shadow-sm">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {items.status}
                        </span>
                      )}
                    </div>

                    {/* Payment Mode */}
                    <div className="col-span-1">
                      <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-300 text-gray-700 text-xs font-bold rounded-lg shadow-sm">
                        COD
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {OrderHistory.map((items, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-md border-2 border-gray-200 rounded-2xl shadow-lg p-5 space-y-4 hover:shadow-xl hover:border-orange-200 transition-all duration-300"
              >
                {/* Order Number & Status */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white font-bold">{i + 1}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-500">Order #{i + 1}</span>
                  </div>
                  {items.status === "Order placed" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-300 text-yellow-700 text-xs font-bold rounded-full">
                      {items.status}
                    </span>
                  )}
                  {items.status === "Canceled" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-100 to-red-50 border border-red-300 text-red-700 text-xs font-bold rounded-full">
                      {items.status}
                    </span>
                  )}
                  {items.status !== "Order placed" && items.status !== "Canceled" && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-100 to-green-50 border border-green-300 text-green-700 text-xs font-bold rounded-full">
                      {items.status}
                    </span>
                  )}
                </div>

                {/* Book Details */}
                <div>
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="text-lg font-bold text-gray-900 hover:text-orange-600 transition-colors duration-200 line-clamp-2"
                  >
                    {items.book.title}
                  </Link>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {items.book.desc}
                  </p>
                </div>

                {/* Price & Payment */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                  <div>
                    <span className="text-xs text-gray-500 block mb-1 font-medium">Total Amount</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                      ₹{items.book.price}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500 block mb-1 font-medium">Payment</span>
                    <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-300 text-gray-700 text-xs font-bold rounded-lg">
                      COD
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;