import mongoose, {Schema} from 'mongoose'

const projectMemberSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    
        project:{
            type: Schema.Types.ObjectId,
            ref:"Project",
            required:true
        },
        role:{
            type:String,
            enum:[],
            default:""
        }
    
}, {
    timestamps:true
})

export const ProjectMember = mongoose.model("ProjectMember", projectMemberSchema)