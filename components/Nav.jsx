"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, useState } from "react";

const Nav = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [postsBtnOn, setpostsBtnOn] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3 ">
      <Link href="/feed" className="flex-center flex ">
        <Image
          src="/assets/images/CodeFlowLogo.svg"
          width={90}
          height={80}
          alt="logo"
          className="object-contain"
        />
        <p className="font-sourceCodePro text-3xl font-semibold bg-clip-padding text-[#545454] hover:text-gray-400">
          CodeFlow
        </p>
      </Link>
      <div className="flex-between gap-[40px]">
        <button
          className={`font-montserrat font-semibold  ${
            postsBtnOn ? "text-blue-700" : "text-white"
          }`}
          onClick={() => {
            setpostsBtnOn(!postsBtnOn);
            router.push("/posts");
          }}
        >
          Posts
        </button>
        <button
          className={`font-montserrat font-semibold  ${
            postsBtnOn ? "text-blue-700" : "text-white"
          }`}
          onClick={() => {
            setpostsBtnOn(!postsBtnOn);
            router.push("/contact");
          }}
        >
          Contact
        </button>
      </div>
      <div className="flex">
        <div className="flex gap-3 md:gap-5">
          <button type="button" onClick={handleSignOut} className="login_btn">
            Sign Out{" "}
          </button>
          {session?.user?.image && (
            <Link href="/profile">
              <Image
                src={session.user.image}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
