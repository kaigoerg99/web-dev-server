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
    const like = await likesDao.createLike({
        userId: currentUser._id,
        movieId: movie.movieId,
        movieMongooseKey: movie._id,
    });
    res.json(review);
};

const getMovie = async (req, res) => {
    let movie = await moviesDao.findMovieByMovieId(req.params.movieId);
    res.json(movie);
}

export default (app) => {
    app.post("/api/movies/:movieId/likes", likeMovie);
    app.post("/api/movies/:movieId/review", reviewMovie);
    app.get("/api/movies/:movieId", getMovie);
}