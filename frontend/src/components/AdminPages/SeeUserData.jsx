import React from "react";
import { RxCross1 } from "react-icons/rx";
import { FiUser, FiMail, FiMapPin } from "react-icons/fi";

const SeeUserData = ({ userDivData, userDiv, setuserDiv }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300`}
        onClick={() => setuserDiv("hidden")}
      ></div>

      {/* Modal */}
      <div
        className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center z-50 p-4`}
      >
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100 animate-fade-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl px-6 py-6">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                  <FiUser className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-white">
                    User Information
                  </h2>
                  <p className="text-sm text-white/80">Customer details</p>
                </div>
              </div>
              <button
                onClick={() => setuserDiv("hidden")}
                className="p-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all duration-200 hover:scale-110"
              >
                <RxCross1 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Username */}
            <div className="group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                  <FiUser className="w-5 h-5 text-white" />
                </div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Username
                </label>
              </div>
              <div className="ml-13 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-100 rounded-xl px-4 py-3">
                <p className="text-gray-900 font-semibold">
                  {userDivData.username}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-md">
                  <FiMail className="w-5 h-5 text-white" />
                </div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Email Address
                </label>
              </div>
              <div className="ml-13 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-100 rounded-xl px-4 py-3">
                <p className="text-gray-900 font-semibold break-all">
                  {userDivData.email}
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="group">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                  <FiMapPin className="w-5 h-5 text-white" />
                </div>
                <label className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Delivery Address
                </label>
              </div>
              <div className="ml-13 bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-100 rounded-xl px-4 py-3">
                <p className="text-gray-900 font-semibold leading-relaxed">
                  {userDivData.address || "No address provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-b-2xl px-6 py-4 border-t-2 border-gray-200">
            <button
              onClick={() => setuserDiv("hidden")}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData