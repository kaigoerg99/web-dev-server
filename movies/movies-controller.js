import * as moviesDao from "./movies-dao.js";
import * as likesDao from "../likes/likes-dao.js";
import * as reviewsDao from "../reviews/reviews-dao.js"

const likeMovie = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
        res.sendStatus(401);
        return;
    }
    let movie = await moviesDao.findMovieByMovieId(req.params.movieId);
    if (!movie) {
        movie = await moviesDao.createMovie(req.body);
    }
    const like = await likesDao.createLike({
        userId: currentUser._id,
        movieId: movie.movieId,
        movieMongooseKey: movie._id,
    });
    res.json(like);
};

const reviewMovie = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
        res.sendStatus(401);
        return;
    }
    let movie = await moviesDao.findMovieByMovieId(req.params.movieId);
    if (!movie) {
        movie = await moviesDao.createMovie(req.body.movie);
    }
    const review = await reviewsDao.createReview({
        userId: currentUser._id,
        review: req.body.review,
        movieId: movie.movieId,
        movieMongooseKey: movie._id,
    });
    res.json(review);
};

const deleteReview = async (req, res) => {
    let deletedReview = await reviewsDao.deleteReviewById(req.body.reviewId);
    res.json(deletedReview);
}

const getMovie = async (req, res) => {
    let movie = await moviesDao.findMovieByMovieId(req.params.movieId);
    res.json(movie);
};

const getMovies = async (req, res) => {
    let movies = await moviesDao.findMoviesByMovieIds(req.body);
    res.json(movies);
}

const getReviewsByMovie = async (req, res) => {
    const reviews = await reviewsDao.findReviewByMovieId(req.params.movieId);
    res.json(reviews);
};

const getReviewsByUser = async (req, res) => {
    const reviews = await reviewsDao.findReviewsByUserId(req.params.userId);
    res.json(reviews);
};

export default (app) => {
    app.post("/api/movies/:movieId/likes", likeMovie);
    app.post("/api/movies/:movieId/review", reviewMovie);
    app.post("/api/movies/getMovies", getMovies);
    app.post("/api/movies/deleteReview", deleteReview);
    app.get("/api/movies/:movieId", getMovie);
    app.get("/api/movies/getReviewsbyMovie/:movieId", getReviewsByMovie);
    app.get("/api/movies/getReviewsbyUser/:userId", getReviewsByUser);
};