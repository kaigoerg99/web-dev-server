import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
    {
        name: String,
        movieId: String,
        image: String,
    },
    { collection: "movies" }
);

export default movieSchema;