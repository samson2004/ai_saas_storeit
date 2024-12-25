'use client';
import { GetUserbyclerkid } from '@/lib/actions/user.actions';
import { getUserfiledataby_id } from '@/lib/actions/file.actions';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { filetype } from '@/constants';
import Rightclick from '@/components/shared/Rightclick';
const ImagePage = () => {
  const { user, isLoaded } = useUser();
      const [userdata, setuserdata] = useState(null);
      const [userfiledata, setuserfiledata] = useState([]);
      const [totalsize, settotalsize] = useState(0);
    
      useEffect(() => {
        if (!isLoaded || !user) return;
    
        const getuserdata = async () => {
          try {
            const getuser = await GetUserbyclerkid(user.id);
            if (getuser) {
              setuserdata(getuser);
    
              const listoffiles = await getUserfiledataby_id(getuser._id);
              if (listoffiles) setuserfiledata(listoffiles);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        getuserdata();
      }, [isLoaded, user]);
    
      // Calculate total size when userfiledata changes
      useEffect(() => {
        const totalSizeMB = userfiledata
          .filter((item) => filetype.images.includes(item.mimetype))
          .reduce((sum, item) => sum + item.size / 1000000, 0);
    
        const formattedTotalSizeMB = Math.floor(totalSizeMB * 100) / 100;
        settotalsize(formattedTotalSizeMB);
      }, [userfiledata]);
    
      return (
        <div>
          <h1 className='text-4xl font-semibold'>
            Images 
          </h1>
          <div className='flex justify-between'>
            <p>Total: {totalsize} MB</p>
            <div className='flex items-center gap-5'>
              <p>Sort by</p>
              <div className='w-[80px] h-[40px] bg-white rounded-xl'></div>
              {/* //sort by method */}
            </div>
          </div>
    
          <div className='grid grid-flow-col-dense justify-start gap-5 '>
            {userfiledata.map((item, index) => {
              const datestr = item.uploadedAt;
              const date = new Date(datestr);
    
              const readabledate = date.toLocaleString('en-US', {
                dateStyle: 'long',
                timeStyle: 'short',
                timeZone: 'UTC',
              });
    
              const filesize = item.size / 1000000;
              const correctfilesize = Math.floor(filesize * 100) / 100;
    
              if (filetype.images.includes(item.mimetype)) {
                const imagesrc='/'+item.filereferenceid+"-"+item.filename;
                return (
                  <div key={item._id} className='w-fit h-[193px] bg-white rounded-xl p-5'>
                    <div className='flex justify-between p-3 items-start'>
                      <div className='p-4'>
                        <div className='w-[60px] h-[60px] rounded-full bg-black'>
                        <Image src={imagesrc}  width={60} height={60} alt='image' className='overflow-hidden rounded-full w-[60px] h-[60px]' />
                        </div>
                        <p className='text-sm font-semibold mt-2'>{item.filename}</p>
                        <p className='font-light'>{readabledate}</p>
                      </div>
                      <div className='mt-2'>
                      <Rightclick userdata={userdata} filedata={item}/>
                        <p className='mt-2 text-sm'>{correctfilesize} MB</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      );
}

export default ImagePage