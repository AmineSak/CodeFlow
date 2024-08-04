import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";

export const CodeBlock = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <pre className="rounded-md p-4 overflow-auto bg-gray-900">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};
