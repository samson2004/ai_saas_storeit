'use client';
import { GetUserbyclerkid } from '@/lib/actions/user.actions';
import { getUserfiledataby_id } from '@/lib/actions/file.actions';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { filetype } from '@/constants';
import Rightclick from '@/components/shared/Rightclick';

const FilePage = () => {
  const { user, isLoaded } = useUser();
  const [userdata, setuserdata] = useState(null);
  const [userfiledata, setuserfiledata] = useState([]);
  const [othersTotalSize, setOthersTotalSize] = useState(0);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchData = async () => {
      try {
        const fetchedUser = await GetUserbyclerkid(user.id);
        if (fetchedUser) {
          setuserdata(fetchedUser);
          const files = await getUserfiledataby_id(fetchedUser._id);
          if (files) setuserfiledata(files);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [isLoaded, user]);

  useEffect(() => {
    const calculateOtherFilesSize = () => {
      const totalSizeMB = userfiledata
        .filter(
          (file) =>
            !filetype.images.some((item)=>item.type==file.mimetype) &&
            !filetype.documents.some((item)=>item.type==file.mimetype) &&
            !filetype.media.some((item)=>item.type==file.mimetype)
        )
        .reduce((sum, file) => sum + file.size / 1000000, 0);

      setOthersTotalSize(Math.floor(totalSizeMB * 100) / 100);
    };

    calculateOtherFilesSize();
  }, [userfiledata]);

  return (
    <div>
      <h1 className="text-4xl font-semibold">Others</h1>
      <div className="flex justify-between">
        <p>Total: {othersTotalSize} MB</p>
        <div className="flex items-center gap-5">
          <p>Sort by</p>
          <div className="w-[80px] h-[40px] bg-white rounded-xl"></div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-5 mt-5">
        {userfiledata.map((file) => {
          if (
            !filetype.images.some((item)=>item.type==file.mimetype) &&
            !filetype.documents.some((item)=>item.type==file.mimetype) &&
            !filetype.media.some((item)=>item.type==file.mimetype)
          ) {
            const uploadDate = new Date(file.uploadedAt).toLocaleString('en-US', {
              dateStyle: 'long',
              timeStyle: 'short',
              timeZone: 'UTC',
            });

            const fileSizeMB = Math.floor((file.size / 1000000) * 100) / 100;

            return (
              <div key={file._id} className="w-fit h-fit bg-white rounded-xl ">
                <div className="flex justify-between p-3 items-start">
                  <div className="p-4">
                    <div className="w-[40px] h-[50px]">
                      <Image
                        src="/assets/images/Othersfile.png"
                        width={40}
                        height={50}
                        alt="Other file type"
                        className=""
                      />
                    </div>
                    <p className="text-sm font-semibold mt-2">{file.filename}</p>
                    <p className="font-light">{uploadDate}</p>
                  </div>
                  <div className="mt-2">
                    <Rightclick userdata={userdata} filedata={file} />
                    <p className="mt-2 text-sm">{fileSizeMB} MB</p>
                  </div>
                </div>
              </div>
            );
          }
          return null; // Ensure undefined items are excluded
        })}
      </div>
    </div>
  );
};

export default FilePage;
