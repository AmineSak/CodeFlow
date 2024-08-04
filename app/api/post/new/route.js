import Post from "@/models/post";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    const { text, userId, code, codeLang } = await request.json();
    await connectToDB();

    const today = new Date();
    const dateOnly = today.toISOString().split("T")[0];

    const postData = {
      text,
      creator: userId,
      code,
      createdAt: dateOnly,
      codeLang,
    };

    const newPost = new Post(postData);

    await newPost.save();

    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create post", { status: 500 });
  }
};
