"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";

const PostCardList = ({ data }) => {
  return (
    <div className="flex-between flex-col gap-8">
      {data.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setposts] = useState([]);
  const [searchText, setsearchText] = useState("");
  const [searchResults, setsearchResults] = useState([]);

  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (p) =>
        regex.test(p.text) ||
        regex.test(p.code) ||
        regex.test(p.creator.username)
    );
  };

  const handleSearchChange = (e) => {
    setsearchText(e.target.value);

    if (searchText) setsearchResults(filterPosts(searchText));
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post");
      const data = await response.json();
      setposts(data);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a post or a username "
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input mt-8 mb-8"
        />
      </form>
      {searchText ? (
        <PostCardList data={searchResults} />
      ) : (
        <PostCardList data={posts} />
      )}
    </>
  );
};

export default Feed;
