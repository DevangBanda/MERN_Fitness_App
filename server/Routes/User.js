import express from "express"; 
import { userRegister } from "../Controllers/User.js";


const router = express.Router();

router.post('/signup', userRegister);
//router.post('/signin', userRegister);

export default router;