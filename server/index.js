import mongoose from "mongoose";
import express from 'express'; 
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit: "50mb"})); //Register the middleware with limit of 50mb
app.use(express.urlencoded({extended: true})); //Register the middleware used to parse incoming requests with URL encoded payloads
import UserRoutes from './Routes/User.js';

app.get('/', (req, res) => {
    res.status(200).json({message: "Hello"});
})


app.use('/api/user', UserRoutes);


//Error handler 
app.use((err, req, res, next) =>
    {
        const status = err.status || 500;
        const message = err.message || "Something Went Wrong";
    
        return res.status(status).json(
            {
                success: false, 
                status, 
                message,
            }
        );
    });

mongoose   
        .connect(process.env.mongoDB_URL)
        .then(() =>{
            console.log("App connected to Mongo Database");
            app.listen(5100, () => 
                {
                    console.log(`Server is listening at 5100`)
                })
        })
        .catch((error) => {
            console.log(error)
        });