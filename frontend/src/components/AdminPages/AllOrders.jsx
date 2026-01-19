import React, { useEffect, useState } from "react";
import Loader from "../../pages/Loader";
import { FaUserLarge, FaCheck } from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import { FiPackage, FiTruck, FiCheckCircle, FiXCircle, FiEdit2 } from "react-icons/fi";
import SeeUserData from "./SeeUserData";
import toast from "react-hot-toast";

const AllOrders = () => {
  const [OrderHistory, setOrderHistory] = useState();
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const [EditableDiv, setEditableDiv] = useState(-1);
  const [Values, setValues] = useState({ status: "" });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-all-orders",
        { headers }
      );
      setOrderHistory(res.data.data);
    };
    fetch();
  }, [OrderHistory]);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = OrderHistory[i]._id;
    const response = await axios.put(
      `http://localhost:1000/api/v1/update-status/${id}`,
      Values,
      { headers }
    );
    toast.success(response.data.message)
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Order placed":
        return <FiPackage className="w-4 h-4" />;
      case "Out for delivery":
        return <FiTruck className="w-4 h-4" />;
      case "Delivered":
        return <FiCheckCircle className="w-4 h-4" />;
      case "Canceled":
        return <FiXCircle className="w-4 h-4" />;
      default:
        return <FiPackage className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Order placed":
        return "from-yellow-100 to-yellow-50 border-yellow-300 text-yellow-700";
      case "Out for delivery":
        return "from-blue-100 to-blue-50 border-blue-300 text-blue-700";
      case "Delivered":
        return "from-green-100 to-green-50 border-green-300 text-green-700";
      case "Canceled":
        return "from-red-100 to-red-50 border-red-300 text-red-700";
      default:
        return "from-gray-100 to-gray-50 border-gray-300 text-gray-700";
    }
  };

  return (
    <>
      {!OrderHistory && <Loader />}

      {/* Empty State */}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-6 md:p-8 lg:p-10">
          <div className="h-full flex flex-col items-center justify-center">
            <div className="mb-8 relative">
              <div className="inline-block p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-3xl shadow-xl mb-6 relative">
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-orange-400/30 to-pink-400/30 rounded-full blur-xl animate-pulse"></div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
                  alt="No orders"
                  className="h-24 w-24 relative z-10"
                />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">
              No Orders <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">Yet</span>
            </h1>
            <p className="text-lg text-gray-600">
              Order history will appear here once customers start placing orders
            </p>
          </div>
        </div>
      )}

      {/* Orders List */}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-full p-6 md:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full text-sm font-medium text-purple-600 mb-4">
              <FiPackage className="w-4 h-4" />
              Admin Dashboard
            </div>
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-2">
              All <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Orders</span>
            </h1>
            <p className="text-lg text-gray-600">
              Manage and track all customer orders ({OrderHistory.length} total)
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mb-1">
                {OrderHistory.filter(item => item.status === "Order placed").length}
              </div>
              <p className="text-sm text-gray-600 font-medium">Order Placed</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-1">
                {OrderHistory.filter(item => item.status === "Out for delivery").length}
              </div>
              <p className="text-sm text-gray-600 font-medium">Out for Delivery</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600 mb-1">
                {OrderHistory.filter(item => item.status === "Delivered").length}
              </div>
              <p className="text-sm text-gray-600 font-medium">Delivered</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600 mb-1">
                {OrderHistory.filter(item => item.status === "Canceled").length}
              </div>
              <p className="text-sm text-gray-600 font-medium">Canceled</p>
            </div>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block bg-white/90 backdrop-blur-md border-2 border-gray-200 rounded-2xl shadow-xl overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200 px-6 py-4">
              <div className="grid grid-cols-12 gap-4 text-sm font-bold text-gray-700 uppercase tracking-wider">
                <div className="col-span-1">#</div>
                <div className="col-span-3">Book Details</div>
                <div className="col-span-4">Description</div>
                <div className="col-span-1">Price</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-1">User</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y-2 divide-gray-200">
              {OrderHistory.map((items, i) => (
                <div
                  key={i}
                  className="px-6 py-5 hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30 transition-all duration-300"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Serial Number */}
                    <div className="col-span-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-white font-bold">{i + 1}</span>
                      </div>
                    </div>

                    {/* Book Title */}
                    <div className="col-span-3">
                      <Link
                        to={`/view-book-details/${items.book._id}`}
                        className="text-gray-900 font-semibold hover:text-orange-600 transition-colors duration-200 line-clamp-2"
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
                      {EditableDiv !== i ? (
                        <button
                          onClick={() => setEditableDiv(i)}
                          className={`group inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r ${getStatusColor(items.status)} border rounded-full text-xs font-bold shadow-sm hover:shadow-md transition-all duration-200`}
                        >
                          {getStatusIcon(items.status)}
                          {items.status}
                          <FiEdit2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <select
                            name="status"
                            className="px-3 py-2 bg-white border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
                            onChange={change}
                            defaultValue={items.status}
                          >
                            {["Order placed", "Out for delivery", "Delivered", "Canceled"].map(
                              (status, idx) => (
                                <option value={status} key={idx}>
                                  {status}
                                </option>
                              )
                            )}
                          </select>
                          <button
                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                            onClick={() => {
                              setEditableDiv(-1);
                              submitChanges(i);
                            }}
                          >
                            <FaCheck className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* User Info */}
                    <div className="col-span-1 text-center">
                      <button
                        className="p-2 bg-gradient-to-br from-blue-100 to-purple-100 border border-blue-200 rounded-lg text-blue-600 hover:bg-gradient-to-br hover:from-blue-200 hover:to-purple-200 hover:scale-110 transition-all duration-200"
                        onClick={() => {
                          setuserDiv("fixed");
                          setuserDivData(items.user);
                        }}
                      >
                        <IoOpenOutline className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {OrderHistory.map((items, i) => (
              <div
                key={i}
                className="bg-white/90 backdrop-blur-md border-2 border-gray-200 rounded-2xl shadow-lg p-5 space-y-4"
              >
                {/* Order Number & User Button */}
                <div className="flex items-center justify-between pb-3 border-b-2 border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-md">
                      <span className="text-white font-bold">{i + 1}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-500">Order #{i + 1}</span>
                  </div>
                  <button
                    className="p-2.5 bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-200 rounded-lg text-blue-600 hover:scale-110 transition-all duration-200"
                    onClick={() => {
                      setuserDiv("fixed");
                      setuserDivData(items.user);
                    }}
                  >
                    <FaUserLarge className="w-4 h-4" />
                  </button>
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

                {/* Price */}
                <div className="flex items-center justify-between py-3 border-y-2 border-gray-200">
                  <span className="text-sm text-gray-600 font-medium">Price:</span>
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                    ₹{items.book.price}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <span className="text-sm text-gray-600 font-medium block mb-2">Status:</span>
                  {EditableDiv !== i ? (
                    <button
                      onClick={() => setEditableDiv(i)}
                      className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r ${getStatusColor(items.status)} border-2 rounded-xl text-sm font-bold shadow-md`}
                    >
                      {getStatusIcon(items.status)}
                      {items.status}
                      <FiEdit2 className="w-4 h-4 ml-auto" />
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <select
                        name="status"
                        className="flex-1 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        onChange={change}
                        defaultValue={items.status}
                      >
                        {["Order placed", "Out for delivery", "Delivered", "Canceled"].map(
                          (status, idx) => (
                            <option value={status} key={idx}>
                              {status}
                            </option>
                          )
                        )}
                      </select>
                      <button
                        className="px-5 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-200"
                        onClick={() => {
                          setEditableDiv(-1);
                          submitChanges(i);
                        }}
                      >
                        <FaCheck className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;