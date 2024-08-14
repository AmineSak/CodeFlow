"use client";

import CommentCard from "@/components/CommentCard";
import Nav from "@/components/Nav";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPost from "@/components/LoadingPost";

const page = () => {
  const searchParams = useSearchParams();
  const commentId = searchParams.get("commentId");
  const [comment, setcomment] = useState({});
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(`/api/post/comment/${commentId}`);

        // Check if response is OK
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Try parsing JSON
        const data = await response.json();
        console.log("Fetched comment data:", data);
        setcomment(data);
      } catch (error) {
        console.error("Failed to fetch comment:", error);
      } finally {
        setIsLoading(false); // Set loading to false once data is fetched
      }
    };

    if (commentId) {
      fetchComment();
    }
  }, []);

  return (
    <>
      {IsLoading ? (
        <LoadingPost /> // Optional: You can show a loading spinner here
      ) : (
        <div className="flex-center flex-col max-w-[640px] gap-7">
          <CommentCard comment={comment} />
          <button className="comment_btn ">Reply</button>
        </div>
      )}
    </>
  );
};

export default page;
