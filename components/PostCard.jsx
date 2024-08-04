"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { CodeBlock } from "./CodeBlock";

const PostCard = ({ text, code, codeLang, date, creator }) => {
  const { data: session } = useSession();

  return (
    <div className="glassmorphism text-white text-3xl">
      <div className="flex-between gap-[400px] w-full max-w-full">
        <div className="flex-between gap-3">
          <Image
            src={creator.image}
            width={30}
            height={30}
            alt="profile"
            className="rounded-full"
          />
          <div className="flex-col">
            <p className="font-inter text-sm text-white">{creator.username}</p>
            <p className="font-inter text-sm text-gray-400">{date}</p>
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
      <div>{text}</div>
      <div className="container mx-auto py-10">
        <CodeBlock code={code} language={codeLang} />
      </div>
    </div>
  );
};

export default PostCard;
