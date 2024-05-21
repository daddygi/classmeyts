// pages/dashboard.js

"use client";
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import Cards from "@/components/Cards";
import SearchBar from "@/components/SearchComponent";
import Dropdown from "@/components/Dropdown";

const DashboardPage = () => {
  const [hasNewNotification, setHasNewNotification] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const cardsData = new Array(19).fill(null);
  const cardsPerPage = 4;

  const handleNotificationClick = () => {
    setHasNewNotification(false);
    setShowNotifications(!showNotifications);
  };

  const handlePageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardsData.slice(indexOfFirstCard, indexOfLastCard);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cardsData.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="h-full flex bg-gray-100">
      <div className="w-20 h-full">
        <Sidebar />
      </div>
      <div className="flex-1 p-6">
        <PageTitle title="Dashboard" />
        <div className="flex justify-between items-center mt-4 mb-8">
          <SearchBar />
          <Dropdown />
          <div className="relative">
            <button
              onClick={handleNotificationClick}
              className={`relative p-2 rounded-full ${
                hasNewNotification ? "bg-red-500" : "bg-gray-300"
              }`}
            >
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-white"></span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Notifications</span>
                  <button onClick={() => setShowNotifications(false)}>
                    Close
                  </button>
                </div>
                <ul>
                  <li className="mt-2">user_name upvoted your comment</li>
                  <li className="mt-2">user_name followed you</li>
                  <li className="mt-2">user_name commented on your post</li>
                  <li className="mt-2">
                    user_name added to their bookmark on your post
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="mb-8 bg-white p-6 rounded-xl w-[1693px]">
          <input
            type="text"
            placeholder="Title"
            className="w-full p-4 mb-2 border rounded text-gray"
          />
          <textarea
            placeholder="Describe everything about this post here... #Tags"
            className="w-full p-4 border rounded h-32"
          ></textarea>
          <div className="flex justify-between items-center mt-2">
            <button className="p-2 border rounded">Attach</button>
            <div>
              <button className="p-2 mr-2 border rounded">Cancel</button>
              <button className="p-2 bg-secondary-color-blue text-white rounded">
                Post
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap">
          {currentCards.map((_, index) => (
            <Cards key={index} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <ul className="flex list-none">
            {pageNumbers.map((number) => (
              <li key={number} className="mx-2">
                <button
                  onClick={() => handlePageChange(number)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === number
                      ? "bg-blue-500 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
