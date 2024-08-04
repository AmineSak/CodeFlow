"use client";
import Nav from "@/components/Nav";
import Form from "@/components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { langs } from "@uiw/codemirror-extensions-langs";
import { useState } from "react";

const CreatePostPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState(langs.javascript());
  const [codeLang, setcodeLang] = useState("");
  const langIcons = [
    "/assets/icons/js.svg",
    "/assets/icons/python.svg",
    "/assets/icons/java.svg",
  ];

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
    <>
      <Nav />
      <div className="flex-start w-full flex-col max-w-full">
        <h1 className="red_gradient head_text mb-10">Create Post</h1>
        <Form
          handleSubmit={handleSubmit}
          setLanguage={setLanguage}
          text={text}
          langIcons={langIcons}
          setText={setText}
          code={code}
          setCode={setCode}
          setcodeLang={setcodeLang}
          language={language}
        />
        <button
          type="submit"
          className="login_btn  mt-8"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default CreatePostPage;
