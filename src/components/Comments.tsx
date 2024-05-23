"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { addComment } from "../../actions/create-comment";

interface Comment {
  id: string;
  postId: string;
  parentId?: string;
  comment: string;
  authorId: string;
  authorUsername: string;
  createdAt: string;
  upvotes?: number;
  downvotes?: number;
}

interface CommentsProps {
  postId: string;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const user = useCurrentUser();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function fetchComments() {
      if (!postId) return;

      try {
        const response = await fetch(`/api/comments?postId=${postId}`);
        if (!response.ok) {
          throw new Error(`Error fetching comments: ${response.statusText}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    if (!user) {
      console.log(user);
      console.error("User not authenticated");
      return;
    }

    try {
      const result = await addComment({
        postId: postId,
        comment: newComment,
      });

      if (result.error) {
        throw new Error(result.error);
      }

      setComments((prevComments) => [
        ...prevComments,
        result.newComment as Comment, // Ensure the type matches Comment
      ]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="border-t pt-4">
        <p className="font-bold mb-2">Comments</p>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
              <div>
                <p className="text-sm font-bold">{comment.authorUsername}</p>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-sm mb-2">{comment.comment}</p>
            <div className="flex items-center text-sm text-gray-500">
              <span className="text-green-500">✔</span>
              <span className="ml-1">{comment.upvotes || 0}</span>
              <span className="ml-2">Reply</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Add comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={handleAddComment}
          className="mt-2 p-2 bg-sign-in-last-color text-white rounded-md"
        >
          Add Comment
        </button>
      </div>
    </>
  );
};

export default Comments;
