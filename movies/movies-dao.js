import movieModel from "./movies-model.js"

export const findMovieByMovieId = async (movieId) =>
    await movieModel.findOne({ movieId });

export const createMovie = async (movie) => {
    const newMovie = await movieModel.create(movie);
    return newMovie;
};

export const findMoviesByMovieIds = async (movieIds) => {
    const res = await movieModel.find({ movieId : {$in : movieIds }});
    return res;
}