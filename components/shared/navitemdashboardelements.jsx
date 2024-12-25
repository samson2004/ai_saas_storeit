import { homepagenavitems } from '@/constants'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

const Navitemdashboardelements = () => {

    const [navitems,setnavitems]=useState(
        [
            {
                src:'/assets/icons/dashboard.svg',
                width:24,
                height:24,
                name:'Dashboard',
                link:'/'
            },
            {
                src:'/assets/icons/documents.svg',
                width:24,
                height:24,
                name:'Documents',
                link:'/documents',
                mimetype:{
                  documents: [
                  'application/pdf',       // PDF
                  'application/msword',    // .doc
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
                  'text/plain'             // .txt
                ]},
                color:'bg-brand',
                shadowcolor:'shadow-sm shadow-red'
            },
            {
                src:'/assets/icons/images.svg',
                width:24,
                height:24,
                name:'Images',
                link:'/images',
                mimetype:{
                  images: [
                  'image/jpeg',            // .jpg, .jpeg
                  'image/png',             // .png
                  'image/gif'              // .gif
                ]},
                color:'bg-blue',
                shadowcolor:'shadow-sm shadow-blue'
            },
            {
                src:'/assets/icons/video.svg',
                width:24,
                height:24,
                name:'Media',
                link:'/media',
                mimetype: {
                  media: [
                  'audio/mpeg',            // .mp3
                  'video/mp4'              // .mp4
                ]},
                color:'bg-green',
                shadowcolor:'shadow-sm shadow-green'
            },
            {
                src:'/assets/icons/others.svg',
                width:24,
                height:24,
                name:'Others',
                link:'/others',
                color:'bg-violet-400',
                shadowcolor:'shadow-sm shadow-violet-500/50'
            }
        
        ]
    );
    useState(()=>{
        setnavitems(homepagenavitems);
    },[])
  return (
   <>
   
        <div  className='relative flex py-10 px-10   justify-around mx-24'>
                {navitems.slice(1,3).map((item,index)=>{
                    return(
                        <div key={index} className='w-full mx-4 bg-white  rounded-b-3xl rounded-tr-3xl pb-6 rounded-tl-3xl shadow-lg'>
                        <Link href={item.link}>
                                <div className='  '>
                                    <div className='flex justify-between px-5 relative'>
                                        <div className='inset-0 bg-gray-100 w-[40px] h-[40px] z-0  absolute '></div>
                                        {/* //base square */}
                                        <div className='inset-0 bg-white w-[20px] h-[20px]  absolute top-7 rounded-full z-20'></div>
                                        {/* //small */}
                                        <div  className='inset-0 bg-white w-[20px] h-[20px] absolute top-0 left-7 rounded-full z-20'></div>
                                        {/* //small-circle */}
                                        <div className='inset-0 bg-gray-100 w-[40px] h-[40px] absolute rounded-full -top-3 -left-3 z-20'></div> 
                                        {/* //big */}
                                        <div className='inset-0 bg-white w-[30px] h-[30px] absolute top-3 left-3 z-10'></div>
                                        {/* //top square */}
                                        <div className={` ${item.color} ${item.shadowcolor}  w-[50px] h-[50px] z-30 -top-7 -left-7 rounded-full absolute p-3    `}>
                                            <Image src={item.src} width={40} height={40} alt='image' />
                                        </div>
                                        
                                        <p></p>
                                        <p>12GB</p>
                                    </div>
                                        <p className='mx-auto max-w-max pt-5'>{item.name}</p>
                                        <div className='h-[1px] bg-gray-300 m-3 mx-6'></div>
                                        <p className='text-gray-300 max-w-max mx-auto'>Last Update</p>
                                        <p className='mx-auto max-w-max'>Dec 13, 8:31 AM</p>
                                </div>
                                </Link>
                        </div>
                        
                    )
                })}
        </div>
        <div  className='relative flex py-auto px-10   justify-around mx-24'>
                {navitems.slice(3,5).map((item,index)=>{
                    return(
                        <div key={index} className='w-full mx-4 bg-white  rounded-b-3xl rounded-tr-3xl pb-6 rounded-tl-3xl shadow-lg'>
                        <Link href={item.link}>
                                <div className=' '>
                                    <div className='flex justify-between px-5 relative'>
                                        <div className='inset-0 bg-gray-100 w-[40px] h-[40px] z-0  absolute '></div>
                                        {/* //base square */}
                                        <div className='inset-0 bg-white w-[20px] h-[20px]  absolute top-7 rounded-full z-20'></div>
                                        {/* //small */}
                                        <div  className='inset-0 bg-white w-[20px] h-[20px] absolute top-0 left-7 rounded-full z-20'></div>
                                        {/* //small-circle */}
                                        <div className='inset-0 bg-gray-100 w-[40px] h-[40px] absolute rounded-full -top-3 -left-3 z-20'></div> 
                                        {/* //big */}
                                        <div className='inset-0 bg-white w-[30px] h-[30px] absolute top-3 left-3 z-10'></div>
                                        {/* //top square */}
                                        <div className={` ${item.color} ${item.shadowcolor}  w-[50px] h-[50px] z-30 -top-7 -left-7 rounded-full absolute p-3    `}>
                                            <Image src={item.src} width={40} height={40} alt='image' />
                                        </div>
                                        
                                        <p></p>
                                        <p >12GB</p>
                                    </div>
                                        <p className='mx-auto max-w-max pt-5'>{item.name}</p>
                                        <div className='h-[1px] bg-gray-300 m-3 mx-6'></div>
                                        <p className='text-gray-300 max-w-max mx-auto'>Last Update</p>
                                        <p className='mx-auto max-w-max'>Dec 13, 8:31 AM</p>
                                </div>
                                </Link>
                        </div>
                        
                    )
                })}
        </div>
    
   </>
  )
}

export default Navitemdashboardelements