import "../styles/globals.css";
import "@fontsource/montserrat";
import "@fontsource/source-code-pro";

import Provider from "@/components/Provider";

export const metadata = {
  title: "CodeFlow",
  description: "Join the CodeFlow community ...",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main bg-[#1E1E1E]"></div>

          <main className="app">{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
