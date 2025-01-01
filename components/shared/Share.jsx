import React, { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '../ui/button';
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

import {
  CircleX
} from "lucide-react"
import { GetUserbyemail } from '@/lib/actions/user.actions';
import Image from 'next/image';
import { uploadfile } from '@/lib/actions/file.actions';
import { handleError } from '@/lib/utils';

const Share = ({trigger,onclosefunc,file,userdata}) => {
  const [shareemail,setshareemail]=useState("");
  const [shareuser,setshareuser]=useState();
  const [showshareuser,setshowshareuser]=useState(false);

  const [nousermsg,setnousermsg]=useState("No user match with this email");
  const [showmsg,setshowmsg]=useState(false);


  const getuser=async()=>{
    if(shareemail==="")return;
      
    const toshareuser=await GetUserbyemail(shareemail);
    if(toshareuser) {
      if(toshareuser.email==userdata.email){
        setshowmsg(true);
        setnousermsg("cannot share with yourself");return;
      }
      setshowmsg(false);
      setshareuser(toshareuser);
      setshowshareuser(true);
      console.log("toshare:",toshareuser,"me:",userdata,"file:",file);
      return;
    }
    else{
      setnousermsg("No user match with this email");
      setshowmsg(true);
    }
   }
   
   const shareclick=async()=>{

   try {
    const newfile={
      filename:file.filename,
      filepath:file.filepath,
      filereferenceid:file.filereferenceid,
      size:file.size,
      userid:shareuser._id,
      mimetype:file.mimetype
    }
    console.log("new file:", newfile)
    const sharetouser=await uploadfile(newfile);
    if(sharetouser) toast("File Share successfull!")
    else toast('We are facing problem right now . Please try again later!');
   } catch (error) {
    toast('We are facing problem right now . Please try again later! Thankyou for understanding');
    handleError(error,'Problem in upload file ===  share.jsx');
   }
   }

  return (
<AlertDialog open={trigger} onOpenChange={()=>onclosefunc()}>
        <AlertDialogContent className='w-fit h-[520px] p-10'>
          <AlertDialogHeader>
          <AlertDialogCancel className='border-none hover:bg-white absolute  right-0 top-0 shadow-none '>
            <CircleX color='#FFFFFF' fill='#A3B2C7' className='w-8 h-8'/>
          </AlertDialogCancel>
            <AlertDialogTitle className='mx-auto text-xl font-semibold pb-1 '>Share File</AlertDialogTitle>
            <AlertDialogDescription className=' text-medium'>
            
                <div className='border border-gray-300  p-4 rounded-3xl w-[400px] flex gap-3 items-center'>
                  <div className='w-[30px] h-[30px] bg-red  rounded-full '></div>
                  <div>
                    {file.filename}
                    <div className='text-sm text-gray-400'>{file.uploadedAt}</div>
                  </div>
                </div>
              <div className='py-10'>
                <h2 className='pb-2   font-semibold text-sm'>Share file with other users:</h2>
                <div className='flex items-center gap-2'>
                <Input 
                  type='email'
                  placeholder='Enter Email Address'
                  className='w-full h-[50px] rounded-full border-gray-400'
                  value={shareemail}
                  onChange={(e)=>{
                    setshareemail(e.target.value)
                  }}
                />
                <Button onClick={getuser}>search</Button>
                </div>
              </div>
              <div>
                <div className='flex justify-between'>
                  <h2 className='font-semibold text-sm '>Share with users:</h2>
                  <h2 className='text-gray-400'>{shareuser?1:0} Users</h2>
                </div>
                <div className='p-2'>
                {showshareuser && 
                  <Image src={shareuser.avatar} width={54} height={54} className={`rounded-full`} alt='image' />
                  }
                  {showmsg && <p>{nousermsg}</p>}
                </div>
              </div>
            </AlertDialogDescription>
            
          </AlertDialogHeader>
          <AlertDialogFooter className='mx-auto mt-5 gap-4'>
            <AlertDialogCancel className='border-none shadow-none h-[50px] '>cancel</AlertDialogCancel>
            <AlertDialogAction onClick={shareclick} className='rounded-3xl h-[50px] w-[200px] shadow- bg-red shadow-red/60 
            shadow-md hover:shadow-none'>Share</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
  )
}

export default Share;