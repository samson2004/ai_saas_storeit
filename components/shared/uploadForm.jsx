'use client';
import axios from 'axios';
import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner"
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

const UploadForm = ({ _id }) => {
  const [temp, setTemp] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [progressValue, setProgressValue] = useState(0);
  const [showProgressPopover, setShowProgressPopover] = useState(false);

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
    formData.append('id', _id);
    try {
      await axios.post('/api/fileuploader', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(percentCompleted);
          setShowProgressPopover(true);
          setProgressValue(percentCompleted);

          if (percentCompleted === 100) {
            setShowProgressPopover(false);
          }
        },
      });
    } catch (error) {
      console.error('Error uploading file:', error.response?.data || error.message);
    }

    setTemp(false);
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
          <div className="shadow-md bg-brand px-4 text-white h-[40px] hover:bg-brand-100 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
            <Image
              src={'/assets/icons/upload.svg'}
              width={18}
              height={18}
              alt="upload"
            />
            Upload
          </div>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Upload Your File</AlertDialogTitle>
            <AlertDialogDescription>
              <form action="/upload" method="post" encType="multipart/form-data">
                <input
                  type="file"
                  onChange={onFileChange}
                  accept="*/*"
                />
              </form>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
          {/* {uploadFile} */}
            <AlertDialogCancel onClick={cancelUpload}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={()=>{
              uploadFile();
              toast("File upload was successfull",{
                description:new Date(Date.now()).toUTCString(),
                action:{
                  label:'View',
                  onClick:()=>console.log('take me there')
                }
              })
            }}>Upload</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {message && <AlertDialogDescription className="text-center mt-4">{message}</AlertDialogDescription>}
    </div>
  );
};

export default UploadForm;
