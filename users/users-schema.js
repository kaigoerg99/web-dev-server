import mongoose from "mongoose";
const usersSchema = new mongoose.Schema(
{
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: String, required: true },
    email: {type: String, required: true},
    createdOn: { type: Date, default: Date.now },
},
{ collection: "users" }
);

export default usersSchema;