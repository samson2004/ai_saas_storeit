import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {join} from 'path';


// naming convention for uploads= date.now + random number 1E9 + filename

export const POST=async(req:NextRequest)=>{
  if(req.method=='POST'){
    const formData = await req.formData(); 
    const file = formData.get('file') as unknown as File; 
    console.log("urfile:",file);

    const bytes=await file.arrayBuffer();
    const buffer=Buffer.from(bytes);
    
    const referenceidforfile= Date.now()+ '-' + Math.round(Math.random() * 1E9)
    const path=join(process.cwd(),'/uploads',referenceidforfile+'-'+file.name);
    await writeFile(path,buffer);
    console.log(`open this file in ${path}`);
    return NextResponse.json({message:'file reached middleware'},{status:200});
  }
  return NextResponse.json({message:'Error file hasnt reached middlware'},{status:400});
}

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser to use multer
  },
};
