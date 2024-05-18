import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoLikesSchema = mongoose.Schema(
  {
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);

videoLikesSchema.plugin(mongooseAggregatePaginate);

export const Likes = mongoose.model("Likes", videoLikesSchema);
