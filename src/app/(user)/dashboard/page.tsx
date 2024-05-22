"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PageTitle from "@/components/PageTitle";
import Cards from "@/components/Cards";
import SearchBar from "@/components/SearchComponent";
import Dropdown from "@/components/Dropdown";
import PostTemplate from "@/components/PostTemplate";

const DashboardPage = () => {
  const [hasNewNotification, setHasNewNotification] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPosts(data);
        console.log("Fetched data:", data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const cardsPerPage = 4;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = posts.slice(indexOfFirstCard, indexOfLastCard);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleNotificationClick = () => {
    setHasNewNotification(false);
    setShowNotifications(!showNotifications);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        <PostTemplate />
        <div className="grid grid-cols-4 gap-4">
          {loading ? (
            <p>Loading posts...</p>
          ) : currentCards.length > 0 ? (
            currentCards.map((post) => (
              <Cards
                key={post.id}
                username={post.userId}
                title={post.title}
                description={post.description}
                tags={post.tags}
                file={new File([post.file], post.file)} // Mock file creation
                upvote={post.upvote}
                downvote={post.downvote}
              />
            ))
          ) : (
            <p>No posts available</p>
          )}
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
