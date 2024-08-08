import { CodeBlock } from "./CodeBlock";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";

const CommentCard = ({ comment }) => {
  const { data: session } = useSession();

  const [commentUpVotes, setcommentUpVotes] = useState(comment.upvotes);

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
    <div className="glassmorphism max-w-full w-full text-white text-3xl">
      <div className="flex-between gap-[400px] w-full max-w-full">
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
        <Link
          href={`/posts/${comment.post}/comments/comment?commentId=${comment._id}`}
        >
          <Image
            src="/assets/icons/reply.svg"
            width={30}
            height={30}
            className=" hover:bg-[#80808080] rounded-md"
          />
        </Link>

        <p className="font-sourceCodePro text-sm text-center">0</p>
      </div>
    </div>
  );
};

export default CommentCard;
