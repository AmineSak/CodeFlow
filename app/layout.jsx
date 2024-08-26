import "../styles/globals.css";
import "@fontsource/montserrat";
import "@fontsource/source-code-pro";

import Provider from "@/components/Provider";

import { NextProviders } from "@/components/ui/NextUIProv";

export const metadata = {
  title: "CodeFlow",
  description: "Join the CodeFlow community ...",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <NextProviders>
          <Provider>
            <div className="main bg-[#1E1E1E]"></div>

            <main className="app dark">{children}</main>
          </Provider>
        </NextProviders>
      </body>
    </html>
  );
};

export default RootLayout;
