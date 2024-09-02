import axios from "axios"; 

const API = axios.create({
    baseURL:"http://localhost:5173/api/", 
});

export const UserSignUp = async(data) => API.post("/user/signup", data); 
export const UserSignIn = async(data) => API.post("/user/signin", data); 

export const getDashboardDetails = async(token) => API.get("/user/dashboard", 
    {
        headers: {Authorization: `Bearer: ${token}`},   //Authenticated routes
    });

export const getWorkouts = async(token) => API.get("/user/dashboard", 
    {
        headers: {Authorization: `Bearer: ${token}`},   //Authenticated routes
    });

export const addWorkout = async(token) => API.get("/user/dashboard", 
    {
        headers: {Authorization: `Bearer: ${token}`},   //Authenticated routes
    });
