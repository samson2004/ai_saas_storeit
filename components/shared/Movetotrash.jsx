import React from 'react'
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
import { CircleX } from "lucide-react"
import { handleError } from '@/lib/utils';

const Movetotrash = ({trigger, onclosefunc, file}) => {

  const handleDelete = async () => {
    console.log("file:",file,file.filereferenceid);
    try {
      const res = await fetch(`/api/deleteFile?referenceid=${file.filereferenceid}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('File has been deleted successfully');
      } else {
        toast.error('File is not deleted. Please try again');
      }
    } catch (error) {
      toast.error('Error calling delete API');
      handleError(error, 'Error in HandleDelete === MovetoTrash.jsx');
    }
  };

  return (
    <AlertDialog open={trigger} onOpenChange={() => onclosefunc()}>
      <AlertDialogContent className='w-[300px] h-[220px]'>
        <AlertDialogHeader>
          <AlertDialogCancel className='border-none hover:bg-white absolute right-0 top-0 shadow-none'>
            <CircleX color='#FFFFFF' fill='#A3B2C7' />
          </AlertDialogCancel>
          <AlertDialogTitle className='mx-auto text-xl font-semibold pb-1 '>Move to trash</AlertDialogTitle>
          <AlertDialogDescription className=' text-medium'>
            Are you sure you want to move this file to trash?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='mx-auto mt-5 gap-4'>
          <AlertDialogCancel className='border-none shadow-none'>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className='rounded-3xl w-[120px] shadow- bg-red shadow-red/60 shadow-md hover:shadow-none'>
            Move to Trash
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Movetotrash;
