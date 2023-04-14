import express from "express";
import cors from "cors";
import session from "express-session";
//TODO: import controllers
//mongoose.connect("mongodb://127.0.0.1:27017/tuiter");
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
app.listen(4000);