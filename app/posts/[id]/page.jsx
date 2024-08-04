"use client";

import Nav from "@/components/Nav";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import LoadingPost from "@/components/LoadingPost";
import Comments from "@/components/Comments";
import PopupForm from "@/components/PopupForm";

const page = ({ params }) => {
  const [loading, setloading] = useState(true);
  const [post, setpost] = useState({});
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");

  const handleAddCommentBtn = () => {};

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

  return (
    <>
      <Nav />
      {loading ? (
        <LoadingPost />
      ) : (
        <div className="flex-between flex-col gap-2">
          <PostCard post={post} />
          <PopupForm />
          <Comments />
        </div>
      )}
    </>
  );
};

export default page;
