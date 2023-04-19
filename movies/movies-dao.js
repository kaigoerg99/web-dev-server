import movieModel from "./movies-model.js"

export const findMovieByMovieId = async (movieId) =>
    await movieModel.findOne({ movieId });

export const createMovie = async (movie) => {
    const newMovie = await movieModel.create(movie);
    return newMovie;
};