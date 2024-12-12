'use client';
import axios from 'axios';
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '../ui/button';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { GetUserbyclerkid } from '@/lib/actions/user.actions';

const UploadForm = ({_id}) => {

  console.log(_id);
  const [temp, setTemp] = useState(false); // State to toggle the dialog
  const [file, setFile] = useState(null); // State to hold the selected file
  const [message, setMessage] = useState(''); // State to show messages

  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log('File selected:', selectedFile);
    } else {
      console.log('No file selected');
    }
  };

  const uploadFile = async () => {
    if (!file) {
      alert('Please select a file before uploading!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id',_id); // Add file to FormData
    try {
      console.log('log before post-x-',file);
      // const response =
       await axios.post('/api/fileuploader', formData,
        {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );

      // if (response.status === 200) {
      //   const data = response.data;
      //   console.log('Uploaded file details:', data);
      //   setFile(null); // Reset the file after successful upload
      // } else {
      //   console.error(response.data.error);
      // }
    } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
    }

    setTemp(false); // Close the dialog
  };

  const cancelUpload = () => {
    setTemp(false);
    setFile(null);
    setMessage('');
    console.log('Upload canceled.');
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className='bg-brand px-4 text-white  h-[40px] hover:bg-brand-100 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0'>
            <Image
              src={'/assets/icons/upload.svg'}
              width={18}
              height={18}
              alt='upload'
            />
            Upload
          </div>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Upload Your File</AlertDialogTitle>
            <AlertDialogDescription>
            <form action="/upload" method="post" enctype="multipart/form-data">
              <input
                type="file"
                onChange={onFileChange}
                method='post'
                // encType="multipart/form-data"
                accept="*/*" // Add specific file types if needed
              />
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelUpload}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={uploadFile}>Upload</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {message && <p className="text-center mt-4">{message}</p>}
    </div>
  );
};

export default UploadForm;
