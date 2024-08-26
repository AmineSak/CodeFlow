import { useEffect } from "react";
import { useState } from "react";
import CommentCard from "./CommentCard";

const Comments = ({ postId }) => {
  const [comments, setcomments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/post/comments/${postId}`);
      const data = await response.json();
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
      }
      setcomments(data);
    };
    fetchComments();
  }, []);

  return (
    <div className="flex-between relative w-full z-0 flex-col gap-8">
      {" "}
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
