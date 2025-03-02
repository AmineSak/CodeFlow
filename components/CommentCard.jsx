import { CodeBlock } from "./CodeBlock";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import ReplyCard from "./ReplyCard";

const CommentCard = ({ comment }) => {
  const { data: session } = useSession();

  const [commentUpVotes, setcommentUpVotes] = useState(comment.upvotes);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [shownReplies, setshownReplies] = useState([]);
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const response = await fetch(`/api/post/comment/reply/${comment._id}`);
        if (response.ok) {
          const fetchedReplies = await response.json();
          setReplies(fetchedReplies);
        }
      } catch (error) {
        console.error("Error while fetching reply:", error);
      }
    };
    if (comment._id) {
      fetchReplies();
    }
  }, []);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  const handleReplyChange = (e) => {
    setNewReply(e.target.value);
  };

  const handleAddReply = async () => {
    if (newReply) {
      try {
        const response = await fetch("/api/post/comment/reply/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify content type
          },
          body: JSON.stringify({
            text: newReply,
            creator: session?.user.id,
            comment: comment._id,
          }),
        });

        if (response.ok) {
          setshownReplies((prev) => [...prev, newReply]);
          setNewReply("");
        } else {
          console.error(`Failed to add reply: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error while adding reply:", error);
      }
    } else {
      console.warn("Reply text cannot be empty.");
    }
  };

  const handleDownVote = async () => {
    const updatedUpVotes = commentUpVotes - 1;

    setcommentUpVotes((prev) => prev - 1);

    try {
      const response = await fetch(`/api/post/comments/${comment._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          upvotes: updatedUpVotes,
          userId: session?.user.id,
          voteValue: -1,
        }),
      });

      if (!response.ok) {
        // Revert the optimistic update if the max vote count reached
        setcommentUpVotes((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      // Revert the optimistic update if the request fails
      setcommentUpVotes((prev) => prev + 1);
    }
  };
  const handleUpVote = async () => {
    const updatedUpVotes = commentUpVotes + 1;

    setcommentUpVotes((prev) => prev + 1);

    try {
      const response = await fetch(`/api/post/comments/${comment._id}`, {
        method: "PATCH",
        body: JSON.stringify({
          upvotes: updatedUpVotes,
          userId: session?.user.id,
          voteValue: 1,
        }),
      });

      if (!response.ok) {
        // Revert the optimistic update if the max vote count reached
        setcommentUpVotes((prev) => prev - 1);
      }
    } catch (error) {
      console.log(error);
      // Revert the optimistic update if the request fails
      setcommentUpVotes((prev) => prev - 1);
    }
  };

  return (
    <div className="glassmorphism w-full text-white text-3xl">
      <div className="flex-between w-full ">
        <div className="flex-between gap-3">
          <Image
            src={comment.creator?.image}
            width={30}
            height={30}
            alt="profile"
            className="rounded-full"
          />
          <div className="flex-col">
            <p className="font-inter text-sm text-white">
              {comment.creator?.username}
            </p>
            <p className="font-inter text-sm text-gray-400">
              {comment.createdAt}
            </p>
          </div>
        </div>

        <div className="flex-col">
          <Image
            src="/assets/icons/up.svg"
            width={20}
            height={20}
            onClick={handleUpVote}
            className="hover:bg-[#80808080] rounded-md cursor-pointer "
          />
          <p className="font-sourceCodePro text-sm text-center">
            {commentUpVotes}
          </p>
          <Image
            src="/assets/icons/down.svg"
            width={20}
            height={20}
            onClick={handleDownVote}
            className="hover:bg-[#80808080] rounded-md cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-5 font-inter text-lg ">{comment.text}</div>
      {comment.code && (
        <div className="container mx-auto py-10 text-sm">
          <CodeBlock code={comment.code} language={comment.codeLang} />
        </div>
      )}
      <div className="border-t-4 border-[#80808080] p-3 w-full max-w-full gap-2 flex-center">
        <Image
          src="/assets/icons/reply.svg"
          width={30}
          height={30}
          onClick={toggleReplies}
          className=" hover:bg-[#80808080] rounded-md"
        />

        <p className="font-sourceCodePro text-sm text-center">
          {replies.length}
        </p>
      </div>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          showReplies ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-1 border-t border-gray-[#808080] pt-4">
          <div className="mb-2 flex-center gap-1 flex w-full">
            <textarea
              value={newReply}
              onChange={handleReplyChange}
              placeholder="Add a reply..."
              className="w-full p-2 flex bg-[#1E1E1E] rounded-lg  text-sm text-gray-500 outline-0 mt-1 h-[40px]"
            />

            <button onClick={handleAddReply} className="mt-2 comment_btn">
              Reply
            </button>
          </div>
          <div className="overflow-y-auto max-h-[300px] mt-4">
            {replies.map((reply) => (
              <ReplyCard key={reply._id} reply={reply} />
            ))}
            {shownReplies.map((replyText) => (
              <ReplyCard
                reply={{
                  text: replyText,
                  creator: session?.user,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
