import { Schema,model,models } from "mongoose";


const UserSchema=new Schema({
    clerkId:{type:String,required:true,unique:true},
    fullname:{type:String,required:true},
    email:{type:String,required:true,unquie:true},
    avatar:{type:String,required:false}
});

const User=models?.User||model('User',UserSchema);

export default User;