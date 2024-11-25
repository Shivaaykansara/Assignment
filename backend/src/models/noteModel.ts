import{ model, Schema } from "mongoose";


const noteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },

  },
  { timestamps: true }
);

export default model("Note", noteSchema);
