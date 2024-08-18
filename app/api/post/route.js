import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import Comment from "@/models/comment";

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

    return NextResponse.json(updatedPosts, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
