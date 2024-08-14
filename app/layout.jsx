"use client";

import "../styles/globals.css";
import "@fontsource/montserrat";
import "@fontsource/source-code-pro";

import { usePathname } from "next/navigation";

import Provider from "@/components/Provider";
import Nav from "@/components/Nav";
import { NextProviders } from "@/components/ui/NextUIProv";

const RootLayout = ({ children }) => {
  const pathName = usePathname();
  return (
    <html lang="en">
      <body>
        <NextProviders>
          <Provider>
            <div className="main bg-[#1E1E1E]"></div>
            {pathName !== "/" && <Nav />}
            <main className="app">{children}</main>
          </Provider>
        </NextProviders>
      </body>
    </html>
  );
};

export default RootLayout;
