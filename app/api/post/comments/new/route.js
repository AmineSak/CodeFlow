import { connectToDB } from "@/utils/database";
import Comment from "@/models/comment";

export const POST = async (request) => {
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

    return new Response(JSON.stringify(newComment), { status: 201 });
  } catch (error) {
    return new Response("Failed to create Comment", { status: 500 });
  }
};
