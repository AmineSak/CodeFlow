"use client";

import { useState } from "react";
import Image from "next/image";

import CodeMirror from "@uiw/react-codemirror";
import { darcula } from "@uiw/codemirror-theme-darcula";

import { langs } from "@uiw/codemirror-extensions-langs";

const Form = ({
  language,
  setLanguage,
  text,
  langIcons,
  setText,
  code,
  setCode,
  setcodeLang,
}) => {
  const [pyBg, setpyBg] = useState("bg-transparent");
  const [jvBg, setjvBg] = useState("bg-transparent");
  const [jsBg, setjsBg] = useState("bg-transparent");

  return (
    <form className="mt-10 flex-col glassmorphism w-[75%]">
      <Image
        src="/assets/icons/textLogo.svg"
        alt="text-logo "
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
    </form>
  );
};

export default Form;
