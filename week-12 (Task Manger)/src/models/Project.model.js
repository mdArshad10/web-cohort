import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
 name:{
    type:String
 },
 description:{
    type:String
 },
 createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
 }
},{timestamps:true})

export const Project = mongoose.model("project",projectSchema)