"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const Posts = () => {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post");
      const data = await response.json();
      setposts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex-between flex-col gap-8">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
