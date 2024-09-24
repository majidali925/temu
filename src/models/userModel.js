import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const userSchema = new Schema({
    user_image: String,
    first_name: {
        type: String,
        require: true,
        unique: true
    },
    last_name: String,
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
});

userSchema.index({ email: 1 }, { unique: true })

export const User = models.User || model('User', userSchema)