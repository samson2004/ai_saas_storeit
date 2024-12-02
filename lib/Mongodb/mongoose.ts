import mongoose, { Mongoose } from 'mongoose';
import { handleError } from '../utils';


const mongodb_uri=process.env.NEXT_MONGODB_URI;

interface MongooseConnection{
    conn:Mongoose|null,
    promise:Promise<Mongoose>|null
}

let cached:MongooseConnection=(global as any).mongoose
if(!cached){
    cached=(global as any).mongoose={
        conn:null,
        promise:null
    }
}

export const connecttodatabase=async()=>{
    if(cached.conn) return cached.conn;
    if(!mongodb_uri) return handleError("Error","Missing mongodb_uri");

    cached.promise=cached.promise||mongoose.connect(
        mongodb_uri,{
            dbName:'storeIt-backend',
            bufferCommands:false
        }
    );

    cached.conn=await cached.promise;
    return cached.conn;
}