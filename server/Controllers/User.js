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

        return res.status(200).json({token, createdUser});

    } catch (err) {
        next(err);
    }
}; 

export const userLogin = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        
        const currUser = await User.findOne({email}).exec();
        if(!currUser){
            return next(createError(409, "User not found"));
        }

        const isPasswordCorrect = await bcrypt.compareSync(password, currUser.password);

        if(!isPasswordCorrect){
            return next(createError(403, "The password you entered does not match"));
        }

        const token = jwt.sign({id: currUser._id}, process.env.JWT, {
            expiresIn: "9999 years",
        }); 

        return res.status(200).json({token, currUser});

    } catch (err) {
        next(err);
    }
}; 

export const getUserDashboard = async(req, res, next) =>
{
    try {
        const userId = req.user?.id; 
        const user = await User.findById(userId);
       

        if(!user){
            return next(createError(404, "User not found"));
        }

        const currentDateFormatted = new Date();
        const startToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate()
            
        );

        const endToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate() + 1
        );

        //calculate total calories burnt
        const totalCaloriesBurnt = await Workout.aggregate([
            {$match:  {user: user._id, date:  {$gte: startToday, $lt: endToday}}},
            {
                $group: {
                    _id: null,
                    totalCaloriesBurnt: {$sum: "caloriestBurnt"}, 
                }
            }
        ]);

        //Calculate total wokouts
        const totalWorkouts = await Workout.countDocuments({
            user: user._id, 
            date: {$gte: startToday, $lt: endToday},
        }); 

       const avgCalPerWorkout = totalCaloriesBurnt.length > 0 ? totalCaloriesBurnt[0] / totalWorkouts : 0 ;
        
        //Fetch category of workout
        const categoryCalories = await Workout.aggregate([
            {$match:  {user: user._id, date:  {$gte: startToday, $lt: endToday}}},
            {
                $group: {
                    _id : "category", 
                    totalCaloriesBurnt: {$sum: "caloriestBurnt"}, 
                }
            }
        ]); 

        //Format Category data for pie chart
        const pieChartData = categoryCalories.map((category, index) => ({
            id: index, 
            value: category.totalCaloriesBurnt, 
            label: category._id
        }));

        const weeks = [];
        const caloriesBurnt = [];
        
        for(let i=6; i>=0; i--)
        {
            const date = new Date(
                currentDateFormatted.getTime() - i*24*60*60*1000
            ); 
            weeks.push(`${date.getDate()}th`);

            const startToday = new Date(
                currentDateFormatted.getFullYear(),
                currentDateFormatted.getMonth(),
                currentDateFormatted.getDate()
                
            );
    
            const endToday = new Date(
                currentDateFormatted.getFullYear(),
                currentDateFormatted.getMonth(),
                currentDateFormatted.getDate() + 1
            );

            // const weekData = await Workout.aggregate([
            //     {$match:  {user: user._id, date:  {$gte: startToday, $lt: endToday}}},
            //     {
            //         $group: {
            //             _id : {$dateToString: {format: "%Y-%m-%d", date:"$date" }}, 
            //             totalCaloriesBurnt: {$sum: "caloriestBurnt"}, 
            //         }
            //     }, 
            //     {sort: {_id: 1},},   //Sort in ascending order
            // ]);

            const weekData = await Workout.aggregate([
                {
                  $match: {
                    user: user._id,
                    date: { $gte: startToday, $lt: endToday },
                  },
                },
                {
                  $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    totalCaloriesBurnt: { $sum: "$caloriesBurned" },
                  },
                },
                {
                  $sort: { _id: 1 }, // Sort by date in ascending order
                },
              ]);

            caloriesBurnt.push(
                weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
            );
        }


        return res.status(200).json({
            totalCaloriesBurnt:
              totalCaloriesBurnt.length > 0
                ? totalCaloriesBurnt[0].totalCaloriesBurnt
                : 0,
            totalWorkouts: totalWorkouts,
            avgCalPerWorkout: avgCalPerWorkout,
            totalWeeksCaloriesBurnt: {
              weeks: weeks,
              caloriesBurned: caloriesBurnt,
            },
            pieChartData: pieChartData,
          });
    } 
    catch (err) {
        next(err)
    }
};

const getWorkoutsByDate = async(req, res, next) => {
    try 
    {
        const userId = req.user?.id; 
        const user = await User.findById(userId);

        if(!user){
            return next(createError(404, "User not found"));
        }

        let date = req.query.date ? new Date(req.query.date) : new Date();

        const startToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate()
            
        );

        const endToday = new Date(
            currentDateFormatted.getFullYear(),
            currentDateFormatted.getMonth(),
            currentDateFormatted.getDate() + 1
        );

        const todaysWorkouts = await Workout.find({
            userId: userId,
            date: { $gte: startToday, $lt: endToday },
          });
          
        const totalCaloriesBurnt = todaysWorkouts.reduce(
        (total, workout) => total + workout.caloriesBurnt,
        0
        );
      
          return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
        



    } 

    catch (error) 
    {
        next(error)
    }
}   
