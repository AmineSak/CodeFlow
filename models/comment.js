import { Schema, models, model } from "mongoose";

const commentSchema = new Schema({
  text: {
    type: String,
    required: [true, "text is required!"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  code: {
    type: String,
  },
  createdAt: {
    type: String,
    required: true,
  },
  codeLang: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  votes: {
    type: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        vote: { type: Number, default: 0 },
      },
    ],
    default: [], // This ensures that the votes array starts as an empty array
  },
});

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
