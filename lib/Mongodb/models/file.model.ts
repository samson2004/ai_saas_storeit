import { models, Schema,model } from "mongoose";

const FileSchema=new Schema({
    userid:{type:String,required:true},
    filereferenceid:{type:String,required:true},
    filename:{type:String,required:true},
    filepath:{type:String,required:true},
    size:{type:Number,required:true},
    mimetype:{type:String,required:true},
    uploadedAt:{type:Date,default:Date.now()}
})

const FileCollection=models?.File||model('File',FileSchema);

export default FileCollection;