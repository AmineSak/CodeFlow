"use client";

import Nav from "@/components/Nav";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ContactPage = () => {
  const [message, setmessage] = useState("");
  const [subject, setsubject] = useState("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (message) {
      try {
        const response = await fetch("/api/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
            subject: subject,
            email: session.user.email,
            name: session.user.name, // Corrected to 'name' instead of 'username'
          }),
        });

        if (response.ok) {
          router.push("/");
        } else {
          console.log("Failed to send email :(");
        }
      } catch (error) {
        console.log("Error occurred while sending email:", error);
      }
    } else {
      alert("Submission field is empty");
    }
  };

  return (
    <>
      <Nav />
      <div className="flex-start w-full flex-col max-w-full">
        <h1 className="red_gradient head_text mb-10">Contact</h1>
        <p className="font-montserrat text-white text-sm ">
          Report a bug or suggest a feature you want to see...
        </p>
        <form className="mt-10 flex-col glassmorphism w-[75%]">
          <textarea
            value={subject}
            onChange={(event) => {
              setsubject(event.target.value);
            }}
            placeholder="Subject"
            required
            className="form_textarea mt-4 max-h-[50px]"
          />

          <textarea
            value={message}
            onChange={(event) => {
              setmessage(event.target.value);
            }}
            placeholder="Type here..."
            required
            className="form_textarea mt-4 "
          />
        </form>
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

export default ContactPage;
