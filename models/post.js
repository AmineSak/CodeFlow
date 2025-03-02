import { Schema, models, model } from "mongoose";

const postSchema = new Schema({
  text: {
    type: String,
    required: [true, "text is required!"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
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

const Post = models.Post || model("Post", postSchema);

export default Post;
