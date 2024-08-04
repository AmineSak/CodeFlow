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
    <div className="mt-16">
      {posts.map((post) => (
        <PostCard
          key={post._id}
          text={post.text}
          code={post.code}
          date={post.createdAt}
          creator={post.creator}
          codeLang={post.codeLang}
        />
      ))}
    </div>
  );
};

export default Posts;
