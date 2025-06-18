


import multer from "multer";
// import { register } from "../usercontrollers/usercontroller.js";




// "file" name same hovu joye te form ma (type:file), like signup form ma

//  multer middleware ne use karvanu jya jya profile pic avtu hoi tya
// like register api ma

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");


