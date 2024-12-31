import { homepagenavitems } from '@/constants';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navitemdashboardelements = ({ userdata, userfiledata }) => {
  const [filetype, setFiletype] = useState({
    documents: [
      { type: 'application/pdf', image: '/public/images/pdf-icon.png' },
      { type: 'application/msword', image: '/public/images/doc-icon.png' },
      { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', image: '/public/images/docx-icon.png' },
      { type: 'text/plain', image: '/public/images/txt-icon.png' },
    ],
    images: [
      { type: 'image/jpeg', image: '/public/images/jpeg-icon.png' },
      { type: 'image/png', image: '/public/images/png-icon.png' },
      { type: 'image/gif', image: '/public/images/gif-icon.png' },
    ],
    media: [
      { type: 'audio/mpeg', image: '/public/assets/images/Music.png' },
      { type: 'video/mp4', image: '/public/assets/images/Video.png' },
    ],
  });

  const [navitems, setNavitems] = useState([]);

  useEffect(() => {
    setNavitems(homepagenavitems);
  }, []);

  const calculateTotalSize = (fileArray, mimeTypes) => {
    return fileArray
      .filter((file) => mimeTypes.some((type) => type.type === file.mimetype))
      .reduce((sum, file) => sum + file.size / 1000000, 0);
  };

  return (
    <>
      <div className='relative flex py-10 px-10 justify-around mx-24'>
        {navitems.slice(1, 3).map((item, index) => {
          const totalSizeMBforCategory = calculateTotalSize(userfiledata, filetype[item.name.toLowerCase()] || []);
          const formattedTotalSizeMBforCategory = Math.floor(totalSizeMBforCategory * 100) / 100;

          return (
            <div key={index} className='w-full mx-4 bg-white rounded-b-3xl rounded-tr-3xl pb-6 rounded-tl-3xl shadow-lg'>
              <Link href={item.link}>
                <div>
                  <div className='flex justify-between px-5 relative'>
                    <div className='inset-0 bg-gray-100 w-[40px] h-[40px] z-0 absolute'></div>
                    <div className='inset-0 bg-white w-[20px] h-[20px] absolute top-7 rounded-full z-20'></div>
                    <div className='inset-0 bg-white w-[20px] h-[20px] absolute top-0 left-7 rounded-full z-20'></div>
                    <div className='inset-0 bg-gray-100 w-[40px] h-[40px] absolute rounded-full -top-3 -left-3 z-20'></div>
                    <div className='inset-0 bg-white w-[30px] h-[30px] absolute top-3 left-3 z-10'></div>
                    <div className={` ${item.color} ${item.shadowcolor} w-[50px] h-[50px] z-30 -top-7 -left-7 rounded-full absolute p-3`}>
                      <Image src={item.src} width={40} height={40} alt='icon' />
                    </div>
                    <div className='flex justify-between w-full'>
                        <p></p>
                        <p className='mt-1 '>{formattedTotalSizeMBforCategory} MB</p>
                    </div>
                  </div>
                  <p className='mx-auto max-w-max pt-5'>{item.name}</p>
                  <div className='h-[1px] bg-gray-300 m-3 mx-6'></div>
                  <p className='text-gray-300 max-w-max mx-auto'>Last Update</p>
                  <p className='mx-auto max-w-max'>Dec 13, 8:31 AM</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className='relative flex py-auto px-10 justify-around mx-24'>
        {navitems.slice(3, 5).map((item, index) => {
          const totalSizeMBforCategory = calculateTotalSize(userfiledata, filetype[item.name.toLowerCase()] || []);
          let formattedTotalSizeMBforCategory = Math.floor(totalSizeMBforCategory * 100) / 100;
          if (formattedTotalSizeMBforCategory === 0) {
            formattedTotalSizeMBforCategory = '>0.01';
          }

          return (
            <div key={index} className='w-full mx-4 bg-white rounded-b-3xl rounded-tr-3xl pb-6 rounded-tl-3xl shadow-lg'>
              <Link href={item.link}>
                <div>
                  <div className='flex justify-between px-5 relative'>
                    <div className='inset-0 bg-gray-100 w-[40px] h-[40px] z-0 absolute'></div>
                    <div className='inset-0 bg-white w-[20px] h-[20px] absolute top-7 rounded-full z-20'></div>
                    <div className='inset-0 bg-white w-[20px] h-[20px] absolute top-0 left-7 rounded-full z-20'></div>
                    <div className='inset-0 bg-gray-100 w-[40px] h-[40px] absolute rounded-full -top-3 -left-3 z-20'></div>
                    <div className='inset-0 bg-white w-[30px] h-[30px] absolute top-3 left-3 z-10'></div>
                    <div className={` ${item.color} ${item.shadowcolor}  w-[50px] h-[50px] z-30 -top-7 -left-7 rounded-full absolute p-3`}>
                      <Image src={item.src} width={40} height={40} alt='icon' />
                    </div>
                    <div className='flex justify-between w-full'>
                        <p></p>
                        <p className='mt-1 '>{formattedTotalSizeMBforCategory} MB</p>
                    </div>
                  </div>
                  <p className='mx-auto max-w-max pt-5'>{item.name}</p>
                  <div className='h-[1px] bg-gray-300 m-3 mx-6'></div>
                  <p className='text-gray-300 max-w-max mx-auto'>Last Update</p>
                  <p className='mx-auto max-w-max'>Dec 13, 8:31 AM</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Navitemdashboardelements;
