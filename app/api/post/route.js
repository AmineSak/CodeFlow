import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import Comment from "@/models/comment";

export const GET = async (req) => {
  try {
    await connectToDB();
    const posts = await Post.find({})
      .sort({ upvotes: -1, createdAt: -1 })
      .populate("creator");

    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        const commentCount = await Comment.find({
          post: post._id,
        }).countDocuments(); // Assuming `post` has an `_id` field
        return { ...post.toObject(), commentCount };
      })
    );
    return new Response(JSON.stringify(updatedPosts), { status: 200 });
  } catch {
    return new Response("Failed to fetch posts", { status: 500 });
  }
};
