import { NextResponse } from "next/server";
import Post from "@/models/post";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
import { Resend } from "resend";
import NewPostMailTemplate from "@/components/NewPostMailTemplate";

export async function POST(request) {
  try {
    const { text, userId, code, codeLang } = await request.json();
    await connectToDB();

    const today = new Date();
    const dateOnly = today.toISOString().split("T")[0];

    const postData = {
      text,
      creator: userId,
      code,
      createdAt: dateOnly,
      codeLang,
    };

    const newPost = new Post(postData);
    await newPost.save();

    const resend = new Resend(process.env.RESEND_API_KEY);
    const postCreator = await User.findById(userId);

    const users = await User.find({ _id: { $ne: userId } });
    const recipients = users.map((user) => user.email);

    const sendEmailPromises = recipients.map((recipientEmail) =>
      resend.emails.send({
        from: "CodeFlow-Contact <onboarding@resend.dev>",
        to: recipientEmail,
        subject: `🌟New Post From ${postCreator.username}🌟`,
        react: <NewPostMailTemplate post={newPost} />,
      })
    );

    // Wait for all emails to be sent
    await Promise.all(sendEmailPromises);

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
