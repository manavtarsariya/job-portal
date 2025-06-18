import express from "express";



import { postjob, getAlljobs, getJobById, getAdminJobs, DeleteAdminJob } from "../usercontrollers/jobcontrollers.js";
import isAuthenticated from "../Middlewares/isauthenticated.js";

const router = express.Router()




router.post('/post', isAuthenticated, postjob);
router.get('/get', getAlljobs);
router.get('/get/:id', isAuthenticated, getJobById);
router.get('/getadminjobs', isAuthenticated, getAdminJobs);
router.delete('/removejob/:id', isAuthenticated, DeleteAdminJob);

export default router;
