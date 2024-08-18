import { connectToDB } from "@/utils/database";
import Reply from "@/models/reply";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const replies = await Reply.find({ comment: params.commentId })
      .populate({
        path: "creator",
        select: "username image",
      })
      .exec();
    return new Response(JSON.stringify(replies), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch replies: ", error);
    return new Response("Failed to fetch replies", { status: 500 });
  }
};
