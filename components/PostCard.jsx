"use client";

import Image from "next/image";
import { CodeBlock } from "./CodeBlock";
import Link from "next/link";

const PostCard = ({ post }) => {
  return (
    <div className="glassmorphism max-w-full w-full text-white text-3xl">
      <div className="flex-between gap-[400px] w-full max-w-full">
        <div className="flex-between gap-3">
          <Image
            src={post.creator.image}
            width={30}
            height={30}
            alt="profile"
            className="rounded-full"
          />
          <div className="flex-col">
            <p className="font-inter text-sm text-white">
              {post.creator.username}
            </p>
            <p className="font-inter text-sm text-gray-400">{post.date}</p>
          </div>
        </div>

        <div className="flex-col">
          <Image
            src="/assets/icons/up.svg"
            width={20}
            height={20}
            className="hover:bg-[#80808080] rounded-md cursor-pointer "
          />
          <p className="font-sourceCodePro text-sm text-center">0</p>
          <Image
            src="/assets/icons/down.svg"
            width={20}
            height={20}
            className="hover:bg-[#80808080] rounded-md cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-5 font-inter text-lg ">{post.text}</div>
      <div className="container mx-auto py-10 text-sm">
        <CodeBlock code={post.code} language={post.codeLang} />
      </div>
      <div className="border-t-4 border-[#80808080] p-3 w-full max-w-full gap-2 flex-center">
        <Link href={`/posts/post?id=${post._id}`}>
          <Image
            src="/assets/icons/comment.svg"
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

export default PostCard;
