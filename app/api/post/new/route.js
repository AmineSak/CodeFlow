import { NextResponse } from "next/server";
import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

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

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
