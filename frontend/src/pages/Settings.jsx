import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { FiUser, FiMail, FiMapPin, FiSave } from "react-icons/fi";
import toast from "react-hot-toast";

const Settings = () => {
  const [ProfileData, setProfileData] = useState();
  const [Value, setValue] = useState({ address: "" });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
    setIsSaved(false);
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/getUserData",
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const updateAddress = async () => {
    setIsUpdating(true);
    try {
      const res = await axios.put(
        "http://localhost:1000/api/v1/update-user-address",
        Value,
        { headers }
      );
      toast.success(res.data.message)
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      {!ProfileData && <Loader />}
      {ProfileData && (
        <div className="h-full p-6 md:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full text-sm font-medium text-blue-600 mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              Account Settings
            </div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 mb-2">
              Profile <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Settings</span>
            </h1>
            <p className="text-gray-600">
              Manage your account information and preferences
            </p>
          </div>

          {/* Account Information Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <FiUser className="text-white text-sm" />
              </div>
              Account Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Username Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FiUser className="text-blue-500" />
                  Username
                </label>
                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-4 transition-all duration-300">
                    <p className="font-semibold text-gray-900">
                      {ProfileData.username}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      Read Only
                    </span>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <FiMail className="text-purple-500" />
                  Email Address
                </label>
                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl p-4 transition-all duration-300">
                    <p className="font-semibold text-gray-900">
                      {ProfileData.email}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                      Read Only
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <FiMapPin className="text-white text-sm" />
              </div>
              Delivery Address
            </h2>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FiMapPin className="text-orange-500" />
                Full Address
              </label>
              <textarea
                className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all duration-300 resize-none"
                rows="5"
                placeholder="Enter your complete delivery address..."
                name="address"
                value={Value.address}
                onChange={change}
              />
              <p className="text-sm text-gray-500 mt-2">
                This address will be used for all book deliveries
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t-2 border-gray-100">
            <div className="flex items-center gap-2">
              {isSaved && (
                <div className="flex items-center gap-2 text-green-600 animate-fade-in">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">Changes saved successfully!</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              <button
                onClick={() => setValue({ address: ProfileData.address })}
                className="flex-1 sm:flex-none px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
              >
                Cancel
              </button>
              
              <button
                onClick={updateAddress}
                disabled={isUpdating}
                className="group flex-1 sm:flex-none relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 overflow-hidden disabled:opacity-50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiSave className="text-lg" />
                  {isUpdating ? "Updating..." : "Update Address"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🔒</div>
              <p className="text-sm font-semibold text-gray-900 mb-1">Secure Account</p>
              <p className="text-xs text-gray-600">Your data is encrypted</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-pink-50 border border-orange-100 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">🚚</div>
              <p className="text-sm font-semibold text-gray-900 mb-1">Fast Delivery</p>
              <p className="text-xs text-gray-600">Track your orders</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 rounded-xl p-4 text-center">
              <div className="text-2xl mb-2">💬</div>
              <p className="text-sm font-semibold text-gray-900 mb-1">24/7 Support</p>
              <p className="text-xs text-gray-600">We're here to help</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;