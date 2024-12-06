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

const UploadForm = () => {
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
    formData.append('file', file); // Add file to FormData
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
          <Button className='bg-brand rounded-xl h-[40px] hover:bg-brand-100'>
            <Image
              src={'/assets/icons/upload.svg'}
              width={18}
              height={18}
              alt='upload'
            />
            Upload
          </Button>
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
                encType="multipart/form-data"
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
