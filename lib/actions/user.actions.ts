'use server';

import User from "../Mongodb/models/user.model";
import { connecttodatabase } from "../Mongodb/mongoose"
import { handleError, parsejson } from "../utils"
import bcrypt from 'bcrypt';
//parsejson only returns./ doesn't console-log

export const CreateUser=async(user:any)=>{
    try {
        await connecttodatabase();

        const newuser=await User.create(user);
        return parsejson(newuser);

    } catch (error) {
        handleError(error,"problem with createuser === user.actions.ts  ")
    }
}

export const GetUserbyId=async(userid:string)=>{
    try {
        await connecttodatabase();
        const getuserdata=await User.findOne({_id:userid});
        return parsejson(getuserdata);
    } catch (error) {
        handleError(error,"problem with getuserbyid === user.actions.ts")
    }
}

export const GetUserbyclerkid=async(clerkId:string)=>{ //gives entire data
    try {
        await connecttodatabase();
        const getuser=await User.findOne({clerkId:clerkId});

        return parsejson(getuser);

    } catch (error) {
        handleError(error,"problem with getuserbyclerkid === user.actions.ts")
    }
}




//never used
export const hashpasswd=async(password:string)=>{  // true or false
    try {
        const saltround=10;
        const hashpassword=await bcrypt.hash(password,saltround);
        return hashpassword;
    } catch (error) {
        handleError(error,"problem with hashpasswd === user.actions.ts");
    }
}

export const verifypasswd=async(password:string,hashedpassword:string)=>{
    try {
        
        const match=await bcrypt.compare(password,hashedpassword);
        if(match){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        handleError(error,'problem with verifypassword === user.actions.ts')
    }
}