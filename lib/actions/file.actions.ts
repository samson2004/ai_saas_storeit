'use server';

import FileCollection from "../Mongodb/models/file.model";
import { connecttodatabase } from "../Mongodb/mongoose";
import { handleError, parsejson } from "../utils";


export const uploadfile=async(file:{
        userid:string,
        filereferenceid:string,
        filename:string,
        filepath:string,
        size:number,
        mimetype:string       
})=>{
    try {
        await connecttodatabase();

        const newfile=await FileCollection.create(file);
        return parsejson(newfile);
    } catch (error) {
        handleError(error,'Problem with uploadfile === file.actions.ts')
    }
    
}