import { Schema, models, model } from "mongoose";

const replySchema = new Schema({
  text: {
    type: String,
    required: [true, "text is required!"],
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment",
    required: true,
  },
});

const Reply = models.Reply || model("Reply", replySchema);

export default Reply;
