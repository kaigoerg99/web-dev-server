import * as moviesDao from "./movies-dao.js";
import * as likesDao from "../likes/likes-dao.js";

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

export default (app) => {
    app.post("/api/movies/:movieId/likes", likeMovie);
}