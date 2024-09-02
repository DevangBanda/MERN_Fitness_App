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
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
            
        );

        const endToday = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + 1
        );

        const todaysWorkouts = await Workout.find({
            userId: userId,
            date: { $gte: startToday, $lt: endToday },
          });

        const totalCaloriesBurnt = todaysWorkouts.reduce(
        (total, workout) => total + workout.caloriesBurnt,
        0
        );
      
    return res.status(200).json({ workout: todaysWorkouts, calories: totalCaloriesBurnt });
    } 

    catch (error) 
    {
        next(error)
        console.log(error)
    }
};

export const addWorkout = async(req, res, next) =>{
    try {
        const userID = req.user?.id; 
        const {workoutString} = req.body;

        if(!workoutString){
            return next(createError(400, "Workout String is missing"));
        }

        //Split workout string into lines
        const eachWorkout = workoutString.split(";").map((line) =>line.trim());

        //Check if any workouts start with '#' to indicate categories
        if(categories.length === 0)
        {
            return next(createError(400, "No Categories found in the workout String"));
        }

        const parsedWorkouts = [];
        let currentCategory = "";
        let count = 0; 

        await eachWorkout.forEach((line) => {
            count++; 
            if(line.startsWith("#")){
                const parts = line?.split("\n").map((part) => part.trim());
                console.log(parts);

                if(parts.length<5){
                    return next(
                        createError(400, `Workout String mising for ${count}th`)
                    );
                }

                //Update current category 
                currentCategory = parts[0].substring(1).trim(); 

                //Extract workout details
                const workoutDetails = parseWorkoutLine(parts);
                if(workoutDetails == null){
                    return next(createError(400, "Please enter proper details"));
                }

                if(workoutDetails){
                    //Add category to workout details
                    workoutDetails.category = currentCategory; 
                    parsedWorkouts.push(workoutDetails);
                }
            }
        });
        
        await parsedWorkouts.forEach(async (workout) => {
            //Add category to workout details
            workout.caloriesBurned = parseFloat(calculateCaloriesBurnt(workout));
            await Workout.create({ ...workout, user: userID });
        });

        return res.status(201).json({
            message: "Workouts added successfully",
            workouts: parsedWorkouts,
        });

    } catch (error) {
        next(error);
        console.log(error);
    }
};


// Function to parse workout details from a line
const parseWorkoutLine = (parts) => {
    const details = {};
    console.log(parts);
    if (parts.length >= 5) {
      details.workoutName = parts[1].substring(1).trim();
      details.sets = parseInt(parts[2].split("sets")[0].substring(1).trim());
      details.reps = parseInt(
        parts[2].split("sets")[1].split("reps")[0].substring(1).trim()
      );
      details.weight = parseFloat(parts[3].split("kg")[0].substring(1).trim());
      details.duration = parseFloat(parts[4].split("min")[0].substring(1).trim());
      console.log(details);
      return details;
    }
    return null;
  };
  
  // Function to calculate calories burnt for a workout
  const calculateCaloriesBurnt = (workoutDetails) => {
    const durationInMinutes = parseInt(workoutDetails.duration);
    const weightInKg = parseInt(workoutDetails.weight);
    const caloriesBurntPerMinute = 5; // Sample value, actual calculation may vary
    return durationInMinutes * caloriesBurntPerMinute * weightInKg;
  };

