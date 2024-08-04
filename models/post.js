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
});

const Post = models.Post || model("Post", postSchema);

export default Post;
