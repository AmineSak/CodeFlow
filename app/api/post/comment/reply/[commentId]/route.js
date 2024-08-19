import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Reply from "@/models/reply";
import { revalidatePath } from "next/cache";

export async function GET(req, { params }) {
  try {
    await connectToDB();
    const replies = await Reply.find({ comment: params.commentId })
      .populate({
        path: "creator",
        select: "username image",
      })
      .exec();

    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "/";
    revalidatePath(path);

    return NextResponse.json(replies, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch replies:", error);
    return NextResponse.json(
      { error: "Failed to fetch replies" },
      { status: 500 }
    );
  }
}
