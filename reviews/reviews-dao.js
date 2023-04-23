import reviewsModel from "./reviews-model.js";

export const createReview = async (review) => {
    const newReview = await reviewsModel.create(review);
    return newReview;
};

export const findReviewByMovieId = async (movieId) => {
    const review = await reviewsModel.find({movieId});
    return review;
};

export const findReviewsByUserId = async (userId) => {
    const reviews = await reviewsModel.find({userId});
    return reviews;
};

export const deleteReviewById = async (reviewId) => {
    const deletedReview = await reviewsModel.deleteOne({_id: reviewId});
    return deletedReview;
};