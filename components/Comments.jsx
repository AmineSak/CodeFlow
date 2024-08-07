import { useEffect } from "react";
import { useState } from "react";
import CommentCard from "./CommentCard";

const Comments = ({ postId }) => {
  const [comments, setcomments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`/api/post/comment/${postId}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setcomments(data);
    };
    fetchComments();
  }, []);

  return (
    <div className="flex-between relative z-0 flex-col gap-8">
      {" "}
      {comments.map((comment) => (
        <CommentCard key={comment._id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;
