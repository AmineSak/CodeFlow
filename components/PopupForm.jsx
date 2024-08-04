import Form from "./Form";
import { langs } from "@uiw/codemirror-extensions-langs";
import { useState } from "react";

const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState(langs.javascript());
  const [codeLang, setcodeLang] = useState("");
  const langIcons = [
    "/assets/icons/js.svg",
    "/assets/icons/python.svg",
    "/assets/icons/java.svg",
  ];
  const handleSubmit = () => {};
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="comment_btn" onClick={togglePopup}>
        Add Comment
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
          <div
            className=" p-6 rounded-lg max-w-md w-full flex-center flex-col flex  transform transition-all duration-300 scale-95 opacity-0 
          animate-fadeIn"
          >
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

            <div className="flex-center gap-7 p-5 ">
              <button
                type="button"
                className="cancel_btn mr-2"
                onClick={togglePopup}
              >
                Cancel
              </button>
              <button type="submit" className="comment_btn">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopupForm;
