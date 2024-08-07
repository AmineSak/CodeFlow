import { connectToDB } from "@/utils/database";
import Comment from "@/models/comment";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const comments = await Comment.find({ post: params.id })
      .populate({
        path: "creator",
        select: "username image",
      })
      .sort({ upvotes: -1, createdAt: -1 });

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch {
    console.error("Failed to fetch comments: ", error);
    return new Response("Failed to fetch comments", { status: 500 });
  }
};

// PATCH
export const PATCH = async (req, { params }) => {
  const { upvotes, userId, voteValue } = await req.json();

  try {
    await connectToDB();
    const commentToUpdate = await Comment.findById(params.id);

    if (!commentToUpdate) {
      return new Response("Comment not found", { status: 404 });
    }

    const userVote = await commentToUpdate.votes.find(
      (vote) => vote.userId.toString() === userId.toString()
    );

    if (userVote) {
      if (voteValue > 0) {
        if (userVote.vote <= 0) {
          userVote.vote++;
          commentToUpdate.upvotes = upvotes;
        } else {
          return new Response("User reached max votes", { status: 500 });
        }
      } else {
        if (userVote.vote >= 0) {
          userVote.vote--;
          commentToUpdate.upvotes = upvotes;
        } else {
          return new Response("User reached max votes", { status: 500 });
        }
      }
    } else {
      // Add a new vote if the user hasn't voted yet
      commentToUpdate.votes.push({ userId, vote: voteValue });
    }

    await commentToUpdate.save();

    return new Response(JSON.stringify(commentToUpdate), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update comment", { status: 500 });
  }
};
