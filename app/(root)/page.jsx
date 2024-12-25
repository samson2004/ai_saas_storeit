'use client';

import Availablespace from '@/components/shared/availablespace';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import Recentfilesection from '@/components/shared/Recentfilesection'
import Navitemdashboardelements from '@/components/shared/navitemdashboardelements';
import { GetUserbyclerkid } from '@/lib/actions/user.actions';
import { getUserfiledataby_id } from '@/lib/actions/file.actions';


const DashboardPage =() => {
  const {user,isLoaded}=useUser();
   const clerkid=user.id;
   
     const [userdata, setuserdata] = useState(null);
     const [userfiledata, setuserfiledata] = useState([]);
     //usestate for doucment,images,media,others
     useEffect(() => {
       if (!isLoaded ||!user) return; 
     
       const getuserdata = async () => {
         try {
           const getuser = await GetUserbyclerkid(user.id);
           if (getuser) {
             setuserdata(getuser);
             const listoffiles = await getUserfiledataby_id(getuser._id);
             if (listoffiles) setuserfiledata(listoffiles);
           }
         } catch (error) {
           console.error("Error fetching user data:", error);
         }
       };
     
       getuserdata();
 
       if (!isLoaded || !user) {
         return <div>Loading...</div>; 
       }
 
     }, [user]); 

     
    const getAvailableStorage = (userFileData) => {
      const totalStorage = 5*1024*1024*1024; // 5 GB
      let fileStorageInB = 0; // Storage in KB
    
      for (const file of userFileData) {
        fileStorageInB += file.size ; // Convert bytes to KB
      }
    
      const availableStorageInGB=((totalStorage)-(fileStorageInB))/(1024*1024*1024); // 5 GB in bytes
      console.log("available storage:",availableStorageInGB);
      return availableStorageInGB;
    };
      
    
    

    
  return (
    <>
    <div className='w-full  mx-auto '>
      <div className='flex justify-around '>
        <div className=' flex-1  '>
          <div className='rounded-3xl  bg-brand mx-24 shadow-2xl '>
            <Availablespace space={getAvailableStorage(userfiledata)} />
            </div>
            <Navitemdashboardelements />
        </div>
        <div className='bg-white rounded-3xl shadow-lg '>
          <Recentfilesection ud={userdata} ufd={userfiledata} />
        </div>
      </div>
    </div>
    </>
  );
};

export default DashboardPage;
