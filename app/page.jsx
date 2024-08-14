import Image from "next/image";
import SignInOptions from "@/components/SignInOptions";
import "@/styles/globals.css";

export const metadata = {
  title: "CodeFlow",
  description: "Join the CodeFlow community ...",
};

import { ThemeProvider } from "next-themes";

const SignInPage = () => {
  return (
    <>
      {" "}
      <ThemeProvider attribute="class">
        <section className="flex-center">
          <Image
            src="/assets/images/CodeFlowLogo.svg"
            width={300}
            height={200}
            alt="logo"
          />
        </section>

        <SignInOptions />
      </ThemeProvider>
    </>
  );
};

export default SignInPage;
