import { Schema, model } from "mongoose"
import { IUser } from "../interfaces"
import bcrypt from 'bcrypt';

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        max: 60
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    name: {
        type: String,
        required: true,
        max: 30,
    },
    address: {
        type: String,
        required: true,
        max: 50
    },
    age: {
        type: Number,
        required: true,
    },
    cellphone: {
        type: Number,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
        max: 150
    }
})

UserSchema.pre('save', async function(next) {
    var user = this;

    if (!user.isModified('password')) return next();

    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    
});

export const User = model<IUser>("User", UserSchema);