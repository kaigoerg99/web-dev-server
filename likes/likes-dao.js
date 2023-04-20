import likesModel from "./likes-model.js";

export const createLike = async (like) => {
    const newLike = await likesModel.create(like);
    return newLike;
};

export const findLikeByMovieId = async (movieId) => {
    const likes = await likesModel.find({movieId});
    return likes;
};

export const findLikesByUserId = async (userId) => {
    const likes = await likesModel.find({userId});
    return likes;
};