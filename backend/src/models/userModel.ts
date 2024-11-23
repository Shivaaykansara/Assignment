import  { Schema, model } from "mongoose";

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: false, 
  },
  dob:{
    type:Date,
    required:false,
  },
  otp: {
    type: String,
    required: false,
  },
  otpExpiresAt: {
    type: Date,
    required: false,
  },
});

const User = model("User", UserSchema);
export default User;
