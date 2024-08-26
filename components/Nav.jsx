"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import { LogOut } from "lucide-react";
import { Menu } from "lucide-react";
import { StickyNote } from "lucide-react";
import { Home } from "lucide-react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";

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
    <Navbar
      isBordered
      shouldHideOnScroll
      className="bg-[rgba(30,30,30,0.8)] w-screen "
    >
      <NavbarBrand>
        <Link href="/feed" color="foreground" className="flex-center flex ">
          <Image
            src="/assets/images/CodeFlowLogo.svg"
            width={90}
            height={80}
            alt="logo"
            className="object-contain sm:flex hidden"
          />
          <p className="font-sourceCodePro sm:flex hidden text-3xl font-semibold bg-clip-padding text-[#545454] hover:text-gray-400">
            CodeFlow
          </p>
        </Link>
        <Dropdown className="bg-[rgba(30,30,30)] text-white font-montserrat ">
          <DropdownTrigger className="flex sm:hidden">
            <Menu color="white" size={20}></Menu>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="home" startContent={<Home size={16} />}>
              <Link href="/">Home</Link>
            </DropdownItem>
            <DropdownItem key="posts" startContent={<StickyNote size={16} />}>
              <Link href="/posts">Posts</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarBrand>

      <NavbarContent justify="center" className="flex sm:hidden">
        <NavbarItem>
          <Image
            src="/assets/images/CodeFlowLogo.svg"
            width={90}
            height={80}
            alt="logo"
            className="object-contain "
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="flex sm:hidden ">
          <Image
            src="/assets/images/CodeFlowLogo.svg"
            width={90}
            height={80}
            alt="logo"
            className="object-contain sm:flex hidden"
          />
        </NavbarItem>
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
        <NavbarItem className="sm:flex hidden">
          <Button
            onClick={handleSignOut}
            className="login_btn  border-none"
            variant="ghost"
          >
            Sign out
          </Button>
        </NavbarItem>
        {session?.user?.image && (
          <>
            <NavbarItem className="sm:flex hidden">
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
            <Dropdown className="bg-[rgba(30,30,30)] text-white font-montserrat ">
              <DropdownTrigger>
                <NavbarItem className="sm:hidden flex">
                  <Image
                    src={session.user.image}
                    width={37}
                    height={37}
                    alt="profile"
                    className="rounded-full"
                  />
                </NavbarItem>
              </DropdownTrigger>
              <DropdownMenu color="default" variant="faded">
                <DropdownSection aria-label="log out" showDivider>
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{session.user?.email}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">
                    <Link href="/profile">My Profile</Link>
                  </DropdownItem>
                  <DropdownItem key="team_settings">
                    <Link href="/create-post">Create Post</Link>
                  </DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    <Link href="/contact">Help & Feedback</Link>
                  </DropdownItem>
                </DropdownSection>
                <DropdownSection aria-label="log out">
                  <DropdownItem
                    key="logout"
                    color="danger"
                    startContent={<LogOut color="red" size={16} />}
                    onClick={handleSignOut}
                  >
                    <p className="text-red-500">Sign Out</p>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Nav;
