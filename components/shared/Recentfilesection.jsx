import { GetUserbyclerkid } from '@/lib/actions/user.actions';
import React, { useEffect, useState } from 'react';
import { getUserfiledataby_id } from '@/lib/actions/file.actions';
import Image from 'next/image';
import { filetype, filetypecolor } from '@/constants';

const Recentfilesection = ({ clerkid }) => {
  const [userdata, setuserdata] = useState(null);
  const [userfiledata, setuserfiledata] = useState([]);

  useEffect(() => {
    console.log(clerkid);
    const getuserdata = async () => {
      const user = await GetUserbyclerkid(clerkid);
      setuserdata(user);

      const listoffiles = await getUserfiledataby_id(user._id);
      setuserfiledata(listoffiles);
    };

    getuserdata();
  }, [clerkid]);

  function getfilemimetypeimage(mimetype) {
    if (filetype.documents.includes(mimetype)) {
      return ['/assets/icons/documents.svg',"bg-brand"];
    }
    if (filetype.images.includes(mimetype)) {
      return ['/assets/icons/images.svg','bg-blue'];
    }
    if (filetype.media.includes(mimetype)) {
      return ['/assets/icons/video.svg','bg-green-400'];
    }
    return ['/assets/icons/others.svg','bg-violet-400'];
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-5">Recent files uploaded</h1>
      <div>
        {userfiledata.map((item, index) => {
          const datestr = item.uploadedAt;
          const date = new Date(datestr);

          const readabledate = date.toLocaleString('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
            timeZone: 'UTC',
          });

          const filemimetype = item.mimetype;
          const mimetypeimage = getfilemimetypeimage(filemimetype);

          console.log(mimetypeimage[1])
          return (
            <div key={index}>
              <div className="flex items-center">
                <div className={`w-[40px] h-[40px]  rounded-full ${mimetypeimage[1]} `}>
                  <Image src={mimetypeimage[0]} height={30} width={30} className='pl-2 pt-2' alt="document/image/media/other" />
                </div>
                <div className="my-3 gap-5 p-2">
                  <h2 className="text-sm font-semibold">{item.filename}</h2>
                  <p className="text-sm">{readabledate}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recentfilesection;
