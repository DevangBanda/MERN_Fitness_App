import { MongoError } from "mongodb";
import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    user:
        {type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    }, 
    categoryCalories: {type: String, required: true,}, 
    workoutName: {type:String, required: true, unique: true,}, 
    sets: {type: Number, required: true,}, 
    reps: {type: Number,}, 
    weight: {type: Number,}, 
    duration: {type: Number, }, 
    caloriesBurnt: {type: Number, default: Date.now,}, 
    }, 
    {timestamps: true});

export default mongoose.model("Workout", workoutSchema);