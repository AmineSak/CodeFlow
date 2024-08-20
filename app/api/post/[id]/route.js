import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";
import Post from "@/models/post";
import { revalidatePath } from "next/cache";

// GET request to fetch a specific post
export async function GET(request, { params }) {
  try {
    await connectToDB();
    const post = await Post.findById(params.id).populate({
      path: "creator",
      select: "username image",
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "/";
    revalidatePath(path);

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

// PATCH request to update a post's upvotes and votes
export async function PATCH(request, { params }) {
  try {
    const { upvotes, userId, voteValue } = await request.json();
    await connectToDB();
    const postToUpdate = await Post.findById(params.id);

    if (!postToUpdate) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const userVote = postToUpdate.votes.find(
      (vote) => vote.userId.toString() === userId.toString()
    );

    if (userVote) {
      if (voteValue > 0) {
        if (userVote.vote <= 0) {
          userVote.vote++;
          postToUpdate.upvotes = upvotes;
        } else {
          return NextResponse.json(
            { error: "User reached max votes" },
            { status: 400 }
          );
        }
      } else {
        if (userVote.vote >= 0) {
          userVote.vote--;
          postToUpdate.upvotes = upvotes;
        } else {
          return NextResponse.json(
            { error: "User reached max votes" },
            { status: 400 }
          );
        }
      }
    } else {
      // Add a new vote if the user hasn't voted yet
      postToUpdate.votes.push({ userId, vote: voteValue });
      postToUpdate.upvotes = upvotes + voteValue;
    }

    await Promise.allSettled([postToUpdate.save(), userVote.save()]);

    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "/";
    revalidatePath(path);

    return NextResponse.json(postToUpdate, { status: 200 });
  } catch (error) {
    console.error("Failed to update post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
