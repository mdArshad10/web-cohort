import mongoose from 'mongoose'

const projectNoteSchema = new mongoose.Schema({

    project:{
        type:String,
    },
    content:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }, 

},{timestamps:true})

export const ProjectNote = mongoose.model('projectNote', projectNoteSchema)