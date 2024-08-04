import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const post = await Post.findById(params.id).populate("creator");
    if (!post) return new Response("post not found", { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch {
    return new Response("Failed to fetch post", { status: 500 });
  }
};
