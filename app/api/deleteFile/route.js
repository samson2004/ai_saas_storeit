// app/api/deleteFile/route.js

import { deleteFile, Getspecificfile_referenceid } from "@/lib/actions/file.actions";
import { connecttodatabase } from "@/lib/Mongodb/mongoose";
import { handleError } from "@/lib/utils";
import { promises as fs } from 'fs';
import path from "path";
import { NextResponse } from "next/server";
import { URL } from "url"; // Import URL to parse query parameters

// Optional: Define the matcher if you want to restrict it to a specific path
export const config = {
  matcher: '/api/deleteFile',
};

export async function DELETE(req) {
  const url = new URL(req.url, `http://${req.headers.get('host')}`);
  const referenceid = url.searchParams.get('referenceid');

  console.log('/api/deleteFile', referenceid); 

  if (!referenceid) {
    return new NextResponse(JSON.stringify({ error: 'File reference ID is required' }), { status: 400 });
  }

  try {
    // Connect to the database
    await connecttodatabase();

    // Fetch file information from DB using referenceid
    const file = await Getspecificfile_referenceid(referenceid);
    if (!file) {
      return new NextResponse(JSON.stringify({ error: 'File not found' }), { status: 404 });
    }

    const filepath = file.filepath;

    // Delete the file from the server
    await fs.unlink(path.resolve(filepath));

    // Delete the file record from MongoDB
    const success = await deleteFile(file._id);
    if (success) {
      return new NextResponse(JSON.stringify({ message: 'File has been deleted successfully' }), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ error: 'Failed to delete file record from database' }), { status: 500 });
    }

  } catch (error) {
    handleError(error, 'Error in deleting file /api/deleteFile');
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
