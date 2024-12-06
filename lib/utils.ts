import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleError=(error:unknown,message:string)=>{
    if(error){
    console.log(error,message);
    }
    else{
      throw Error(`unknown error:${JSON.stringify(error)}`);
    }
}

export const parsejson=(data:object)=>{
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (error) {
      handleError(error,"problem with parsejson === lib/util.ts")
    }
}

//multer
