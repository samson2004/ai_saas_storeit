import { GetUserbyclerkid } from '@/lib/actions/user.actions';
import React, { useEffect, useState } from 'react';
import { getUserfiledataby_id } from '@/lib/actions/file.actions';
import { filetype, filetypecolor } from '@/constants';
import { ScrollArea } from "@/components/ui/scroll-area"
import Rightclick from '@/components/shared/Rightclick';
import Image from 'next/image';
const Recentfilesection = ({ ud,ufd }) => { 

  function getfilemimetypeimage(mimetype) {
    if (filetype.documents.some(file => file.type === mimetype)) {
      return ['/assets/icons/documents.svg', "bg-brand"];
    }
    if (filetype.images.some(file => file.type === mimetype)) {
      return ['/assets/icons/images.svg', 'bg-blue'];
    }
    if (filetype.media.some(file => file.type === mimetype)) {
      return ['/assets/icons/video.svg', 'bg-green'];
    }
    return ['/assets/icons/others.svg', 'bg-violet-500'];
  }

  return (
    <div className="p-10 w-[680px]">
      <h1 className="text-2xl font-semibold mb-5">Recent files uploaded</h1>
        <div className=''>
        <ScrollArea className='h-[550px]'>
          {ufd.map((item, index) => {
            const datestr = item.uploadedAt;
            const date = new Date(datestr);

            const readabledate = date.toLocaleString('en-US', {
              dateStyle: 'long',
              timeStyle: 'short',
              timeZone: 'UTC',
            });

            const filemimetype = item.mimetype;
            const mimetypeimage = getfilemimetypeimage(filemimetype);

            return (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div className='flex items-center justify-between'>
                    <div className={`w-[40px] h-[40px]  rounded-full  ${mimetypeimage[1]}  `}>
                      <Image src={mimetypeimage[0]} height={30} width={30} className='pl-2 pt-2' alt="document/image/media/other" />
                    </div>
                    <div className="my-3 gap-5 p-2">
                      <h2 className="text-sm font-semibold">{item.filename}</h2>
                      <p className="text-sm">{readabledate}</p>
                    </div>
                  </div>
                  <div>
                      <Rightclick userdata={ud} filedata={item}/>
                  </div>
                </div>
              </div>
            );
          })}
          </ScrollArea>
        </div>
      
    </div>
  );
};

export default Recentfilesection;
