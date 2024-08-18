import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Comment from "@/models/comment";

export async function POST(request) {
  try {
    const { text, userId, code, codeLang, postId } = await request.json();
    await connectToDB();

    const today = new Date();
    const dateOnly = today.toISOString().split("T")[0];

    const commentData = {
      text,
      creator: userId,
      code,
      createdAt: dateOnly,
      codeLang,
      post: postId,
    };

    const newComment = new Comment(commentData);
    await newComment.save();

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create comment" },
      { status: 500 }
    );
  }
}
