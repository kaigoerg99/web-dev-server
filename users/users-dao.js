import usersModel from "./users-model.js";

export const findUserByUsername = async (username) => {
    // const user = await usersModel.find({username});
    const user = await usersModel.findOne({ username });
    return user;
};

export const createUser = async (user) => {
    const newUser = await usersModel.create(user);
    return newUser;
};