







import express from "express";
import { login, logout, register, updateProfile } from "../usercontrollers/usercontroller.js";
import isAuthenticated from "../Middlewares/isauthenticated.js";
import {singleUpload} from "../Middlewares/multer.js"


const router = express.Router();
 
// Route for user registration
// router.route("/register").post(register);

router.post("/register", singleUpload, register)

// Route for user login
// router.route("/login").post(login);
router.post("/login", login);   
router.get("/logout", logout);

// Route for updating user profile (requires authentication)
// router.route("/profile/update").post(isAuthenticated, updateProfile);
router.post("/profile/update", isAuthenticated,singleUpload, updateProfile);

export default router;
