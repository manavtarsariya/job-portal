

import express from "express"
import { deleteAdminCompany,  getCompany, getCompanyById, registercompany, updateCompany } from "../usercontrollers/companycontroller.js"
import isAuthenticated from "../Middlewares/isauthenticated.js"
import {singleUpload} from "../Middlewares/multer.js"

const router = express.Router()



router.post("/register",isAuthenticated, registercompany)
router.get("/get",isAuthenticated, getCompany)
router.get("/get/:id",isAuthenticated, getCompanyById)
router.delete("/removecompany/:id",isAuthenticated, deleteAdminCompany)
router.put("/update/:id",isAuthenticated,singleUpload, updateCompany)


export default router;