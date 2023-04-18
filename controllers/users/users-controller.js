import * as dao from "../../users/users-dao.js";

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

export default (app) => {
    app.post("/api/users/register", register);
};