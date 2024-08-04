"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import CodeMirror from "@uiw/react-codemirror";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { toast } from "react-toastify";
import { langs } from "@uiw/codemirror-extensions-langs";

const Form = () => {
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState(langs.javascript());
  const [codeLang, setcodeLang] = useState("");
  const [pyBg, setpyBg] = useState("bg-transparent");
  const [jvBg, setjvBg] = useState("bg-transparent");
  const [jsBg, setjsBg] = useState("bg-transparent");
  const langIcons = [
    "/assets/icons/js.svg",
    "/assets/icons/python.svg",
    "/assets/icons/java.svg",
  ];

  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: JSON.stringify({
          text: text,
          userId: session?.user.id,
          code: code,
          codeLang: codeLang,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit post :(");
    }
  };

  return (
    <main className="flex-start max-w-full flex-start flex-col w-full">
      <h1 className="red_gradient head_text mb-10">Create Post</h1>
      <form
        className="mt-10 flex-start flex-col glassmorphism w-[75%]"
        onSubmit={handleSubmit}
      >
        <Image
          src="/assets/icons/textLogo.svg"
          alt="text logo "
          width={25}
          height={25}
        />

        <textarea
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          placeholder="Write your post here"
          required
          className="form_textarea mt-4 h-[200px]"
        />
        <div className="w-full max-w-full mt-3 flex-between ">
          <Image
            src="/assets/icons/terminal.svg"
            alt="text logo"
            width={25}
            height={25}
          />
          <div className="flex-between p-3 gap-2">
            <Image
              src={langIcons[1]}
              width={25}
              height={25}
              alt="logo"
              className={`hover:bg-deep-orange rounded-[6px] ${pyBg} cursor-pointer p-1`}
              onClick={() => {
                setLanguage(langs.python());
                setcodeLang("python");
                setpyBg("bg-deep-orange");
                setjsBg("bg-transparent");
                setjvBg("bg-transparent");
              }}
            />
            <Image
              key={1}
              src={langIcons[2]}
              width={25}
              height={25}
              alt="logo"
              className={`hover:bg-deep-orange rounded-[6px] ${jvBg} cursor-pointer p-1`}
              onClick={() => {
                setLanguage(langs.java());
                setcodeLang("java");
                setpyBg("bg-transparent");
                setjsBg("bg-transparent");
                setjvBg("bg-deep-orange");
              }}
            />
            <Image
              key={2}
              src={langIcons[0]}
              width={25}
              height={25}
              alt="logo"
              className={`hover:bg-deep-orange rounded-[6px] ${jsBg} cursor-pointer p-1`}
              onClick={() => {
                setLanguage(langs.javascript());
                setcodeLang("javascript");
                setpyBg("bg-transparent");
                setjsBg("bg-deep-orange");
                setjvBg("bg-transparent");
              }}
            />
          </div>
        </div>

        <div className="w-full max-w-full">
          <CodeMirror
            value={code}
            height="100%"
            width="100%"
            theme={darcula}
            extensions={[language]}
            onChange={(value) => setCode(value)}
            className="form_textarea h-full max-h-full "
          />
        </div>

        <button type="submit" className="login_btn mt-8" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </main>
  );
};

export default Form;
