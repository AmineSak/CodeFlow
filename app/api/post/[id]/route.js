import { connectToDB } from "@/utils/database";
import Post from "@/models/post";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const post = await Post.findById(params.id).populate({
      path: "creator",
      select: "username image",
    });
    if (!post) return new Response("post not found", { status: 404 });

    return new Response(JSON.stringify(post), {
      status: 200,
    });
  } catch {
    console.error("Failed to fetch posts: ", error);
    return new Response("Failed to fetch post", { status: 500 });
  }
};

// PATCH
export const PATCH = async (req, { params }) => {
  const { upvotes, userId, voteValue } = await req.json();

  try {
    await connectToDB();
    const postToUpdate = await Post.findById(params.id);

    if (!postToUpdate) {
      return new Response("Post not found", { status: 404 });
    }

    const userVote = await postToUpdate.votes.find(
      (vote) => vote.userId.toString() === userId.toString()
    );

    if (userVote) {
      if (voteValue > 0) {
        if (userVote.vote <= 0) {
          userVote.vote++;
          postToUpdate.upvotes = upvotes;
        } else {
          return new Response("User reached max votes", { status: 500 });
        }
      } else {
        if (userVote.vote >= 0) {
          userVote.vote--;
          postToUpdate.upvotes = upvotes;
        } else {
          return new Response("User reached max votes", { status: 500 });
        }
      }
    } else {
      // Add a new vote if the user hasn't voted yet
      postToUpdate.votes.push({ userId, vote: voteValue });
    }

    await postToUpdate.save();

    return new Response(JSON.stringify(postToUpdate), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update post", { status: 500 });
  }
};
