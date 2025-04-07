import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN, ACCESS_TOKEN_EXPIRE, REFRESH_TOKEN, REFRESH_TOKEN_EXPIRE } from "../const/envConstant.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      unique: true,
      index: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is already present"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: "https://via.placeholder.com/200x200.png",
        localPath:""
      },
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);


userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
})

userSchema.methods.isComparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}


userSchema.methods.generateAccessToken = function(){
  return jwt.sign({id:this._id}, ACCESS_TOKEN ,{
    expiresIn:ACCESS_TOKEN_EXPIRE,
  })
}

userSchema.methods.generateRefreshToken = function(){
  return jwt.sign({id:this._id}, REFRESH_TOKEN, {
    expiresIn:REFRESH_TOKEN_EXPIRE
  })
}


export const User = mongoose.model("user", userSchema);
