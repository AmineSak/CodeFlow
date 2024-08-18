"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { Input } from "@nextui-org/react";
import { Search } from "lucide-react";

const PostCardList = ({ data }) => {
  return (
    <div className="fle flex-col flex-between gap-8 max-w-[640px]">
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
      try {
        const response = await fetch("/api/post");
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        const data = await response.json();
        setposts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex-between flex-col">
      <form className="relative">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] mt-8 mb-8 h-10 flex-center ",
            mainWrapper: "h-full",
            input: "text-medium",
            inputWrapper:
              "h-full font-normal w-[300px] text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search for a post or a username... "
          size="lg"
          startContent={<Search size={18} />}
          type="search"
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>
      {searchText ? (
        <PostCardList data={searchResults} />
      ) : (
        <PostCardList data={posts} />
      )}
    </div>
  );
};

export default Feed;
