import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Comment from "@/models/comment";

// GET request to fetch comments for a specific post
export async function GET(req, { params }) {
  try {
    await connectToDB();
    const comments = await Comment.find({ post: params.id })
      .populate({
        path: "creator",
        select: "username image",
      })
      .sort({ upvotes: -1, createdAt: -1 });

    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "/";
    revalidatePath(path);
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch comments: ", error);
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

// PATCH request to update a comment's upvotes and votes
export async function PATCH(req, { params }) {
  try {
    const { upvotes, userId, voteValue } = await req.json();
    await connectToDB();

    const commentToUpdate = await Comment.findById(params.id);
    if (!commentToUpdate) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    const userVote = commentToUpdate.votes.find(
      (vote) => vote.userId.toString() === userId.toString()
    );

    if (userVote) {
      if (voteValue > 0) {
        if (userVote.vote <= 0) {
          userVote.vote++;
          commentToUpdate.upvotes = upvotes;
        } else {
          return NextResponse.json(
            { error: "User reached max votes" },
            { status: 400 }
          );
        }
      } else {
        if (userVote.vote >= 0) {
          userVote.vote--;
          commentToUpdate.upvotes = upvotes;
        } else {
          return NextResponse.json(
            { error: "User reached max votes" },
            { status: 400 }
          );
        }
      }
    } else {
      // Add a new vote if the user hasn't voted yet
      commentToUpdate.votes.push({ userId, vote: voteValue });
    }

    await commentToUpdate.save();

    return NextResponse.json(commentToUpdate, { status: 200 });
  } catch (error) {
    console.error("Failed to update comment:", error);
    return NextResponse.json(
      { error: "Failed to update comment" },
      { status: 500 }
    );
  }
}
