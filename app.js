import express from "express";
import cors from "cors";
import session from "express-session";
import UsersController from "./users/users-controller.js";
import mongoose from "mongoose";
import MoviesController from "./movies/movies-controller.js";
mongoose.connect('mongodb+srv://goergk:kai123@cluster0.xas8hiu.mongodb.net/movies?retryWrites=true&w=majority');
const app = express();
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(express.json());
const port = 4000;

UsersController(app);
MoviesController(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});