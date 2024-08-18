import Reply from "@/models/reply";
import { connectToDB } from "@/utils/database";

export const POST = async (request) => {
  try {
    const { text, creator, comment } = await request.json();
    await connectToDB();

    const replyData = {
      text,
      creator,
      comment,
    };

    const newReply = new Reply(replyData);
    await newReply.save();

    return new Response(JSON.stringify(newReply), { status: 201 });
  } catch (error) {
    return new Response("Failed to create reply", { status: 500 });
  }
};
