import express from "express"; 
import { userRegister, userLogin, getUserDashboard} from "../Controllers/User.js";
import { verifyToken } from "../Middleware/VerifyToken.js";


const router = express.Router();

router.post('/signup', userRegister);
router.post('/signin', userLogin);
router.get('/dashboard',verifyToken, getUserDashboard);

export default router;