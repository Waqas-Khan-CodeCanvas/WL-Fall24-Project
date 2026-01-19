import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Profile/Sidebar";
import Loader from "./Loader";
import MobileBar from "../components/Profile/MobileBar";

const Profile = () => {
  const [ProfileData, setProfileData] = useState();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const history = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      history("/");
    } else {
      const fetch = async () => {
        const response = await axios.get(
          "http://localhost:1000/api/v1/getUserData",
          { headers }
        );
        setProfileData(response.data);
      };
      fetch();
    }
  }, []);

  return (
    <>
      {!ProfileData && <Loader />}
      {ProfileData && (
        <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4 md:px-8 lg:px-12 py-12 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-orange-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-purple-200 rounded-full text-sm font-medium text-purple-600 shadow-sm mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                My Account
              </div>
              <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-2">
                Welcome Back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">{ProfileData.username}</span>
              </h1>
              <p className="text-lg text-gray-600">
                Manage your account, orders, and preferences
              </p>
            </div>

            {/* Main Content Layout */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar - Desktop */}
              <div className="hidden lg:block lg:w-80">
                <div className="sticky top-6">
                  <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <Sidebar ProfileData={ProfileData} />
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Bar */}
              <div className="lg:hidden mb-4">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <MobileBar />
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 min-h-[70vh] overflow-hidden">
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;