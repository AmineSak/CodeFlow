import EmailTemplate from "@/components/EmailTemplate";
import { Resend } from "resend";
import * as React from "react";

export const POST = async (req) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, message, email, subject } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "CodeFlow-Contact <onboarding@resend.dev>",
      to: "codeflowoff@gmail.com",
      subject: subject,
      react: <EmailTemplate name={name} message={message} email={email} />,
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), {
      status: 500,
    });
  }
};
