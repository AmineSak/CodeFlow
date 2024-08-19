import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Comment from "@/models/comment";

export async function GET(request, { params }) {
  try {
    await connectToDB();
    const comment = await Comment.findById(params.commentId).populate({
      path: "creator",
      select: "username image",
    });

    if (!comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }
    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "/";
    revalidatePath(path);

    return NextResponse.json(comment.toObject(), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch comment:", error);
    return NextResponse.json(
      { error: "Failed to fetch comment" },
      { status: 500 }
    );
  }
}
