import { connectToDB } from "@/utils/database";
import Comment from "@/models/comment";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const comment = await Comment.findById(params.commentId).populate({
      path: "creator",
      select: "username image",
    });

    if (!comment) {
      return new Response("Comment not found", { status: 404 });
    }

    return new Response(JSON.stringify(comment.toObject()), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch comment: ", error);
    return new Response("Failed to fetch comment", { status: 500 });
  }
};

export const POST = async (request, { params }) => {
  const { replyText, userId } = await request.json();
  try {
    await connectToDB();
    const updatedComment = await Comment.findByIdAndUpdate(
      params.commentId,
      {
        $push: {
          replies: { text: replyText, creator: userId },
        },
      },
      { new: true }
    )
      .populate({
        path: "replies.creator",
        select: "username image",
      })
      .exec();

    if (!updatedComment) {
      return new Response("Comment not found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedComment), { status: 200 });
  } catch (error) {
    console.error("Failed to add reply: ", error);
    return new Response("Failed to add reply: ", { status: 500 });
  }
};
