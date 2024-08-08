"use client";

import Nav from "@/components/Nav";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import LoadingPost from "@/components/LoadingPost";
import Comments from "@/components/Comments";
import PopupForm from "@/components/PopupForm";

const page = () => {
  const [loading, setloading] = useState(true);
  const [post, setpost] = useState({});
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const [commentsKey, setCommentsKey] = useState(0); // Used to trigger a re-render of Comments

  useEffect(() => {
    const fetchPost = async () => {
      setloading(true);
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setpost(data);
      setloading(false);
    };
    fetchPost();
  }, []);

  const refreshComments = () => {
    setCommentsKey((prevKey) => prevKey + 1); // Update the key to trigger re-render
  };

  return (
    <>
      <Nav />
      {loading ? (
        <LoadingPost />
      ) : (
        <div className="flex-between relative flex-col gap-2">
          <PostCard post={post} />
          <PopupForm
            className="absolute z-10 inset-0"
            onCommentSubmit={refreshComments}
          />
          <Comments
            postId={postId}
            key={commentsKey}
            className="relative z-0"
          />
        </div>
      )}
    </>
  );
};

export default page;
