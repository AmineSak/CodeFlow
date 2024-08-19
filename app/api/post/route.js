import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import Comment from "@/models/comment";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await connectToDB();
    const posts = await Post.find({})
      .sort({ upvotes: -1, createdAt: -1 })
      .populate("creator");

    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await Comment.find({
          post: post._id,
        }).countDocuments();
        return { ...post.toObject(), commentCount };
      })
    );
    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "/";
    revalidatePath(path);

    return NextResponse.json(updatedPosts, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
