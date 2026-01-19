import React, { useEffect } from "react";
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="px-2 lg:px-2 py-1 animate-fade-in">
        <Hero />
      </section>

      {/* Divider with decorative element */}
      <div className="relative">
        {/* <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div> */}
        <div className="relative flex justify-center">
          <span className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 px-6">
            <svg className="w-8 h-1 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </span>
        </div>
      </div>

      {/* Recently Added Section */}
      <section className="animate-slide-up">
        <RecentlyAdded />
      </section>
    </div>
  );
};

export default Home;