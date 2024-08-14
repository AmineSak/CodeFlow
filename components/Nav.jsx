"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";

const Nav = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, []);

  return (
    <Navbar shouldHideOnScroll isBordered className="bg-[rgba(30,30,30,0.8)] ">
      <NavbarBrand>
        <Link href="/feed" color="foreground" className="flex-center flex ">
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
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            className="text-white font-montserrat font-semibold"
            href="/posts"
          >
            Posts
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="/contact"
            className="text-white font-montserrat font-semibold"
          >
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            onClick={handleSignOut}
            className="login_btn border-none"
            variant="ghost"
          >
            Sign out
          </Button>
        </NavbarItem>
        {session?.user?.image && (
          <NavbarItem>
            <Link href="/profile">
              <Image
                src={session.user.image}
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
              />
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
