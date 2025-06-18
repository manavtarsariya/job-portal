






import mongoose, { mongo } from "mongoose"

const jobschema = new mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    requirements:{
        type:Array,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    experienceLevel:{
        type:Number,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type: mongoose.Schema.Types.ObjectId , 
        ref:'Company',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    application:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
    }]
},{timestamps : true})


export const Job = mongoose.model('Job',jobschema)