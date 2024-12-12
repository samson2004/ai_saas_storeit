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