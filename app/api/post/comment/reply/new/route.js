import { NextResponse } from "next/server";
import Reply from "@/models/reply";
import { connectToDB } from "@/utils/database";

export async function POST(request) {
  try {
    const { text, creator, comment } = await request.json();
    await connectToDB();

    const replyData = {
      text,
      creator,
      comment,
    };

    const newReply = new Reply(replyData);
    await newReply.save();

    return NextResponse.json(newReply, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create reply" },
      { status: 500 }
    );
  }
}
