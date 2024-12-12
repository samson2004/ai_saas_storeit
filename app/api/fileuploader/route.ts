import { uploadfile } from '@/lib/actions/file.actions';
import { GetUserbyclerkid } from '@/lib/actions/user.actions';
import { handleError } from '@/lib/utils';
import { auth } from '@clerk/nextjs/server';
import { writeFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { join } from 'path';

// Naming convention for uploads = date.now + random number 1E9 + filename

export const POST = async (req: NextRequest) => {
  if (req.method === 'POST') {
    // Use auth() to get userId on the server
    const  userid  = auth();
    console.log(userid);
    const clerkid=(await userid).userId

    if (!clerkid) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // const mongodbuser = await GetUserbyclerkid(clerkid);
    // const mongodbid = mongodbuser._id;
    const mongodbid = clerkid;

    // Extract file from formData
    const formData = await req.formData();
    const file = formData.get('file') as unknown as File;
    console.log('urfile:', file);

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique reference ID for the file
    const referenceidforfile = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const path = join(process.cwd(), '/uploads', referenceidforfile);
    await writeFile(path, buffer);
    console.log(`open this file in ${path}`);

    // Prepare the new file data object
    const newfile = {
      userid: mongodbid,
      filereferenceid: referenceidforfile,
      filename: file.name,
      filepath: path,
      size: file.size,
      mimetype: file.type,
    };

    // Upload the file to your database
    const result = await uploadfile(newfile);
    if (result) {
      return NextResponse.json({ message: 'File successfully uploaded' }, { status: 200 });
    }
  }

  return NextResponse.json({ message: 'Error: File has not reached the middleware' }, { status: 400 });
};

export const config = {
  matcher: ['/api/(.*)'], // Covers all routes under /api
};
