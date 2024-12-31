import { uploadfile } from '@/lib/actions/file.actions';
import { GetUserbyclerkid } from '@/lib/actions/user.actions';
import { handleError } from '@/lib/utils';
import { useAuth } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {join} from 'path';


// naming convention for uploads= date.now + random number 1E9 + filename

export const POST=async(req:NextRequest)=>{
  if(req.method=='POST'){



    const formData = await req.formData(); 
    const file = formData.get('file') as unknown as File; 
    const id=formData.get('id')
    console.log("urfile:",file);

    const bytes=await file.arrayBuffer();
    const buffer=Buffer.from(bytes);
    
    const referenceidforfile= Date.now()+ '-' + Math.round(Math.random() * 1E9)
    const path=join(process.cwd(),'/public',referenceidforfile+'-'+file.name);//+'-'+file.name
    await writeFile(path,buffer);
    console.log(`open this file in ${path}`);
    // {userid,filereferenceid,filename,filepath,size,minetype}

    const newfile={
      userid:id,
      filereferenceid:referenceidforfile+'-'+file.name,
      filename:file.name,
      filepath:path,
      size:file.size,
      mimetype:file.type
    }

    try {
      const result=await uploadfile(newfile);
      if(result) return NextResponse.json({message:'file reached middleware'},{status:200});
    } catch (error) {
        handleError(error,'Error in uploading file-content in mongodb');
    }
    
  }
  return NextResponse.json({message:'Error file hasnt reached middlware'},{status:400});
}

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser to use multer
  },
};
