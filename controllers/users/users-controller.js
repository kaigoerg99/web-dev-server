import * as dao from "../../users/users-dao.js";

const login = async (req, res) => {
    const user = await dao.findUserByCredentials(req.body);
    // users.find((user) => user.username === req.body.username);
    if (user) {
        req.session["currentUser"] = user;
        res.json(user);
    } else {
        res.sendStatus(401);
    }
};

const register = async (req, res) => {
    const user = req.body;
    const existingUser = await dao.findUserByUsername(user.username);
    if (existingUser) {
        res.sendStatus(409);
        return;
    }
    const newUser = await dao.createUser(user);
    req.session.currentUser = newUser;
    res.json(newUser);
};

const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
        res.sendStatus(404);
        return;
    }
    res.send(currentUser);
};

export default (app) => {
    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.get("/api/users/profile", profile);
};