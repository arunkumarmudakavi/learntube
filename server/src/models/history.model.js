import {mongoose, Schema, model } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
// import  from Schema.Types

const historySchema = new Schema({
    videoId: {
        type: Schema.Types.ObjectId,
        ref: "Video",
        reqired: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        reqired: true,
    }
}, {timestamps: true})

historySchema.plugin(mongooseAggregatePaginate)

export const History = model("History", historySchema)