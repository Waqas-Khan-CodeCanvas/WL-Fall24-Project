import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      history("/");
    } else {
      const fetch = async () => {
        const res = await axios.get(
          "http://localhost:1000/api/v1/get-user-cart",
          { headers }
        );
        setCart(res.data.data);
      };
      fetch();
    }
  }, [Cart]);
  
  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [Cart]);
  
  const deletItem = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${id}`,
        {},
        { headers }
      );
      toast.success(response.data.message)
    } catch (error) {
      console.log(error);
    }
  };
  
  const PlaceOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:1000/api/v1/place-order`,
        { order: Cart },
        { headers }
      );
      toast.success(response.data.message)
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative px-6 lg:px-12 py-12 max-w-7xl mx-auto">
        {!Cart && <Loader />}
        
        {/* Empty Cart State */}
        {Cart && Cart.length === 0 && (
          <div className="min-h-[80vh] flex items-center justify-center">
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-block p-6 bg-white/80 backdrop-blur-md rounded-full shadow-lg mb-6">
                  <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any books yet. Start exploring our collection!
              </p>
              <button
                onClick={() => navigate("/all-books")}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-red-500 hover:to-pink-500 transition-all duration-300"
              >
                Browse Books
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Cart with Items */}
        {Cart && Cart.length > 0 && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-8">
                <div className="inline-block mb-4">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-orange-200 rounded-full text-sm font-medium text-orange-600 shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Shopping Cart
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-2">
                  Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Cart</span>
                </h1>
                <p className="text-lg text-gray-600">
                  {Cart.length} {Cart.length === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>

              {/* Cart Items List */}
              <div className="space-y-4">
                {Cart.map((items, i) => (
                  <div
                    key={i}
                    className="group bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-5">
                      {/* Book Image */}
                      <div className="flex-shrink-0">
                        <div className="relative w-full md:w-28 aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden">
                          <img
                            src={items.url}
                            alt={items.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Book Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                          {items.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {items.desc}
                        </p>
                        
                        {/* Price and Actions */}
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                            ₹{items.price}
                          </span>
                          
                          <button
                            onClick={() => deletItem(items._id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-600 font-medium rounded-xl hover:bg-red-100 hover:border-red-300 transition-all duration-200"
                          >
                            <AiFillDelete className="text-lg" />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({Cart.length} {Cart.length === 1 ? 'book' : 'books'})</span>
                      <span className="font-semibold">₹{Total}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                          ₹{Total}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={PlaceOrder}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-red-500 hover:to-pink-500 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Place Order
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-500">
                    <svg className="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Secure checkout
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;