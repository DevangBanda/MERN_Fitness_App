import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError} from "../error.js";
import User from "../Models/User.js";
import Workout from "../Models/Workout.js";

dotenv.config();

export const userRegister = async(req, res, next) => {
    try {
        const {email, password, userName, img} = req.body;
        
        const existingUser = await User.findOne({email}).exec();
        if(existingUser){
            return next(createError(409, "User already exists"));
        }
        
        //Encrypt the password along with the salt(Random value added to the password before hashing)
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = new User({
            userName,
            email, 
            password: hashedPassword,
            img,
        })

        const createdUser = await user.save();
        const token = jwt.sign({id: createdUser._id}, process.env.JWT, {
            expiresIn: "9999 years",
        }); 

        return res.status(200).json({token, userName});

    } catch (err) {
        next(err);
    }
}