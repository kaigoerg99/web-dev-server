import express from "express";
import cors from "cors";
import session from "express-session";
import UsersController from "./controllers/users/users-controller.js";
import mongoose from "mongoose";
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

const welcome = (req, res) => {
    res.send("Welcome to Node.js!");
};
app.get("/", welcome);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});