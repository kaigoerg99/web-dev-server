import * as dao from "./users-dao.js";

const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await dao.findUserByCredentials({username, password});
    if (user) {
        req.session["currentUser"] = user;
        res.json(user);
    } else {
        res.sendStatus(404);
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
    res.json(currentUser);
};

const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
};

export default (app) => {
    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/logout", logout)
    app.get("/api/users/profile", profile);
};