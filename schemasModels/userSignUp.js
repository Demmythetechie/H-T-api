import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const accountDetails = new Schema({
    Firstname: String,
    Lastname: String,
    Email: String,
    Password: String,
    year: String,
    verified: Boolean
}, { versionKey: false });

const signUp = new model('userSignUp', accountDetails);

export default signUp;