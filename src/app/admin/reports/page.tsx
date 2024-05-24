// @ts-nocheck
"use client";
import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import AdminSideBar from "../_component/AdminSideBar";
import TableNiGian from "../_component/TableNiGian";

const ReportsPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const posts = await response.json();
        setData(
          posts.map((post) => ({
            id: post.id,
            username: post.user.username,
            title: post.title,
            department: post.department,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      const response = await fetch(`/api/del_post?postId=${postId}`, {
        method: "DELETE",
      });
      alert("Post deleted successfully!");
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="xl:w-20 h-screen">
        <AdminSideBar />
      </div>
      <div className="p-12 flex flex-col flex-grow">
        <div className="flex">
          <PageTitle title="Reports" />
        </div>
        <div className="p-12">
          <PageTitle title="Posts" />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <TableNiGian data={data} onDelete={handleDelete} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
