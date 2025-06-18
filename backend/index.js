
import express, { application } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import userroutes from "./routes/userroutes.js"
import companyroutes from "./routes/companyroutes.js"
import jobroutes from "./routes/jobroutes.js"
import applicationroutes from "./routes/applicationroutes.js"

import connectdb from "./utils/db.js"
import path from "path"

dotenv.config()

const app = express();
const port = process.env.PORT || 8080;


const _dirname = path.resolve()
 



//app.use(express.bodyparser())
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser())

const corsoption={
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsoption)) 

app.use("/api/v1/user",userroutes)
app.use("/api/v1/company",companyroutes)
app.use("/api/v1/job",jobroutes)
app.use("/api/v1/applications",applicationroutes)


app.use(express.static(path.join(_dirname, "/frontend/dist")))
app.get('*',(req, res)=>{
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
})
 
app.listen(port,()=>{
    connectdb();
    console.log(`server is running on ${port}`)
})