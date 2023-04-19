import mongoose from "mongoose";
import movieSchema from "./movies-schema.js";
const movieModel = mongoose.model("MovieModel", movieSchema);
export default movieModel;