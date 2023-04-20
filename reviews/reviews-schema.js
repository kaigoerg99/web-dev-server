import mongoose from "mongoose";

const reviewsSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        movieMongooseKey: {type: mongoose.Schema.Types.ObjectId, ref: "MovieModel",},
        movieId: String,
        review: String,
    },
    { collection: "reviews" }
);

export default reviewsSchema;