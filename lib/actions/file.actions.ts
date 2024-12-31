'use server';

import FileCollection from "../Mongodb/models/file.model";
import { connecttodatabase } from "../Mongodb/mongoose";
import { handleError, parsejson } from "../utils";


export const uploadfile=async(file:any)=>{
    try {
        await connecttodatabase();

        const newfile=await FileCollection.create(file);
        return parsejson(newfile);
    } catch (error) {
        handleError(error,'Problem with uploadfile === file.actions.ts')
    }
    
}


export const Getspecificfile_referenceid=async(referenceid:string)=>{
  try {
    await connecttodatabase();

    const file=await FileCollection.findOne({filereferenceid:referenceid});
    return file

  } catch (error) {
    handleError(error,'Problem with getspecificfile_referenceid === file.actions.ts ')
  }
}


export const getUserfiledataby_id=async(userid:string)=>{
    try {
        await connecttodatabase();

        const listoffiles=await FileCollection.find({userid:userid});
        return parsejson(listoffiles);
    } catch (error) {
        handleError(error,'Problem with getUserfiledataby_id ===file.actions.ts')
    }
}
export const Updatefilename = async (referenceid: string, file: any): Promise<boolean> => {
    try {
      await connecttodatabase();
  
      const rename = await FileCollection.findOneAndUpdate(
        {   filereferenceid:referenceid }, 
        { $set: { filename: file.filename } }, 
        { new: true }
      );
  
      return !!rename; // Return true if successful
    } catch (error) {
      handleError(error, "Problem with Updatefilename === file.actions.ts");
      return false;
    }
  };

export const deleteFile=async(_id:string)=>{
  try {
    await connecttodatabase();

    await FileCollection.findByIdAndDelete(_id);
    return true;

  } catch (error) {
    handleError(error,"Problem with deleteFile === file.actions.ts");
    return false;
  }
}