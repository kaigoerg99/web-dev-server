import mongoose from "mongoose";
const likesSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        movieMongooseKey: {type: mongoose.Schema.Types.ObjectId, ref: "MovieModel",},
        movieId: String,
    },
    { collection: "likes" }
);

export default likesSchema;