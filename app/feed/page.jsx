"use client";

import Nav from "@/components/Nav";
import WelcomeMessage from "@/components/WelcomeMessage";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Leaderboard from "@/components/animations/Leaderboard";
const Feed = () => {
  const { data: session } = useSession();

  return (
    <>
      <Nav />
      <WelcomeMessage name={session?.user.name} />
      <button type="button" className="glowing-btn mt-20">
        {" "}
        <Link href="/create-post">Create Post</Link>
      </button>
      <Leaderboard />
    </>
  );
};

export default Feed;
