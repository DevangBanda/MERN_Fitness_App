import { MongoError } from "mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      img: {
        type: String,
        default: null,
      },
      password: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: false
      },
    },
    {timestamps: true}
);

export default  mongoose.model("User", UserSchema);