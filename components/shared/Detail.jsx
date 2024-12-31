

import React from 'react'
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
import {
  CircleX
} from "lucide-react"


const Detail = ({trigger,onclosefunc,itemdata,userdata}) => {
  return (
      <AlertDialog open={trigger} onOpenChange={()=>onclosefunc()}>
        <AlertDialogContent className='w-fit h-fit'>
          <AlertDialogHeader>
          <AlertDialogCancel className='border-none hover:bg-white absolute  right-0 top-0 shadow-none '>
            <CircleX color='#FFFFFF' fill='#A3B2C7' className=''/>
          </AlertDialogCancel>
            <AlertDialogTitle className='mx-auto text-xl font-semibold pb-1 '>Details</AlertDialogTitle>
            <AlertDialogDescription className=' text-medium'>
              <div>
                <div className='border border-gray-200  p-4 rounded-3xl w-[400px] flex gap-3 items-center'>
                  <div className='w-[30px] h-[30px] bg-red  rounded-full '></div>
                  <div>
                    {itemdata.filename}
                    <div className='text-sm text-gray-400'>{itemdata.uploadedAt}</div>
                  </div>
                </div>

                <div className='p-4'>
                  <div className='flex items-center gap-5 justify-start pb-1 '>
                    <div className='text-medium font-semibold'>Format </div>
                    <div>:</div>
                    <div>{itemdata.mimetype}</div>
                  </div>
                  <div className='flex items-center gap-5 justify-start pb-1'>
                    <div className='text-medium font-semibold'>Dimensions </div>
                    <div>:</div>
                    <div>{itemdata.size} Bytes</div>
                  </div>
                  <div className='flex items-center gap-5 justify-start pb-1'>
                    <div className='text-medium font-semibold'>Owner </div>
                    <div>:</div>
                    <div>{userdata.fullname}</div>
                  </div>
                  <div className='flex items-center gap-5 justify-start'>
                    <div className='text-medium font-semibold'>UploadedAt</div>
                    <div>:</div>
                    <div>{itemdata.uploadedAt}</div>
                  </div>
                </div>
                
              </div>
            </AlertDialogDescription>
            
          </AlertDialogHeader>
          <AlertDialogFooter className='mx-auto mt-5 gap-4'>
            <AlertDialogCancel className='border-none shadow-none'>cancel</AlertDialogCancel>
            <AlertDialogAction onClick={console.log('move to trash')} className='rounded-3xl w-[100px] shadow- bg-red shadow-red/60 shadow-lg hover:shadow-none'>Move</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}

export default Detail